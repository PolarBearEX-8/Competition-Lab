import { useEffect, useState, type ReactNode } from 'react'
import { camps, type Camp } from './data/camps'
import './styles.css'

const checkedDates = camps.map(camp => {
  const value = camp.checked.trim()
  // Both the existing English dates and the researcher's ISO dates are date-only.
  const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? Date.parse(`${value}T12:00:00+07:00`)
    : Date.parse(`${value} 12:00:00 GMT+0700`)
  return timestamp
}).filter(Number.isFinite)
const latestUpdated = checkedDates.length
  ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' }).format(new Date(Math.max(...checkedDates)))
  : 'Unknown'

const headers = ['Name', 'Organizer', 'Type', 'สาย', 'Open date', 'Last submit', 'State', 'Grade level']
const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR
const isCompetition = (camp: Camp) => /competition|hackathon|challenge|olympiad|game jam/i.test(camp.type)

type LiveState = { label: string; className: 'open' | 'soon' | 'closed' | 'unknown'; section: 'Open' | 'Upcoming' | 'Closed' }

function countdown(prefix: 'Open' | 'Close', milliseconds: number) {
  if (milliseconds < DAY) return `${prefix} in ${Math.max(1, Math.ceil(milliseconds / HOUR))} Hr`
  return `${prefix} in ${Math.ceil(milliseconds / DAY)} days`
}

export function getLiveState(camp: Camp, now: number): LiveState {
  const opens = camp.openAt ? new Date(camp.openAt).getTime() : undefined
  const closes = camp.closeAt ? new Date(camp.closeAt).getTime() : undefined

  if (closes !== undefined && now > closes) return { label: 'Closed', className: 'closed', section: 'Closed' }
  if (camp.registrationState === 'closed') return { label: 'Closed', className: 'closed', section: 'Closed' }
  if (opens !== undefined && now < opens) return { label: countdown('Open', opens - now), className: 'unknown', section: 'Upcoming' }
  if (camp.registrationState === 'watch') return { label: 'Needs verification', className: 'unknown', section: 'Upcoming' }
  if (camp.registrationState === 'upcoming') return { label: 'Not open yet', className: 'unknown', section: 'Upcoming' }
  if (closes !== undefined) {
    const remaining = closes - now
    return { label: countdown('Close', remaining), className: remaining <= 7 * DAY ? 'soon' : 'open', section: 'Open' }
  }
  return { label: 'Open / Unknown deadline', className: 'open', section: 'Open' }
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}<span className="external" aria-hidden="true">↗</span></a>
}

function Details({ camp }: { camp: Camp }) {
  const details: [string, ReactNode][] = [
    ['Description', camp.description], ['Eligibility', camp.eligible], ['Event date', camp.eventDate], ['Location', camp.location],
    ['Team size', camp.team], ['Cost', camp.cost], ['Prize', camp.prize], ['Apply', <ExternalLink href={camp.applyLink}>ตรวจสอบการสมัคร / Registration</ExternalLink>],
    ['Instagram', camp.instagram ? <ExternalLink href={camp.instagram}>Organizer Instagram</ExternalLink> : '—'],
    ['Source / Website', <ExternalLink href={camp.officialWebsite}>อ่านประกาศและแหล่งข้อมูล</ExternalLink>],
    ['Found from', camp.discoverySource], ['Last checked', camp.checked],
  ]
  if (camp.notes) details.push(['Notes', camp.notes])

  return <div className="details"><div className="detail-grid">{details.map(([label, value]) => <div key={label}><span className="detail-label">{label}</span>{value}</div>)}</div></div>
}

function CampItem({ camp, now, expanded, onToggle }: { camp: Camp; now: number; expanded: boolean; onToggle: () => void }) {
  const state = getLiveState(camp, now)
  return <article className={`item${expanded ? ' open' : ''}`}>
    <div className="row">
      <div><button className="name-btn" onClick={onToggle} aria-expanded={expanded}><span className="caret" aria-hidden="true">›</span><span>{camp.name}</span></button></div>
      <div>{camp.organizer}</div><div>{camp.type}</div><div>{camp.fields}</div><div>{camp.open}</div><div>{camp.close}</div><div className={`state ${state.className}`}>{state.label}</div><div>{camp.gradeLevel}</div>
    </div>
    {expanded ? <Details camp={camp} /> : null}
  </article>
}

