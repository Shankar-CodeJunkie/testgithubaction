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
            core.notice('Calling the action named post comments', token )
            const { issue } = context.payload;

            
            const octokit = new github.GitHub(token);
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();
            core.notice('logged in user is ', login);
        } catch (e) {
            core.setFailed('heyerr:', JSON.stringify(e));
        }
    }
)();