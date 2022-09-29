const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
            const { ACCESS_TOKEN } = process.env
            console.log(process.env.GITHUB_TOKEN)
            //core.notice('shankar', env);
            const octokit = new github.GitHub(ACCESS_TOKEN)
            const { payload, sha } = github.context
            const { repository } = payload
            console.log(payload)
            console.log(sha)
            console.log(repository)

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