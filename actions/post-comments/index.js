const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
            console.log('hey wr r calling v1');
            core.notice('launching actions')
            core.notice(core.getInput('GITHUB_TOKEN', {required: true}));
            let githubtoken = core.getInput('GITHUB_TOKEN', {required: true});
            const octokit = github.getOctokit(githubtoken);
            console.log(octokit)
            let response = await octokit.rest.issues.createComment({
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                issue: 1,
                body: 'this is a plugin',
            });
            

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(e)
        }
    }
)();