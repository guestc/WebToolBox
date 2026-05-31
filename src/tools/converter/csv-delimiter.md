---
layout: tool.njk
title: CSV 分隔符转换
description: 更改CSV文件的分隔符（逗号、制表符、分号、管道符）
category: converter
categoryName: 数据转换
script: /assets/js/tools/csv-delimiter.js
tags: ["CSV", "分隔符", "转换"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="csvd-input">输入 CSV</label>
      <textarea id="csvd-input" rows="12" placeholder="name,age,city&#10;Alice,30,Beijing&#10;Bob,25,Shanghai"></textarea>
    </div>
    <div class="output-group">
      <label for="csvd-output">输出</label>
      <textarea id="csvd-output" rows="12" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="csvd-from">原始分隔符</label>
      <select id="csvd-from">
        <option value=",">逗号 (,)</option>
        <option value="	">Tab</option>
        <option value=";">分号 (;)</option>
        <option value="|">管道符 (|)</option>
      </select>
    </div>
    <div class="input-group">
      <label for="csvd-to">目标分隔符</label>
      <select id="csvd-to">
        <option value="	">Tab</option>
        <option value=",">逗号 (,)</option>
        <option value=";">分号 (;)</option>
        <option value="|">管道符 (|)</option>
      </select>
    </div>
    <div class="input-group" style="display:flex;align-items:flex-end;">
      <label><input type="checkbox" id="csvd-quoted" checked /> 处理引号字段</label>
    </div>
  </div>
  <div class="button-group">
    <button id="csvd-convert" class="btn btn-primary">转换</button>
    <button id="csvd-swap" class="btn btn-secondary">交换分隔符</button>
    <button id="csvd-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
