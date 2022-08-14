import { FC, ReactNode, useState } from "react";
import styles from "styles/ui/Select.module.scss";

export type OptionProps<T> = {
  children: string,
  value: T
}

const Option = <T extends {}>({ children }: OptionProps<T>) => {
  return <>
    { children }
  </>;
}

export default Option;