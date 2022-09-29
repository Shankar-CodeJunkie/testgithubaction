const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");


(
    async () => {

        try {
            const { context } = github;
            const token = core.getInput('GITHUB_TOKEN', {
              required: true,
            });
            core.notice('Calling the action named post comments', github.token )
            core.notice(token)
            const { issue } = context.payload;
            core.notice('logged in user is ', login);
        } catch (e) {
            core.setFailed('heyerr:');
            core.setFailed(JSON.stringify(e))
        }
    }
)();