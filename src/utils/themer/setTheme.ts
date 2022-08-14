import themes, { ThemeName, ThemeValues } from "./themes";

const setThemeCss = (theme: ThemeValues) => {
  for (const [key, value] of Object.entries(theme)) 
    document.documentElement.style.setProperty(`--${key}`, value);
}

const setTheme = (key: ThemeName) => {
  setThemeCss(themes[key]);
}

export default setTheme;
