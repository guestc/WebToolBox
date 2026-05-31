(function() {
  const input = document.getElementById('hex-input');
  const output = document.getElementById('hex-output');
  const separator = document.getElementById('hex-separator');
  const encodeBtn = document.getElementById('hex-encode');
  const decodeBtn = document.getElementById('hex-decode');
  const swapBtn = document.getElementById('hex-swap');
  const copyBtn = document.getElementById('hex-copy');

  function encode(text) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const sep = separator.value;
    return Array.from(bytes).map(function(b) {
      const hex = b.toString(16).toUpperCase().padStart(2, '0');
      switch (sep) {
        case 'none': return hex;
        case 'space': return hex;
        case '0x': return '0x' + hex;
        case 'backslash-x': return '\\x' + hex;
        default: return hex;
      }
    }).join(sep === 'space' ? ' ' : '');
  }

  function decode(text) {
    let hex = text.replace(/\s+/g, '');
    hex = hex.replace(/^(0x|\\x)/i, '');
    hex = hex.replace(/(0x|\\x)/gi, '');
    hex = hex.replace(/[^0-9a-fA-F]/g, '');
    if (hex.length % 2 !== 0) {
      throw new Error('十六进制字符串长度必须为偶数');
    }
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  }

  function runEncode() {
    const value = input.value;
    if (!value) { output.value = ''; return; }
    try {
      output.value = encode(value);
    } catch (e) {
      output.value = '错误: ' + e.message;
    }
  }

  function runDecode() {
    const value = input.value;
    if (!value) { output.value = ''; return; }
    try {
      output.value = decode(value);
    } catch (e) {
      output.value = '错误: ' + e.message;
    }
  }

  function swap() {
    const tmp = input.value;
    input.value = output.value;
    output.value = tmp;
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  encodeBtn.addEventListener('click', runEncode);
  decodeBtn.addEventListener('click', runDecode);
  swapBtn.addEventListener('click', swap);
  copyBtn.addEventListener('click', copy);

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      runEncode();
    }
  });
})();
