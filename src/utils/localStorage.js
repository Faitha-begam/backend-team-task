export function getData(key) {
  try { return JSON.parse(localStorage.getItem(key)) ?? [] } catch { return [] }
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeData(key) {
  localStorage.removeItem(key)
}
