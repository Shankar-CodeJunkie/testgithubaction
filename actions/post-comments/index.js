const core = require('@actions/core');
const github = require('@actions/github');


(
    async() => {
        try {
            core.notice('Calling the action named post comments')
        }catch(e) {
            core.setFailed(e.message);
        }
    }
)();