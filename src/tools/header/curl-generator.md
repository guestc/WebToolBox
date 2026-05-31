---
layout: tool.njk
title: cURL 生成器
description: 通过可视化配置生成cURL命令
category: header
categoryName: 请求头工具
script: /assets/js/tools/curl-generator.js
tags: ["cURL", "HTTP", "生成器"]
---
<div class="tool-container">
  <div class="input-group">
    <label>请求 URL</label>
    <input type="text" id="curl-url" placeholder="https://api.example.com/v1/resource" />
  </div>
  <div class="options-row">
    <div class="input-group">
      <label>请求方法</label>
      <select id="curl-method">
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
        <option value="PATCH">PATCH</option>
      </select>
    </div>
  </div>
  <div class="input-group">
    <label>请求头（每行一个 Key: Value）</label>
    <textarea id="curl-headers" rows="4" placeholder="Content-Type: application/json&#10;Authorization: Bearer token123"></textarea>
  </div>
  <div class="input-group">
    <label>请求体</label>
    <textarea id="curl-body" rows="4" placeholder='{"key": "value"}'></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="generate-btn">生成 cURL</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
  </div>
  <div class="output-group">
    <label>生成结果</label>
    <textarea id="curl-output" rows="6" readonly></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-secondary" id="copy-btn">复制 cURL</button>
  </div>
</div>
