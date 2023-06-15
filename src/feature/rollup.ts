import { rollup, VERSION, Plugin } from "@rollup/browser/dist/rollup.browser"

import { getModuleCode, getModuleId } from "../store/module_id"
import { getRollupConfig } from "../store/rollup_config"
import { setOutputCode } from "../store/output"

export const ROLLUP_VERSION = VERSION

export type RollupOptions = Parameters<typeof rollup>[number]

const isVirtualModule = (id: string) => {
  const ids = getModuleId()
  const virtualId = id.replace("./", "")
  return ids.includes(virtualId)
}

const resolveVirtual = () => {
  return {
    name: "resolve-virtual",
    load(id: string) {
      console.log("load id =====>", id)
      if (isVirtualModule(id)) {
        const moduleCode = getModuleCode(id) || ""
        return moduleCode
      }

      return null
    },

    resolveId(id: string) {
      console.log("resolveId ====>", id)
      return id.replace("./", "")
    },
    generateBundle(_options: any, bundle: any) {
      const outputCodeMap: Record<string, string> = {}
      Object.keys(bundle).forEach((key) => {
        const { code, facadeModuleId } = bundle[key]
        outputCodeMap[facadeModuleId] = code
      })
      setOutputCode(outputCodeMap)
    },
  }
}

export const compile = async (options: RollupOptions) => {
  const rollupConfig = getRollupConfig()
  const plugins = Array.isArray(options.plugins)
    ? options.plugins
    : [options.plugins]
  const bundle = await rollup({
    ...options,
    ...rollupConfig,
    plugins: [resolveVirtual(), ...plugins],
    input: rollupConfig.input || options.input || "virtual",
  })

  const outputOption = Array.isArray(options.output)
    ? options.output[0]
    : options.output
  const res = await bundle.generate(
    outputOption || {
      format: "commonjs",
      ...rollupConfig.output,
    }
  )
  return res.output[0].code
}
