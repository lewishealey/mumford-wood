import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';

const Users = () => {
    const [users, setUsers] = useState([]);

      //https://medium.com/swlh/lets-create-blog-app-with-next-js-react-hooks-and-firebase-backend-tutorial-7ce6fd7bbb3a#3c58

      console.log(users);

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

    return <AdminLayout title="User list">

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Title</th>
                <th  className="text-left border-b border-gray-200 p-1">Date added</th>
                <th  className="text-left border-b border-gray-200 p-1">Login type</th>
                </tr>
            </thead>
            <tbody>
            {users ? users.map(user =>
                <tr>
                    <td className="border-b border-gray-200 text-royal-base underline p-1">
                        <a href={`/admin/user/${user.id}`}>{user.name}</a>
                    </td>
                    <td className="border-b border-gray-200 p-1">11/09/2020 14:50pm</td>
                    <td className="border-b border-gray-200 p-1">Google</td>
                </tr>
                ) : 'Loading'}
            </tbody>
        </table>

    </AdminLayout>
}

export default Users
