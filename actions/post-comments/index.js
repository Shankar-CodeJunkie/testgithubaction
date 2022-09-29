const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
            const { ACCESS_TOKEN } = process.env
            console.log(process.env.GITHUB_TOKEN)
            //core.notice('shankar', env);
            

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(JSON.stringify(e))
        }
    }
)();