import theme from "../theme";
import Selected from "../components/selected";

const Panel = ({ page, disableNav }) => {
    const listIems = page.props.children.map((item) => {
        if (item.props.panelitem) {
            return (
                <div key={item.props.id}>
                    <li
                        onClick={() =>
                            document
                                .getElementById(item.props.id)
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        <Selected elementId={item.props.id} />
                        {item.props.paneltext
                            ? item.props.paneltext
                            : item.props.id.charAt(0).toUpperCase() +
                              item.props.id.slice(1)}
                    </li>
                    <style jsx>
                        {`
                            li {
                                margin: 1rem 0;
                                display: flex;
                                align-items: center;
                                cursor: pointer;
                                font-weight: 400;
                            }

                            @media (max-width: 72rem) {
                                li {
                                    padding: 0;
                                    margin: 0 1rem;
                                }
                            }
                        `}
                    </style>
                </div>
            );
        }
    });

    return (
        <div id="panel">
            <h2>Aleksi Lassila</h2>
            <ul>{listIems}</ul>
            <div
                role="button"
                onClick={() => window.open("http://github.com/aleksilassila")}
                id="octocat"
            />
            <style jsx>{`
                #panel {
                    width: 25vw;
                    min-width: 18rem;
                    height: 100vh;
                    padding-top: 10vh;
                    border-right: 1px solid ${theme.color.black}33;
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    z-index: 2;
                }

                h2 {
                    padding: 0;
                    margin: 0;
                    padding-left: 15%;
                    font-size: 1.5rem;
                }

                ul {
                    margin-top: 30vh;
                    list-style: none;
                    padding-left: 15%;
                    display: ${disableNav ? "none" : "block"};
                }

                #octocat {
                    background-image: url("../static/GitHub-Mark-64px.png");
                    background-size: cover;
                    background-position: center;
                    width: 2rem;
                    height: 2rem;

                    cursor: pointer;
                    border-radius: 1rem;

                    position: absolute;
                    bottom: 2rem;
                    left: 2rem;
                }

                @media (max-width: 72rem) {
                    #panel {
                        width: 100vw;
                        height: auto;
                        padding: 0.5rem 8vw;
                        border: none;
                        flex-direction: row;
                        align-items: center;
                    }

                    ul {
                        padding: 0;
                        margin: 0;
                        display: flex;
                        align-items: center;
                    }

                    h2 {
                        padding: 0 2rem 0 0;
                        margin: 0;
                    }

                    #octocat {
                        display: none;
                    }
                }

                @media (max-width: 700px) {
                    ul {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default Panel;
