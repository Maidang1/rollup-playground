import { useEffect, useState } from "react"
import { ROLLUP_VERSION, compile } from "./feature/rollup"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { Button } from "@geist-ui/core"

import "./App.css"
import { TreeList } from "./components/edit-tree"

function App() {
  const [code, setCode] = useState("")
  useEffect(() => {
    compile({
      input: "virtual",
    }).then((code) => setCode(code))
  }, [])

  return (
    <div className="h-screen">
      <div className="flex items-center relative h-12 justify-between px-2">
        <div className="font-bold text-xl">
          Rollup Version: {ROLLUP_VERSION}
        </div>
        <Button auto type="success-light" className="text-xl mr-3">
          Bundle
        </Button>
      </div>
      <div className="code-content h-full">
        <div className="code-edit">
          <div className="flex h-full">
            <TreeList />
            <CodeMirror
              value="console.log('hello world!');"
              height="100%"
              className="w-full"
              extensions={[javascript({ jsx: true })]}
            />
          </div>
        </div>
        <div className="code-result">
          <div className="flex h-full">
            <CodeMirror
              value="console.log('hello world!');"
              height="200px"
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
