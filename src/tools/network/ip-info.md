---
layout: tool.njk
title: 我的 IP 地址
description: 显示当前公网IP地址及地理位置信息
category: network
categoryName: URL/网络
script: /assets/js/tools/ip-info.js
tags: ["IP", "地址", "查询"]
---

<div class="tool-container">
  <div class="output-group">
    <label>IP 地址信息</label>
    <div id="ip-loading" style="text-align:center;padding:2rem;color:#999;">正在加载...</div>
    <table id="ip-info-table" class="data-table" style="display:none;">
      <thead>
        <tr><th>属性</th><th>值</th></tr>
      </thead>
      <tbody></tbody>
    </table>
    <div id="ip-error" style="display:none;text-align:center;padding:1rem;color:#e74c3c;"></div>
  </div>
  <div class="button-group">
    <button id="ip-refresh" class="btn btn-secondary">刷新</button>
    <button id="ip-copy" class="btn btn-sm">复制 IP</button>
  </div>
</div>
