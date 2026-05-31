(function() {
  var input = document.getElementById('jyaml-input');
  var output = document.getElementById('jyaml-output');
  var direction = document.getElementById('jyaml-direction');
  var convertBtn = document.getElementById('jyaml-convert');
  var swapBtn = document.getElementById('jyaml-swap');
  var copyBtn = document.getElementById('jyaml-copy');

  function toYAML(data, indent) {
    indent = indent || 0;
    var pad = new Array(indent + 1).join(' ');
    if (data === null || data === undefined) return 'null\n';
    if (typeof data === 'boolean') return (data ? 'true' : 'false') + '\n';
    if (typeof data === 'number') return String(data) + '\n';
    if (typeof data === 'string') {
      if (data.indexOf('\n') !== -1) {
        var lines = data.split('\n');
        var result = '|\n';
        lines.forEach(function(line) { result += pad + '  ' + line + '\n'; });
        return result;
      }
      if (/[:{}\[\],&*?|<>=!%@`#'"\n\r]/.test(data) || data === '' || data === 'true' || data === 'false' || data === 'null' || /^[\d.eE+-]/.test(data)) {
        return '"' + data.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"\n';
      }
      return data + '\n';
    }
    if (Array.isArray(data)) {
      if (data.length === 0) return '[]\n';
      var result = '';
      data.forEach(function(item) {
        if (typeof item === 'object' && item !== null) {
          result += pad + '-\n';
          if (Array.isArray(item)) {
            var inner = toYAML(item, indent + 4);
            result += pad + '  ' + inner.trimLeft();
          } else {
            for (var key in item) {
              if (!item.hasOwnProperty(key)) continue;
              var val = toYAML(item[key], indent + 4);
              result += pad + '  ' + key + ': ' + val;
            }
          }
          result += '\n';
        } else {
          result += pad + '- ' + toYAML(item, indent + 2).trim();
        }
      });
      return result;
    }
    if (typeof data === 'object') {
      var keys = Object.keys(data);
      if (keys.length === 0) return '{}\n';
      var result = '';
      keys.forEach(function(key) {
        var val = data[key];
        if (typeof val === 'object' && val !== null) {
          result += pad + key + ':\n' + toYAML(val, indent + 2);
        } else {
          result += pad + key + ': ' + toYAML(val, indent + 2).trimLeft();
        }
      });
      return result;
    }
    return String(data) + '\n';
  }

  function fromYAML(str) {
    var lines = str.split('\n');
    return parseYAMLLines(lines, 0, 0).value;
  }

  function parseYAMLLines(lines, start, minIndent) {
    var result = null;
    var isArray = false;
    var map = {};
    var arr = [];
    var i = start;
    while (i < lines.length) {
      var line = lines[i];
      if (line.trim() === '' || line.trim().charAt(0) === '#') { i++; continue; }
      var indent = line.search(/\S/);
      if (indent < minIndent) break;
      var content = line.substring(indent);
      if (content.charAt(0) === '-') {
        isArray = true;
        var itemContent = content.substring(1).trim();
        if (itemContent === '' || itemContent.indexOf(':') !== -1) {
          if (itemContent === '') {
            var sub = parseYAMLLines(lines, i + 1, indent + 2);
            arr.push(sub.value);
            i = sub.next;
          } else {
            var subMap = {};
            var key = itemContent.split(':')[0].trim();
            var val = itemContent.substring(itemContent.indexOf(':') + 1).trim();
            if (val === '') {
              var sub = parseYAMLLines(lines, i + 1, indent + 2);
              subMap[key] = sub.value;
              i = sub.next;
            } else {
              subMap[key] = parseYAMLValue(val);
              i++;
            }
            arr.push(subMap);
          }
        } else {
          arr.push(parseYAMLValue(itemContent));
          i++;
        }
      } else if (content.indexOf(':') !== -1) {
        var colonIdx = content.indexOf(':');
        var key = content.substring(0, colonIdx).trim();
        var val = content.substring(colonIdx + 1).trim();
        if (val === '' || val === '|' || val === '>') {
          var sub = parseYAMLLines(lines, i + 1, indent + 2);
          if (val === '|' || val === '>') {
            map[key] = sub.value;
          } else {
            map[key] = sub.value;
          }
          i = sub.next;
        } else {
          map[key] = parseYAMLValue(val);
          i++;
        }
      } else {
        i++;
      }
    }
    if (isArray) {
      result = arr;
    } else if (Object.keys(map).length > 0) {
      result = map;
    }
    return { value: result, next: i };
  }

  function parseYAMLValue(str) {
    if (str === 'null' || str === '~' || str === '') return null;
    if (str === 'true') return true;
    if (str === 'false') return false;
    if (/^-?\d+$/.test(str)) return parseInt(str, 10);
    if (/^-?\d+\.\d+([eE][+-]?\d+)?$/.test(str)) return parseFloat(str);
    if (/^0x[0-9a-fA-F]+$/.test(str)) return parseInt(str, 16);
    if (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
      return str.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r');
    }
    if (str.charAt(0) === "'" && str.charAt(str.length - 1) === "'") {
      return str.slice(1, -1).replace(/''/g, "'");
    }
    if (str === '[]') return [];
    if (str === '{}') return {};
    return str;
  }

  function convertJSON2YAML() {
    var text = input.value.trim();
    if (!text) return;
    try {
      var data = JSON.parse(text);
      output.value = toYAML(data).trimRight();
    } catch (e) {
      window.showToast('JSON 解析错误: ' + e.message);
    }
  }

  function convertYAML2JSON() {
    var text = input.value.trim();
    if (!text) return;
    try {
      var data = fromYAML(text);
      output.value = JSON.stringify(data, null, 2);
    } catch (e) {
      window.showToast('YAML 解析错误: ' + e.message);
    }
  }

  function convert() {
    if (direction.value === 'json2yaml') convertJSON2YAML();
    else convertYAML2JSON();
  }

  function swap() {
    var tmp = input.value;
    input.value = output.value;
    output.value = tmp;
    direction.value = direction.value === 'json2yaml' ? 'yaml2json' : 'json2yaml';
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
