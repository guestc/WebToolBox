(function() {
  var textA = document.getElementById('diff-a');
  var textB = document.getElementById('diff-b');
  var diffBtn = document.getElementById('diff-btn');
  var swapBtn = document.getElementById('diff-swap');
  var copyBtn = document.getElementById('diff-copy');
  var statsSpan = document.getElementById('diff-stats');
  var resultDiv = document.getElementById('diff-result');

  function computeDiff(aLines, bLines) {
    var n = aLines.length;
    var m = bLines.length;
    var dp = [];
    for (var i = 0; i <= n; i++) {
      dp[i] = [];
      for (var j = 0; j <= m; j++) {
        if (i === 0) dp[i][j] = j;
        else if (j === 0) dp[i][j] = i;
        else if (aLines[i - 1] === bLines[j - 1]) dp[i][j] = dp[i - 1][j - 1];
        else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    var ops = [];
    var i = n, j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
        ops.unshift({ type: 'equal', line: aLines[i - 1], lineA: i, lineB: j });
        i--; j--;
      } else if (j > 0 && (i === 0 || dp[i][j - 1] <= dp[i - 1][j])) {
        ops.unshift({ type: 'add', line: bLines[j - 1], lineB: j });
        j--;
      } else {
        ops.unshift({ type: 'remove', line: aLines[i - 1], lineA: i });
        i--;
      }
    }
    return ops;
  }

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function runDiff() {
    var a = textA.value;
    var b = textB.value;
    var aLines = a.split('\n');
    var bLines = b.split('\n');
    var ops = computeDiff(aLines, bLines);

    var added = 0, removed = 0, unchanged = 0;
    ops.forEach(function(op) {
      if (op.type === 'add') added++;
      else if (op.type === 'remove') removed++;
      else unchanged++;
    });
    statsSpan.textContent = '新增: ' + added + ' 行 | 删除: ' + removed + ' 行 | 未变: ' + unchanged + ' 行';

    var html = '<table style="width:100%;border-collapse:collapse;font-family:monospace;font-size:0.85em;">';
    html += '<tr style="background:#f5f5f5;"><th style="width:40px;padding:2px 6px;text-align:right;border:1px solid #ddd;color:#999;">A</th><th style="width:40px;padding:2px 6px;text-align:right;border:1px solid #ddd;color:#999;">B</th><th style="width:20px;padding:2px 6px;border:1px solid #ddd;"></th><th style="padding:2px 6px;border:1px solid #ddd;text-align:left;">内容</th></tr>';
    ops.forEach(function(op) {
      var bg, marker;
      if (op.type === 'add') { bg = '#e6ffed'; marker = '<span style="color:#27ae60;">+</span>'; }
      else if (op.type === 'remove') { bg = '#ffeef0'; marker = '<span style="color:#e74c3c;">−</span>'; }
      else { bg = '#fff'; marker = '<span style="color:#999;"> </span>'; }
      html += '<tr style="background:' + bg + ';">';
      html += '<td style="padding:2px 6px;text-align:right;border:1px solid #eee;color:#999;">' + (op.lineA || '') + '</td>';
      html += '<td style="padding:2px 6px;text-align:right;border:1px solid #eee;color:#999;">' + (op.lineB || '') + '</td>';
      html += '<td style="padding:2px 6px;text-align:center;border:1px solid #eee;">' + marker + '</td>';
      html += '<td style="padding:2px 6px;border:1px solid #eee;white-space:pre-wrap;word-break:break-all;">' + escapeHTML(op.line) + '</td>';
      html += '</tr>';
    });
    html += '</table>';
    resultDiv.innerHTML = html;
  }

  function swap() {
    var tmp = textA.value;
    textA.value = textB.value;
    textB.value = tmp;
  }

  function copyResult() {
    var text = resultDiv.innerText;
    if (text) {
      window.copyToClipboard(text);
      window.showToast('已复制到剪贴板');
    }
  }

  diffBtn.addEventListener('click', runDiff);
  swapBtn.addEventListener('click', swap);
  copyBtn.addEventListener('click', copyResult);
})();
