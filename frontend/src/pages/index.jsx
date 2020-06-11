import config from "../config";
import theme from "../theme";

import Panel from "../components/panel";
import FullView from "../components/fullView";
import View from "../components/view";
import Footer from "../components/footer";
import Posts from "../components/posts";
import GithubProjects from "../components/githubProjects";

const Home = (props) => (
    <div>
        <Panel />
        <FullView arrow={true} id="whoami">
            <h2>Whoami_</h2>
            <p>Hi, I'm a developer from Espoo, Finland.</p>
            <p>Here you can find my latest projects and work.</p>
            <style jsx>{`
                h2 {
                    margin: 0;
                }
            `}</style>
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
