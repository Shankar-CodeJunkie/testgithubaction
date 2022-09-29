const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
            const { ACCESS_TOKEN } = process.env
            console.log(process.env)
            core.notice('shankar', env);
            if (ACCESS_TOKEN) {
                core.notice('access token is valid')
            } else {
                core.setFailed(' no token - 1')
            }

        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(JSON.stringify(e))
        }
    }
)();