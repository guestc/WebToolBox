---
layout: tool.njk
title: URL 解析器
description: 将URL拆分为协议、主机、端口、路径、查询参数、锚点等各部分
category: network
categoryName: URL/网络
script: /assets/js/tools/url-parser.js
tags: ["URL", "解析"]
---

<div class="tool-container">
  <div class="input-group">
    <label for="url-input">输入 URL</label>
    <input type="text" id="url-input" placeholder="https://example.com:8080/path?name=test&page=1#section" />
  </div>
  <div class="button-group">
    <button id="parse-btn" class="btn btn-primary">解析</button>
    <button id="copy-btn" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <label>解析结果</label>
    <table id="url-parts" class="data-table">
      <thead>
        <tr><th>部分</th><th>值</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
  <div class="output-group">
    <label>查询参数</label>
    <table id="url-params" class="data-table">
      <thead>
        <tr><th>参数名</th><th>参数值</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
