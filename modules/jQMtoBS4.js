/* global
  fs
  projectPath
*/

function convertProjectJQMtoB4() {
  'use strict';

  const project = fs.readJsonSync(projectPath);
  if (project.children[0].BootstrapTheme === 'paper' || project.children[0].BootstrapTheme === 'readable') {
    project.children[0].BootstrapTheme = 'bootstrap';
    fs.writeJsonSync(projectPath, project, { spaces: 2, EOL: ' \n' });
  }
}

function convertElementJQMtoB4(props) {
  'use strict';

  console.log('input', props);
  const newProps = {};

  function copyFields() {
    let i;
    const fields = ['autocapitalize', 'autocomplete', 'autocorrect', 'ChangeForm', 'backgroundColor', 'borderColor', 'borderStyle', 'borderWidth',
      'bottom', 'class', 'color', 'disabled', 'display', 'fontFamily', 'fontSize',
      'fontStyle', 'fontWeight', 'height', 'hidden', 'icon', 'id', 'left', 'name', 'onclick',
      'oncopy', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseup', 'ontouchend',
      'ontouchmove', 'ontouchstart', 'placeholder', 'readonly', 'right', 'script', 'style', 'top', 'value', 'width'];

    for (i = 0; i < fields.length; i += 1) {
      // copy all eligible fields with values
      if (props[fields[i]]) newProps[fields[i]] = props[fields[i]];
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
      break;
    case 'Collapsible_jqm14':
      newProps['!type'] = 'Container_bs4';
      unconverted += 1;
      unconvertedList += `${newProps.id}, `;
      break;
    case 'FlipToggle_jqm14':
      newProps['!type'] = 'Fliptoggle_bs4';
      break;
    case 'FooterBar_jqm14':
      newProps['!type'] = 'Navs_bs4';
      break;
    case 'HeaderBar_jqm14':
      newProps['!type'] = 'Header';
      break;
    case 'List_jqm14':
      newProps['!type'] = 'Listgroup_bs4';
      break;
    case 'NavBar_jqm14':
      newProps['!type'] = 'Navs_bs4';
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
      break;
    case 'Select_jqm14':
      newProps['!type'] = 'Select_bs4';
      break;
    case 'Slider_jqm14':
      newProps['!type'] = 'Slider_bs4';
      break;
    case 'Textarea_jqm14':
      newProps['!type'] = 'Textarea_bs4';
      newProps.header = '';
      break;
    case 'TextBox_jqm14':
      newProps['!type'] = 'Input_bs4';
      newProps.header = '';
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
