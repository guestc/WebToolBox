---
layout: tool.njk
title: JWT 解码器
description: 解码JSON Web Token，展示Header、Payload和签名信息
category: crypto
categoryName: 加密/哈希
script: /assets/js/tools/jwt-decoder.js
tags: ["JWT", "解码", "Token"]
---

<div class="tool-container">
  <div class="input-group">
    <label for="jwt-input">输入 JWT</label>
    <textarea id="jwt-input" rows="6" placeholder="粘贴JWT Token..."></textarea>
  </div>
  <div class="button-group">
    <button id="jwt-run" class="btn btn-primary">解码</button>
    <button id="jwt-copy" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <label>Header</label>
    <textarea id="jwt-header" rows="6" readonly placeholder="Header 将显示在这里..."></textarea>
  </div>
  <div class="output-group">
    <label>Payload</label>
    <textarea id="jwt-payload" rows="10" readonly placeholder="Payload 将显示在这里..."></textarea>
  </div>
  <div id="jwt-expiry" class="options-row" style="display:none;"></div>
  <div class="output-group">
    <label>Signature (Hex)</label>
    <textarea id="jwt-signature" rows="3" readonly placeholder="签名将显示在这里..."></textarea>
  </div>
</div>
