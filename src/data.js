const projectImage = (folder, number) => `/projects/${folder}/${String(number).padStart(2, '0')}.webp`
const projectPages = (folder, count) => Array.from({ length: count }, (_, index) => projectImage(folder, index + 1))

export const projects = [
  {
    id: '66vip',
    titleImage: '/projects/titles/66vip.png',
    titleImageReplacesFirst: true,
    index: '01',
    category: 'C 端产品设计',
    title: '九号出行 66VIP 会员项目',
    pdfTitle: '九号出行 · 66VIP 会员项目',
    english: 'Ninebot 66 VIP Membership Program',
    summary:
      '围绕九号出行 66VIP 会员体验，完整呈现项目规划、用户研究、竞品分析、产品定位、视觉规范、会员首页、购买流程与会员权益页面。',
    scope: ['项目规划', '用户研究', '竞品分析', '视觉规范', '会员核心页面'],
    preview: projectImage('66vip', 2),
    pages: projectPages('66vip', 17),
    range: '高清版 03–19',
  },
  {
    id: 'rideshare',
    titleImage: '/projects/titles/rideshare.png',
    titleImageReplacesFirst: false,
    index: '02',
    category: 'C 端产品设计',
    title: '顺风车 APP 迭代升级',
    pdfTitle: '顺风车 · 出行智能服务化 APP',
    english: 'Travel Service Platform',
    summary:
      '面向通勤与跨城出行用户，围绕路线规划、智能匹配与订单管理等核心场景进行产品体验优化，提升用户决策效率与服务流程的清晰度。',
    scope: ['用户研究', '功能框架', '交互设计', '视觉规范', '组件系统'],
    preview: projectImage('rideshare', 1),
    pages: projectPages('rideshare', 14),
    range: '高清图 01–14',
  },
  {
    id: 'property',
    titleImage: '/projects/titles/property.png',
    titleImageReplacesFirst: true,
    index: '03',
    category: 'B 端产品设计',
    title: 'B 端物业管理系统',
    pdfTitle: '管理平台 · 智能物业管理系统',
    english: 'Smart Property Management System',
    summary:
      '面向物业管理的 SaaS 系统，帮助物业管理人员高效处理日常事务、规范费用结算，并清晰化角色权限，提升管理效率。',
    scope: ['用户画像', '信息架构', '设计系统', '权限管理', '核心业务页面'],
    preview: projectImage('property', 2),
    pages: projectPages('property', 19),
    range: '高清版 20–38',
  },
  {
    id: 'campaign',
    titleImage: '/projects/titles/campaign.png',
    titleImageReplacesFirst: true,
    index: '04',
    category: '运营视觉设计',
    title: 'C 端运营活动 H5',
    pdfTitle: '活动页 · 运营活动项目设计',
    english: 'Campaign & H5 Design',
    summary:
      '围绕拉新、促活与转化等目标，完成车主服务、市场推广等主题的 H5 页面与延展视觉设计，增强活动吸引力与参与体验。',
    scope: ['活动策略', 'H5 视觉', 'Banner', '弹窗', '视觉延展'],
    preview: projectImage('campaign', 2),
    pages: projectPages('campaign', 9),
    range: '高清版 39–47',
  },
  {
    id: 'hmi',
    titleImage: '/projects/titles/hmi.png',
    titleImageReplacesFirst: false,
    index: '05',
    category: 'HMI 仪表设计',
    title: 'HMI 仪表页面设计',
    pdfTitle: 'HMI · 仪表页面设计',
    english: 'HMI Instrument Cluster Page Design',
    summary:
      '围绕车载仪表界面展开概念设计，完整呈现 16 套仪表方案、4 组视觉方向，以及驾驶信息、系统状态、沉浸主题与个性表达。',
    scope: ['仪表界面', '驾驶信息', '系统状态', '沉浸主题', '个性表达'],
    preview: projectImage('hmi', 1),
    pages: projectPages('hmi', 8),
    range: 'Dashboard Concept 01–08',
  },
  {
    id: 'visual',
    titleImage: '/projects/titles/visual.png',
    titleImageReplacesFirst: true,
    index: '06',
    category: '视觉设计',
    title: '视觉设计',
    pdfTitle: '视觉设计 · 主题皮肤与产品视觉',
    english: 'Theme Store · Visual & Motion',
    summary:
      '围绕九号 App 主题商城开展 C 端体验设计，负责主题皮肤展示、预览及使用流程，并参与首页及相关页面 UI 迭代。',
    scope: ['主题皮肤', 'UI 迭代', '宣传 Banner', '艺术文字', 'AI 海报'],
    preview: projectImage('visual', 2),
    pages: projectPages('visual', 9),
    range: '高清版 48–52 · 视觉延展 01–04',
  },
]

