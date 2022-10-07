const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
const { request } = require("@octokit/request");
const { Octokit } = require('octokit');
let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
const octokit = github.getOctokit(githubtoken);


(
    async () => {
        try {
            console.log('hey wr r calling v2');
            let owner = core.getInput('OWNER', {required: true});
            let repo = core.getInput('REPO_NAME', {required: true})
            

            let releaseDetails = await getReleases(
                owner,
                repo
            )

            core.notice('------------');
            //core.notice(pullRequests);
            core.notice('------------');

            let commitsRange = await getCommitsBetweenTwoTags(
                releaseDetails[1],
                releaseDetails[0],
                owner,
                repo,
            )
            
            core.notice(commitsRange);
            let pullRequest = []

            await Promise.all(
                commitsRange.map(async x => {
                    let pullReqNumber = await getPullRequestForCommit(
                        owner,
                        repo,
                        x.sha
                    )
                    console.log('pull request array', pullReqNumber);
                    pullRequest.push(pullReqNumber[0])

                    if (pullRequest.includes(pullReqNumber[0])) {
                        console.log('FLAG')
                    } else {
                        console.log('NOFLAG')
                    }
                    
                    console.log('hey which is - new', pullReqNumber[0]);
                    if (!pullRequest.includes(pullReqNumber[0])) {
                        //ensure you don't send comments twice because of getiing merge pull requests
                        sendComments(
                            owner,
                            repo,
                            pullReqNumber[0],
                            `Hey there! ${releaseDetails[0]} was just released that references this issue/PR.`
                        )
                    }
                })
            )
            console.log('complete arr of pull requests 2', pullRequest)           

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(e)
        }
    }
)();

function sendComments(orgName, repoName, issue_number, message) {
    return octokit.rest.issues.createComment({
        owner: orgName,
        repo: repoName,
        issue_number: issue_number,
        body: message
    })
    .then(data => data)
    .catch(err => console.log('err', err))
    
}

async function getReleases(owner, repo) {
    core.notice('coming to get release info');
    const result = await request(`GET /repos/${owner}/${repo}/releases`, {
        owner: owner,
        repo: repo,
        headers: {
            authorization: `token ${githubtoken}`,
        }
    })
    
    let releasesArray = result.data.map(x => x.tag_name);
    return releasesArray
}

async function getCommitsBetweenTwoTags(startCommit, endCommit, owner, repo) {
    core.notice('coming to get commits info info');
    const result = await request(`GET /repos/${owner}/${repo}/compare/${startCommit}...${endCommit}`, {
        headers: {
            authorization: `token ${githubtoken}`,
        },
    }).catch(err => console.log('err from catch', err))
    
    //console.log('commit range', result.data.commits)
    return result.data.commits
}

async function getPullRequestForCommit(owner, repo, commit) {
    const result = await request(`GET /repos/${owner}/${repo}/commits/${commit}/pulls`).catch(err => console.log(err))
    return result.data.map(x => x.number)
}