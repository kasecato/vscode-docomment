# XML Documentation Comments Support for Visual Studio Code

[![Build Status](https://travis-ci.org/kasecato/vscode-docomment.svg?branch=master)](https://travis-ci.org/kasecato/vscode-docomment) [![Coverage Status](https://coveralls.io/repos/kasecato/vscode-docomment/badge.svg?branch=master&service=github)](https://coveralls.io/github/kasecato/vscode-docomment?branch=master) [![License: MIT](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE) [![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/k--kato.docomment.svg)](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment) [![Install](https://vsmarketplacebadge.apphb.com/installs-short/k--kato.docomment.svg)](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)

Generate XML documentation comments for Visual Studio Code.


## Usage

Type "///", it auto-generates an XML doucumentation comment like this:

![docomment](images/docomment.gif)


## Configuration

The menu under File > Preferences (Code > Preferences on Mac) provides entries to configure user and workspace settings. You are provided with a list of Default Settings. Copy any setting that you want to change to the related `settings.json` file.

### settings.json

```json
{
	// Press the Enter key to activate a command (Default: false)
	"docomment.activateOnEnter": true,
	// Insert spaces when pressing Tab.
	"editor.insertSpaces": true,
	// The number of spaces a tab is equal to.
	"editor.tabSize": 4
}
```


## Installation

1. Install Visual Studio Code 1.19.2 or higher
1. Launch Code
1. From the extension view `Ctrl`-`Shift`-`X` (Windows, Linux) or `Cmd`-`Shift`-`X` (macOS)
1. Search and Choose the extension `C# XML Documentation Comments`
1. Reload Visual Studio Code


## Supported Languages

- C#


## Contributing to the Code

Clone a copy of the repo:

```
git clone https://github.com/kasecato/vscode-docomment.git
```

### Building the code

First, install the package dependencies:

```
npm install
```

Now you can compile the code:

```
npm run compile
```

After the initial compile, the source files will be watched and recompiled
when changes are saved.

## Contributors

* [@ivanz](https://github.com/ivanz)
* [@PJB3005](https://github.com/PJB3005)


## License

This extension is [licensed under the MIT License](LICENSE.txt).
