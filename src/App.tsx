import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './routes/routes'
import React from 'react'

const DraggablePopup: React.FC = () => {
  const [fontSize, setFontSize] = React.useState(16)
  const [position, setPosition] = React.useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setPosition((prev) => ({
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }))
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '260px',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: '14px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        userSelect: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px 14px',
          background: 'rgba(245, 245, 245, 0.9)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          cursor: 'grab',
          fontWeight: '600',
          fontSize: '15px',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        🔍 화면 확대 / 축소
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <button
            onClick={() => {
              const newZoom = zoom + 0.1
              setZoom(newZoom)
              document.body.style.zoom = String(newZoom)
            }}
            style={{
              flex: 1,
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: '600',
              background: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              const newZoom = Math.max(0.2, zoom - 0.1)
              setZoom(newZoom)
              document.body.style.zoom = String(newZoom)
            }}
            style={{
              flex: 1,
              padding: '10px 0',
              fontSize: '16px',
              fontWeight: '600',
              background: '#f44336',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            -
          </button>
        </div>

        <p
          style={{
            marginTop: '6px',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '500',
            opacity: 0.9,
          }}
        >
          현재 확대 비율: {(zoom * 100).toFixed(0)}%
        </p>
      </div>
    </div>
  )
}

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 기존 페이지 */}
      <div className="App">
        <Routes />
        <DraggablePopup />
      </div>
    </QueryClientProvider>
  )
}

export default App
