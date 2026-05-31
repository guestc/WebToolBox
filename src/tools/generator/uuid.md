---
layout: tool.njk
title: UUID 生成器
description: 生成通用唯一标识符（UUID v4）
category: generator
categoryName: 随机生成
script: /assets/js/tools/uuid.js
tags: ["UUID", "生成", "唯一标识"]
---

<div class="tool-container">
  <div class="options-row">
    <div class="input-group">
      <label for="uuid-quantity">生成数量</label>
      <input type="number" id="uuid-quantity" value="5" min="1" max="100" />
    </div>
    <div class="input-group">
      <label for="uuid-format">格式</label>
      <select id="uuid-format">
        <option value="standard">标准 (xxxxxxxx-xxxx-4xxx-xxxx)</option>
        <option value="uppercase">大写</option>
        <option value="nodash">无连字符</option>
        <option value="braces">花括号 {xxxxxxxx-xxxx-...}</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="uuid-generate" class="btn btn-primary">生成</button>
    <button id="uuid-copy" class="btn btn-sm">复制全部</button>
  </div>
  <div class="output-group">
    <label for="uuid-output">生成结果</label>
    <textarea id="uuid-output" rows="8" readonly placeholder="点击生成按钮..."></textarea>
  </div>
</div>
