import { Button, Modal, useModal, useToasts } from "@geist-ui/core"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { getRollupConfig, updateRollupConfig } from "../../store/rollup_config"
import { debounce } from "lodash-es"
import { useState } from "react"

export const ConfigModal = () => {
  const { setVisible, bindings } = useModal()

  const rollupConfig = getRollupConfig()
  const [config, setConfig] = useState(JSON.stringify(rollupConfig, null, "\t"))
  const toast = useToasts()

  const handleCodeChange = debounce(() => {
    try {
      const formatValue = JSON.parse(config)
      updateRollupConfig(formatValue)
      setVisible(false)
    } catch (e: any) {
      toast.setToast({
        type: "error",
        text: "不合法的JSON" + e?.message,
      })
    }
  }, 300)
  return (
    <>
      <Button auto onClick={() => setVisible(true)}>
        Edit Rollup config
      </Button>
      <Modal {...bindings} width="600px" height="800px">
        <Modal.Title>Rollup Config</Modal.Title>
        <Modal.Subtitle>You can edit Rollup config here</Modal.Subtitle>
        <Modal.Content height="700px">
          <CodeMirror
            lang="JSON"
            extensions={[javascript({ jsx: true })]}
            className="w-full h-full"
            height="100%"
            value={config}
            onChange={setConfig}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={handleCodeChange}>Submit</Modal.Action>
      </Modal>
    </>
  )
}
