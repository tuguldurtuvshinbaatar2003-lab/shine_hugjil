import React from 'react'
import styles from './Header.module.css'

const NAV = [
  { id: 'home',   label: 'Эхлэл' },
  { id: 'math',   label: 'Математик' },
  { id: 'info',   label: 'Мэдээлэл зүй' },
  { id: 'config', label: 'Тохиргоо' },
]

export default function Header({ activePage, onNav }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>📚</div>
        <div>
          <div className={styles.logoSub}>Шинэ Хөгжил</div>
          <div className={styles.logoMain}>Сургууль</div>
        </div>
      </div>
      <nav className={styles.nav}>
        {NAV.map(item => (
          <button
            key={item.id}
            className={`${styles.navBtn} ${activePage === item.id ? styles.active : ''}`}
            onClick={() => onNav(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
