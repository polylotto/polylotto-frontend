import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  Provider as Web3Provider,
  Updater as Web3Updater,
} from "./context/web3";
import {
  Provider as RaffleProvider,
  Updater as RaffleUpdater,
} from "./context/raffle";

import { Provider as UserProvider } from './context/user';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <RaffleProvider>
        <UserProvider>
          <App />
          <Web3Updater />
          <RaffleUpdater />
        </UserProvider>
      </RaffleProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
