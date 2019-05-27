# Volunteer Matching

The Volunteer Matching project is a web app that assists in better management of volunteer matching operations. It will track and provide matching suggestions of volunteer partners, opportunities for volunteers, and volunteers. Later features could include communications to build out functionality similar to a CRM.

## Development Setup
This setup is for use with local development only; production instructions will be included later. Do not use these instructions in production without turning off debug and resetting the SECRET_KEY in the .env variables.

You will need [git](https://git-scm.com/downloads) to clone this repo.

For the backend you need [python 3](https://www.python.org/downloads/), pipenv, and SQLite installed. Depending where you get Python from, pipenv may already be included with Python.

For the front end you need [NodeJS + npm](https://nodejs.org/en/download/)


### Prepare Development Enviornment
Clone the repo and cd into the created directory

##### Prepare and start the Flask API
1. `pipenv install`
1. `pipenv shell`
1. `cp config.env.template .env`
1. `flask db upgrade`
1. Create the admin user: `flask auto-setup`
1. `flask run`
1. You can later end the app with ctrl + c.

##### Prepare and start the React Server
1. Open a second terminal and cd into into _your-dir_/client
1. `npm install`
1. `npm start`
1. You can later end the app with ctrl + c.

### Prepare Production Environment
This repo includes both the backend and frontend source for simplification of server requirements. If you would like to split the two apart, the frontend is contained in the client/ directory.

This documentation is currently aimed at hosting on Heroku but can be set up in other production environments. If you succeed in other production setups please document the process and make a pull request to add to this documentation.

#### Heroku Setup
1. Create an account on [Heroku](https://www.heroku.com/) and install and set up the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
1. If you haven't already, clone ths repo and cd into the directory
1. Create the Heroku Dyno `heroku create`
    * You can specify the dyno name with `heroku create mydynoname`
1. Add the free Heroku Postgres addon `heroku addons:create heroku-postgresql:hobby-dev`
1. Push the heroku-production branch to your Heroku Dyno `git push heroku heroku-production:master`
    * In the final lines of the push to Heroku you should see a confirmation release number and a link to the deployed Heroku app.
1. Go to the Heroku app url and login with the default admin account (user:admin, password:password). Go to the dashboard and edit the admin user to change the admin password.

If you want to build the frontend yourself, rather than using the prebuilt heroku-production branch, you can make and checkout a branch and run `npm run build`. This will generate a build directory with the static frontend files. Alter the .gitignore file in client/ to allow git tracking of the build/ directory. Then commit the changes adding the build/ directory and files. Now push your branch `Heroku heroku addons:create your-branch-name:hobby-dev`


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
