import React from 'react';
import { useRouter } from 'next/router';

export default function Professional() {
    const router = useRouter();
    const { slug, range } = router.query;
    // console.log(slug, range)

    return (
        <>
            Professional
        </>
    );
  }
