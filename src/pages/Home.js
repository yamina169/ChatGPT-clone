
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar ,Card } from '../components';

const Home = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    } 
  }, [])


  return (
    <div>
        <Sidebar/>
        <center>

        <Card/>
</center>

    </div>
  );
};

export default Home;