export const motionEntry = {
  id: 'motion',
  index: '07',
  category: 'UI 动效设计',
  title: '动效作品集',
  pdfTitle: '主题皮肤 · 界面反馈 · 角色动效',
  english: 'Motion Design Showcase',
  summary: '展示主题皮肤、App 页面与角色表情等实际动效项目，覆盖手机比例与方形动效两类内容。',
  scope: ['主题皮肤', 'UI 动效', '角色动效', 'After Effects', '动态视觉'],
  preview: '/motion/outlaw-cat.mp4',
}

export const motionItems = [
  { src: '/motion/outlaw-cat.mp4', title: '法外狂喵动效', type: 'phone' },
  { src: '/motion/bad-cat.mp4', title: '注意坏喵动效', type: 'phone' },
  { src: '/motion/task-force.mp4', title: '特遣队动效', type: 'phone' },
  { src: '/motion/rongjiu.mp4', title: '荣九动效', type: 'phone' },
  { src: '/motion/greedy-cat.mp4', title: '贪吃喵动效', type: 'phone' },
  { src: '/motion/mini-arcade.mp4', title: '迷你街机动效', type: 'phone' },
  { src: '/motion/money-now.mp4', title: '马上有钱动效', type: 'phone' },
  { src: '/motion/dream-dunhuang-dark.mp4', title: '大梦敦煌 · 暗色仪表动效', type: 'phone' },
  { src: '/motion/ai.mp4', title: '哎', type: 'square' },
  { src: '/motion/hi.mp4', title: '嗨', type: 'square' },
  { src: '/motion/great.mp4', title: '棒', type: 'square' },
  { src: '/motion/love.mp4', title: '爱你', type: 'square' },
  { src: '/motion/yeah.mp4', title: '耶', type: 'square' },
  { src: '/motion/hula.mp4', title: '草裙舞', type: 'square' },
  { src: '/motion/leave.mp4', title: '那我走', type: 'square' },
  { src: '/motion/square-love.mp4', title: '爱你', type: 'square' },
  { src: '/motion/square-outing.mp4', title: '出去玩呀', type: 'square' },
  { src: '/motion/square-hi.mp4', title: '嗨', type: 'square' },
  { src: '/motion/square-bye.mp4', title: '再见', type: 'square' },
  { src: '/motion/square-rabbit.mp4', title: '兔羊互动', type: 'square' },
  { src: '/motion/square-no-fight.mp4', title: '不要打架', type: 'square' },
  { src: '/motion/square-sheep.mp4', title: '羊羊角色动效', type: 'square' },
]

