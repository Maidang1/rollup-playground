import { useEffect, useState } from "react"
import * as shiki from "shiki"
import "./index.less"

export interface CodeBlockProps {
  code: string
  title: string
}

const CodeBlock = (props: CodeBlockProps) => {
  const { code, title } = props
  const [transformCode, setTransFormCode] = useState("")

  useEffect(() => {
    shiki.getHighlighter({ theme: "nord" }).then((highlighter) => {
      const transformed = highlighter.codeToHtml(code, { lang: "js" })
      setTransFormCode(transformed)
    })
  }, [code])

  return (
    <div>
      <span className="text-base font-semibold">{title}</span>
      <span dangerouslySetInnerHTML={{ __html: transformCode }}></span>
    </div>
  )
}

export default CodeBlock
