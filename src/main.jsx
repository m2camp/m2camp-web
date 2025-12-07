import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ▼ 1. この行を追加してください
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* ▼ 2. ここに Analytics コンポーネントを追加します */}
    <Analytics />
  </StrictMode>,
)