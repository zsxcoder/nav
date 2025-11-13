import { Link } from '@/types/link';
import { Settings } from '@/types/settings';
import { SearchEngine } from '@/types/search';

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
  backgroundColor?: string,
  tags?: string[]
): Link {
  const now = Date.now();
  return {
    id: generateId(),
    name,
    url,
    description,
    category,
    backgroundColor,
    tags,
    order: 0, // 将在后面统一设置
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * 默认导航链接数据
 * 包含常用的前端开发资源，按分类组织
 */
export const defaultLinks: Link[] = [
  // 主页 - 常用资源
  createLink(
    'GitHub',
    'https://github.com',
    '全球最大的代码托管平台',
    '主页',
    '#cbcbcb',
    ['代码', '开源', 'Git']
  ),
  createLink(
    'Stack Overflow',
    'https://stackoverflow.com',
    '程序员问答社区',
    '主页',
    '#f9d8bd',
    ['问答', '社区', '编程']
  ),
  createLink(
    'MDN Web Docs',
    'https://developer.mozilla.org',
    'Web 开发权威文档',
    '主页',
    '#15131B',
    ['文档', 'Web', 'API']
  ),
  createLink(
    'npm',
    'https://www.npmjs.com',
    'Node.js 包管理器',
    '主页',
    '#CB0200',
    ['包管理', 'Node.js', 'JavaScript']
  ),

  // 工作 - 开发工具
  createLink(
    'VS Code',
    'https://code.visualstudio.com',
    '微软开源代码编辑器',
    '工作',
    '#007acc',
    ['编辑器', 'IDE', '开发工具']
  ),
  createLink(
    'Figma',
    'https://www.figma.com',
    '协作式界面设计工具',
    '工作',
    '#2C2D35',
    ['设计', 'UI', '原型']
  ),
  createLink(
    'Vercel',
    'https://vercel.com',
    'Next.js 官方部署平台',
    '工作',
    '#000000',
    ['部署', 'Hosting', 'Next.js']
  ),
  createLink(
    'Netlify',
    'https://www.netlify.com',
    '现代 Web 项目部署平台',
    '工作',
    '#00c7b7',
    ['部署', 'Hosting', 'JAMstack']
  ),

  // 学习 - 教程和文档
  createLink(
    'React 官方文档',
    'https://react.dev',
    'React 最新官方文档',
    '学习',
    '#61dafb',
    ['React', '文档', '前端']
  ),
  createLink(
    'Next.js 文档',
    'https://nextjs.org/docs',
    'Next.js 官方文档',
    '学习',
    '#000000',
    ['Next.js', '文档', 'React']
  ),
  createLink(
    'TypeScript 文档',
    'https://www.typescriptlang.org/docs',
    'TypeScript 官方文档',
    '学习',
    '#3178c6',
    ['TypeScript', '文档', '类型']
  ),
  createLink(
    'Tailwind CSS',
    'https://tailwindcss.com',
    '实用优先的 CSS 框架',
    '学习',
    '#35BEF9',
    ['CSS', '框架', '样式']
  ),

  // 工具 - 在线工具
  createLink(
    'Can I Use',
    'https://caniuse.com',
    '浏览器兼容性查询',
    '工具',
    '#F2E8D4',
    ['兼容性', '浏览器', 'CSS']
  ),
  createLink(
    'RegExr',
    'https://regexr.com',
    '正则表达式测试工具',
    '工具',
    '#5e97d0',
    ['正则', '测试', '工具']
  ),
  createLink(
    'JSON Formatter',
    'https://jsonformatter.org',
    'JSON 格式化和验证',
    '工具',
    '#f5f5f5',
    ['JSON', '格式化', '工具']
  ),
  createLink(
    'CodePen',
    'https://codepen.io',
    '前端代码在线编辑器',
    '工具',
    '#f5f5f5',
    ['编辑器', '在线', '前端']
  ),

  // 娱乐 - 设计灵感
  createLink(
    'Dribbble',
    'https://dribbble.com',
    '设计师作品分享社区',
    '娱乐',
    '#FFABE7',
    ['设计', '灵感', 'UI']
  ),
  createLink(
    'Behance',
    'https://www.behance.net',
    'Adobe 创意作品平台',
    '娱乐',
    '#2756FF',
    ['设计', '作品', '创意']
  ),
  createLink(
    'Awwwards',
    'https://www.awwwards.com',
    '优秀网站设计奖项',
    '娱乐',
    '#000000',
    ['设计', '网站', '灵感']
  ),
  createLink(
    'CSS-Tricks',
    'https://css-tricks.com',
    'CSS 技巧和教程',
    '娱乐',
    '#d33a2c',
    ['CSS', '教程', '技巧']
  ),
].map((link, index) => ({
  ...link,
  order: index,
}));

/**
 * 默认用户设置
 */
export const defaultSettings: Settings = {
  theme: 'system',
  searchEngine: 'google',
  layout: 'grid',
  currentCategory: '主页',
  showDescription: true,
  gridColumns: 6,
};

/**
 * 预设搜索引擎列表
 */
export const searchEngines: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    icon: 'GoogleOutlined',
    searchUrl: 'https://www.google.com/search?q={query}',
  },
  {
    id: 'bing',
    name: 'Bing',
    icon: 'SearchOutlined',
    searchUrl: 'https://www.bing.com/search?q={query}',
  },
  {
    id: 'yahoo',
    name: 'Yahoo',
    icon: 'YahooOutlined',
    searchUrl: 'https://search.yahoo.com/search?p={query}',
  },
  {
    id: 'baidu',
    name: 'Baidu',
    icon: 'SearchOutlined',
    searchUrl: 'https://www.baidu.com/s?wd={query}',
  },
  {
    id: 'yandex',
    name: 'Yandex',
    icon: 'SearchOutlined',
    searchUrl: 'https://yandex.com/search/?text={query}',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    icon: 'SearchOutlined',
    searchUrl: 'https://duckduckgo.com/?q={query}',
  },
];

/**
 * 获取搜索引擎的搜索 URL
 * @param engineId 搜索引擎 ID
 * @param query 搜索关键词
 * @returns 完整的搜索 URL
 */
export function getSearchUrl(engineId: string, query: string): string {
  const engine = searchEngines.find(e => e.id === engineId);
  if (!engine) {
    // 默认使用 Google
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
  return engine.searchUrl.replace('{query}', encodeURIComponent(query));
}

/**
 * 获取搜索引擎配置
 * @param engineId 搜索引擎 ID
 * @returns 搜索引擎配置，如果不存在则返回 Google
 */
export function getSearchEngine(engineId: string): SearchEngine {
  return searchEngines.find(e => e.id === engineId) || searchEngines[0];
}

/**
 * 按分类获取链接
 * @param links 链接数组
 * @param category 分类名称
 * @returns 过滤后的链接数组
 */
export function getLinksByCategory(links: Link[], category: string): Link[] {
  if (!category || category === '全部') {
    return links;
  }
  return links.filter(link => link.category === category);
}

/**
 * 获取所有分类列表
 * @param links 链接数组
 * @returns 分类数组
 */
export function getCategories(links: Link[]): string[] {
  const categories = new Set<string>();
  links.forEach(link => {
    if (link.category) {
      categories.add(link.category);
    }
  });
  return Array.from(categories).sort();
}
