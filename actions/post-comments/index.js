const core = require('@actions/core');
const github = require('@actions/github');


(
    async() => {
        try {
            core.notice('Calling the action named post comments')
            let octokit = github.getOctokit(secrets.GITHUB_TOKEN)
            const {
                data: { login },
              } = await octokit.rest.users.getAuthenticated();
            core.notice('logged in user is ', login);  
        }catch(e) {
            core.setFailed(e.message);
        }
    }
)();