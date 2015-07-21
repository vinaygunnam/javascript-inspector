function storeCallback(callback) {
  prepareWorkspace();
  let name = generateUniqueName();
  window.inspector.fns[name] = callback;
  return name;
}

function storeResult(result) {
  prepareWorkspace();
  let name = generateUniqueName();
  window.inspector.results[name] = result;
  return name;
}

function prepareWorkspace() {
  window.inspector = window.inspector || {};
  window.inspector.fns = window.inspector.fns || {};
  window.inspector.results = window.inspector.results || {};
}

function generateUniqueName() {
  var now = new Date();
  return now.toString().replace(/[\s:\-\(\)]/gm, '');
}

module.exports = {
  storeCallback,
  storeResult
};
