---
layout: tool.njk
title: Hex 编码/解码
description: 文本与十六进制表示之间的转换
category: encoding
categoryName: 编码/解码
script: /assets/js/tools/hex.js
tags: ["Hex", "十六进制", "编码", "解码"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="hex-input">输入</label>
      <textarea id="hex-input" rows="10" placeholder="输入文本或十六进制数据..."></textarea>
    </div>
    <div class="output-group">
      <label for="hex-output">输出</label>
      <textarea id="hex-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="hex-separator">分隔符</label>
      <select id="hex-separator">
        <option value="none">无分隔符</option>
        <option value="space" selected>空格</option>
        <option value="0x">0x 前缀</option>
        <option value="backslash-x">\x 前缀</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="hex-encode" class="btn btn-primary">编码</button>
    <button id="hex-decode" class="btn btn-primary">解码</button>
    <button id="hex-swap" class="btn btn-secondary">交换</button>
    <button id="hex-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
