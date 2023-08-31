import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { TitleHeader } from "@/components/header/titleHeader";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonLayout from "@/components/layout/commonLayout";
import CommonHead from "@/components/head/commonHead";
import utilStyles from '@/styles/utils.module.css'
import { authorName, mailAddress } from "@/lib/constant";

const appName = 'BatteryNotify';

const PrivacyPolicyPage: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: appName, src: '/images/battery_notify.png' }} />

            <main>
                <h1 className={utilStyles.headingLg}>プライバシーポリシー</h1>

                <h2 className={utilStyles.headingMd}>はじめに</h2>
                <p>
                    {appName} (以下、当アプリといいます) は、{authorName} (以下、開発者といいます) によって作成された Android アプリです。
                    当アプリはユーザーの個人情報を収集<span className={utilStyles.cite}>[1]</span> しません。
                    2023年8月現在、開発者は当アプリを更新する予定はありません。ご承知おき下さい。
                </p>
                <p className={utilStyles.cite} id="note-1">
                    [1] 「収集」とは、ユーザーのデバイスから、開発者自身または第三者にデータを転送することです。
                </p>

                <h2 className={utilStyles.headingMd}>このポリシーについて</h2>
                <p>
                    このポリシーは適宜変更されます。
                </p>

                <h2 className={utilStyles.headingMd}>免責事項</h2>
                <p>
                    当アプリによって生じたいかなる損害についても開発者は責任を負いません。ご了承ください。
                </p>

                <h2 className={utilStyles.headingMd}>開発者情報</h2>
                <p>{authorName}</p>
                <p><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>

                <h2 className={utilStyles.headingMd}>更新履歴</h2>
                <ul>
                    <li>発効日: 2023年8月3日</li>
                    <li>更新日: 2023年8月27日 文章の校正と日本語の追加。</li>
                </ul>

            </main>
        </>
    )
};

PrivacyPolicyPage.getLayout = (page: ReactElement): JSX.Element => {
    const title = `${appName} プライバシーポリシー`;
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