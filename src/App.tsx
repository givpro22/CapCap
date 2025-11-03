import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './routes/routes'
import React from 'react'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 상단 고정 버튼 UI */}
      <div
        style={{
          position: 'fixed',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#fff',
          padding: '10px 16px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <span style={{ fontSize: '20px' }}>🔍</span>
        <button
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        >
          −
        </button>
        <input type="range" min="0.5" max="2" step="0.1" style={{ width: '150px' }} />
        <button
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        >
          ＋
        </button>
        <button
          style={{
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '18px',
            cursor: 'pointer',
            backgroundColor: '#fff',
          }}
        >
          ⭮
        </button>
        <span style={{ fontSize: '14px', color: '#666' }}>100%</span>
      </div>

      {/* 기존 페이지 */}
      <div className="App">
        <Routes />
      </div>
    </QueryClientProvider>
  )
}

export default App
