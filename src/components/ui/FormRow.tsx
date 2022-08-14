import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import styles from "styles/ui/Form.module.scss"

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = DivProps;

const FormRow = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...otherProps } = props;

  return <div 
    ref={ref} 
    {...otherProps} 
    className={`${className || ""} ${styles.row}`}
  />
})

FormRow.displayName = 'FormRow';

export default FormRow;