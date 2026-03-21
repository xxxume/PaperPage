// 全局变量
let posts = [];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化暗黑模式
    initDarkMode();
    
    // 初始化分享模态框
    initShareModal();
    
    // 检查当前页面
    if (window.location.pathname.includes('post.html')) {
        // 文章详情页
        loadPost();
    } else {
        // 首页
        loadPosts();
    }
});

// 初始化分享模态框
function initShareModal() {
    const shareButton = document.querySelector('.share-button');
    const shareModal = document.getElementById('share-modal');
    const modalClose = document.querySelector('.modal-close');
    const copyButton = document.querySelector('.share-button-copy');
    
    if (shareButton && shareModal) {
        // 打开模态框
        shareButton.addEventListener('click', function() {
            shareModal.style.display = 'flex';
        });
        
        // 关闭模态框
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                shareModal.style.display = 'none';
            });
        }
        
        // 点击模态框外部关闭
        shareModal.addEventListener('click', function(e) {
            if (e.target === shareModal) {
                shareModal.style.display = 'none';
            }
        });
        
        // 复制链接
        if (copyButton) {
            copyButton.addEventListener('click', function() {
                const currentUrl = window.location.href;
                navigator.clipboard.writeText(currentUrl).then(function() {
                    alert('链接已复制到剪贴板');
                    shareModal.style.display = 'none';
                }).catch(function(err) {
                    console.error('复制失败:', err);
                });
            });
        }
    }
}

// 初始化暗黑模式
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }
    
    // 切换主题
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 加载文章列表
async function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '<div class="loading"></div>';
    
    try {
        // 从 GitHub 仓库加载文章列表
        posts = await fetchPostsFromGithub();
        
        // 如果没有获取到文章，使用模拟数据
        if (posts.length === 0) {
            console.log('No posts found from GitHub API, using mock data');
            useMockData();
        }
        
        // 渲染文章列表
        renderPosts();
    } catch (error) {
        console.error('Error loading posts:', error);
        // 使用模拟数据作为后备
        useMockData();
        renderPosts();
    }
}

// 使用模拟数据
function useMockData() {
    posts = [
        {
            id: 'first-post',
            title: '第一篇文章',
            date: '2026-03-20',
            category: '技术',
            tags: ['前端', 'JavaScript'],
            excerpt: '这是我的第一篇博客文章，介绍如何使用 GitHub + Cloudflare Pages 搭建轻量级博客。',
            content: '# 第一篇文章\n\n这是我的第一篇博客文章，介绍如何使用 GitHub + Cloudflare Pages 搭建轻量级博客。\n\n## 什么是 PaperPage？\n\nPaperPage 是一个基于 GitHub + Cloudflare Pages 的轻量级博客系统，具有以下特点：\n\n- 纯静态，无需后端服务器\n- 支持 Markdown 编写文章\n- 响应式布局，适配电脑和手机\n- 简单的暗黑模式切换\n\n## 如何部署？\n\n1. 将代码提交到 GitHub 仓库\n2. 在 Cloudflare Pages 中设置自动部署\n3. 绑定自定义域名（可选）\n\n## 总结\n\nPaperPage 是一个简单易用的博客系统，适合个人开发者和技术爱好者使用。'
        },
        {
            id: 'second-post',
            title: 'Markdown 语法指南',
            date: '2026-03-19',
            category: '教程',
            tags: ['Markdown', '写作'],
            excerpt: '本文介绍 Markdown 的基本语法，帮助你快速上手 Markdown 写作。',
            content: '# Markdown 语法指南\n\nMarkdown 是一种轻量级标记语言，易于学习和使用。本文介绍 Markdown 的基本语法。\n\n## 标题\n\n```markdown\n# 一级标题\n## 二级标题\n### 三级标题\n```\n\n## 列表\n\n### 无序列表\n\n- 项目 1\n- 项目 2\n- 项目 3\n\n### 有序列表\n\n1. 第一项\n2. 第二项\n3. 第三项\n\n## 链接\n\n[GitHub](https://github.com)\n\n## 图片\n\n![示例图片](https://via.placeholder.com/300)\n\n## 代码\n\n```javascript\nconsole.log(\'Hello, world!\');\n```\n\n## 引用\n\n> 这是一段引用文字\n\n## 表格\n\n| 姓名 | 年龄 | 职业 |\n|------|------|------|\n| 张三 | 25 | 工程师 |\n| 李四 | 30 | 设计师 |'
        }
    ];
}

