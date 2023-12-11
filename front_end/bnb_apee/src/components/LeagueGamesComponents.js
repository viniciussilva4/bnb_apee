// Exemplo usando axios para fazer a solicitação
// Você precisa instalar axios se ainda não o fez: npm install axios

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const LeagueGamesComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [gamesData, setGamesData] = useState([]);
    const { leagueId } = useParams();

    useEffect(() => {
      // Fazer solicitação à API para obter dados da liga e equipes com base no leagueId
      fetch(`http://localhost:8000/apee/league/${leagueId}/games`)
        .then(response => response.json())
        .then(data => {
          setLeagueData(data);
          setGamesData(data.games);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [leagueId]);
  
    return (
      <div className="container-fluid bg-dark text-white">
        <div className="row justify-content-start">
          <div className="col-md-8 offset-md-2 border border-white border-2">
            <a href={`/league/${leagueId}`}><h1>{leagueData.name}</h1></a>
            <h2>Games:</h2>
            <ul>
              {gamesData.map(game => (
                <li key={game.id} id={game.id}>
                  <div><a href={`/league/${leagueId}/${game.team_1.id}`}>{game.team_1.name}</a>{game.score_team_1}</div>
                  <a href={`/league/${leagueId}/${game.team_2.id}`}>{game.team_2.name}</a>{game.score_team_2}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

export default LeagueGamesComponent;