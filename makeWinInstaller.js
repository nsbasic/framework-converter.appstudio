const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

// todo: why does this return a promise?
function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'framework-converter-win32-ia32'),
    authors: 'NS BASIC Corporation',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'framework-converter.exe',
    setupExe: 'FrameworkConverter.exe',
    setupIcon: path.join(rootPath, 'assets', 'icons', 'win', 'icon.ico')
  })
}