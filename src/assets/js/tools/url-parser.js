(function() {
  const urlInput = document.getElementById('url-input');
  const parseBtn = document.getElementById('parse-btn');
  const copyBtn = document.getElementById('copy-btn');
  const partsTable = document.getElementById('url-parts').querySelector('tbody');
  const paramsTable = document.getElementById('url-params').querySelector('tbody');

  function parse() {
    const raw = urlInput.value.trim();
    if (!raw) {
      window.showToast('请输入 URL');
      return;
    }
    try {
      const url = new URL(raw);
      partsTable.innerHTML = '';
      const fields = [
        ['协议 (protocol)', url.protocol],
        ['主机 (host)', url.host],
        ['主机名 (hostname)', url.hostname],
        ['端口 (port)', url.port || '(默认)'],
        ['路径 (pathname)', url.pathname],
        ['查询 (search)', url.search],
        ['锚点 (hash)', url.hash],
        ['来源 (origin)', url.origin]
      ];
      fields.forEach(function(pair) {
        var tr = document.createElement('tr');
        var tdKey = document.createElement('td');
        tdKey.textContent = pair[0];
        var tdVal = document.createElement('td');
        tdVal.textContent = pair[1];
        tdVal.style.wordBreak = 'break-all';
        tr.appendChild(tdKey);
        tr.appendChild(tdVal);
        partsTable.appendChild(tr);
      });

      paramsTable.innerHTML = '';
      url.searchParams.forEach(function(value, key) {
        var tr = document.createElement('tr');
        var tdKey = document.createElement('td');
        tdKey.textContent = key;
        var tdVal = document.createElement('td');
        tdVal.textContent = value;
        tdVal.style.wordBreak = 'break-all';
        tr.appendChild(tdKey);
        tr.appendChild(tdVal);
        paramsTable.appendChild(tr);
      });
      if (url.searchParams.toString() === '') {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.colSpan = 2;
        td.textContent = '(无查询参数)';
        td.style.textAlign = 'center';
        td.style.color = '#999';
        tr.appendChild(td);
        paramsTable.appendChild(tr);
      }
    } catch (e) {
      window.showToast('无效的 URL: ' + e.message);
    }
  }

  function copyResult() {
    var lines = [];
    partsTable.querySelectorAll('tr').forEach(function(tr) {
      var cells = tr.querySelectorAll('td');
      if (cells.length === 2) {
        lines.push(cells[0].textContent + ': ' + cells[1].textContent);
      }
    });
    paramsTable.querySelectorAll('tr').forEach(function(tr) {
      var cells = tr.querySelectorAll('td');
      if (cells.length === 2) {
        lines.push(cells[0].textContent + ' = ' + cells[1].textContent);
      }
    });
    if (lines.length) {
      window.copyToClipboard(lines.join('\n'));
      window.showToast('已复制到剪贴板');
    }
  }

  parseBtn.addEventListener('click', parse);
  copyBtn.addEventListener('click', copyResult);
  urlInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') parse();
  });
})();
