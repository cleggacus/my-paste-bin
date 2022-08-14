import { NextPageWithLayout } from "pages/_app"
import { ReactElement, useEffect } from "react"
import styles from "styles/Paste.module.scss"
import trpc from "utils/trpc";
import { useRouter } from "next/router";
import Form from "components/ui/Form";
import FormRow from "components/ui/FormRow";
import Layout from "components/Layout";
import Code from "components/ui/Code";

const Paste: NextPageWithLayout = () => {
  const router = useRouter();
  const id = typeof router.query.id =="string" ? router.query.id : "";

  const post = trpc.useQuery(["post.find", { id }], { refetchOnWindowFocus: false });

  return <div className={styles.container}>
    {
      post.data ?
        <Form maxWidth={700}>
          <FormRow>
            <h1>{ post.data?.title ?? "Untitled" }</h1>
          </FormRow>

          <FormRow>
            <div className={styles.content}>
              <Code language={post.data?.language || ""} content={post.data?.content}></Code>
            </div>
          </FormRow>
        </Form> :
        <></>
    }
  </div>
}

Paste.getLayout = (page: ReactElement) => <Layout>{ page }</Layout>

export default Paste;

