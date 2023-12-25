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
              
              {gamesData.map((game, index) => {
            
              const game_p_1_1 = game.score_team_1.split(', ')[0]
              const game_p_1_2 = game.score_team_1.split(', ')[1]
              const game_p_1_3 = game.score_team_1.split(', ')[2]
              const game_p_1_4 = game.score_team_1.split(', ')[3]
              const game_p_2_1 = game.score_team_2.split(', ')[0]
              const game_p_2_2 = game.score_team_2.split(', ')[1]
              const game_p_2_3 = game.score_team_2.split(', ')[2]
              const game_p_2_4 = game.score_team_2.split(', ')[3]

              return (
              <li key={game.id} id={game.id}>                
                <div className='table-responsive'>
                  <table className='my-1 mx-0 table con'>
                    <thead>
                      <tr>
                        <th scope="col-6" colSpan={8} className='p-0 date'>{game.date}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row" className='p-0 score_bg team_name col-8'><a className='black' href={`/league/${leagueId}/${game.team_1.id}`}>{game.team_1.name}</a></td>
                        <td className='p-0 score_bg'>{game_p_1_1}</td>
                        <td className='p-0 score_bg'>{game_p_1_2}</td>
                        <td className='p-0 score_sum_bgd'>{game.sum_first_time_team_1}</td>
                        <td className='no_bord'></td>
                        <td className='p-0 score_bg'>{game_p_1_3}</td>
                        <td className='p-0 score_bg'>{game_p_1_4}</td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1)}</td>
                      </tr>

                      <tr>
                      <td  scope="row" className='p-0 score_bg team_name'><a className='black' href={`/league/${leagueId}/${game.team_2.id}`}>{game.team_2.name}</a></td>
                        <td className='p-0 score_bg'>{game_p_2_1}</td>
                        <td className='p-0 score_bg'>{game_p_2_2}</td>
                        <td className='p-0 score_sum_bgd'>{game.sum_first_time_team_2}</td>
                        <td className='no_bord'></td>
                        <td className='p-0 score_bg'>{game_p_2_3}</td>
                        <td className='p-0 score_bg'>{game_p_2_4}</td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2)}</td>
                      </tr>

                      <tr>
                        <td scope="row" className='p-0 score_sum_bgd'></td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_1) + parseInt(game_p_2_1)}</td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_2) + parseInt(game_p_2_2)}</td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2)}</td>
                        <td className='no_bord'></td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_3) + parseInt(game_p_2_3)}</td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_4) + parseInt(game_p_2_4)}</td>
                        <td className='p-0 score_sum_bgd'>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2)}</td>    
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              )})}
            </ul> 
          </div>
        </div>  
      </div>
    );
  };
export default LeagueGamesComponent;