import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TeamComponent = () => {
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
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [teamId]);
  
    return (
      <div className="container-fluid bg-dark text-white">
        <div className="row justify-content-start">
          <div className="col-md-8 offset-md-2 border border-white border-2">
            <h1>{teamData.name}</h1>
      
            <h2>Players:</h2>
            <ul>
              {playersData.map(player => (
                <li key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

export default TeamComponent;