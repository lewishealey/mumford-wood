import React from "react";
import fire from "@lib/firebase";
import Image from "next/image";
import { formatBytes } from "@utils/helpers";

export type FileItem = {
  fields: {
    title: string;
    file: {
      details: {
        size: number;
      };
      contentType: string;
      url: string;
    };
  };
};

export interface DownloadProps {
  entity: string;
  user: object;
  title: string;
  files: FileItem[];
}

export const Download: React.FC<DownloadProps> = ({ entity, title, files }) => {
  const registerDownload = (event, type, link) => {
    event.preventDefault();

    try {
      fire
        .firestore()
        .collection("downloads_users")
        .doc(fire.auth().currentUser.uid)
        .update({
          downloads: fire.firestore.FieldValue.arrayUnion({
            date: new Date(),
            page: entity,
            fileName: title,
            fileType: type,
            link,
          }),
        });

      fire.firestore().collection("downloads").add({
        userId: fire.auth().currentUser.uid,
        userName: fire.auth().currentUser.displayName,
        date: new Date(),
        page: entity,
        fileName: title,
        fileType: type,
      });
    } catch (e) {

    }
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between md:px-1 md:py-1 border-b border-gray-300 border-solid w-full">
      <span className="text-lg md:text-base px-1 py-0.5 md:py-0 md:px-0 bg-primary-neutral md:bg-white">
        {title}
      </span>
      <div className="flex flex-col md:flex-row md:space-x-1 px-1 py-0.5 md:py-0 md:px-0 items-start border-t md:border-0">
        {files &&
          files.map((item, i) => (
            <button
              key={i}
              onClick={(e) =>
                registerDownload(
                  e,
                  item?.fields?.title,
                  item?.fields?.file?.url
                )
              }
              className="flex justify-start py-0.5 md:py-0 hover:underline space-x-0.5 items-center"
            >
              <Image
                src="/img/file.svg"
                alt="Download file"
                height={20}
                width={20}
              />
              <span>{item?.fields?.title}</span>
              <span className="text-gray-400 ml-0.5">
                ({formatBytes(item?.fields?.file?.details?.size)})
              </span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Download;
