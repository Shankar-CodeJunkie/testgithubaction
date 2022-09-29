const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
            console.log('hey wr r calling');
            core.notice('launching actions')
            core.notice(core.getInput('GITHUB_TOKEN', {required: true}));
            let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
            const octokit = github.getOctokit(githubtoken);
            const response = await octokit.rest.pulls.createReviewComment({
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                pull_number: 1
            })
            console.log(response);
            

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(e)
        }
    }
)();