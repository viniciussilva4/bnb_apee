// Exemplo usando axios para fazer a solicitação
// Você precisa instalar axios se ainda não o fez: npm install axios

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Lay = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamsData, setTeamsData] = useState([]);
    const { leagueId } = useParams();

    useEffect(() => {
      // Fazer solicitação à API para obter dados da liga e equipes com base no leagueId
      fetch(`http://localhost:8000/apee/league/${leagueId}`)
        .then(response => response.json())
        .then(data => {
          setLeagueData(data);
          setTeamsData(data.teams);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [leagueId]);
  
    return (
      <div>
        <h1>{leagueData.name}</h1>
  
        <h2>Teams:</h2>
        <ul>
          {teamsData.map(team => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
      </div>
    );
  };

export default Lay;
