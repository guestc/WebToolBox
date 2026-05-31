---
layout: tool.njk
title: 文本行去重
description: 删除文本中的重复行，保留唯一值
category: text
categoryName: 文本处理
script: /assets/js/tools/text-dedup.js
tags: ["去重", "文本", "行"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="dedup-input">输入文本</label>
      <textarea id="dedup-input" rows="12" placeholder="每行一条数据..."></textarea>
    </div>
    <div class="output-group">
      <label for="dedup-output">去重结果</label>
      <textarea id="dedup-output" rows="12" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <label><input type="checkbox" id="dedup-case" checked /> 区分大小写</label>
    <label><input type="checkbox" id="dedup-trim" checked /> 忽略首尾空格</label>
    <label><input type="checkbox" id="dedup-empty" /> 保留空行</label>
  </div>
  <div class="button-group">
    <button id="dedup-btn" class="btn btn-primary">去重</button>
    <button id="dedup-copy" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <span id="dedup-stats" style="color:#666;font-size:0.9em;"></span>
  </div>
</div>
