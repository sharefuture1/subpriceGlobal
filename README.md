# 📉 SubPrice

> 全球订阅服务比价工具 | Global Subscription Price Comparison

**🔥 在线体验：** https://sub.future1.us/

[![Vue](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://github.com/vuejs/vue)
[![Vite](https://img.shields.io/badge/vite-latest-blueviolet.svg)](https://github.com/vitejs/vite)
[![Pinia](https://img.shields.io/badge/pinia-latest-yellow.svg)](https://github.com/piniajs/pinia)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌟 项目简介

**SubPrice** 是一款基于 **Vue 3 + Vite** 构建的订阅服务全球比价工具，帮助用户一站式查看 AI、流媒体、音乐、创作工具、云服务等主流订阅产品在全球各地区的真实价格，轻松找到最优方案。

### ✨ 核心功能

- 🌍 **全球比价** — 覆盖土耳其、尼日利亚、阿根廷、中国、美国、欧盟等主流市场
- 💹 **多货币换算** — 价格自动按汇率转换为参考货币，支持 CNY/USD/EUR 对比
- 🌓 **深色/浅色模式** — Liquid Glass 设计风格，丝滑切换
- 📱 **全响应式** — 完美适配手机、平板、桌面端
- ⚡ **极致性能** — Vite 极速构建，Pinia 轻量状态管理，首屏加载飞快

---

## 🛠️ 技术栈

| 层级 | 技术 |
|---|---|
| 前端框架 | Vue 3 (Composition API) + Vite |
| 状态管理 | Pinia |
| 国际化 | Vue-i18n (中文 / English) |
| 样式 | Vanilla CSS (Custom Glassmorphism System) |
| 后端（可选） | Express + Mongoose + MongoDB |
| 部署 | Vercel (前端) + GCP (后端) |

---

## 🚀 快速启动

### 前置要求

- Node.js ≥ 18
- npm ≥ 9

### 1. 克隆项目

```bash
git clone https://github.com/sharefuture1/subpriceGlobal.git
cd subpriceGlobal
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 即可开始使用。

### 4. 构建生产版本

```bash
npm run build
```

输出目录为 `dist/`，可部署到 Vercel、Netlify 或任意静态托管服务。

---

## 📂 项目结构

```
subpriceGlobal/
├── src/
│   ├── App.vue                 # 主应用入口
│   ├── components/
│   │   ├── layout/             # 布局组件 (AppHeader, TopNav)
│   │   └── features/           # 功能组件 (PriceItem, CategoryTabs, ...)
│   ├── stores/                 # Pinia 状态 (productStore, configStore)
│   ├── services/               # API 请求封装
│   ├── data/                   # 产品/地区静态数据
│   ├── i18n/                   # 中英文语言包
│   └── styles/                 # 全局样式与 CSS 变量
├── admin/                      # 管理后台 (独立 HTML)
├── api/                        # 简易 Express API 层 (可选)
├── public/                    # 静态资源 (sitemap, robots.txt)
├── package.json
└── vite.config.js
```

---

## ⚙️ 部署说明

### 前端部署（推荐 Vercel）

1. 将仓库关联到 Vercel；
2. 构建命令：`npm run build`，输出目录：`dist`；
3. 无需额外环境变量（前端纯静态）。

### 后端部署（如需启用数据管理）

请参考 [price-compare-api](https://github.com/sharefuture1/price-compare-api)（仓库未公开，请联系 @GlobalSubscription 获取），配置 `VITE_API_BASE` 环境变量。

---

## 💬 联系 / Contact

| 平台 | 地址 |
|---|---|
| 🌐 在线体验 | https://sub.future1.us/ |
| 💬 Telegram | [@GlobalSubscription](https://t.me/GlobalSubscription) |
| 💚 微信 | p137q773 |

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/YourFeature`
3. 提交更改：`git commit -m 'Add new feature'`
4. 推送到分支：`git push origin feature/YourFeature`
5. 开启 Pull Request

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。

---

<p align="center">
  Made with ❤️ · <a href="https://sub.future1.us">sub.future1.us</a>
</p>
