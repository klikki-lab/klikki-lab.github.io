import Link from "next/link";
import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { TitleHeader } from "@/components/header/titleHeader";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonLayout from "@/components/layout/commonLayout";
import CommonHead from "@/components/head/commonHead";
import utilStyles from '@/styles/utils.module.css';
import { authorName, mailAddress } from "@/lib/constant";

const appName = 'Piconica / ピコニカ';

const PrivacyPolicyPage: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: appName, src: '/images/piconica.png' }} />

            <main>
                <h1 className={utilStyles.headingLg}>プライバシーポリシー</h1>

                <h2 className={utilStyles.headingMd}>はじめに</h2>
                <p>
                    {appName}（以下、当アプリ）は {authorName}（以下、開発者）が制作した Android 用アプリです。
                    当アプリはユーザーの個人情報の収集<span className={utilStyles.cite}>[1]</span>  を一切行っていません。しかしながら、当アプリがリクエストする権限の中には一時的にユーザーデータが使用されるものがあります。
                    このプライバシーポリシーは、ユーザーが当アプリを使用する際、当アプリがリクエストする権限について理解してもらうためのものです。
                </p>
                <p className={utilStyles.cite} id="note-1">
                    [1] 「収集」とは、ユーザーのデバイスから、開発者自身または第三者にデータを転送することです。
                </p>

                <h2 className={utilStyles.headingMd}>Piconica がリクエストする権限</h2>
                <p>
                    当アプリがリクエストする主要な権限は、ストレージへのアクセス権限と Bluetooth へのアクセス権限です。
                    これらの権限の中にはユーザーデータを一時的に処理<span className={utilStyles.cite}>[2]</span>  するものがあります。
                    当アプリではファイルの読み込みと Bluetooth デバイスの検出で一時的な処理を行っています。
                </p>
                <p className={utilStyles.cite} id="note-2">
                    [2] 「一時的に処理」とは、データはメモリにのみ保存され、対象のリクエストにリアルタイムで対応するのに必要な期間を超えて保持されることがなく、他の目的には使用されないことです。
                </p>

                <h2 className={utilStyles.headingMd}>ストレージのアクセス権限について</h2>
                <p>
                    Android 9 以下のデバイスの場合、録音とファイル操作に「ストレージの書き込み権限」の許可が必要です。
                    これに加え、録音ファイルの読み込みには「ストレージの読み込み権限」の許可が必要です。
                    ユーザーによってこれらの権限が許可されると、ストレージ上のユーザーデータから当アプリで作成した録音ファイルの読み込みが可能となり、そして録音とファイル操作の機能をユーザーに提供することが可能になります。
                    <br />
                    Android 10 以上のデバイスで Piconica バージョン 4.0 以上を使用している場合、原則としてストレージへのアクセス権限は不要です。
                    ただし、以下のようなケースでは当アプリは録音ファイルにアクセスできなくなるため、限定的なアクセス権限が必要となります。
                </p>
                <ul className={utilStyles.list}>
                    <li key={1}>Piconica バージョン 3.1.1 以下からアップデートした場合（録音処理の変更のため）</li>
                    <li key={2}>アンインストール後に再インストールした場合（システムによるアプリとファイルの紐付けが解除されるため）</li>
                </ul>
                <p>
                    以前の録音ファイルに再びアクセスするためには「ファイルとメディアの権限」の「メディアへのアクセスのみを許可」が必要です。
                    ユーザーによってこの権限が許可されると、紐付けが解除された録音ファイルの読み込みが可能になります。
                    録音とファイル操作に権限は必要ありませんが、一度でも紐付けが解除された録音ファイルの変更操作（名前の変更等）には、ユーザーへ同意の確認を行います。
                    いずれの場合でも、ストレージ上のユーザーデータは、当アプリで作成したファイルの読み込みのためにのみ一時的に処理されます。
                </p>

                <h2 className={utilStyles.headingMd}>Bluetooth のアクセス権限について</h2>
                <p>
                    Android  11 以下のデバイスの場合、Bluetooth デバイスの検出に「位置情報の権限」の許可が必要です。
                    ユーザーによってこの権限が許可されると Bluetooth デバイスの検出が可能になります。
                    位置情報は Bluetooth デバイスの検出のためにのみ一時的に処理されます。
                    <br />
                    当アプリに位置情報の権限の許可を与えたくない場合は、Android デバイスと Bluetooth (BLE) デバイスをあらかじめペアリングしておくと検出を行う必要はありません。
                    当アプリはペアリング済みのデバイスを優先的に表示します。
                </p>

                <h2 className={utilStyles.headingMd}>ユーザーの権利</h2>
                <p>
                    当アプリを使用して作られた録音ファイルは、第三者の著作権を侵害しないかぎり、それはユーザーの著作物です。
                    当アプリの開発者へ使用の許可を求める必要はありません。
                </p>

                <h2 className={utilStyles.headingMd}>メールの規約</h2>
                <p>
                    ユーザーから送られてきたメールは Gmail のサーバー上に保管されます。
                    このメールは法令もしくは公序良俗に反しないかぎり、本人の許可無く第三者に開示・譲渡されることはありません。
                </p>

                <h2 className={utilStyles.headingMd}>このポリシーについて</h2>
                <p>
                    このポリシーは適宜変更されます。
                    しかしながら、開発者はユーザーが Android デバイス内の個人情報の安全性に対し危惧する気持ちを理解します。
                    必要最小限の権限を必要な場面でのみリクエストするよう心がけていく所存です。
                </p>

                <h2 className={utilStyles.headingMd}>免責事項</h2>
                <p>
                    開発者は当アプリの品質向上に努力する所存ですが、すべての Android ユーザーに満足していただけるとはかぎりませんのでご了承ください。
                    また、当アプリによって生じた損害等の一切の責任を負いかねます。重ねてご了承ください。
                </p>

                <h2 className={utilStyles.headingMd}>開発者情報</h2>
                <p>{authorName}</p>
                <p><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>
                <p>発効日: 2022年3月12日</p>

            </main>
        </>
    )
};

PrivacyPolicyPage.getLayout = (page: ReactElement): JSX.Element => {
    const title = `${appName} プライバシーポリシー`
    return (
        <>
            <CommonHead title={title} image='piconica_playstore.png' description={`${appName} のプライバシーポリシーです。`} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default PrivacyPolicyPage;