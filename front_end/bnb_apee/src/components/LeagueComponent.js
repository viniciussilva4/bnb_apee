// Exemplo usando axios para fazer a solicitação
// Você precisa instalar axios se ainda não o fez: npm install axios

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Navbar, Container, Row, Col } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const LeagueComponent = () => {
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
        <h><a href={`/league/${leagueId}/games`}>Games</a></h>
        <h2>Teams:</h2>
        <ul>
          {teamsData.map(team => (
            <a href={`/league/${leagueId}/${team.id}`}><li key={team.id}>{team.name}</li></a>
          ))}
        </ul>
        
      </div>
    );
  };

export default LeagueComponent;
