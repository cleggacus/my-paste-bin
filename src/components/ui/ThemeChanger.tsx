import { forwardRef, SVGProps } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useTheme } from "components/ThemeProvider";
import styles from "styles/ui/ThemeChanger.module.scss"

type Props = SVGProps<SVGSVGElement>;

const ThemeChanger = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { theme, setTheme } = useTheme();
  const { className, ...otherProps } = props;

  return <>
    {
      theme == "Light" ?
        <RiSunFill 
          {...otherProps} 
          className={`${className || ""} ${styles.icon}`} 
          onClick={() => setTheme("Dark")}
        /> :
        <RiMoonClearFill 
          {...otherProps} 
          className={`${className || ""} ${styles.icon}`} 
          onClick={() => setTheme("Light")}
        />
    }
  </>
})

export default ThemeChanger;