import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "../theme";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto+Mono:500,300|Raleway:300&amp;display=swap"
                        rel="stylesheet"
                    />
                    <style>{`
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: ${theme.color.white};
                            color: ${theme.color.black};
                            font-family: Roboto Mono, monospace;
                            font-weight: 300;
                        }

                        * {
                            box-sizing: border-box;
                        }

                        h1, h2, h3, h4, h5 {
                            font-family: Roboto Mono, monospace;
                            font-weight: 500;
                        }

                        @media (max-width: 700px) {
                            body {
                                font-size: 0.8em;
                            }
                        }
                    `}</style>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-137706612-2"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-137706612-2');`,
                        }}
                    />
                </Head>
                <body className="body">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
