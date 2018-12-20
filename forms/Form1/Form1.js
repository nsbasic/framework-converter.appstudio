/* global
  Button1
*/

/* eslint no-undef: 'error' */
/* eslint-env node */

const read = require('fs-readdir-recursive');

const fs = require('fs-extra');

const samplesDir = '/Users/george/samples/BASIC/3. Controls/Bootstrap 3';

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
  b4: [' secondary', 'primary', 'success', 'info', 'warning', 'danger'],
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

  const newProps = props;

  function transform(rule) {
    let i;
    for (i = 0; i < rule.b3.length; i += 1) {
      console.log(i, rule.field, newProps[rule.field], rule.b3[i], rule.b4[i]);
      if (newProps[rule.field] === rule.b3[i]) newProps[rule.field] = rule.b4[i];
    }
  }

  switch (props['!type']) {
    case 'Alert_bs':
      break;
    case 'Breadcrumbs_bs':
      break;
    case 'Button_bs':
      if (newProps.appearance === ' btn-default') newProps.outline = 'outline-';
      transform(buttonAppearance);
      transform(buttonSize);
      break;
    case 'Checkbox_bs':
      transform(inputValidation);
      transform(checkboxInline);
      delete newProps.headerCols;
      delete newProps.valueCols;
      break;
    case 'Datatable_bs':
      break;
    case 'Dropdown_bs':
      transform(buttonAppearance);
      transform(buttonSize);
      break;
    case 'Fliptoggle_bs':
      break;
    case 'GridColumn_bs':
      break;
    case 'GridRow_bs':
      break;
    case 'Hamburger_bs':
      transform(buttonAppearance);
      transform(buttonSize);
      newProps.icon = 'menu';
      break;
    case 'Image_bs':
      transform(imageCenter);
      transform(imageResponsive);
      transform(imageShape);
      break;
    case 'Input_bs':
      transform(inputSize);
      transform(inputValidation);
      break;
    case 'Jumbotron_bs':
      if (newProps.appearance === ' btn-default') newProps.outline = 'outline-';
      transform(buttonAppearance);
      transform(buttonSize);
      break;
    case 'Label_bs':
      transform(labelAppearance);
      newProps.borderRadius = '4';
      newProps.labelStyle = 'badge';
      break;
    case 'Listgroup_bs':
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
      break;
    case 'Pagination_bs':
      break;
    case 'Panel_bs':
      newProps['!type'] = 'Container';
      break;
    case 'Progressbar_bs':
      transform(progressbarAppearance);
      transform(progressbarAnimated);
      break;
    case 'Radiobutton_bs':
      transform(inputValidation);
      delete newProps.headerCols;
      delete newProps.valueCols;
      break;
    case 'Select_bs':
      transform(inputValidation);
      break;
    case 'Slider_bs':
      break;
    case 'Tabs_bs':
      newProps['!type'] = 'Container';
      break;
    case 'Textarea_bs':
      transform(inputValidation);
      break;
    case 'Thumbnail_bs':
      newProps['!type'] = 'Container';
      break;
    default:
      console.log('Unknown type', props['!type']);
  }

  newProps['!type'] = props['!type'].replace('_bs', '_bs4');
  console.log('output', props, newProps);
  return newProps;
}

Button1.onclick = (() => {
  'use strict';

  let i;
  const fileList = read(samplesDir);
  console.log(read(samplesDir));
  for (i = 0; i < fileList.length; i += 1) {
    if (fileList[i].includes('/Elements/')) {
      console.log(fileList[i]);
      let props = fs.readJsonSync(`${samplesDir}/${fileList[i]}`);
      if (props['!type'].substr(props['!type'].length - 3) === '_bs') {
        props = convertB3toB4(props);
        console.log('writing to', `${samplesDir}/${fileList[i]}`, 2);
        fs.writeJsonSync(`${samplesDir}/${fileList[i]}`, props, { spaces: 2, EOL: ' \n' });
      }
    }
  }
});
