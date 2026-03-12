import { App } from "@/components/app"
import { Suspense } from "react"

export default function Page() {
  return (
    <Suspense fallback={null}>
      <App />
    </Suspense>
  )
}