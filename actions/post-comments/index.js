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
            let response = await octokit.rest.issues.get({
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                issue_number: 1
            })
            console.log(response.data.title)
            octokit.rest.issues.createComment({
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                issue_number: 1,
                body: 'Hey comment from plugin'
            })
            .then(data => console.log('success: ',data))
            .catch(err => console.log('err', err))
            

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(e)
        }
    }
)();