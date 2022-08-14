import { createContext, FC, SetStateAction, useContext, useState, Dispatch, ReactNode, useEffect } from "react";
import { setTheme, ThemeName } from "utils/themer";

type ThemeContextType = {
  theme: ThemeName,
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

const defaultValues: ThemeContextType = {
  theme: 'Light',
  setTheme: () => {}
}

const ThemeContext = createContext(defaultValues);

type Props = {
  theme?: ThemeName,
  children: ReactNode
}

export const ThemeProvider: FC<Props> = ({ children, theme = 'Light' }) => {
  const [state, setState] = useState<ThemeName>(theme);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTheme(state);
    setLoaded(true);
  }, [state])

  // only show content once theme is fully set
  // prevents transision on load
  if(!loaded) return <></>

  return <ThemeContext.Provider value={{ 
    theme: state, 
    setTheme: setState
  }}>
    { children }
  </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext);
