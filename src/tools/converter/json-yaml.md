---
layout: tool.njk
title: JSON ↔ YAML 转换
description: 在JSON和YAML格式之间互相转换
category: converter
categoryName: 数据转换
script: /assets/js/tools/json-yaml.js
tags: ["JSON", "YAML", "转换"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="jyaml-input">输入</label>
      <textarea id="jyaml-input" rows="12" placeholder='{"name":"test","items":[1,2,3]}'></textarea>
    </div>
    <div class="output-group">
      <label for="jyaml-output">输出</label>
      <textarea id="jyaml-output" rows="12" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="jyaml-direction">方向</label>
      <select id="jyaml-direction">
        <option value="json2yaml">JSON → YAML</option>
        <option value="yaml2json">YAML → JSON</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="jyaml-convert" class="btn btn-primary">转换</button>
    <button id="jyaml-swap" class="btn btn-secondary">交换</button>
    <button id="jyaml-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
