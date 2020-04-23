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
        <FullView id="wip">
            <h2>WIP_</h2>
            <p>This site is still unfinished and work in progress.</p>
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
        <FullView id="whoami">
            <h2>whoami_</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                eget tristique leo. Nulla sapien risus, hendrerit non purus
                vitae, tristique euismod urna. Nulla non nisi quis dolor egestas
                consectetur. Vestibulum et libero sit amet lorem bibendum
                vestibulum. Mauris in ex malesuada leo dapibus consectetur.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <style jsx>{`
                h2 {
                    margin: 0;
                }
            `}</style>
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
