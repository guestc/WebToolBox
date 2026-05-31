(function() {
  var domainInput = document.getElementById('dns-domain');
  var typeSelect = document.getElementById('dns-type');
  var lookupBtn = document.getElementById('dns-lookup-btn');
  var copyBtn = document.getElementById('dns-copy-btn');
  var resultsBody = document.getElementById('dns-results').querySelector('tbody');

  var TYPE_MAP = { 1:'A', 5:'CNAME', 6:'SOA', 15:'MX', 16:'TXT', 28:'AAAA', 2:'NS' };

  function lookup() {
    var domain = domainInput.value.trim();
    if (!domain) { window.showToast('请输入域名'); return; }
    var type = typeSelect.value;
    resultsBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999;">查询中...</td></tr>';
    lookupBtn.disabled = true;
    var url = 'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(domain) + '&type=' + type;
    fetch(url, { headers: { 'Accept': 'application/dns-json' } })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        resultsBody.innerHTML = '';
        if (!data.Answer || data.Answer.length === 0) {
          resultsBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999;">无记录</td></tr>';
          return;
        }
        data.Answer.forEach(function(record) {
          var tr = document.createElement('tr');
          var tdName = document.createElement('td');
          tdName.textContent = record.name;
          var tdType = document.createElement('td');
          tdType.textContent = TYPE_MAP[record.type] || record.type;
          var tdTTL = document.createElement('td');
          tdTTL.textContent = record.TTL;
          tdTTL.style.textAlign = 'center';
          var tdData = document.createElement('td');
          tdData.textContent = record.data;
          tdData.style.wordBreak = 'break-all';
          tr.appendChild(tdName);
          tr.appendChild(tdType);
          tr.appendChild(tdTTL);
          tr.appendChild(tdData);
          resultsBody.appendChild(tr);
        });
      })
      .catch(function(err) {
        resultsBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#e74c3c;">查询失败: ' + err.message + '</td></tr>';
      })
      .finally(function() { lookupBtn.disabled = false; });
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

  lookupBtn.addEventListener('click', lookup);
  copyBtn.addEventListener('click', copyResults);
  domainInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') lookup(); });
})();
