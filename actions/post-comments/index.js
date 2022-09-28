const core = require('@actions/core');
const github = require('@actions/github');


(
    async() => {
        try {
            core.notice('Calling the action named post comments')
            const token = core.getInput('repo-token', {
                required: true,
              });
            const octokit = new github.GitHub(token);
            const {
                data: { login },
              } = await octokit.rest.users.getAuthenticated();
            core.notice('logged in user is ', login);  
        }catch(e) {
            core.setFailed('heyerr:', e.message);
        }
    }
)();