const log = Number(process.env.NEXT_PUBLIC_DEBUG_FLAG) === 1 ? console.log.bind(console) : () => {}

export const debugLog = (keyword, message) => {
  log(`path: ${'\u001b[34m'}${location.pathname}`)
  log(keyword, message)
}
