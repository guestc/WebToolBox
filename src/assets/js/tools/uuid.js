(function() {
  var quantityInput = document.getElementById('uuid-quantity');
  var formatSelect = document.getElementById('uuid-format');
  var generateBtn = document.getElementById('uuid-generate');
  var copyBtn = document.getElementById('uuid-copy');
  var output = document.getElementById('uuid-output');

  function generateUUID() {
    var arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    arr[6] = (arr[6] & 0x0f) | 0x40;
    arr[8] = (arr[8] & 0x3f) | 0x80;
    var hex = Array.from(arr, function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20, 32)
    ].join('-');
  }

  function formatUUID(uuid, fmt) {
    switch (fmt) {
      case 'uppercase': return uuid.toUpperCase();
      case 'nodash': return uuid.replace(/-/g, '');
      case 'braces': return '{' + uuid + '}';
      default: return uuid;
    }
  }

  function generate() {
    var qty = parseInt(quantityInput.value, 10) || 1;
    qty = Math.min(Math.max(qty, 1), 100);
    var fmt = formatSelect.value;
    var results = [];
    for (var i = 0; i < qty; i++) {
      results.push(formatUUID(generateUUID(), fmt));
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
