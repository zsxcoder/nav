import { Link } from '@/types/link';
import { Category } from '@/types/category';

/**
 * 生成唯一 ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * 创建链接对象的辅助函数
 */
function createLink(
  name: string,
  url: string,
  description: string,
  category: string,
  icon?: string,
  backgroundColor?: string,
  iconScale?: number
): Link {
  const now = Date.now();
  return {
    id: generateId(),
    name,
    url,
    description,
    category,
    icon,
    backgroundColor: backgroundColor || '#bae0ff',
    iconScale: iconScale || 0.7,
    tags: [],
    order: 0,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 默认导航链接数据
 * 分类：主页、开发常用、技术框架、图标壁纸、工具软件、社区论坛、影音视听
 */
export const defaultLinks: Link[] = [
  // 主页
  createLink(
    'Gmail',
    'https://mail.google.com/',
    'Google提供的免费电子邮件服务',
    '主页',
    'https://favicon.im/mail.google.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '通义',
    'https://www.tongyi.com',
    '你的超级个人助理',
    '主页',
    'https://favicon.im/www.tongyi.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '唯知主页',
    'https://weizwz.com',
    '分享编码世界，拥抱现代科技生活',
    '主页',
    'https://p.weizwz.com/home_white_0e91e04b62808beb.webp',
    '#1890ff',
    0.7
  ),
  createLink(
    '微信网页版',
    'https://wx.qq.com',
    '使用手机微信扫码登录',
    '主页',
    'https://api.iconify.design/ant-design/wechat-filled.svg?color=%23ffffff',
    '#08c15f',
    0.7
  ),
  createLink(
    '网易云音乐',
    'https://music.163.com',
    '一款专注于发现与分享的音乐产品',
    '主页',
    'https://cdn.simpleicons.org/neteasecloudmusic/ffffff',
    '#fc4a47',
    0.7
  ),
  createLink(
    '抖音',
    'https://www.douyin.com/',
    '字节跳动旗下的短视频社交平台',
    '主页',
    'https://api.iconify.design/line-md:tiktok.svg?color=%23ffffff',
    '#000000',
    0.7
  ),
  createLink(
    '163邮箱',
    'https://mail.163.com',
    '中文邮箱第一品牌',
    '主页',
    'https://favicon.im/mail.163.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '豆包',
    'https://www.doubao.com/chat/',
    '字节跳动推出的多功能 AI 助手，支持聊天、创作与智能问答',
    '主页',
    'https://favicon.im/www.doubao.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '唯知笔记',
    'https://note.weizwz.com/',
    '个人博客，探索知识的无限可能',
    '主页',
    'https://p.weizwz.com/logo_white.svg?',
    '#1890ff',
    0.7
  ),
  createLink(
    'Ctool',
    'https://ctool.dev/',
    '程序开发常用工具\n',
    '主页',
    'https://favicon.im/ctool.dev?larger=true',
    '#d9d9d9',
    1
  ),
  createLink(
    '小红书',
    'https://www.xiaohongshu.com',
    '一个年轻生活方式分享平台',
    '主页',
    'https://api.iconify.design/simple-icons:xiaohongshu.svg?color=%23ffffff',
    '#ff2341',
    0.7
  ),
  createLink(
    'Github',
    'https://github.com/weizwz',
    '全球最大的代码托管平台',
    '主页',
    'https://api.iconify.design/mdi:github.svg?color=%23ffffff',
    '#262626',
    0.7
  ),
  createLink(
    'QQ邮箱',
    'https://mail.qq.com',
    '腾讯提供的高效稳定便捷的电子邮件服务',
    '主页',
    'https://favicon.im/mail.qq.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '飞书文档',
    'https://docs.feishu.cn/',
    '一站式企业沟通与协作平台',
    '主页',
    'https://favicon.im/docs.feishu.cn?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Google 学术',
    'https://scholar.google.com/',
    '免费学术搜索引擎，可检索全球学术论文、专利、书籍及引用信息',
    '主页',
    'https://api.iconify.design/simple-icons:googlescholar.svg?color=%23ffffff',
    '#4285f4',
    0.7
  ),
  createLink(
    '语雀',
    'https://www.yuque.com',
    '优雅高效的在线文档编辑与协同工具',
    '主页',
    'https://favicon.im/www.yuque.com?larger=true',
    '#4bce75',
    0.7
  ),
  createLink(
    '码云',
    'https://gitee.com',
    '代码托管和研发协作平台',
    '主页',
    'https://cdn.simpleicons.org/gitee/ffffff',
    '#c71d23',
    0.7
  ),
  createLink(
    'MDN',
    'https://developer.mozilla.org/zh-CN/',
    '面向 Web 开发者的技术文档',
    '主页',
    'https://api.iconify.design/simple-icons:mdnwebdocs.svg?color=%23ffffff',
    '#000000',
    0.5
  ),
  createLink(
    '夸克网盘',
    'https://pan.quark.cn',
    '夸克浏览器推出的一款云服务产品，功能包括云存储、高清看剧、文件在线解压、PDF一键转换等',
    '主页',
    'https://favicon.im/pan.quark.cn?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '唯知导航',
    'https://nav.weizwz.com/',
    '简洁、高效的网页导航',
    '主页',
    'https://favicon.im/nav.weizwz.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '百度网盘',
    'https://pan.baidu.com',
    '提供文件的网络备份、同步和分享服务',
    '主页',
    'https://api.iconify.design/arcticons:baidu-netdisk.svg?color=%23ffffff',
    '#237bfe',
    0.7
  ),
  createLink(
    'ES6',
    'https://es6.ruanyifeng.com/',
    '阮一峰 ES6 入门教程',
    '主页',
    'https://api.iconify.design/ri:javascript-fill.svg?color=%23ffffff',
    '#ffc53d',
    0.7
  ),
  createLink(
    'Cloudflare',
    'https://dash.cloudflare.com',
    '一站式管理网站性能、安全与网络服务',
    '主页',
    'https://api.iconify.design/devicon-plain:cloudflare.svg?color=%23ffffff',
    '#f38020',
    0.7
  ),
  createLink(
    'Vercel',
    'https://vercel.com',
    '网站部署和托管平台',
    '主页',
    'https://api.iconify.design/lineicons:vercel.svg?color=%23ffffff',
    '#000000',
    0.6
  ),

  // 开发常用
  createLink(
    'Google Console',
    'https://search.google.com/search-console',
    '谷歌网站管理工具，监控索引与优化搜索表现',
    '开发常用',
    'https://favicon.im/search.google.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Google Adsense',
    'https://www.google.com/adsense/',
    '谷歌官方网站广告收益平台',
    '开发常用',
    'https://api.iconify.design/logos:google-adsense.svg',
    '#ffffff',
    0.7
  ),
  createLink(
    'Bing 站长工具',
    'https://www.bing.com/webmasters/home',
    '微软网站管理平台，管理索引、分析流量、优化SEO',
    '开发常用',
    'https://api.iconify.design/uil:bing.svg?color=%23ffffff',
    '#38a3f9',
    0.7
  ),
  createLink(
    'ThisCover',
    'https://cover.weizwz.com/',
    '一个免费、漂亮的封面生成器',
    '开发常用',
    'https://p.weizwz.com/cover/cover_full_441653186ab35580.webp',
    '#4c38da',
    1
  ),
  createLink(
    'Swagger',
    'https://swagger.io/',
    'API 文档和设计工具',
    '开发常用',
    'https://api.iconify.design/devicon:swagger.svg?color=%23ffffff',
    '#85ea2d',
    0.6
  ),
  createLink(
    'IT Dog',
    'https://www.itdog.cn/ping',
    '多地Ping，网络延迟测试',
    '开发常用',
    'https://api.iconify.design/roentgen/dog.svg?color=%23ffffff',
    '#ffc53d',
    0.7
  ),
  createLink(
    'Google Analytics',
    'https://analytics.google.com/',
    '谷歌官方网站流量分析平台',
    '开发常用',
    'https://api.iconify.design/simple-icons:googleanalytics.svg?color=%23ffa940',
    '#ffffff',
    0.6
  ),
  createLink(
    'Readdy',
    'https://readdy.ai',
    'AI 产品设计工具，一键生成界面与代码',
    '开发常用',
    'https://favicon.im/readdy.ai?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '百度统计',
    'https://tongji.baidu.com/',
    '百度全端数据资产管理与智能分析平台',
    '开发常用',
    'https://api.iconify.design/ri:baidu-fill.svg?color=%23ffffff',
    '#1890ff',
    0.7
  ),
  createLink(
    'VitePress',
    'https://vitepress.dev',
    '基于 Vite 的静态站点生成器 (SSG)',
    '开发常用',
    'https://cdn.simpleicons.org/vitepress/ffffff',
    '#5c73e7',
    0.7
  ),
  createLink(
    'Netlify',
    'https://www.netlify.com',
    '一体化前端部署平台，支持自动构建、Serverless 与全球 CDN',
    '开发常用',
    'https://api.iconify.design/devicon-plain:netlify.svg?color=%23ffffff',
    '#00c7b7',
    0.6
  ),
  createLink(
    'Stack Overflow',
    'https://stackoverflow.com',
    '全球最大的技术问答网站',
    '开发常用',
    'https://cdn.simpleicons.org/stackoverflow/ffffff',
    '#f58025',
    0.6
  ),
  createLink(
    'Vercount',
    'https://events.vercount.one/',
    '轻量级网站访问计数服务，兼容不蒜子的统计',
    '开发常用',
    'https://favicon.im/events.vercount.one?larger=true',
    '#f3f3f3',
    0.7
  ),
  createLink(
    '腾讯云',
    'https://cloud.tencent.com/',
    '提供云计算、大数据与 AI 服务的综合云平台',
    '开发常用',
    'https://favicon.im/cloud.tencent.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '阿里云',
    'https://aliyun.com/',
    '全球知名的云服务，提供弹性计算、数据库、安全、AI 等',
    '开发常用',
    'https://api.iconify.design/ant-design/aliyun-outlined.svg?color=%23ffffff',
    '#ff6a00',
    0.7
  ),

  // 技术框架
  createLink(
    'Vite',
    'https://cn.vitejs.dev/guide/',
    '下一代的前端工具链',
    '技术框架',
    'https://favicon.im/cn.vitejs.dev?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    '微信开放文档',
    'https://developers.weixin.qq.com/miniprogram/dev/framework/',
    '微信小程序、公众号、支付等官方开发文档',
    '技术框架',
    'https://favicon.im/developers.weixin.qq.com?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    'React',
    'https://zh-hans.reactjs.org',
    '用于构建用户界面的 JavaScript 库',
    '技术框架',
    'https://cdn.simpleicons.org/react/ffffff',
    '#61dafb',
    0.6
  ),
  createLink(
    'Vue',
    'https://cn.vuejs.org',
    '渐进式 JavaScript 框架',
    '技术框架',
    'https://cdn.simpleicons.org/vuedotjs/ffffff',
    '#4fc08d',
    0.6
  ),
  createLink(
    'npm',
    'https://www.npmjs.com',
    '全球最大的 JavaScript 包管理平台',
    '技术框架',
    'https://api.iconify.design/mdi:npm.svg?color=%23ffffff',
    '#cb0200',
    0.8
  ),
  createLink(
    'Next.js',
    'https://nextjs.org',
    '用于 Web 的 React 框架',
    '技术框架',
    'https://api.iconify.design/lineicons:nextjs.svg?color=%23ffffff',
    '#000000',
    0.7
  ),
  createLink(
    'Vitest',
    'https://cn.vitest.dev/guide/',
    'Vite 驱动的下一代测试框架',
    '技术框架',
    'https://favicon.im/cn.vitest.dev?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'React Router',
    'https://reactrouter.com/home',
    'React 官方路由库，支持多模式与数据驱动导航',
    '技术框架',
    'https://api.iconify.design/vscode-icons:file-type-light-reactrouter.svg?color=%23ffffff',
    '#ffffff',
    0.7
  ),
  createLink(
    'Tailwind CSS',
    'https://tailwindcss.com/docs/installation/using-vite',
    '原子化 CSS 框架，直接在 HTML 中构建现代网站',
    '技术框架',
    'https://api.iconify.design/mdi:tailwind.svg?color=%23ffffff',
    '#16bcff',
    0.7
  ),
  createLink(
    'Vue Router',
    'https://router.vuejs.org/zh/introduction.html',
    'Vue.js 官方路由管理器',
    '技术框架',
    'https://api.iconify.design/carbon:logo-vue.svg?color=%23ffffff',
    '#47d268',
    0.7
  ),
  createLink(
    'Nest.js',
    'https://docs.nestjs.cn',
    '企业级 Node.js 框架，支持 TS 与模块化开发',
    '技术框架',
    'https://cdn.simpleicons.org/nestjs/ffffff',
    '#e0234e',
    0.6
  ),
  createLink(
    'Express',
    'https://expressjs.com',
    'Node.js 极简 Web 框架，灵活高效，支持中间件扩展',
    '技术框架',
    'https://api.iconify.design/simple-icons:express.svg?color=%23ffffff',
    '#000000',
    0.6
  ),
  createLink(
    'pnpm',
    'https://www.pnpm.cn/installation',
    '速度快、节省磁盘空间的软件包管理器',
    '技术框架',
    'https://favicon.im/www.pnpm.cn?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    'Ant Design',
    'https://ant.design',
    '企业级 UI 设计语言和 React 组件库',
    '技术框架',
    'https://favicon.im/ant.design?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    'Element Plus',
    'https://element-plus.org/zh-CN/component/overview',
    '国内最流行的 Vue 3 组件库，丰富 UI 组件，开箱即用',
    '技术框架',
    'https://api.iconify.design/ep/element-plus.svg?color=%23ffffff',
    '#409eff',
    0.7
  ),
  createLink(
    'uni-app',
    'https://uniapp.dcloud.net.cn/',
    '一个使用 Vue.js 开发所有前端应用的框架',
    '技术框架',
    'https://favicon.im/uniapp.dcloud.net.cn?larger=true',
    '#2b9939',
    0.7
  ),
  createLink(
    'Sass',
    'https://sass-lang.com.cn/documentation/',
    'Sass 中文文档，强大的 CSS 扩展语言，支持变量、嵌套、Mixin 与函数\n',
    '技术框架',
    'https://favicon.im/sass-lang.com.cn?larger=true',
    '#cc6699',
    0.7
  ),
  createLink(
    'shadcn/ui',
    'https://ui.shadcn.com/docs/installation',
    '可定制 React 组件库，基于 Tailwind CSS 与 Radix UI',
    '技术框架',
    'https://api.iconify.design/vscode-icons:file-type-shadcn.svg?color=%23ffffff',
    '#000000',
    0.6
  ),
  createLink(
    'Inspira UI',
    'https://inspira-ui.com/docs/components',
    '基于 Tailwind CSS 的现代组件库，提供丰富炫酷的 UI 组件与交互动效，助力快速构建高颜值 Web 应用',
    '技术框架',
    'https://favicon.im/inspira-ui.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Ant Design Mobile',
    'https://mobile.ant.design/zh/components/button',
    '蚂蚁金服移动端 React 组件库',
    '技术框架',
    'https://favicon.im/mobile.ant.design?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Webpack',
    'https://www.webpackjs.com',
    '现代 JS 应用程序的静态模块打包工具，支持代码分割、热更新与插件扩展',
    '技术框架',
    'https://www.webpackjs.com/icon_180x180.png',
    '#8ed5fa',
    0.7
  ),
  createLink(
    'Node.js',
    'https://nodejs.org/zh-cn',
    '基于 Chrome V8 引擎的 JavaScript 运行环境',
    '技术框架',
    'https://cdn.simpleicons.org/nodedotjs/ffffff',
    '#5fa04e',
    0.6
  ),
  createLink(
    'ECharts',
    'https://echarts.apache.org/zh/api.html#echarts',
    '最流行 JS 开源数据可视化图表库',
    '技术框架',
    'https://favicon.im/echarts.apache.org?larger=true',
    '#aa314d',
    0.8
  ),
  createLink(
    'CodePen',
    'https://codepen.io/trending',
    '展示最受欢迎和最新颖的前端代码作品',
    '技术框架',
    'https://cdn.simpleicons.org/codepen/ffffff',
    '#000000',
    0.7
  ),
  createLink(
    'DataV',
    'http://datav.jiaminghi.com',
    '开源大屏数据可视化组件库，支持 Vue3 与 React',
    '技术框架',
    'https://favicon.im/datav.jiaminghi.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Vant',
    'https://vant-ui.github.io/vant/#/zh-CN',
    '轻量、可定制的移动端 Vue 组件库',
    '技术框架',
    'https://favicon.im/vant-ui.github.io?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'TypeScript',
    'https://www.tslang.cn/docs/handbook/basic-types.html',
    'JavaScript 超集，支持静态类型与现代开发特性',
    '技术框架',
    'https://cdn.simpleicons.org/typescript/ffffff',
    '#3178c6',
    0.6
  ),
  createLink(
    'Nuxt.js',
    'https://nuxt.com',
    '基于 Vue 的全栈框架，支持 SSR、静态生成与自动路由',
    '技术框架',
    'https://cdn.simpleicons.org/nuxt/ffffff',
    '#00dc82',
    0.7
  ),
  createLink(
    'HarmonyOS',
    'https://developer.huawei.com/consumer/cn/doc/',
    'HarmonyOS 与全场景生态官方开发平台',
    '技术框架',
    'https://api.iconify.design/simple-icons:huawei.svg?color=%23ffffff',
    '#e83923',
    0.7
  ),
  createLink(
    'Koa',
    'https://koajs.com/',
    '下一代 Node.js Web 框架，轻量、优雅，支持 async/await',
    '技术框架',
    'https://api.iconify.design/simple-icons:koa.svg?color=%23ffffff',
    '#000000',
    0.7
  ),
  createLink(
    '高德地图 API',
    'https://lbs.amap.com/api/javascript-api-v2/summary',
    '基于 WebGL 的高性能 Web 地图渲染引擎',
    '技术框架',
    'https://favicon.im/lbs.amap.com?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    '百度地图 API',
    'https://lbsyun.baidu.com/index.php?title=jspopularGL',
    '基于 WebGL 的 3D 地图开发接口',
    '技术框架',
    'https://favicon.im/lbsyun.baidu.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Antv',
    'https://antv.antgroup.com/',
    '蚂蚁企业级数据可视化解决方案',
    '技术框架',
    'https://api.iconify.design/simple-icons:antv.svg?color=%23ffffff',
    '#722ed1',
    0.6
  ),
  createLink(
    'PrimeVue',
    'https://primevue.org/',
    'Vuejs 的下一代  UI 套件',
    '技术框架',
    'https://cdn.simpleicons.org/primevue/ffffff',
    '#41b883',
    0.6
  ),
  createLink(
    'Motion',
    'https://motion.dev/docs/quick-start',
    '轻量级 JS 动画库，支持 HTML/SVG/WebGL',
    '技术框架',
    'https://favicon.im/motion.dev?larger=true',
    '#fdeb0e',
    0.8
  ),
  createLink(
    'NutUI',
    'https://nutui.jd.com/',
    '京东出品的、支持多端的、轻量级移动端组件库',
    '技术框架',
    'https://favicon.im/nutui.jd.com?larger=true',
    '#ffffff',
    0.7
  ),

  // 图标壁纸
  createLink(
    'TinyPNG',
    'https://tinypng.com',
    '在线图片压缩工具',
    '图标壁纸',
    'https://tinypng.com/images/apple-touch-icon.png',
    '#ffffff',
    0.6
  ),
  createLink(
    'Iconify',
    'https://iconify.design/docs/',
    '统一调用多图标库的开发者工具。',
    '图标壁纸',
    'https://favicon.im/iconify.design?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Font Awesome',
    'https://fontawesome.com/icons',
    '互联网最受欢迎的图标库，超百万图标',
    '图标壁纸',
    'https://api.iconify.design/simple-icons:fontawesome.svg?color=%23ffffff',
    '#418fde',
    0.6
  ),
  createLink(
    'iconfont',
    'https://www.iconfont.cn/',
    '流行的矢量图标库',
    '图标壁纸',
    'https://favicon.im/www.iconfont.cn?larger=true',
    '#13c2c2',
    0.6
  ),
  createLink(
    'Lucide',
    'https://lucide.dev/icons/',
    '开源图标库，提供众多矢量（SVG）图片',
    '图标壁纸',
    'https://cdn.simpleicons.org/lucide/ffffff',
    '#f56565',
    0.6
  ),
  createLink(
    'Simeple Icons',
    'https://simpleicons.org/',
    '免费提供超 2500 个开源品牌图标的 SVG 库',
    '图标壁纸',
    'https://cdn.simpleicons.org/simpleicons/ffffff',
    '#111111',
    0.7
  ),
  createLink(
    'Remix Icon',
    'https://remixicon.com',
    '免费、开源的中性风格系统图标',
    '图标壁纸',
    'https://favicon.im/remixicon.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'macOS Icons',
    'https://macosicons.com/',
    '高质量 macOS 应用图标资源库，免费下载与商用授权',
    '图标壁纸',
    'https://favicon.im/macosicons.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'CSS.gg',
    'https://css.gg/',
    '700+ 纯 CSS 图标库，轻量、可定制，支持 SVG 与 React',
    '图标壁纸',
    'https://api.iconify.design/tabler:command.svg?color=%23ffffff',
    '#5f18dd',
    0.7
  ),
  createLink(
    'Unsplash',
    'https://unsplash.com/developers',
    '免费、高质图片的 API 接入服务平台',
    '图标壁纸',
    'https://favicon.im/unsplash.com?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    'Microsoft Design',
    'https://microsoft.design/wallpapers/',
    'Microsoft 官方设计壁纸库，融合 Fluent Design 与创意视觉',
    '图标壁纸',
    'https://api.iconify.design/mdi:microsoft.svg?color=%23000000',
    '#ffffff',
    0.7
  ),
  createLink(
    'Pexels',
    'https://www.pexels.com/zh-cn/',
    '免费高清图库，提供海量可商用图片与视频素材',
    '图标壁纸',
    'https://favicon.im/www.pexels.com?larger=true',
    '#191919',
    0.7
  ),

  // 工具软件
  createLink(
    'Shields.io',
    'https://shields.io/badges',
    '提供简洁、美观的开源项目徽章',
    '工具软件',
    'https://favicon.im/shields.io?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    'MacKed',
    'https://macked.app/',
    '专注 macOS 软件分享与下载的精品资源站',
    '工具软件',
    'https://favicon.im/macked.app?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'ProccessOn',
    'https://www.processon.com/',
    '一款优秀的国产在线协作画图软件',
    '工具软件',
    'https://favicon.im/www.processon.com?larger=true',
    '#1f7bef',
    0.7
  ),
  createLink(
    'Json 中文网',
    'https://www.json.cn',
    'JSON 在线解析及格式化验证',
    '工具软件',
    'https://api.iconify.design/tabler/json.svg?color=%23ffffff',
    '#0fd59d',
    0.7
  ),
  createLink(
    'Postman',
    'https://www.postman.com/',
    'API 开发协作平台',
    '工具软件',
    'https://cdn.simpleicons.org/postman/ffffff',
    '#ff6c37',
    0.6
  ),
  createLink(
    'Easy Mock',
    'https://mock.mengxuegu.com/docs',
    '基于 Easy Mock 的在线接口模拟平台，用于快速生成和调试 API',
    '工具软件',
    'https://favicon.im/mock.mengxuegu.com?larger=true',
    '#1f2d3d',
    0.7
  ),
  createLink(
    'AST Explorer',
    'https://astexplorer.net/',
    '探索由各种解析器生成的 AST 语法树',
    '工具软件',
    'https://favicon.im/astexplorer.net?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    'MacBL',
    'https://www.macbl.com/',
    '精选 Mac 应用推荐与下载平台，涵盖设计、开发与效率工具',
    '工具软件',
    'https://favicon.im/www.macbl.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'UU 在线工具',
    'https://uutool.cn/uuid/',
    '用来生成 uuid，还有其他更多免费实用工具',
    '工具软件',
    'https://favicon.im/uutool.cn?larger=true',
    '#1779ba',
    0.7
  ),
  createLink(
    '在线工具',
    'https://tool.lu/tool',
    '开发人员的工具箱',
    '工具软件',
    'https://favicon.im/tool.lu?larger=true',
    '#019a61',
    0.6
  ),
  createLink(
    'Apifox',
    'https://www.apifox.cn/',
    'API 文档、调试、Mock、自动化测试',
    '工具软件',
    'https://api.iconify.design/simple-icons/apifox.svg?color=%23ffffff',
    '#fe4b6e',
    0.6
  ),
  createLink(
    'Figma',
    'https://www.figma.com/',
    '最专业的协作式界面设计工具，支持实时协同、原型交互与设计系统管理',
    '工具软件',
    'https://favicon.im/www.figma.com?larger=true',
    '#2b2c34',
    0.7
  ),
  createLink(
    'Emojiall',
    'https://www.emojiall.com/zh-hans',
    'Emoji表情大全',
    '工具软件',
    'https://favicon.im/www.emojiall.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'unDraw',
    'https://undraw.co/illustrations',
    '开源插图，支持多色彩的 svg 图像',
    '工具软件',
    'https://favicon.im/undraw.co?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'transform',
    'https://transform.tools/json-to-typescript',
    'JSON to TS，还支持其他各类数据格式与对象转换',
    '工具软件',
    'https://favicon.im/transform.tools?larger=true',
    '#2091ff',
    0.7
  ),
  createLink(
    'Hoppscotch',
    'https://hoppscotch.io/',
    '开源 API 开发生态系统',
    '工具软件',
    'https://api.iconify.design/simple-icons/hoppscotch.svg?color=%23ffffff',
    '#10b981',
    0.7
  ),
  createLink(
    '在线抠图',
    'https://www.remove.bg/zh',
    'AI 驱动的在线抠图工具，一键自动去除图片背景，支持人像、产品、汽车等多场景',
    '工具软件',
    'https://favicon.im/www.remove.bg?larger=true',
    '#fec83d',
    0.7
  ),
  createLink(
    'MockUPhone',
    'https://mockuphone.com/',
    '免费在线的带壳截图网站，一键将设计稿嵌入 iPhone、三星等设备截图',
    '工具软件',
    'https://favicon.im/mockuphone.com?larger=true',
    '#000000',
    0.7
  ),
  createLink(
    'Gradients.app',
    'https://gradients.app/zh/gradient',
    '下载漂亮的CSS和PNG渐变色',
    '工具软件',
    'https://favicon.im/gradients.app?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Favicon.im',
    'https://favicon.im/zh/',
    '即时获取和下载任何网站的图标',
    '工具软件',
    'https://favicon.im/favicon.im?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'Can I use',
    'https://caniuse.com',
    '前端 API 兼容性查询',
    '工具软件',
    'https://favicon.im/caniuse.com?larger=true',
    '#f1e7d3',
    0.7
  ),
  createLink(
    '在线工具网',
    'https://yours.tools/zh/',
    '一站式在线工具集合，200+实用功能',
    '工具软件',
    'https://api.iconify.design/dashicons:admin-tools.svg?color=%23ffffff',
    '#019a61',
    0.7
  ),
  createLink(
    '100font',
    'https://www.100font.com/',
    '免费商用中英文字体下载站，聚合开源与可商用字体资源',
    '工具软件',
    'https://favicon.im/www.100font.com?larger=true',
    '#f7c600',
    0.7
  ),
  createLink(
    'shots',
    'https://shots.so/',
    '丰富的带壳截图网站',
    '工具软件',
    'https://favicon.im/shots.so?larger=true',
    '#0a0a0a',
    0.9
  ),
  createLink(
    '站酷',
    'https://www.zcool.com.cn/',
    '设计师互动平台，提供作品展示、素材下载与设计资讯',
    '工具软件',
    'https://api.iconify.design/ri:zcool-fill.svg?color=%23000000',
    '#fdf200',
    0.7
  ),
  createLink(
    'Appstorrent',
    'https://appstorrent.ru/',
    'Mac 软件资源站，提供破解应用与工具下载',
    '工具软件',
    'https://favicon.im/appstorrent.ru?larger=true',
    '#1e1e1e',
    0.9
  ),

  // 社区论坛
  createLink(
    '博客园',
    'https://www.cnblogs.com',
    '开发者的网上家园',
    '社区论坛',
    'https://favicon.im/www.cnblogs.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '简书',
    'https://www.jianshu.com/',
    '中文创作社区，支持写作、阅读与知识分享',
    '社区论坛',
    'https://favicon.im/www.jianshu.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '远景论坛',
    'https://www.pcbeta.com/',
    '极客社区，专注于 Windows 与 macOS 系统技术',
    '社区论坛',
    'https://favicon.im/www.pcbeta.com?larger=true',
    '#1a85db',
    0.7
  ),
  createLink(
    '知乎',
    'https://zhihu.com',
    '中文互联网高质量的问答社区',
    '社区论坛',
    'https://api.iconify.design/ri:zhihu-line.svg?color=%23ffffff',
    '#2272f6',
    0.7
  ),
  createLink(
    'SegmentFault',
    'https://segmentfault.com',
    '技术问答开发者社区',
    '社区论坛',
    'https://favicon.im/segmentfault.com?larger=true',
    '#019a61',
    0.7
  ),
  createLink(
    '今日头条',
    'https://www.toutiao.com',
    '智能推荐资讯平台，聚合新闻、视频与热点内容',
    '社区论坛',
    'https://api.iconify.design/icon-park-outline:jinritoutiao.svg?color=%23ffffff',
    '#ff4d4f',
    0.7
  ),
  createLink(
    'CSDN',
    'https://www.csdn.net/',
    '专业中文开发者社区，提供技术博客、资源下载',
    '社区论坛',
    'https://api.iconify.design/simple-icons:csdn.svg',
    '#ffffff',
    0.7
  ),
  createLink(
    'V2EX',
    'https://www.v2ex.com',
    '创意工作者们的社区',
    '社区论坛',
    'https://favicon.im/www.v2ex.com?larger=true',
    '#ffffff',
    0.6
  ),
  createLink(
    '百度贴吧',
    'https://tieba.baidu.com/',
    '兴趣主题社区，用户围绕话题发帖、互动与分享',
    '社区论坛',
    'https://api.iconify.design/arcticons:baidu-tieba.svg?color=%23ffffff',
    '#4070ff',
    0.7
  ),
  createLink(
    '稀土掘金',
    'https://juejin.cn',
    '技术创作者社区，聚焦前端、后端、AI 与开发工具',
    '社区论坛',
    'https://api.iconify.design/simple-icons:juejin.svg?color=%23ffffff',
    '#007fff',
    0.7
  ),
  createLink(
    'BOSS直聘',
    'https://www.zhipin.com',
    '互联网招聘平台，支持直聊、职位推荐与企业认证',
    '社区论坛',
    'https://api.iconify.design/arcticons:boss-zhipin.svg?color=%23ffffff',
    '#51c5be',
    0.8
  ),
  createLink(
    '虎扑社区',
    'https://bbs.hupu.com/',
    '综合体育与生活讨论平台，聚焦篮球、足球与步行街话题',
    '社区论坛',
    'https://favicon.im/bbs.hupu.com?larger=true',
    '#c60200',
    0.7
  ),

  // 影音视听
  createLink(
    '优酷视频',
    'https://www.youku.com/',
    '中国领先视频平台，提供剧集、电影、综艺与会员服务',
    '影音视听',
    'https://favicon.im/www.youku.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    'QQ音乐',
    'https://y.qq.com/',
    '海量正版曲库，支持听歌、下载与个性化推荐',
    '影音视听',
    'https://favicon.im/y.qq.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '哔哩哔哩',
    'https://www.bilibili.com',
    '国内知名的视频弹幕网站',
    '影音视听',
    'https://api.iconify.design/ant-design:bilibili-filled.svg?color=%23ffffff',
    '#13aeec',
    0.7
  ),
  createLink(
    '爱奇艺',
    'https://www.iqiyi.com',
    '大型视频网站，专业的网络视频播放平台',
    '影音视听',
    'https://favicon.im/www.iqiyi.com?larger=true',
    '#09c07d',
    0.7
  ),
  createLink(
    'youtube',
    'https://www.youtube.com',
    '全球最大的在线视频分享平台',
    '影音视听',
    'https://cdn.simpleicons.org/youtube/ffffff',
    '#ff0000',
    0.6
  ),
  createLink(
    'Netflix',
    'https://www.netflix.com/',
    '全球流媒体平台，提供原创剧集、电影与多语言字幕',
    '影音视听',
    'https://favicon.im/www.netflix.com?larger=true',
    '#000000',
    0.7
  ),
  createLink(
    '腾讯视频',
    'https://v.qq.com/',
    '海量正版影视内容平台，支持高清播放与会员服务',
    '影音视听',
    'https://favicon.im/v.qq.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '芒果 TV',
    'https://www.mgtv.com/',
    '湖南广电旗下视频平台，主打综艺、剧集与青春内容',
    '影音视听',
    'https://favicon.im/www.mgtv.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '直播吧',
    'https://www.zhibo8.cc',
    '知名体育平台',
    '影音视听',
    'https://favicon.im/www.zhibo8.cc?larger=true',
    '#2e9fff',
    0.7
  ),
  createLink(
    '虎牙直播',
    'https://www.huya.com',
    '以游戏直播为主的弹幕式互动直播平台',
    '影音视听',
    'https://api.iconify.design/arcticons:huya-live.svg?color=%23ffffff',
    '#ff9601',
    0.7
  ),
  createLink(
    '咪咕音乐',
    'https://music.migu.cn/',
    '正版高品质音乐平台，支持在线听歌与数字专辑',
    '影音视听',
    'https://favicon.im/music.migu.cn?larger=true',
    '#de0372',
    0.7
  ),
  createLink(
    'DopuBox',
    'https://www.dopubox.com/zh/douyin',
    '免费在线工具箱，支持 TikTok 下载、编码转换与图片处理',
    '影音视听',
    'https://favicon.im/www.dopubox.com?larger=true',
    '#000000',
    0.7
  ),
  createLink(
    '央视网',
    'https://tv.cctv.com/',
    '中央广播电视总台官方视频平台，提供直播与点播服务',
    '影音视听',
    'https://favicon.im/tv.cctv.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '咪咕视频',
    'https://www.miguvideo.com/p/channel/',
    '咪咕视频',
    '影音视听',
    'https://favicon.im/www.miguvideo.com?larger=true',
    '#ffffff',
    0.7
  ),
  createLink(
    '豆瓣电影',
    'https://movie.douban.com/',
    '权威电影数据库，提供评分、影评与影院购票服务',
    '影音视听',
    'https://favicon.im/movie.douban.com?larger=true',
    '#ffffff',
    0.7
  ),
].map((link, index) => ({ ...link, order: index }));

/**
 * 分类图标映射
 * 为每个分类名称指定对应的图标
 */
const categoryIconMap: Record<string, string> = {
  主页: 'HomeOutlined',
  开发常用: 'UserOutlined',
  技术框架: 'CodeOutlined',
  图标壁纸: 'PictureOutlined',
  工具软件: 'ToolOutlined',
  社区论坛: 'TeamOutlined',
  影音视听: 'VideoCameraOutlined',
};

/**
 * 默认分类数据
 * 从链接数据中提取唯一分类并生成分类对象
 */
export const defaultCategories: Category[] = (() => {
  // 从链接中提取唯一的分类名称（过滤掉空值）
  const uniqueCategories = Array.from(
    new Set(
      defaultLinks
        .map(link => link.category)
        .filter((category): category is string => Boolean(category))
    )
  );

  // 生成分类对象
  return uniqueCategories.map((categoryName, index) => ({
    id: categoryName.toLowerCase().replace(/\s+/g, '-'),
    name: categoryName,
    icon: categoryIconMap[categoryName] || 'AppstoreOutlined',
    order: index,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }));
})();

/**
 * 获取默认分类名称
 * 返回第一个分类的名称，如果没有分类则返回空字符串
 */
export const getDefaultCategoryName = (): string => {
  return defaultCategories.length > 0 ? defaultCategories[0].name : '';
};
