(function() {
  var input = document.getElementById('jcsv-input');
  var output = document.getElementById('jcsv-output');
  var direction = document.getElementById('jcsv-direction');
  var delimiter = document.getElementById('jcsv-delimiter');
  var convertBtn = document.getElementById('jcsv-convert');
  var swapBtn = document.getElementById('jcsv-swap');
  var copyBtn = document.getElementById('jcsv-copy');

  function flatten(obj, prefix) {
    prefix = prefix || '';
    var result = {};
    for (var key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      var fullKey = prefix ? prefix + '.' + key : key;
      if (obj[key] !== null && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        var nested = flatten(obj[key], fullKey);
        for (var k in nested) { if (nested.hasOwnProperty(k)) result[k] = nested[k]; }
      } else if (Array.isArray(obj[key])) {
        result[fullKey] = JSON.stringify(obj[key]);
      } else {
        result[fullKey] = obj[key];
      }
    }
    return result;
  }

  function escapeCSV(val, delim) {
    var s = String(val === null || val === undefined ? '' : val);
    if (s.indexOf(delim) !== -1 || s.indexOf('"') !== -1 || s.indexOf('\n') !== -1) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  function parseCSVLine(line, delim) {
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

  function json2csv() {
    var text = input.value.trim();
    if (!text) return;
    try {
      var data = JSON.parse(text);
      if (!Array.isArray(data)) data = [data];
      if (data.length === 0) { output.value = ''; return; }
      var flat = data.map(function(item) { return flatten(item); });
      var headers = {};
      flat.forEach(function(row) { for (var k in row) { if (row.hasOwnProperty(k)) headers[k] = true; } });
      var headerArr = Object.keys(headers);
      var delim = delimiter.value;
      var lines = [headerArr.map(function(h) { return escapeCSV(h, delim); }).join(delim)];
      flat.forEach(function(row) {
        var vals = headerArr.map(function(h) { return escapeCSV(row[h], delim); });
        lines.push(vals.join(delim));
      });
      output.value = lines.join('\n');
    } catch (e) {
      window.showToast('JSON 解析错误: ' + e.message);
    }
  }

  function csv2json() {
    var text = input.value.trim();
    if (!text) return;
    var delim = delimiter.value;
    var lines = text.split('\n');
    if (lines.length < 2) { window.showToast('CSV 至少需要两行（表头+数据）'); return; }
    var headers = parseCSVLine(lines[0], delim);
    var result = [];
    for (var i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      var vals = parseCSVLine(lines[i], delim);
      var obj = {};
      headers.forEach(function(h, idx) {
        var val = vals[idx] || '';
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (val !== '' && !isNaN(val) && val.trim() !== '') val = Number(val);
        obj[h] = val;
      });
      result.push(obj);
    }
    output.value = JSON.stringify(result, null, 2);
  }

  function convert() {
    if (direction.value === 'json2csv') json2csv();
    else csv2json();
  }

  function swap() {
    var tmp = input.value;
    input.value = output.value;
    output.value = tmp;
    direction.value = direction.value === 'json2csv' ? 'csv2json' : 'json2csv';
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  convertBtn.addEventListener('click', convert);
  swapBtn.addEventListener('click', swap);
  copyBtn.addEventListener('click', copy);
})();
