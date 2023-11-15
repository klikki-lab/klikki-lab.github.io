import { ReactElement } from "react";
import { NextPageWithLayout } from "@/pages/_app";
import { TitleHeader } from "@/components/header/titleHeader";
import CommonLayout from "@/components/layout/commonLayout";
import { CommonFooter } from "@/components/footer/commonFooter";
import CommonHead from "@/components/head/commonHead";
import utilStyles from '@/styles/utils.module.css';
import styles from '@/components/layout/layout.module.css';

const appName = 'Piconica';

const Piconica: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: appName, src: '/images/piconica.png' }} />
            <main>
                <h1 className={utilStyles.headingLg}>About this app</h1>
                <p>
                    {appName} is an app for Android devices that can play 8-bit sounds.
                    It is a very simple synth app with a minimal UI so that anyone can quickly and intuitively operate it.
                    You can record your performance and edit some waveforms.
                    It also supports MIDI keyboards.
                    If you have a MIDI keyboard, you may enjoy this app even more.
                </p>
                <iframe
                    className={styles.youtube}
                    src="https://www.youtube-nocookie.com/embed/bYhODk0nrCU"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>

                <h1 className={utilStyles.headingLg}>Test devices</h1>
                <ul>
                    <li>Pixel 7</li>
                    <li>Nexus 7</li>
                    <li>KORG microKEY Air-25</li>
                </ul>

                <h1 className={utilStyles.headingLg}>Download</h1>
                <p>{appName} is available on Google Play. Free and no ads. The developer is not involved with and does not recommend the app distributed outside of Google Play.</p>
                <a href='https://play.google.com/store/apps/details?id=com.klikki.lab.picopico&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'
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

Piconica.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title={appName} image='piconica.png' description={`Introducing the ${appName} app.`} />

            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter props={[
                { name: `${appName} Privacy Policy`, url: './piconica/privacy-policy' },
            ]} />
        </>
    )
};

export default Piconica;