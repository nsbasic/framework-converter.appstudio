/* global
  Button1
  Button2
  Input1
*/

/* eslint no-undef: 'error' */
/* eslint-env node */

const read = require('fs-readdir-recursive');

const fs = require('fs-extra');

const fileDialog = require('file-dialog');

const samplesDir = '/Users/george/samples/BASIC/3. Controls/Bootstrap 3';

let bs3controls = 0;
let unconverted = 0;

// rules
const buttonAppearance = {
  field: 'appearance',
  b3: [' btn-default', ' btn-primary', ' btn-success', ' btn-info', ' btn-warning', ' btn-danger', ' btn-link'],
  b4: [' btn-secondary', ' btn-primary', ' btn-success', ' btn-info', ' btn-warning', ' btn-danger', ' btn-link'],
};

const buttonSize = {
  field: 'size',
  b3: [' btn-xs'],
  b4: [' btn-sm'],
};

const checkboxInline = {
  field: 'inline',
  b3: [false, true],
  b4: ['', '-inline'],
};

const imageCenter = {
  field: 'center',
  b3: [' center-block'],
  b4: [' mx-auto'],
};

const imageResponsive = {
  field: 'responsive',
  b3: ['img-responsive'],
  b4: ['img-fluid'],
};

const imageShape = {
  field: 'shape',
  b3: ['', ' img-rounded', ' img-circle'],
  b4: ['', ' rounded', ' rounded-circle'],
};

const inputSize = {
  field: 'size',
  b3: ['input-sm', 'input-lg'],
  b4: ['input-group-sm', 'input-group-lg'],
};

const inputValidation = {
  field: 'validation',
  b3: ['', ' has-warning', ' has-error', ' has-success'],
  b4: ['', ' is-invalid', ' is-invalid', ' is-valid'],
};

const labelAppearance = {
  field: 'appearance',
  b3: [' label-default', ' label-primary', ' label-success', ' label-info', ' label-warning', ' label-danger'],
  b4: ['secondary', 'primary', 'success', 'info', 'warning', 'danger'],
};

const listGroupAppearance = {
  field: 'appearance',
  b3: ['default', 'success', 'info', 'warning', 'danger'],
  b4: ['light', 'success', 'info', 'warning', 'danger', 'action', 'primary', 'secondary', 'dark'],
};

const progressbarAppearance = {
  field: 'appearance',
  b3: ['', ' progress-bar-success', ' progress-bar-info', ' progress-bar-warning', ' progress-bar-danger'],
  b4: ['', ' bg-success', ' bg-info', ' bg-warning', ' bg-danger'],
};

const progressbarAnimated = {
  field: 'animated',
  b3: ['', ' active'],
  b4: ['', ' progress-bar-animated'],
};


