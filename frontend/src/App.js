import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <div className='header'><h1>TO-DO LIST</h1></div>
        <SearchBar />
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

