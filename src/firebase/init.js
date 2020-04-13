import firebase from 'firebase'
import firestore from 'firebase/firestore'
let firebaseConfig = {
    apiKey: "AIzaSyDDUovK8ciKRTtIimf3AUcc1x9KWsjFaIU",
    authDomain: "vuejssample-d4915.firebaseapp.com",
    databaseURL: "https://vuejssample-d4915.firebaseio.com",
    projectId: "vuejssample-d4915",
    storageBucket: "vuejssample-d4915.appspot.com",
    messagingSenderId: "443989949351",
    appId: "1:443989949351:web:6d74ff1ea960d1ea9fd482",
    measurementId: "G-779RW9EHTL"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({timestampInSnaoshots: true })
export default firebaseApp.firestore();