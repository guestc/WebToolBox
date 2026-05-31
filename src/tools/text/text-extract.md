---
layout: tool.njk
title: 文本提取器
description: 从大段文本中提取邮箱、URL、手机号、IP地址等
category: text
categoryName: 文本处理
script: /assets/js/tools/text-extract.js
tags: ["提取", "邮箱", "URL", "正则"]
---

<div class="tool-container">
  <div class="input-group">
    <label for="extract-input">输入文本</label>
    <textarea id="extract-input" rows="10" placeholder="粘贴包含需要提取内容的文本..."></textarea>
  </div>
  <div class="options-row">
    <label>提取类型：</label>
    <label><input type="checkbox" id="ext-email" checked /> 邮箱</label>
    <label><input type="checkbox" id="ext-url" checked /> URL</label>
    <label><input type="checkbox" id="ext-phone" /> 手机号</label>
    <label><input type="checkbox" id="ext-ip" /> IP 地址</label>
    <label><input type="checkbox" id="ext-chinese" /> 中文</label>
    <label><input type="checkbox" id="ext-number" /> 数字</label>
  </div>
  <div class="button-group">
    <button id="extract-btn" class="btn btn-primary">提取</button>
    <button id="extract-copy" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <span id="extract-count" style="color:#666;font-size:0.9em;margin-bottom:0.5rem;display:block;"></span>
    <label for="extract-output">提取结果</label>
    <textarea id="extract-output" rows="10" readonly placeholder="提取结果将显示在这里..."></textarea>
  </div>
</div>
