import { FC, ReactNode } from "react";
import styles from "styles/Layout.module.scss";
import ThemeChanger from "./ui/ThemeChanger";

type Props = {
  children?: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return <div className={styles.container}>
    <ThemeChanger className={styles.themeChanger}></ThemeChanger>
    { children }
  </div>
}

export default Layout;
