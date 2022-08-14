import { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "styles/ui/Select.module.scss";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri"

type Props<T> = {
  options: {
    title: string,
    value: T,
  }[],
  onChange?: (value: T) => void
}

const Select = <T extends string>({ options, onChange }: Props<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    if(onChange)
      onChange(options[selection].value)

    if(ref.current)
      ref.current.blur();
  }, [selection])

  return <div 
    onFocus={() => setOpen(true)}
    onBlur={() => setOpen(false)}
    tabIndex={0}
    ref={ref}
    className={`${styles.container} ${open ? styles.open : styles.closed}`}
  >
    <div className={styles.title}>
      <span>{ options[selection].title }</span>
      
      {
        open ?
          <RiArrowUpSLine/> :
          <RiArrowDownSLine/>
      }
    </div>

    <div className={styles.menu}>
      <div className={styles.menuInner}>
      {
        options.map((child, key) => (
          <div 
            className={`${styles.option} ${selection == key ? styles.selected : ""}`} 
            onClick={() => setSelection(key) }
          >
            { child.title }
          </div>
        ))
      }
      </div>
    </div>
  </div>
}

export default Select;