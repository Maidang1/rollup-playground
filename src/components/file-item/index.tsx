import { FileText, Folder } from "@geist-ui/icons"
import "./index.css"
interface FileItem {
  type: "dir" | "file"
  title: string
  onChange: (name: string) => void
  currentDep: number
  onClick: () => void
}

const ICON_SIZE = 16

export const FileItem: React.FC<FileItem> = ({
  title,
  type,
  onChange,
  currentDep,
  onClick,
}) => {
  const icon =
    type === "file" ? (
      <FileText size={ICON_SIZE} />
    ) : (
      <Folder size={ICON_SIZE} />
    )
  return (
    <div
      className="flex items-center cursor-pointer rounded w-full py-1 px-1 file-item text-sm hover:bg-gray-100"
      style={{
        paddingLeft: `${4 * currentDep}px`,
      }}
      onClick={onClick}
    >
      <div>{icon}</div>
      <div className="ml-1">{title}</div>
    </div>
  )
}