export const coreAdvantages = [
  {
    title: '视觉传达与界面表现',
    description: '视觉传达设计专业，擅长多种风格的视觉表现，熟悉 iOS 与 Web 端设计规范，能够独立完成 UI 交互与视觉设计。',
    signal: 'Visual / UI',
  },
  {
    title: '主流软件与 AIGC 应用',
    description: '熟练运用 Figma、Photoshop、After Effects 等设计软件，并使用 Gemini、ChatGPT、Midjourney、Stable Diffusion 等工具辅助创意与效率提升。',
    signal: 'Tools / AIGC',
  },
  {
    title: '以用户为中心的体验优化',
    description: '围绕用户需求持续优化产品界面与操作路径，兼顾易用性、美观性和体验一致性，让方案从需求分析走向真实使用场景。',
    signal: 'UX / Research',
  },
  {
    title: '运营活动视觉表现',
    description: '能够依据活动目标拆解设计任务，完成开屏、Banner、H5 活动专题页及数据可视化大屏等视觉工作，服务拉新、促活与转化。',
    signal: 'Campaign / H5',
  },
  {
    title: '产品、交互与视觉一体化',
    description: '具备产品思维与相关岗位经验，能将用户需求转化为可落地的产品方案，并协同产品、运营与开发推动设计落地。',
    signal: 'Product / Delivery',
  },
]

export const workExperiences = [
  {
    period: '2025.11—2026.06',
    company: '九号公司',
    role: 'UI/UX 设计师',
    industry: '互联网出行服务',
    business: '九号出行 APP 迭代优化、H5 运营活动、主题商城皮肤、仪表视觉、UI 动效与品牌视觉。',
    duties: [
      '参与核心产品页面与版本迭代，围绕需求分析、功能梳理、交互细节及视觉开展设计。',
      '负责主题皮肤、App 动效皮肤、主题商城、商品详情等相关模块，优化内容展示、浏览路径及使用体验。',
      '完成运营海报、Banner、H5 落地页等设计，并与运营共同拆解活动目标，提供匹配业务场景的视觉方案。',
      '协同产品与开发推进设计落地，跟进还原效果与问题闭环。',
      '参与设计规范与组件样式的维护和优化。',
    ],
  },
  {
    period: '2023.06—2024.09',
    company: '杭州一喂智能科技有限公司',
    role: 'UI/UX 设计师',
    industry: '互联网出行、软件开发及服务',
    business: '一喂顺风车 APP、小程序、H5 运营活动、B 端 SaaS 后台与品牌视觉。',
    duties: [
      '参与核心业务产品版本迭代，完成需求理解、用户场景分析、功能结构梳理与界面交互设计。',
      '负责 B 端 SaaS 后台系统设计，规划核心功能的信息架构、操作流程与页面层级。',
      '负责 C 端 H5 运营活动的视觉创意与设计，通过视觉方案赋能运营活动，提升用户参与度与转化。',
      '主导建立跨产品线设计规范与组件库并持续维护升级，与产品、开发协作推进落地，根据反馈优化产品体验。',
    ],
  },
]

export const capabilities = [
  {
    title: '产品体验与 UI/UX 设计',
    note: '从需求分析、用户研究与竞品分析出发，完成信息架构、核心流程、交互原型、高保真界面与体验优化。',
    tools: '用户研究 / 信息架构 / 交互设计 / 高保真 UI',
  },
  {
    title: '产品设计与设计系统',
    note: '覆盖 C 端 APP、B 端 SaaS 与跨产品线规范，建立组件库、页面层级和交付标准，并协同产品与开发推进落地。',
    tools: '产品思维 / SaaS / 组件库 / 设计交付',
  },
  {
    title: '运营视觉与 H5 设计',
    note: '围绕拉新、促活与转化目标，完成开屏、Banner、专题 H5、弹窗和延展物料，兼顾品牌一致性与活动表现。',
    tools: 'H5 / Campaign / Banner / 品牌视觉',
  },
  {
    title: 'UI 动效与主题视觉',
    note: '设计主题皮肤、仪表视觉、界面反馈和角色动效，让状态变化更清晰，并强化产品的个性化与视觉记忆。',
    tools: '主题皮肤 / 微交互 / After Effects / 动态视觉',
  },
  {
    title: 'AIGC 与高效设计工作流',
    note: '结合 Figma、Photoshop、After Effects 与生成式 AI 工具进行创意探索、图像处理、动效制作和设计提效。',
    tools: 'Figma / Photoshop / AE / Gemini / ChatGPT / MJ / SD',
  },
]
