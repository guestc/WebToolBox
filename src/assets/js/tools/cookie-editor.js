(function() {
  var input = document.getElementById('cookie-input');
  var parseBtn = document.getElementById('parse-btn');
  var clearBtn = document.getElementById('clear-btn');
  var addBtn = document.getElementById('add-btn');
  var exportHeaderBtn = document.getElementById('export-header-btn');
  var exportJsonBtn = document.getElementById('export-json-btn');
  var copyBtn = document.getElementById('copy-btn');
  var tableWrap = document.getElementById('cookie-table-wrap');
  var exportOutput = document.getElementById('export-output');

  var cookies = [];

  function parseCookies(str) {
    str = str.replace(/^Cookie:\s*/i, '');
    var pairs = str.split(';').map(function(s) { return s.trim(); }).filter(Boolean);
    var result = [];
    pairs.forEach(function(pair) {
      var idx = pair.indexOf('=');
      if (idx === -1) return;
      result.push({ name: pair.substring(0, idx).trim(), value: pair.substring(idx + 1).trim() });
    });
    return result;
  }

  function renderTable() {
    if (cookies.length === 0) {
      tableWrap.innerHTML = '<p style="color:var(--text-secondary);font-size:14px">暂无Cookie数据，请输入并点击解析</p>';
      return;
    }
    var html = '<table class="data-table"><thead><tr><th>名称</th><th>值</th><th>操作</th></tr></thead><tbody>';
    cookies.forEach(function(c, i) {
      html += '<tr><td><input type="text" value="' + escHtml(c.name) + '" data-idx="' + i + '" data-field="name" class="edit-input"></td>';
      html += '<td><input type="text" value="' + escHtml(c.value) + '" data-idx="' + i + '" data-field="value" class="edit-input"></td>';
      html += '<td><button class="btn btn-sm btn-error del-btn" data-idx="' + i + '">删除</button></td></tr>';
    });
    html += '</tbody></table>';
    tableWrap.innerHTML = html;

    tableWrap.querySelectorAll('.edit-input').forEach(function(inp) {
      inp.addEventListener('change', function() {
        var idx = parseInt(inp.dataset.idx);
        cookies[idx][inp.dataset.field] = inp.value;
      });
      inp.style.cssText = 'width:100%;padding:6px 10px;border:1px solid var(--card-border);border-radius:4px;background:var(--bg-secondary);color:var(--text);font-size:13px';
    });
    tableWrap.querySelectorAll('.del-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        cookies.splice(parseInt(btn.dataset.idx), 1);
        renderTable();
      });
    });
  }

  function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  parseBtn.addEventListener('click', function() {
    cookies = parseCookies(input.value);
    renderTable();
    showToast('解析到 ' + cookies.length + ' 个Cookie');
  });

  clearBtn.addEventListener('click', function() {
    cookies = [];
    input.value = '';
    exportOutput.value = '';
    renderTable();
  });

  addBtn.addEventListener('click', function() {
    cookies.push({ name: '', value: '' });
    renderTable();
    var inputs = tableWrap.querySelectorAll('.edit-input');
    if (inputs.length) inputs[inputs.length - 2].focus();
  });

  exportHeaderBtn.addEventListener('click', function() {
    exportOutput.value = cookies.map(function(c) { return c.name + '=' + c.value; }).join('; ');
  });

  exportJsonBtn.addEventListener('click', function() {
    exportOutput.value = JSON.stringify(cookies.map(function(c) { return { name: c.name, value: c.value }; }), null, 2);
  });

  copyBtn.addEventListener('click', function() {
    if (exportOutput.value) copyToClipboard(exportOutput.value);
  });

  renderTable();
})();
