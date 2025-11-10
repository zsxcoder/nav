'use client';

import { useEffect, useState } from 'react';
import { FloatButton, message, Drawer } from 'antd';
import { PlusOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addLink, updateLink, deleteLink, loadLinks } from '@/store/slices/linksSlice';
import { storageService } from '@/services/storage';
import { defaultLinks } from '@/services/defaultData';
import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/navigation/CategorySidebar';
import LinkGrid from '@/components/navigation/LinkGrid';
import EditLinkModal from '@/components/modals/EditLinkModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { Link } from '@/types/link';

/**
 * 主页组件
 * 实现左右布局：左侧分类导航，右侧内容区域（Header + LinkGrid）
 * 支持添加、编辑、删除链接
 * 响应式布局：移动端使用抽屉式侧边栏
 */
export default function Home() {
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.links.items);
  
  // 编辑弹窗状态
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  
  // 删除确认弹窗状态
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingLinkId, setDeletingLinkId] = useState<string | null>(null);
  
  // 移动端侧边栏抽屉状态
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // 页面加载时从 Redux store 加载链接数据
  useEffect(() => {
    // 如果 store 中没有数据，尝试从 LocalStorage 加载
    if (links.length === 0) {
      const savedLinks = storageService.loadLinks();
      if (savedLinks && savedLinks.length > 0) {
        dispatch(loadLinks(savedLinks));
      } else {
        // 如果 LocalStorage 也没有数据，加载默认数据
        dispatch(loadLinks(defaultLinks));
      }
    }
  }, [dispatch, links.length]);

  // 处理添加链接按钮点击
  const handleAddClick = () => {
    setEditingLink(null);
    setEditModalOpen(true);
  };

  // 处理编辑链接
  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setEditModalOpen(true);
  };

  // 处理删除链接
  const handleDelete = (id: string) => {
    setDeletingLinkId(id);
    setDeleteModalOpen(true);
  };

  // 处理编辑弹窗提交
  const handleEditSubmit = (linkData: Partial<Link>) => {
    try {
      if (editingLink) {
        // 更新现有链接
        dispatch(updateLink({
          ...linkData,
          id: editingLink.id,
        }));
        message.success('链接更新成功');
      } else {
        // 添加新链接
        dispatch(addLink(linkData as any));
        message.success('链接添加成功');
      }
      setEditModalOpen(false);
      setEditingLink(null);
    } catch (error) {
      console.error('保存链接失败:', error);
      message.error('保存链接失败，请重试');
    }
  };

  // 处理编辑弹窗取消
  const handleEditCancel = () => {
    setEditModalOpen(false);
    setEditingLink(null);
  };

  // 处理删除确认
  const handleDeleteConfirm = () => {
    if (deletingLinkId) {
      try {
        dispatch(deleteLink(deletingLinkId));
        message.success('链接删除成功');
        setDeleteModalOpen(false);
        setDeletingLinkId(null);
      } catch (error) {
        console.error('删除链接失败:', error);
        message.error('删除链接失败，请重试');
      }
    }
  };

  // 处理删除取消
  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDeletingLinkId(null);
  };

  // 获取要删除的链接名称
  const deletingLinkName = deletingLinkId
    ? links.find(link => link.id === deletingLinkId)?.name
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-theme">
      {/* 页头组件 */}
      <Header />
      
      {/* 主内容区域 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧分类导航 - Desktop */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-theme">
          <CategorySidebar />
        </aside>

        {/* 右侧内容区域 */}
        <main className="flex-1 overflow-y-auto">
          <LinkGrid
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {/* 移动端侧边栏抽屉 */}
      <Drawer
        title="分类"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        className="lg:hidden"
      >
        <CategorySidebar />
      </Drawer>

      {/* 浮动按钮组 */}
      <FloatButton.Group
        shape="circle"
        style={{ right: 24, bottom: 24 }}
      >
        {/* 移动端菜单按钮 */}
        <FloatButton
          icon={<MenuOutlined />}
          tooltip="分类菜单"
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden"
        />
        
        {/* 添加链接按钮 */}
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          tooltip="添加链接"
          onClick={handleAddClick}
        />
      </FloatButton.Group>

      {/* 编辑链接弹窗 */}
      <EditLinkModal
        open={editModalOpen}
        link={editingLink}
        onCancel={handleEditCancel}
        onSubmit={handleEditSubmit}
      />

      {/* 删除确认弹窗 */}
      <ConfirmModal
        open={deleteModalOpen}
        title="确认删除"
        content={`确定要删除链接 "${deletingLinkName}" 吗？此操作无法撤销。`}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="删除"
        cancelText="取消"
        okType="danger"
      />
    </div>
  );
}
