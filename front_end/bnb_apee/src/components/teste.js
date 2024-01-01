import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'

const TesteComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [gamesData, setGamesData] = useState([]);
    const [playersData, setPlayersData] = useState([]);

    const { leagueId } = useParams();
    const { teamId } = useParams();

    const maxFirstTimeSum = []
    const minFirstTimeSum = []
    const maxSum = []
    const minSum = []
    const maxTeamSum = []
    const minTeamSum = []

    const getMaxFirstTimeSum = () => {
      for (let i = 0; i < Math.ceil(gamesData.length / 5); i++) {
        let max = [0, 0]
        gamesData.slice(i * 5, i * 5 + 5).forEach(game => {
          if (parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2) > max[0]) {
            max = [parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2), game.id]
          }
        }
        );
        maxFirstTimeSum.push(max[1])
      }
    }

    const getMinFirstTimeSum = () => {
      for (let i = 0; i < Math.ceil(gamesData.length / 5); i++) {
        let max = [Infinity, 0]
        gamesData.slice(i * 5, i * 5 + 5).forEach(game => {
          if (parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2) < max[0]) {
            max = [parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2), game.id]
          }
        }
        );
        minFirstTimeSum.push(max[1])
      }
    }

    const getMaxSum = () => {
      for (let i = 0; i < Math.ceil(gamesData.length / 5); i++) {
        let max = [0, 0]
        gamesData.slice(i * 5, i * 5 + 5).forEach(game => {
          if (parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_second_time_team_2) > max[0]) {
            max = [parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_second_time_team_2), game.id]
          }
        }
        );
        maxSum.push(max[1])
      }
    }

    const getMinSum = () => {
      for (let i = 0; i < Math.ceil(gamesData.length / 5); i++) {
        let max = [Infinity, 0]
        gamesData.slice(i * 5, i * 5 + 5).forEach(game => {
          if (parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_second_time_team_2) < max[0]) {
            max = [parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_second_time_team_2), game.id]
          }
        }
        );
        minSum.push(max[1])
      }
    }
    
    const getMaxTeamSum = () => {
      for (let i = 0; i < Math.ceil(gamesData.length / 5); i++) {
        let max = [0, 0]
        gamesData.slice(i * 5, i * 5 + 5).forEach(game => {
          if (teamData.name == game.team_1.name) {
            if (parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) > max[0])
              max = [parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1), game.id]
          }
          else {
            if (parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2) > max[0])
              max = [parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2), game.id]
          }
        }
        );
        maxTeamSum.push(max[1])
      }
    }

    const getMinTeamSum = () => {
      for (let i = 0; i < Math.ceil(gamesData.length / 5); i++) {
        let max = [Infinity, 0]
        gamesData.slice(i * 5, i * 5 + 5).forEach(game => {
          if (teamData.name == game.team_1.name) {
            if (parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) < max[0])
              max = [parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1), game.id]
          }
          else {
            if (parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2) < max[0])
              max = [parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2), game.id]
          }
        }
        );
        minTeamSum.push(max[1])
      }
    }
    
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
        });}, 
    
    [gamesData]);
    
    getMaxFirstTimeSum()

    getMinFirstTimeSum()

    getMaxSum()

    getMinSum()

    getMaxTeamSum()

    getMinTeamSum()

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
        <div className='row'>
          <div className='col-6'>
            <h2 className='m-0'>Games:</h2>
          </div>
        </div>
        <div className='row'>
          <div className='p-0' style={{overflowX: 'auto', width: '100%'}}>
            <ul className='list-unstyled' style={{whiteSpace: 'nowrap'}}>
              {Array.from({ length: Math.ceil(gamesData.length / 5) }).map((_, i) => (
                <li className='p-1 align-top' key={i} style={{display: 'inline-block', width: '50%'}}>
                  {gamesData.slice(i * 5, i * 5 + 5).map((game, index) => {

                    let verifyFirstSum = 'p-0 score_sum_bgd'

                    let verifySum = 'p-0 score_sum_bgd'

                    let verifySumTeam1 = 'p-0 score_sum_bgd'

                    let verifySumTeam2 = 'p-0 score_sum_bgd'

                    if (maxFirstTimeSum[i] == game.id) {
                      verifyFirstSum = 'p-0 maximum'
                    }

                    if (minFirstTimeSum[i] == game.id) {
                      verifyFirstSum = 'p-0 minimum'
                    }

                    if (maxSum[i] == game.id) {
                      verifySum = 'p-0 maximum'
                    }

                    if (minSum[i] == game.id) {
                      verifySum = 'p-0 minimum'
                    }

                    if (maxTeamSum[i] == game.id) {
                      if (teamData.name == game.team_1.name) {
                        verifySumTeam1 = 'p-0 maximum'
                      }
                      else {
                        verifySumTeam2 = 'p-0 maximum'
                      }
                    }

                    if (minTeamSum[i] == game.id) {
                      if (teamData.name == game.team_1.name) {
                        verifySumTeam1 = 'p-0 minimum'
                      }
                      else {
                        verifySumTeam2 = 'p-0 minimum'
                      }
                    }

                    const game_p_1_1 = game.score_team_1.split(', ')[0]
                    const game_p_1_2 = game.score_team_1.split(', ')[1]
                    const game_p_1_3 = game.score_team_1.split(', ')[2]
                    const game_p_1_4 = game.score_team_1.split(', ')[3]
                    const game_p_2_1 = game.score_team_2.split(', ')[0]
                    const game_p_2_2 = game.score_team_2.split(', ')[1]
                    const game_p_2_3 = game.score_team_2.split(', ')[2]
                    const game_p_2_4 = game.score_team_2.split(', ')[3]
      
                    return (
                    <li key={game.id} id={game.id} style={{className: 'p-5'}}>                
                      <div className='table-responsive'>
                        <table className='my-1 mx-0 table con'>
      
                          <thead>
                            <tr>
                              <th scope="col-6" colSpan={10} className='p-0 date'>{game.date}</th>
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
                              <td className='p-0 score_sum_bgd'>{game.sum_second_time_team_1}</td>
                              <td className='no_bord'></td>
                              <td className={verifySumTeam1}>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1)}</td>
                            </tr>
      
                            <tr>
                            <td  scope="row" className='p-0 score_bg team_name'><a className='black' href={`/league/${leagueId}/${game.team_2.id}`}>{game.team_2.name}</a></td>
                              <td className='p-0 score_bg'>{game_p_2_1}</td>
                              <td className='p-0 score_bg'>{game_p_2_2}</td>
                              <td className='p-0 score_sum_bgd'>{game.sum_first_time_team_2}</td>
                              <td className='no_bord'></td>
                              <td className='p-0 score_bg'>{game_p_2_3}</td>
                              <td className='p-0 score_bg'>{game_p_2_4}</td>
                              <td className='p-0 score_sum_bgd'>{game.sum_second_time_team_2}</td>
                              <td className='no_bord'></td>
                              <td className={verifySumTeam2}>{parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2)}</td>
                            </tr>
      
                            <tr>
                              <td scope="row" className='p-0 score_sum_bgd'></td>
                              <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_1) + parseInt(game_p_2_1)}</td>
                              <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_2) + parseInt(game_p_2_2)}</td>
                              <td className={verifyFirstSum}>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2)}</td>
                              <td className='no_bord'></td>
                              <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_3) + parseInt(game_p_2_3)}</td>
                              <td className='p-0 score_sum_bgd'>{parseInt(game_p_1_4) + parseInt(game_p_2_4)}</td>
                              <td className='p-0 score_sum_bgd'>{parseInt(game.sum_second_time_team_1) + parseInt(game.sum_second_time_team_2)}</td>
                              <td className='no_bord'></td>
                              <td className={verifySum}>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2)}</td>    
                            </tr>
                            
                          </tbody>
                        </table>
                      </div>
                    </li>
                    )
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

export default TesteComponent;