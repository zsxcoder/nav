# 图标加载失败处理测试指南

## 测试目的

验证链接卡片的图标加载失败时，能够正确显示默认图标而不是破损的图片。

## 修复说明

### 问题描述
之前的实现使用 `display: 'none'` 来隐藏加载失败的图片，但浏览器可能仍会短暂显示破损的图片图标。

### 解决方案
改用条件渲染（conditional rendering），根据加载状态完全不渲染失败的 `<img>` 元素，而是直接渲染下一级回退选项。

### 代码变更
- 移除了 `imageLoaded` 和 `faviconLoaded` 状态
- 移除了 `display: 'none'` 样式
- 使用条件渲染：只在对应状态下渲染对应的元素
- 简化了逻辑，提高了性能

## 测试步骤

### 1. 测试自定义图标加载失败

**操作：**
1. 打开浏览器开发者工具（F12）
2. 切换到 Network 标签
3. 在 Network 标签中启用 "Offline" 模式或使用 "Block request URL" 功能
4. 添加一个新链接，使用一个无效的图标 URL（例如：`https://invalid-domain-12345.com/icon.png`）
5. 观察卡片显示

**预期结果：**
- 不应该看到破损的图片图标
- 应该自动尝试加载该网站的 favicon
- 如果 favicon 也失败，应该显示默认的链接图标（LinkOutlined）
- 控制台应该有警告信息：`图标加载失败: https://invalid-domain-12345.com/icon.png`

### 2. 测试 Favicon 回退

**操作：**
1. 添加一个链接，不设置自定义图标
2. 确保该链接的域名有效（例如：`https://github.com`）
3. 观察卡片显示

**预期结果：**
- 应该自动加载 GitHub 的 favicon
- 图标应该清晰显示，没有破损图标

### 3. 测试完全失败的情况

**操作：**
1. 添加一个链接，使用无效的自定义图标 URL
2. 确保该链接的域名也无效或无法访问（例如：`https://invalid-domain-12345.com`）
3. 观察卡片显示

**预期结果：**
- 不应该看到任何破损的图片图标
- 应该直接显示默认的 LinkOutlined 图标
- 控制台应该有两条警告信息：
  - `图标加载失败: [自定义图标URL]`
  - `Favicon 加载失败: [favicon URL]`

### 4. 测试图标大小一致性

**操作：**
1. 创建多个链接：
   - 一个使用有效的自定义图标
   - 一个使用 favicon
   - 一个使用默认图标
2. 观察所有卡片的图标大小

**预期结果：**
- 所有图标的大小应该保持一致
- 默认图标的大小应该与自定义图标相同（受 `iconScale` 属性控制）

## 验证清单

- [ ] 自定义图标加载失败时不显示破损图标
- [ ] 自动回退到 favicon
- [ ] Favicon 失败时自动回退到默认图标
- [ ] 默认图标大小与自定义图标一致
- [ ] 控制台正确记录警告信息
- [ ] 没有闪烁或视觉跳动
- [ ] 图标过渡平滑自然

## 相关文件

- `components/navigation/LinkCard.tsx` - 主要修复文件
- `.kiro/specs/frontend-navigation-site/requirements.md` - 需求 11
- `.kiro/specs/frontend-navigation-site/design.md` - LinkCard 组件设计

## 技术细节

### IconWithFallback 组件状态管理

```typescript
const [hasError, setHasError] = useState(false);      // 自定义图标是否失败
const [faviconError, setFaviconError] = useState(false); // Favicon 是否失败
```

### 渲染逻辑

1. **初始状态**：渲染自定义图标
2. **自定义图标失败**：`hasError = true`，渲染 favicon
3. **Favicon 失败**：`faviconError = true`，渲染默认图标
4. **无 fallbackUrl**：直接从自定义图标失败跳到默认图标

### 性能优化

- 移除了不必要的状态变量
- 减少了 DOM 元素数量（不再同时渲染多个隐藏的 img 元素）
- 简化了条件判断逻辑
