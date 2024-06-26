import { create } from 'zustand'
import { time } from '../lib/time'
import type { FormError } from '../lib/validate'

type Data = IItems

type CreateItem = {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

export const useCreateItems = create<CreateItem>((set) => ({
  data: {
    kind: 'expenses',
    tag_ids: [],
    happen_at: time().toISOString,
    amount: 0
  },
  error: {
    kind: [],
    tag_ids: [],
    happen_at: [],
    amount: []
  },
  setData: (data: Partial<Data>) => {
    set(state => (
      {
        ...state,
        data: {
          ...state.data,
          ...data
        }
      }
    ))
  },
  setError: (error: Partial<FormError<Data>>) => {
    set(state => (
      {
        ...state,
        error: {
          ...error
        }
      }
    ))
  }
}))
