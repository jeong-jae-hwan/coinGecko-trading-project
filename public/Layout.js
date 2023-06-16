import React from 'react'
import { useRouter } from 'next/router'

//
export default function Layout({ children }) {
  const router = useRouter()

  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  )
}
