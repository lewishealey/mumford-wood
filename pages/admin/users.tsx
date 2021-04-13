import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';
import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [csvData, setCsvData] = useState([]);

      useEffect(() => {
        fire.firestore()
          .collection('users')
          .onSnapshot(snap => {
            const users = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              const csv = createCsvObject(users);
              setCsvData(csv);
              setUsers(users);
          });
      }, []);

      // Create a function that provides header keys and object
      // Add header to array
      // Loop through Object keys and check if the object has a defined value
      // If defined value, push value, if not, push space
      // Return array


    return <AdminLayout title="Registered users" action={<CSVLink className="bg-primary-base hover:bg-primary-hover text-center justify-center relative inline-flex rounded font-heading text-md items-center text-white h-2.5 px-1 self-end" data={csvData} filename={`registered_users-${fileDate()}.csv`}>Download as CSV</CSVLink>}>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Title</th>
                <th className="text-left border-b border-gray-200 p-1">Date last used</th>
                </tr>
            </thead>
            <tbody>
            {users?.length > 0 ? users?.map((user,i) =>
                <tr key={i}>
                    <td className="border-b border-gray-200 text-royal-base underline p-1">
                        <a href={`/admin/user/${user.id}`}>{user.name}</a>
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {user.date_updated &&
                            <Moment format="DD/MM/YYYY hh:mm a">
                                {user.date_updated.toDate()}
                            </Moment>
                        }
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

export default Users
