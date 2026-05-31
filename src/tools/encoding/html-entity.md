---
layout: tool.njk
title: HTML 实体编码/解码
description: 将特殊字符转为HTML实体（如&amp;），或反向解码
category: encoding
categoryName: 编码/解码
script: /assets/js/tools/html-entity.js
tags: ["HTML", "实体", "编码", "解码"]
---

<div class="tool-container">
  <div class="tool-columns">
    <div class="input-group">
      <label for="html-entity-input">输入</label>
      <textarea id="html-entity-input" rows="10" placeholder="输入文本或HTML实体..."></textarea>
    </div>
    <div class="output-group">
      <label for="html-entity-output">输出</label>
      <textarea id="html-entity-output" rows="10" readonly placeholder="结果将显示在这里..."></textarea>
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label for="html-entity-mode">模式</label>
      <select id="html-entity-mode">
        <option value="encode">编码 (字符 → 实体)</option>
        <option value="decode">解码 (实体 → 字符)</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="html-entity-run" class="btn btn-primary">执行</button>
    <button id="html-entity-swap" class="btn btn-secondary">交换</button>
    <button id="html-entity-copy" class="btn btn-sm">复制结果</button>
  </div>
</div>
