const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
            console.log('hey wr r calling');
            core.notice('launching actions')
            core.notice(core.getInput('GITHUB_TOKEN', {required: true}));
            const octokit = github.getOctokit('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');
            const { data: pullRequest } = await octokit.rest.pulls.get({
                owner: 'octokit',
                repo: 'rest.js',
                pull_number: 123,
                mediaType: {
                  format: 'diff'
                }
            });
            console.log(pullRequest);
            //const { ACCESS_TOKEN } = process.env
            //core.notice(process.env.GITHUB_TOKEN)
            
            //const { payload, sha } = github.context
            //const { repository } = payload
            //const octokit = new github.GitHub({auth: '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'})
            
            //console.log(octokit)  

            /*const commit = await octokit.git.getCommit({
                owner: repository.owner.login,
                repo: repository.name,
                commit_sha: sha
            })
            console.log(commit);
            core.notice(commit)*/

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(JSON.stringify(e))
        }
    }
)();