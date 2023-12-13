import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'

const TeamGamesComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [gamesData, setGamesData] = useState([]);
    const [playersData, setPlayersData] = useState([]);
    const { leagueId } = useParams();
    const { teamId } = useParams();
    useEffect(() => {
      fetch(`http://localhost:8000/apee/league/${leagueId}/${teamId}`)
        .then(response => response.json())
        .then(data => {
          setTeamData(data);
          setLeagueData(data.league);
          setGamesData(data.games);
          setPlayersData(data.players);
          
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [teamId]);
    return (
      <div className='container'>
        <div className='row bg-dark text-white'>
          <div className='col-6'>
            <h1>{teamData.name}</h1>
          </div>
          <div className='col-6'>
            <h1><a className='white' href={`/league/${leagueId}`}>{leagueData.name}</a></h1>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-6'>
            <h2>Games:</h2>
          </div>
          <div className='col-6'>
            <h2>Players:</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <ul className='list-unstyled'>
              {gamesData.map(game => (
              <li key={game.id} id={game.id}>
                <div className='table-responsive'>
                  <table className='table'>
                    <caption>Game</caption>
                    <thead className='table-dark'>
                      <tr>
                        <th>Name</th>
                        <th colSpan={4}>Scores</th>
                        <th>Final Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><a className='black' href={`/league/${leagueId}/${game.team_1.id}`}>{game.team_1.name}</a></td>
                        <td>{game.score_team_1.split(', ')[0]}</td>
                        <td>{game.score_team_1.split(', ')[1]}</td>
                        <td>{game.score_team_1.split(', ')[2]}</td>
                        <td>{game.score_team_1.split(', ')[3]}</td>
                        <td>{parseInt(game.score_team_1.split(', ')[0]) + parseInt(game.score_team_1.split(', ')[1]) + parseInt(game.score_team_1.split(', ')[2]) + parseInt(game.score_team_1.split(', ')[3])}</td>
                      </tr>
                      <tr>
                      <td><a className='black' href={`/league/${leagueId}/${game.team_2.id}`}>{game.team_2.name}</a></td>
                        <td>{game.score_team_2.split(', ')[0]}</td>
                        <td>{game.score_team_2.split(', ')[1]}</td>
                        <td>{game.score_team_2.split(', ')[2]}</td>
                        <td>{game.score_team_2.split(', ')[3]}</td>
                        <td>{parseInt(game.score_team_2.split(', ')[0]) + parseInt(game.score_team_2.split(', ')[1]) + parseInt(game.score_team_2.split(', ')[2]) + parseInt(game.score_team_2.split(', ')[3])}</td>
                      </tr>
                      <tr className='table-dark'>
                        <td>Vertical Sum</td>
                        <td>{parseInt(game.score_team_1.split(', ')[0]) + parseInt(game.score_team_2.split(', ')[0])}</td>
                        <td>{parseInt(game.score_team_1.split(', ')[1]) + parseInt(game.score_team_2.split(', ')[1])}</td>
                        <td>{parseInt(game.score_team_1.split(', ')[2]) + parseInt(game.score_team_2.split(', ')[2])}</td>
                        <td>{parseInt(game.score_team_1.split(', ')[3]) + parseInt(game.score_team_2.split(', ')[3])}</td>
                        <td>{game.score_team_1.split(', ').slice(0, 4).map(score => parseInt(score)).reduce((acc, score) => acc + score, 0) + game.score_team_2.split(', ').slice(0, 4).map(score => parseInt(score)).reduce((acc, score) => acc + score, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              ))}
            </ul> 
          </div>
          <div className='col-6'>
          <ul className='list-unstyled'>
              {playersData.map((player, index) => (
                <li className={`py-0 px-1 m-0 ${index % 2 === 0 ? 'even' : 'odd'}`} key={player.id}>{player.name}</li>
              ))}
            </ul>
          </div>
        </div>  
      </div>
    );
  };
export default TeamGamesComponent;