import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

const LeagueComponent = () => {
    const [leagueData, setLeagueData] = useState({});
    const [teamsData, setTeamsData] = useState([]);
    const { leagueId } = useParams();
    useEffect(() => {
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
    const halfwayIndex = Math.ceil(teamsData.length / 2);
    const firstHalf = teamsData.slice(0, halfwayIndex);
    const secondHalf = teamsData.slice(halfwayIndex);
    return (
      <div className='container'>
        <div className='row bg-dark text-white'>
          <div className='col-6'>
            <h1>{leagueData.name}</h1>
          </div>
          <div className='col-6'>
            <h1><a className='white' href={`/league/${leagueId}/games`}>Games</a></h1>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <h2>Teams:</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 px-0'>
            <ul className='list-unstyled'>
              {firstHalf.map((team, index) => (
                <li className={`py-3 px-1 m-0 ${index % 2 === 0 ? 'even' : 'odd'}`} key={team.id}><a className='black' href={`/league/${leagueId}/${team.id}`}>{team.name}</a></li>
              ))}
            </ul>
          </div>
          <div className='col-6 px-0'>
            <ul className='list-unstyled'>
              {secondHalf.map((team, index) => (
                <li className={`py-3 px-1 m-0 ${index % 2 === 0 ? 'even' : 'odd'}`} key={team.id}><a className='black' href={`/league/${leagueId}/${team.id}`}>{team.name}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
export default LeagueComponent;