import { ThemeName } from "./themes";

const getClientTheme = (): ThemeName => {
  return window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 
      "Dark" :
      "Light";
}

export default getClientTheme;