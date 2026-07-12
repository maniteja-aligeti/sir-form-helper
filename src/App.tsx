import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Form6OcrPage } from '@/pages/Form6OcrPage'
import { HomePage } from '@/pages/HomePage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="form-6" element={<Form6OcrPage />} />
      </Route>
    </Routes>
  )
}

export default App
