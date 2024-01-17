export type AllCaresType = {
  id: number
  careDay: string
  careFood: string
  careToilet: string
  careBath: string
  carePlay: string
  careWeight: number | null
  careTemperature: number | null
  careHumidity: number | null
  careMemo: string
  chinchillaId: number
}

export type CreateCareType = {
  careDay: string
  careFood: string
  careToilet: string
  careBath: string
  carePlay: string
  careWeight: number | null
  careTemperature: number | null
  careHumidity: number | null
  careMemo: string
  chinchillaId: number
}

export type UpdateCareType = {
  careFood: string
  careToilet: string
  careBath: string
  carePlay: string
  careWeight: number | null
  careTemperature: number | null
  careHumidity: number | null
  careMemo: string
}
