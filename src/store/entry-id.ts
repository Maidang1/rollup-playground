import { create } from "zustand"

export const useEntryIds = create<{ entryIds: string[] }>(() => ({
  entryIds: ["main.js"],
}))

export const addEntryId = (id: string | string[]) => {
  const idArr = Array.isArray(id) ? id : [id]
  useEntryIds.setState((state) => ({
    entryIds: [...state.entryIds, ...idArr],
  }))
}

export const deleteEntryId = (id: string) => {
  useEntryIds.setState((state) => ({
    entryIds: state.entryIds.filter((item) => item !== id),
  }))
}

export const getEntryIds = () => useEntryIds.getState().entryIds
