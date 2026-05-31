(function() {
  var regexInput = document.getElementById('regex-input');
  var flagG = document.getElementById('regex-flag-g');
  var flagI = document.getElementById('regex-flag-i');
  var flagM = document.getElementById('regex-flag-m');
  var flagS = document.getElementById('regex-flag-s');
  var textArea = document.getElementById('regex-text');
  var highlightDiv = document.getElementById('regex-highlight');
  var infoDiv = document.getElementById('regex-info');
  var matchesBody = document.getElementById('regex-matches').querySelector('tbody');

  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function run() {
    var pattern = regexInput.value;
    var text = textArea.value;
    if (!pattern || !text) {
      highlightDiv.innerHTML = escapeHTML(text);
      infoDiv.textContent = '';
      matchesBody.innerHTML = '';
      return;
    }
    var flags = '';
    if (flagG.checked) flags += 'g';
    if (flagI.checked) flags += 'i';
    if (flagM.checked) flags += 'm';
    if (flagS.checked) flags += 's';

    var regex;
    try {
      regex = new RegExp(pattern, flags);
    } catch (e) {
      highlightDiv.innerHTML = '<span style="color:#e74c3c;">正则表达式错误: ' + escapeHTML(e.message) + '</span>';
      infoDiv.textContent = '';
      matchesBody.innerHTML = '';
      return;
    }

    var matches = [];
    if (flags.indexOf('g') !== -1) {
      var m;
      while ((m = regex.exec(text)) !== null) {
        matches.push({ value: m[0], index: m.index, groups: m.slice(1) });
        if (m[0].length === 0) regex.lastIndex++;
      }
    } else {
      var m = regex.exec(text);
      if (m) matches.push({ value: m[0], index: m.index, groups: m.slice(1) });
    }

    infoDiv.textContent = '共找到 ' + matches.length + ' 个匹配';

    matchesBody.innerHTML = '';
    matches.forEach(function(match, i) {
      var tr = document.createElement('tr');
      var tdIdx = document.createElement('td');
      tdIdx.textContent = i + 1;
      tdIdx.style.textAlign = 'center';
      var tdVal = document.createElement('td');
      tdVal.textContent = match.value;
      tdVal.style.wordBreak = 'break-all';
      var tdPos = document.createElement('td');
      tdPos.textContent = match.index;
      tdPos.style.textAlign = 'center';
      var tdGroups = document.createElement('td');
      tdGroups.textContent = match.groups.length ? match.groups.join(', ') : '-';
      tdGroups.style.wordBreak = 'break-all';
      tr.appendChild(tdIdx);
      tr.appendChild(tdVal);
      tr.appendChild(tdPos);
      tr.appendChild(tdGroups);
      matchesBody.appendChild(tr);
    });

    if (matches.length === 0) {
      highlightDiv.innerHTML = escapeHTML(text);
      return;
    }

    var html = '';
    var last = 0;
    var sorted = matches.slice().sort(function(a, b) { return a.index - b.index; });
    sorted.forEach(function(match) {
      if (match.index > last) {
        html += escapeHTML(text.substring(last, match.index));
      }
      html += '<mark style="background:#fff3a8;padding:1px 2px;border-radius:2px;">' + escapeHTML(match.value) + '</mark>';
      last = match.index + match.value.length;
    });
    if (last < text.length) {
      html += escapeHTML(text.substring(last));
    }
    highlightDiv.innerHTML = html;
  }

  regexInput.addEventListener('input', run);
  textArea.addEventListener('input', run);
  flagG.addEventListener('change', run);
  flagI.addEventListener('change', run);
  flagM.addEventListener('change', run);
  flagS.addEventListener('change', run);
})();
