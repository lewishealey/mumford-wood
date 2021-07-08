import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';
import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import { createCsvObject } from '@utils/helpers';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [dateFrom, setDateFrom] = useState('2017-01-01');
    const [dateTo, setDateTo] = useState('2022-01-01');

      useEffect(() => {
        fire.firestore()
          .collection('users')
          .where('date_updated', '>', new Date(dateFrom))
          .where('date_updated', '<', new Date(dateTo))
          .orderBy('date_updated', 'desc')
          .onSnapshot(snap => {
            const users = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              if(users.length > 0) {
                const csv = createCsvObject(users);
                setCsvData(csv);
              }
              setUsers(users);
          });
      }, [dateFrom, dateTo]);

      const inputClasses = "h-2.5 px-0.75 relative w-full flex rounded font-heading text-md items-center";
      const actionClasses = "w-full bg-primary-base hover:bg-primary-hover text-center justify-center relative inline-flex rounded font-heading text-md items-center text-white h-2.5 px-1 self-end";

      const dateRange = <div className="flex space-x-1">
            <span className="flex items-center">From</span>
            <input type="date" className={inputClasses} name="date_from" defaultValue={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}/>
            <span className="flex items-center">To</span>
            <input type="date" className={inputClasses} name="date_from" defaultValue={dateTo}
                onChange={(e) => setDateTo(e.target.value)}/>
            <span className="flex items-center">|</span>
            <CSVLink className={actionClasses} data={csvData} filename={`registered_users-from-${dateFrom}--to-${dateTo}.csv`}>Download as CSV</CSVLink>
      </div>;


    return <AdminLayout title="Registered users" action={dateRange}>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Name</th>
                <th className="text-left border-b border-gray-200 p-1">Date signed up</th>
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
