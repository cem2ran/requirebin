var nets = require('nets');

module.exports = getGistFiles

function getGistFiles(gist, keys, callback) {
  var files = gist.data.files
  var truncated = keys.filter(function(name) {
    return files[name] && files[name].truncated
  })
  if (truncated.length === 0) return callback(err)
  !function get() {
    var file = truncated.pop();
    if (!file) return callback(null, gist)
    nets({url: files[file].raw_url}, done)

    function done(err, _, content) {
      if (err) return callback(err)
      files[file].content = content
      setTimeout(get);
    }
  }()
}