function convertB3toB4(props) {
  'use strict';

	console.log('input', props);
	const newProps = props;
  let i;
  let j;
  let s;

  function transform(rule) {
    for (i = 0; i < rule.b3.length; i += 1) {
      if (newProps[rule.field] === rule.b3[i]) newProps[rule.field] = rule.b4[i];
    }
  }

  switch (props['!type']) {
    case 'Alert_bs':
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Breadcrumbs_bs':
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Button_bs':
      if (newProps.appearance === ' btn-default') newProps.outline = 'outline-';
      transform(buttonAppearance);
      transform(buttonSize);
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Checkbox_bs':
      transform(inputValidation);
      transform(checkboxInline);
      delete newProps.headerCols;
      delete newProps.valueCols;
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Datatable_bs':
      break;
    case 'Dropdown_bs':
      if (newProps.appearance === ' btn-default') newProps.outline = 'outline-';
      transform(buttonAppearance);
      transform(buttonSize);
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Fliptoggle_bs':
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'GridColumn_bs':
      break;
    case 'GridRow_bs':
      break;
    case 'Hamburger_bs':
      transform(buttonAppearance);
      transform(buttonSize);
      newProps.icon = 'menu';
      newProps.outline = 'outline-';
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Image_bs':
      transform(imageCenter);
      transform(imageResponsive);
      transform(imageShape);
      break;
    case 'Input_bs':
      transform(inputSize);
      transform(inputValidation);
      // bs3 has titles 2px larger than the input box. They're the same in bs4.
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Jumbotron_bs':
      if (newProps.appearance === ' btn-default') newProps.outline = 'outline-';
      transform(buttonAppearance);
      transform(buttonSize);
      break;
    case 'Label_bs':
      transform(labelAppearance);
      newProps.borderRadius = '2';
      newProps.labelStyle = 'badge';
      if (newProps.fontSize === '') newProps.fontSize = '10.5';
      if (newProps.fontWeight === '') newProps.fontWeight = '700';
      break;
    case 'Listgroup_bs':

      if (newProps.fontSize === '') newProps.fontSize = '14';
      const appears = newProps.appearances.split('\n');
      s = '';
      for (i = 0; i < appears.length; i += 1) {
        for (j = 0; j < listGroupAppearance.b3.length; j += 1) {
          if (appears[i] === listGroupAppearance.b3[j]) s += `${listGroupAppearance.b4[j]}\n`;
        }
      }
      newProps.appearances = s;
      break;
    case 'Media_bs':
      transform(imageCenter);
      transform(imageResponsive);
      transform(imageShape);
      delete newProps.imageHorizontal;
      delete newProps.imageAlignment;
      break;
    case 'Modal_bs':
      delete newProps.footerAlign;
      break;
    case 'Pageheader_bs':
      newProps['!type'] = 'Container';
      unconverted += 1;
      break;
    case 'Pagination_bs':
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Panel_bs':
      newProps['!type'] = 'Container';
      unconverted += 1;
      break;
    case 'Progressbar_bs':
      transform(progressbarAppearance);
      transform(progressbarAnimated);
      break;
    case 'Radiobutton_bs':
      if (newProps.fontSize === '') newProps.fontSize = '14';
      transform(inputValidation);
      delete newProps.headerCols;
      delete newProps.valueCols;
      break;
    case 'Select_bs':
      if (newProps.fontSize === '') newProps.fontSize = '14';
      transform(inputValidation);
      break;
    case 'Slider_bs':
      break;
    case 'Tabs_bs':
      newProps['!type'] = 'Container';
      unconverted += 1;
      break;
    case 'Textarea_bs':
      transform(inputValidation);
      if (newProps.fontSize === '') newProps.fontSize = '14';
      break;
    case 'Thumbnail_bs':
      newProps['!type'] = 'Container';
      unconverted += 1;
      break;
    default:
      console.log('Unknown type', props['!type']);
  }

  newProps['!type'] = props['!type'].replace('_bs', '_bs4');
  console.log('output', newProps);
  return newProps;
}

Button1.onclick = (() => {
  'use strict';

  let i;
  unconverted = 0;
  bs3controls = 0;
  const fileList = read(Input1.value);
  console.log(fileList);
  for (i = 0; i < fileList.length; i += 1) {
    if (fileList[i].includes('/Elements/')) {
      const filename = `${Input1.value}/${fileList[i]}`;
      let props = fs.readJsonSync(filename);
      console.log(filename, fileList[i].props);
      if (props['!type'].substr(props['!type'].length - 3) === '_bs') {
        bs3controls += 1;
        props = convertB3toB4(props);
        fs.writeJsonSync(filename, props, { spaces: 2, EOL: ' \n' });
      }
    }
  }
  NSB.MsgBox(`BS3 Controls: ${bs3controls} Unconverted: ${unconverted}`);
});

Button2.onclick = (() => {
  'use strict';

  fileDialog()
    .then((file) => {
      const path = file[0].path.split('/');
      path.pop();
      console.log(file, path);
      Input1.value = path.join('/');
    });
});
