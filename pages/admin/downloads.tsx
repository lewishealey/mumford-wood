import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from '@layouts/AdminLayout';
import Moment from 'react-moment';

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);

      //https://medium.com/swlh/lets-create-blog-app-with-next-js-react-hooks-and-firebase-backend-tutorial-7ce6fd7bbb3a#3c58

      useEffect(() => {
        fire.firestore()
          .collection('downloads')
          .onSnapshot(snap => {
            const downloads = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setDownloads(downloads);
          });
      }, []);

      console.log(downloads)
    return <AdminLayout title="Downloads">

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
            {downloads ? downloads.map(download =>
                <tr>
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
