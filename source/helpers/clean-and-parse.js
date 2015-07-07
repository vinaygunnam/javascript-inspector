function cleanAndParse(identifier) {
  let validParts = [],
      object = null,
      context = null;
  if (identifier) {
    var identifierParts = identifier.split('->');
    if (identifierParts && identifierParts.length > 1) {
      identifierParts.forEach(function(part, index, collection) {
        if (object && typeof object[part] !== 'undefined') {
          context = object;
          object = object[part];
          validParts.push(part);
        } else if (typeof window[part] !== 'undefined') {
          context = window;
          object = window[part];
          validParts.push(part);
        }
      });
    } else {
      context = window;
      object = window[identifier];
    }
  }

  if (validParts.length) {
    identifier = validParts.reduce((prev, next) => prev + '->' + next);
  }

  return {
    object: object,
    identifier: identifier,
    context: context
  };
}

module.exports = cleanAndParse;
