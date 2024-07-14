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

const appName = 'メテオパニック';

const MeteorPanic: NextPageWithLayout = () => {
    return (
        <main>
            <h1 className={utilStyles.headingLg}>遊び方</h1>
            <p>
                クリック（タッチ）した位置にミサイルを発射してインセキを破壊しよう。<br />
                基地は3基、ミサイルは各基地に10発ずつ配備されています。<br />
                インセキが基地にぶつかると基地が破壊されます。
                すべての基地が破壊されるか、ミサイルが底をつくと次のウェーブまで行動できません。<br />
                ウェーブ終了時には破壊された基地の修復とミサイルの補充が行われます。
            </p>

            <h1 className={utilStyles.headingLg}>基本テクニック</h1>
            <ul>
                <li>インセキの軌道を先読みしてやや前方にミサイルを撃つのが基本です（偏差射撃）。</li>
                <li>ミサイルは着弾地点で爆発し、爆風を起こします。ミサイルを直撃させるよりも爆風でインセキを誘爆させるほうが簡単です。</li>
                <li>いちどの爆風でたくさんのインセキを巻き込めば高得点が狙えます。</li>
                <li>UFO を倒すとミサイルの弾速と爆風範囲が上昇します。</li>
            </ul>

            <h1 className={utilStyles.headingLg}>高等テクニック</h1>
            <ul>
                <li>インセキにミサイルを直撃させると通常よりも爆風範囲が広がります。</li>
            </ul>

            <h1 className={utilStyles.headingLg}>音楽・効果音</h1>
            <p>(C)PANICPUMPKIN</p>
            <Link href={'https://pansound.com/panicpumpkin/'}>
                https://pansound.com/panicpumpkin/
            </Link>

            <h1 className={utilStyles.headingLg}>ソースコード</h1>
            <p>{appName} は GitHub でソースコードを公開中です。</p>
            <Link href={'https://github.com/klikki-lab/meteor_panic'}>
                https://github.com/klikki-lab/meteor_panic
            </Link>

        </main>
    )
};

MeteorPanic.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead
                title={appName}
                description={`${appName} は Akashic Engine を使用したニコ生ゲームです。`}
            />

            <CommonHeader />
            <div className={styles.game_breadcrumbs}>
                <Breadcrumbs />
            </div>

            <TitleHeader props={{
                name: appName,
                src: `/images/akashic-engine/meteor-panic.png`
            }} />

            <div className={styles.note}>
                <p><strong>🔊 ゲームを開始すると音声が流れます。</strong></p>
            </div>

            <div className={styles.game_container}>
                <iframe
                    className={styles.game}
                    id={appName}
                    title={appName}
                    src='/games/meteor-panic/index.html' />
            </div>

            <div className={styles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default MeteorPanic;