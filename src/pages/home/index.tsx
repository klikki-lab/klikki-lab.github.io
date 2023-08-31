import { NextPageWithLayout } from "@/pages/_app";
import { authorName } from '@/lib/constant';
import { TitleHeader } from "@/components/header/titleHeader";
import Link from "next/link";
import { ReactElement } from "react";
import CommonHead from "@/components/head/commonHead";
import CommonLayout from "@/components/layout/commonLayout";
import { CommonFooter } from "@/components/footer/commonFooter";

const PiconicaPrivacyPolicy: NextPageWithLayout = () => {
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

PiconicaPrivacyPolicy.getLayout = (page: ReactElement): React.ReactNode => {
    return (
        <>
            <CommonHead />
            <CommonLayout>
                {page}
            </CommonLayout>

            <CommonFooter />
        </>
    )
};

export default PiconicaPrivacyPolicy;