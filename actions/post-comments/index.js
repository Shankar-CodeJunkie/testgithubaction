const core = require('@actions/core');
const github = require('@actions/github');
const { createActionAuth } = require("@octokit/auth-action");



(
    async () => {

        try {
            const auth = createActionAuth();
            const authentication = await auth();
            core.notice('Calling the action named post comments', authentication.tokenType )
            /*const token = core.getInput(authentication.token, {
                required: true,
            });
            const octokit = new github.GitHub(token);
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();
            core.notice('logged in user is ', login);*/
        } catch (e) {
            core.setFailed('heyerr:', JSON.stringify(e));
        }
    }
)();