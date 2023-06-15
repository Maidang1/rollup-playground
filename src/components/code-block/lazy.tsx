import { lazy, Suspense } from "react"
import { CodeBlockProps } from "./index"

const LazyCodeBlock = lazy(() => import("./index"))

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <Suspense fallback={"loading"}>
      <LazyCodeBlock {...props} />
    </Suspense>
  )
}
