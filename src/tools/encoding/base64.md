---
layout: tool.njk
title: Base64 编码/解码
description: 将文本在Base64格式之间转换，支持UTF-8
category: encoding
categoryName: 编码/解码
script: /assets/js/tools/base64.js
tags: ["Base64", "编码", "解码"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="base64-input">输入</label>
      <textarea id="base64-input" rows="10" placeholder="输入要编码或解码的文本..."></textarea>
    </div>
    <div class="output-group">
      <label for="base64-output">输出</label>
      <textarea id="base64-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="base64-mode">模式</label>
      <select id="base64-mode">
        <option value="encode">编码 (文本 → Base64)</option>
        <option value="decode">解码 (Base64 → 文本)</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="base64-run" class="btn btn-primary">执行</button>
    <button id="base64-swap" class="btn btn-secondary">交换</button>
    <button id="base64-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
