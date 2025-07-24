"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Redirigiendo...</h2>
      </div>
    </div>
  )
}
