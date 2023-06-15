import { RollupOptions } from "@rollup/browser"
import { create } from "zustand"

interface RollupConfig {
  config: RollupOptions
}

export const useRollupConfig = create<RollupConfig>(() => ({
  config: {
    output: {
      format: "commonjs",
      preserveModules: true,
    },
    treeshake: true,
  },
}))

export const getRollupConfig = () => {
  return useRollupConfig.getState().config
}

export const updateRollupConfig = (config: RollupOptions) => {
  useRollupConfig.setState(() => ({ config }))
}
