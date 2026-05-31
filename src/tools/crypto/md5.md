---
layout: tool.njk
title: MD5 哈希生成器
description: 计算字符串的MD5哈希值
category: crypto
categoryName: 加密/哈希
script: /assets/js/tools/md5.js
tags: ["MD5", "哈希", "加密"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="md5-input">输入</label>
      <textarea id="md5-input" rows="10" placeholder="输入要计算MD5哈希的文本..."></textarea>
    </div>
    <div class="output-group">
      <label for="md5-output">MD5 哈希值</label>
      <textarea id="md5-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <label>
      <input type="checkbox" id="md5-uppercase"> 大写输出
    </label>
  </div>
  <div class="button-group">
    <button id="md5-run" class="btn btn-primary">生成哈希</button>
    <button id="md5-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
