import { rollup, VERSION } from "@rollup/browser/dist/rollup.browser"

import { getModuleCode, getModuleId } from "../store/module_id"

export const ROLLUP_VERSION = VERSION

type RollupOptions = Parameters<typeof rollup>[number]

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
      return id
    },
  }
}

export const compile = async (options: RollupOptions) => {
  const plugins = Array.isArray(options.plugins)
    ? options.plugins
    : [options.plugins]
  const bundle = await rollup({
    ...options,
    plugins: [resolveVirtual(), ...plugins],
  })

  const outputOption = Array.isArray(options.output)
    ? options.output[0]
    : options.output
  const res = await bundle.generate(
    outputOption || {
      format: "commonjs",
    }
  )
  return res.output[0].code
}
