import config from "../config";
import theme from "../theme";

import Panel from "../containers/panel";
import FullView from "../containers/fullView";
import View from "../containers/view";
import Footer from "../components/footer";
import Posts from "../components/posts";
import Tweaks from "../components/tweaks";
import GithubProjects from "../components/githubProjects";

const Page = () => (
    <div id="page">
        <FullView
            id="whoami"
            panelitem={true}
            paneltext="Who am I?"
            arrow={true}
        >
            <h2>Whoami_</h2>
            <p>Hi, I'm a developer from Espoo, Finland.</p>
            <p>
                I do all sorts of projects, some of which I post here. Have a
                look!
            </p>
            <style jsx>{`
                #bw {
                    background-image: url("static/bw.JPG");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position-x: right;
                    height: 80vh;
                    width: 50vw;
                    position: absolute;
                    right: 0;
                    margin-top: 10vh;
                    display: none;
                }

                @media (max-width: 700px) {
                    #bw {
                        display: none;
                    }
                }
            `}</style>
        </FullView>
        <FullView id="projects" panelitem={true} arrow={true}>
            <h2>Github projects showcase</h2>
            <GithubProjects maxRepos={3} />
            <style jsx>{`
                h2 {
                    margin: 0;
                }
            `}</style>
        </FullView>
        <FullView id="posts" panelitem={true} arrow={true}>
            <Posts />
        </FullView>
        <FullView id="repo" panelitem={true} paneltext="Tweaks">
            <View noPadding={true}>
                <h2>Tweaks</h2>
                <Tweaks />
            </View>
            <View noPadding={true}>
                <h2>Cydia Repository</h2>
                <p>All the above tweaks are available in my repository.</p>
                <p
                    className="cydia-repo-link"
                    onClick={() =>
                        window.open(
                            "cydia://url/https://cydia.saurik.com/api/share#?source=http%3A%2F%2Faleksilassila.github.io%2Frepo"
                        )
                    }
                >
                    Click here to add http://aleksilassila.github.io/repo to
                    cydia.
                </p>
                <style jsx>{`
                    .cydia-repo-link {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                `}</style>
            </View>
        </FullView>
        <Footer>
            <p>© 2020 Aleksi Lassila</p>
            <p>
                <a href={config.ENDPOINT + "/auth/google"}>Login with Google</a>
            </p>
        </Footer>
    </div>
);

const Home = (props) => {
    const pageInstance = Page();
    return (
        <div>
            <Panel page={pageInstance} />
            {pageInstance}
        </div>
    );
};

export default Home;
