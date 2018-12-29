# framework-converter.appstudio
App to convert a project to Bootstrap 4

## Updating Dependencies

Dependencies should be updated each time a change is made to the `package-lock.json` file. Dependencies can be updated by typing `npm install` as above.

## Running locally

1. Create a folder called local-deploy. It doesn't matter where.
2. In AppStudio Preferences, set Deploy to the local-deploy folder.
3. Deploy
4. Open a console window in AppStudio-TNG.appstudio/local-deploy/AppStudio_TNG
5. do 'npm install' (first time only)
6. do `npm start`
7. In subsequent runs, just do steps 3, 7 and 8.

## Building the executable

From the command line:
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```
