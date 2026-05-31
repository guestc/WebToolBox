---
layout: tool.njk
title: 正则表达式测试器
description: 在线测试正则表达式，实时高亮匹配结果
category: text
categoryName: 文本处理
script: /assets/js/tools/regex-tester.js
tags: ["正则", "测试", "正则表达式"]
---

<div class="tool-container">
  <div class="input-group">
    <label for="regex-input">正则表达式</label>
    <input type="text" id="regex-input" placeholder="例: \d+([a-z]+)" />
  </div>
  <div class="options-row">
    <label>标志位：</label>
    <label><input type="checkbox" id="regex-flag-g" checked /> g (全局)</label>
    <label><input type="checkbox" id="regex-flag-i" /> i (忽略大小写)</label>
    <label><input type="checkbox" id="regex-flag-m" /> m (多行)</label>
    <label><input type="checkbox" id="regex-flag-s" /> s (点号匹配换行)</label>
  </div>
  <div class="input-group">
    <label for="regex-text">测试文本</label>
    <textarea id="regex-text" rows="6" placeholder="在此输入要测试的文本..."></textarea>
  </div>
  <div class="output-group">
    <label>高亮结果</label>
    <div id="regex-highlight" style="border:1px solid #ddd;padding:1rem;min-height:3rem;white-space:pre-wrap;word-break:break-all;background:#f9f9f9;border-radius:4px;"></div>
  </div>
  <div class="output-group">
    <label>匹配信息</label>
    <div id="regex-info" style="margin-bottom:0.5rem;color:#666;font-size:0.9em;"></div>
    <table id="regex-matches" class="data-table">
      <thead>
        <tr><th>#</th><th>匹配</th><th>位置</th><th>捕获组</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
