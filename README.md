# Create React App Preset

> CRAP for short.

Scaffold Create React App projects using pre-configured templates.

## Usage

```bash
npx crap new my-app
```

Follow the prompt and you are good to go.

## Presets

Currently, there are two preset options, **Tailwind CSS** and **Custom**.

### Tailwind Preset

The [Tailwind Css preset](https://github.com/GeoffSelby/tailwind-crap-preset) scaffolds a CRA project with Tailwind pre-configured with the help of [craco](https://github.com/sharegate/craco).

### Custom Preset

The custom preset option allows you to use your own CRA templates by including the GitHub username/repo of the template. For example: If your custom CRA template is at `github.com/JohnDoe/CRA-template`, you would pass `JohnDoe/CRA-template` when asked by CRAP. At this time, the template must be a public GitHub repo.

## Creating custom presets/starter templates

To create your own preset/starter template, first use create-react-app and tweak everything however you need. This will be your preset/starter template.

Make sure the `build` and `node_modules` directories are in your `.gitignore` file. We don't want those.

### Post Install Messages

You may want to include a post install message for your users in order to provide additional instructions or information. This could be a good time to provide links to Patreon or GitHub Sponsorships. Whatever you need to relay to the user, really.

To include a post install message, add `postInstall.txt` to the root of your preset. In this file you can include your message.

After a successful installation, the `postInstall.txt` file is automatically deleted.

## License

CRAP is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
