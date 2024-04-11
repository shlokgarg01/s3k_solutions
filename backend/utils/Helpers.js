const SortObjectByKeys = (obj) => {
  const entries = Object.entries(obj);
  entries.sort((a, b) => a[0].localeCompare(b[0]));
  return Object.fromEntries(entries);
}

module.exports = {SortObjectByKeys}