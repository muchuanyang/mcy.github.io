<!-- 本博客基于 Hexo + Typography 主题搭建，源码保存在 GitHub 仓库 muchuanyang/mcy.github.io -->

# 木川羊的博客

个人博客，基于 **Hexo 8** + **Typography 主题**（参考 <https://polebug.github.io/archives/> 的风格）。
写完 Markdown 文章，一条命令自动生成网页并发布到 GitHub Pages。

- **线上地址**：<https://muchuanyang.github.io/mcy.github.io/>
- **仓库地址**：<https://github.com/muchuanyang/mcy.github.io>
- **文章目录**：`source/_posts/`

> **为什么网址里多了一层 `/mcy.github.io/`？**
> GitHub 的规则是：只有仓库名**恰好等于「用户名 + .github.io」**时，博客才落在根路径。
> 本项目用的是普通仓库 `mcy.github.io`，所以地址是 `https://muchuanyang.github.io/mcy.github.io/`，
> 功能完全一样，只是地址长一点。
> **如果以后想换成根路径地址**：新建一个名为 `muchuanyang.github.io` 的仓库，把远程地址换过去，
> 并同时把 `_config.yml` 里的 `url` 改成 `https://muchuanyang.github.io`、`root` 改成 `/`（**两者必须一起改，否则样式和图片会 404**）。

---

## 一、目录结构（先认路）

```
muchuanyang.github.io/
├── _config.yml              # 站点主配置（站名、网址、菜单、部署方式）
├── package.json             # 依赖清单 + 便捷命令
├── scaffolds/               # 新建文章的模板（不改也行）
├── source/                  # ← 你平时打交道的只有这里
│   ├── _posts/              # 文章（.md 文件），每篇一个文件
│   ├── about/index.md       # 「关于」页面
│   └── images/              # 放图片（可选，新建即可）
├── themes/
│   └── typography/          # 主题：外观、样式、菜单逻辑都在这里
│       └── _config.yml      # ← 改站名、副标题、社交图标在这里
├── node_modules/            # 依赖（自动生成，不用管、不要提交）
└── public/                  # 生成出来的网站（自动生成，不用管、不要提交）
```

> 只记住两件事：**写文章去 `source/_posts/`，改外观去主 `_config.yml` 和 `themes/typography/_config.yml`。**

---

## 二、本地环境

当前这台电脑**已经装好**：Node 22、npm 10、Git，且依赖已安装完毕。之后只要在这个目录下执行命令即可。

如果以后换了电脑，先做一次：

```bash
# 安装依赖（只做一次，或在依赖有变化时做）
npm install
```

---

## 三、日常三条命令（最常用）

### 1. 本地预览

```bash
npx hexo server
```

浏览器打开 <http://localhost:4000> 就能看到效果。**改完保存，刷新页面即可**（大多数情况会自动刷新）。
预览完在终端按 `Control + C` 停止。

### 2. 新建一篇文章

```bash
npx hexo new "我的第一篇文章"
```

会在 `source/_posts/` 下生成一个 `.md` 文件（文件名形如 `2026-10-04-我的第一篇文章.md`），用任意编辑器打开写内容即可。

一篇文章的样子：

```markdown
---
title: 我的第一篇文章
date: 2026-10-04 15:00:00
tags:
  - 随笔
  - 思考
---

这里是正文。

## 小标题

普通段落，**加粗**，*斜体*，[链接](https://example.com)。

> 引用一行。

- 列表项一
- 列表项二
```

- `title`、`date`、`tags` 是**文章头部信息（front-matter）**，必须写在两行 `---` 之间。
- 想给文章加分类（暂未启用「分类」栏目可忽略）用 `categories:`，用法和 `tags` 一样。
- 正文里的 `<!-- more -->` 表示「首页摘要到这里为止」，可不写。

### 3. 发布上线

```bash
npx hexo clean && npx hexo generate --deploy
```

这条命令会「生成网站 → 推送到线上」。**等一两分钟**再刷新 <https://muchuanyang.github.io/mcy.github.io/> 即可看到更新。

---

## 四、在文章里放图片

1. 把图片放进 `source/images/` 目录（没有就新建一个）。
2. 文章里这样引用：

```markdown
![图片说明](/images/我的图片.jpg)
```

> 用 `/images/xxx.jpg` 这种**以斜杠开头**的写法，在任何页面上都能正确显示。
> 图片建议压到 800px 宽以内，网页打开更快。

---

## 五、改外观（站名 / 副标题 / 社交图标）

编辑 `themes/typography/_config.yml`：

```yaml
title_primary: "木川羊的博客"   # 大字主标题
title_secondary: "记录思考成长" # 小字副标题
github: muchuanyang            # 导航栏 GitHub 图标（填用户名）
weibo:                         # 微博图标，填了就显示
twitter:
instagram:
```

编辑主 `_config.yml` 可以改**浏览器标签页标题、SEO 描述、关键字、作者**：

```yaml
title: 木川羊的博客
description: 木川羊的个人博客 —— 记录思考、沉淀成长。
keywords: 木川羊,博客,随笔,读书笔记,复盘
```

> 改配色（浅色/深色）：`themes/typography/_config.yml` 里的 `themeStyle: light` 改成 `dark` 即为深色主题。

---

## 六、首次上线（只需要做一次）

工程已经建好，这一步是把它接到 GitHub 上并开启网页托管。

### 第 1 步：在 GitHub 建仓库

