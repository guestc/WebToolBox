(function() {
  var input = document.getElementById('csvd-input');
  var output = document.getElementById('csvd-output');
  var fromSelect = document.getElementById('csvd-from');
  var toSelect = document.getElementById('csvd-to');
  var quotedCheck = document.getElementById('csvd-quoted');
  var convertBtn = document.getElementById('csvd-convert');
  var swapBtn = document.getElementById('csvd-swap');
  var copyBtn = document.getElementById('csvd-copy');

  function parseLine(line, delim) {
    if (!quotedCheck.checked) return line.split(delim);
    var result = [];
    var current = '';
    var inQuotes = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === delim) {
          result.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
    }
    result.push(current);
    return result;
  }

  function escapeField(val, delim) {
    var s = String(val);
    if (s.indexOf(delim) !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  function convert() {
    var text = input.value;
    if (!text) { output.value = ''; return; }
    var fromDelim = fromSelect.value;
    var toDelim = toSelect.value;
    var lines = text.split('\n');
    var result = lines.map(function(line) {
      var fields = parseLine(line, fromDelim);
      return fields.map(function(f) { return escapeField(f, toDelim); }).join(toDelim);
    });
    output.value = result.join('\n');
  }

  function swapDelimiters() {
    var tmp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tmp;
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  convertBtn.addEventListener('click', convert);
  swapBtn.addEventListener('click', swapDelimiters);
  copyBtn.addEventListener('click', copy);
})();
