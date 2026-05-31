---
layout: tool.njk
title: URL 批量状态检测
description: 批量检测URL是否可访问，返回HTTP状态码
category: network
categoryName: URL/网络
script: /assets/js/tools/url-batch-check.js
tags: ["URL", "状态码", "批量"]
---

<div class="tool-container">
  <div class="input-group">
    <label for="urls-input">输入 URL（每行一个）</label>
    <textarea id="urls-input" rows="8" placeholder="https://example.com&#10;https://google.com&#10;https://github.com"></textarea>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="timeout-input">超时（秒）</label>
      <input type="number" id="timeout-input" value="10" min="1" max="60" />
    </div>
    <div class="input-group" style="display:flex;align-items:flex-end;">
      <label><input type="checkbox" id="parallel-check" checked /> 并发检测</label>
    </div>
  </div>
  <div class="button-group">
    <button id="check-btn" class="btn btn-primary">开始检测</button>
    <button id="copy-btn" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <p style="color:#e67e22;font-size:0.85em;">⚠ 受浏览器 CORS 限制，部分 URL 可能显示为失败但实际可访问。建议配合后端代理使用。</p>
    <label>检测结果</label>
    <table id="check-results" class="data-table">
      <thead>
        <tr><th>URL</th><th>状态</th><th>状态码</th><th>耗时 (ms)</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
