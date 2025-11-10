'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import * as AntdIcons from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentCategory } from '@/store/slices/settingsSlice';
import { Category } from '@/types/link';

/**
 * 分类配置
 * 定义每个分类的图标和显示名称
 */
const CATEGORIES: Array<{ key: Category; label: string; icon: React.ReactNode }> = [
  { key: '主页', label: '主页', icon: <AntdIcons.HomeOutlined /> },
  { key: '工作', label: '工作', icon: <AntdIcons.LaptopOutlined /> },
  { key: '娱乐', label: '娱乐', icon: <AntdIcons.PlayCircleOutlined /> },
  { key: '学习', label: '学习', icon: <AntdIcons.ReadOutlined /> },
  { key: '工具', label: '工具', icon: <AntdIcons.ToolOutlined /> },
  { key: '其他', label: '其他', icon: <AntdIcons.AppstoreOutlined /> },
];

interface CategorySidebarProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CategorySidebar 组件
 * 左侧分类导航组件，显示分类列表并支持切换
 */
export const CategorySidebar: React.FC<CategorySidebarProps> = ({ className, style }) => {
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector((state) => state.settings.currentCategory || '主页');

  // 处理分类切换
  const handleCategoryChange: MenuProps['onClick'] = (e) => {
    dispatch(setCurrentCategory(e.key));
  };

  // 构建菜单项
  const menuItems: MenuProps['items'] = CATEGORIES.map((category) => ({
    key: category.key,
    icon: category.icon,
    label: category.label,
  }));

  return (
    <div className={className} style={style}>
      <Menu
        mode="inline"
        selectedKeys={[currentCategory]}
        onClick={handleCategoryChange}
        items={menuItems}
        style={{ 
          height: '100%',
          borderRight: 0,
        }}
      />
    </div>
  );
};

export default CategorySidebar;
