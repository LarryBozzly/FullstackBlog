import firebase from 'firebase/app'
import 'firebase/storage';

var config = {
    apiKey: "{apiKey}",
    authDomain: "{authDomain}",
    databaseURL: "{databaseURL}",
    projectId: "{projectId}",
    storageBucket: "{storageBucket}",
    messagingSenderId: "{messagingSenderId}",
    appId: "{appId}",
    measurementId: "{measurementId}"
  };

  firebase.initializeApp(config);

  const storage = firebase.storage();

  export{storage,firebase as default}