export function decodeHTMLEntities (text: string) {
  const element = document.createElement('div')
  if (text) {
    element.innerHTML = text
    return element.textContent
  }
  return text
}
