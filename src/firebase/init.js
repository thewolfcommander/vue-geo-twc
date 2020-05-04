import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAW_d3l3SLSXzb6tkhfvJ8Q5w_zw7UZmrg",
  authDomain: "vue-geo-twc.firebaseapp.com",
  databaseURL: "https://vue-geo-twc.firebaseio.com",
  projectId: "vue-geo-twc",
  storageBucket: "vue-geo-twc.appspot.com",
  messagingSenderId: "786144194679",
  appId: "1:786144194679:web:64647a80b5db728918d672",
  measurementId: "G-462P2FK0N7"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebaseApp.firestore().settings({
  timestampsInSnapshots: true
})

export default firebaseApp.firestore()
