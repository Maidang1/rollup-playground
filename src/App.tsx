import { ROLLUP_VERSION, compile } from "./feature/rollup"
import { Button } from "@geist-ui/core"

import "./App.css"
import {
  getModuleCode,
  setModuleCode,
  useModuleIdStore,
  updateModuleId,
  addModuleId,
  deleteModuleId,
} from "./store/module_id"
import { ConfigModal } from "./components/rollup-config"
import { CodeMirrorBlock } from "./components/code-mirror"
import { addEntryId, deleteEntryId, useEntryIds } from "./store/entry-id"
import { useState } from "react"

interface TransferCodeType {
  code: string
  facadeModuleId: string
}

function App() {
  const moduleId = useModuleIdStore((state) => state.moduleIds)
  const entryIds = useEntryIds((state) => state.entryIds)
  const handleAddModule = () => {
    addModuleId("module_" + moduleId.length + ".js")
  }

  const [transferCode, setTransferCode] = useState<TransferCodeType[]>([])

  const handleCompile = async () => {
    const transformedCode = await compile({})
    setTransferCode(transformedCode as TransferCodeType[])
  }

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
          onClick={handleCompile}
        >
          Bundle
        </Button>
        <ConfigModal />
      </div>
      <div className="code-content h-full flex">
        <div className="code-edit w-[50%]">
          <div className="flex h-full box-border flex-col">
            {moduleId.map((id) => (
              <CodeMirrorBlock
                value={getModuleCode(id) || ""}
                title={id}
                key={id}
                onCodeChange={(value) => {
                  setModuleCode(id, value)
                }}
                onTitleChange={(title) => {
                  updateModuleId(id, title)
                }}
                onAdd={(title) => {
                  if (entryIds.includes(title)) {
                    deleteEntryId(title)
                  } else {
                    addEntryId(title)
                  }
                }}
                onDelete={(title) => {
                  deleteModuleId(title)
                }}
                isEntryId={entryIds.includes(id)}
              />
            ))}

            <div
              className="text-white py-3 box-border rounded-3xl mt-2 bg-editor cursor-pointer flex justify-center items-start"
              onClick={handleAddModule}
            >
              add module
            </div>
          </div>
        </div>
        <div className="code-result px-2 border-l border-solid w-[50%]">
          {transferCode.map(({ code, facadeModuleId }) => (
            <CodeMirrorBlock
              value={code}
              title={facadeModuleId}
              key={facadeModuleId}
              disable={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
