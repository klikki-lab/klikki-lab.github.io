import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { TitleHeader } from "@/components/header/titleHeader";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonLayout from "@/components/layout/commonLayout";
import CommonHead from "@/components/head/commonHead";
import utilStyles from '@/styles/utils.module.css';
import { authorName, mailAddress } from "@/lib/constant";

const appName = 'BatteryNotify';

const PrivacyPolicyPage: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: appName, src: '/images/battery_notify.png' }} />

            <main>
                <h1 className={utilStyles.headingLg}>Privacy Policy</h1>

                <h2 className={utilStyles.headingMd}>Introduction</h2>
                <p>
                    {appName} (hereinafter referred to as this app) is an Android app created by {authorName} (hereinafter referred to as the developer).
                    This app does not collect<span className={utilStyles.cite}>[1]</span> any personal information of users.
                    As of August 2023, the developer has no plans to update this app. Please be advised.
                </p>
                <p className={utilStyles.cite} id="note-1">
                    [1] &quot;Collect&quot; means the transfer of data from a user&apos;s device to Developer itself or to a third parties.
                </p>

                <h2 className={utilStyles.headingMd}>About this policy</h2>
                <p>
                    This policy will be updated from time to time.
                </p>

                <h2 className={utilStyles.headingMd}>Disclaimer</h2>
                <p>
                    The developer is not responsible for any damages caused by this app.
                    Please understand.
                </p>

                <h2 className={utilStyles.headingMd}>Developer</h2>
                <p>{authorName}</p>
                <p><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>

                <h2 className={utilStyles.headingMd}>Update history</h2>
                <ul>
                    <li>Effective date: August 3, 2023</li>
                    <li>Last Updated: August 31, 2023 Proofreading and adding Japanese.</li>
                </ul>

            </main>
        </>
    )
};

PrivacyPolicyPage.getLayout = (page: ReactElement): JSX.Element => {
    const title = `${appName} Privacy Policy}`;
    return (
        <>
            <CommonHead title={title} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default PrivacyPolicyPage;