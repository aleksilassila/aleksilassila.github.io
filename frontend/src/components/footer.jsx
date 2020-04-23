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
                padding: 1vh 8vw;

                font-size: 0.8em;
                color: ${theme.color.black}80;

                display: flex;
                justify-content: space-between;
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
