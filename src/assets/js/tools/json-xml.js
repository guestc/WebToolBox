(function() {
  var input = document.getElementById('jxml-input');
  var output = document.getElementById('jxml-output');
  var direction = document.getElementById('jxml-direction');
  var rootInput = document.getElementById('jxml-root');
  var indentInput = document.getElementById('jxml-indent');
  var convertBtn = document.getElementById('jxml-convert');
  var swapBtn = document.getElementById('jxml-swap');
  var copyBtn = document.getElementById('jxml-copy');

  function escapeXML(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  function jsonToXML(data, tagName, indent, level) {
    var pad = new Array(level * indent + 1).join(' ');
    var padChild = new Array((level + 1) * indent + 1).join(' ');
    if (data === null || data === undefined) {
      return pad + '<' + tagName + '/>\n';
    }
    if (typeof data !== 'object') {
      return pad + '<' + tagName + '>' + escapeXML(data) + '</' + tagName + '>\n';
    }
    if (Array.isArray(data)) {
      var xml = '';
      data.forEach(function(item) {
        xml += jsonToXML(item, tagName, indent, level);
      });
      return xml;
    }
    var xml = pad + '<' + tagName + '>\n';
    for (var key in data) {
      if (!data.hasOwnProperty(key)) continue;
      if (Array.isArray(data[key])) {
        data[key].forEach(function(item) {
          xml += jsonToXML(item, key, indent, level + 1);
        });
      } else {
        xml += jsonToXML(data[key], key, indent, level + 1);
      }
    }
    xml += pad + '</' + tagName + '>\n';
    return xml;
  }

  function convertJSON2XML() {
    var text = input.value.trim();
    if (!text) return;
    try {
      var data = JSON.parse(text);
      var rootName = rootInput.value.trim() || 'root';
      var indent = parseInt(indentInput.value, 10) || 2;
      var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      if (Array.isArray(data)) {
        xml += '<' + rootName + '>\n';
        data.forEach(function(item) {
          xml += jsonToXML(item, 'item', indent, 1);
        });
        xml += '</' + rootName + '>\n';
      } else {
        xml += jsonToXML(data, rootName, indent, 0);
      }
      output.value = xml.trim();
    } catch (e) {
      window.showToast('JSON 解析错误: ' + e.message);
    }
  }

  function xmlToObj(xmlStr) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(xmlStr, 'text/xml');
    var errors = doc.getElementsByTagName('parsererror');
    if (errors.length > 0) {
      throw new Error('XML 解析错误');
    }
    function nodeToObj(node) {
      if (node.nodeType === 3) return node.textContent.trim();
      var obj = {};
      if (node.attributes) {
        for (var i = 0; i < node.attributes.length; i++) {
          obj['@' + node.attributes[i].name] = node.attributes[i].value;
        }
      }
      var children = node.childNodes;
      var textContent = '';
      var hasElements = false;
      for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 1) {
          hasElements = true;
          var name = children[i].nodeName;
          var val = nodeToObj(children[i]);
          if (obj[name] !== undefined) {
            if (!Array.isArray(obj[name])) obj[name] = [obj[name]];
            obj[name].push(val);
          } else {
            obj[name] = val;
          }
        } else if (children[i].nodeType === 3) {
          textContent += children[i].textContent.trim();
        }
      }
      if (!hasElements && textContent) {
        if (Object.keys(obj).length > 0) {
          obj['#text'] = textContent;
        } else {
          return textContent;
        }
      }
      if (!hasElements && !textContent && Object.keys(obj).length === 0) return '';
      return obj;
    }
    return nodeToObj(doc.documentElement);
  }

  function convertXML2JSON() {
    var text = input.value.trim();
    if (!text) return;
    try {
      var result = xmlToObj(text);
      var indent = parseInt(indentInput.value, 10) || 2;
      output.value = JSON.stringify(result, null, indent);
    } catch (e) {
      window.showToast('XML 解析错误: ' + e.message);
    }
  }

  function convert() {
    if (direction.value === 'json2xml') convertJSON2XML();
    else convertXML2JSON();
  }

  function swap() {
    var tmp = input.value;
    input.value = output.value;
    output.value = tmp;
    direction.value = direction.value === 'json2xml' ? 'xml2json' : 'json2xml';
  }

  function copy() {
    if (output.value) {
      window.copyToClipboard(output.value);
      window.showToast('已复制到剪贴板');
    }
  }

  convertBtn.addEventListener('click', convert);
  swapBtn.addEventListener('click', swap);
  copyBtn.addEventListener('click', copy);
})();
