import { FC } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from "styles/ui/Code.module.scss"
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { useTheme } from "components/ThemeProvider";

type Props = {
  language: string,
  content: string
}

const Code: FC<Props> = ({ language, content }) => {
  const { theme } = useTheme();

  return <div className={styles.container}>
    <SyntaxHighlighter language={language} style={theme == "Light" ? atomOneLight : atomOneDark}>
      { content }
    </SyntaxHighlighter>
  </div>
}

export default Code;