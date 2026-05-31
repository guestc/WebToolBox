---
layout: tool.njk
title: cURL 转代码
description: 将cURL命令转换为Python/JavaScript/PHP等语言的HTTP请求代码
category: header
categoryName: 请求头工具
script: /assets/js/tools/curl-to-code.js
tags: ["cURL", "代码转换", "HTTP"]
---
<div class="tool-container">
  <div class="input-group">
    <label>输入 cURL 命令</label>
    <textarea id="curl-input" rows="6" placeholder='curl -X POST https://api.example.com/data -H "Content-Type: application/json" -H "Authorization: Bearer token" -d "{\"key\":\"value\"}"'></textarea>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label>目标语言</label>
      <select id="lang-select">
        <option value="python">Python (requests)</option>
        <option value="javascript">JavaScript (fetch)</option>
        <option value="php">PHP (cURL)</option>
        <option value="nodejs">Node.js (fetch)</option>
        <option value="go">Go (net/http)</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="convert-btn">转换</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
  </div>
  <div class="output-group">
    <label>转换结果</label>
    <textarea id="code-output" rows="12" readonly></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-secondary" id="copy-btn">复制代码</button>
  </div>
</div>
