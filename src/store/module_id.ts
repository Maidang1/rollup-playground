import { create } from "zustand"

interface ModuleId {
  readonly moduleIds: string[]
}

interface ModuleCode {
  codeMap: Map<string, string>
}
const defaultCodeMap = new Map()
defaultCodeMap.set("virtual", "export default a = 2;")
export const useModuleIdStore = create<ModuleId>(() => ({
  moduleIds: ["virtual"],
}))
export const useModuleCodeStore = create<ModuleCode>(() => ({
  codeMap: defaultCodeMap,
}))

export const useCurrentSelectFileId = create<{ fileId: string }>(() => ({
  fileId: "virtual",
}))

export const addModuleId = (id: string | string[]) => {
  const idArr = Array.isArray(id) ? id : [id]
  useModuleIdStore.setState((state) => ({
    moduleIds: [...state.moduleIds, ...idArr],
  }))
}

export const updateModuleId = (preId: string, newId: string) => {
  const newModuleIds = useModuleIdStore
    .getState()
    .moduleIds.map((item) => (item === preId ? newId : item))

  useModuleIdStore.setState(() => ({ moduleIds: newModuleIds }))
  updateModuleCodeKey(preId, newId)
}

export const getModuleId = () => useModuleIdStore.getState().moduleIds

export const setModuleCode = (id: string, code: string) => {
  useModuleCodeStore.setState((pre) => ({
    codeMap: new Map(pre.codeMap).set(id, code),
  }))
}

export const updateModuleCodeKey = (preKey: string, newKey: string) => {
  const preMap = useModuleCodeStore.getState().codeMap
  preMap.set(newKey, getModuleCode(preKey) || "")
  preMap.delete(preKey)
  useModuleCodeStore.setState(() => ({
    codeMap: new Map(preMap),
  }))
}

export const getModuleCode = (id: string) =>
  useModuleCodeStore.getState().codeMap.get(id)

export const getSelectFileId = () => useCurrentSelectFileId.getState().fileId
export const setSelectFileId = (id: string) => {
  useCurrentSelectFileId.setState(() => ({ fileId: id }))
}
