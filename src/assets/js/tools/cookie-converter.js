(function() {
  var inputEl = document.getElementById('cookie-input');
  var outputEl = document.getElementById('cookie-output');
  var fromFormat = document.getElementById('from-format');
  var toFormat = document.getElementById('to-format');
  var convertBtn = document.getElementById('convert-btn');
  var swapBtn = document.getElementById('swap-btn');
  var copyBtn = document.getElementById('copy-btn');

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
      return arr.map(function(c) { return { name: c.name || c.Name || '', value: c.value || c.Value || '' }; });
    } catch(e) { showToast('JSON解析失败'); return []; }
  }

  function parseNetscape(str) {
    return str.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l && !l.startsWith('#'); }).map(function(l) {
      var p = l.split('\t');
      if (p.length >= 7) return { name: p[5], value: p[6] };
      return null;
    }).filter(Boolean);
  }

  function toHeader(arr) { return 'Cookie: ' + arr.map(function(c) { return c.name + '=' + c.value; }).join('; '); }
  function toJson(arr) { return JSON.stringify(arr, null, 2); }
  function toNetscape(arr) {
    return arr.map(function(c) { return ['.example.com', 'TRUE', '/', 'FALSE', '0', c.name, c.value].join('\t'); }).join('\n');
  }

  var parsers = { header: parseHeader, json: parseJson, netscape: parseNetscape };
  var formatters = { header: toHeader, json: toJson, netscape: toNetscape };

  convertBtn.addEventListener('click', function() {
    var parsed = parsers[fromFormat.value](inputEl.value);
    if (!parsed.length) { showToast('未解析到Cookie'); return; }
    outputEl.value = formatters[toFormat.value](parsed);
    showToast('转换完成，共 ' + parsed.length + ' 个Cookie');
  });

  swapBtn.addEventListener('click', function() {
    var tmp = fromFormat.value;
    fromFormat.value = toFormat.value;
    toFormat.value = tmp;
    var tmpText = inputEl.value;
    inputEl.value = outputEl.value;
    outputEl.value = tmpText;
  });

  copyBtn.addEventListener('click', function() {
    if (outputEl.value) copyToClipboard(outputEl.value);
  });
})();
