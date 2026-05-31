(function() {
  var loading = document.getElementById('ip-loading');
  var table = document.getElementById('ip-info-table');
  var tbody = table.querySelector('tbody');
  var errorDiv = document.getElementById('ip-error');
  var refreshBtn = document.getElementById('ip-refresh');
  var copyBtn = document.getElementById('ip-copy');
  var currentIP = '';

  function fetchInfo() {
    loading.style.display = 'block';
    table.style.display = 'none';
    errorDiv.style.display = 'none';
    refreshBtn.disabled = true;

    fetch('https://ipapi.co/json/')
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        currentIP = data.ip || '';
        tbody.innerHTML = '';
        var fields = [
          ['IP 地址', data.ip],
          ['国家', data.country_name + (data.country_code ? ' (' + data.country_code + ')' : '')],
          ['地区', data.region],
          ['城市', data.city],
          ['邮编', data.postal],
          ['经纬度', data.latitude + ', ' + data.longitude],
          ['时区', data.timezone],
          ['ISP', data.org],
          ['AS', data.asn]
        ];
        fields.forEach(function(pair) {
          var tr = document.createElement('tr');
          var tdKey = document.createElement('td');
          tdKey.textContent = pair[0];
          var tdVal = document.createElement('td');
          tdVal.textContent = pair[1] || '-';
          tdVal.style.wordBreak = 'break-all';
          tr.appendChild(tdKey);
          tr.appendChild(tdVal);
          tbody.appendChild(tr);
        });
        table.style.display = 'table';
      })
      .catch(function(err) {
        errorDiv.textContent = '加载失败: ' + err.message + '。请检查网络连接或关闭广告拦截器后重试。';
        errorDiv.style.display = 'block';
      })
      .finally(function() {
        loading.style.display = 'none';
        refreshBtn.disabled = false;
      });
  }

  function copyIP() {
    if (currentIP) {
      window.copyToClipboard(currentIP);
      window.showToast('已复制: ' + currentIP);
    }
  }

  refreshBtn.addEventListener('click', fetchInfo);
  copyBtn.addEventListener('click', copyIP);
  fetchInfo();
})();
