import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from '@layouts/AdminLayout';
import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
    const [csvData, setCsvData] = useState([]);

      useEffect(() => {
        fire.firestore()
          .collection('downloads')
          .onSnapshot(snap => {
            const downloads = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              const csv = createCsvObject(downloads);
                setCsvData(csv);
                setDownloads(downloads);
          });
      }, []);

      console.log(downloads)
    return <AdminLayout title="Downloads" action={<CSVLink className="bg-primary-base hover:bg-primary-hover text-center justify-center relative inline-flex rounded font-heading text-md items-center text-white h-2.5 px-1 self-end" data={csvData} filename={`downloads-${fileDate()}.csv`}>Download as CSV</CSVLink>}>

        <table className="table-fixed w-full">
            <thead>
                <tr>
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
                        {download.fileName} ({download.fileType})
                    </td>
                    <td className="border-b border-gray-200 p-1">{download.page}</td>
                    <td className="border-b border-gray-200 p-1">{download.userName}</td>
                    <td className="border-b border-gray-200 p-1">
                        {download.date &&
                            <Moment format="DD/MM/YYYY hh:mm a">
                                {download.date.toDate()}
                            </Moment>
                        }
                    </td>
                </tr>
                ) : 'Loading'}
            </tbody>
        </table>

    </AdminLayout>
}

export default Downloads
