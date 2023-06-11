import { FileText, Folder } from "@geist-ui/icons"
import { useClasses, Input, Popover } from "@geist-ui/core"
import "./index.less"
import React, { useRef, useState } from "react"
interface FileItem {
  type: "dir" | "file"
  title: string
  onChange: (name: string) => void
  currentDep?: number
  onClick?: () => void
  active?: boolean
}
const ICON_SIZE = 16

export const FileItem: React.FC<FileItem> = ({
  title,
  type,
  onClick,
  active = false,
  onChange,
}) => {
  const className = useClasses(
    "flex items-center cursor-pointer rounded w-full py-1 px-1 file-item text-sm hover:bg-gray-100",
    { "bg-gray-100": active }
  )
  const [editMode, setEditMode] = useState(false)
  const [contextMenu, setContextMenu] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState(title)
  const icon =
    type === "file" ? (
      <FileText size={ICON_SIZE} />
    ) : (
      <Folder size={ICON_SIZE} />
    )

  return (
    <Popover
      visible={contextMenu}
      className="edit-popover w-20"
      onClick={(e) => {
        e.stopPropagation()
      }}
      onVisibleChange={(visible) => {
        if (!visible) {
          setContextMenu(false)
        }
      }}
      content={
        (
          <div className="w-20">
            <Popover.Item title>
              <span>settings</span>
            </Popover.Item>
            <Popover.Item
              onClick={() => {
                setEditMode(true)
                inputRef.current?.focus()
              }}
            >
              <span>rename</span>
            </Popover.Item>
          </div>
        ) as any
      }
    >
      <div
        className={className}
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault()
          setContextMenu(true)
        }}
      >
        <div>{icon}</div>
        {editMode ? (
          <Input
            value={fileName}
            className="edit-input"
            ref={inputRef}
            onBlur={() => {
              setEditMode(false)
              onChange(fileName)
            }}
            onChange={(e) => setFileName(e.target.value)}
          />
        ) : (
          <div className="ml-1 text-ellipsis overflow-hidden h-[36px] flex-1 flex items-center">
            {title}
          </div>
        )}
      </div>
    </Popover>
  )
}
