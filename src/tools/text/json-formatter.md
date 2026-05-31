---
layout: tool.njk
title: JSON 格式化/压缩
description: 格式化或压缩JSON数据，支持语法检查
category: text
categoryName: 文本处理
script: /assets/js/tools/json-formatter.js
tags: ["JSON", "格式化", "压缩"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="json-input">输入 JSON</label>
      <textarea id="json-input" rows="12" placeholder='{"name":"test","items":[1,2,3]}'></textarea>
    </div>
    <div class="output-group">
      <label for="json-output">输出</label>
      <textarea id="json-output" rows="12" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="json-indent">缩进</label>
      <select id="json-indent">
        <option value="2">2 空格</option>
        <option value="4">4 空格</option>
        <option value="tab">Tab</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="json-format" class="btn btn-primary">格式化</button>
    <button id="json-minify" class="btn btn-secondary">压缩</button>
    <button id="json-validate" class="btn btn-secondary">校验</button>
    <button id="json-copy" class="btn btn-sm">复制结果</button>
  </div>
  <div id="json-error" style="color:#e74c3c;font-size:0.9em;margin-top:0.5rem;display:none;"></div>
</div>
