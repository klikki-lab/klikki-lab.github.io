import React, { ReactElement } from 'react';
import Link from 'next/link';
import { NextPageWithLayout } from '@/pages/_app';
import utilStyles from '@/styles/utils.module.css';
import CommonLayout from '@/components/layout/commonLayout';
import { CommonFooter } from '@/components/footer/commonFooter';
import Android from './android';
import CommonHead from '@/components/head/commonHead';
import GoogleChromeExtension from './google-chrome-extension';
import { TitleHeader } from '@/components/header/titleHeader';
import { authorName } from '@/lib/constant';

const DIRECTORY = "/products";

const Products: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <section>
                <h3 className={`${utilStyles.headingMd}`}>
                    <Link href={`${DIRECTORY}/android`}>Android</Link>
                </h3>
                <Android />
            </section>
            <section>
                <h3 className={`${utilStyles.headingMd}`}>
                    <Link href={`${DIRECTORY}/google-chrome-extension`}>Google Chrome Extension</Link>
                </h3>
                <GoogleChromeExtension />
            </section>
        </>
    )
};

Products.getLayout = (page: ReactElement): JSX.Element => {
    const products = 'Products';
    return (
        <>
            <CommonHead title={products} description={`Introducing ${authorName}'s ${products.toLowerCase()}.`} />

            <CommonLayout>
                <TitleHeader props={{
                    name: products.toUpperCase(),
                    path: "M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z",
                    color: "currentColor",
                    viewBox: "0 -960 960 960",
                    width: 96,
                    height: 96
                }} />

                {/* <h2 className={utilStyles.headingLg}>{title}</h2> */}
                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default Products;