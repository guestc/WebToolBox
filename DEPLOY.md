# WebToolBox 部署文档

## 架构概览

```
开发者 push → GitHub → GitHub Actions → Eleventy 构建 → Cloudflare Pages 部署
```

- **静态站点生成器**: Eleventy v3 (11ty)
- **CI/CD**: GitHub Actions
- **托管平台**: Cloudflare Pages
- **构建命令**: `npm run build`
- **输出目录**: `_site/`

## 文件说明

| 文件 | 用途 |
|------|------|
| `.github/workflows/deploy.yml` | GitHub Actions 自动部署配置 |
| `.env` | Cloudflare 密钥（本地备份，不提交 Git） |
| `src/_headers` | 安全响应头配置 |
| `server.js` | 本地开发服务器（仅本地使用，不参与部署） |

## 首次部署

### 1. 配置 GitHub Secrets

在 GitHub 仓库中：**Settings → Secrets and variables → Actions → New repository secret**

添加以下两个 Secret：

| Name | Value |
|------|-------|
| `CLOUDFLARE_ACCOUNT_ID` | 你的 Cloudflare Account ID |
| `CLOUDFLARE_API_TOKEN` | 你的 Cloudflare API Token |

> API Token 创建：Cloudflare Dashboard → 右上角头像 → My Profile → API Tokens → Create Token → 选择 **Cloudflare Pages - Edit** 模板

### 2. 推送代码

```bash
git push -u origin main
```

推送后 GitHub Actions 会自动触发构建和部署。

### 3. 验证

- GitHub 仓库 → **Actions** 标签页查看构建状态
- 构建成功后，访问 Cloudflare Pages 分配的域名（如 `webtoolbox.pages.dev`）
- 可在 Cloudflare Dashboard → **Workers & Pages** → **webtoolbox** 中绑定自定义域名

## 日常更新流程

```bash
# 修改代码后
git add .
git commit -m "描述你的修改"
git push
```

推送到 `main` 分支后，GitHub Actions 自动：
1. 拉取代码
2. 安装依赖 (`npm ci`)
3. 构建站点 (`npm run build`)
4. 部署到 Cloudflare Pages（生产环境）

PR（Pull Request）会自动生成**预览部署**，包含独立的预览链接。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（自动监听文件变更）
npm start

# 访问 http://172.22.182.62:8080/（WSL）或 http://localhost:8080/
```

## 密钥轮换

如果 Cloudflare API Token 过期或泄露：

1. 在 Cloudflare Dashboard 重新创建 API Token
2. 更新本地 `.env` 文件
3. 在 GitHub 仓库 **Settings → Secrets → Actions** 中更新 `CLOUDFLARE_API_TOKEN`
4. 重新运行最近一次失败的 Actions，或 push 一个新提交触发部署

## 常见问题

### Actions 构建失败

1. 检查 **Actions** 标签页的错误日志
2. 确认 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` 已正确配置
3. 确认 API Token 未过期，权限为 **Cloudflare Pages - Edit**

### 部署成功但页面空白

1. 检查 Cloudflare Pages 的部署日志
2. 确认构建输出目录是 `_site`
3. 本地运行 `npm run build`，检查 `_site/index.html` 是否存在

### 自定义域名

在 Cloudflare Dashboard → **Workers & Pages** → **webtoolbox** → **Custom Domains** 中添加。

添加后 Cloudflare 会自动配置 DNS 和 SSL 证书。

### 回滚

在 Cloudflare Dashboard → **Workers & Pages** → **webtoolbox** → **Deployments** 中，找到历史版本点击 **Rollback**。
