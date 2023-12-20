import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'

const LeagueGamesComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [gamesData, setGamesData] = useState([]);
    const { leagueId } = useParams();
    useEffect(() => {
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
      <div className='container'>
        <div className='row bg-dark text-white'>
          <div className='col-6'>
            <h1><a className='white' href={`/league/${leagueId}`}>{leagueData.name}</a></h1>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col'>
            <h2>Games:</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <ul className='list-unstyled'>
              {gamesData.slice().reverse().map(game => (
              <li key={game.id} id={game.id}>
                <div className='table-responsive'>
                  <table className='table'>
                    <caption>{game.date}</caption>
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
        </div>  
      </div>
    );
  };
export default LeagueGamesComponent;