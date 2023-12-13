import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeagueComponent from "./components/LeagueComponent.js";
import LeagueGamesComponent from "./components/LeagueGamesComponents.js";
import TeamComponent from "./components/TeamComponent.js";
import TeamGamesComponent from "./components/TeamGamesComponent.js";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/league/:leagueId" element={<LeagueComponent />}></Route>
        <Route path="/league/:leagueId/games" element={<LeagueGamesComponent />}></Route>
        <Route path="/league/:leagueId/:teamId" element={<TeamComponent />}></Route>
        <Route path="/league/:leagueId/:teamId/games" element={<TeamGamesComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);