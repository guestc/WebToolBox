(function() {
  var curlInput = document.getElementById('curl-input');
  var langSelect = document.getElementById('lang-select');
  var convertBtn = document.getElementById('convert-btn');
  var clearBtn = document.getElementById('clear-btn');
  var output = document.getElementById('code-output');
  var copyBtn = document.getElementById('copy-btn');

  function parseCurl(str) {
    str = str.replace(/\\\n/g, ' ').replace(/\s+/g, ' ').trim();
    var result = { url: '', method: 'GET', headers: [], data: '' };

    var urlMatch = str.match(/curl\s+(?:[^'"\s]+\s+)*['"]?(https?:\/\/[^\s'"]+)['"]?/i);
    if (urlMatch) result.url = urlMatch[1].replace(/['"]/g, '');

    var methodMatch = str.match(/-X\s+['"]?(\w+)['"]?/i);
    if (methodMatch) result.method = methodMatch[1].toUpperCase();

    var headerRegex = /-H\s+['"]([^'"]+)['"]/gi;
    var hm;
    while ((hm = headerRegex.exec(str)) !== null) {
      var colonIdx = hm[1].indexOf(':');
      if (colonIdx !== -1) {
        result.headers.push({
          key: hm[1].substring(0, colonIdx).trim(),
          value: hm[1].substring(colonIdx + 1).trim()
        });
      }
    }

    var dataMatch = str.match(/(?:-d|--data|--data-raw)\s+['"](.+?)['"]/is);
    if (dataMatch) result.data = dataMatch[1];

    if (!result.method && result.data) result.method = 'POST';

    return result;
  }

  function generatePython(curl) {
    var lines = ['import requests', '', 'url = ' + JSON.stringify(curl.url)];

    if (curl.headers.length) {
      lines.push('', 'headers = {');
      curl.headers.forEach(function(h) {
        lines.push('    ' + JSON.stringify(h.key) + ': ' + JSON.stringify(h.value) + ',');
      });
      lines.push('}');
    }

    if (curl.data) {
      lines.push('', 'data = ' + JSON.stringify(curl.data));
    }

    lines.push('');
    var call = 'response = requests.' + curl.method.toLowerCase() + '(url';
    if (curl.headers.length) call += ', headers=headers';
    if (curl.data) call += ', data=data';
    call += ')';
    lines.push(call);
    lines.push('', 'print(response.status_code)', 'print(response.text)');
    return lines.join('\n');
  }

  function generateJavaScript(curl) {
    var lines = ['const url = ' + JSON.stringify(curl.url) + ';', '', 'const options = {'];
    lines.push('  method: ' + JSON.stringify(curl.method) + ',');

    if (curl.headers.length) {
      lines.push('  headers: {');
      curl.headers.forEach(function(h) {
        lines.push('    ' + JSON.stringify(h.key) + ': ' + JSON.stringify(h.value) + ',');
      });
      lines.push('  },');
    }

    if (curl.data) {
      lines.push('  body: ' + JSON.stringify(curl.data) + ',');
    }

    lines.push('};', '', 'const response = await fetch(url, options);');
    lines.push('const data = await response.text();');
    lines.push('console.log(response.status);', 'console.log(data);');
    return lines.join('\n');
  }

  function generatePHP(curl) {
    var lines = ['<?php', '', '$ch = curl_init();', '', 'curl_setopt_array($ch, ['];
    lines.push('    CURLOPT_URL => ' + varExport(curl.url) + ',');
    lines.push('    CURLOPT_RETURNTRANSFER => true,');
    lines.push('    CURLOPT_CUSTOMREQUEST => ' + varExport(curl.method) + ',');

    if (curl.headers.length) {
      lines.push('    CURLOPT_HTTPHEADER => [');
      curl.headers.forEach(function(h) {
        lines.push('        ' + varExport(h.key + ': ' + h.value) + ',');
      });
      lines.push('    ],');
    }

    if (curl.data) {
      lines.push('    CURLOPT_POSTFIELDS => ' + varExport(curl.data) + ',');
    }

    lines.push(']);', '', '$response = curl_exec($ch);', '$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);', 'curl_close($ch);', '', 'echo $httpCode . "\\n";', 'echo $response;');
    return lines.join('\n');
  }

  function varExport(s) {
    return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  }

  function generateNodejs(curl) {
    var lines = ['const url = ' + JSON.stringify(curl.url) + ';', '', 'const options = {'];
    lines.push('  method: ' + JSON.stringify(curl.method) + ',');

    if (curl.headers.length) {
      lines.push('  headers: {');
      curl.headers.forEach(function(h) {
        lines.push('    ' + JSON.stringify(h.key) + ': ' + JSON.stringify(h.value) + ',');
      });
      lines.push('  },');
    }

    if (curl.data) {
      lines.push('  body: ' + JSON.stringify(curl.data) + ',');
    }

    lines.push('};', '', 'const response = await fetch(url, options);');
    lines.push('const data = await response.text();');
    lines.push('console.log(response.status);', 'console.log(data);');
    return lines.join('\n');
  }

  function generateGo(curl) {
    var lines = ['package main', '', 'import (', '\t"fmt"', '\t"io"', '\tnethttp "net/http"', '\t"strings"', ')', '', 'func main() {'];

    if (curl.data) {
      lines.push('\tbody := strings.NewReader(' + JSON.stringify(curl.data) + ')');
      lines.push('\treq, err := nethttp.NewRequest(' + JSON.stringify(curl.method) + ', ' + JSON.stringify(curl.url) + ', body)');
    } else {
      lines.push('\treq, err := nethttp.NewRequest(' + JSON.stringify(curl.method) + ', ' + JSON.stringify(curl.url) + ', nil)');
    }

    lines.push('\tif err != nil {', '\t\tpanic(err)', '\t}');

    curl.headers.forEach(function(h) {
      lines.push('\treq.Header.Set(' + JSON.stringify(h.key) + ', ' + JSON.stringify(h.value) + ')');
    });

    lines.push('', '\tresp, err := nethttp.DefaultClient.Do(req)', '\tif err != nil {', '\t\tpanic(err)', '\t}', '\tdefer resp.Body.Close()', '', '\tdata, _ := io.ReadAll(resp.Body)', '\tfmt.Println(resp.StatusCode)', '\tfmt.Println(string(data))', '}');
    return lines.join('\n');
  }

  function convert() {
    var str = curlInput.value.trim();
    if (!str) {
      window.showToast && window.showToast('请输入 cURL 命令');
      return;
    }
    if (!str.toLowerCase().startsWith('curl')) {
      window.showToast && window.showToast('输入的不是有效的 cURL 命令');
      return;
    }

    var curl = parseCurl(str);
    if (!curl.url) {
      window.showToast && window.showToast('无法解析 URL，请检查 cURL 命令');
      return;
    }

    var lang = langSelect.value;
    var code;
    switch (lang) {
      case 'python': code = generatePython(curl); break;
      case 'javascript': code = generateJavaScript(curl); break;
      case 'php': code = generatePHP(curl); break;
      case 'nodejs': code = generateNodejs(curl); break;
      case 'go': code = generateGo(curl); break;
      default: code = generateJavaScript(curl);
    }

    output.value = code;
    window.showToast && window.showToast('转换成功');
  }

  convertBtn.addEventListener('click', convert);

  clearBtn.addEventListener('click', function() {
    curlInput.value = '';
    output.value = '';
  });

  copyBtn.addEventListener('click', function() {
    if (output.value) window.copyToClipboard(output.value);
  });
})();
