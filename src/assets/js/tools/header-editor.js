(function() {
  var input = document.getElementById('header-input');
  var parseBtn = document.getElementById('parse-btn');
  var clearBtn = document.getElementById('clear-btn');
  var addBtn = document.getElementById('add-btn');
  var exportBtn = document.getElementById('export-btn');
  var copyBtn = document.getElementById('copy-btn');
  var tableWrap = document.getElementById('header-table-wrap');
  var exportOutput = document.getElementById('export-output');

  var headers = [];

  function parseHeaders(str) {
    var lines = str.split('\n').map(function(s) { return s.trim(); }).filter(Boolean);
    var result = [];
    lines.forEach(function(line) {
      var idx = line.indexOf(':');
      if (idx === -1) return;
      result.push({ key: line.substring(0, idx).trim(), value: line.substring(idx + 1).trim() });
    });
    return result;
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderTable() {
    if (headers.length === 0) {
      tableWrap.innerHTML = '<p style="color:var(--text-secondary);font-size:14px">暂无请求头数据，请输入并点击解析</p>';
      return;
    }
    var html = '<table class="data-table"><thead><tr><th>Key</th><th>Value</th><th>操作</th></tr></thead><tbody>';
    headers.forEach(function(h, i) {
      html += '<tr><td><input type="text" value="' + escHtml(h.key) + '" data-idx="' + i + '" data-field="key" class="edit-input"></td>';
      html += '<td><input type="text" value="' + escHtml(h.value) + '" data-idx="' + i + '" data-field="value" class="edit-input"></td>';
      html += '<td><button class="btn btn-sm btn-error del-btn" data-idx="' + i + '">删除</button></td></tr>';
    });
    html += '</tbody></table>';
    tableWrap.innerHTML = html;

    tableWrap.querySelectorAll('.edit-input').forEach(function(inp) {
      inp.addEventListener('change', function() {
        var idx = parseInt(inp.dataset.idx);
        headers[idx][inp.dataset.field] = inp.value;
      });
      inp.style.cssText = 'width:100%;padding:6px 10px;border:1px solid var(--card-border);border-radius:4px;background:var(--bg-secondary);color:var(--text);font-size:13px';
    });
    tableWrap.querySelectorAll('.del-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        headers.splice(parseInt(btn.dataset.idx), 1);
        renderTable();
      });
    });
  }

  parseBtn.addEventListener('click', function() {
    if (!input.value.trim()) {
      window.showToast && window.showToast('请输入请求头内容');
      return;
    }
    headers = parseHeaders(input.value);
    renderTable();
    window.showToast && window.showToast('解析到 ' + headers.length + ' 个请求头');
  });

  clearBtn.addEventListener('click', function() {
    headers = [];
    input.value = '';
    exportOutput.value = '';
    renderTable();
  });

  addBtn.addEventListener('click', function() {
    headers.push({ key: '', value: '' });
    renderTable();
    var inputs = tableWrap.querySelectorAll('.edit-input');
    if (inputs.length) inputs[inputs.length - 2].focus();
  });

  exportBtn.addEventListener('click', function() {
    if (headers.length === 0) {
      window.showToast && window.showToast('没有可导出的请求头');
      return;
    }
    var lines = headers.filter(function(h) { return h.key; }).map(function(h) {
      return h.key + ': ' + h.value;
    });
    exportOutput.value = lines.join('\n');
  });

  copyBtn.addEventListener('click', function() {
    if (exportOutput.value) window.copyToClipboard(exportOutput.value);
  });

  renderTable();
})();
