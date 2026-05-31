---
layout: tool.njk
title: Cookie 导入/导出
description: 在JSON、Netscape、Header字符串等Cookie格式之间导入和导出
category: cookie
categoryName: Cookie 管理
script: /assets/js/tools/cookie-import-export.js
tags: ["cookie", "导入", "导出", "格式转换"]
---
<div class="tool-container">
  <div class="options-row">
    <label>输入格式：</label>
    <select id="input-format">
      <option value="header">Header 字符串 (Cookie: k=v; k2=v2)</option>
      <option value="json">JSON 数组</option>
      <option value="netscape">Netscape 格式</option>
    </select>
  </div>
  <div class="input-group">
    <label>粘贴 Cookie 数据</label>
    <textarea id="cookie-input" rows="6" placeholder="粘贴你的 Cookie 数据..."></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="import-btn">导入并解析</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
  </div>
  <div class="options-row">
    <label>导出格式：</label>
    <select id="output-format">
      <option value="header">Header 字符串</option>
      <option value="json">JSON 数组</option>
      <option value="netscape">Netscape 格式</option>
    </select>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="export-btn">导出</button>
    <button class="btn btn-secondary" id="copy-btn">复制结果</button>
  </div>
  <div class="output-group">
    <label>导出结果</label>
    <textarea id="export-output" rows="6" readonly></textarea>
  </div>
</div>
