/* global
  btnFind
  btnBS3toBS4
  btnJQMtoBS4
  Input1
  labVersion
*/

/* eslint no-undef: 'error' */
/* eslint-env node */

if (typeof require === 'undefined') {
  NSB.MsgBox('This app cannot be run in a local browser. Please check the docs for more info.');
}

const read = require('fs-readdir-recursive');
const fs = require('fs-extra');
const fileDialog = require('file-dialog');

const BS3toBS4 = {};
const JQMtoBS4 = {};
let sep = '/'; // default MacOS - changes if Windows
let projectPath = '';
let unconverted = 0;
let unconvertedList = '';
let controls = 0;

function Main() {
  labVersion.value = AppVersion;
}

btnFind.onclick = (() => {
  'use strict';

  fileDialog()
    .then((file) => {
      projectPath = file[0].path;
      let path = file[0].path.split(sep);
      if (path.length === 1) {
        path = file[0].path.split('\\');
        sep = '\\';
      }
      path.pop();
      Input1.value = path.join(sep);
    });
});

btnBS3toBS4.onclick = (() => {
  'use strict';

  convert(BS3toBS4);
});

btnJQMtoBS4.onclick = (() => {
  'use strict';

  convert(JQMtoBS4);
});

function convert(mode) {
  unconverted = 0;
  unconvertedList = '';
  controls = 0;
  
  if (projectPath !== '') {
    // single project
    mode.convert(projectPath, Input1.value);
  } else {
    // get all .project files in designated folder
    const projects = read(Input1.value);
    projects.forEach((filename) => {
      if (filename.endsWith('.project')) {
        console.log('---------', filename);
        const path = (Input1.value + sep + filename).split(sep);
        path.pop();
        mode.convert(Input1.value + sep + filename, path.join(sep));
      }
    });
  }
  NSB.MsgBox(`jQM Controls: ${controls} Unconverted: ${unconverted}`);
  Card1_text.innerHTML += unconvertedList;
}

function appendCode(filename, code) {
  let form = filename.split(sep);
  form.pop();
  form.pop();
  let codeFile = form.join(sep) + sep + form[form.length-1];
  if (filename.indexOf('/BASIC/')) {
    code = `JavaScript\n  ${code}\nEnd JavaScript`;
    codeFile += '.bas';
  } else {
    codeFile += '.js';
  }
  code = `\n\n${code}\n`;
  fs.writeFileSync(codeFile, code, {flag: "a"});
}
