const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const request = require('request');
const extract = require('extract-zip');

module.exports = {
  new(directory, options) {
    const zipFile = `https://github.com/${options.preset}/archive/${
      options.branch
    }.zip`;
    const appDirectory = path.resolve(process.cwd(), directory);
    const temporaryDirectory = fs.mkdtempSync(appDirectory);
    const tempExtractDirectory = fs.mkdtempSync(temporaryDirectory);
    const tempZip = path.resolve(temporaryDirectory, 'template.zip');
    const file = fs.createWriteStream(tempZip);

    console.log(chalk.blue('Thanks for using CRAP!'));
    console.log(' ');
    console.log(chalk.blue(`Creating new directory: ${directory}`));

    fs.mkdirSync(appDirectory);

    console.log(
      chalk.yellow(
        `Downloading ${options.preset} from ${
          options.branch
        } branch. This may take a while.`,
      ),
    );

    this.download(zipFile, file);

    file.on('finish', () => {
      file.close(() => {
        let source;

        console.log(chalk.blue('Extracting preset...'));

        extract(
          tempZip,
          {
            dir: tempExtractDirectory,
            onEntry: entry => {
              if (entry.fileName.endsWith('package.json')) {
                source = path.resolve(
                  tempExtractDirectory,
                  path.dirname(entry.fileName),
                );
              }
            },
          },
          async err => {
            if (err) {
              console.log(
                chalk.red(`Oops. We were unable to extract ${zipFile}`),
              );
              process.exit(1);
            }

            console.log(
              chalk.blue(`Configuring ${directory}. You're almost done!`),
            );

            await this.configureApp(source, appDirectory);

            await this.postInstall(
              directory,
              appDirectory,
              temporaryDirectory,
              tempExtractDirectory,
              options.preset,
            );

            this.wipeUp(temporaryDirectory, tempExtractDirectory);
          },
        );
      });
    });
  },

  download(zipFile, file) {
    request
      .get(zipFile)
      .on('error', err => {
        console.log(err);
        process.exit(1);
      })
      .pipe(file);
  },

  configureApp(source, destination) {
    return new Promise((resolve, reject) => {
      fs.copy(source, destination, err => {
        if (err) {
          console.log(err);
          process.exit(1);
        }

        resolve();
      });
    });
  },

  postInstall(directory, appDirectory, preset) {
    return new Promise((resolve, reject) => {
      const postInstall = path.resolve(appDirectory, 'postInstall.txt');
      console.log(' ');
      fs.readFile(postInstall, 'utf-8', (err, contents) => {
        if (err) {
          return;
        }
        console.log(chalk.yellow(`A message from ${preset.split('/')[0]}: `));
        console.log(contents);
        fs.remove(postInstall);
      });

      console.log(
        chalk.green(`Successfully installed ${preset} in ${appDirectory}!`),
      );
      console.log(' ');
      console.log(chalk.blue('Run the following commands to finish:'));
      console.log(chalk.yellow(`  cd ${directory}`));
      console.log(chalk.yellow('  yarn'));

      resolve();
    });
  },

  wipeUp(temporaryDirectory, tempExtractDirectory) {
    if (temporaryDirectory) {
      fs.removeSync(temporaryDirectory);
    }
    if (tempExtractDirectory) {
      fs.removeSync(tempExtractDirectory);
    }
  },
};
