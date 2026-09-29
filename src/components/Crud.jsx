import { useState } from 'react'
import { getData, saveData } from '../utils/localStorage'

export function useRecords(key) {
  const [records, setRecords] = useState(() => getData(key))
  const persist = (next) => { setRecords(next); saveData(key, next) }
  const upsert = (record) => persist(record.id ? records.map((item) => item.id === record.id ? record : item) : [...records, { ...record, id: Date.now() }])
  const remove = (id) => persist(records.filter((item) => item.id !== id))
  return { records, upsert, remove }
}

export function EntityForm({ title, entity, fields, onSave, onCancel }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, entity?.[f.name] ?? ''])))
  const [error, setError] = useState('')
  function submit(event) { event.preventDefault(); if (fields.some((f) => f.required !== false && !String(values[f.name]).trim())) { setError('Please complete all required fields.'); return } setError(''); onSave({ ...entity, ...values }) }
  return <form onSubmit={submit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-semibold">{entity ? `Edit ${title}` : `Add ${title}`}</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{fields.map((f) => <label key={f.name} className="text-sm font-medium text-slate-700">{f.label}<div className="mt-1">{f.options ? <select className="field" value={values[f.name]} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}><option value="">Select {f.label.toLowerCase()}</option>{f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select> : <input className="field" value={values[f.name]} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} placeholder={f.placeholder || `Enter ${f.label.toLowerCase()}`} />}</div></label>)}</div>{error && <p className="mt-3 text-sm text-red-700">{error}</p>}<div className="mt-4 flex gap-2"><button className="button-primary">{entity ? `Update ${title}` : `Add ${title}`}</button>{entity && <button type="button" className="button-secondary" onClick={onCancel}>Cancel</button>}</div></form>
}

export function DataTable({ columns, rows, onEdit, onDelete, empty }) {
  if (!rows.length) return <div className="rounded-lg border border-dashed border-slate-300 bg-white px-5 py-9 text-center"><p className="font-medium text-slate-700">{empty}</p></div>
  return <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white"><table className="w-full min-w-[600px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr>{columns.map((c) => <th key={c.key} className="px-4 py-3 font-semibold">{c.label}</th>)}<th className="px-4 py-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{rows.map((row) => <tr key={row.id} className="hover:bg-slate-50/70">{columns.map((c) => <td key={c.key} className="px-4 py-3 text-slate-700">{c.render ? c.render(row) : row[c.key]}</td>)}<td className="whitespace-nowrap px-4 py-3"><button onClick={() => onEdit(row)} className="font-medium text-emerald-900 hover:underline">Edit</button><button onClick={() => onDelete(row)} className="ml-4 font-medium text-slate-500 hover:text-red-700">Delete</button></td></tr>)}</tbody></table></div>
}
