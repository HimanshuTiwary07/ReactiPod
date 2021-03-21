import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';

//firebase config

var firebaseConfig = {
  apiKey: "AIzaSyDpiCA19uakIy-uXXVF2rof9VWFQOQn5Ec",
  authDomain: "ipod-68b5c.firebaseapp.com",
  databaseURL: "https://ipod-68b5c.firebaseio.com",
  projectId: "ipod-68b5c",
  storageBucket: "ipod-68b5c.appspot.com",
  messagingSenderId: "887593348452",
  appId: "1:887593348452:web:3303aff125f7ff07b6de71",
  measurementId: "G-CXM4RG20DH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />,document.getElementById('root'));

