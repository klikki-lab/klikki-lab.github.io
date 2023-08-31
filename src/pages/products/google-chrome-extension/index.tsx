import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Product } from '@/components/product/product';
import CommonLayout from '@/components/layout/commonLayout';
import { CommonFooter } from '@/components/footer/commonFooter';
import { TitleHeader } from '@/components/header/titleHeader';
import CommonHead from '@/components/head/commonHead';

const GOOGLE_CHROME_EXTENSION = "google-chrome-extension";

const GoogleChromeExtension: NextPageWithLayout = (): JSX.Element => {
    const appName = 'Linkify';
    return (
        <div className='row justify-content'>
            <div className='col-auto' key={appName}>
                <Product props={{
                    platform: `${GOOGLE_CHROME_EXTENSION}`,
                    name: appName,
                    path: "M468 816q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480 416q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650 825l-50 151-120-400 400 120-151 50 171 171-79 79Z",
                    color: "#2196F3",
                    viewBox: "0 96 960 960",
                }} />
            </div>
        </div>
    )
};

GoogleChromeExtension.getLayout = (page: ReactElement): JSX.Element => {
    const title = GOOGLE_CHROME_EXTENSION.replaceAll('-', ' ').toUpperCase();
    return (
        <>
            <CommonHead title={title} />

            <CommonLayout>
                <TitleHeader props={{
                    name: title,
                    path: "M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
                    color: "currentColor",
                    viewBox: "0 0 16 16",
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

export default GoogleChromeExtension;