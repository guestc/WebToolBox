---
layout: tool.njk
title: 文本对比 (Diff)
description: 对比两段文本的差异，高亮显示不同之处
category: text
categoryName: 文本处理
script: /assets/js/tools/text-diff.js
tags: ["对比", "diff", "文本"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="diff-a">原始文本</label>
      <textarea id="diff-a" rows="12" placeholder="输入原始文本..."></textarea>
    </div>
    <div class="input-group">
      <label for="diff-b">对比文本</label>
      <textarea id="diff-b" rows="12" placeholder="输入对比文本..."></textarea>
    </div>
  </div>
  <div class="button-group">
    <button id="diff-btn" class="btn btn-primary">对比</button>
    <button id="diff-swap" class="btn btn-secondary">交换</button>
    <button id="diff-copy" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <span id="diff-stats" style="color:#666;font-size:0.9em;margin-bottom:0.5rem;display:block;"></span>
    <label>对比结果</label>
    <div id="diff-result" style="border:1px solid #ddd;border-radius:4px;overflow-x:auto;max-height:500px;overflow-y:auto;"></div>
  </div>
</div>
