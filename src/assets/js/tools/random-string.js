(function() {
  var lengthInput = document.getElementById('rs-length');
  var quantityInput = document.getElementById('rs-quantity');
  var separatorInput = document.getElementById('rs-separator');
  var upperCheck = document.getElementById('rs-upper');
  var lowerCheck = document.getElementById('rs-lower');
  var digitCheck = document.getElementById('rs-digit');
  var symbolCheck = document.getElementById('rs-symbol');
  var customInput = document.getElementById('rs-custom');
  var generateBtn = document.getElementById('rs-generate');
  var copyBtn = document.getElementById('rs-copy');
  var output = document.getElementById('rs-output');

  var CHARS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    digit: '0123456789',
    symbol: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  function generateOne(len, pool, sep) {
    var arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    var result = '';
    for (var i = 0; i < len; i++) {
      result += pool[arr[i] % pool.length];
    }
    if (sep > 0) {
      var parts = [];
      for (var i = 0; i < result.length; i += sep) {
        parts.push(result.substring(i, i + sep));
      }
      return parts.join('-');
    }
    return result;
  }

  function generate() {
    var pool = '';
    if (upperCheck.checked) pool += CHARS.upper;
    if (lowerCheck.checked) pool += CHARS.lower;
    if (digitCheck.checked) pool += CHARS.digit;
    if (symbolCheck.checked) pool += CHARS.symbol;
    pool += customInput.value;
    if (!pool) { window.showToast('请至少选择一种字符集'); return; }
    var len = parseInt(lengthInput.value, 10) || 16;
    var qty = Math.min(parseInt(quantityInput.value, 10) || 1, 50);
    var sep = parseInt(separatorInput.value, 10) || 0;
    var results = [];
    for (var i = 0; i < qty; i++) {
      results.push(generateOne(len, pool, sep));
    }
    output.value = results.join('\n');
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  generateBtn.addEventListener('click', generate);
  copyBtn.addEventListener('click', copy);
})();
