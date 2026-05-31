(function() {
  const input = document.getElementById('unicode-input');
  const output = document.getElementById('unicode-output');
  const format = document.getElementById('unicode-format');
  const encodeBtn = document.getElementById('unicode-encode');
  const decodeBtn = document.getElementById('unicode-decode');
  const swapBtn = document.getElementById('unicode-swap');
  const copyBtn = document.getElementById('unicode-copy');

  function padHex(num, len) {
    let hex = num.toString(16).toUpperCase();
    while (hex.length < len) hex = '0' + hex;
    return hex;
  }

  function encode(text) {
    const chars = Array.from(text);
    const fmt = format.value;
    return chars.map(function(char) {
      const code = char.codePointAt(0);
      if (code < 128 && fmt === 'backslash-u') {
        return char;
      }
      switch (fmt) {
        case 'backslash-u':
          if (code > 0xFFFF) {
            return '\\u' + padHex(code, 8);
          }
          return '\\u' + padHex(code, 4);
        case 'html-decimal':
          return '&#' + code + ';';
        case 'html-hex':
          return '&#x' + padHex(code, code > 0xFFFF ? 8 : 4) + ';';
        case 'unicode-point':
          return 'U+' + padHex(code, code > 0xFFFF ? 8 : 4);
        default:
          return char;
      }
    }).join('');
  }

  function decode(text) {
    let result = text;
    result = result.replace(/\\u\{([0-9a-fA-F]+)\}/g, function(match, hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    });
    result = result.replace(/\\u([0-9a-fA-F]{4,8})/g, function(match, hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    });
    result = result.replace(/&#x([0-9a-fA-F]+);/g, function(match, hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    });
    result = result.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCodePoint(parseInt(dec, 10));
    });
    result = result.replace(/U\+([0-9a-fA-F]{4,8})/g, function(match, hex) {
      return String.fromCodePoint(parseInt(hex, 16));
    });
    return result;
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
