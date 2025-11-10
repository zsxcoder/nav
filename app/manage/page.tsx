'use client';

import React, { useState } from 'react';
import { Button, Space, Typography, message } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addLink, updateLink, deleteLink, reorderLinks } from '@/store/slices/linksSlice';
import { DataTable } from '@/components/management/DataTable';
import { EditLinkModal } from '@/components/modals/EditLinkModal';
import { ImportExport } from '@/components/management/ImportExport';
import { Link } from '@/types/link';

const { Title } = Typography;

/**
 * 数据管理页面
 * 提供链接的可视化管理界面，支持拖拽排序、批量操作
 */
export default function ManagePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.links.items);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<Link | null>(null);

  // 处理编辑链接
  const handleEdit = (link: Link) => {
    setCurrentLink(link);
    setEditModalOpen(true);
  };

  // 处理删除链接
  const handleDelete = (id: string) => {
    dispatch(deleteLink(id));
    message.success('删除成功');
  };

  // 处理批量删除
  const handleBatchDelete = (ids: string[]) => {
    ids.forEach((id) => {
      dispatch(deleteLink(id));
    });
    message.success(`成功删除 ${ids.length} 个链接`);
  };

  // 处理拖拽排序
  const handleReorder = (fromIndex: number, toIndex: number) => {
    dispatch(reorderLinks({ fromIndex, toIndex }));
  };

  // 处理添加新链接
  const handleAddNew = () => {
    setCurrentLink(null);
    setEditModalOpen(true);
  };

  // 处理编辑弹窗提交
  const handleModalSubmit = (linkData: Partial<Link>) => {
    if (linkData.id) {
      // 更新现有链接
      dispatch(updateLink(linkData as any));
      message.success('更新成功');
    } else {
      // 添加新链接
      dispatch(addLink(linkData as any));
      message.success('添加成功');
    }
    setEditModalOpen(false);
    setCurrentLink(null);
  };

  // 处理编辑弹窗取消
  const handleModalCancel = () => {
    setEditModalOpen(false);
    setCurrentLink(null);
  };

  // 返回主页
  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页头 */}
        <div className="mb-6">
          <Space direction="vertical" size="small" className="w-full">
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              type="text"
            >
              返回主页
            </Button>
            <div className="flex justify-between items-center">
              <Title level={2} className="mb-0!">
                数据管理
              </Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddNew}
              >
                添加链接
              </Button>
            </div>
          </Space>
        </div>

        {/* 导入导出工具栏 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
          <ImportExport />
        </div>

        {/* 数据表格 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <DataTable
            links={links}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBatchDelete={handleBatchDelete}
            onReorder={handleReorder}
          />
        </div>

        {/* 编辑弹窗 */}
        <EditLinkModal
          open={editModalOpen}
          link={currentLink}
          onCancel={handleModalCancel}
          onSubmit={handleModalSubmit}
        />
      </div>
    </div>
  );
}
