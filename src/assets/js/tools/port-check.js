(function() {
  var hostInput = document.getElementById('port-host');
  var portInput = document.getElementById('port-list');
  var checkBtn = document.getElementById('port-check-btn');
  var copyBtn = document.getElementById('port-copy-btn');
  var resultsBody = document.getElementById('port-results').querySelector('tbody');

  var SERVICE_MAP = {
    20: 'FTP Data', 21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP',
    53: 'DNS', 67: 'DHCP', 68: 'DHCP', 80: 'HTTP', 110: 'POP3',
    143: 'IMAP', 443: 'HTTPS', 465: 'SMTPS', 993: 'IMAPS', 995: 'POP3S',
    3306: 'MySQL', 3389: 'RDP', 5432: 'PostgreSQL', 5900: 'VNC',
    6379: 'Redis', 8080: 'HTTP Alt', 8443: 'HTTPS Alt', 27017: 'MongoDB'
  };

  document.querySelectorAll('.preset-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      portInput.value = btn.getAttribute('data-ports');
    });
  });

  function checkPort(host, port, timeout) {
    return new Promise(function(resolve) {
      var start = Date.now();
      var resolved = false;
      var img = new Image();
      img.onload = img.onerror = function() {
        if (!resolved) {
          resolved = true;
          resolve({ port: port, status: 'open', time: Date.now() - start });
        }
      };
      img.src = 'http://' + host + ':' + port + '/?_=' + Date.now();
      setTimeout(function() {
        if (!resolved) {
          resolved = true;
          img.src = '';
          resolve({ port: port, status: 'filtered', time: Date.now() - start });
        }
      }, timeout);
    });
  }

  async function runCheck() {
    var host = hostInput.value.trim();
    if (!host) { window.showToast('请输入主机'); return; }
    var ports = portInput.value.split(',').map(function(p) { return parseInt(p.trim(), 10); }).filter(function(p) { return p > 0 && p <= 65535; });
    if (!ports.length) { window.showToast('请输入有效端口'); return; }
    resultsBody.innerHTML = '';
    checkBtn.disabled = true;
    checkBtn.textContent = '检测中...';
    for (var i = 0; i < ports.length; i++) {
      var r = await checkPort(host, ports[i], 5000);
      var tr = document.createElement('tr');
      var tdPort = document.createElement('td');
      tdPort.textContent = r.port;
      tdPort.style.textAlign = 'center';
      var tdService = document.createElement('td');
      tdService.textContent = SERVICE_MAP[r.port] || '-';
      var tdStatus = document.createElement('td');
      if (r.status === 'open') {
        tdStatus.innerHTML = '<span style="color:#27ae60;">开放</span>';
      } else if (r.status === 'closed') {
        tdStatus.innerHTML = '<span style="color:#e74c3c;">关闭</span>';
      } else {
        tdStatus.innerHTML = '<span style="color:#e67e22;">被过滤</span>';
      }
      tdStatus.style.textAlign = 'center';
      var tdTime = document.createElement('td');
      tdTime.textContent = r.time;
      tdTime.style.textAlign = 'center';
      tr.appendChild(tdPort);
      tr.appendChild(tdService);
      tr.appendChild(tdStatus);
      tr.appendChild(tdTime);
      resultsBody.appendChild(tr);
    }
    checkBtn.disabled = false;
    checkBtn.textContent = '开始检测';
  }

  function copyResults() {
    var lines = ['端口\t服务\t状态\t耗时'];
    resultsBody.querySelectorAll('tr').forEach(function(tr) {
      var cells = tr.querySelectorAll('td');
      if (cells.length === 4) {
        lines.push([cells[0].textContent, cells[1].textContent, cells[2].textContent, cells[3].textContent].join('\t'));
      }
    });
    if (lines.length > 1) {
      window.copyToClipboard(lines.join('\n'));
      window.showToast('已复制到剪贴板');
    }
  }

  checkBtn.addEventListener('click', runCheck);
  copyBtn.addEventListener('click', copyResults);
  hostInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') runCheck(); });
})();
