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

export default function AdminLoggedIn({ children }) {
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
        <Portal title={`Sign in to view admin`}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
        </Portal>
    );
  }
  return (
    <div className="w-full font-heading">
        {(isSignedIn && (fire.auth().currentUser.email.includes("mumfordwood") || fire.auth().currentUser.email.includes("lewi.sh"))) ? children : "Sorry, you are not a Mumford Wood admin"}
    </div>
  );

}
