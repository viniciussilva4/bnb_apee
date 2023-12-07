// src/components/LeagueComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeagueComponent = () => {
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    const fetchLeagueData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/apee/liga/');
        setLeagueData(response.data[0]);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchLeagueData();
  }, []);

  return (
    <div>
      {leagueData && (
        <>
          <h1>{leagueData.name}</h1>
          <ul>
            {leagueData.teams.map((team) => (
              <a href='#'><li key={team.id}>{team.name}</li></a>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LeagueComponent;