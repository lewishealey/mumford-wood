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

    const registerDownload = (event, type, link) => {
        event.preventDefault();

        try {
            fire.firestore()
                .collection('downloads_users')
                .doc(fire.auth().currentUser.uid)
                .update({
                downloads: fire.firestore.FieldValue.arrayUnion({
                    date: new Date(),
                    page: entity,
                    fileName: title,
                    fileType: type,
                    link
                })
            });

            fire.firestore()
            .collection('downloads')
            .add({
                  userId: fire.auth().currentUser.uid,
                  userName: fire.auth().currentUser.displayName,
                  date: new Date(),
                  page: entity,
                  fileName: title,
                  fileType: type,
            });
            } catch (e) {
            console.log('Issue with saving data')
        } finally {
            window.open(link, '_blank');
        }
    }

    return (
        <div className="flex justify-between px-2 py-1 border-b border-gray-300 border-solid w-full">
            {title}
            <div className="flex space-x-1">
                {files && files.map((item, i) => <a href={item?.fields?.file?.url} key={i} onClick={(e) => registerDownload(e, item?.fields?.title, item?.fields?.file?.url)} className="hover:underline">{item?.fields?.title}</a>)}
            </div>
        </div>
    )
  }

  export default Download;
