---
layout: tool.njk
title: JSON ↔ CSV 转换
description: 在JSON数组和CSV格式之间互相转换
category: converter
categoryName: 数据转换
script: /assets/js/tools/json-csv.js
tags: ["JSON", "CSV", "转换"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="jcsv-input">输入</label>
      <textarea id="jcsv-input" rows="12" placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'></textarea>
    </div>
    <div class="output-group">
      <label for="jcsv-output">输出</label>
      <textarea id="jcsv-output" rows="12" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="jcsv-direction">方向</label>
      <select id="jcsv-direction">
        <option value="json2csv">JSON → CSV</option>
        <option value="csv2json">CSV → JSON</option>
      </select>
    </div>
    <div class="input-group">
      <label for="jcsv-delimiter">分隔符</label>
      <select id="jcsv-delimiter">
        <option value=",">逗号 (,)</option>
        <option value=";">分号 (;)</option>
        <option value="	">Tab</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="jcsv-convert" class="btn btn-primary">转换</button>
    <button id="jcsv-swap" class="btn btn-secondary">交换</button>
    <button id="jcsv-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
