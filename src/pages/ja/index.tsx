import React, { ReactElement } from 'react';
import Link from 'next/link';
import CommonLayout from '@/components/layout/commonLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { TitleHeader } from '@/components/header/titleHeader';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import Products from './products';
import utilStyles from '@/styles/utils.module.css';
import { authorName } from '@/lib/constant';

const Home: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: authorName, src: '/images/profile.png' }} />
            <p className="text-center">ようこそ！</p>
            <main>
                <h2 className={utilStyles.headingLg}>
                    <Link href='/ja/products'>プロダクト</Link>
                </h2>
                <Products />
            </main>
        </>
    )
};

Home.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead description={`${authorName} のウェブサイトへようこそ！`}/>
            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter props={[
                { name: 'お問い合わせ', url: './ja/contact' },
                // { name: t("webSitePolicy.title"), url: t("webSitePolicy.url") }
            ]} />
        </>
    )
};

export default Home;