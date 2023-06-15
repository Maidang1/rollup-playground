import { useEffect, useMemo } from "react"
import { ROLLUP_VERSION, compile } from "./feature/rollup"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { Button } from "@geist-ui/core"

import "./App.css"
import { TreeList } from "./components/edit-tree"
import {
  getModuleCode,
  setModuleCode,
  useCurrentSelectFileId,
  getModuleId,
  useModuleIdStore,
} from "./store/module_id"
import { ConfigModal } from "./components/rollup-config"
import { useOutputCode } from "./store/output"
import CodeBlock from "./components/code-block"

function App() {
  const selectFileId = useCurrentSelectFileId((state) => state.fileId)
  const moduleId = useModuleIdStore.getState().moduleIds
  const outputCodeMap = useOutputCode((state) => state.outputCode)

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex items-center relative h-12 justify-between px-2">
        <div className="font-bold text-xl">
          Rollup Version: {ROLLUP_VERSION}
        </div>
        <Button
          auto
          type="success-light"
          className="text-xl mr-3"
          onClick={() => compile({})}
        >
          Bundle
        </Button>
        <ConfigModal />
      </div>
      <div className="code-content h-full">
        <div className="code-edit">
          <div className="flex h-full">
            <TreeList />
            <CodeMirror
              value={getModuleCode(selectFileId)}
              height="100%"
              className="w-full"
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => {
                setModuleCode(selectFileId, value)
              }}
              theme="dark"
            />
          </div>
        </div>
        <div className="code-result px-2 border-l border-solid">
          <div>
            {moduleId.map((id) => (
              <CodeBlock code={outputCodeMap[id] || ""} key={id} title={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
