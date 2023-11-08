import { NextPageWithLayout } from "@/pages/_app";
import utilStyles from '@/styles/utils.module.css'
import styles from '@/components/layout/layout.module.css'
import { ReactElement } from "react";
import { TitleHeader } from "@/components/header/titleHeader";
import CommonLayout from "@/components/layout/commonLayout";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonHead from "@/components/head/commonHead";

const appName = 'BatteryNotify';

const BatteryNotify: NextPageWithLayout = (): JSX.Element => {
    return (
        <main>
            <TitleHeader props={{ name: appName, src: '/images/battery_notify.png' }} />

            <h1 className={utilStyles.headingLg}>このアプリについて</h1>
            <p>
                バッテリー残量をステータスバーに表示する Android デバイス向けのアプリです。
                <br />
                このアプリはアップデートを行う予定はありません。ご了承ください。
            </p>

            <h1 className={utilStyles.headingLg}>ダウンロード</h1>
            <p>{appName} は Google Play で入手できます。無料で広告もありません。</p>
            <a href='https://play.google.com/store/apps/details?id=com.klikki.lab.batterynotify&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
                target="_blank"
                rel="noopener noreferrer">
                <img className={styles.googlePlayBadge}
                    src='https://play.google.com/intl/ja/badges/static/images/badges/ja_badge_web_generic.png'
                    alt='Google Play で手に入れよう'
                    title='ダウンロード'
                />
            </a>
        </main>
    )
};

BatteryNotify.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title={appName} image='battery_notify.png' description={`${appName} のご紹介。`} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter props={[
                { name: `${appName} プライバシーポリシー`, url: './battery_notify/privacy-policy' },
            ]} />
        </>
    )
};

export default BatteryNotify;