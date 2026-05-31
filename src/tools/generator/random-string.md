---
layout: tool.njk
title: 随机字符串生成器
description: 生成指定长度和字符集的随机字符串
category: generator
categoryName: 随机生成
script: /assets/js/tools/random-string.js
tags: ["随机", "字符串", "生成"]
---

<div class="tool-container">
  <div class="options-row">
    <div class="input-group">
      <label for="rs-length">长度</label>
      <input type="number" id="rs-length" value="16" min="1" max="1024" />
    </div>
    <div class="input-group">
      <label for="rs-quantity">生成数量</label>
      <input type="number" id="rs-quantity" value="5" min="1" max="50" />
    </div>
    <div class="input-group">
      <label for="rs-separator">分隔符（每N个字符，0=不分隔）</label>
      <input type="number" id="rs-separator" value="0" min="0" max="64" />
    </div>
  </div>
  <div class="options-row">
    <label>字符集：</label>
    <label><input type="checkbox" id="rs-upper" checked /> 大写 (A-Z)</label>
    <label><input type="checkbox" id="rs-lower" checked /> 小写 (a-z)</label>
    <label><input type="checkbox" id="rs-digit" checked /> 数字 (0-9)</label>
    <label><input type="checkbox" id="rs-symbol" /> 符号</label>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="rs-custom">自定义字符</label>
      <input type="text" id="rs-custom" placeholder="输入自定义字符集..." />
    </div>
  </div>
  <div class="button-group">
    <button id="rs-generate" class="btn btn-primary">生成</button>
    <button id="rs-copy" class="btn btn-sm">复制全部</button>
  </div>
  <div class="output-group">
    <label for="rs-output">生成结果</label>
    <textarea id="rs-output" rows="8" readonly placeholder="点击生成按钮..."></textarea>
  </div>
</div>
