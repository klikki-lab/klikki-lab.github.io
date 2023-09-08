import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { TitleHeader } from "@/components/header/titleHeader";
import CommonLayout from "@/components/layout/commonLayout";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonHead from "@/components/head/commonHead";
import utilStyles from '@/styles/utils.module.css'
import styles from '@/components/layout/layout.module.css'

const appName = 'Piconica / ピコニカ';

const Piconica: NextPageWithLayout = (): JSX.Element => {
    return (
        <main>
            <TitleHeader props={{ name: appName, src: '/images/piconica.png' }} />

            <h1 className={utilStyles.headingLg}>このアプリについて</h1>
            <p>
                Piconica は 8 ビット ピコピコ サウンドで演奏できる Android デバイス向けのアプリです。 最小限の UI で誰でも素早く直感的に操作できる、シンプルで軽量なシンセ アプリです。 演奏を録音したり、一部の波形を編集することができます。 MIDI キーボードにも対応しています。 もしあなたが MIDI キーボードをお持ちであれば、このアプリをさらに楽しむことができるかもしれません。
            </p>
            <iframe
                className={styles.youtube}
                src="https://www.youtube-nocookie.com/embed/bYhODk0nrCU"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>

            <h1 className={utilStyles.headingLg}>テスト機材</h1>
            <ul>
                <li>Pixel 7</li>
                <li>Nexus 7</li>
                <li>KORG microKEY Air-25</li>
            </ul>

            <h1 className={utilStyles.headingLg}>ダウンロード</h1>
            <p>Piconica は Google Play で入手できます。無料で広告もありません。</p>
            <a href='https://play.google.com/store/apps/details?id=com.klikki.lab.picopico&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
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

Piconica.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title={appName} description={`${appName} のご紹介。`} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter props={[
                { name: 'Piconica プライバシーポリシー', url: './piconica/privacy-policy' },
            ]} />
        </>
    )
};

export default Piconica;