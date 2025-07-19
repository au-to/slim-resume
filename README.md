# Slim Resume - 专业简历制作平台

这是一个现代化的全栈在线简历制作平台，基于 Next.js 14 构建，支持用户登录、简历编辑、模板切换、PDF 导出和分享链接等功能。

## 🚀 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **编辑器**: Slate.js
- **认证**: NextAuth.js (Auth.js)
- **数据库**: PostgreSQL + Prisma ORM
- **文件上传**: UploadThing
- **PDF 导出**: react-pdf
- **部署**: Vercel

## ✨ 主要功能

- 🔐 **用户认证**: 支持邮箱、Google、GitHub 登录
- 📝 **智能编辑**: 基于 Slate.js 的富文本编辑器
- 🎨 **精美模板**: 多种专业简历模板
- 📱 **响应式设计**: 支持桌面端和移动端
- 📄 **PDF 导出**: 高质量 PDF 生成
- 🔗 **分享链接**: 生成简历分享链接
- 🌙 **深色模式**: 支持明暗主题切换
- 🔒 **数据安全**: 企业级安全标准

## 🛠️ 本地开发

### 环境要求

- Node.js 18+ 
- PostgreSQL 数据库
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd slim-resume
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，配置以下必要变量：
- `DATABASE_URL`: PostgreSQL 数据库连接字符串
- `NEXTAUTH_SECRET`: NextAuth 密钥
- `NEXTAUTH_URL`: 应用 URL (开发环境: http://localhost:3000)

4. **数据库设置**
```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库 schema（开发环境）
npm run db:push

# 或者运行迁移（生产环境）
npm run db:migrate
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
slim-resume/
├── prisma/                    # 数据库 schema 和迁移
│   └── schema.prisma
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API 路由
│   │   ├── auth/              # 认证页面
│   │   ├── editor/            # 简历编辑器
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── components/            # React 组件
│   │   ├── ui/                # shadcn/ui 组件
│   │   ├── auth/              # 认证相关组件
│   │   └── providers.tsx      # 全局 Provider
│   ├── lib/                   # 工具库
│   │   ├── auth.ts            # NextAuth 配置
│   │   ├── db.ts              # 数据库连接
│   │   └── utils.ts           # 工具函数
│   ├── store/                 # Zustand 状态管理
│   │   └── resume-store.ts    # 简历状态
│   └── types/                 # TypeScript 类型定义
│       └── index.ts
├── components.json            # shadcn/ui 配置
├── next.config.js             # Next.js 配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── package.json               # 项目依赖
```

## 🚀 部署到 Vercel

1. **连接 GitHub 仓库**
   - 登录 [Vercel](https://vercel.com)
   - 导入 GitHub 仓库

2. **配置环境变量**
   在 Vercel 项目设置中添加以下环境变量：
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - OAuth 提供商密钥 (Google, GitHub)
   - UploadThing 配置

3. **部署**
   - Vercel 会自动检测 Next.js 项目并进行部署
   - 每次推送到主分支都会自动重新部署

## 📜 可用脚本

- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run start`: 启动生产服务器
- `npm run lint`: 运行 ESLint
- `npm run db:generate`: 生成 Prisma 客户端
- `npm run db:migrate`: 运行数据库迁移
- `npm run db:push`: 推送 schema 到数据库
- `npm run db:studio`: 启动 Prisma Studio

## 🔧 配置说明

### 数据库配置

项目使用 PostgreSQL 数据库，通过 Prisma ORM 进行管理。主要模型包括：

- `User`: 用户信息
- `Account`: OAuth 账户
- `Session`: 用户会话
- `Resume`: 简历数据
- `PersonalInfo`: 个人信息
- `ResumeSection`: 简历章节

### 认证配置

支持多种登录方式：
- 邮箱登录（无密码）
- Google OAuth
- GitHub OAuth

### 文件上传

使用 UploadThing 处理文件上传，支持：
- 头像上传
- 简历附件
- 其他媒体文件

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

此项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如有问题或建议，请：
- 创建 [Issue](../../issues)
- 发送邮件至 support@slim-resume.com
- 查看 [文档](../../wiki)

---

**Slim Resume** - 让简历制作变得简单专业 ✨
