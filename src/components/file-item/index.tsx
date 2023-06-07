import { FileText, Folder } from "@geist-ui/icons"
import "./index.css"
interface FileItem {
  type: "dir" | "file"
  title: string
  onChange: (name: string) => void
}

const ICON_SIZE = 16

export const FileItem: React.FC<FileItem> = ({ title, type, onChange }) => {
  const icon =
    type === "file" ? (
      <FileText size={ICON_SIZE} />
    ) : (
      <Folder size={ICON_SIZE} />
    )
  return (
    <div className="flex cursor-pointer rounded w-full py-1 px-2 file-item text-sm bg-slate-500">
      <div>{icon}</div>
      <div className="ml-1">{title}</div>
    </div>
  )
}
