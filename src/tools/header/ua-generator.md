---
layout: tool.njk
title: User-Agent 生成器
description: 根据选择的浏览器和操作系统生成真实的UA字符串
category: header
categoryName: 请求头工具
script: /assets/js/tools/ua-generator.js
tags: ["User-Agent", "生成器", "爬虫"]
---
<div class="tool-container">
  <div class="options-row">
    <div class="input-group">
      <label>浏览器</label>
      <select id="browser-select">
        <option value="chrome">Chrome</option>
        <option value="firefox">Firefox</option>
        <option value="safari">Safari</option>
        <option value="edge">Edge</option>
        <option value="opera">Opera</option>
      </select>
    </div>
    <div class="input-group">
      <label>操作系统</label>
      <select id="os-select">
        <option value="windows">Windows</option>
        <option value="macos">macOS</option>
        <option value="linux">Linux</option>
        <option value="android">Android</option>
        <option value="ios">iOS</option>
      </select>
    </div>
    <div class="input-group">
      <label>版本</label>
      <select id="version-select"></select>
    </div>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="generate-btn">生成</button>
    <button class="btn btn-secondary" id="copy-btn">复制</button>
  </div>
  <div class="output-group">
    <label>生成结果</label>
    <textarea id="ua-output" rows="3" readonly></textarea>
  </div>
  <div class="input-group">
    <label>批量生成</label>
    <div class="button-group">
      <button class="btn btn-sm btn-secondary" id="batch-10">10 个</button>
      <button class="btn btn-sm btn-secondary" id="batch-50">50 个</button>
      <button class="btn btn-sm btn-secondary" id="batch-100">100 个</button>
    </div>
  </div>
  <div class="output-group">
    <label>批量结果</label>
    <textarea id="batch-output" rows="8" readonly></textarea>
  </div>
  <div class="button-group">
    <button class="btn btn-secondary" id="copy-batch-btn">复制批量结果</button>
  </div>
</div>
