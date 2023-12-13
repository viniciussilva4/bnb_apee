import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TeamComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [playersData, setPlayersData] = useState([]);
    const { leagueId } = useParams();
    const { teamId } = useParams();

    useEffect(() => {
      fetch(`http://localhost:8000/apee/league/${leagueId}/${teamId}`)
        .then(response => response.json())
        .then(data => {
          setTeamData(data);
          setPlayersData(data.players);
          setLeagueData(data.league);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [teamId]);
  
    return (
      <div>
        <h1>{teamData.name}</h1>
        <h2><a href={`/league/${leagueId}`}>{leagueData.name}</a></h2>
        <h2><a href={`/league/${leagueId}/${teamId}/games`}>Games</a></h2>
        <h2>Players:</h2>
        <ul>
          {playersData.map(player => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ul>
      </div>
    );
  };

export default TeamComponent;