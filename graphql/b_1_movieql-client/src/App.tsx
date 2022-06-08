import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Movie from './pages/Movie';
import Movies from './pages/Movies';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:Id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
