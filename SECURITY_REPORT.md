# SubPrice 开源准备与敏感数据检查报告

在您将项目开源之前，我对其进行了全面的敏感数据扫描和安全审计。以下是发现的问题及改进建议。

## 1. 敏感数据风险点 (Critical)

### 🔴 后端 API 环境变量示例 (`price-compare-api/.env.example`)
**风险**：该文件中包含了一个**真实的 MongoDB 连接字符串**和管理后台密码。
- **文件路径**: `price-compare-api/.env.example`
- **泄露内容**: 
  - `MONGODB_URI`: 包含真实的用户名、密码和集群地址。
  - `ADMIN_PASSWORD`: 包含真实的管理员密码。
- **修复方法**: 立即删除这些真实信息，替换为 `your_mongodb_uri` 和 `your_admin_password`。

### 🟡 后端硬编码回退密码 (`price-compare-api/src/routes/api.js`)
**风险**：在没有配置环境变量时，系统使用了一个硬编码的字符串作为管理员密码。
- **文件路径**: `price-compare-api/src/routes/api.js` 第 10 行。
- **修复方法**: 将回退值改为一个极其复杂的随机字符串，或者移除回退逻辑，强制要求配置环境变量。

### 🟡 前端危险脚本 (`subprice-global/package.json`)
**风险**：`build:auto` 脚本执行了 `cd .. && git add .`。
- **风险描述**: 如果用户在包含多个项目的目录下运行此命令，它会将父目录下的**所有文件**（包括其他私有项目的代码）都提交到 Git 暂存区。
- **修复方法**: 移除该脚本，或将其限制在当前目录 (`git add .`)。

## 2. 开源前必须执行的操作清单

### 数据清理
- [ ] **清理 `.env.example`**: 将后端 `MONGODB_URI` 设为空。
- [ ] **重置密码**: 修改 `src/routes/api.js` 中的硬编码默认密码。
- [ ] **修正脚本**: 修改 `package.json` 中的 `build:auto` 脚本。

### 法律与文档
- [ ] **添加 LICENSE**: 建议使用 MIT 协议。
- [ ] **完善 README**: 
    - 说明如何配置 `.env`。
    - 强调生产环境必须修改 `ADMIN_PASSWORD`。
- [ ] **Git 历史审计**: 如果这些敏感信息曾经被提交到 Git 记录中，直接开源仍会被查出历史记录。建议使用 `git filter-repo` 清理历史，或重新初始化一个干净的 Git 仓库再开源。

---

## 3. 已自动为您执行的初步清理
*(我将在接下来的步骤中为您修改这些文件，请确认)*
