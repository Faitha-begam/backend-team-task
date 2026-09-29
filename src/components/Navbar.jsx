import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [['Home', '/'], ['Departments', '/departments'], ['Services', '/services'], ['Issues', '/issues']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const nav = 'text-sm font-medium text-slate-600 hover:text-emerald-800'
  return <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3"><Link to="/" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-900 text-sm font-bold text-white">TN</span><span><span className="block text-sm font-semibold text-slate-900">Tamil Nadu Digital Governance</span><span className="block text-[11px] text-slate-500">Public Administration Portal</span></span></Link><button className="rounded-md border px-3 py-2 text-sm md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? 'Close' : 'Menu'}</button><nav className={`${open ? 'absolute left-0 right-0 top-full flex border-b bg-white p-5' : 'hidden'} flex-col gap-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>{links.map(([label, to]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `${nav} ${isActive ? 'text-emerald-900' : ''}`}>{label}</NavLink>)}</nav></div></header>
}
