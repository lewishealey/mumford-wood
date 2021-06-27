import React, { useState, useCallback, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import SalesContext from "@utils/salesContexts";
import { useRouter } from "next/router";
import Button from "@components/Button";
import { formatBytes } from "@utils/helpers";
import { useDropzone } from "react-dropzone";
import {
  headOffice,
  alexFlokkas,
  benGreenwood,
  matthewBlaylock,
  scottMartin,
} from "@utils/salesAreas";
import ReCaptcha from "@components/ReCaptcha";
import fire from "@lib/firebase";
import classNames from "classnames";
import moment from "moment";
import {
    amazonBucket,
    encodeS3URI,
  } from "@utils/helpers";

// https://dev.to/markdrew53/integrating-sendgrid-with-next-js-4f5m
// https://nextjs.org/blog/forms

type Props = {
  cta?: boolean;
  inputs?: boolean;
  onCtaClick?: () => void;
};

export const RequestEstimate: React.FC<Props> = ({
  cta,
  inputs,
  onCtaClick,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles([...files, acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [status, setStatus] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [flattenedFiles, setFlattenedFiles] = useState([]);
  const { asPath } = useRouter();
  const salesTeam = useContext(SalesContext);

  useEffect(() => {
    setFlattenedFiles(files.flat(2));
  }, [files]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadPhoto = async (file) => {
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData: any = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
    } else {
      console.error("Upload failed.");
    }
  };

  const onSubmit = (data) => {
    data.date = new Date();
    data.prettyDate = moment(new Date()).format("DD MMM YYYY hh:mm");
    data.page = asPath;
    let fileNames = [];
    flattenedFiles.forEach(file =>
        fileNames.push({
            name: file.name,
            link: `${amazonBucket}${encodeS3URI(file.name)}`
        })
    );
    data.files = fileNames;
    setStatus("loading");

    flattenedFiles.forEach((file) => {
      const reader = new FileReader();
      uploadPhoto(file);
    //   reader.onabort = () => console.log("file reading was aborted");
    //   reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });

    let shortenedPostcode = data?.postCode
      ?.slice(0, 2)
      .replace(/[0-9]/g, "")
      .toUpperCase();

    const relevantRep =
      salesTeam instanceof Array
        ? salesTeam?.filter(function (team) {
            if (
              headOffice.includes(shortenedPostcode) &&
              team.id == "headOffice"
            ) {
              return true;
            }
            if (
              alexFlokkas.includes(shortenedPostcode) &&
              team.id == "alexFlokkas"
            ) {
              return true;
            }
            if (
              benGreenwood.includes(shortenedPostcode) &&
              team.id == "benGreenwood"
            ) {
              return true;
            }
            if (
              matthewBlaylock.includes(shortenedPostcode) &&
              team.id == "matthewBlaylock"
            ) {
              return true;
            }
            if (
              scottMartin.includes(shortenedPostcode) &&
              team.id == "scottMartin"
            ) {
              return true;
            }
          })
        : null;

    if (relevantRep && relevantRep.length > 0) {
      data.repName = relevantRep[0].title;
      data.repEmail = relevantRep[0].email;
      data.repPhone = relevantRep[0].phone;
      data.repImage = relevantRep[0].thumbnail?.url;
    }

    data.subject = "Thank you for submitting an estimate request";
    data.adminSubject = "New estimate request";

    fetch("/api/email/send", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setStatus("success");
      if (res.status === 200) {
        try {
          fire.firestore().collection("estimate-requests").add(data);
        } catch (e) {
          setStatus("error");
        }
      } else {
        console.error(res);
        setStatus("error");
      }
    });
  };

  const classes = classNames(
    `relative w-full flex rounded font-heading text-md items-center h-2.5 px-1`
  );
  const classesArea = classNames(
    `relative w-full flex rounded font-heading text-md items-center h-5 px-1`
  );

  return (
    <div className="space-y-1">
      {cta && (
        <div>
          <h3 className="font-heading text-xl color-gray mb-1">
            Request an estimate
          </h3>
          <p className="font-body text-base text-neutral-1 mb-1">
            Fill in a simple form and a representative will be in touch within
            24 hours
          </p>
          <Button size="default" style="primary" onClick={onCtaClick}>
            Request estimate
          </Button>
        </div>
      )}

      {inputs && (
        <>
        {status === "loading" && (
             <>
             <h3 className="font-heading text-xl color-gray mb-1">Submitting information</h3>
             <p className="font-body text-base text-neutral-1">
               Please kindly wait
             </p>
           </>
        )}

        {status === "error" && (
             <>
             <h3 className="font-heading text-xl color-gray mb-1">Opps! There seems to be an issue</h3>
             <p className="font-body text-base text-neutral-1">
               Something went wrong with your submission. Please contact sales@mumfordwood.com
             </p>
           </>
        )}

          {status === "success" && (
            <>
              <h3 className="font-heading text-xl color-gray mb-1">Success!</h3>
              <p className="font-body text-base text-neutral-1">
                Thanks for your submission
              </p>
            </>
          )}

          {status == "" && (
            <>
              <h3 className="font-heading text-xl color-gray mb-1">
                Request an estimate
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                <div className="TextField__group w-full">
                  <label className="relative flex rounded font-heading text-md items-center mb-0.25">
                    First name
                  </label>
                  <input
                    type="text"
                    className={classes}
                    {...register("firstName")}
                  />
                </div>
                <div className="TextField__group w-full">
                  <label className="relative flex rounded font-heading text-md items-center mb-0.25">
                    Last name
                  </label>
                  <input
                    type="text"
                    className={classes}
                    {...register("lastName")}
                  />
                </div>
                <div className="TextField__group w-full">
                  <label className="relative flex rounded font-heading text-md items-center mb-0.25">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={classes}
                    {...register("email")}
                  />
                </div>
                <div className="TextField__group w-full">
                  <label className="relative flex rounded font-heading text-md items-center mb-0.25">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className={classes}
                    {...register("phone")}
                  />
                </div>
                <div className="TextField__group w-full">
                  <label className="relative flex rounded font-heading text-md items-center mb-0.25">
                    Post code
                  </label>
                  <input
                    type="text"
                    className={classes}
                    {...register("postCode")}
                  />
                </div>
                <div className="TextField__group w-full">
                  <label className="relative flex rounded font-heading text-md items-center mb-0.25">
                    Additional information
                  </label>
                  <textarea
                    className={classesArea}
                    {...register("notes")}
                    rows={6}
                  />
                </div>
                <div {...getRootProps()}>
                  <input {...getInputProps()}/>
                  {isDragActive ? (
                    <div className="border-dashed border-2 w-full h-4 rounded flex justify-center items-center bg-primary-fade">
                      <span className="block text-neutral-1">
                        Drop files here
                      </span>
                    </div>
                  ) : (
                    <div className="border-dashed border-2 w-full h-4 rounded flex justify-center items-center hover:bg-primary-fade cursor-pointer">
                      <span className="block text-neutral-1">
                        Attach any files for reference
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {flattenedFiles.map((file, i) => (
                    <div
                      className="text-left text-sm flex justify-between mb-0.25"
                      key={file?.name}
                    >
                      <span className="truncate">
                        {file?.name} ({formatBytes(file?.size)})
                      </span>
                      <span
                        onClick={() =>
                          setFiles(files.filter((fileItem, x) => x !== i))
                        }
                      >
                        Delete
                      </span>
                    </div>
                  ))}
                </div>
                <ReCaptcha />
                <Button size="default" style="primary">
                  Submit request
                </Button>
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RequestEstimate;
