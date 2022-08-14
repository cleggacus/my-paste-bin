import Layout from 'components/Layout'
import Form from 'components/ui/Form'
import FormRow from 'components/ui/FormRow'
import Select from 'components/ui/Select'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import styles from 'styles/Home.module.scss'
import trpc from 'utils/trpc'
import { NextPageWithLayout } from './_app'

import {Language} from 'utils/languages'
import Code from 'components/ui/Code'

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const [contentErr, setContentErr] = useState("");
  const [titleErr, setTitleErr] = useState("");
 
  const [language, setLanguage] = useState<Language>("plaintext");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate, isLoading } = trpc.useMutation(["post.create"], {
    onError: (res) => {
      if(res.data?.zodError) {
        if(res.data.zodError.fieldErrors.content)
          setContentErr(res.data.zodError.fieldErrors.content.join(", "));
        if(res.data.zodError.fieldErrors.title)
          setTitleErr(res.data.zodError.fieldErrors.title.join(", "));
      }
    },
    onSuccess: (res) => {
      router.push(`paste/${res.id}`);
    }
  })

  const submit = () => {
    mutate({
      title: title || undefined,
      content: content,
      language: language
    });
  }

  const autoGrow = (element: HTMLTextAreaElement) => {
    element.style.width = "0px";
    element.style.width = (element.scrollWidth)+"px";
    element.style.height = "0px";
    element.style.height = (element.scrollHeight)+"px";
  }

  return <div className={styles.container}>
    <Form maxWidth={700}>
      <FormRow>
        <h1>Create a paste</h1>
      </FormRow>

      <FormRow>
        <input 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Title (optional)"
        ></input>
      </FormRow>

      {
        titleErr ? <FormRow>
          <p className={styles.err}>{titleErr}</p>
        </FormRow> : <></>
      }

      <FormRow>
        <div className={styles.editor}>
          <Code language={language} content={content}></Code>

          <textarea 
            onChange={e => {
              setContent(e.target.value)
              autoGrow(e.target)
            }} 
            onKeyDown={e => {
              if (e.key == 'Tab') {
                e.preventDefault();
                const tab = "    ";
                const start = e.currentTarget.selectionStart;
                const end = e.currentTarget.selectionEnd;
                const value = e.currentTarget.value
                const startText = value.substring(0, start);
                const endText = value.substring(end);

                e.currentTarget.value = `${startText}${tab}${endText}`;

                e.currentTarget.selectionEnd = start + tab.length;
                e.currentTarget.selectionStart = start + tab.length;
              }
            }}
            placeholder="Content"
          ></textarea>
        </div>
      </FormRow>

      {
        contentErr ? <FormRow>
          <p className={styles.err}>{contentErr}</p>
        </FormRow> : <></>
      }

      <FormRow>
        <Select<Language> 
          onChange={val => setLanguage(val)}
          options={[
            { value: "plaintext", title: "Plain Text" },
            { value: "html", title: "HTML" },
            { value: "css", title: "CSS" },
            { value: "java", title: "Java" },
            { value: "javascript", title: "JavaScript" },
            { value: "typescript", title: "TypeScript" },
            { value: "python", title: "Python" },
            { value: "rust", title: "Rust" },
            { value: "c", title: "C" },
            { value: "cpp", title: "C++" },
            { value: "csharp", title: "C#" },
            { value: "php", title: "PHP" },
            { value: "swift", title: "Swift" },
            { value: "kotlin", title: "Kotlin" },
          ]}
        />
      </FormRow>

      <FormRow>
        <button onClick={submit}>Create</button>
      </FormRow>
    </Form>
  </div>
}

Home.getLayout = (page: ReactElement) => <Layout>{ page }</Layout>;

export default Home
