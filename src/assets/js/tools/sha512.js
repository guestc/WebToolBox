(function() {
  var input = document.getElementById('sha512-input');
  var output = document.getElementById('sha512-output');
  var uppercase = document.getElementById('sha512-uppercase');
  var runBtn = document.getElementById('sha512-run');
  var copyBtn = document.getElementById('sha512-copy');

  function bufferToHex(buffer) {
    var bytes = new Uint8Array(buffer);
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  async function run() {
    var value = input.value;
    if (!value) {
      output.value = '';
      return;
    }
    var encoder = new TextEncoder();
    var data = encoder.encode(value);
    var hashBuffer = await crypto.subtle.digest('SHA-512', data);
    var result = bufferToHex(hashBuffer);
    if (uppercase.checked) {
      result = result.toUpperCase();
    }
    output.value = result;
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  runBtn.addEventListener('click', run);
  copyBtn.addEventListener('click', copy);
  uppercase.addEventListener('change', run);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      run();
    }
  });
})();
