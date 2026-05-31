---
layout: tool.njk
title: AES 加解密
description: 使用AES算法对文本进行加密和解密
category: crypto
categoryName: 加密/哈希
script: /assets/js/tools/aes.js
tags: ["AES", "加密", "解密"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="aes-input">输入</label>
      <textarea id="aes-input" rows="10" placeholder="输入要加密或解密的文本..."></textarea>
    </div>
    <div class="output-group">
      <label for="aes-output">输出</label>
      <textarea id="aes-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="aes-key">密钥</label>
      <input type="text" id="aes-key" placeholder="输入密钥...">
    </div>
    <div class="input-group">
      <label for="aes-mode">模式</label>
      <select id="aes-mode">
        <option value="encrypt">加密</option>
        <option value="decrypt">解密</option>
      </select>
    </div>
    <div class="input-group">
      <label for="aes-size">密钥长度</label>
      <select id="aes-size">
        <option value="128">128 位</option>
        <option value="256">256 位</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="aes-run" class="btn btn-primary">执行</button>
    <button id="aes-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
