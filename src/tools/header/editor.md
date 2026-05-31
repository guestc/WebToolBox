---
layout: tool.njk
title: HTTP 请求头编辑器
description: 在线构造和编辑HTTP请求头，生成自定义请求头字符串
category: header
categoryName: 请求头工具
script: /assets/js/tools/header-editor.js
tags: ["HTTP", "请求头", "编辑"]
---
<div class="tool-container">
  <div class="input-group">
    <label>输入原始请求头（每行一个 Key: Value）</label>
    <textarea id="header-input" rows="6" placeholder="Content-Type: application/json&#10;Authorization: Bearer token123&#10;Accept: text/html"></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="parse-btn">解析</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
    <button class="btn btn-secondary" id="add-btn">添加新项</button>
  </div>
  <div class="output-group">
    <label>请求头列表（可编辑）</label>
    <div id="header-table-wrap"></div>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="export-btn">导出请求头字符串</button>
    <button class="btn btn-secondary" id="copy-btn">复制结果</button>
  </div>
  <div class="output-group">
    <label>导出结果</label>
    <textarea id="export-output" rows="4" readonly></textarea>
  </div>
</div>
