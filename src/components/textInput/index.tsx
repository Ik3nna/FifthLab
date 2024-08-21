import React, { ChangeEvent } from 'react'
import styles from "./index.module.css"
import homeStyles from "@/pages/home/index.module.css"

interface InputProps {
  type: string,
  placeholder?: string,
  icon: React.ReactNode,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>)=> void,
  className?: any,
  [props: string]: any
}

const TextInput = ({ type, placeholder, value, onChange, className, icon, ...props }: InputProps) => {
  return (
    <div 
      className={`
        ${styles.input_container}
        ${homeStyles[className]}
      `}>
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