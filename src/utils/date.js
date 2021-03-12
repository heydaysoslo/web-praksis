export const formatArticeDate = (str) => {
  if (!str) {
    return str
  }
  return new Date(str).toLocaleDateString('nb-no', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
