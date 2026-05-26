import React from 'react'
import styles from './PostCard.module.css'

export default function PostCard({ post, onClick, delay = 0 }) {
  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onClick && onClick(post)}
    >
      <div className={styles.thumb}>{post.icon}</div>
      <div className={styles.body}>
        <span className={styles.tag}>{post.tag}</span>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.date}>{post.date}</p>
      </div>
    </div>
  )
}
