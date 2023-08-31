import { NextPageWithLayout } from "@/pages/_app";
import { authorName } from '@/lib/constant';
import { TitleHeader } from "@/components/header/titleHeader";
import Link from "next/link";
import { ReactElement } from "react";
import CommonHead from "@/components/head/commonHead";
import { CommonFooter } from "@/components/footer/commonFooter";
import headerStyles from '@/components/header/header.module.css';
import layoutStyles from '@/components/layout/layout.module.css';

const PiconicaPrivacyPolicy: NextPageWithLayout = (): JSX.Element => {
    return (
        <>
            <TitleHeader props={{ name: authorName, src: '/images/profile.png' }} />
            <main>
                <p className="text-center">Sorry, page has been moved.</p>
                <p className="text-center">
                    -&gt; <Link href='/'>Back to home</Link>
                </p>
            </main>
        </>
    )
};

PiconicaPrivacyPolicy.getLayout = (page: ReactElement): JSX.Element => {
    const size = 32;
    return (
        <>
            <CommonHead />
            <header className={headerStyles.header}>
                <nav className={headerStyles.brand} aria-label='brand'>
                    <Link href='/' title='Back to home'>
                        <img
                            src="/images/profile.png"
                            width={size}
                            height={size}
                            alt={authorName}
                        />
                        <span>{authorName}</span>
                    </Link>
                </nav>
            </header >
            <div className={layoutStyles.container}>
                {page}
            </div>

            <CommonFooter />
        </>
    )
};

export default PiconicaPrivacyPolicy;