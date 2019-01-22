/* global
  btnFind
  btnBS3toBS4
  btnJQMtoBS4
  convertProjectB3toB4
  convertElementB3toB4
  convertProjectJQMtoB4
  convertElementJQMtoB4
  Input1
*/

/* eslint no-undef: 'error' */
/* eslint-env node */

const read = require('fs-readdir-recursive');

const fs = require('fs-extra');

const fileDialog = require('file-dialog');

let controls = 0;
let unconverted = 0;
let sep = '/'; // default MacOS - changes if Windows
let projectPath = '';
let unconvertedList = '';

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

  let i;
  unconverted = 0;
  unconvertedList = '';
  controls = 0;
  Card1_text.innerHTML = bs3Description;

  convertProjectB3toB4();

  const fileList = read(Input1.value);
  for (i = 0; i < fileList.length; i += 1) {
    if (fileList[i].includes(`${sep}Elements${sep}`)) {
      const filename = `${Input1.value}${sep}${fileList[i]}`;
      let props = fs.readJsonSync(filename);
      console.log(filename, fileList[i].props);
      if (props['!type'].substr(props['!type'].length - 3) === '_bs') {
        controls += 1;
        props = convertElementB3toB4(props);
        fs.writeJsonSync(filename, props, { spaces: 2, EOL: ' \n' });
      }
    }
  }
  NSB.MsgBox(`BS3 Controls: ${controls} Unconverted: ${unconverted} ${unconvertedList}`);
});

btnJQMtoBS4.onclick = (() => {
  'use strict';

  let i;
  unconverted = 0;
  unconvertedList = '';
  controls = 0;
  Card1_text.innerHTML = jQMDescription;


  convertProjectJQMtoB4();

  const fileList = read(Input1.value);
  for (i = 0; i < fileList.length; i += 1) {
    if (fileList[i].includes(`${sep}Elements${sep}`)) {
      const filename = `${Input1.value}${sep}${fileList[i]}`;
      let props = fs.readJsonSync(filename);
      console.log(filename, fileList[i].props);
      if (props['!type'].substr(props['!type'].length - 6) === '_jqm14') {
        controls += 1;
        props = convertElementJQMtoB4(props, filename);
        fs.writeJsonSync(filename, props, { spaces: 2, EOL: ' \n' });
      }
    }
  }
  NSB.MsgBox(`jQM Controls: ${controls} Unconverted: ${unconverted} ${unconvertedList}`);
});
