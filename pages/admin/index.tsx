import React, { useEffect, useState } from 'react';
import fire ,{ firebaseConfig } from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';

const Index = () => {

    const [users, setUsers] = useState([]);

    const handleSubmit = (event) => {
        fire.firestore()
          .collection('users')
          .add({
            title: 'person',
            content: 'content',
          });
      }

      //https://medium.com/swlh/lets-create-blog-app-with-next-js-react-hooks-and-firebase-backend-tutorial-7ce6fd7bbb3a#3c58

      useEffect(() => {
        fire.firestore()
          .collection('users')
          .onSnapshot(snap => {
            const users = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));

              setUsers(users);
          });
      }, []);

    console.log(users)

    return <AdminLayout title="Admin">
            <h1 className="p-2">Welcome to your dashboard</h1>
    </AdminLayout>
}

export default Index
