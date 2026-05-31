(function() {
  var input = document.getElementById('set-cookie-input');
  var parseBtn = document.getElementById('parse-btn');
  var clearBtn = document.getElementById('clear-btn');
  var copyBtn = document.getElementById('copy-btn');
  var result = document.getElementById('parse-result');

  function parseSetCookie(str) {
    var lines = str.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
    return lines.map(function(line) {
      var parts = line.split(';').map(function(s) { return s.trim(); });
      var main = parts[0];
      var eqIdx = main.indexOf('=');
      var name = eqIdx === -1 ? main : main.substring(0, eqIdx).trim();
      var value = eqIdx === -1 ? '' : main.substring(eqIdx + 1).trim();
      var attrs = {};
      for (var i = 1; i < parts.length; i++) {
        var attr = parts[i];
        var attrEq = attr.indexOf('=');
        if (attrEq === -1) {
          attrs[attr.toLowerCase()] = true;
        } else {
          attrs[attr.substring(0, attrEq).trim().toLowerCase()] = attr.substring(attrEq + 1).trim();
        }
      }
      return { name: name, value: value, attributes: attrs };
    });
  }

  function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  parseBtn.addEventListener('click', function() {
    var parsed = parseSetCookie(input.value);
    if (!parsed.length) { showToast('未解析到Set-Cookie'); return; }

    var html = '';
    parsed.forEach(function(cookie, idx) {
      html += '<div style="margin-bottom:20px;padding:16px;background:var(--bg-secondary);border-radius:8px">';
      html += '<h3 style="font-size:15px;margin-bottom:10px">Cookie ' + (idx + 1) + ': <code>' + esc(cookie.name) + '</code></h3>';
      html += '<table class="data-table"><tbody>';
      html += '<tr><td style="font-weight:600;width:140px">名称</td><td>' + esc(cookie.name) + '</td></tr>';
      html += '<tr><td style="font-weight:600">值</td><td><code>' + esc(cookie.value) + '</code></td></tr>';
      Object.keys(cookie.attributes).forEach(function(key) {
        html += '<tr><td style="font-weight:600">' + esc(key) + '</td><td>' + esc(cookie.attributes[key]) + '</td></tr>';
      });
      html += '</tbody></table></div>';
    });
    result.innerHTML = html;
    showToast('解析到 ' + parsed.length + ' 个Set-Cookie');
  });

  clearBtn.addEventListener('click', function() {
    input.value = '';
    result.innerHTML = '';
  });

  copyBtn.addEventListener('click', function() {
    var parsed = parseSetCookie(input.value);
    copyToClipboard(JSON.stringify(parsed, null, 2));
  });
})();
