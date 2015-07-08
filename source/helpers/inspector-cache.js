function storeCallback(name, callback) {
  prepareWorkspace();
  window.inspector.fns[name] = callback;
}

function storeResult(result) {
  prepareWorkspace();
  window.inspector.result = result;
}

function prepareWorkspace() {
  window.inspector = window.inspector || {};
  window.inspector.fns = window.inspector.fns || {};
}

module.exports = {
  storeCallback,
  storeResult
};
