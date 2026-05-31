(function() {
  var lengthSlider = document.getElementById('pwd-length');
  var lengthVal = document.getElementById('pwd-length-val');
  var quantityInput = document.getElementById('pwd-quantity');
  var upperCheck = document.getElementById('pwd-upper');
  var lowerCheck = document.getElementById('pwd-lower');
  var digitCheck = document.getElementById('pwd-digit');
  var symbolCheck = document.getElementById('pwd-symbol');
  var ambiguousCheck = document.getElementById('pwd-ambiguous');
  var generateBtn = document.getElementById('pwd-generate');
  var copyBtn = document.getElementById('pwd-copy');
  var output = document.getElementById('pwd-output');

  var CHARS = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    digit: '0123456789',
    symbol: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };
  var AMBIGUOUS = '0Ol1I';

  lengthSlider.addEventListener('input', function() { lengthVal.textContent = lengthSlider.value; });

  function generateOne(len, chars) {
    var arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    var result = '';
    for (var i = 0; i < len; i++) {
      result += chars[arr[i] % chars.length];
    }
    return result;
  }

  function generate() {
    var pool = '';
    if (upperCheck.checked) pool += CHARS.upper;
    if (lowerCheck.checked) pool += CHARS.lower;
    if (digitCheck.checked) pool += CHARS.digit;
    if (symbolCheck.checked) pool += CHARS.symbol;
    if (!pool) { window.showToast('请至少选择一种字符类型'); return; }
    if (ambiguousCheck.checked) {
      for (var i = 0; i < AMBIGUOUS.length; i++) {
        pool = pool.split(AMBIGUOUS[i]).join('');
      }
    }
    if (!pool) { window.showToast('排除易混淆字符后无可用字符'); return; }
    var len = parseInt(lengthSlider.value, 10);
    var qty = parseInt(quantityInput.value, 10) || 1;
    qty = Math.min(Math.max(qty, 1), 20);
    var passwords = [];
    for (var i = 0; i < qty; i++) {
      passwords.push(generateOne(len, pool));
    }
    output.value = passwords.join('\n');
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
