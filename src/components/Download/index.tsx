import React from 'react';
import fire from '@lib/firebase';

type FileItem = {
    fields: {
        title: string;
        file: {
            details: {
                size: number;
            }
            contentType: string;
            url: string;
        }
    }
}

export interface DownloadProps {
    entity: string;
    user: object;
    title: string;
    files: FileItem[];
}

export const Download: React.FC<DownloadProps> = ({
    entity,
    title,
    files
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
        <div className="flex justify-between px-2 py-1 border-b border-gray-300 border-solid w-full">
            {title}
            <div className="flex space-x-1">
                {files && files.map((item, i) => <a href={item?.fields?.file?.url} onClick={(e) => registerDownload(e, item?.fields?.title)} className="hover:underline">{item?.fields?.title}</a>)}
            </div>
        </div>
    )
  }

  export default Download;
