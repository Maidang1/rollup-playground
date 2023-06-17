import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { nord } from "@uiw/codemirror-theme-nord"
import { useMemo, useState } from "react"
import cx from "classnames"
import "./index.less"

interface CodeMirrorBlockProps {
  value: string
  title?: string
  onTitleChange?: (value: string) => void
  onCodeChange?: (value: string) => void
  onAdd?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
  isEntryId?: boolean
  disable?: boolean
}

export const DeleteIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 16 16"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 8v1H3V8h11z"></path>
  </svg>
)

const AddIcon = () => (
  <svg
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      d="M12,18 L12,6 M6,12 L18,12"
    ></path>
  </svg>
)

export const CodeMirrorBlock = (props: CodeMirrorBlockProps) => {
  const {
    value,
    onTitleChange,
    title: defaultTitle,
    onCodeChange,
    onAdd,
    onDelete,
    isEntryId,
    disable = false,
  } = props
  const [title, setTitle] = useState(defaultTitle || "main.js")

  const isMain = useMemo(() => title === "main.js", [title])

  return (
    <div className="code-wrapper rounded h-fit px-2 w-full mb-2">
      <div
        className={cx(
          "input-header pt-2 px-2 text-white font-bold pl-4 bg-editor rounded-t-lg relative h-[40px]",
          {
            "bg-red-500": isEntryId,
          }
        )}
      >
        <input
          contentEditable
          className="outline-0 w-full bg-transparent"
          onChange={(e) => {
            setTitle((e.target as any).value || "")
          }}
          onBlur={() => {
            onTitleChange?.(title)
          }}
          value={title}
          disabled={isEntryId || disable}
        ></input>

        {!disable && (
          <>
            {isEntryId && isMain ? (
              <span className="absolute top-2 right-2">(entry module)</span>
            ) : (
              <>
                <div
                  className={cx(
                    "absolute top-0 right-0 cursor-pointer text-red-500 text-2xl",
                    {
                      "text-white": isEntryId,
                    }
                  )}
                  onClick={() => onAdd?.(title)}
                >
                  {isEntryId ? <DeleteIcon /> : <AddIcon />}
                </div>
                <div
                  className="text-white absolute bottom-0 right-0 text-2xl cursor-pointer rotate-45"
                  onClick={() => onDelete?.(title)}
                >
                  <AddIcon />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <CodeMirror
        value={value}
        extensions={[javascript({ jsx: true })]}
        basicSetup={{
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
        }}
        onChange={onCodeChange}
        theme={nord}
        maxWidth="100%"
        className="text-base"
        readOnly={disable}
      />
    </div>
  )
}
