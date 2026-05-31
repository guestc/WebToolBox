(function() {
  const input = document.getElementById('html-entity-input');
  const output = document.getElementById('html-entity-output');
  const mode = document.getElementById('html-entity-mode');
  const runBtn = document.getElementById('html-entity-run');
  const swapBtn = document.getElementById('html-entity-swap');
  const copyBtn = document.getElementById('html-entity-copy');

  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  const reverseEntityMap = {};
  for (const key in entityMap) {
    reverseEntityMap[entityMap[key]] = key;
  }

  const namedEntities = {
    '&nbsp;': '\u00A0', '&iexcl;': '\u00A1', '&cent;': '\u00A2', '&pound;': '\u00A3',
    '&yen;': '\u00A5', '&copy;': '\u00A9', '&reg;': '\u00AE', '&deg;': '\u00B0',
    '&plusmn;': '\u00B7', '&micro;': '\u00B5', '&para;': '\u00B6', '&middot;': '\u00B7',
    '&frac12;': '\u00BD', '&laquo;': '\u0AB', '&raquo;': '\u0BB',
    '&times;': '\u00D7', '&divide;': '\u00F7', '&hellip;': '\u2026',
    '&ndash;': '\u2013', '&mdash;': '\u2014', '&lsquo;': '\u2018', '&rsquo;': '\u2019',
    '&ldquo;': '\u201C', '&rdquo;': '\u201D', '&bull;': '\u2022',
    '&trade;': '\u2122', '&euro;': '\u20AC', '&pound;': '\u00A3'
  };

  function encode(text) {
    return text.replace(/[&<>"'\/`=]/g, function(char) {
      return entityMap[char];
    }).replace(/[^\x00-\x7F]/g, function(char) {
      return '&#' + char.charCodeAt(0) + ';';
    });
  }

  function decode(text) {
    let result = text;
    for (const entity in reverseEntityMap) {
      result = result.split(entity).join(reverseEntityMap[entity]);
    }
    for (const entity in namedEntities) {
      result = result.split(entity).join(namedEntities[entity]);
    }
    result = result.replace(/&#x([0-9a-fA-F]+);/g, function(match, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
    result = result.replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(parseInt(dec, 10));
    });
    return result;
  }

  function run() {
    const value = input.value;
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
