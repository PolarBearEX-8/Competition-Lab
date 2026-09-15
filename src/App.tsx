import { useState } from 'react'
import { camps, type Camp } from './data/camps'
import './styles.css'

const headers = ['Name', 'Organizer', 'Type', 'สาย', 'Open date', 'Last submit', 'State', 'Grade level']

function Details({ camp }: { camp: Camp }) {
  const details = [
    ['Description', camp.description], ['Eligible', camp.eligible], ['Event date', camp.eventDate], ['Team', camp.team],
    ['Cost', camp.cost], ['Found from', camp.source], ['Official source', camp.official], ['Last checked', camp.checked],
  ]
  return <div className="details"><div className="detail-grid">{details.map(([label, value]) => <div key={label}><span className="detail-label">{label}</span>{value}</div>)}</div></div>
}

function CampItem({ camp, expanded, onToggle }: { camp: Camp; expanded: boolean; onToggle: () => void }) {
  return <article className={`item${expanded ? ' open' : ''}`}>
    <div className="row">
      <div><button className="name-btn" onClick={onToggle} aria-expanded={expanded}><span className="caret" aria-hidden="true">›</span><span>{camp.name}</span></button></div>
      <div>{camp.organizer}</div><div>{camp.type}</div><div>{camp.fields}</div><div>{camp.open}</div><div>{camp.close}</div><div className={`state ${camp.stateClass}`}>{camp.state}</div><div>{camp.gradeLevel}</div>
    </div>
    {expanded ? <Details camp={camp} /> : null}
  </article>
}

function CampSection({ title, camps: sectionCamps, expandedName, onToggle }: { title: string; camps: Camp[]; expandedName: string | null; onToggle: (name: string) => void }) {
  return <section className="camp-section" aria-label={`${title} camps and competitions`}><h2>{title}</h2><div>{sectionCamps.map(camp => <CampItem key={camp.name} camp={camp} expanded={expandedName === camp.name} onToggle={() => onToggle(camp.name)} />)}</div></section>
}

export default function App() {
  const [expandedName, setExpandedName] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const toggle = (name: string) => setExpandedName(current => current === name ? null : name)
  const copyIp = async () => {
    await navigator.clipboard.writeText('2b2t-th.org')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const openCamps = camps.filter(camp => camp.stateClass === 'open' || camp.stateClass === 'soon')
  const upcomingCamps = camps.filter(camp => camp.stateClass === 'unknown')
  const closedCamps = camps.filter(camp => camp.stateClass === 'closed')
  return <main><div className="title-row"><div><h1>Camp & Competition List</h1><p className="sub">Engineering • Computer • AI • Robotics • Hackathon</p><p className="updated">Last updated: 15 Sep 2026</p></div><aside className="sponsor" aria-label="Sponsor"><img src="./2b2t-th.png" alt="2b2t-th" /><div><span>Sponsored by</span><strong>2b2t-th</strong><p>IP: <button className="ip-copy" onClick={() => void copyIp()}>2b2t-th.org</button> · 1.21.11–26.2 {copied ? <b className="copied" role="status">Copied!</b> : null}</p></div></aside></div><div className="table-wrap" aria-label="Camp and competition list"><div className="row header">{headers.map(header => <div key={header}>{header}</div>)}</div><CampSection title="Open" camps={openCamps} expandedName={expandedName} onToggle={toggle} /><CampSection title="Upcoming" camps={upcomingCamps} expandedName={expandedName} onToggle={toggle} /><CampSection title="Closed" camps={closedCamps} expandedName={expandedName} onToggle={toggle} /></div></main>
}