function CampSection({ title, sectionCamps, now, expandedName, onToggle }: { title: string; sectionCamps: Camp[]; now: number; expandedName: string | null; onToggle: (name: string) => void }) {
  if (sectionCamps.length === 0) return null
  return <section className="camp-section" aria-label={`${title} camps and competitions`}><h2>{title} <span className="count">{sectionCamps.length}</span></h2><div>{sectionCamps.map(camp => <CampItem key={camp.name} camp={camp} now={now} expanded={expandedName === camp.name} onToggle={() => onToggle(camp.name)} />)}</div></section>
}

export default function App() {
  const [expandedName, setExpandedName] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [query, setQuery] = useState('')
  const [competitionsOnly, setCompetitionsOnly] = useState(true)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const toggle = (name: string) => setExpandedName(current => current === name ? null : name)
  const copyIp = async () => {
    await navigator.clipboard.writeText('2b2t-th.org')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const grouped: Record<LiveState['section'], Camp[]> = { Open: [], Upcoming: [], Closed: [] }
  for (const camp of camps) {
    if (competitionsOnly && !isCompetition(camp)) continue
    if (query.trim() && !`${camp.name} ${camp.organizer} ${camp.fields} ${camp.description} ${camp.location}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())) continue
    const section = getLiveState(camp, now).section
    const closedAt = camp.closeAt ? new Date(camp.closeAt).getTime() : undefined
    if (section === 'Closed' && (closedAt === undefined || now - closedAt > 7 * DAY)) continue
    grouped[section].push(camp)
  }
  for (const section of Object.values(grouped)) {
    section.sort((a, b) => Number(isCompetition(b)) - Number(isCompetition(a)) || (a.closeAt ? Date.parse(a.closeAt) : Infinity) - (b.closeAt ? Date.parse(b.closeAt) : Infinity) || a.name.localeCompare(b.name, 'th'))
  }
  const resultCount = grouped.Open.length + grouped.Upcoming.length + grouped.Closed.length

  return <main>
    <div className="title-row"><div><h1>Camp & Competition List</h1><p className="sub">รวมงานแข่งขันและค่าย เน้นมหาวิทยาลัยไทย</p><p className="sub">Engineering • Computer • AI • Robotics • Hackathon • Science • Business</p><p className="updated">อัปเดตรายการ: {latestUpdated} · วันที่ตรวจสอบแต่ละงานอยู่ในรายละเอียด</p></div><aside className="sponsor" aria-label="Sponsor"><img src="./2b2t-th.png" alt="2b2t-th" /><div><span>Sponsored by</span><strong>2b2t-th</strong><p>IP: <button className="ip-copy" onClick={() => void copyIp()}>2b2t-th.org</button> · 1.21.11–26.2 {copied ? <b className="copied" role="status">Copied!</b> : null}</p></div></aside></div>
    <div className="filters"><label className="search">ค้นหากิจกรรม / มหาวิทยาลัย<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="เช่น มหิดล, UTCC, Robotics" /></label><label className="competition-filter"><input type="checkbox" checked={competitionsOnly} onChange={event => setCompetitionsOnly(event.target.checked)} />เฉพาะงานแข่งขัน / Hackathon</label><span role="status">{resultCount} รายการ</span></div>
    <p className="sub">เรียงงานแข่งขันก่อน แล้วตามวันปิดรับสมัคร · ตรวจระดับชั้นและเงื่อนไขจากประกาศก่อนสมัคร</p>
    {resultCount === 0 ? <p className="empty">ไม่พบรายการ ลองเปลี่ยนคำค้นหรือปิดตัวกรองงานแข่งขัน</p> : null}
    <div className="table-wrap" aria-label="Camp and competition list"><div className="row header">{headers.map(header => <div key={header}>{header}</div>)}</div>
      <CampSection title="Open" sectionCamps={grouped.Open} now={now} expandedName={expandedName} onToggle={toggle} />
      <CampSection title="Upcoming / รอตรวจสอบ" sectionCamps={grouped.Upcoming} now={now} expandedName={expandedName} onToggle={toggle} />
      <CampSection title="Closed" sectionCamps={grouped.Closed} now={now} expandedName={expandedName} onToggle={toggle} />
    </div>
  </main>
}