1. 打开 <https://github.com/new>
2. **Repository name** 填：`mcy.github.io`
3. 可见性**必须选 Public** —— ⚠️ 免费版 GitHub Pages **无法发布私有仓库**，这是「上传了但网站打不开」最常见的原因
4. 仓库有没有旧内容都无所谓，下一步推送会**完整覆盖**它
5. 点 **Create repository**

### 第 2 步：把本地源码推上去

> **当前状态：本地已经准备好了。** 仓库已初始化、身份已配置、远程地址已指向
> `muchuanyang/mcy.github.io`，提交也已完成。所以**你只需要执行最后一条 `git push`**。
> 把完整流程也列在下面，以后换电脑重来时可照抄。

在本工程目录（`muchuanyang.github.io/`）打开终端：

```bash
git push -u origin main
```

完整流程（**这次不用做**，仅备用）：

```bash
git init -b main
git config user.name "muchuanyang"
git config user.email "muchuanyang@users.noreply.github.com"
git add -A
git commit -m "init: 木川羊的博客"
git remote add origin https://github.com/muchuanyang/mcy.github.io.git
git push -u origin main
```

> 推送时会要求登录 GitHub。密码栏**不要填账号密码**，要用 **Personal Access Token（PAT）**：
> GitHub → 右上角头像 → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token，勾选 `repo` 权限，生成后复制，粘贴到密码栏。
> （或者提前配置好 SSH key，用 `git@github.com:muchuanyang/...` 地址，就不用每次输 token。）

### 第 3 步：生成并发布网站（创建 gh-pages 分支）

```bash
npx hexo clean && npx hexo generate --deploy
```

执行后，你的仓库里会多出一个 `gh-pages` 分支 —— 里面就是生成好的网站。

### 第 4 步：开启 GitHub Pages

1. 打开仓库 → **Settings** → 左侧 **Pages**
2. **Source** 选 **Deploy from a branch**
3. **Branch** 选 **`gh-pages`**，目录选 **`/ (root)`**，点 **Save**
4. 等 1–2 分钟，访问 <https://muchuanyang.github.io/mcy.github.io/> ✅

> 如果短时间打不开，是还在部署，再等几分钟。

---

## 七、以后每次更新文章

```bash
# 1) 本地预览确认没问题
npx hexo server

# 2) 存档源码（可省，但建议做，方便以后找回历史）
git add .
git commit -m "新文章：xxx"
git push

# 3) 发布到线上
npx hexo clean && npx hexo generate --deploy
```

---

## 八、常见问题

**Q：首页没有显示我新写的文章？**
A：检查文章的 `date` 是否为未来时间；确认文件在 `source/_posts/` 且以 `.md` 结尾；重新执行 `npx hexo clean && npx hexo generate`。

**Q：导航栏没有「标签」或「关于」？**
A：「关于」来自 `source/about/index.md`；「标签」由标签生成器自动创建。**只有当至少有一篇文章带 `tags` 时，「标签」才会出现在导航栏**，所以请确保文章头部写了 `tags:`。

**Q：改了 `_config.yml` 不生效？**
A：先 `npx hexo clean` 再重新生成/预览。

**Q：发布后线上还是旧的？**
A：GitHub Pages 有 1–2 分钟缓存，稍等；仍不行就检查第 4 步的 Pages 分支是否选的是 `gh-pages`。

**Q：`public/`、`node_modules/` 要不要提交到 Git？**
A：不用，`.gitignore` 已经排除（网站内容通过 `hexo deploy` 自动推送到 `gh-pages` 分支）。

**Q：怎么确认主题文件真的被提交了？**
A：执行 `git ls-files themes/ | wc -l`，正常应输出 60 左右。**如果输出是 1**，说明主题被 Git 误当成「子模块」了，
原因是 `git clone` 主题时带进来的 `themes/typography/.git` 目录。解决办法：

```bash
rm -rf themes/typography/.git
git rm -r --cached themes/typography
git add themes/typography
git commit -m "fix: 把主题作为普通文件纳入版本管理"
```

**Q：上线后打开是一片空白 / 样式全丢？**
A：两种可能。① 仓库是 **Private** —— 免费版 Pages 发不出私有仓库，去 Settings → General → 拉到底 Danger Zone → Change visibility 改成 **Public**。② `_config.yml` 里的 `url` / `root` 和仓库名不匹配 —— 本项目部署在 `mcy.github.io`，所以必须是 `url: https://muchuanyang.github.io/mcy.github.io` 搭配 `root: /mcy.github.io/`，两个要一起改。

---

## 九、重要提醒

- 仓库里现有的 3 篇示例文章（`source/_posts/` 下的 `hello-muchuanyang.md` 等）是为了让你看到排版效果，**请在上线前删掉或替换成你自己的内容**。
- 参考站点 <https://polebug.github.io/> 是他人博客，**请勿照搬其私人文章内容**。
- 本主题为第三方开源主题 [Typography](https://github.com/SumiMakito/hexo-theme-typography)（MIT 协议），可放心使用；若做了二次修改，保留 `themes/typography/LICENSE` 即可。

---

## 附：常用命令速查

| 目的 | 命令 |
| --- | --- |
| 本地预览 | `npx hexo server` |
| 新建文章 | `npx hexo new "标题"` |
| 只生成不发布 | `npx hexo generate` |
| 清缓存 | `npx hexo clean` |
| 生成并发布 | `npx hexo clean && npx hexo generate --deploy` |
| 提交源码 | `git add . && git commit -m "说明" && git push` |
