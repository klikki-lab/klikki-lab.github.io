import React, { ReactElement } from 'react';
import Link from 'next/link';
import CommonLayout from '@/components/layout/commonLayout';
import { NextPageWithLayout } from '@/pages/_app';
import { TitleHeader } from '@/components/header/titleHeader';
import { CommonFooter } from '@/components/footer/commonFooter';
import CommonHead from '@/components/head/commonHead';
import { authorName, mailAddress } from '@/lib/constant';
import utilStyles from '@/styles/utils.module.css';

const PrivacyPolicy: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <main>
                <h1 className={utilStyles.headingLg}>Introduction</h1>
                <p>This Privacy Policy explains how information is handled on Klikki Lab's Website (hereinafter referred to as “this Site”).</p>

                <h2 className={utilStyles.headingMd}>1. Collection of Personal Information</h2>
                <p>
                    This Site does not collect any personal information during normal browsing.<br />
                    However, if a user voluntarily contacts the site operator directly via the provided email address, the user's email address and the content of the inquiry may be collected.
                </p>

                <h2 className={utilStyles.headingMd}>2. Purpose of Use of Personal Information</h2>
                <p>
                    Personal information included in emails sent directly by users will be used solely for the purpose of responding to inquiries and for necessary communication.
                    Such information will not be used for any other purposes.<br />
                    In addition, collected emails and personal information will not be disclosed or transferred to third parties without the user's consent, except where required by law or where permitted by public order and morals.
                </p>

                <h2 className={utilStyles.headingMd}>3. Cookies</h2>
                <p>
                    This Site does not use cookies.
                    Accordingly, no information is stored in the user's browser, and no tracking of user behavior is performed.
                </p>

                <h2 className={utilStyles.headingMd}>4. Access Analytics Tools</h2>
                <p>
                    This Site does not use access analytics tools, such as Google Analytics.
                </p>

                <h2 className={utilStyles.headingMd}>5. Advertising</h2>
                <p>
                    This Site does not use third-party advertising services and does not deliver advertisements based on users' interests or behavior.
                </p>

                <h2 className={utilStyles.headingMd}>6. Changes to This Policy</h2>
                <p>
                    This Privacy Policy may be changed without prior notice due to updates to the content of this Site.
                    The revised Privacy Policy shall take effect upon being published on this page.
                </p>

                <h2 className={utilStyles.headingMd}>Operator Information</h2>
                <p>{authorName}</p>
                <p><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>
                <p>Effective Date: January 11, 2026</p>

            </main>
        </>
    )
};

PrivacyPolicy.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title='Privacy Policy' description='This is privacy policy page.' />
            <CommonLayout>
                <TitleHeader props={{
                    name: 'Privacy Policy',
                    path: "M480-480Zm0 400q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 10-.5 20t-1.5 20q-9-2-18.5-3t-19.5-1q-11 0-21 1t-21 3q1-10 1.5-19.5t.5-20.5v-189l-240-90-240 90v189q0 121 68 220t172 132q21-7 41-17t39-23v94q-19 10-39 17.5T480-80Zm194 0q-14 0-24-10t-10-24v-132q0-14 10-24t24-10h6v-40q0-33 23.5-56.5T760-400q33 0 56.5 23.5T840-320v40h6q14 0 24 10t10 24v132q0 14-10 24t-24 10H674Zm46-200h80v-40q0-17-11.5-28.5T760-360q-17 0-28.5 11.5T720-320v40Z",
                    color: "currentColor",
                    viewBox: "0 -960 960 960",
                    width: 96,
                    height: 96
                }} />

                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default PrivacyPolicy;