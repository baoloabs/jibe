const core = require('@actions/core')
const github = require('@actions/github')

const destinationOrganizationName = core.getInput('destination-organization-name')
const destinationRepositoryName = core.getInput('destination-repository-name')
const targetBranch = core.getInput('target-branch')

console.log(targetBranch)

try {
  main()
} catch (error) {
  core.setFailed(error.message)
}

async function main () {
  const octokit = github.getOctokit(process.env.BAO_API_TOKEN)

  console.log({
    owner: destinationOrganizationName,
    repo: destinationRepositoryName,
  })

  console.log(await octokit.rest.repos.listBranches({
    owner: destinationOrganizationName,
    repo: destinationRepositoryName,
  }))

  // `who-to-greet` input defined in action metadata file
  console.log(`Hello ${destinationRepositoryName}!`)

  const time = (new Date()).toTimeString()
  core.setOutput('time', time)

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
}
