/* global
  fs
  read
  JQMtoBS4
  projectPath
  sep
  Card1_text
  Input1
*/

/* eslint-disable no-console */

JQMtoBS4.convert = (() => {
  'use strict';

  Card1_text.innerHTML = `This app converts all controls of a jQuery Mobile project to Bootstrap 4. 

  The new controls will be styled as BS4 controls, which means they will have a different design
  than jQuery Mobile. This is deliberate: the BS4 controls reflect current web design,
  not what was being done in 2014, when JQM was last updated.
  <p><b>Notes</b>
  All controls are converted, with the exception of controls which have no matching Bootstrap 4 control:
  These are:
  <ul>
  <li>Collapsible
  <li>Panel
  <li>Popup
  <li>Tooltip
  </ul>

  All controls will have some differences. Listgroup does convert, but the Bootstrap 4 version does
  have all the same features.<br>

  <p>The converter will replace these controls with a simple Container of the same name and dimensions.
  You will need to replace these controls with a Bootstrap 4 control which works similarly.
  <ul>
  You should test different screen widths to find issues.
  `;

  let i;
  let unconverted = 0;
  let unconvertedList = '';
  let controls = 0;

  function convertProjectJQMtoB4() {
    const project = fs.readJsonSync(projectPath);
    if (project.children[0].BootstrapTheme === 'paper' || project.children[0].BootstrapTheme === 'readable') {
      project.children[0].BootstrapTheme = 'bootstrap';
      fs.writeJsonSync(projectPath, project, { spaces: 2, EOL: ' \n' });
    }
  }

  function convertElementJQMtoB4(props, filename) {
    console.log('input', props);
    const newProps = {};
    let j;

    function copyFields() {
      let ii;
      const fields = ['autocapitalize', 'autocomplete', 'autocorrect', 'ChangeForm', 'backgroundColor', 'borderColor', 'borderStyle', 'borderWidth',
        'bottom', 'class', 'color', 'disabled', 'display', 'fontFamily', 'fontSize',
        'fontStyle', 'fontWeight', 'height', 'hidden', 'icon', 'id', 'left', 'name', 'onclick',
        'oncopy', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseup', 'ontouchend',
        'ontouchmove', 'ontouchstart', 'placeholder', 'readonly', 'right', 'script', 'style', 'top', 'value', 'width'];

      for (ii = 0; ii < fields.length; ii += 1) {
        // copy all eligible fields with values
        if (props[fields[ii]]) newProps[fields[ii]] = props[fields[ii]];
      }
    }

    copyFields();

    switch (props['!type']) {
      case 'Button_jqm14':
        newProps['!type'] = 'Button_bs4';
        newProps.outline = 'outline-';
        if (props.mini === 'ui-mini') newProps.size = ' btn-sm';
        break;

      case 'Checkbox_jqm14':
        newProps['!type'] = 'Checkbox_bs4';
        newProps.header = '';
        newProps.headerCols = 0;
        newProps.valueCols = 12;
        newProps.items = props.options.replace(/,/g, '\n');
        if (props.orientation === 'horizontal') newProps.inline = ' inline';
        break;

      case 'Collapsible_jqm14':
        newProps['!type'] = 'Container_bs4';
        unconverted += 1;
        unconvertedList += `${newProps.id}, `;
        break;

      case 'FlipToggle_jqm14':
        newProps['!type'] = 'Fliptoggle_bs4';
        if (props.mini === 'ui-mini') newProps.size = ' btn-sm';
        newProps.text = props.titleRight;
        break;

      case 'FooterBar_jqm14':
        newProps['!type'] = 'Navs_bs4';
        newProps.tabStyle = ' nav-tabs';
        newProps.items = props.items.replace(/,/g, '\n');
        newProps.top = 'auto';
        newProps.left = '0';
        newProps.bottom = '0';
        break;

      case 'HeaderBar_jqm14':
        newProps['!type'] = 'Header';
        newProps.height = '40';
        if (props.leftButtonName !== '' || props.leftButtonIconPos !== 'none') {
          const id = `${props.id}_btnLeft`;
          newProps.position = 'absolute';
          newProps.children = [];
          newProps.children.push({
            '!type': 'External',
            file: [
              'forms',
              filename.split(sep)[filename.split(sep).length - 3],
              'Elements',
              `${id}.json`,
            ],
          });
          // create new element for the button
          const buttonProps = {
            '!type': 'Button_bs4',
            ChangeForm: props.leftChangeForm,
            appearance: ' btn-secondary',
            icon: props.leftButtonIcon,
            id,
            left: '0',
            mAll: '4',
            size: ' btn-sm',
            value: props.leftButtonName,
          };
          const buttonFile = filename.replace(`${props.id}.json`, `${id}.json`);
          console.log('--->', buttonFile, buttonProps);
          fs.writeJsonSync(buttonFile, buttonProps, { spaces: 2, EOL: ' \n' });
        }
        if (props.rightButtonName !== '' || props.rightButtonIconPos !== 'none') {
          const id = `${props.id}_btnRight`;
          newProps.children.push({
            '!type': 'External',
            file: [
              'forms',
              filename.split(sep)[filename.split(sep).length - 3],
              'Elements',
              `${id}.json`,
            ],
          });
          // create new element for the button
          const buttonProps = {
            '!type': 'Button_bs4',
            ChangeForm: props.rightChangeForm,
            appearance: ' btn-secondary',
            icon: props.rightButtonIcon,
            id,
            left: 'auto',
            mAll: '4',
            right: '0',
            size: ' btn-sm',
            value: props.rightButtonName,
          };
          const buttonFile = filename.replace(`${props.id}.json`, `${id}.json`);
          console.log('--->', buttonFile, buttonProps);
          fs.writeJsonSync(buttonFile, buttonProps, { spaces: 2, EOL: ' \n' });
        }
        break;

      case 'List_jqm14':
        newProps['!type'] = 'Listgroup_bs4';
        newProps.appearances = '';
        newProps.items = props.items.replace(/,/g, '\n');
        newProps.itemBadges = '';
        newProps.icons = '';
        for (j = 0; j < props.items.split(',').length; j += 1) {
          newProps.icons += 'arrow-circle-right\n';
        }
        break;

      case 'NavBar_jqm14':
        newProps['!type'] = 'Navs_bs4';
        newProps.tabStyle = ' nav-tabs';
        newProps.items = props.items.replace(/,/g, '\n');
        break;

      case 'Panel_jqm14':
        newProps['!type'] = 'Card_bs4';
        break;

      case 'Popup_jqm14':
        newProps['!type'] = 'Container_bs4';
        unconverted += 1;
        unconvertedList += `${newProps.id}, `;
        break;

      case 'RadioButton_jqm14':
        newProps['!type'] = 'Radiobutton_bs4';
        newProps.header = '';
        newProps.headerCols = 0;
        newProps.valueCols = 12;
        newProps.items = props.items.replace(/,/g, '\n');
        if (props.orientation === 'horizontal') newProps.inline = ' inline';
        break;

      case 'Select_jqm14':
        newProps['!type'] = 'Select_bs4';
        newProps.header = '';
        newProps.headerCols = 0;
        newProps.valueCols = 12;
        newProps.items = props.items.replace(/,/g, '\n');
        newProps.values = props.values.replace(/,/g, '\n');
        newProps.multiSelect = props.multiSelect;
        newProps.icon = props.icon;
        break;

      case 'Slider_jqm14':
        newProps['!type'] = 'Slider_bs4';
        if (props.mini === 'ui-mini') newProps.size = ' btn-sm';
        newProps.max = props.max;
        newProps.min = props.min;
        newProps.step = props.step;
        newProps.value = props.value;
        break;

      case 'Textarea_jqm14':
        newProps['!type'] = 'Textarea_bs4';
        newProps.header = '';
        newProps.headerCols = 0;
        newProps.valueCols = 12;
        break;

      case 'TextBox_jqm14':
        newProps['!type'] = 'Input_bs4';
        newProps.header = '';
        newProps.headerCols = 0;
        newProps.valueCols = 12;
        break;

      case 'Tooltip_jqm14':
        newProps['!type'] = 'Container_bs4';
        unconverted += 1;
        unconvertedList += `${newProps.id}, `;
        break;

      default:
        console.log('Unknown type', props['!type']);
    }

    console.log('output', newProps);
    return newProps;
  }

  convertProjectJQMtoB4();

  const fileList = read(Input1.value);
  for (i = 0; i < fileList.length; i += 1) {
    if (fileList[i].includes(`${sep}Elements${sep}`)) {
      const filename = `${Input1.value}${sep}${fileList[i]}`;
      let props = fs.readJsonSync(filename);
      console.log(filename, props);
      if (props['!type'].substr(props['!type'].length - 6) === '_jqm14') {
        controls += 1;
        props = convertElementJQMtoB4(props, filename);
        fs.writeJsonSync(filename, props, { spaces: 2, EOL: ' \n' });
      }
    }
  }
  NSB.MsgBox(`jQM Controls: ${controls} Unconverted: ${unconverted} ${unconvertedList}`);
});
