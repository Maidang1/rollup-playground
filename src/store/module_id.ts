import { create } from 'zustand';

interface ModuleId {
  readonly moduleIds: string[];
}

interface ModuleCode {
  codeMap: Map<string, string>;
}

export const useModuleIdStore = create<ModuleId>(() => ({
  moduleIds: ['virtual'],
}));

const defaultCodeMap = new Map();
defaultCodeMap.set('virtual', 'export default a = 2;');

export const useModuleCodeStore = create<ModuleCode>(() => ({
  codeMap: defaultCodeMap,
}));

export const setModuleId = (id: string | string[]) => {
  const idArr = Array.isArray(id) ? id : [id];
  useModuleIdStore.setState((state) => ({
    moduleIds: [...state.moduleIds, ...idArr],
  }));
};

export const getModuleId = () => useModuleIdStore.getState().moduleIds;

export const setModuleCode = (id: string, code: string) => {
  useModuleCodeStore.setState((pre) => ({
    codeMap: new Map(pre.codeMap).set(id, code),
  }));
};

export const getModuleCode = (id: string) =>
  useModuleCodeStore.getState().codeMap.get(id);
