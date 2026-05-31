---
layout: tool.njk
title: 端口检测工具
description: 检测指定主机的常用端口是否开放
category: network
categoryName: URL/网络
script: /assets/js/tools/port-check.js
tags: ["端口", "检测", "网络"]
---

<div class="tool-container">
  <div class="options-row">
    <div class="input-group">
      <label for="port-host">主机（域名或 IP）</label>
      <input type="text" id="port-host" placeholder="example.com" />
    </div>
    <div class="input-group">
      <label for="port-list">端口（逗号分隔）</label>
      <input type="text" id="port-list" placeholder="80,443,22,3306" />
    </div>
  </div>
  <div class="options-row">
    <div class="input-group">
      <label>常用端口快捷选择</label>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
        <button class="btn btn-sm preset-btn" data-ports="80,443">Web</button>
        <button class="btn btn-sm preset-btn" data-ports="22,21,23">远程</button>
        <button class="btn btn-sm preset-btn" data-ports="3306,5432,27017,6379">数据库</button>
        <button class="btn btn-sm preset-btn" data-ports="8080,8443,3000,5000">开发</button>
        <button class="btn btn-sm preset-btn" data-ports="25,110,143,465,993,995">邮件</button>
        <button class="btn btn-sm preset-btn" data-ports="53,67,68">DNS/DHCP</button>
      </div>
    </div>
  </div>
  <div class="button-group">
    <button id="port-check-btn" class="btn btn-primary">开始检测</button>
    <button id="port-copy-btn" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <p style="color:#e67e22;font-size:0.85em;">⚠ 浏览器无法直接检测端口，本工具通过 WebSocket/Image 探测方式判断端口状态，结果仅供参考。</p>
    <label>检测结果</label>
    <table id="port-results" class="data-table">
      <thead>
        <tr><th>端口</th><th>常用服务</th><th>状态</th><th>耗时 (ms)</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
