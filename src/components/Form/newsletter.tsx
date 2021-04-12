import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import { useRouter } from 'next/router';
import ReCaptcha from '@components/ReCaptcha';
import fire from '@lib/firebase';
import classNames from 'classnames';

// https://dev.to/markdrew53/integrating-sendgrid-with-next-js-4f5m
// https://nextjs.org/blog/forms

export const Newsletter: React.FC = ({

}) => {
    const [status, setStatus] = useState("");
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
            .collection('newsletter-signups')
            .add(data);
            setStatus("success");

            } catch (e) {
                console.log('Issue with saving data')
                setStatus("error");
            }
      };
      const classes = classNames(`relative w-full flex rounded font-heading text-md items-center h-2.5 px-1`);

    return <div className="space-y-1">
            {status === "success" ?
                <>
                    <h3 className="font-heading text-xl color-gray mb-1">Success!</h3>
                    <p className="font-body text-base text-neutral-1">Thanks for your submission</p>
                    </> : <>
                        <h5 className="font-heading text-xl mb-1">Sign up to our newsletter</h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 items-start">
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Full name</label>
                                <input type="text" className={classes} {...register('firstName')} required/>
                            </div>
                            <div className="TextField__group w-full">
                                <label className="relative flex rounded font-heading text-md items-center mb-0.25">Email address</label>
                                <input type="email" className={classes} {...register('email')} required/>
                            </div>
                            <ReCaptcha />
                            <Button
                                size="default"
                                style="primary"
                                >
                                Signup
                            </Button>
                        </form></>}
    </div>
    ;
  }

  export default Newsletter;
