import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeagueComponent from "./components/LeagueComponent.js";
import LeagueGamesComponent from "./components/LeagueGamesComponents.js";
import TeamGamesComponent from "./components/TeamGamesComponent.js";
import BnbComponent from "./components/BnbComponentes.js";
import TesteComponent from "./components/teste.js";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teste/:leagueId/:teamId" element={<TesteComponent />}></Route>
        <Route path="/" element={<BnbComponent />}></Route>
        <Route path="/league/:leagueId" element={<LeagueComponent />}></Route>
        <Route path="/league/:leagueId/games" element={<LeagueGamesComponent />}></Route>
        <Route path="/league/:leagueId/:teamId" element={<TeamGamesComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);