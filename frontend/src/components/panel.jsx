import theme from "../theme";
import Selected from "./selected";

const Panel = ({ disableNav }) => (
    <div id="panel">
        <h2>Aleksi Lassila</h2>
        <ul>
            <li
                onClick={() =>
                    document
                        .getElementById("whoami")
                        .scrollIntoView({ behavior: "smooth" })
                }
            >
                <Selected elementId="whoami" />
                Who am I?
            </li>
            <li
                onClick={() =>
                    document
                        .getElementById("projects")
                        .scrollIntoView({ behavior: "smooth" })
                }
            >
                <Selected elementId="projects" />
                Projects
            </li>
        </ul>
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

            li {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                cursor: pointer;
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
                    background-color: ${theme.color.white};
                }

                ul {
                    padding: 0;
                    margin: 0;
                    display: flex;
                    align-items: center;
                }

                li {
                    padding: 0;
                    margin: 0 1rem;
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

export default Panel;
