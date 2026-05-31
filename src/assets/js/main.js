(function() {
  // Theme toggle
  var toggle = document.getElementById('theme-toggle');
  var iconDark = document.getElementById('theme-icon-dark');
  var iconLight = document.getElementById('theme-icon-light');

  function updateThemeIcon() {
    var theme = document.documentElement.getAttribute('data-theme');
    if (iconDark && iconLight) {
      iconDark.style.display = theme === 'dark' ? 'none' : 'block';
      iconLight.style.display = theme === 'dark' ? 'block' : 'none';
    }
  }

  updateThemeIcon();

  if (toggle) {
    toggle.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });
  }

  // Init Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Toast helper
  window.showToast = function(msg, duration) {
    duration = duration || 2000;
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function() { toast.classList.remove('show'); }, duration);
  };

  // Copy to clipboard helper
  window.copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showToast('已复制到剪贴板');
      }).catch(function() {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('已复制到剪贴板');
    } catch(e) {
      showToast('复制失败，请手动复制');
    }
    document.body.removeChild(ta);
  }
})();

// Frequent Tools Module
window.FrequentTools = (function() {
  var KEY = 'frequentTools';
  var MAX = 10;

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch(e) {
      return {};
    }
  }

  function saveAll(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function record(url, title, category) {
    if (!url || !title) return;
    var data = getAll();
    if (!data[url]) {
      data[url] = { title: title, category: category || '', count: 0 };
    }
    data[url].count++;
    saveAll(data);
  }

  function getTop(n) {
    n = n || MAX;
    var data = getAll();
    var arr = Object.keys(data).map(function(url) {
      return { url: url, title: data[url].title, category: data[url].category, count: data[url].count };
    });
    arr.sort(function(a, b) { return b.count - a.count; });
    return arr.slice(0, n);
  }

  return { record: record, getTop: getTop };
})();
