# Volunteer Matching

The Volunteer Matching project is a web app that assists in better management of volunteer matching operations. It will track and provide matching suggestions of volunteer partners, opportunities for volunteers, and volunteers. Later features could include communications to build out functionality similar to a CRM.

## Development Setup
This setup is for use with local development only; production instructions will be included later. Do not use these instructions in production without turning off debug and resetting the SECRET_KEY in the .env variables.

You will need [git](https://git-scm.com/downloads), [python 3](https://www.python.org/downloads/), pipenv, and SQLite installed. Depending where you get Python from, pipenv may already be included with Python.

### Prepare development environment
1. Clone the repo and cd into the directory
1. `pipenv install`
1. `pipenv shell`
1. `cp config.env.template .env`
1. `flask db upgrade`
1. Create the admin user: `flask create-admin`

### Start the Flask app
1. `flask run`
1. End the app with ctrl + c.

## Contributing

We welcome new contributors.  Be sure to check out the guide on [contributing][contributing], which includes instructions on how to fork, clone, branch, commit, pull request and sync your fork.

Not sure where to start? Look for [open issues][githubissue] on GitHub, or message the team on [our Slack site][slack]. If you aren't on our Slack, [click here for an invite][slackinvite].

TL;DR Contribution Workflow:

1. [Fork][fork] this repository and Clone your fork locally.
1. Checkout a new branch on which to make your changes.
1. Make edits. Try to match existing coding style.
1. Test your changes.
1. Commit your changes. Push your changes to your fork on GitHub.
1. Submit a new [pull request][pullrequest] and your changes will be reviewed and merged.

## Bugs / Feedback / Suggestions / Questions

We encourage you to [open up an issue][newissue] if you have any feedback, suggestions, bugs or just have a question on where to start.

## License

MIT, see [LICENSE](/LICENSE) for full license.

[slack]: https://codeforfoco.slack.com/
[slackinvite]: https://codeforfocoslack.herokuapp.com
[fork]: https://help.github.com/articles/fork-a-repo/
[forkthisrepo]: https://github.com/CodeForFoco/volunteermatching#fork-destination-box
[contributing]: https://github.com/CodeForFoco/org/blob/master/CONTRIBUTING.md
[githubissue]: https://github.com/CodeForFoco/volunteermatching/issues
[newissue]: https://github.com/CodeForFoco/volunteermatching/issues/new
[pullrequest]: https://github.com/CodeForFoco/volunteermatching/pulls
