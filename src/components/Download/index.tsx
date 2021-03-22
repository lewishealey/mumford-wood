import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import fire from '@lib/firebase';

export interface DownloadProps {
    entity: string;
    user: object;
    title: string;
    pdf?: string;
    pdfLt?: string;
    pdfOv?: string;
    dwg?: string;
}

// export class CounterDisplay extends React.PureComponent<CounterDisplayProps> {

export const Download: React.FC<DownloadProps> = ({
    entity,
    title,
    pdf,
    pdfLt,
    pdfOv,
    dwg,
}) => {

    const registerDownload = (event, type) => {
        event.preventDefault();
        fire.firestore()
          .collection('downloads_users')
          .doc(fire.auth().currentUser.uid)
          .update({
            downloads: fire.firestore.FieldValue.arrayUnion({
                title,
                date: new Date(),
                entity,
                type
          })
        });
        fire.firestore()
          .collection('downloads')
          .add({
                id: fire.auth().currentUser.uid,
                title,
                name: fire.auth().currentUser.displayName,
                date: new Date(),
                entity,
                type
          });
    }

    return (
        <div className="flex justify-between px-2 py-1 border-2 border-gray-200 border-solid w-full">
            {title}
            {dwg && <a href={dwg} onClick={(e) => registerDownload(e, 'DWG')}>DWG</a>}
            {pdf && <a href={pdf} onClick={(e) => registerDownload(e, 'PDF')}>PDF</a>}
            {pdfLt && <a href={pdfLt} onClick={(e) => registerDownload(e, 'LT PDF')}>LT PDF</a>}
            {pdfOv && <a href={pdfOv} onClick={(e) => registerDownload(e, 'OV PDF')}>OV PDF</a>}
        </div>
    )
  }

  export default Download;
