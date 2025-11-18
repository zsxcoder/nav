# Cloudflare Pages GitHub Actions 配置指南

如果你想使用 GitHub Actions 自动部署到 Cloudflare Pages，需要配置以下 Secrets。

## 获取 Cloudflare API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)

2. 进入 **My Profile** → **API Tokens**

3. 点击 **Create Token**

4. 选择 **Create Custom Token**

5. 配置权限：
   - **Token name**: `GitHub Actions - weiz-nav`
   - **Permissions**:
     - Account - Cloudflare Pages - Edit
   - **Account Resources**:
     - Include - Your Account

6. 点击 **Continue to summary** → **Create Token**

7. 复制生成的 Token（只显示一次）

## 获取 Cloudflare Account ID

1. 在 [Cloudflare Dashboard](https://dash.cloudflare.com) 首页

2. 右侧可以看到 **Account ID**

3. 复制 Account ID

## 配置 GitHub Secrets

1. 进入你的 GitHub 仓库

2. 进入 **Settings** → **Secrets and variables** → **Actions**

3. 点击 **New repository secret**

4. 添加以下两个 Secrets：

### CLOUDFLARE_API_TOKEN
- Name: `CLOUDFLARE_API_TOKEN`
- Value: 粘贴你的 API Token

### CLOUDFLARE_ACCOUNT_ID
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: 粘贴你的 Account ID

## 完成

配置完成后，每次推送到 `main` 分支或创建 Pull Request 时，GitHub Actions 会自动：
1. 构建项目
2. 部署到 Cloudflare Pages
3. 在 PR 中显示预览链接

## 注意事项

- API Token 请妥善保管，不要泄露
- 如果不想使用 GitHub Actions，可以直接使用 Cloudflare Pages 的 Git 集成
- GitHub Actions 方式适合需要自定义构建流程的场景
