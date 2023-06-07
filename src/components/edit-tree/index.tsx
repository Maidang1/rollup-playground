import { Button } from "@geist-ui/core"
import { FolderPlus, FilePlus } from "@geist-ui/icons"
import React, { Fragment, useRef, useState } from "react"
import { FileItem } from "../file-item"

const ICON_SIZE = 22

interface FileType {
  name: string
  type: "file"
}

interface DirType {
  name: string
  type: "dir"
  children: (FileType | DirType)[]
}

type TreeList = (FileType | DirType)[]

interface TreeProps {
  info: TreeList
  className?: string
  currentDep?: number
}

const ITEM_HEIGHT = 28

const Tree: React.FC<TreeProps> = ({ info, currentDep = 1 }) => {
  const [open, setOpen] = useState(false)
  return (
    <Fragment>
      {info.map((item, index) => {
        return (
          <Fragment key={`${index}-${item.type}-${item.name}`}>
            <FileItem
              key={`${index}-${item.type}-${item.name}`}
              type={item.type}
              title={item.name}
              currentDep={currentDep}
              onChange={() => {
                //
              }}
              onClick={() => setOpen(!open)}
            ></FileItem>

            {item.type !== "file" && (
              <div
                className="tree-wrapper overflow-hidden"
                style={{
                  height: open ? ITEM_HEIGHT * item.children.length : 0,
                  transition: "all ease 0.2s",
                }}
              >
                <Tree info={item.children} currentDep={currentDep + 1} />
              </div>
            )}
          </Fragment>
        )
      })}
    </Fragment>
  )
}

const data = [
  { name: "01", type: "file" },
  {
    name: "02",
    type: "dir",
    children: [
      { name: "03", type: "file" },
      {
        name: "04",
        type: "dir",
        children: [
          { name: "05", type: "file" },
          { name: "06", type: "file" },
        ],
      },
    ],
  },
] as TreeList

const TreeList = () => {
  const handleFileAdd = () => {
    console.log("handleFileAdd")
    const defaultFileItem = {
      name: `file-${treeList.length}`,
      type: "file",
    }
    setTreeList([...treeList, defaultFileItem])
  }
  const handleFolderAdd = () => {
    console.log("handleFolderAdd")
  }

  const [treeList, setTreeList] = useState<any[]>([])
  return (
    <div>
      <div className="flex text-sm items-center">
        <Button
          icon={<FilePlus size={ICON_SIZE} />}
          onClick={handleFileAdd}
        ></Button>
        <Button
          icon={<FolderPlus size={ICON_SIZE} className="ml-2" />}
          onClick={handleFolderAdd}
        ></Button>
      </div>
      <div className="mx-auto pl-2 pr-5 mt-2 relative">
        <Tree info={data} />
      </div>
    </div>
  )
}

export { TreeList }
