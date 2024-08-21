import React from 'react'
import styles from "./index.module.css"

interface CardsProps {
  icon: React.ReactNode,
  text: string,
  bgColor: string,
  gender: string,
  onClick: (card: string)=> void
}

const Cards = ({ icon, text, bgColor, gender, onClick }: CardsProps) => {
  return (
    <section className={styles.container}>
      <div style={{ backgroundColor: bgColor }} onClick={()=>onClick(gender)}>
        {icon}
      </div>

      <div>{text}</div>
    </section>
  )
}

export default Cards