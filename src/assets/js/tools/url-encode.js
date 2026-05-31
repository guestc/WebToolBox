(function() {
  const input = document.getElementById('url-input');
  const output = document.getElementById('url-output');
  const mode = document.getElementById('url-mode');
  const runBtn = document.getElementById('url-run');
  const swapBtn = document.getElementById('url-swap');
  const copyBtn = document.getElementById('url-copy');

  function run() {
    const value = input.value;
    if (!value) {
      output.value = '';
      return;
    }
    try {
      switch (mode.value) {
        case 'encodeComponent':
          output.value = encodeURIComponent(value);
          break;
        case 'decodeComponent':
          output.value = decodeURIComponent(value);
          break;
        case 'encodeFull':
          output.value = encodeURI(value);
          break;
        case 'decodeFull':
          output.value = decodeURI(value);
          break;
      }
    } catch (e) {
      output.value = '错误: ' + e.message;
    }
  }

  function swap() {
    const tmp = input.value;
    input.value = output.value;
    output.value = tmp;
    const m = mode.value;
    if (m === 'encodeComponent') mode.value = 'decodeComponent';
    else if (m === 'decodeComponent') mode.value = 'encodeComponent';
    else if (m === 'encodeFull') mode.value = 'decodeFull';
    else if (m === 'decodeFull') mode.value = 'encodeFull';
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
