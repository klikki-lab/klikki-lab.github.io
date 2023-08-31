import { NextPageWithLayout } from "@/pages/_app";
import utilStyles from '@/styles/utils.module.css'
import styles from '@/components/layout/layout.module.css'
import { ReactElement } from "react";
import { TitleHeader } from "@/components/header/titleHeader";
import CommonLayout from "@/components/layout/commonLayout";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonHead from "@/components/head/commonHead";

const appName = 'BatteryNotify';

const BatterNotify: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: appName, src: '/images/battery_notify.png' }} />

            <main>
                <h1 className={utilStyles.headingLg}>About this app</h1>
                <p>
                    {appName} is an app for Android devices that displays battery level in the status bar.
                    <br />
                    There are no plans to update this app. Please understand.
                </p>

                <h1 className={utilStyles.headingLg}>Download</h1>
                <p>{appName} is available on Google Play. Free and no ads.</p>
                <a href='https://play.google.com/store/apps/details?id=com.klikki.lab.batterynotify&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                    target="_blank"
                    rel="noopener noreferrer">
                    <img className={styles.googlePlayBadge}
                        src='https://play.google.com/intl/ja/badges/static/images/badges/en_badge_web_generic.png'
                        alt='Get it on Google Play'
                        title='Download'
                    />
                </a>
            </main>
        </>
    )
};

BatterNotify.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title={appName} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter props={[
                { name: `${appName} Privacy Policy`, url: './battery_notify/privacy-policy' },
            ]} />
        </>
    )
};

export default BatterNotify;