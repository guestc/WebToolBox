# WebToolBox

面向开发者与爬虫工程师的免费在线工具集合网站。

## 特性

- 8 大类目，39 个实用工具
- 纯客户端运行，数据不离开浏览器
- 左侧边栏导航，快速切换类目
- 常用工具记录（基于 localStorage，上限 10 个）
- 暗色模式，跟随系统偏好或手动切换
- 全文搜索，按 `/` 键快速聚焦
- 响应式设计，移动端侧边栏抽屉式弹出

## 类目

| 类目 | 工具数 | 说明 |
|------|--------|------|
| Cookie 管理 | 5 | 编辑、导入导出、格式转换、对比、Set-Cookie解析 |
| 请求头工具 | 5 | 请求头编辑、cURL生成/转换、UA解析/生成 |
| 编码/解码 | 5 | Base64、URL、HTML实体、Unicode、Hex |
| 加密/哈希 | 6 | MD5、SHA-256、SHA-512、HMAC、JWT解码、AES |
| URL/网络 | 5 | URL解析、批量检测、DNS查询、IP查询、端口检测 |
| 文本处理 | 5 | 正则测试、去重、Diff对比、文本提取、JSON格式化 |
| 数据转换 | 4 | JSON↔CSV、JSON↔XML、JSON↔YAML、CSV分隔符 |
| 随机生成 | 4 | 密码、UUID、随机UA、随机字符串 |

## 本地开发

```bash
npm install
npm start
```

- 本地访问：http://localhost:8080
- WSL 访问（从 Windows）：http://172.22.182.62:8080

> `npm start` 会同时启动 `server.js`（绑定 `0.0.0.0`）和 Eleventy watch（文件变更自动重建）。

### WSL 网络说明

Eleventy 内置 dev server 默认绑定 `localhost`，Windows 无法通过 WSL IP 访问。项目使用自定义 `server.js` 绑定 `0.0.0.0` 解决此问题。

## 构建

```bash
npm run build
```

输出目录：`_site`

## 部署

详见 [DEPLOY.md](./DEPLOY.md)

## 添加新工具

1. 在 `src/tools/<类目>/` 下创建 `.md` 文件
2. 在 `src/assets/js/tools/` 下创建对应的 `.js` 文件
3. `.md` 文件使用 `layout: tool.njk` 布局
4. 重新构建即可

## 技术栈

- [Eleventy](https://www.11ty.dev/) - 静态站点生成器
- [Lucide Icons](https://lucide.dev/) - 图标库
- Web Crypto API - 加密功能
- 纯 JavaScript - 无框架依赖
