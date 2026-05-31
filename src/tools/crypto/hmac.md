---
layout: tool.njk
title: HMAC 生成器
description: 使用指定密钥和哈希算法生成HMAC签名
category: crypto
categoryName: 加密/哈希
script: /assets/js/tools/hmac.js
tags: ["HMAC", "签名", "加密"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="hmac-input">输入文本</label>
      <textarea id="hmac-input" rows="8" placeholder="输入要签名的文本..."></textarea>
    </div>
    <div class="output-group">
      <label for="hmac-output">HMAC 签名</label>
      <textarea id="hmac-output" rows="8" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="hmac-key">密钥</label>
      <input type="text" id="hmac-key" placeholder="输入密钥...">
    </div>
    <div class="input-group">
      <label for="hmac-algo">算法</label>
      <select id="hmac-algo">
        <option value="SHA-256">SHA-256</option>
        <option value="SHA-384">SHA-384</option>
        <option value="SHA-512">SHA-512</option>
        <option value="SHA-1">SHA-1</option>
      </select>
    </div>
    <label>
      <input type="checkbox" id="hmac-uppercase"> 大写输出
    </label>
  </div>
  <div class="button-group">
    <button id="hmac-run" class="btn btn-primary">生成 HMAC</button>
    <button id="hmac-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
