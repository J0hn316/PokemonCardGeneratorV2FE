import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home/Home';
import CreatePokemonCard from './pages/create/CreatePokemonCard';
import AllPokemonCards from './pages/AllPokemonCards/AllPokemonCardsPage';
import EditPage from './pages/edit/EditPage';
import ShowPage from './pages/ShowPage/ShowPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cards/create"
        element={
          <>
            <Navbar /> <CreatePokemonCard />
          </>
        }
      />
      <Route
        path="/cards/show-all"
        element={
          <>
            <Navbar /> <AllPokemonCards />
          </>
        }
      />
      <Route
        path="/cards/edit/:id"
        element={
          <>
            <Navbar /> <EditPage />
          </>
        }
      />
      <Route
        path="/cards/show/:id"
        element={
          <>
            <Navbar /> <ShowPage />
          </>
        }
      />
    </Routes>
  );
}
