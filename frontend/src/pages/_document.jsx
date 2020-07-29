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
                        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap"
                        rel="stylesheet"
                    />
                    <style>{`
                        html {
                            background-color: #7f5db4;
                        }
                        
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: Roboto Mono, monospace;
                            font-weight: 400;
                            height: 100vh;
                            overscroll-behavior: none;
                            background-repeat: no-repeat;
                            background: ${theme.backgroundGradient};
                            color: ${theme.text};
                        }

                        #page {
                            height: 100vh;
                            position: fixed;
                            overflow-y: scroll;
                        }

                        #page::-webkit-scrollbar {
                            display: none;
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

                        a:visited {
                            color: ${theme.text};
                        }

                        a {
                            color: ${theme.text}; 
                        }

                        @media (max-width: 72rem) {
                            #page {
                                margin-top: 48px;
                                height: calc(100% - 48px);
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
