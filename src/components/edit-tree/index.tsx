import { Button } from "@geist-ui/core"
import { FilePlus } from "@geist-ui/icons"
import React, { Fragment, useMemo } from "react"
import { FileItem } from "../file-item"
import {
  addModuleId,
  setSelectFileId,
  updateModuleId,
  useCurrentSelectFileId,
  useModuleIdStore,
} from "../../store/module_id"

const ICON_SIZE = 22

interface FileType {
  name: string
  type: "file"
  selected?: boolean
}
interface TreeProps {
  info: FileType[]
  className?: string
}

const Tree: React.FC<TreeProps> = ({ info }) => {
  return (
    <Fragment>
      {info.map((item, index) => {
        return (
          <Fragment key={`${index}-${item.type}-${item.name}`}>
            <FileItem
              key={`${index}-${item.type}-${item.name}`}
              type={item.type}
              title={item.name}
              active={item.selected}
              onChange={(newName) => {
                updateModuleId(item.name, newName)
              }}
              onClick={() => {
                setSelectFileId(item.name)
              }}
            />
          </Fragment>
        )
      })}
    </Fragment>
  )
}

const TreeList = () => {
  const files = useModuleIdStore((state) => state.moduleIds)
  const selectFileId = useCurrentSelectFileId((state) => state.fileId)
  const treeList = useMemo(() => {
    return files.map((item) => ({
      name: item,
      type: "file",
      selected: selectFileId === item,
    })) as FileType[]
  }, [files, selectFileId])
  return (
    <div>
      <div className="flex text-sm items-center">
        <Button
          icon={<FilePlus size={ICON_SIZE} />}
          onClick={() => {
            addModuleId(`file-${files.length}`)
          }}
        ></Button>
      </div>
      <div className="mx-auto pl-2 pr-5 mt-2 relative x-[60px]">
        <Tree info={treeList} />
      </div>
    </div>
  )
}

export { TreeList }
