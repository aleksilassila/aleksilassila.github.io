import config from "../config";
import theme from "../theme";

import Panel from "../components/panel";
import FullView from "../components/fullView";
import View from "../components/view";
import Footer from "../components/footer";
import Posts from "../components/posts";
import Tweak from "../components/tweak";
import GithubProjects from "../components/githubProjects";

const Home = (props) => (
    <div>
        <Panel />
        <div id="clip">
            <FullView id="projects" arrow={true}>
                <h2>Github projects showcase</h2>
                <GithubProjects maxRepos={3} />
                <style jsx>{`
                    h2 {
                        margin: 0;
                    }
                `}</style>
            </FullView>
            <FullView>
                <Posts />
            </FullView>
            <FullView id="repo" arrow={true}>
                <View noPadding={true}>
                    <h2>Tweaks</h2>
                    <Tweak
                        name="SpotifyPlaylistNumberOfSongs"
                        description={
                            <div>
                                <p>
                                    A MobileSubstrate tweak for Spotify to show
                                    amount of songs in
                                </p>
                                <p>a playlist next to playlist duration.</p>
                            </div>
                        }
                    />
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
            <div>
                <div id="bw" />
                <FullView id="whoami">
                    <h2>Whoami_</h2>
                    <p>Hi, I'm a developer from Espoo, Finland.</p>
                    <p>
                        I do all sorts of projects, some of which I post here.
                        Have a look!
                    </p>
                </FullView>
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
            </div>
            <Footer>
                <p>© 2020 Aleksi Lassila</p>
                <p>
                    <a href={config.ENDPOINT + "/auth/google"}>
                        Login with Google
                    </a>
                    <style jsx>{`
                        a {
                            color: ${theme.color.black}80;
                        }
                    `}</style>
                </p>
            </Footer>
        </div>
    </div>
);

export default Home;
