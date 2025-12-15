import './App.css'
import Home from './components/Home'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cart } from './components/Cart'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
