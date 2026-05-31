(function() {
  var urlsInput = document.getElementById('urls-input');
  var timeoutInput = document.getElementById('timeout-input');
  var parallelCheck = document.getElementById('parallel-check');
  var checkBtn = document.getElementById('check-btn');
  var copyBtn = document.getElementById('copy-btn');
  var resultsBody = document.getElementById('check-results').querySelector('tbody');

  function checkOne(url, timeout) {
    return new Promise(function(resolve) {
      var start = Date.now();
      var controller = new AbortController();
      var timer = setTimeout(function() { controller.abort(); }, timeout * 1000);
      fetch(url, { mode: 'no-cors', signal: controller.signal, cache: 'no-store' })
        .then(function() {
          clearTimeout(timer);
          resolve({ url: url, status: 'ok', code: '(opaque)', time: Date.now() - start });
        })
        .catch(function(err) {
          clearTimeout(timer);
          var elapsed = Date.now() - start;
          if (err.name === 'AbortError') {
            resolve({ url: url, status: 'timeout', code: '-', time: elapsed });
          } else {
            resolve({ url: url, status: 'error', code: '-', time: elapsed });
          }
        });
    });
  }

  function renderRow(result) {
    var tr = document.createElement('tr');
    var tdUrl = document.createElement('td');
    tdUrl.textContent = result.url;
    tdUrl.style.wordBreak = 'break-all';
    var tdStatus = document.createElement('td');
    if (result.status === 'ok') {
      tdStatus.innerHTML = '<span style="color:#27ae60;">✓ 可访问</span>';
    } else if (result.status === 'timeout') {
      tdStatus.innerHTML = '<span style="color:#e67e22;">⏱ 超时</span>';
    } else {
      tdStatus.innerHTML = '<span style="color:#e74c3c;">✗ 失败</span>';
    }
    var tdCode = document.createElement('td');
    tdCode.textContent = result.code;
    tdCode.style.textAlign = 'center';
    var tdTime = document.createElement('td');
    tdTime.textContent = result.time;
    tdTime.style.textAlign = 'center';
    tr.appendChild(tdUrl);
    tr.appendChild(tdStatus);
    tr.appendChild(tdCode);
    tr.appendChild(tdTime);
    return tr;
  }

  async function runCheck() {
    var lines = urlsInput.value.split('\n').map(function(l) { return l.trim(); }).filter(function(l) { return l; });
    if (!lines.length) { window.showToast('请输入至少一个 URL'); return; }
    var timeout = parseInt(timeoutInput.value, 10) || 10;
    resultsBody.innerHTML = '';
    checkBtn.disabled = true;
    checkBtn.textContent = '检测中...';
    if (parallelCheck.checked) {
      var promises = lines.map(function(url) { return checkOne(url, timeout); });
      var results = await Promise.all(promises);
      results.forEach(function(r) { resultsBody.appendChild(renderRow(r)); });
    } else {
      for (var i = 0; i < lines.length; i++) {
        var r = await checkOne(lines[i], timeout);
        resultsBody.appendChild(renderRow(r));
      }
    }
    checkBtn.disabled = false;
    checkBtn.textContent = '开始检测';
  }

  function copyResults() {
    var lines = [];
    resultsBody.querySelectorAll('tr').forEach(function(tr) {
      var cells = tr.querySelectorAll('td');
      if (cells.length === 4) {
        lines.push([cells[0].textContent, cells[1].textContent, cells[2].textContent, cells[3].textContent].join('\t'));
      }
    });
    if (lines.length) {
      window.copyToClipboard(lines.join('\n'));
      window.showToast('已复制到剪贴板');
    }
  }

  checkBtn.addEventListener('click', runCheck);
  copyBtn.addEventListener('click', copyResults);
})();
