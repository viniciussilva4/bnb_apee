import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

const BnbComponent = () => {
  const[leagueData, setLeagueData] = useState([]);
  useEffect(() => {
      fetch(`http://localhost:8000/apee/league/`).then(response => response.json()).then(data => {setLeagueData(data);}).catch(error => {console.error('Error fetching data:', error);});
    }, []);
  return (
    <div>
      <ul className='list-unstyled'>
        {leagueData.map((league, index) => {
          return (
            <li key={index}><a href={`league/${league.id}`}>{league.name}</a></li>
          );
        })}
        <li><a href={`teste/1/1`}>teste</a></li>
      </ul>
    </div>
  );    
}

export default BnbComponent;