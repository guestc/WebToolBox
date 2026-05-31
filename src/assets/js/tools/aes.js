(function() {
  var input = document.getElementById('aes-input');
  var output = document.getElementById('aes-output');
  var keyInput = document.getElementById('aes-key');
  var modeSelect = document.getElementById('aes-mode');
  var sizeSelect = document.getElementById('aes-size');
  var runBtn = document.getElementById('aes-run');
  var copyBtn = document.getElementById('aes-copy');

  function bufferToBase64(buffer) {
    var bytes = new Uint8Array(buffer);
    var binary = '';
    for (var i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function base64ToBuffer(base64) {
    var binary = atob(base64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  async function deriveKey(password, salt, keySize) {
    var encoder = new TextEncoder();
    var keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-CBC', length: keySize },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function encrypt(text, password, keySize) {
    var encoder = new TextEncoder();
    var iv = crypto.getRandomValues(new Uint8Array(16));
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var key = await deriveKey(password, salt, keySize);
    var encrypted = await crypto.subtle.encrypt(
      { name: 'AES-CBC', iv: iv },
      key,
      encoder.encode(text)
    );
    var combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);
    return bufferToBase64(combined);
  }

  async function decrypt(cipherBase64, password, keySize) {
    var combined = base64ToBuffer(cipherBase64);
    if (combined.length < 33) {
      throw new Error('密文数据太短');
    }
    var salt = combined.slice(0, 16);
    var iv = combined.slice(16, 32);
    var ciphertext = combined.slice(32);
    var key = await deriveKey(password, salt, keySize);
    var decrypted = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      key,
      ciphertext
    );
    var decoder = new TextDecoder('utf-8');
    return decoder.decode(decrypted);
  }

  async function run() {
    var value = input.value;
    var password = keyInput.value;
    var mode = modeSelect.value;
    var keySize = parseInt(sizeSelect.value);

    if (!value || !password) {
      output.value = '';
      return;
    }

    try {
      if (mode === 'encrypt') {
        output.value = await encrypt(value, password, keySize);
      } else {
        output.value = await decrypt(value, password, keySize);
      }
    } catch (e) {
      output.value = '错误: ' + e.message;
    }
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
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
