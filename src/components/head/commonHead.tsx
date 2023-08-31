import Head from 'next/head';
import { useRouter } from 'next/router';
import { authorName } from '@/lib/constant'

type HeadProps = {
    readonly title?: string
    readonly thumbnailUrl?: string
    readonly description?: string
};

const CommonHead = ({ title, thumbnailUrl, description }: HeadProps): JSX.Element => {
    const domainName = "http://www.klikki-lab.com";
    const { pathname } = useRouter();
    const metaTitle = title ? `${title} - ${authorName}` : authorName;
    const metaThumbnailUrl = thumbnailUrl ?? `${domainName}/images/profile.png`;
    const metaDescription = description ?? `${authorName}'s website`;
    return (
        <Head>
            <title>{metaTitle}</title>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:image" content={metaThumbnailUrl} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={`${domainName}${pathname}`} />
            <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        </Head>
    )
};

export default CommonHead;