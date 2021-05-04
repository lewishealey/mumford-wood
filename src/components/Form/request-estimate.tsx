import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SalesContext from '@utils/salesContexts';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import { useDropzone } from 'react-dropzone';
import { headOffice, alexFlokkas, benGreenwood, matthewBlaylock, scottMartin } from "@utils/salesAreas";
import ReCaptcha from '@components/ReCaptcha';
import fire from '@lib/firebase';
import classNames from 'classnames';
import moment from 'moment';

// https://dev.to/markdrew53/integrating-sendgrid-with-next-js-4f5m
// https://nextjs.org/blog/forms

type Props = {
    cta?: boolean;
    inputs?: boolean;
    onCtaClick?: () => void;
}

export const RequestEstimate: React.FC<Props> = ({
    cta,
    inputs,
    onCtaClick
}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const [status, setStatus] = useState("");
    const [isOpen, setOpen] = useState(false);
    const { asPath } = useRouter();
    const salesTeam = useContext(SalesContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data) => {
          data.date = new Date();
          data.prettyDate = moment(new Date()).format('DD MMM YYYY hh:mm');
          data.page = asPath;

          let shortenedPostcode = data.postCode?.slice(0,2).replace(/[0-9]/g, '').toUpperCase();

          const relevantRep = salesTeam instanceof Array ? salesTeam?.filter( function (team) {
                if(headOffice.includes(shortenedPostcode) && team.id == "headOffice") {
                    return true;
                }
                if(alexFlokkas.includes(shortenedPostcode) && team.id == "alexFlokkas") {
                    return true;
                }
                if(benGreenwood.includes(shortenedPostcode) && team.id == "benGreenwood") {
                    return true;
                }
                if(matthewBlaylock.includes(shortenedPostcode) && team.id == "matthewBlaylock") {
                    return true;
                }
                if(scottMartin.includes(shortenedPostcode) && team.id == "scottMartin") {
                    return true;
                }
        }): null;

        if(relevantRep && relevantRep.length > 0) {
            data.repName = relevantRep[0].title;
            data.repEmail = relevantRep[0].email;
            data.repPhone = relevantRep[0].phone;
            data.repImage = relevantRep[0].thumbnail?.fields?.file?.url;
        }

        console.log(data)

          fetch('/api/email/estimate-user', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

          fetch('/api/email/estimate', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            setStatus("success");
            if (res.status === 200) {
                try {
                    fire.firestore()
                        .collection('estimate-requests')
                        .add(data);
                        console.log("Data saved")
                } catch (e) {
                    console.log('Issue with saving data')
                    setStatus("error");
                }
                console.log('Response succeeded!')
            } else {
                setStatus("error");
            }
        });

      };
      const classes = classNames(`relative w-full flex rounded font-heading text-md items-center h-2.5 px-1`);
      const classesArea = classNames(`relative w-full flex rounded font-heading text-md items-center h-5 px-1`);

    return <div className="space-y-1">

        {cta && <div>
            <h3 className="font-heading text-xl color-gray mb-1">Request an estimate</h3>
            <p className="font-body text-base text-neutral-1 mb-1">Fill in a simple form and a representative will be in touch within 24 hours</p>
            <Button
                size="default"
                style="primary" onClick={onCtaClick}>
                Request estimate
            </Button>
        </div>
        }

        {inputs &&
            <>
            {status === "success" ?
                <>
                    <h3 className="font-heading text-xl color-gray mb-1">Success!</h3>
                    <p className="font-body text-base text-neutral-1">Thanks for your submission</p>
                    </> : <>
                        <h3 className="font-heading text-xl color-gray mb-1">Request an estimate</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">First name</label>
                                <input type="text" className={classes} {...register('firstName')}/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Last name</label>
                                <input type="text" className={classes} {...register('lastName')}/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Email address</label>
                                <input type="email" className={classes} {...register('email')}/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Phone number</label>
                                <input type="text" className={classes} {...register('phone')}/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Post code</label>
                                <input type="text" className={classes} {...register('postCode')}/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Additional information</label>
                                <textarea className={classesArea} {...register('notes')} rows={6}/>
                            </div>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                {
                                    isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                            </div>
                            <ReCaptcha />
                            <Button
                                size="default"
                                style="primary"
                                >
                                Submit request
                            </Button>
                        </form></>}
                        </>
                }
    </div>
    ;
  }

  export default RequestEstimate;
