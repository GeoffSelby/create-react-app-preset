# Create React App Preset

CRAP for short.

Use a custom preset/starter template when setting up a new app with create-react-app.

## Installation

Make sure you have create-react-app installed globally...

```bash
npm install -g create-react-app
```

Then, install CRAP globally.

```bash
npm install -g create-react-app-preset
```

## Start a new app

```bash
crap new my-app -p Username/Repo
```

This scaffolds a new application called `my-app` using to specified GitHub repository as the preset.

> You may choose the branch to use by passing it with the `-b` or `--branch` flag.

## Creating custom presets/starter templates

To create your own preset/starter template, first use create-react-app and tweak everything however you need. This will be your preset/starter template.

Make sure the `build` and `node_modules` directories are in your `.gitignore` file. We don't want those.

### Post Install Messages

You may want to include a post install message for your users in order to provide additional instructions or information. This could be a good time to provide links to Patreon or GitHub Sponsorships. Whatever you need to relay to the user, really. Don't worry, we remind the user to install project dependencies for you.

To include a post install message, add `postInstall.txt` to the root of your preset. In this file you can include your message.

After a successful installation, the `postInstall.txt` file is automatically deleted.

## License

CRAP is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
