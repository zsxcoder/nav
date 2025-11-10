'use client';

import React, { useState, useEffect } from 'react';
import { Input, Dropdown, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import {
  SearchOutlined,
  GoogleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { performDebouncedSearch, clearSearch } from '@/store/slices/searchSlice';
import { setSearchEngine } from '@/store/slices/settingsSlice';
import { SEARCH_ENGINES, getSearchUrl, getSearchEngine } from '@/services/search';
import { storageService } from '@/services/storage';

/**
 * SearchBar 组件
 * 实现搜索栏功能，包括：
 * - 站内实时搜索（防抖）
 * - 搜索引擎切换
 * - 回车键打开外部搜索引擎
 * - 清除搜索
 */
export default function SearchBar() {
  const dispatch = useAppDispatch();
  
  // 从 Redux 获取状态
  const searchQuery = useAppSelector((state) => state.search.query);
  const currentEngineId = useAppSelector((state) => state.settings.searchEngine);
  const settings = useAppSelector((state) => state.settings);
  
  // 本地状态
  const [inputValue, setInputValue] = useState(searchQuery);
  
  // 获取当前搜索引擎配置
  const currentEngine = getSearchEngine(currentEngineId);
  
  // 同步 Redux 状态到本地输入框
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // 使用 useCallback 缓存事件处理函数
  
  /**
   * 处理输入变化
   * 触发防抖搜索
   */
  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // 触发防抖搜索
    dispatch(performDebouncedSearch(value));
  }, [dispatch]);

  /**
   * 处理回车键
   * 在新标签页打开外部搜索引擎
   */
  const handleSearch = React.useCallback((value: string) => {
    const trimmedValue = value.trim();
    
    if (trimmedValue) {
      // 打开外部搜索引擎
      const searchUrl = getSearchUrl(currentEngineId, trimmedValue);
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
    }
  }, [currentEngineId]);

  /**
   * 清除搜索
   */
  const handleClear = React.useCallback(() => {
    setInputValue('');
    dispatch(clearSearch());
  }, [dispatch]);

  /**
   * 处理搜索引擎切换
   */
  const handleEngineChange = React.useCallback((engineId: string) => {
    dispatch(setSearchEngine(engineId));
    
    // 保存到 LocalStorage
    const updatedSettings = {
      ...settings,
      searchEngine: engineId,
    };
    storageService.saveSettings(updatedSettings);
  }, [dispatch, settings]);

  /**
   * 构建搜索引擎下拉菜单 - 使用 useMemo 缓存
   */
  const menuItems: MenuProps['items'] = React.useMemo(() => SEARCH_ENGINES.map((engine) => ({
    key: engine.id,
    label: (
      <Space>
        {getEngineIcon(engine.icon)}
        <span>{engine.name}</span>
      </Space>
    ),
    onClick: () => handleEngineChange(engine.id),
  })), [handleEngineChange]);

  /**
   * 获取搜索引擎图标组件
   */
  function getEngineIcon(iconName: string) {
    switch (iconName) {
      case 'GoogleOutlined':
        return <GoogleOutlined />;
      case 'YahooOutlined':
        return <SearchOutlined />; // Yahoo 图标使用通用搜索图标
      default:
        return <SearchOutlined />;
    }
  }

  /**
   * 处理键盘事件 - 使用 useCallback 缓存
   */
  const handleKeyPress = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(inputValue);
    }
  }, [handleSearch, inputValue]);

  return (
    <div className="w-full max-w-2xl" role="search" aria-label="搜索导航">
      <Space.Compact size="large" className="w-full">
        {/* 搜索引擎切换按钮 */}
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomLeft">
          <Button
            icon={getEngineIcon(currentEngine.icon)}
            aria-label={`当前搜索引擎：${currentEngine.name}，点击切换搜索引擎`}
            aria-haspopup="menu"
            aria-expanded={false}
            className="flex items-center justify-center"
            title={`当前搜索引擎：${currentEngine.name}`}
          />
        </Dropdown>

        {/* 搜索输入框 */}
        <Input
          placeholder={`使用 ${currentEngine.name} 搜索或在站内查找...`}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          allowClear
          prefix={<SearchOutlined className="text-gray-400" aria-hidden="true" />}
          className="search-bar flex-1"
          aria-label="搜索输入框"
          role="searchbox"
          aria-describedby="search-description"
        />

        {/* 搜索按钮 */}
        <Button
          type="primary"
          icon={<SearchOutlined aria-hidden="true" />}
          onClick={() => handleSearch(inputValue)}
          aria-label={`使用 ${currentEngine.name} 搜索`}
          title={`使用 ${currentEngine.name} 搜索`}
        />
      </Space.Compact>
      <span id="search-description" className="sr-only">
        输入关键词进行站内搜索，或按回车键使用外部搜索引擎搜索
      </span>
    </div>
  );
}
