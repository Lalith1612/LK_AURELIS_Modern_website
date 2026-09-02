export function formatCurrency(amount, isDelta = false) {
  if (typeof amount !== 'number') return '$0'
  
  if (amount === 0) {
    return isDelta ? 'INCLUDED' : '$0'
  }
  
  const formatted = '$' + amount.toLocaleString('en-US')
  return isDelta ? `+${formatted}` : formatted
}
