const core = require('@actions/core')
const github = require('@actions/github')

const destinationRepositoryName = core.getInput('destination-repository-name')
const targetBranch = core.getInput('target-branch')

console.log(destinationRepositoryName, targetBranch)
console.log(process.env)

try {
  const octokit = github.getOctokit(process.env.BAO_API_TOKEN)

  console.log(octokit)

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
