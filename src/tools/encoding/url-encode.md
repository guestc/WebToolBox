---
layout: tool.njk
title: URL 编码/解码
description: URL百分号编码和解码，处理特殊字符
category: encoding
categoryName: 编码/解码
script: /assets/js/tools/url-encode.js
tags: ["URL", "编码", "解码"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="url-input">输入</label>
      <textarea id="url-input" rows="10" placeholder="输入URL或文本..."></textarea>
    </div>
    <div class="output-group">
      <label for="url-output">输出</label>
      <textarea id="url-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="url-mode">模式</label>
      <select id="url-mode">
        <option value="encodeComponent">编码组件 (encodeURIComponent)</option>
        <option value="decodeComponent">解码组件 (decodeURIComponent)</option>
        <option value="encodeFull">编码完整URL (encodeURI)</option>
        <option value="decodeFull">解码完整URL (decodeURI)</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="url-run" class="btn btn-primary">执行</button>
    <button id="url-swap" class="btn btn-secondary">交换</button>
    <button id="url-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
