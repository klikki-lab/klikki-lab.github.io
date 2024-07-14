import { ReactElement } from 'react';
import { NextPageWithLayout } from '@/pages/_app';
import utilStyles from '@/styles/utils.module.css'
import { TitleHeader } from '@/components/header/titleHeader';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import Link from 'next/link';
import styles from '@/components/layout/layout.module.css';
import { CommonHeader } from '@/components/header/commonHeader';
import Breadcrumbs from '@/components/header/breadcrumbs';

const appName = '早弁チャレンジ';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>遊び方</h1>
            <p>
                先生の目を盗んで早弁だ！見つかったら説教されるぞ！
                画面をクリック中は早弁します。時々先生が振り返るので気をつけよう！
            </p>

            <h1 className={utilStyles.headingLg}>基本テクニック</h1>
            <ul>
                <li>先生が生徒側に振り返る直前には必ずメガネがズレます。見逃すな！でもまれにフェイクもあるぞ！</li>
                <li>先生が黒板側に振り返るとき、まれにフェイントします。要注意だ！</li>
            </ul>

            <h1 className={utilStyles.headingLg}>音楽・効果音</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>ソースコード</h1>
            <p>{appName} は GitHub でソースコードを公開中です。</p>
            <Link href={'https://github.com/klikki-lab/bento_challenge'}>
                https://github.com/klikki-lab/bento_challenge
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} は Akashic Engine を使用したゲームです。`}
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/hayaben-challenge.png`
            }} />

            <div className={styles.note}>
                <p><strong>🔊 ゲームを開始すると音声が流れます。</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/hayaben-challenge/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;