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

const appName = 'ウイルスフリッパー';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>遊び方</h1>
            <p>クリックすると床が白に、離すと黒になります。床とウイルスの色を反対にしてウイルスを弾き返そう！</p>

            <h1 className={utilStyles.headingLg}>ゲームモード</h1>
            <ul>
                <li>ノーマル - 60秒間でスコアを競う、ニコ生ゲーム仕様</li>
                <li>ハードコア - 1回のミスでゲームオーバーのエンドレスモード</li>
            </ul>

            <h1 className={utilStyles.headingLg}>音楽・効果音</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>ソースコード</h1>
            <p>{appName} は GitHub でソースコードを公開中です。</p>
            <Link href={'https://github.com/klikki-lab/virus_flipper'}>
                https://github.com/klikki-lab/virus_flipper
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} は次々とやってくるウイルスを弾き返すミニゲームです。`}
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/virus-flipper.png`,
                width: 96,
                height: 96,
            }} />

            <div className={styles.note}>
                <p><strong>🔊 ゲームを開始すると音声が流れます。</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/virus-flipper/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;