const electronInstaller = require('electron-winstaller');
const path = require('path')
const rootPath = path.join('./')
const outPath = path.join(rootPath, 'release-builds')

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: path.join(outPath, 'framework-converter-win32-ia32'),
    authors: 'NS BASIC Corporation',
    exe: 'framework-converter.exe',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    setupExe: 'FrameworkConverter.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  });

resultPromise.then(() => 
	console.log("It worked!"), 
	(e) => console.log(`No dice: ${e.message}`)
);