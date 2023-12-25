import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'

const BnbComponent = () => {
    useEffect(() => {
        fetch(`http://localhost:8000/apee/league/`).then(response => response.json()).then(data => {
            setLeagueData(data);
            setTeamsData();
          }).catch(error => {
            console.error('Error fetching data:', error);
          });});
}

export default BnbComponent;