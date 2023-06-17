import { rollup, VERSION } from "@rollup/browser/dist/rollup.browser"

import { getModuleCode, getModuleId } from "../store/module_id"
import { getRollupConfig } from "../store/rollup_config"
import { getEntryIds } from "../store/entry-id"

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
      if (isVirtualModule(id)) {
        const moduleCode = getModuleCode(id) || ""
        return moduleCode
      }
      return null
    },
    resolveId(id: string) {
      return id.replace("./", "")
    },
  }
}

export const compile = async (options: RollupOptions) => {
  const rollupConfig = getRollupConfig()
  const entryIds = getEntryIds()
  const plugins = Array.isArray(options.plugins)
    ? options.plugins
    : [options.plugins]
  const bundle = await rollup({
    ...options,
    ...rollupConfig,
    plugins: [resolveVirtual(), ...plugins],
    input: entryIds || rollupConfig.input || options.input || "virtual",
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

  return res.output
}
