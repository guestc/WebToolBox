(function() {
  var input = document.getElementById('hmac-input');
  var output = document.getElementById('hmac-output');
  var keyInput = document.getElementById('hmac-key');
  var algoSelect = document.getElementById('hmac-algo');
  var uppercase = document.getElementById('hmac-uppercase');
  var runBtn = document.getElementById('hmac-run');
  var copyBtn = document.getElementById('hmac-copy');

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
    var key = keyInput.value;
    if (!value || !key) {
      output.value = '';
      return;
    }
    var encoder = new TextEncoder();
    var keyData = encoder.encode(key);
    var algo = algoSelect.value;

    var cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: algo },
      false,
      ['sign']
    );

    var data = encoder.encode(value);
    var signature = await crypto.subtle.sign('HMAC', cryptoKey, data);
    var result = bufferToHex(signature);
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
