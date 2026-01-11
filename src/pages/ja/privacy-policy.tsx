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
                <h1 className={utilStyles.headingLg}>はじめに</h1>
                <p>本プライバシーポリシーは、Klikki Lab&apos;s ウェブサイト（以下、当サイト）における、利用者の情報の取り扱いについて説明するものです。</p>

                <h2 className={utilStyles.headingMd}>1. 個人情報の取得について</h2>
                <p>
                    当サイトでは、通常の閲覧において、利用者の個人情報を取得しておりません。<br />
                    利用者が任意で運営者のメールアドレス宛に直接ご連絡いただいた場合に限り、
                    メールアドレスおよびお問い合わせ内容を取得することがあります。
                </p>

                <h2 className={utilStyles.headingMd}>2. 個人情報の利用目的</h2>
                <p>
                    利用者から直接ご連絡いただいたメールに含まれる個人情報は、
                    お問い合わせへの回答および必要な連絡のためにのみ利用し、
                    これらの目的以外で利用することはありません。<br />
                    また、取得したメールは法令もしくは公序良俗に反しない限り、
                    本人の許可無く第三者に開示・譲渡されることはありません。
                </p>

                <h2 className={utilStyles.headingMd}>3. Cookie について</h2>
                <p>
                    当サイトでは、Cookie を使用しておりません。
                    そのため、利用者のブラウザに情報を保存したり、行動を追跡したりすることはありません。
                </p>

                <h2 className={utilStyles.headingMd}>4. アクセス解析ツールについて</h2>
                <p>
                    当サイトでは、Google Analytics 等のアクセス解析ツールを使用しておりません。
                </p>

                <h2 className={utilStyles.headingMd}>5. 広告配信について</h2>
                <p>
                    当サイトでは、第三者配信の広告サービスを利用しておらず、利用者の興味・関心に基づいた広告配信も行っておりません。
                </p>

                <h2 className={utilStyles.headingMd}>6. このポリシーについて</h2>
                <p>
                    当サイトの内容変更等に伴い、本プライバシーポリシーを予告なく変更する場合があります。
                    変更後のプライバシーポリシーは、本ページに掲載された時点で有効となります。
                </p>

                <h2 className={utilStyles.headingMd}>運営者情報</h2>
                <p>{authorName}</p>
                <p><Link href={`mailto:${mailAddress}`}>{mailAddress}</Link></p>
                <p>発効日: 2026年1月11日</p>

            </main>
        </>
    )
};

PrivacyPolicy.getLayout = (page: ReactElement): JSX.Element => {
    return (
        <>
            <CommonHead title='プライバシーポリシー' description='当サイトのプライバシーポリシーのページです。' />
            <CommonLayout>
                <TitleHeader props={{
                    name: 'プライバシーポリシー',
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