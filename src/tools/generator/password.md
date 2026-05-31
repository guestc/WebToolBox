---
layout: tool.njk
title: 随机密码生成器
description: 根据指定长度和字符类型生成安全的随机密码
category: generator
categoryName: 随机生成
script: /assets/js/tools/password.js
tags: ["密码", "随机", "生成"]
---

<div class="tool-container">
  <div class="options-row">
    <div class="input-group">
      <label for="pwd-length">密码长度: <span id="pwd-length-val">16</span></label>
      <input type="range" id="pwd-length" min="8" max="128" value="16" />
    </div>
    <div class="input-group">
      <label for="pwd-quantity">生成数量</label>
      <input type="number" id="pwd-quantity" value="5" min="1" max="20" />
    </div>
  </div>
  <div class="options-row">
    <label><input type="checkbox" id="pwd-upper" checked /> 大写字母 (A-Z)</label>
    <label><input type="checkbox" id="pwd-lower" checked /> 小写字母 (a-z)</label>
    <label><input type="checkbox" id="pwd-digit" checked /> 数字 (0-9)</label>
    <label><input type="checkbox" id="pwd-symbol" checked /> 符号 (!@#$...)</label>
    <label><input type="checkbox" id="pwd-ambiguous" /> 排除易混淆字符 (0Ol1I)</label>
  </div>
  <div class="button-group">
    <button id="pwd-generate" class="btn btn-primary">生成</button>
    <button id="pwd-copy" class="btn btn-sm">复制全部</button>
  </div>
  <div class="output-group">
    <label for="pwd-output">生成结果</label>
    <textarea id="pwd-output" rows="8" readonly placeholder="点击生成按钮..."></textarea>
  </div>
</div>
