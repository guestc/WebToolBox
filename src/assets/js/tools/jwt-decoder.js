(function() {
  var input = document.getElementById('jwt-input');
  var headerOutput = document.getElementById('jwt-header');
  var payloadOutput = document.getElementById('jwt-payload');
  var signatureOutput = document.getElementById('jwt-signature');
  var expiryDiv = document.getElementById('jwt-expiry');
  var runBtn = document.getElementById('jwt-run');
  var copyBtn = document.getElementById('jwt-copy');

  function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    var pad = str.length % 4;
    if (pad) str += '='.repeat(4 - pad);
    var binary = atob(str);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    var decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  }

  function bufferToHex(buffer) {
    var bytes = new Uint8Array(buffer);
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return hex;
  }

  function formatJson(str) {
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch (e) {
      return str;
    }
  }

  function run() {
    var value = input.value.trim();
    headerOutput.value = '';
    payloadOutput.value = '';
    signatureOutput.value = '';
    expiryDiv.style.display = 'none';
    expiryDiv.innerHTML = '';

    if (!value) return;

    var parts = value.split('.');
    if (parts.length !== 3) {
      payloadOutput.value = '错误: 无效的JWT格式，应包含3个部分';
      return;
    }

    try {
      var header = base64UrlDecode(parts[0]);
      headerOutput.value = formatJson(header);
    } catch (e) {
      headerOutput.value = '错误: 无法解码Header - ' + e.message;
    }

    try {
      var payload = base64UrlDecode(parts[1]);
      payloadOutput.value = formatJson(payload);

      var payloadObj = JSON.parse(payload);
      if (payloadObj.exp) {
        var expDate = new Date(payloadObj.exp * 1000);
        var now = new Date();
        var isExpired = expDate < now;
        expiryDiv.style.display = 'block';
        expiryDiv.innerHTML = '<strong>过期时间:</strong> ' + expDate.toLocaleString() +
          (isExpired ? ' <span style="color:#e74c3c;font-weight:bold;">(已过期)</span>' : ' <span style="color:#27ae60;font-weight:bold;">(有效)</span>');
      }
    } catch (e) {
      payloadOutput.value = '错误: 无法解码Payload - ' + e.message;
    }

    try {
      var binary = atob(parts[2].replace(/-/g, '+').replace(/_/g, '/'));
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      signatureOutput.value = bufferToHex(bytes);
    } catch (e) {
      signatureOutput.value = '错误: 无法解码签名 - ' + e.message;
    }
  }

  function copy() {
    var result = '';
    if (headerOutput.value) result += 'Header:\n' + headerOutput.value + '\n\n';
    if (payloadOutput.value) result += 'Payload:\n' + payloadOutput.value + '\n\n';
    if (signatureOutput.value) result += 'Signature:\n' + signatureOutput.value;
    if (result) {
      window.copyToClipboard(result);
      window.showToast('已复制到剪贴板');
    }
  }

  runBtn.addEventListener('click', run);
  copyBtn.addEventListener('click', copy);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      run();
    }
  });
})();
