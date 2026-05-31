---
layout: tool.njk
title: JSON ↔ XML 转换
description: 在JSON和XML格式之间互相转换
category: converter
categoryName: 数据转换
script: /assets/js/tools/json-xml.js
tags: ["JSON", "XML", "转换"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="jxml-input">输入</label>
      <textarea id="jxml-input" rows="12" placeholder='{"root":{"item":"value"}}'></textarea>
    </div>
    <div class="output-group">
      <label for="jxml-output">输出</label>
      <textarea id="jxml-output" rows="12" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="jxml-direction">方向</label>
      <select id="jxml-direction">
        <option value="json2xml">JSON → XML</option>
        <option value="xml2json">XML → JSON</option>
      </select>
    </div>
    <div class="input-group">
      <label for="jxml-root">根元素名 (JSON→XML)</label>
      <input type="text" id="jxml-root" value="root" placeholder="root" />
    </div>
    <div class="input-group">
      <label for="jxml-indent">缩进空格数</label>
      <input type="number" id="jxml-indent" value="2" min="0" max="8" />
    </div>
  </div>
  <div class="button-group">
    <button id="jxml-convert" class="btn btn-primary">转换</button>
    <button id="jxml-swap" class="btn btn-secondary">交换</button>
    <button id="jxml-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
