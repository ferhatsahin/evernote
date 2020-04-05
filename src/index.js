import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA9XpX-q7CqpexukYelhDiPOatzjDt7yaQ",
    authDomain: "evernote-68d21.firebaseapp.com",
    databaseURL: "https://evernote-68d21.firebaseio.com",
    projectId: "evernote-68d21",
    storageBucket: "evernote-68d21.appspot.com",
    messagingSenderId: "478898289196",
    appId: "1:478898289196:web:932b7dc9fc37478c556f89"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
