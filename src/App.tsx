import '@/App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './routes/routes'
import React from 'react'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 기존 페이지 */}
      <div className="App">
        <Routes />
      </div>
    </QueryClientProvider>
  )
}

export default App
