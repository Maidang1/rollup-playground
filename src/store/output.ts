import { create } from "zustand"

export const useOutputCode = create<{ outputCode: Record<string, string> }>(
  () => ({
    outputCode: {},
  })
)

export const getOutputCode = () => {
  return useOutputCode.getState().outputCode
}

export const setOutputCode = (newMap: Record<string, string>) => {
  useOutputCode.setState((state) => {
    return {
      outputCode: {
        ...state.outputCode,
        ...newMap,
      },
    }
  })
}
