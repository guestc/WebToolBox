---
layout: tool.njk
title: Cookie 格式转换
description: 在JSON、Netscape、Header字符串等Cookie格式之间互相转换
category: cookie
categoryName: Cookie 管理
script: /assets/js/tools/cookie-converter.js
tags: ["cookie", "格式转换", "JSON", "Netscape"]
---
<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label>输入 Cookie</label>
      <textarea id="cookie-input" rows="10" placeholder="粘贴 Cookie 数据..."></textarea>
    </div>
    <div class="output-group">
      <label>转换结果</label>
      <textarea id="cookie-output" rows="10" readonly></textarea>
    </div>
  </div>
  <div class="options-row">
    <label>输入格式：</label>
    <select id="from-format">
      <option value="header">Header 字符串</option>
      <option value="json">JSON</option>
      <option value="netscape">Netscape</option>
    </select>
    <label>输出格式：</label>
    <select id="to-format">
      <option value="json">JSON</option>
      <option value="header">Header 字符串</option>
      <option value="netscape">Netscape</option>
    </select>
    <button class="btn btn-primary" id="convert-btn">转换</button>
    <button class="btn btn-secondary" id="swap-btn">交换</button>
    <button class="btn btn-secondary" id="copy-btn">复制</button>
  </div>
</div>
