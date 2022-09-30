const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
const octokit = github.getOctokit(githubtoken);

(
    async () => {
        try {
            console.log('hey wr r calling v1');
            core.notice('launching actions')
            core.notice(core.getInput('GITHUB_TOKEN', {required: true}));
            let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
            const octokit = github.getOctokit(githubtoken);
            /*let response = await octokit.rest.issues.get({
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                issue_number: 1
            })*/
            //console.log(response.data.title)
            /*sendComments(
                'Shankar-CodeJunkie',
                'testgithubaction',
                1,
                "Hey, this is a message from the bot"
            )*/

            let pullRequests = await getPullRequests(
                'Shankar-CodeJunkie',
                'testgithubaction',
            )

            /*let releaseDetails = await getReleases(
                octokit,
                'Shankar-CodeJunkie',
                'testgithubaction'
            )*/
            
            core.notice('------------');
            core.notice(pullRequests);
            core.notice('------------');
            //core.notice(releaseDetails)
        

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(e)
        }
    }
)();

function sendComments(orgName, repoName, issue_number, message) {
    octokit.rest.issues.createComment({
        owner: orgName,
        repo: repoName,
        issue_number: issue_number,
        body: message
    })
    .then(data => console.log('success: ',data))
    .catch(err => console.log('err', err))
    
}

async function getPullRequests(orgName, repoName) {
    let pullRequests = await octokit.rest.pulls.list({
        owner: orgName,
        repo: repoName,
    });

    return pullRequests.data

}

async function getReleases(octokit, owner, repo) {
    core.notice('coming to get release info');
    let releases = [];
    let releaseInfo = await octokit.request(
        'GET /repos/{owner}/{repo}/releases',
        {owner: 'OWNER',
        repo: 'REPO'}
    )
    let releasesArray = releaseInfo.data.map(x => x.tag_name);
    return releasesArray
}