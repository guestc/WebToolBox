---
layout: tool.njk
title: Unicode 编码/解码
description: 在Unicode转义序列（\uXXXX）和正常字符之间转换
category: encoding
categoryName: 编码/解码
script: /assets/js/tools/unicode.js
tags: ["Unicode", "编码", "解码"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="unicode-input">输入</label>
      <textarea id="unicode-input" rows="10" placeholder="输入文本或Unicode转义序列..."></textarea>
    </div>
    <div class="output-group">
      <label for="unicode-output">输出</label>
      <textarea id="unicode-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="unicode-format">格式</label>
      <select id="unicode-format">
        <option value="backslash-u">\uXXXX</option>
        <option value="html-decimal">&#decimal;</option>
        <option value="html-hex">&#xHEX;</option>
        <option value="unicode-point">U+XXXX</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="unicode-encode" class="btn btn-primary">编码</button>
    <button id="unicode-decode" class="btn btn-primary">解码</button>
    <button id="unicode-swap" class="btn btn-secondary">交换</button>
    <button id="unicode-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
