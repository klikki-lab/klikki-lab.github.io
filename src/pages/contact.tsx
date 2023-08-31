import React, { ReactElement } from 'react';
import Link from 'next/link';
import CommonLayout from '@/components/layout/commonLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { TitleHeader } from '@/components/header/titleHeader';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import { mailAddress } from '@/lib/constant';

const Contact: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <p className="text-center">Please send your comments and requests to this e-mail address.</p>
            <p className="text-center"><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>
        </>
    )
};

Contact.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead />
            <CommonLayout>
                <TitleHeader props={{
                    name: 'Contact',
                    path: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z",
                    color: "currentColor",
                    viewBox: "0 -960 960 960",
                    width: 96,
                    height: 96
                }} />

                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default Contact;