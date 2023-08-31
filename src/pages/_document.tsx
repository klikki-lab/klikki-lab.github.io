import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = {};

class Document extends NextDocument<Props> {

    render() {
        const currentLocale = this.props.__NEXT_DATA__.locale ?? 'en'
        return (
            <Html lang={currentLocale} dir="ltr">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                    <link rel="manifest" href="/favicons/site.webmanifest" />
                    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossOrigin="anonymous"></script>
                </body>
            </Html>
        )
    }
}

export default Document