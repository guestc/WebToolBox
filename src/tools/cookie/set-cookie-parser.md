---
layout: tool.njk
title: Set-Cookie 解析器
description: 解析HTTP响应头中的Set-Cookie字段，展示所有属性
category: cookie
categoryName: Cookie 管理
script: /assets/js/tools/set-cookie-parser.js
tags: ["cookie", "Set-Cookie", "HTTP", "解析"]
---
<div class="tool-container">
  <div class="input-group">
    <label>粘贴 Set-Cookie 响应头（可包含多个，每行一个）</label>
    <textarea id="set-cookie-input" rows="6" placeholder='session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Lax&#10;token=xyz789; Domain=.example.com; Max-Age=3600'></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="parse-btn">解析</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
    <button class="btn btn-secondary" id="copy-btn">复制为JSON</button>
  </div>
  <div class="output-group">
    <label>解析结果</label>
    <div id="parse-result"></div>
  </div>
</div>
