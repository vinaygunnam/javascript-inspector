import InspectorCache from './inspector-cache';

function validateType(argumentText, argType, contextType, methodContext) {
  let isValid = true,
    text = argumentText,
    value = undefined;

  switch (argType) {
    case 'undefined':
      isValid = true;
      text = 'undefined';
      value = undefined;
      break;
    case 'null':
      isValid = true;
      text = 'null';
      value = null;
      break;
    case 'Boolean':
      if (argumentText === 'true' || argumentText === 'false') {
        isValid = true;
        value = argumentText === 'true'
      } else {
        isValid = false;
        value = undefined;
      }
      break;
    case 'Date':
      try {
        var date = new Date(argumentText);
        if (!isNaN(date.getYear())) {
          isValid = true;
          value = date;
        } else {
          isValid = false;
          value = undefined;
        }
      } catch (e) {
        isValid = false;
        value = undefined;
      } finally {

      }
      break;
    case 'Function':
      try {
        var fnName = generateUniqueName();
        if (argumentText && validateFnExpression(argumentText)) {
          InspectorCache.storeCallback(fnName, eval(argumentText));
        } else {
          text = 'function optional_name(/* arguments */) { /* body */ }';
          InspectorCache.storeCallback(fnName, eval(text));
        }

        switch (contextType) {
          case 'method':
            window.inspectorFns[fnName] = window.inspectorFns[fnName].bind(methodContext);
            break;
          case 'window':
            window.inspectorFns[fnName] = window.inspectorFns[fnName].bind(window);
            break;
          case 'null':
          default:
            window.inspectorFns[fnName] = window.inspectorFns[fnName].bind(null);
            break;
        }

        value = window.inspectorFns[fnName];
        isValid = true;
      } catch (e) {
        isValid = false;
        value = undefined;
      } finally {

      }
      break;
    case 'JSON':
      try {
        value = JSON.parse(argumentText);
        isValid = true;
      } catch (e) {
        isValid = false;
        value = undefined;
      } finally {

      }
      break;
    case 'Number':
      if (!isNaN(argumentText)) {
        value = parseFloat(argumentText);
        isValid = true;
      } else {
        isValid = false;
        value = undefined;
      }
      break;
    case 'String':
      isValid = true;
      value = argumentText;
      break;
    default:
      console.error('Unknown argument type:', argType);
      break;
  }

  return {
    isValid,
    text,
    value
  };
}

function validateFnExpression(fnExpr) {
  if (fnExpr) {
    return fnExpr.match(/^function[^()]*\([^()]*\)[\s\S]*\{(.|[\r\n])*\}$/);
  } else {
    return false;
  }
}

function generateUniqueName() {
  var now = new Date();
  return now.toString().replace(/[\s:\-\(\)]/gm, '');
}

module.exports = validateType;
