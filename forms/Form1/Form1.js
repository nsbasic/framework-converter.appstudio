/* global
  btnFind
  btnBS3toBS4
  btnJQMtoBS4
  Input1
*/

/* eslint no-undef: 'error' */
/* eslint-env node */

const read = require('fs-readdir-recursive');

const fs = require('fs-extra');

const fileDialog = require('file-dialog');

const BS3toBS4 = {};
const JQMtoBS4 = {};
let sep = '/'; // default MacOS - changes if Windows
let projectPath = '';

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

  BS3toBS4.convert();
});

btnJQMtoBS4.onclick = (() => {
  'use strict';

  JQMtoBS4.convert();
});
