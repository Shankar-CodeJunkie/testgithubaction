const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
const githubRequest = require('@octokit/request');
const { Octokit } = require('octokit');
let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
const octokit = github.getOctokit(githubtoken);
const octokitRequest = new Octokit({
    auth: githubtoken
});

(
    async () => {
        try {
            console.log('hey wr r calling v1');
            core.notice('launching actions')
            core.notice(core.getInput('GITHUB_TOKEN', {required: true}));
            let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
            //const octokit = github.getOctokit(githubtoken);
            
            /*let response = await octokit.rest.issues.get({
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                issue_number: 1
            })*/
            //console.log(response.data.title)
            sendComments(
                'Shankar-CodeJunkie',
                'testgithubaction',
                1,
                "Hey, this is a message from the bot 1"
            )

            let pullRequests = await getPullRequests(
                'Shankar-CodeJunkie',
                'testgithubaction',
            )

            let releaseDetails = await getReleases(
                'Shankar-CodeJunkie',
                'testgithubaction'
            )

            core.notice('------------');
            core.notice(pullRequests);
            core.notice('------------');
            core.notice(releaseDetails)
        

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

async function getReleases(owner, repo) {
    core.notice('coming to get release info');
    let releases = [];
    const result = await githubRequest(`GET /repos/${owner}/${repo}/releases`, {
        owner: owner,
        repo: repo,
        headers: {
            authorization: `token ${githubtoken}`,
        }
    })

    console.log(result.data)
    
    //let releasesArray = releaseInfo.data.map(x => x.tag_name);
    return result.data
}