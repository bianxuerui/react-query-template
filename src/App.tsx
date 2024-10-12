import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import request from './utils/request';

function App() {
  useEffect(() => {
    request.get('https://cors-anywhere.herokuapp.com/http://shop.ddmaq.com/api/v4/auctionfq', {
      params: {
        size: 10,
        page: 1,
        type: 0,
        sort: 'act_id',
        order: 'desc',
        status: '',
        keyword: ''
      }
    }).then((res) => {
      console.log(res);
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
