# 马庆林 · UI/UX Portfolio 2026

在线访问：[maqinglin-portfolio.vercel.app](https://maqinglin-portfolio.vercel.app)

基于 React + Vite 搭建的个人作品集。首页包含独立图素重构封面、六入口作品目录、简介、能力与暗色收尾页；五个项目和动效作品集均拥有独立地址。项目名称、内容与图片顺序来自简历、高清作品集 PDF 与单独提供的顺风车高清图，站内动效使用提供的 MP4 文件。

## 本地运行

```bash
pnpm install
pnpm dev
```

浏览器打开终端显示的本地地址，通常为 `http://localhost:5173`。

## 构建与预览

```bash
pnpm build
pnpm preview
```

生产文件输出到 `dist/`。

## 内容与素材

- 项目内容配置：`src/data.js`
- 页面结构：`src/App.jsx`
- 视觉样式：`src/styles.css`
- 第二版视觉覆盖：`src/styles-v2.css`
- 第三版高清视觉覆盖：`src/styles-v3.css`
- 高清项目图：`public/projects/`
- 首页人物与软件图标：`public/hero/`
- 动效视频：`public/motion/`
- 头像：`public/profile/portrait.webp`

## 后续替换

高清项目图按项目目录独立编号并保留原图比例，替换同名文件即可更新画面。动效容器由 `src/components/MotionPreview.jsx` 统一控制，支持静音循环、进入视口播放、离开视口暂停及手动暂停。

## 独立页面

- `/project/66vip`：九号出行 66VIP 会员项目
- `/project/rideshare`：顺风车 APP 迭代升级
- `/project/property`：B 端物业管理系统
- `/project/campaign`：C 端运营活动 H5
- `/project/visual`：九号主题商城体验优化与核心产品 UI 迭代
- `/motion`：动效作品集

项目页顶部和底部都提供返回作品目录入口。由首页进入详情时，浏览器后退也会恢复原目录位置。

## 当前版本

当前仓库对应最终优化版：桌面与移动端均已完成响应式校正，首页、作品目录、关于、设计能力与联系方式采用连续滚动结构；五个项目与动效作品集保留独立入口。非动效项目图片保持静态阅读，动效作品继续使用进入视口播放与静音循环。

## 公网部署

项目已包含 `vercel.json`，支持 Vite 单页应用的独立项目地址。部署参数：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js：建议使用当前 LTS 版本

也可以部署到腾讯云 EdgeOne Pages，构建命令与输出目录保持一致。
