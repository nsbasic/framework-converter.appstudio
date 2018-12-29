# framework-converter.appstudio
App to convert a project to Bootstrap 4

## Updating Dependencies

Dependencies should be updated each time a change is made to the `package-lock.json` file. Dependencies can be updated by typing `npm install` as above.

## Running locally

1. Create a folder called local-deploy. It doesn't matter where.
2. In AppStudio Preferences, set Deploy to the local-deploy folder.
3. Deploy
4. Open a console window in local-deploy/framework-converter
5. do 'npm install' (first time only)
6. do `npm start`
7. In subsequent runs, just do steps 3 and 6.

## Building MacOS Executable

Follow instructions above to get the app running locally. Then, from the command line:
```
npm run package-mac
```
The app will be in local-deploy/framework-converter/release-builds/framework-converter.appstudio-darwin-x64

## Building Windows Executable

Follow instructions above to get the app running locally. Then, from the command line:
```
npm run package-win
npm run makewin
```
The app will be in local-deploy/framework-converter/release-builds/windows-installer
