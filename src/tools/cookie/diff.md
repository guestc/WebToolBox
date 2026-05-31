---
layout: tool.njk
title: Cookie 对比
description: 对比两组Cookie的差异，找出新增、删除、修改的Cookie项
category: cookie
categoryName: Cookie 管理
script: /assets/js/tools/cookie-diff.js
tags: ["cookie", "对比", "diff", "爬虫"]
---
<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label>Cookie A（原始）</label>
      <textarea id="cookie-a" rows="6" placeholder="session=abc; token=123"></textarea>
    </div>
    <div class="input-group">
      <label>Cookie B（对比）</label>
      <textarea id="cookie-b" rows="6" placeholder="session=abc; token=456; new=val"></textarea>
    </div>
  </div>
  <div class="button-group">
    <button class="btn btn-primary" id="diff-btn">对比</button>
    <button class="btn btn-secondary" id="clear-btn">清空</button>
  </div>
  <div class="output-group">
    <label>对比结果</label>
    <div id="diff-result"></div>
  </div>
</div>
