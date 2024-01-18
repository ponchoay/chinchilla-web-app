export type CareType = {
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

export type GetCareWeightType = { careDay: string; careWeight: number }
export type ChangeCareDayToDateCareWeightType = { careDay: Date; careWeight: number }
export type ChangeCareDayToNumCareWeightType = { careDay: number; careWeight: number }
