(function() {
  const input = document.getElementById('base64-input');
  const output = document.getElementById('base64-output');
  const mode = document.getElementById('base64-mode');
  const runBtn = document.getElementById('base64-run');
  const swapBtn = document.getElementById('base64-swap');
  const copyBtn = document.getElementById('base64-copy');

  function encode(text) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(b64) {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  }

  function run() {
    const value = input.value.trim();
    if (!value) {
      output.value = '';
      return;
    }
    try {
      if (mode.value === 'encode') {
        output.value = encode(value);
      } else {
        output.value = decode(value);
      }
    } catch (e) {
      output.value = '错误: ' + e.message;
    }
  }

  function swap() {
    const tmp = input.value;
    input.value = output.value;
    output.value = tmp;
    mode.value = mode.value === 'encode' ? 'decode' : 'encode';
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  runBtn.addEventListener('click', run);
  swapBtn.addEventListener('click', swap);
  copyBtn.addEventListener('click', copy);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      run();
    }
  });
})();
