(function() {
  var input = document.getElementById('ua-input');
  var parseBtn = document.getElementById('parse-btn');
  var clearBtn = document.getElementById('clear-btn');
  var resultDiv = document.getElementById('ua-result');

  var browsers = [
    { name: 'Chrome', regex: /Chrome\/([\d.]+)/ },
    { name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
    { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
    { name: 'Edge', regex: /Edg(?:e|\/)\/([\d.]+)/ },
    { name: 'Opera', regex: /(?:OPR|Opera)\/([\d.]+)/ },
    { name: 'IE', regex: /(?:MSIE |Trident\/.*rv:)([\d.]+)/ },
    { name: 'Samsung Browser', regex: /SamsungBrowser\/([\d.]+)/ },
    { name: 'UC Browser', regex: /UCBrowser\/([\d.]+)/ }
  ];

  var osList = [
    { name: 'Windows 11', regex: /Windows NT 10\.0.*Build\/(\d{5,})/ },
    { name: 'Windows 10', regex: /Windows NT 10\.0/ },
    { name: 'Windows 8.1', regex: /Windows NT 6\.3/ },
    { name: 'Windows 8', regex: /Windows NT 6\.2/ },
    { name: 'Windows 7', regex: /Windows NT 6\.1/ },
    { name: 'Windows Vista', regex: /Windows NT 6\.0/ },
    { name: 'Windows XP', regex: /Windows NT 5\.1/ },
    { name: 'macOS', regex: /Mac OS X ([\d_]+)/ },
    { name: 'Linux', regex: /Linux/ },
    { name: 'Android', regex: /Android ([\d.]+)/ },
    { name: 'iOS', regex: /(?:iPhone|iPad|iPod).*OS ([\d_]+)/ },
    { name: 'Chrome OS', regex: /CrOS/ }
  ];

  var engines = [
    { name: 'Blink', regex: /Chrome\// },
    { name: 'Gecko', regex: /Firefox\// },
    { name: 'WebKit', regex: /AppleWebKit/ },
    { name: 'Trident', regex: /Trident/ },
    { name: 'EdgeHTML', regex: /Edge\/(?!Edg)/ }
  ];

  var devices = [
    { type: 'Mobile', regex: /Mobile|Android.*Mobile|iPhone|iPod/ },
    { type: 'Tablet', regex: /iPad|Android(?!.*Mobile)|Tablet/ },
    { type: 'Desktop', regex: /.*/ }
  ];

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function parseUA(str) {
    var result = {
      browser: { name: '未知', version: '' },
      os: { name: '未知', version: '' },
      engine: '未知',
      device: 'Desktop',
      raw: str
    };

    for (var i = 0; i < browsers.length; i++) {
      var m = str.match(browsers[i].regex);
      if (m) {
        result.browser = { name: browsers[i].name, version: m[1] || '' };
        break;
      }
    }

    for (var j = 0; j < osList.length; j++) {
      var om = str.match(osList[j].regex);
      if (om) {
        var osVersion = om[1] ? om[1].replace(/_/g, '.') : '';
        result.os = { name: osList[j].name, version: osVersion };
        break;
      }
    }

    for (var k = 0; k < engines.length; k++) {
      if (engines[k].regex.test(str)) {
        result.engine = engines[k].name;
        break;
      }
    }

    for (var d = 0; d < devices.length; d++) {
      if (devices[d].regex.test(str)) {
        result.device = devices[d].type;
        break;
      }
    }

    return result;
  }

  function renderResult(ua) {
    var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">';
    html += '<div style="padding:12px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--card-border)">';
    html += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">浏览器</div>';
    html += '<div style="font-size:16px;font-weight:600">' + escHtml(ua.browser.name) + ' ' + escHtml(ua.browser.version) + '</div></div>';
    html += '<div style="padding:12px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--card-border)">';
    html += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">操作系统</div>';
    html += '<div style="font-size:16px;font-weight:600">' + escHtml(ua.os.name) + (ua.os.version ? ' ' + escHtml(ua.os.version) : '') + '</div></div>';
    html += '<div style="padding:12px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--card-border)">';
    html += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">设备类型</div>';
    html += '<div style="font-size:16px;font-weight:600">' + escHtml(ua.device) + '</div></div>';
    html += '<div style="padding:12px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--card-border)">';
    html += '<div style="font-size:12px;color:var(--text-secondary);margin-bottom:4px">渲染引擎</div>';
    html += '<div style="font-size:16px;font-weight:600">' + escHtml(ua.engine) + '</div></div>';
    html += '</div>';

    html += '<table class="data-table"><thead><tr><th>属性</th><th>值</th></tr></thead><tbody>';
    html += '<tr><td>浏览器</td><td>' + escHtml(ua.browser.name) + ' ' + escHtml(ua.browser.version) + '</td></tr>';
    html += '<tr><td>操作系统</td><td>' + escHtml(ua.os.name) + (ua.os.version ? ' ' + escHtml(ua.os.version) : '') + '</td></tr>';
    html += '<tr><td>设备类型</td><td>' + escHtml(ua.device) + '</td></tr>';
    html += '<tr><td>渲染引擎</td><td>' + escHtml(ua.engine) + '</td></tr>';
    html += '<tr><td>原始字符串</td><td style="word-break:break-all;font-size:12px">' + escHtml(ua.raw) + '</td></tr>';
    html += '</tbody></table>';

    return html;
  }

  parseBtn.addEventListener('click', function() {
    var str = input.value.trim();
    if (!str) {
      window.showToast && window.showToast('请输入 User-Agent 字符串');
      return;
    }
    var ua = parseUA(str);
    resultDiv.innerHTML = renderResult(ua);
    window.showToast && window.showToast('解析完成');
  });

  clearBtn.addEventListener('click', function() {
    input.value = '';
    resultDiv.innerHTML = '';
  });

  var sampleUA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  input.value = sampleUA;
  var ua = parseUA(sampleUA);
  resultDiv.innerHTML = renderResult(ua);
})();
