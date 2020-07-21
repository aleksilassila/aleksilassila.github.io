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
        <div>
            <FullView arrow={true} id="whoami">
                <h2>Whoami_</h2>
                <p>Hi, I'm a developer from Espoo, Finland.</p>
                <p>Here you can find my latest projects and work.</p>
            </FullView>
            <div id="bw" />
            <style jsx>{`
                #bw {
                    background-image: url("static/bw.JPG");
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position-x: right;
                    height: 100vh;
                    width: 50vw;
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: -1;
                }

                @media (max-width: 72rem) {
                    #bw {
                        margin-top: 2.5rem;
                    }
                }

                @media (max-width: 700px) {
                    #bw {
                        display: none;
                    }
                }
            `}</style>
        </div>
        <FullView id="repo">
            <View noPadding={true}>
                <h2>Tweaks</h2>
                <Tweak
                    name="SpotifyPlaylistNumberOfSongs"
                    description={
                        <>
                            <p>
                                A MobileSubstrate tweak for Spotify to show
                                amount of songs in
                            </p>
                            <p>a playlist next to playlist duration.</p>
                        </>
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
        <FullView id="projects">
            <View noPadding={true}>
                <Posts />
            </View>
            <View noPadding={true}>
                <h2>Github projects showcase</h2>
                <GithubProjects maxRepos={3} />
                <style jsx>{`
                    h2 {
                        margin: 0;
                    }
                `}</style>
            </View>
        </FullView>
        <Footer>
            <p>© 2020 Aleksi Lassila</p>
            <p>
                <a href={config.ENDPOINT + "/auth/google"}>Login with Google</a>
                <style jsx>{`
                    a {
                        color: ${theme.color.black}80;
                    }
                `}</style>
            </p>
        </Footer>
    </div>
);

export default Home;
