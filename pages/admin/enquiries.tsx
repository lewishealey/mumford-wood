import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';
import { formatPath } from "@utils/helpers";
import { CSVLink } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Enquiries = () => {
    const [enquires, setEnquiries] = useState([]);
    const [activeTab, setActiveTab] = useState("estimate-requests");
    const [csvData, setCsvData] = useState([]);

    const handleTab = (type) => {
        fire.firestore()
        .collection(type)
        .onSnapshot(snap => {
          const enquires = snap.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            const csv = createCsvObject(enquires);
            setCsvData(csv);
            setEnquiries(enquires);
            setActiveTab(type);
        });
    }

      useEffect(() => {
        fire.firestore()
          .collection('estimate-requests')
          .onSnapshot(snap => {
            const enquires = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setEnquiries(enquires);
          });

      }, []);

      console.log(enquires)

    return <AdminLayout title="Form submissions" action={<CSVLink className="bg-primary-base hover:bg-primary-hover text-center justify-center relative inline-flex rounded font-heading text-md items-center text-white h-2.5 px-1 self-end" data={csvData} filename={`${activeTab}-${fileDate()}.csv`}>Download as CSV</CSVLink>}>

        <div className="m-1 mb-0 flex space-x-0.5">
            <button className={`h-1.75 flex text-xs focus:outline-none ${activeTab == 'estimate-requests' ? 'text-white bg-primary-base' : 'text-black bg-neutral-4'} items-center justify-center px-0.75 py-0.5 rounded-full`} onClick={() => handleTab("estimate-requests")}>Estimate requests</button>
            <button className={`h-1.75 flex text-xs focus:outline-none ${activeTab == 'download-requests' ? 'text-white bg-primary-base' : 'text-black bg-neutral-4'} items-center justify-center px-0.75 py-0.5 rounded-full`} onClick={() => handleTab("download-requests")}>Brochure requests</button>
            <button className={`h-1.75 flex text-xs focus:outline-none ${activeTab == 'apprentice-requests' ? 'text-white bg-primary-base' : 'text-black bg-neutral-4'} items-center justify-center px-0.75 py-0.5 rounded-full`} onClick={() => handleTab("apprentice-requests")}>Apprenticeship</button>
        </div>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Name</th>
                <th className="text-left border-b border-gray-200 p-1">Email</th>
                <th className="text-left border-b border-gray-200 p-1">Phone</th>
                {activeTab == "apprentice-requests" &&
                    <th className="text-left border-b border-gray-200 p-1">Address</th>
                }
                {(activeTab == "apprentice-requests" || activeTab == "download-requests")  &&
                    <th className="text-left border-b border-gray-200 p-1">Postcode</th>
                }

                {activeTab == "apprentice-requests" &&
                    <>
                        <th className="text-left border-b border-gray-200 p-1">DOB</th>
                        <th className="text-left border-b border-gray-200 p-1">Carer name</th>
                        <th className="text-left border-b border-gray-200 p-1">Carer phone</th>
                    </>
                }
                <th className="text-left border-b border-gray-200 p-1">Notes</th>
                </tr>
            </thead>
            <tbody>
            {enquires ? enquires?.map((enquiry, i) =>
                <tr key={i}>
                    <td className="border-b border-gray-200 p-1">
                        <div>{enquiry.firstName} {enquiry.lastName}</div>
                        {enquiry.page && formatPath(enquiry.page)}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.email}
                    </td>
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.phone}
                    </td>
                    {activeTab == "apprentice-requests" &&
                        <td className="border-b border-gray-200 p-1">
                            {enquiry.address}
                        </td>
                    }
                    {(activeTab == "apprentice-requests" || activeTab == "download-requests") &&
                        <td className="border-b border-gray-200 p-1">
                            {enquiry.postcode}
                        </td>
                    }
                    {activeTab == "apprentice-requests" &&
                        <>
                            <td className="border-b border-gray-200 p-1">
                                {enquiry.dob}
                            </td>
                            <td className="border-b border-gray-200 p-1">
                                {enquiry.carerName}
                            </td>
                            <td className="border-b border-gray-200 p-1">
                                {enquiry.carerPhone}
                            </td>
                        </>
                    }
                    <td className="border-b border-gray-200 p-1">
                        {enquiry.notes}
                    </td>

                </tr>
                ) : 'Loading'}
            </tbody>
        </table>

    </AdminLayout>
}

export default Enquiries;
