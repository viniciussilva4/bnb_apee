import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TeamGamesComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [gamesData, setGamesData] = useState([]);
    const { leagueId } = useParams();
    const { teamId } = useParams();

    useEffect(() => {
      fetch(`http://localhost:8000/apee/league/${leagueId}/${teamId}/games`)
        .then(response => response.json())
        .then(data => {
          setTeamData(data);
          setLeagueData(data.league);
          setGamesData(data.games);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [teamId]);
  
    return (
      <div>
        <h1>{teamData.name}</h1>
        <h2><a href={`/league/${leagueId}`}>{leagueData.name}</a></h2>
        <h2>Games:</h2>
        <ul>
          {gamesData.map(game => (
            <li key={game.id} id={game.id}>
              <div>
                <a href={`/league/${leagueId}/${game.team_1.id}`}>{game.team_1.name}</a>{' '}
                {game.score_team_1.split(', ').slice(0, 4).join(', ')}
                <a href={`/league/${leagueId}/${game.team_2.id}`}>{game.team_2.name}</a>{' '}
                {game.score_team_2.split(', ').slice(0, 4).join(', ')} <br/>
                {parseInt(game.score_team_1.split(', ')[0]) + parseInt(game.score_team_2.split(', ')[0])}{', '}
                {parseInt(game.score_team_1.split(', ')[1]) + parseInt(game.score_team_2.split(', ')[1])}{', '}
                {parseInt(game.score_team_1.split(', ')[2]) + parseInt(game.score_team_2.split(', ')[2])}{', '}
                {parseInt(game.score_team_1.split(', ')[3]) + parseInt(game.score_team_2.split(', ')[3])}{', '}
                
              </div>
            </li>
          ))}
        </ul>   
      </div>
    );
  };

export default TeamGamesComponent;