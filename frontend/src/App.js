import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SearchBoard from './page/SearchBoard';


function App() {
  return (
    <>
      <Router>
        <main>

       
        <Routes>
        <Route path="/" element={<SearchBoard />}>          
        </Route>
        </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
