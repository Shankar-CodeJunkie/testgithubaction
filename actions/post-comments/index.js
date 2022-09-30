const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
const { request } = require("@octokit/request");
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
            

            let pullRequests = await getPullRequests(
                'Shankar-CodeJunkie',
                'testgithubaction',
            )

            let releaseDetails = await getReleases(
                'Shankar-CodeJunkie',
                'testgithubaction'
            )

            core.notice('------------');
            //core.notice(pullRequests);
            core.notice('------------');
            core.notice(releaseDetails)

            let commitsRange = await getCommitsBetweenTwoTags(
                "v0.0.1",
                "v0.0.2",
                'Shankar-CodeJunkie',
                'testgithubaction'
            )
            
            core.notice(commitsRange);
            let pullRequest = []

            let processArr = commitsRange.map(x => {
                console.log('hey x', x)
                let info = getPullRequestForCommit(
                    'Shankar-CodeJunkie',
                    'testgithubaction',
                    x
                )
                console.log('hey wht we get in info', info);
                pullRequest.push(info);
            })
            let arr = await Promise.all(processArr);
            console.log('complete arr', pullRequests)
        

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
    const result = await request(`GET /repos/${owner}/${repo}/releases`, {
        owner: owner,
        repo: repo,
        headers: {
            authorization: `token ${githubtoken}`,
        }
    })

    //console.log(result.data)
    
    let releasesArray = result.data.map(x => x.tag_name);
    return releasesArray
}

async function getCommitsBetweenTwoTags(startCommit, endCommit, owner, repo) {
    core.notice('coming to get commits info info');
    const result = await request(`GET /repos/${owner}/${repo}/compare/${startCommit}...${endCommit}`, {
        headers: {
            authorization: `token ${githubtoken}`,
        }
    })
    //console.log(result.data);
    let commitsInfo = result.data.commits.map(x => x.sha);
    return commitsInfo
}

async function getPullRequestForCommit(owner, repo, commit) {
    console.log('coming to get pr for commit', commit);
    const result = await request(`GET /repos/${owner}/${repo}/commits/${commit}/pulls`).catch(err => console.log(err))
    return result.data.map(x => x.number);
    console.log('prnumber', prnumber);
    return prnumber
}