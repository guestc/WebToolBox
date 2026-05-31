(function() {
  var input = document.getElementById('dedup-input');
  var output = document.getElementById('dedup-output');
  var caseSensitive = document.getElementById('dedup-case');
  var trimWs = document.getElementById('dedup-trim');
  var keepEmpty = document.getElementById('dedup-empty');
  var dedupBtn = document.getElementById('dedup-btn');
  var copyBtn = document.getElementById('dedup-copy');
  var statsSpan = document.getElementById('dedup-stats');

  function deduplicate() {
    var text = input.value;
    if (!text) { output.value = ''; statsSpan.textContent = ''; return; }
    var lines = text.split('\n');
    var total = lines.length;
    var seen = {};
    var result = [];
    lines.forEach(function(line) {
      var key = line;
      if (trimWs.checked) key = key.trim();
      if (!caseSensitive.checked) key = key.toLowerCase();
      if (!keepEmpty.checked && key === '') return;
      if (!seen[key]) {
        seen[key] = true;
        result.push(line);
      }
    });
    output.value = result.join('\n');
    statsSpan.textContent = '原始行数: ' + total + ' | 唯一行: ' + result.length + ' | 移除行: ' + (total - result.length);
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  dedupBtn.addEventListener('click', deduplicate);
  copyBtn.addEventListener('click', copy);
})();
