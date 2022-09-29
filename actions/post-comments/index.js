const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");
const Octokit = require('octokit')

const octokit = new Octokit({
    auth: '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'
  });
console.log(octokit.auth.name)
(
    async () => {
        try {
            //const { ACCESS_TOKEN } = process.env
            //core.notice(process.env.GITHUB_TOKEN)
            
            //const { payload, sha } = github.context
            //const { repository } = payload
            //const octokit = new github.GitHub({auth: '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'})
            const octokit = new Octokit({
                auth: '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'
              });
            console.log(octokit.auth.name)
            
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