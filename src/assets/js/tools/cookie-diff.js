(function() {
  var cookieA = document.getElementById('cookie-a');
  var cookieB = document.getElementById('cookie-b');
  var diffBtn = document.getElementById('diff-btn');
  var clearBtn = document.getElementById('clear-btn');
  var result = document.getElementById('diff-result');

  function parseCookies(str) {
    str = str.replace(/^Cookie:\s*/i, '');
    var map = {};
    str.split(';').map(function(s) { return s.trim(); }).filter(Boolean).forEach(function(pair) {
      var idx = pair.indexOf('=');
      if (idx === -1) return;
      map[pair.substring(0, idx).trim()] = pair.substring(idx + 1).trim();
    });
    return map;
  }

  diffBtn.addEventListener('click', function() {
    var a = parseCookies(cookieA.value);
    var b = parseCookies(cookieB.value);
    var allKeys = {};
    Object.keys(a).forEach(function(k) { allKeys[k] = true; });
    Object.keys(b).forEach(function(k) { allKeys[k] = true; });

    var added = [], removed = [], modified = [], unchanged = [];
    Object.keys(allKeys).forEach(function(k) {
      if (!(k in a)) added.push(k);
      else if (!(k in b)) removed.push(k);
      else if (a[k] !== b[k]) modified.push(k);
      else unchanged.push(k);
    });

    var html = '<table class="data-table"><thead><tr><th>状态</th><th>名称</th><th>Cookie A</th><th>Cookie B</th></tr></thead><tbody>';
    added.forEach(function(k) {
      html += '<tr style="color:var(--success)"><td>新增</td><td>' + esc(k) + '</td><td>-</td><td>' + esc(b[k]) + '</td></tr>';
    });
    removed.forEach(function(k) {
      html += '<tr style="color:var(--error)"><td>删除</td><td>' + esc(k) + '</td><td>' + esc(a[k]) + '</td><td>-</td></tr>';
    });
    modified.forEach(function(k) {
      html += '<tr style="color:var(--warning)"><td>修改</td><td>' + esc(k) + '</td><td>' + esc(a[k]) + '</td><td>' + esc(b[k]) + '</td></tr>';
    });
    unchanged.forEach(function(k) {
      html += '<tr><td>相同</td><td>' + esc(k) + '</td><td>' + esc(a[k]) + '</td><td>' + esc(b[k]) + '</td></tr>';
    });
    html += '</tbody></table>';
    html += '<p style="margin-top:12px;font-size:14px;color:var(--text-secondary)">新增:' + added.length + ' 删除:' + removed.length + ' 修改:' + modified.length + ' 相同:' + unchanged.length + '</p>';
    result.innerHTML = html;
  });

  clearBtn.addEventListener('click', function() {
    cookieA.value = '';
    cookieB.value = '';
    result.innerHTML = '';
  });

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
})();
