import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css'

const TeamGamesComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamData, setTeamData] = useState({});
    const [gamesData, setGamesData] = useState([]);
    const [playersData, setPlayersData] = useState([]);

    const [indexOfMinFirstSum, setIndexOfMinFirstSum] = useState(-1);
    const [indexOfMaxFirstSum, setIndexOfMaxFirstSum] = useState(-1);
    const [indexOfMinSum, setIndexOfMinSum] = useState(-1);
    const [indexOfMaxSum, setIndexOfMaxSum] = useState(-1);
    const [indexOfMaxSumTeam, setIndexOfMaxSumTeam] = useState(-1);
    const [indexOfMinSumTeam, setIndexOfMinSumTeam] = useState(-1);
    

    const [pagGame, setPagGame] = useState(0);
    const gamesPerTime = 5;

    const startIndex = pagGame * gamesPerTime;
    const endIndex = startIndex + gamesPerTime;

    const viewGames = gamesData.slice(startIndex, endIndex);

    const { leagueId } = useParams();
    const { teamId } = useParams();

    const previousPage = () => {
      if (pagGame != 0) {
        setPagGame(pagGame - 1);
      }
    }

    const nextPage = () => {
      if (pagGame < (Math.ceil(gamesData.length / 5)) - 1) {
        setPagGame(pagGame + 1);
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
        });

        const calculateMinFirstSum = () => {
          if (viewGames.length === 0) {
            setIndexOfMinFirstSum(-1);
            return;
          }
          const minFirstSumObject = viewGames.reduce((min, game, index) => {
            const sum = parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2);
            if (sum < min.sum) {
              return { sum, index };
            }
            return min;
            }, {sum: Infinity, index: -1});
          setIndexOfMinFirstSum(minFirstSumObject.index);
        };

        const calculateMinSum = () => {
          if (viewGames.length === 0) {
            setIndexOfMinSum(-1);
            return;
          }
          const minSumObject = viewGames.reduce((min, game, index) => {
            const sum = parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2);
            if (sum < min.sum) {
              return { sum, index };
            }
            return min;
            }, {sum: Infinity, index: -1});
          setIndexOfMinSum(minSumObject.index);
        };

        const calculateMinSumTeam = () => {
          if (viewGames.length === 0) {
            setIndexOfMinSum(-1);
            return;
          }
          const minSumTeamObject = viewGames.reduce((min, game, index) => {
            if (game.team_1.name == teamData.name) {
              const sum = parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1);
              if (sum < min.sum) {
                return { sum, index };
              }
            }
            else {
              const sum = parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2);
              if (sum < min.sum) {
                return { sum, index };
              }
            }
            return min;
            }, {sum: Infinity, index: -1});
          setIndexOfMinSumTeam(minSumTeamObject.index);
        };

        const calculateMaxFirstSum = () => {
          if (viewGames.length === 0) {
            setIndexOfMaxFirstSum(-1);
            return;
          }
          const maxFirstSumObject = viewGames.reduce((max, game, index) => {
            const sum = parseInt(game.sum_first_time_team_1) + parseInt(game.sum_first_time_team_2);
            if (sum > max.sum) {
              return { sum, index };
            }
            return max;
          }, {sum: -Infinity, index: -1})
          setIndexOfMaxFirstSum(maxFirstSumObject.index);
        };

        const calculateMaxSum = () => {
          if (viewGames.length === 0) {
            setIndexOfMaxSum(-1);
            return;
          }
          const maxSumObject = viewGames.reduce((max, game, index) => {
            const sum = parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2);
            if (sum > max.sum) {
              return { sum, index };
            }
            return max;
          }, {sum: -Infinity, index: -1})
          setIndexOfMaxSum(maxSumObject.index);
        };

        const calculateMaxSumTeam = () => {
          if (viewGames.length === 0) {
            setIndexOfMaxSumTeam(-1);
            return;
          }
          const maxSumTeamObject = viewGames.reduce((max, game, index) => {
            if (game.team_1.name == teamData.name) {
              const sum = parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1);
              if (sum > max.sum) {
                return { sum, index };
              }
              return max;
            }
            else {
              const sum = parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2);
              if (sum > max.sum) {
                return { sum, index };
              }
              return max;
            }
          }, {sum: -Infinity, index: -1})
          setIndexOfMaxSumTeam(maxSumTeamObject.index);
        };
    
    calculateMaxFirstSum();

    calculateMaxSum();

    calculateMaxSumTeam();

    calculateMinSumTeam();

    calculateMinSum();
    
    calculateMinFirstSum();
    }, 
    
    [viewGames]);
    
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
          <div className='col-4'>
            <h2>Games:</h2>
          </div>
          <div className='col-1'><button onClick = {() => {previousPage()}}>Previous page</button></div>
          <div className='col-1'><button onClick = {() => {nextPage()}}>Next Page</button></div>
          <div className='col-6'>
            <h2>Players:</h2>
          </div>
        </div>


        <div className='row'>
          <div className='col-6'>
            <ul className='list-unstyled'>
              
              {viewGames.map((game, index) => {

              let verifyFirstSum = 'p-0 score_sum_bgd'

              let verifySum = 'p-0 score_sum_bgd'

              let verifySumTeam1 = 'p-0 score_sum_bgd'

              let verifySumTeam2 = 'p-0 score_sum_bgd'

              if (index == indexOfMinFirstSum) {
                verifyFirstSum = 'p-0 minimum'
              }

              if (index == indexOfMinSum) {
                verifySum = 'p-0 minimum'
              }

              if (index == indexOfMaxFirstSum) {
                verifyFirstSum = 'p-0 maximum'
              }

              if (index == indexOfMaxSum) {
                verifySum = 'p-0 maximum'
              }

              if (index == indexOfMaxSumTeam) {
                if (game.team_1.name === teamData.name) {
                  verifySumTeam1 = 'p-0 maximum'
                }
                else {
                  verifySumTeam2 = 'p-0 maximum'
                }
              }

              if (index == indexOfMinSumTeam) {
                if (game.team_1.name === teamData.name) {
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
                        
                        <td className={verifySum}>{parseInt(game.sum_first_time_team_1) + parseInt(game.sum_second_time_team_1) + parseInt(game.sum_first_time_team_2) + parseInt(game.sum_second_time_team_2)}</td>    
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </li>
              )})}
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