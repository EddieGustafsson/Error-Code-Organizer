import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import OfflineMessage from './components/OfflineMessage';
import * as serviceWorker from './serviceWorker';
import ReactDetectOfflineAPI from 'react-detect-offline-api'

ReactDOM.render(
  <React.StrictMode>
    <ReactDetectOfflineAPI
      apiUrl={process.env.REACT_APP_BASE_API + "v1/status"}
      checkInterval={9000}
      render={({ online }) =>
        online ? <App /> : <OfflineMessage />
      } 
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
