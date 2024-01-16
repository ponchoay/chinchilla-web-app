export type RhfInputFormType = {
  htmlFor: string
  label: string
  explanation: string | null
  id: string
  type: string
  autoComplete: string | undefined
  name: string
  placeholder: string | undefined
  passwordForm: boolean
}

export type RhfRadioButtonType = { name: string }

export type RhfTextareaFormType = {
  htmlFor: string
  label: string
  id: string
  name: string
}
