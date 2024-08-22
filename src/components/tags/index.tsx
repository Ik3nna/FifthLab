import React from 'react'
import styles from "./index.module.css"

interface TagsProps {
    icon?: React.ReactNode,
    text?: string,
    bgColor: string
}

const Tags = ({ icon, text, bgColor }: TagsProps) => {
  return (
    <div 
        className={styles.container}
        style={{
            backgroundColor: bgColor
        }}
    >
        {icon && icon}
        <div>{text}</div>
    </div>
  )
}

export default Tags