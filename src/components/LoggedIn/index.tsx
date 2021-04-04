import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Portal from 'src/components/Portal';
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
    <div className="w-full font-heading">
        <p className="mb-1">Logged in as <span className="font-bold">{fire.auth().currentUser.displayName}</span> <a className="text-primary-base underline cursor-pointer" onClick={() => fire.auth().signOut()}>Sign-out</a></p>
        {children}
    </div>
  );

}
