import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';
import Moment from 'react-moment';
import { CSVLink, CSVDownload } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Signups = () => {
    const [signups, setSignups] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [dateFrom, setDateFrom] = useState('2017-01-01');
    const [dateTo, setDateTo] = useState('2022-01-01');

      useEffect(() => {
        fire.firestore()
          .collection('newsletter-signups')
          .where('date', '>', new Date(dateFrom))
          .where('date', '<', new Date(dateTo))
          .onSnapshot(snap => {
            const signups = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              if(signups.length > 0) {
                const csv = createCsvObject(signups);
                setCsvData(csv);
              }
              setSignups(signups);
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
            <CSVLink className={actionClasses} data={csvData} filename={`newsletter_signups-from-${dateFrom}--to-${dateTo}.csv`}>Download as CSV</CSVLink>
      </div>;



    return <AdminLayout title="Newsletter sign ups" action={dateRange}>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Date</th>
                <th className="text-left border-b border-gray-200 p-1">Name</th>
                <th className="text-left border-b border-gray-200 p-1">Email</th>
                </tr>
            </thead>
            <tbody>
            {signups?.length > 0 ? signups?.map((signup, i) =>
                <tr key={i}>
                    <td className="border-b border-gray-200 p-1">
                        {signup.date &&
                            <Moment format="DD/MM/YYYY hh:mm a">
                                {signup.date.toDate()}
                            </Moment>
                        }
                    </td>
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
