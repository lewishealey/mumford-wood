import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Checkbox from "@components/Checkbox";
import Dialog from '@components/Dialog';
import Download from '@components/Download';
import fire from '@lib/firebase';
import classNames from 'classnames';

// https://dev.to/markdrew53/integrating-sendgrid-with-next-js-4f5m
// https://nextjs.org/blog/forms

export const RequestEstimate: React.FC = ({

}) => {
    const [status, setStatus] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const { asPath } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },

      } = useForm();

      const onSubmit = (data) => {
        data.page = asPath;

            try {
            fire.firestore()
            .collection('download-requests')
            .add(data);
            setStatus("success");

            } catch (e) {
                console.log('Issue with saving data')
                setStatus("error");
            }
      };
      const classes = classNames(`relative w-full flex rounded font-heading text-md items-center h-2.5 px-1`);
      const classesArea = classNames(`relative w-full flex rounded font-heading text-md items-center h-5 px-1`);

    return <div className="space-y-1">
        <div>
            <h3 className="font-heading text-xl color-gray mb-1">Download a brochure</h3>
            <p className="font-body text-base text-neutral-1 mb-1">Fill in a simple form and a representative will be in touch within 24 hours</p>
            <Button
                size="default"
                style="primary" onClick={() => setOpen(true)}>
                Download brochure
            </Button>
        </div>

        <Modal isOpen={isOpen}>
           <Dialog success={status === "success"} error={status === "error"} onCloseClick={() => setOpen(false)}>

            {status === "success" ?
                <>
                    <h3 className="font-heading text-xl color-gray mb-1">Success!</h3>
                    <p className="font-body text-base text-neutral-1">Thanks for your submission, please download below</p>

                    </> : <>
                        <h3 className="font-heading text-xl color-gray mb-1">Download brochure</h3>
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
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Postcode</label>
                                <input type="text" className={classes} {...register('postCode')}/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">What profession are you?</label>
                                <input type="text" className={classes} {...register('profession')}/>
                            </div>
                            <Checkbox id="information" checked={isSignedUp} name="info" label="I would like to receive more information by email" onChecked={() => setIsSignedUp(!isSignedUp)}/>

                            <Button
                                size="default"
                                style="primary"
                                >
                                Download
                            </Button>
                        </form></>}
           </Dialog>
        </Modal>
    </div>
    ;
  }

  export default RequestEstimate;

