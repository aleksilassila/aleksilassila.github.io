import theme from "../theme";

const Footer = ({ children, ...rest }) => (
    <div className="footer-wrapper" {...rest}>
        <div className="footer">{children}</div>
        <style jsx>{`
            .footer-wrapper {
                padding-left: 25vw;
            }

            .footer {
                width: 100%;
                height: 100%;
                padding: 2vh 8vw;

                font-size: 0.8em;
                opacity: 0.7;

                display: flex;
                justify-content: space-between;

                font-weight: 500;
            }

            @media (max-width: 72rem) {
                .footer-wrapper {
                    padding-left: 0;
                }
            }
        `}</style>
    </div>
);

export default Footer;
