import theme from "../theme";
import useAxios from "axios-hooks";

const GithubProjects = ({ maxRepos }) => {
    const [{ data, loading, error }, refetch] = useAxios({
        url: "https://api.github.com/users/aleksilassila/repos",
    });

    const reposFirst = ["SpotifyPlaylistNumberOfSongs", "bitfields"];

    if (error) {
        return <p>Error while fetching github</p>;
    } else if (loading) {
        return <p>Loading...</p>;
    } else {
        const reposSorted = data.sort((first, second) => {
            if (reposFirst.includes(first.name)) {
                return -1;
            } else if (reposFirst.includes(second.name)) {
                return 1;
            }

            return second.stargazers_count - first.stargazers_count;
        });

        const reposToImages = {
            "text-worlds-online":
                "https://raw.githubusercontent.com/aleksilassila/text-worlds-online/master/gif-v0.3.gif",
            "text-moba":
                "https://raw.githubusercontent.com/aleksilassila/text-moba/master/screenshots/bigger_maps.png",
            "hsl-timetables-uebersicht":
                "https://raw.githubusercontent.com/aleksilassila/hsl-timetables-uebersicht/master/timetables.png",
            bitfields:
                "https://raw.githubusercontent.com/aleksilassila/bitfields/master/screenshot2.png",
            SpotifyPlaylistNumberOfSongs:
                "https://raw.githubusercontent.com/aleksilassila/SpotifyPlaylistNumberOfSongs/master/screenshot.jpg",
        };

        const repoElements = reposSorted.map((repo) => (
            <div className="github-repo" key={repo.id}>
                <div className="github-info">
                    <div>
                        <h2 onClick={() => window.open(repo.html_url)}>
                            <span className="hide">{repo.owner.login}/</span>
                            {repo.name}
                        </h2>
                        <p className="github-description">{repo.description}</p>
                    </div>
                    <div className="github-bottom">
                        <p>Stargazers: {repo.stargazers_count}, </p>
                        <p>Forks: {repo.forks_count}</p>
                    </div>
                </div>
                <div className="github-image-wrapper">
                    {reposToImages.hasOwnProperty(repo.name) ? (
                        <img src={reposToImages[repo.name]}></img>
                    ) : (
                        <img src={repo.owner.avatar_url}></img>
                    )}
                </div>
                <style jsx>{`
                    .github-repo {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid ${theme.color.black}33;
                        padding-top: 2em;
                        padding-bottom: 2em;
                    }

                    h2 {
                        font-size: 1em;
                        margin: 0;
                        margin-bottom: 0.6em;
                        text-decoration: underline;
                        cursor: pointer;
                    }

                    p {
                        font-size: 0.9em;
                        margin: 0;
                    }

                    .github-description {
                        margin-bottom: 1em;
                    }

                    img {
                        max-height: 100%;
                        max-width: 100%;
                        max-height: ${reposToImages.hasOwnProperty(repo.name)
                            ? "250px"
                            : "150px"};
                    }

                    .github-image-wrapper {
                        margin-left: 1em;
                    }

                    .github-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .github-bottom {
                        display: flex;
                        flex-wrap: wrap;
                    }

                    .github-bottom,
                    p:first-child {
                        margin-right: 0.5em;
                    }

                    @media (max-width: 700px) {
                        .github-repo {
                            flex-direction: column;
                            justify-content: flex-start;
                        }

                        .github-image-wrapper {
                            margin: 0;
                            margin-top: 1em;
                        }
                    }
                `}</style>
            </div>
        ));

        return (
            <div id="github-projects">
                {repoElements.slice(0, maxRepos)}
                <style jsx>{`
                    #github-projects {
                        margin: 1em 0;
                        border-top: 1px solid ${theme.color.black}33;
                        padding: 0 1em;
                    }

                    .github-repo-name,
                    h2 {
                        font-size: 1em;
                    }
                `}</style>
            </div>
        );
    }
};

export default GithubProjects;
