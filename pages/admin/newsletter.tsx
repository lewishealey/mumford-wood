import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';
import { CSVLink, CSVDownload } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Signups = () => {
    const [signups, setSignups] = useState([]);
    const [csvData, setCsvData] = useState([]);

      useEffect(() => {
        fire.firestore()
          .collection('newsletter-signups')
          .onSnapshot(snap => {
            const signups = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              const csv = createCsvObject(signups);
              setCsvData(csv);
              setSignups(signups);
          });
      }, []);

    return <AdminLayout title="Newsletter sign ups" action={<CSVLink className="bg-primary-base hover:bg-primary-hover text-center justify-center relative inline-flex rounded font-heading text-md items-center text-white h-2.5 px-1 self-end" data={csvData} filename={`newsletter_signups-${fileDate()}.csv`}>Download as CSV</CSVLink>}>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Name</th>
                <th className="text-left border-b border-gray-200 p-1">Email</th>
                </tr>
            </thead>
            <tbody>
            {signups?.length > 0 ? signups?.map((signup, i) =>
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
