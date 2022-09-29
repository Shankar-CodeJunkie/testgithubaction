const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {
        try {
           core.notice(github.token);
        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(JSON.stringify(e))
        }
    }
)();