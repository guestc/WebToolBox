(function() {
  var input = document.getElementById('cookie-input');
  var inputFormat = document.getElementById('input-format');
  var outputFormat = document.getElementById('output-format');
  var importBtn = document.getElementById('import-btn');
  var clearBtn = document.getElementById('clear-btn');
  var exportBtn = document.getElementById('export-btn');
  var copyBtn = document.getElementById('copy-btn');
  var output = document.getElementById('export-output');
  var parsed = [];

  function parseHeader(str) {
    str = str.replace(/^Cookie:\s*/i, '');
    return str.split(';').map(function(s) { return s.trim(); }).filter(Boolean).map(function(pair) {
      var idx = pair.indexOf('=');
      if (idx === -1) return null;
      return { name: pair.substring(0, idx).trim(), value: pair.substring(idx + 1).trim() };
    }).filter(Boolean);
  }

  function parseJson(str) {
    try {
      var arr = JSON.parse(str);
      if (!Array.isArray(arr)) arr = [arr];
      return arr.map(function(c) {
        return { name: c.name || c.Name || '', value: c.value || c.Value || '' };
      });
    } catch(e) { showToast('JSON解析失败'); return []; }
  }

  function parseNetscape(str) {
    return str.split('\n').map(function(line) { return line.trim(); }).filter(function(line) {
      return line && !line.startsWith('#');
    }).map(function(line) {
      var parts = line.split('\t');
      if (parts.length >= 7) return { name: parts[5], value: parts[6] };
      if (parts.length >= 2) return { name: parts[0], value: parts[1] };
      return null;
    }).filter(Boolean);
  }

  function toHeader(arr) {
    return 'Cookie: ' + arr.map(function(c) { return c.name + '=' + c.value; }).join('; ');
  }

  function toJson(arr) {
    return JSON.stringify(arr.map(function(c) { return { name: c.name, value: c.value }; }), null, 2);
  }

  function toNetscape(arr) {
    var domain = '.example.com';
    return arr.map(function(c) {
      return [domain, 'TRUE', '/', 'FALSE', '0', c.name, c.value].join('\t');
    }).join('\n');
  }

  importBtn.addEventListener('click', function() {
    var fmt = inputFormat.value;
    if (fmt === 'header') parsed = parseHeader(input.value);
    else if (fmt === 'json') parsed = parseJson(input.value);
    else parsed = parseNetscape(input.value);
    showToast('导入 ' + parsed.length + ' 个Cookie');
  });

  exportBtn.addEventListener('click', function() {
    if (!parsed.length) { showToast('请先导入Cookie'); return; }
    var fmt = outputFormat.value;
    if (fmt === 'header') output.value = toHeader(parsed);
    else if (fmt === 'json') output.value = toJson(parsed);
    else output.value = toNetscape(parsed);
  });

  clearBtn.addEventListener('click', function() {
    parsed = [];
    input.value = '';
    output.value = '';
  });

  copyBtn.addEventListener('click', function() {
    if (output.value) copyToClipboard(output.value);
  });
})();
