import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';

const Signups = () => {
    const [signups, setSignups] = useState([]);

      useEffect(() => {
        fire.firestore()
          .collection('newsletter-signups')
          .onSnapshot(snap => {
            const signups = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setSignups(signups);
          });
      }, []);

    return <AdminLayout title="Newsletter sign ups">

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Name</th>
                <th className="text-left border-b border-gray-200 p-1">Email</th>
                </tr>
            </thead>
            <tbody>
            {signups?.length > 0 ? signups.map((signup, i) =>
                <tr key={i}>
                    <td className="border-b border-gray-200 p-1">
                        {signup.firstName}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {signup.email}
                    </td>
                </tr>
                ) : <tr key={"loading"}>
                <td className="border-b border-gray-200 p-1">
                    Loading
                </td>
            </tr>}
            </tbody>
        </table>

    </AdminLayout>
}

export default Signups;
