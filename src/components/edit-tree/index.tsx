import { Button } from "@geist-ui/core"
import { FolderPlus, FilePlus } from "@geist-ui/icons"
import React, { Fragment, useState } from "react"
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
}

const Tree: React.FC<TreeProps> = ({ info, className }) => {
  return (
    <Fragment>
      {info.map((item, index) => {
        if (item.type === "file") {
          return (
            <FileItem
              key={`${index}-${item.type}-${item.name}`}
              type={item.type}
              title={item.name}
              onChange={() => {
                //
              }}
            ></FileItem>
          )
        }

        return (
          <Fragment key={`${index}-${item.type}-${item.name}`}>
            <FileItem
              title={item.name}
              type={item.type}
              onChange={() => {
                //
              }}
            ></FileItem>
            <Tree info={item.children} />
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
      { name: "04", type: "dir", children: [{ name: "05", type: "file" }] },
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
