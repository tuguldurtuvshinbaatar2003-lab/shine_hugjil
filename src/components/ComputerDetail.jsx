import React, { useState } from 'react'
import { COMPUTER_DATA } from '../data'
import styles from './ComputerDetail.module.css'

const TURUL_META = {
  'Дунд':  { cls: 'tuDund',  icon: '📗', label: 'Дунд ангийн төрөл' },
  'Ахлах': { cls: 'tuAhlah', icon: '📘', label: 'Ахлах ангийн төрөл' },
  'Багш':  { cls: 'tuBagsh', icon: '🎓', label: 'Багшийн төрөл' },
}

const FILTERS = ['Бүгд', 'Дунд', 'Ахлах', 'Багш']

export default function ComputerDetail({ onBack }) {
  const [filter, setFilter] = useState('Бүгд')
  const [search, setSearch] = useState('')

  const filtered = COMPUTER_DATA.filter(d => {
    const matchFilter = filter === 'Бүгд' || d.turul === filter
    const q = search.toLowerCase()
    const matchSearch =
      !search ||
      d.ner.toLowerCase().includes(q) ||
      d.ovog.toLowerCase().includes(q) ||
      d.bagsh.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const dund  = COMPUTER_DATA.filter(d => d.turul === 'Дунд').length
  const ahlah = COMPUTER_DATA.filter(d => d.turul === 'Ахлах').length
  const bagsh = COMPUTER_DATA.filter(d => d.turul === 'Багш').length

  return (
    <div className={styles.wrap}>
      <button className={styles.back} onClick={onBack}>← Буцах</button>

      {/* Header */}
      <div className={styles.detailHeader}>
        <span className={styles.badge}>💻 Улсын олимпиад</span>
        <h1>Улсын төрөлжсөн мэдээлэл зүйн II давааны олимпиад</h1>
        <p>
          Багш төрөлд өөрөө болон ахлах, дунд ангийн төрөлд 3 сурагч бэлтгэн оролцуулсан.
          Ахлах ангийн төрөлд 12А ангийн сурагч <strong>П.Анхбаяр</strong> 6-р байранд орж
          бүсийн олимпиадад оролцох эрх авлаа. Амжилттай оролцсон бүх сурагчид болон багш нарт баяр хүргэе.
        </p>
      </div>

      {/* Highlight — П.Анхбаяр */}
      <div className={styles.highlight}>
        <div className={styles.highlightIcon}>🥇</div>
        <div className={styles.highlightBody}>
          <div className={styles.highlightName}>П.Анхбаяр — 12А анги</div>
          <div className={styles.highlightDesc}>
            Ахлах ангийн төрөлд <strong>6-р байр</strong> эзэлж
            <span className={styles.pill}>Бүсийн олимпиадад оролцох эрх</span> авлаа
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          { num: COMPUTER_DATA.length, label: 'Нийт оролцогч', icon: '👩‍💻' },
          { num: dund,  label: 'Дунд ангийн төрөл',  icon: '📗' },
          { num: ahlah, label: 'Ахлах ангийн төрөл', icon: '📘' },
          { num: bagsh, label: 'Багшийн төрөл',       icon: '🎓' },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Typing competition info */}
      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>⌨️</div>
        <div>
          <div className={styles.infoTitle}>"Гарын арван хурууны зөв байрлалаар бичих" тэмцээн</div>
          <div className={styles.infoText}>
            6-р ангийн 23 сурагч амжилттай оролцож, компьютерийн бичих хурд, зөв даралт,
            алдаагүй бичих чадвар сайжирсан үр дүнтэй арга хэмжээ болов.
            Сурагчдын МТ хичээлд оролцох сонирхол нэмэгдэж, багаар болон бие даан ажиллах
            чадвар хөгжсөн.
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <div className={styles.tableTop}>
          <h3>📋 Оролцогчдын жагсаалт</h3>
          <div className={styles.controls}>
            <input
              className={styles.search}
              placeholder="Нэр, багш хайх…"
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
                <th>Сурагч / Багш</th>
                <th>Төрөл</th>
                <th>Бэлтгэсэн багш</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const tm = TURUL_META[d.turul] || TURUL_META['Дунд']
                const isAnkhbayar = d.ner === 'Анхбаяр' && d.ovog === 'Пүрэвдорж'
                return (
                  <tr key={d.n} className={`${styles.row} ${isAnkhbayar ? styles.starRow : ''}`}
                    style={{ animationDelay: `${i * 16}ms` }}>
                    <td>
                      <div className={`${styles.rankNum} ${isAnkhbayar ? styles.rankStar : ''}`}>
                        {isAnkhbayar ? '⭐' : d.n}
                      </div>
                    </td>
                    <td>
                      <div className={styles.studentName}>{d.ner}</div>
                      <div className={styles.studentOvog}>{d.ovog}</div>
                    </td>
                    <td>
                      <span className={`${styles.turulBadge} ${styles[tm.cls]}`}>
                        {tm.icon} {d.turul}
                      </span>
                    </td>
                    <td className={styles.teacherName}>
                      {d.bagsh || <span className={styles.noBagsh}>—</span>}
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    Хайлтад тохирох үр дүн олдсонгүй
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          Нийт <strong>{filtered.length}</strong> оролцогч
        </div>
      </div>
    </div>
  )
}
