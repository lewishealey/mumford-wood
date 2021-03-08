import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from '@layouts/AdminLayout';

const Enquiries = () => {
    const [enquires, setEnquiries] = useState([]);

      useEffect(() => {
        fire.firestore()
          .collection('enquiries')
          .onSnapshot(snap => {
            const enquires = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setEnquiries(enquires);
          });
      }, []);

    return <AdminLayout title="Enquiries">

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">File</th>
                <th className="text-left border-b border-gray-200 p-1">Page</th>
                <th className="text-left border-b border-gray-200 p-1">Email</th>
                <th className="text-left border-b border-gray-200 p-1">Phone</th>
                <th className="text-left border-b border-gray-200 p-1">Profession</th>
                <th className="text-left border-b border-gray-200 p-1">Enquiry</th>
                </tr>
            </thead>
            <tbody>
            {enquires ? enquires.map((enquiry, i) =>
                <tr key={i}>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.fName} {enquiry.lName}
                        <small className="block">{new Date(enquiry.date).toString()}</small>
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.entity}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.email}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.phone}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.profession}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        wwefwe
                    </td>

                </tr>
                ) : 'Loading'}
            </tbody>
        </table>

    </AdminLayout>
}

export default Enquiries;
