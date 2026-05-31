---
layout: tool.njk
title: 随机 User-Agent 生成
description: 从真实浏览器UA库中随机选取User-Agent字符串
category: generator
categoryName: 随机生成
script: /assets/js/tools/random-ua.js
tags: ["User-Agent", "随机", "爬虫"]
---

<div class="tool-container">
  <div class="options-row">
    <label>浏览器：</label>
    <label><input type="checkbox" id="ua-chrome" checked /> Chrome</label>
    <label><input type="checkbox" id="ua-firefox" checked /> Firefox</label>
    <label><input type="checkbox" id="ua-safari" checked /> Safari</label>
    <label><input type="checkbox" id="ua-edge" checked /> Edge</label>
  </div>
  <div class="options-row">
    <label>操作系统：</label>
    <label><input type="checkbox" id="ua-windows" checked /> Windows</label>
    <label><input type="checkbox" id="ua-macos" checked /> macOS</label>
    <label><input type="checkbox" id="ua-linux" checked /> Linux</label>
    <label><input type="checkbox" id="ua-android" checked /> Android</label>
    <label><input type="checkbox" id="ua-ios" checked /> iOS</label>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="ua-quantity">生成数量</label>
      <input type="number" id="ua-quantity" value="5" min="1" max="50" />
    </div>
  </div>
  <div class="button-group">
    <button id="ua-generate" class="btn btn-primary">生成</button>
    <button id="ua-copy" class="btn btn-sm">复制全部</button>
  </div>
  <div class="output-group">
    <label for="ua-output">生成结果</label>
    <textarea id="ua-output" rows="8" readonly placeholder="点击生成按钮..."></textarea>
  </div>
</div>
