# PaperPage 部署说明

本文档详细介绍如何将 PaperPage 博客部署到 GitHub + Cloudflare Pages。

## 一、GitHub 仓库配置

### 1. 创建 GitHub 仓库

1. 登录 GitHub 账号
2. 点击右上角的 "New repository"
3. 填写仓库名称（例如：paperpage-blog）
4. 选择仓库类型（公开或私有）
5. 点击 "Create repository"

### 2. 上传代码

将 `github` 目录下的所有文件上传到 GitHub 仓库。可以使用以下方法：

#### 方法一：使用 Git 命令

```bash
# 初始化 Git 仓库
cd github
git init
git add .
git commit -m "Initial commit"

# 添加远程仓库
git remote add origin https://github.com/your-username/paperpage-blog.git

# 推送代码
git push -u origin main
```

#### 方法二：使用 GitHub Desktop

1. 下载并安装 GitHub Desktop
2. 克隆刚创建的仓库
3. 将 `github` 目录下的文件复制到克隆的仓库目录
4. 提交并推送更改

### 3. 仓库结构

GitHub 仓库的结构应该如下：

```
.github/
posts/
  first-post.md
  markdown-guide.md
css/
  style.css
js/
  main.js
assets/
index.html
post.html
.gitignore
```

## 二、Cloudflare Pages 部署

### 1. 登录 Cloudflare 账号

1. 访问 [Cloudflare 官网](https://www.cloudflare.com/)
2. 登录或注册 Cloudflare 账号

### 2. 创建 Pages 项目

1. 在 Cloudflare 控制台中，点击左侧菜单的 "Pages"
2. 点击 "Create a project"
3. 选择 "Connect to Git"
4. 授权 Cloudflare 访问你的 GitHub 账号
5. 选择刚创建的 GitHub 仓库
6. 点击 "Begin setup"

### 3. 配置构建设置

- **Project name**: 填写项目名称（例如：paperpage-blog）
- **Production branch**: 选择 `main` 分支
- **Build command**: 留空（因为是纯静态网站，无需构建）
- **Build output directory**: 留空（使用根目录）
- **Root directory**: 留空（使用根目录）

点击 "Save and Deploy" 开始部署。

### 4. 等待部署完成

Cloudflare Pages 会自动构建和部署你的博客。部署完成后，你会看到一个临时域名（例如：paperpage-blog.pages.dev）。

## 三、域名绑定

### 1. 添加自定义域名

1. 在 Cloudflare Pages 项目中，点击 "Custom domains"
2. 点击 "Add custom domain"
3. 输入你的自定义域名（例如：blog.example.com）
4. 点击 "Continue"

### 2. 配置 DNS 记录

1. 登录你的域名注册商网站
2. 找到 DNS 设置
3. 添加一条 CNAME 记录：
   - **Name**: blog（或你想要的子域名）
   - **Value**: paperpage-blog.pages.dev（替换为你的 Cloudflare Pages 临时域名）
   - **TTL**: 自动或 5 分钟

### 3. 验证域名

等待 DNS 记录生效后，Cloudflare Pages 会自动验证域名。验证成功后，你的博客就可以通过自定义域名访问了。

## 四、使用指南

### 1. 添加新文章

1. 在 `posts` 目录下创建新的 Markdown 文件（例如：new-post.md）
2. 在文件头部添加 Front Matter 信息：

```markdown
---
title: 文章标题
date: 2026-03-21
category: 分类
tags: 标签1, 标签2
---

# 文章内容

...
```

3. 编写文章内容（使用 Markdown 语法）
4. 提交并推送更改到 GitHub 仓库
5. Cloudflare Pages 会自动重新部署博客

### 2. 修改博客设置

- **修改博客名称**: 编辑 `index.html` 文件中的 `<h1 class="logo"><a href="index.html">PaperPage</a></h1>`
- **修改导航链接**: 编辑 `index.html` 和 `post.html` 文件中的导航栏部分
- **修改样式**: 编辑 `css/style.css` 文件
- **修改脚本**: 编辑 `js/main.js` 文件

### 3. 暗黑模式

博客内置了暗黑模式切换功能，点击导航栏中的月亮/太阳图标即可切换。

## 五、故障排除

### 1. 文章不显示

- 检查 Markdown 文件是否正确放置在 `posts` 目录下
- 检查 Markdown 文件的 Front Matter 格式是否正确
- 检查 GitHub 仓库是否已正确推送更改
- 检查 Cloudflare Pages 是否已完成部署

### 2. 样式问题

- 检查 `css/style.css` 文件是否存在且内容正确
- 检查 HTML 文件中的 CSS 引用路径是否正确

### 3. 脚本问题

- 检查 `js/main.js` 文件是否存在且内容正确
- 检查 HTML 文件中的 JS 引用路径是否正确
- 打开浏览器开发者工具，查看控制台是否有错误信息

## 六、总结

PaperPage 是一个基于 GitHub + Cloudflare Pages 的轻量级博客系统，具有以下优点：

- 纯静态，无需后端服务器
- 支持 Markdown 编写文章
- 响应式布局，适配电脑和手机
- 简单的暗黑模式切换
- 自动部署，无需手动操作

希望本文档对你有所帮助！