// 渲染文章列表
function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    
    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <h4><a href="post.html?id=${post.id}">${post.title}</a></h4>
            <div class="post-card-meta">
                <span>${post.date}</span>
                <span>${post.category}</span>
                <span>${post.tags.join(', ')}</span>
            </div>
            <p class="post-card-excerpt">${post.excerpt}</p>
            <a href="post.html?id=${post.id}" class="read-more">阅读更多 →</a>
        `;
        postsContainer.appendChild(postCard);
    });
}

// 加载文章详情
async function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (!postId) {
        document.getElementById('post-content').innerHTML = '<p>文章不存在</p>';
        return;
    }
    
    const postContent = document.getElementById('post-content');
    postContent.innerHTML = '<div class="loading"></div>';
    
    try {
        // 从 GitHub 仓库加载文章列表
        if (posts.length === 0) {
            posts = await fetchPostsFromGithub();
            
            // 如果没有获取到文章，使用模拟数据
            if (posts.length === 0) {
                console.log('No posts found from GitHub API, using mock data');
                useMockData();
            }
        }
        
        // 查找文章
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            // 更新页面标题
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-title-display').textContent = post.title;
            
            // 更新文章元数据
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-category').textContent = post.category;
            document.getElementById('post-tags').textContent = post.tags.join(', ');
            
            // 解析 Markdown 并显示内容
            document.getElementById('post-content').innerHTML = markdownToHtml(post.content);
        } else {
            document.getElementById('post-content').innerHTML = '<p>文章不存在</p>';
        }
    } catch (error) {
        console.error('Error loading post:', error);
        // 使用模拟数据作为后备
        useMockData();
        
        // 查找文章
        const post = posts.find(p => p.id === postId);
        
        if (post) {
            // 更新页面标题
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-title-display').textContent = post.title;
            
            // 更新文章元数据
            document.getElementById('post-date').textContent = post.date;
            document.getElementById('post-category').textContent = post.category;
            document.getElementById('post-tags').textContent = post.tags.join(', ');
            
            // 解析 Markdown 并显示内容
            document.getElementById('post-content').innerHTML = markdownToHtml(post.content);
        } else {
            document.getElementById('post-content').innerHTML = '<p>文章不存在</p>';
        }
    }
}

// Markdown 解析函数
function markdownToHtml(markdown) {
    // 基本的 Markdown 解析
    return markdown
        // 标题
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        // 粗体和斜体
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // 链接
        .replace(/\[(.*)\]\((.*)\)/gim, '<a href="$2">$1</a>')
        // 图片
        .replace(/!\[(.*)\]\((.*)\)/gim, '<img src="$2" alt="$1">')
        // 代码块
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        // 行内代码
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // 引用
        .replace(/^(> .*$)/gim, '<blockquote>$1</blockquote>')
        // 无序列表
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>')
        // 有序列表
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gim, '<ol>$1</ol>')
        // 段落
        .replace(/^(?!<h[1-6]>)(?!<ul>)(?!<ol>)(?!<li>)(?!<blockquote>)(?!<pre>)(.*$)/gim, '<p>$1</p>')
        // 清理多余的空行
        .replace(/\n{3,}/gim, '\n\n');
}

// 从 GitHub API 获取文章列表
async function fetchPostsFromGithub() {
    try {
        // 替换为实际的 GitHub 用户名和仓库名
        // 这里使用正确的仓库地址
        const response = await fetch('https://api.github.com/repos/asdfinstall/paperpage-blog/contents/posts');
        const files = await response.json();
        
        const posts = [];
        for (const file of files) {
            if (file.name.endsWith('.md')) {
                const contentResponse = await fetch(file.download_url);
                const content = await contentResponse.text();
                
                // 解析 Markdown 头部信息
                const frontmatterMatch = content.match(/^---[\s\S]*?---/);
                let frontmatter = {};
                if (frontmatterMatch) {
                    const frontmatterText = frontmatterMatch[0].replace(/^---|---$/g, '');
                    frontmatterText.split('\n').forEach(line => {
                        const [key, value] = line.split(': ');
                        if (key && value) {
                            frontmatter[key.trim()] = value.trim();
                        }
                    });
                }
                
                posts.push({
                    id: file.name.replace('.md', ''),
                    title: frontmatter.title || file.name.replace('.md', ''),
                    date: frontmatter.date || file.updated_at,
                    category: frontmatter.category || '未分类',
                    tags: frontmatter.tags ? frontmatter.tags.split(',').map(tag => tag.trim()) : [],
                    content: content,
                    excerpt: frontmatter.excerpt || content.substring(0, 150) + '...'
                });
            }
        }
        
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}