import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import { fetchEntries } from '../utils/contentfulPosts'
import Post from '../components/Post'
import { Header } from '../components/Header';

const firebaseConfig = {
    apiKey: "AIzaSyApNfQ7ANfQDY2nj4TJtxhOOPrS00y9Su0",
    authDomain: "mumford-wood.firebaseapp.com",
    databaseURL: "https://mumford-wood-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mumford-wood",
    storageBucket: "mumford-wood.appspot.com",
    messagingSenderId: "614169738612",
    appId: "1:614169738612:web:149e93d9d2cc2c41214021"
  };

  const config = {
    apiKey: 'AIzaSyApNfQ7ANfQDY2nj4TJtxhOOPrS00y9Su0',
    authDomain: "mumford-wood.firebaseapp.com",
    // ...
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
};


export default function Home({posts}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

    <div className="posts bg-gray-200 m-2">
        {posts && <div>Contentful is connected</div>}
    </div>

    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

    </div>
  )
}

export async function getStaticProps() {
    const res = await fetchEntries()
    const posts = await res.map((p) => {
      return p.fields
    })

    return {
      props: {
        posts,
      },
    }
  }

