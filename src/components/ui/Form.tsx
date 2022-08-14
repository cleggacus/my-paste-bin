import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import styles from "styles/ui/Form.module.scss"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = DivProps & {
  maxWidth?: number | string
};

const Form = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, maxWidth, ...otherProps } = props;

  return <div 
    ref={ref} 
    {...otherProps} 
    style={{...props.style, maxWidth}}
    className={`${className || ""} ${styles.container}`}
  />
})

export default Form;