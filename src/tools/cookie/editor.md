---
layout: tool.njk
title: Cookie 编辑器
description: 在线编辑Cookie的各项属性，支持添加、修改、删除Cookie
category: cookie
categoryName: Cookie 管理
script: /assets/js/tools/cookie-editor.js
tags: ["cookie", "编辑", "爬虫"]
---
<div class="tool-container">
  <div class="input-group">
    <label>输入 Cookie 字符串（Name=Value 格式，每行一个或用分号分隔）</label>
    <textarea id="cookie-input" rows="4" placeholder="session_id=abc123; token=xyz789; user=john"></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="parse-btn">解析</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
    <button class="btn btn-secondary" id="add-btn">添加新项</button>
  </div>
  <div class="output-group">
    <label>Cookie 列表（可编辑）</label>
    <div id="cookie-table-wrap"></div>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="export-header-btn">导出为 Header</button>
    <button class="btn btn-secondary" id="export-json-btn">导出为 JSON</button>
    <button class="btn btn-secondary" id="copy-btn">复制结果</button>
  </div>
  <div class="output-group">
    <label>导出结果</label>
    <textarea id="export-output" rows="4" readonly></textarea>
  </div>
</div>
