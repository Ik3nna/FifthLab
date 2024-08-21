import React, { ChangeEvent } from 'react'
import styles from "./index.module.css"

interface InputProps {
  type: string,
  placeholder?: string,
  icon: React.ReactNode,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>)=> void
  [props: string]: any
}

const TextInput = ({ type, placeholder, value, onChange, icon, ...props }: InputProps) => {
  return (
    <div className={styles.input_container}>
      {icon && <div>{icon}</div>}

      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default TextInput