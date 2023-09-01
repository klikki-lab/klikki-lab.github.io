import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import { Product } from '@/components/product/product';
import CommonLayout from '@/components/layout/commonLayout';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import { TitleHeader } from '@/components/header/titleHeader';

const ANDROID = "android";
const DIRECTORY = "/images";

const Android: NextPageWithLayout = (): JSX.Element => {
    const appNames = ["Battery_Notify", "Piconica"] as const;
    return (
        <div className='row justify-content'>
            {appNames.map(appName => {
                return (
                    <div className='col-auto' key={appName}>
                        <Product
                            props={{
                                platform: ANDROID,
                                name: appName,
                                src: `${DIRECTORY}/${appName.toLowerCase()}.png`
                            }} />
                    </div>
                )
            })}
        </div>
    )
};

Android.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title='Android' description='Introducing Android apps.' />

            <CommonLayout>
                <TitleHeader props={{
                    name: ANDROID.toLocaleUpperCase(),
                    path: "M2.76 3.061a.5.5 0 0 1 .679.2l1.283 2.352A8.94 8.94 0 0 1 8 5a8.94 8.94 0 0 1 3.278.613l1.283-2.352a.5.5 0 1 1 .878.478l-1.252 2.295C14.475 7.266 16 9.477 16 12H0c0-2.523 1.525-4.734 3.813-5.966L2.56 3.74a.5.5 0 0 1 .2-.678ZM5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
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

export default Android;