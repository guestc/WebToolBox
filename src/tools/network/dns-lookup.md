---
layout: tool.njk
title: DNS 查询工具
description: 查询域名的DNS记录（模拟展示）
category: network
categoryName: URL/网络
script: /assets/js/tools/dns-lookup.js
tags: ["DNS", "域名", "查询"]
---

<div class="tool-container">
  <div class="options-row">
    <div class="input-group">
      <label for="dns-domain">域名</label>
      <input type="text" id="dns-domain" placeholder="example.com" />
    </div>
    <div class="input-group">
      <label for="dns-type">记录类型</label>
      <select id="dns-type">
        <option value="A">A</option>
        <option value="AAAA">AAAA</option>
        <option value="CNAME">CNAME</option>
        <option value="MX">MX</option>
        <option value="NS">NS</option>
        <option value="TXT">TXT</option>
      </select>
    </div>
  </div>
  <div class="button-group">
    <button id="dns-lookup-btn" class="btn btn-primary">查询</button>
    <button id="dns-copy-btn" class="btn btn-sm">复制结果</button>
  </div>
  <div class="output-group">
    <label>查询结果</label>
    <table id="dns-results" class="data-table">
      <thead>
        <tr><th>名称</th><th>类型</th><th>TTL</th><th>数据</th></tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</div>
