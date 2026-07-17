import { useMemo, useState } from 'react'
import './App.css'

const postKey = 'haikyo-archive-map.posts'
const savedKey = 'haikyo-archive-map.saved'
const items = [
  {
    "id": "haikyo-archive-map-1",
    "title": "Nagoya closed shop opportunity",
    "category": "closed shop",
    "area": "Nagoya",
    "summary": "Rights-aware archive map for closed shops, Showa buildings, ruins, memory posts and safety notes. This page is designed as a searchable seed record with review intent, update status and conversion context.",
    "score": 92,
    "status": "verified seed",
    "tags": [
      "closed shop",
      "Nagoya",
      "UGC ready",
      "SEO cluster"
    ],
    "revenue": "photo zines"
  },
  {
    "id": "haikyo-archive-map-2",
    "title": "Tokyo hotel opportunity",
    "category": "hotel",
    "area": "Tokyo",
    "summary": "Rights-aware archive map for closed shops, Showa buildings, ruins, memory posts and safety notes. This page is designed as a searchable seed record with review intent, update status and conversion context.",
    "score": 85,
    "status": "verified seed",
    "tags": [
      "hotel",
      "Tokyo",
      "UGC ready",
      "SEO cluster"
    ],
    "revenue": "local tourism ads"
  },
  {
    "id": "haikyo-archive-map-3",
    "title": "Osaka leisure opportunity",
    "category": "leisure",
    "area": "Osaka",
    "summary": "Rights-aware archive map for closed shops, Showa buildings, ruins, memory posts and safety notes. This page is designed as a searchable seed record with review intent, update status and conversion context.",
    "score": 78,
    "status": "needs verification",
    "tags": [
      "leisure",
      "Osaka",
      "UGC ready",
      "SEO cluster"
    ],
    "revenue": "safe guide membership"
  }
]
const revenuePlans = [
  "photo zines",
  "local tourism ads",
  "safe guide membership",
  "stay leads",
  "archive sponsorship"
]
const buzzIdeas = [
  "UGC campaign for before/after reports",
  "city and category ranking pages",
  "verified owner badge program",
  "shareable comparison cards for X",
  "monthly sponsor landing pages"
]
const faq = [
  ['How is this optimized for AI search?', 'Each page exposes concise answers, comparison signals, FAQ copy, structured metadata, update status and clear entity names.'],
  ['What can users submit?', 'Users can submit reviews, correction reports, photos, price notes, stock notes and local tips depending on the app theme.'],
  ['Where does monetization happen?', 'The main paths are affiliate links, booking or lead commissions, paid listings, sponsored pages and premium reports.'],
]

function readArray(key) {
  try { return JSON.parse(localStorage.getItem(key)) ?? [] } catch { return [] }
}

function App() {
  const [query, setQuery] = useState('Nagoya')
  const [category, setCategory] = useState('all')
  const [posts, setPosts] = useState(() => readArray(postKey))
  const [saved, setSaved] = useState(() => readArray(savedKey))
  const [form, setForm] = useState({ title: '', category: 'closed shop', body: '' })
  const categories = ['all', ...new Set(items.map((item) => item.category))]

  const filtered = useMemo(() => items.filter((item) => {
    const text = [item.title, item.category, item.area, item.summary, item.tags.join(' ')].join(' ').toLowerCase()
    return text.includes(query.toLowerCase()) && (category === 'all' || item.category === category)
  }), [query, category])

  function saveItem(id) {
    const next = saved.includes(id) ? saved.filter((item) => item !== id) : [...saved, id]
    setSaved(next)
    localStorage.setItem(savedKey, JSON.stringify(next))
  }

  function submitPost(event) {
    event.preventDefault()
    if (!form.title.trim() || !form.body.trim()) return
    const next = [{ ...form, id: crypto.randomUUID(), date: new Date().toLocaleDateString() }, ...posts]
    setPosts(next)
    localStorage.setItem(postKey, JSON.stringify(next))
    setForm({ title: '', category: 'closed shop', body: '' })
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <span className="brand">haikyoarchive.jp / haikyo-archive-map</span>
          <h1>Haikyo Archive Map</h1>
          <p>Rights-aware archive map for closed shops, Showa buildings, ruins, memory posts and safety notes.</p>
        </div>
        <aside className="answer-box">
          <small>AI overview answer</small>
          <strong>Haikyo Archive Map helps users compare, verify and act faster.</strong>
          <p>Built with SEO/AIO/LLMO blocks, UGC loops, review intent and revenue-ready callouts from the first release.</p>
        </aside>
      </section>

      <section className="search-panel" aria-label="Search filters">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search area, category, review or keyword" />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </section>

      <section className="summary-grid">
        <article><span>Seed records</span><strong>{items.length}</strong></article>
        <article><span>UGC posts</span><strong>{posts.length}</strong></article>
        <article><span>Saved leads</span><strong>{saved.length}</strong></article>
      </section>

      <section className="content-grid">
        {filtered.map((item) => (
          <article className="card" key={item.id}>
            <div className="card-topline"><span>{item.area}</span><span>{item.status}</span></div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="metric-row"><b>Intent score {item.score}</b><b>{item.category}</b></div>
            <p className="revenue-note">Revenue path: {item.revenue}</p>
            <button type="button" onClick={() => saveItem(item.id)}>{saved.includes(item.id) ? 'Saved' : 'Save lead'}</button>
          </article>
        ))}
      </section>

      <section className="ugc-section">
        <h2>UGC submission desk</h2>
        <p>Collect review snippets, correction requests, photo notes and owner updates. These become freshness signals and long-tail landing pages.</p>
        <form className="ugc-form" onSubmit={submitPost}>
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Report title" />
          <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
            {["closed shop","hotel","leisure","game center","factory"].map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="Review, correction, stock, price or local tip" />
          <button>Post</button>
        </form>
        <div className="post-grid">
          {posts.length === 0 && <p className="empty-text">No UGC yet. Seed the first report after launch.</p>}
          {posts.map((post) => <article key={post.id}><b>{post.title}</b><p>{post.body}</p><small>{post.category} / {post.date}</small></article>)}
        </div>
      </section>

      <section className="growth-grid">
        <div className="revenue-panel">
          <h2>Revenue routes</h2>
          {revenuePlans.map((plan) => <article key={plan}><b>{plan}</b><p>Connect this route to high-intent pages, verified profiles, alerts or comparison CTAs.</p></article>)}
        </div>
        <div className="buzz-panel">
          <h2>Buzz loops</h2>
          <ul>{buzzIdeas.map((idea) => <li key={idea}>{idea}</li>)}</ul>
        </div>
      </section>

      <section className="seo-section">
        <h2>FAQ for SEO, AIO and LLMO</h2>
        <div className="faq-grid">
          {faq.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
        </div>
      </section>
    </main>
  )
}

export default App
