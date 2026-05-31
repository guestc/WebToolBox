---
layout: tool.njk
title: User-Agent 解析器
description: 解析UA字符串，提取浏览器、操作系统、设备信息
category: header
categoryName: 请求头工具
script: /assets/js/tools/ua-parser.js
tags: ["User-Agent", "解析", "浏览器"]
---
<div class="tool-container">
  <div class="input-group">
    <label>输入 User-Agent 字符串</label>
    <textarea id="ua-input" rows="4" placeholder="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="parse-btn">解析</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
  </div>
  <div class="output-group">
    <label>解析结果</label>
    <div id="ua-result"></div>
  </div>
</div>
