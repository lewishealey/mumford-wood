import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import AdminLayout from '@layouts/AdminLayout';
import fire, { firebaseConfig } from '@lib/firebase';

const User = () => {
    const router = useRouter();
    const { id } = router.query;
    const [tab, setTab] = useState(0);

    return <AdminLayout title={ `Enquiry: ${id}` }>
        <ul className="flex m-1 mb-0 border-b pb-1 border-gray-200">
            <li className={`${tab === 0 && 'bg-royal-base hover:bg-blue-800 text-white'} hover:bg-gray-200 text-black px-1 py-05 rounded`} onClick={() => setTab(0)}>Downloads</li>
            <li className={`${tab === 1 && 'bg-royal-base hover:bg-blue-800 text-white'} hover:bg-gray-200 text-black px-1 py-05 rounded`} onClick={() => setTab(1)}>Enquiries</li>
        </ul>

        {tab == 0 &&
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="text-left border-b border-gray-200 p-1">Name</th>
                        <th className="text-left border-b border-gray-200 p-1">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-gray-200 p-1">Head, Cill & Jambs (PDF)</td>
                        <td className="border-b border-gray-200 p-1">Box Sash - Heritage</td>
                    </tr>
                    <tr>
                        <td className="border-b border-gray-200 p-1">Bay Posts (DWG)</td>
                        <td className="border-b border-gray-200 p-1">Casement - Conservation</td>
                    </tr>
                </tbody>
            </table>
        }

        {tab == 1 &&
            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className="text-left border-b border-gray-200 p-1">Page</th>
                        <th className="text-left border-b border-gray-200 p-1">Date</th>
                        </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border-b border-gray-200 p-1">Box Sash - Heritage</td>
                        <td className="border-b border-gray-200 p-1">11/09/2020 14:50pm</td>
                    </tr>
                </tbody>
            </table>
        }

    </AdminLayout>
}

export default User
