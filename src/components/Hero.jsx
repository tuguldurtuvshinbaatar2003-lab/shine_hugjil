import React from 'react'
import styles from './Hero.module.css'

export default function Hero({ title, subtitle, quote, author }) {
  return (
    <div className={styles.hero}>
      <div className={styles.pattern} />
      <div className={styles.content}>
        {quote && (
          <>
            <p className={styles.quote}>"{quote}"</p>
            <p className={styles.author}>— {author}</p>
          </>
        )}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  )
}
