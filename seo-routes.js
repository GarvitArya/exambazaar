module.exports = function (request) {
  if (request.path === '/') return true;
  return false;
}