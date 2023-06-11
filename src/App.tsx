import { useState } from "react"
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
} from "./store/module_id"

function App() {
  const selectFileId = useCurrentSelectFileId((state) => state.fileId)
  const [compiledCode, setCompiledCode] = useState("")
  const handleBundle = async () => {
    const code = await compile({ input: "virtual" })
    console.log(code)
    setCompiledCode(code)
  }

  return (
    <div className="h-screen">
      <div className="flex items-center relative h-12 justify-between px-2">
        <div className="font-bold text-xl">
          Rollup Version: {ROLLUP_VERSION}
        </div>
        <Button
          auto
          type="success-light"
          className="text-xl mr-3"
          onClick={handleBundle}
        >
          Bundle
        </Button>
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
            />
          </div>
        </div>
        <div className="code-result">
          <div className="flex h-full">
            <CodeMirror
              value={compiledCode || "// click Bundle to build you code"}
              height="100%"
              extensions={[javascript({ jsx: true })]}
              className="w-full"
              readOnly
              editable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
