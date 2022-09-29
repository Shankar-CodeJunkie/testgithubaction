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
            await octokit.request('POST /repos/Shankar-CodeJunkie/testgithubaction/pulls/{pull_number}/comments', {
                owner: 'Shankar-CodeJunkie',
                repo: 'testgithubaction',
                pull_number: '1',
                body: 'Great stuff!',
                commit_id: '26446e9504f6e7b79eeb439f81b810ee47eab535',
                path: 'file1.txt',
                start_line: 1,
                start_side: 'RIGHT',
                line: 2,
                side: 'RIGHT'
              })

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(e)
        }
    }
)();