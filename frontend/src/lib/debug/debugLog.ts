/* eslint-disable no-console */
const log = Number(process.env.NEXT_PUBLIC_DEBUG_FLAG) === 1 ? console.log.bind(console) : () => {}
/* eslint-enable no-console */

export const debugLog = (keyword: string, message: unknown) => {
  log(`path: ${'\u001b[34m'}${location.pathname}`)
  log(keyword, message)
}
