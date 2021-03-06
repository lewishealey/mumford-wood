import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Portal from '@components/Portal';
import fire from '@lib/firebase';

// const firebaseConfig = {
//     apiKey: "AIzaSyApNfQ7ANfQDY2nj4TJtxhOOPrS00y9Su0",
//     authDomain: "mumford-wood.firebaseapp.com",
//     databaseURL: "https://mumford-wood-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "mumford-wood",
//     storageBucket: "mumford-wood.appspot.com",
//     messagingSenderId: "614169738612",
//     appId: "1:614169738612:web:149e93d9d2cc2c41214021"
// }

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        fire.auth.GoogleAuthProvider.PROVIDER_ID,
        fire.auth.FacebookAuthProvider.PROVIDER_ID,
        fire.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

export interface LoggedInProps {
    entity: string,
}

export default function LoggedIn({ entity, children }) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = fire.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);

    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
        <Portal title={`Sign in to view ${entity}`}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
        </Portal>
    );
  }
  return (
    <div>
        <p>Welcome {fire.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => fire.auth().signOut()}>Sign-out</a>
        {children}
    </div>
  );

}
