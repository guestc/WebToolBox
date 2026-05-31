(function() {
  var input = document.getElementById('json-input');
  var output = document.getElementById('json-output');
  var indentSelect = document.getElementById('json-indent');
  var formatBtn = document.getElementById('json-format');
  var minifyBtn = document.getElementById('json-minify');
  var validateBtn = document.getElementById('json-validate');
  var copyBtn = document.getElementById('json-copy');
  var errorDiv = document.getElementById('json-error');

  function getIndent() {
    var v = indentSelect.value;
    return v === 'tab' ? '\t' : parseInt(v, 10);
  }

  function parseInput() {
    var text = input.value.trim();
    if (!text) { showError('请输入 JSON 数据'); return null; }
    try {
      return JSON.parse(text);
    } catch (e) {
      var msg = e.message;
      var match = msg.match(/position\s+(\d+)/i);
      if (match) {
        var pos = parseInt(match[1], 10);
        var line = text.substring(0, pos).split('\n').length;
        msg += ' (约第 ' + line + ' 行)';
      }
      showError(msg);
      return null;
    }
  }

  function showError(msg) {
    if (msg) {
      errorDiv.textContent = msg;
      errorDiv.style.display = 'block';
    } else {
      errorDiv.style.display = 'none';
    }
  }

  function format() {
    showError(null);
    var data = parseInput();
    if (data === null && input.value.trim()) return;
    if (data === null) { output.value = ''; return; }
    output.value = JSON.stringify(data, null, getIndent());
  }

  function minify() {
    showError(null);
    var data = parseInput();
    if (data === null && input.value.trim()) return;
    if (data === null) { output.value = ''; return; }
    output.value = JSON.stringify(data);
  }

  function validate() {
    showError(null);
    try {
      JSON.parse(input.value.trim());
      output.value = '✓ JSON 语法正确';
      window.showToast('JSON 语法正确');
    } catch (e) {
      var msg = e.message;
      var match = msg.match(/position\s+(\d+)/i);
      if (match) {
        var pos = parseInt(match[1], 10);
        var line = input.value.substring(0, pos).split('\n').length;
        msg += ' (约第 ' + line + ' 行)';
      }
      showError(msg);
      output.value = '';
    }
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  formatBtn.addEventListener('click', format);
  minifyBtn.addEventListener('click', minify);
  validateBtn.addEventListener('click', validate);
  copyBtn.addEventListener('click', copy);
})();
