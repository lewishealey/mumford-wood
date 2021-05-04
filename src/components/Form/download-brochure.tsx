import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import Modal from '@components/Modal';
import Checkbox from "@components/Checkbox";
import Dialog from '@components/Dialog';
import Download from '@components/Download';
import fire from '@lib/firebase';
import classNames from 'classnames';
import moment from 'moment';
import BrochureContexts from '@utils/brochureContexts';

// https://dev.to/markdrew53/integrating-sendgrid-with-next-js-4f5m
// https://nextjs.org/blog/forms

const productBrochure = [
    {
        fields: {
            title: 'PDF',
            file: {
                url: 'https://assets.ctfassets.net/uefpddncbaai/5HVCETi4zp3S5xPXDMisCW/b8813ed0969757844fdba1e53475a14a/M_W_brochure.pdf',
                details: {
                    size: '3770000'
                }
            }
        }
    }
]

const commercialBrochure = [
    {
        fields: {
            title: 'PDF',
            file: {
                url: 'https://assets.ctfassets.net/uefpddncbaai/1yxf05PyO0MoLR1XeUHdwy/8f4ff7e1c18b51aba5fd31fce40de475/M_W-Commercial-Brochure',
                details: {
                    size: '3670000'
                }
            }
        }
    }
]

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
    const [status, setStatus] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const { asPath } = useRouter();
    const brochures = useContext(BrochureContexts);

    console.log(brochures);
    const {
        register,
        handleSubmit,
        formState: { errors },

      } = useForm();

      const onSubmit = (data) => {
        data.date = new Date();
        data.prettyDate = moment(new Date()).format('DD MMM YYYY hh:mm');
        data.page = asPath;

        fetch('/api/email/brochure-user', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        fetch('/api/email/brochure', {
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
                        .collection('download-requests')
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
            <h3 className="font-heading text-xl color-gray mb-1">Download a brochure</h3>
            <p className="font-body text-base text-neutral-1 mb-1">Fill in a simple form and a representative will be in touch within 24 hours</p>
            <Button
                size="default"
                style="primary" onClick={onCtaClick}>
                Download brochure
            </Button>
        </div>
        }

        {inputs &&
           <>
            {status === "success" &&
                <>
                    <h3 className="font-heading text-xl color-gray mb-1">Success!</h3>
                    <p className="font-body text-base text-neutral-1">Thanks for your submission, please download below</p>
                    <div className="flex column w-full flex-wrap border-gray-300 border rounded">
                            {brochures instanceof Array && brochures?.map((brochure, i) =>
                                <Download
                                key={i}
                                title={brochure?.name}
                                entity={"Downloads"}
                                user={fire.auth()}
                                files={brochure?.files}
                            />)}
                    </div>
                </>
            }

            {status === "error" &&
                <>
                    <h3 className="font-heading text-xl color-gray mb-1">Oops!</h3>
                    <p className="font-body text-base text-neutral-1">Something seems to have gone wrong when submitting your details, an admin has been notified.</p>
                </>
            }

            {status.length == 0 && <>
                        <h3 className="font-heading text-xl color-gray mb-1">Download brochure</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">First name</label>
                                <input type="text" className={classes} {...register('firstName')} required/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Last name</label>
                                <input type="text" className={classes} {...register('lastName')} required/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Email address</label>
                                <input type="email" className={classes} {...register('email')} required/>
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
           </>
        }
    </div>
    ;
  }

  export default RequestEstimate;

