import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Detail from './pages/Detail/Detail'
import Home from './pages/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Detail/:index' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
