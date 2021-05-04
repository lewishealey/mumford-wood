import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from '@layouts/AdminLayout';
import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [dateFrom, setDateFrom] = useState('2017-01-01');
    const [dateTo, setDateTo] = useState('2022-01-01');

      useEffect(() => {
        fire.firestore()
          .collection('downloads')
          .where('date', '>', new Date(dateFrom))
          .where('date', '<', new Date(dateTo))
          .orderBy('date', 'desc')
          .onSnapshot(snap => {
            const downloads = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              if(downloads.length > 0) {
                const csv = createCsvObject(downloads);
                setCsvData(csv);
              }
                setDownloads(downloads);
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
            <CSVLink className={actionClasses} data={csvData} filename={`downloads-from-${dateFrom}--to-${dateTo}.csv`}>Download as CSV</CSVLink>
      </div>;


return <AdminLayout title="Downloads" action={dateRange}>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Date</th>
                <th className="text-left border-b border-gray-200 p-1">File</th>
                <th className="text-left border-b border-gray-200 p-1">Page</th>
                <th className="text-left border-b border-gray-200 p-1">User</th>
                <th className="text-left border-b border-gray-200 p-1">Date</th>
                </tr>
            </thead>
            <tbody>
            {downloads ? downloads?.map((download, i) =>
                <tr key={i}>
                    <td className="border-b border-gray-200 p-1">
                        {download.date &&
                            <Moment format="DD/MM/YYYY hh:mm a">
                                {download.date.toDate()}
                            </Moment>
                        }
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {download.fileName} ({download.fileType})
                    </td>
                    <td className="border-b border-gray-200 p-1">{download.page}</td>
                    <td className="border-b border-gray-200 p-1">{download.userName}</td>
                </tr>
                ) : 'Loading'}
            </tbody>
        </table>

    </AdminLayout>
}

export default Downloads
