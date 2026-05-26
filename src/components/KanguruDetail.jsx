import React, { useState } from 'react'
import { KANGURU_DATA } from '../data'
import styles from './KanguruDetail.module.css'

const MEDAL_MAP = {
  'мөнгөн медаль': { cls: styles.silver, icon: '🥈', label: 'I зэрэг • Мөнгөн' },
  'хүрэл медаль':  { cls: styles.bronze, icon: '🥉', label: 'I зэрэг • Хүрэл'  },
  'II зэргийн':    { cls: styles.d2,     icon: '📜', label: 'II зэрэг'           },
  'III зэргийн':   { cls: styles.d3,     icon: '📄', label: 'III зэрэг'          },
}

function getMedal(shagnal) {
  for (const [key, val] of Object.entries(MEDAL_MAP)) {
    if (shagnal.includes(key)) return val
  }
  return { cls: styles.d3, icon: '📄', label: shagnal }
}

const FILTERS = ['Бүгд', 'I зэрэг', 'II зэрэг', 'III зэрэг']

export default function KanguruDetail({ onBack }) {
  const [filter, setFilter] = useState('Бүгд')
  const [search, setSearch] = useState('')

  const filtered = KANGURU_DATA.filter(d => {
    const matchFilter =
      filter === 'Бүгд' ||
      (filter === 'I зэрэг'   && d.shagnal.includes('I зэргийн диплом')) ||
      (filter === 'II зэрэг'  && d.shagnal.includes('II зэргийн')) ||
      (filter === 'III зэрэг' && d.shagnal.includes('III зэргийн'))

    const q = search.toLowerCase()
    const matchSearch =
      !search ||
      d.ner.toLowerCase().includes(q) ||
      d.ovog.toLowerCase().includes(q) ||
      d.angi.toLowerCase().includes(q) ||
      d.bagsh.toLowerCase().includes(q)

    return matchFilter && matchSearch
  })

  const i1 = KANGURU_DATA.filter(d => d.shagnal.includes('I зэргийн')).length
  const i2 = KANGURU_DATA.filter(d => d.shagnal.includes('II зэргийн')).length
  const i3 = KANGURU_DATA.filter(d => d.shagnal.includes('III зэргийн')).length

  return (
    <div className={styles.wrap}>
      <button className={styles.back} onClick={onBack}>
        ← Буцах
      </button>

      {/* Header card */}
      <div className={styles.detailHeader}>
        <span className={styles.badge}>🦘 Олон улсын уралдаан</span>
        <h1>Олон улсын "Кенгуру-2026" математикийн уралдаан</h1>
        <p>
          2026 оны 3 сарын 23 өдөр амжилттай зохион байгуулагдлаа.
          Тус уралдаанд 5–12-р ангийн нийт 158 сурагч оролцож дараах сурагчид
          амжилттай оролцлоо. Амжилттай оролцсон хүүхдүүддээ баяр хүргэе.
        </p>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { num: 158,  label: 'Нийт оролцогч', icon: '👩‍🎓' },
          { num: i1,   label: 'I зэргийн диплом', icon: '🏅' },
          { num: i2,   label: 'II зэргийн диплом', icon: '📜' },
          { num: i3,   label: 'III зэргийн диплом', icon: '📄' },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <div className={styles.tableTop}>
          <h3>🏅 Шагналтнуудын жагсаалт</h3>
          <div className={styles.controls}>
            <input
              className={styles.search}
              placeholder="Нэр, анги, багш хайх…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className={styles.filters}>
              {FILTERS.map(f => (
                <button
                  key={f}
                  className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Сурагч</th>
                <th>Анги</th>
                <th>Шагнал</th>
                <th>Математикийн багш</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const medal = getMedal(d.shagnal)
                return (
                  <tr key={d.n} style={{ animationDelay: `${i * 18}ms` }} className={styles.row}>
                    <td>
                      <div className={`${styles.rankNum} ${d.n <= 3 ? styles.top : ''}`}>
                        {d.n}
                      </div>
                    </td>
                    <td>
                      <div className={styles.studentName}>{d.ner}</div>
                      <div className={styles.studentOvog}>{d.ovog}</div>
                    </td>
                    <td>
                      <span className={styles.gradeBadge}>{d.angi}</span>
                    </td>
                    <td>
                      <span className={`${styles.diplomaBadge} ${medal.cls}`}>
                        {medal.icon} {medal.label}
                      </span>
                    </td>
                    <td className={styles.teacherName}>{d.bagsh}</td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>Хайлтад тохирох үр дүн олдсонгүй</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          Нийт <strong>{filtered.length}</strong> үр дүн
        </div>
      </div>
    </div>
  )
}
