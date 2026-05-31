(function() {
  var urlInput = document.getElementById('curl-url');
  var methodSelect = document.getElementById('curl-method');
  var headersInput = document.getElementById('curl-headers');
  var bodyInput = document.getElementById('curl-body');
  var generateBtn = document.getElementById('generate-btn');
  var clearBtn = document.getElementById('clear-btn');
  var output = document.getElementById('curl-output');
  var copyBtn = document.getElementById('copy-btn');

  function shellEscape(str) {
    if (!str) return '';
    if (/^[a-zA-Z0-9\/\.\-\_\:\=\?\&\%\+\@\!\~\,\;\*]+$/.test(str)) return str;
    return "'" + str.replace(/'/g, "'\\''") + "'";
  }

  function generateCurl() {
    var url = urlInput.value.trim();
    if (!url) {
      window.showToast && window.showToast('请输入请求 URL');
      return;
    }

    var method = methodSelect.value;
    var lines = ['curl'];

    if (method !== 'GET') {
      lines.push('  -X ' + method);
    }

    lines.push('  ' + shellEscape(url));

    var headerText = headersInput.value.trim();
    if (headerText) {
      headerText.split('\n').map(function(s) { return s.trim(); }).filter(Boolean).forEach(function(line) {
        lines.push('  -H ' + shellEscape(line));
      });
    }

    var body = bodyInput.value.trim();
    if (body) {
      lines.push('  -d ' + shellEscape(body));
    }

    output.value = lines.join(' \\\n');
  }

  generateBtn.addEventListener('click', generateCurl);

  clearBtn.addEventListener('click', function() {
    urlInput.value = '';
    methodSelect.value = 'GET';
    headersInput.value = '';
    bodyInput.value = '';
    output.value = '';
  });

  copyBtn.addEventListener('click', function() {
    if (output.value) window.copyToClipboard(output.value);
  });
})();
