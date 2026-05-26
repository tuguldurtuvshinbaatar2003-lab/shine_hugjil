import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import PostCard from './components/PostCard'
import KanguruDetail from './components/KanguruDetail'
import ComputerDetail from './components/ComputerDetail'
import { POSTS } from './data'
import styles from './App.module.css'

export default function App() {
  const [page, setPage] = useState('home')
  const [detail, setDetail] = useState(null)

  const handleCard = (post) => {
    if (post.id === 'kanguru-2026') setDetail('kanguru')
    if (post.id === 'computer-olympiad') setDetail('computer')
  }

  const handleBack = () => setDetail(null)

  const handleNav = (id) => {
    setPage(id)
    setDetail(null)
  }

  if (detail === 'kanguru') {
    return (
      <div>
        <Header activePage={page} onNav={handleNav} />
        <KanguruDetail onBack={handleBack} />
        <Footer />
      </div>
    )
  }

  if (detail === 'computer') {
    return (
      <div>
        <Header activePage={page} onNav={handleNav} />
        <ComputerDetail onBack={handleBack} />
        <Footer />
      </div>
    )
  }

  const homePosts = POSTS.filter(p =>
  p.category === 'home' || p.id === 'kanguru-2026' || p.id === 'computer-olympiad'
)
  const mathPosts = POSTS.filter(p => p.category === 'math' || p.id === 'kanguru-2026')
  const infoPosts = POSTS.filter(p => p.category === 'info')

  return (
    <div>
      <Header activePage={page} onNav={handleNav} />

      {page === 'home' && (
        <>
          <Hero
            quote="Би монгол хүний саруул ухаанд итгэдэг"
            author="С. Зориг"
            title="Улсын шалгалтын материал"
            subtitle="Сурагчдад зориулсан сургалтын материал, уралдааны дүн болон бусад мэдээлэл"
          />
          <Section title="Сүүлийн мэдээ" posts={homePosts} onCard={handleCard} />
        </>
      )}

      {page === 'math' && (
        <>
          <Hero title="Математик" subtitle="Математикийн хичээл, уралдаан, шалгалтын материалууд" />
          <Section title="Математикийн мэдээ" posts={mathPosts} onCard={handleCard} />
        </>
      )}

      {page === 'info' && (
        <>
          <Hero title="Мэдээлэл зүй" subtitle="Мэдээлэл зүйн хичээл, олимпиад болон материалууд" />
          <Section title="Мэдээлэл зүйн мэдээ" posts={infoPosts} onCard={handleCard} />
        </>
      )}

      {page === 'config' && (
        <>
          <Hero title="Тохиргоо" subtitle="Системийн тохиргоо" />
          <div className={styles.empty}>
            <span>⚙️</span>
            <p>Тохиргооны хэсэг удахгүй нэмэгдэнэ</p>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

function Section({ title, posts, onCard }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <h2>{title}</h2>
        <div className={styles.sectionLine} />
      </div>
      {posts.length === 0 ? (
        <div className={styles.noContent}>
          <span>📭</span>
          <p>Одоогоор мэдээлэл байхгүй байна</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map((p, i) => (
            <PostCard key={p.id} post={p} onClick={onCard} delay={i * 80} />
          ))}
        </div>
      )}
    </section>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <strong>Шинэ Хөгжил сургууль</strong>
      <span> &nbsp;·&nbsp; Бүх эрх хуулиар хамгаалагдсан © 2026</span>
    </footer>
  )
}