# WebToolBox 部署文档

## 架构概览

```
开发者 push → GitHub → GitHub Actions → Eleventy 构建 → Cloudflare Pages 部署
```

- **静态站点生成器**: Eleventy v3 (11ty)
- **CI/CD**: GitHub Actions
- **托管平台**: Cloudflare Pages（项目名：`webtoolbox`，域名：`webtoolbox-1x1.pages.dev`）
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
- 构建成功后，访问 Cloudflare Pages 分配的域名
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

## 手动部署（绕过 GitHub Actions）

如果 GitHub Actions 出问题，可以用 wrangler CLI 直接部署：

```bash
npm run build
CLOUDFLARE_API_TOKEN=<your-token> CLOUDFLARE_ACCOUNT_ID=<your-id> npx wrangler pages deploy _site --project-name=webtoolbox
```

> 注意：wrangler CLI 不接受 `--token` 和 `--account-id` 参数，必须通过环境变量传递。

## Cloudflare API 注意事项

调用 Cloudflare API 时，所有端点都需要带 `account_id`：

| 操作 | 端点 |
|------|------|
| 验证 Token | `GET /accounts/{account_id}/tokens/verify` |
| 列出 Pages 项目 | `GET /accounts/{account_id}/pages/projects` |
| 创建 Pages 项目 | `POST /accounts/{account_id}/pages/projects` |

> **注意**：不要使用 `/user/tokens/verify`（旧版端点），必须使用 `/accounts/{account_id}/tokens/verify`，否则会返回 `Invalid API Token`。

## 密钥信息

| 密钥 | 存储位置 |
|------|---------|
| Cloudflare Account ID | `.env`（本地）+ GitHub Secrets |
| Cloudflare API Token | `.env`（本地）+ GitHub Secrets |
| GitHub Personal Access Token | 不存储，仅用于推送 |

> `.env` 已加入 `.gitignore`，不会被提交到 Git 仓库。

---

## 踩坑记录

### 1. GitHub Token 缺少 `workflow` 权限

**现象**：`git push` 被拒绝，提示 `refusing to allow a Personal Access Token to create or update workflow .github/workflows/deploy.yml without workflow scope`

**原因**：GitHub Personal Access Token 缺少 `workflow` 权限

**解决**：创建 Token 时除了勾选 `repo`，还要额外勾选 `workflow` 权限

### 2. `wrangler-action@v3` 部署失败

**现象**：GitHub Actions 构建成功，但 Deploy 步骤失败，无明确错误信息

**原因**：`cloudflare/wrangler-action@v3` 存在兼容性问题

**解决**：不用 `wrangler-action`，改为直接用 `npx wrangler` 命令：

```yaml
- name: Deploy to Cloudflare Pages
  run: npx wrangler pages deploy _site --project-name=webtoolbox
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### 3. `workflow_dispatch` 触发时部署步骤被跳过

**现象**：手动触发 workflow 时，Deploy 步骤显示 `skipped`

**原因**：部署条件只判断了 `github.event_name == 'push'`，不包含 `workflow_dispatch`

**解决**：条件改为：

```yaml
if: github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')
```

### 4. Cloudflare API Token 验证失败

**现象**：调用 `/user/tokens/verify` 返回 `Invalid API Token`

**原因**：使用了错误的 API 端点

**解决**：必须使用 `/accounts/{account_id}/tokens/verify`，带 account_id 的端点

### 5. WSL 中 git push 超时

**现象**：`git push` 命令挂起无响应

**原因**：WSL 网络到 GitHub 443 端口不通（可能防火墙/代理问题）

**临时解决**：通过 GitHub API 直接更新文件（Contents API），绕过 git push
