import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Portal from '@components/Portal';
import fire from '@lib/firebase';

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
    location: string
}

export default function LoggedIn({ entity, location, children }) {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = fire.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);

      if(user) {
        fire.firestore()
            .collection('users')
            .doc(fire.auth().currentUser.uid)
            .set({
                name: fire.auth().currentUser.displayName,
                location,
                date_updated: new Date()
            });
        }
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
    <div className="w-full">
        <p>Welcome {fire.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => fire.auth().signOut()}>Sign-out</a>
        {children}
    </div>
  );

}
