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
                        html {
                            background-repeat: no-repeat;
                            background-color: ${theme.color.white};
                            color: ${theme.color.black};
                            /*background: linear-gradient(45deg, rgba(181,0,255,1) 29%, rgba(255,0,0,1) 100%);
                            color: #2b282d;*/
                        }
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Roboto Mono, monospace;
                            font-weight: 300;
                            height: 100vh;
                        }

                        #clip {
                            height: 100vh;
                            position: fixed;
                            overflow: scroll;
                        }

                        * {
                            box-sizing: border-box;
                        }

                        h1, h2, h3, h4, h5 {
                            font-family: Roboto Mono, monospace;
                            font-weight: 500;
                        }

                        p {
                            margin: 0.5em 0 0 0;
                        }

                        @media (max-width: 72rem) {
                            #clip {
                                margin-top: 48px;
                            }
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
                            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments)}
        gtag("js", new Date());
        gtag("config", "UA-137706612-2");
    `,
                        }}
                    ></script>
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
