import React, { useEffect, useState } from 'react';
import fire from '@lib/firebase';
import AdminLayout from 'src/layouts/AdminLayout';
import { formatPath } from "@utils/helpers";
import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import { createCsvObject, fileDate } from '@utils/helpers';

const Enquiries = () => {
    const [enquires, setEnquiries] = useState([]);
    const [activeTab, setActiveTab] = useState("estimate-requests");
    const [csvData, setCsvData] = useState([]);
    const [dateFrom, setDateFrom] = useState('2017-01-01');
    const [dateTo, setDateTo] = useState('2022-01-01');

    const handleTab = (type) => {
        setActiveTab(type);
    }

    useEffect(() => {
        fire.firestore()
          .collection(activeTab)
          .where('date', '>', new Date(dateFrom))
          .where('date', '<', new Date(dateTo))
          .onSnapshot(snap => {
            const enquires = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
            if(enquires.length > 0) {
                const csv = createCsvObject(enquires);
                setCsvData(csv);
            }
            setEnquiries(enquires);
          });

      }, [dateFrom, dateTo, activeTab]);

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
              <CSVLink className={actionClasses} data={csvData} filename={`${activeTab}-from-${dateFrom}--to-${dateTo}.csv`}>Download as CSV</CSVLink>
        </div>;

    return <AdminLayout title="Form submissions" action={dateRange}>

        <div className="m-1 mb-0 flex space-x-0.5">
            <button className={`h-1.75 flex text-xs focus:outline-none ${activeTab == 'estimate-requests' ? 'text-white bg-primary-base' : 'text-black bg-neutral-4'} items-center justify-center px-0.75 py-0.5 rounded-full`} onClick={() => handleTab("estimate-requests")}>Estimate requests</button>
            <button className={`h-1.75 flex text-xs focus:outline-none ${activeTab == 'download-requests' ? 'text-white bg-primary-base' : 'text-black bg-neutral-4'} items-center justify-center px-0.75 py-0.5 rounded-full`} onClick={() => handleTab("download-requests")}>Brochure requests</button>
            <button className={`h-1.75 flex text-xs focus:outline-none ${activeTab == 'apprentice-requests' ? 'text-white bg-primary-base' : 'text-black bg-neutral-4'} items-center justify-center px-0.75 py-0.5 rounded-full`} onClick={() => handleTab("apprentice-requests")}>Apprenticeship</button>
        </div>

        <table className="table-fixed w-full">
            <thead>
                <tr>
                <th className="text-left border-b border-gray-200 p-1">Date</th>
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
                        {enquiry.date &&
                            <Moment format="DD/MM/YYYY hh:mm a">
                                {enquiry.date.toDate()}
                            </Moment>
                        }
                    </td>
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
