const core = require('@actions/core')
const github = require('@actions/github')

const BAO_API_TOKEN = core.getInput('BAO_API_TOKEN')
const destinationRepositoryName = core.getInput('destination-repository-name')
const targetBranch = core.getInput('target-branch')

try {
  const octokit = github.getOctokit(BAO_API_TOKEN)

  console.log(octokit, destinationRepositoryName, targetBranch)

  // `who-to-greet` input defined in action metadata file
  console.log(`Hello ${destinationRepositoryName}!`)

  const time = (new Date()).toTimeString()
  core.setOutput('time', time)

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (error) {
  core.setFailed(error.message)
}
