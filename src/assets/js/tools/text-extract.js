(function() {
  var input = document.getElementById('extract-input');
  var output = document.getElementById('extract-output');
  var countSpan = document.getElementById('extract-count');
  var extractBtn = document.getElementById('extract-btn');
  var copyBtn = document.getElementById('extract-copy');

  var PATTERNS = {
    email: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
    url: /https?:\/\/[^\s<>"{}|\\^`[\]]+/g,
    phone: /(?:\+?86)?1[3-9]\d{9}/g,
    ip: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
    chinese: /[\u4e00-\u9fff]+/g,
    number: /-?\d+\.?\d*/g
  };

  function extract() {
    var text = input.value;
    if (!text) { output.value = ''; countSpan.textContent = ''; return; }
    var results = [];
    if (document.getElementById('ext-email').checked) {
      var m = text.match(PATTERNS.email);
      if (m) results = results.concat(m);
    }
    if (document.getElementById('ext-url').checked) {
      var m = text.match(PATTERNS.url);
      if (m) results = results.concat(m);
    }
    if (document.getElementById('ext-phone').checked) {
      var m = text.match(PATTERNS.phone);
      if (m) results = results.concat(m);
    }
    if (document.getElementById('ext-ip').checked) {
      var m = text.match(PATTERNS.ip);
      if (m) results = results.concat(m);
    }
    if (document.getElementById('ext-chinese').checked) {
      var m = text.match(PATTERNS.chinese);
      if (m) results = results.concat(m);
    }
    if (document.getElementById('ext-number').checked) {
      var m = text.match(PATTERNS.number);
      if (m) results = results.concat(m);
    }
    output.value = results.join('\n');
    countSpan.textContent = '共提取 ' + results.length + ' 项';
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  extractBtn.addEventListener('click', extract);
  copyBtn.addEventListener('click', copy);
})();
