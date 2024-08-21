import React from 'react'
import styles from "./index.module.css"

interface CardsProps {
  icon: React.ReactNode,
  text: string,
  bgColor: string,
  onClick?: ()=> void
}

const Cards = ({ icon, text, bgColor, onClick }: CardsProps) => {
  return (
    <section className={styles.container}>
      <div style={{ backgroundColor: bgColor }} onClick={onClick}>
        {icon}
      </div>

      <div>{text}</div>
    </section>
  )
}

export default Cards