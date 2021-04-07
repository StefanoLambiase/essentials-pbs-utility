<p align="center">
  <img src="https://github.com/StefanoLambiase/essentials-pbs-utility/blob/main/.github/workflows/logo.png?raw=true" />
</p>


# Introduction
This is a desktop app built to help Pokémon Essentials users in the creation of text for the PBS txt files. It is built with Electron, HTML, JavaScript, JQuery, and Bootstrap.

## Authors

* **Stefano Lambiase** - [StefanoLambiase](https://github.com/StefanoLambiase)

# Technical informations

In this section we introduce technical informations and installing guides!

## Prerequisites

The app is built with [Electron js](https://www.electronjs.org/).
To contribute or build the app you need *node* on your machine.

To install Node and npm you can:

- download it from the official [website](https://nodejs.org/en/download/).

OR

- install it with a package manager, [Chocolatey](https://chocolatey.org/) for example (this is my case).

### Install Node using a package manager

#### Chocolatey on Windows

[Chocolatey](https://chocolatey.org/) is a package manager for Windows.
To install Chocolatey and Node, follow these steps:

1. Start a Powershell as Admin (right click on the bottom-left corner on the screen;
2. Run `Get-ExecutionPolicy`;
3. If the output is 'Restricted', run `Set-ExecutionPolicy AllSigned`, else go to next step;
4. Run `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`;
5. Restart the powershell;
6. Run `choco install -y --force nodejs`;
7. Check node version using `node -v` and npm version using `npm -v`;
8. Done! Now you are ready!

#### Homebrew on Mac

[Homebrew](https://brew.sh/index_it) is a package manager for Mac.
To install Homebrew and Node, follow these steps:

1. Paste `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` into a macOS Terminal prompt to install Homebrew;
2. Check the installation using the command `brew -v` (retry from the previous step if the command fails);
3. Paste `brew install node` into a macOS Terminal prompt to install node using brew;
4. Check node version using `node -v` and npm version using `npm -v`;
5. Done! Now you are ready!


## Clone and build the project locally

Follow these steps:

1. Clone this repo;
2. Go into the root directory;
3. Run `npm i` into a terminal, this installs all the dependencies;
4. Run `npm start`, this opens the app;

## Built With

* [Electron.js](https://www.electronjs.org/) - A Framework used to build desktop app using Node.js.
* [Node.js](https://nodejs.org/en/download/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [HTML5](https://www.w3schools.com/html/default.asp) - The programming language used for the renderer process development.
* [Bootstrap](https://getboostrap.com/) - Front-end framework.
* [Javascript](https://www.w3schools.com/js/default.asp) - Scripting language used to add functionalities to the front-end and to comunicate with the main process.

# Contributors

<a href="https://github.com/stefanolambiase/essentials-pbs-utility/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=stefanolambiase/essentials-pbs-utility" />
</a>

