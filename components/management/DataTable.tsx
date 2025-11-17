'use client';

import React, { useState, createContext, useContext, useMemo, useEffect } from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, DragOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Link } from '@/types/link';
import { useAppSelector } from '@/store/hooks';
import { showSuccess } from '@/utils/feedback';

// 树节点类型
interface TreeNode {
  key: string;
  id: string;
  name: string;
  url?: string;
  description?: string;
  category?: string;
  backgroundColor?: string;
  icon?: string;
  iconScale?: number;
  order: number;
  createdAt: number;
  updatedAt: number;
  isCategory?: boolean;
  children?: TreeNode[];
}

// 创建 Context 用于传递拖拽句柄
const DragHandleContext = createContext<{
  listeners?: any;
  attributes?: any;
}>({});

interface DataTableProps {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onBatchDelete: (ids: string[]) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  selectedRowKeys?: React.Key[];
  onSelectionChange?: (selectedKeys: React.Key[]) => void;
}

/**
 * 可拖拽的表格行组件
 */
interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const DraggableRow: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 999 } : {}),
  };

  // 将拖拽监听器存储在 context 中，供子组件使用
  return (
    <DragHandleContext.Provider value={{ listeners, attributes }}>
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
      />
    </DragHandleContext.Provider>
  );
};

/**
 * 数据表格组件
 * 支持拖拽排序、行内编辑、批量删除
 * 使用树表格展示分类和链接的层级关系
 */
export const DataTable: React.FC<DataTableProps> = ({
  links,
  onEdit,
  onDelete,
  onBatchDelete,
  onReorder,
  selectedRowKeys: externalSelectedRowKeys,
  onSelectionChange,
}) => {
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<React.Key[]>([]);
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  // 获取分类数据
  const categories = useAppSelector((state) => state.categories.items);

  // 使用外部传入的 selectedRowKeys 或内部状态
  const selectedRowKeys = externalSelectedRowKeys !== undefined ? externalSelectedRowKeys : internalSelectedRowKeys;

  // 构建树形数据结构
  const treeData = useMemo(() => {
    const tree: TreeNode[] = [];

    // 按分类组织链接
    categories.forEach(category => {
      const categoryLinks = links
        .filter(link => link.category === category.name)
        .sort((a, b) => a.order - b.order)
        .map(link => ({
          key: link.id,
          id: link.id,
          name: link.name,
          url: link.url,
          description: link.description,
          category: link.category,
          backgroundColor: link.backgroundColor,
          icon: link.icon,
          iconScale: link.iconScale,
          order: link.order,
          createdAt: link.createdAt,
          updatedAt: link.updatedAt,
          isCategory: false,
        }));

      tree.push({
        key: `category-${category.id}`,
        id: category.id,
        name: category.name,
        icon: category.icon,
        order: category.order,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        isCategory: true,
        children: categoryLinks,
      });
    });

    return tree.sort((a, b) => a.order - b.order);
  }, [links, categories]);

  // 默认展开所有分类
  useEffect(() => {
    const allCategoryKeys = categories.map(cat => `category-${cat.id}`);
    setExpandedRowKeys(allCategoryKeys);
  }, [categories]);

  // 配置拖拽传感器
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 处理拖拽结束
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(oldIndex, newIndex);
        showSuccess('排序已更新');
      }
    }
  };



  // 拖拽句柄组件
  const DragHandle = () => {
    const { listeners, attributes } = useContext(DragHandleContext);
    return (
      <div {...listeners} {...attributes} style={{ cursor: 'move', display: 'inline-block' }}>
        <DragOutlined style={{ color: '#999' }} />
      </div>
    );
  };

  // 表格列定义
  const columns: ColumnsType<TreeNode> = [
    {
      title: '',
      key: 'drag',
      width: 50,
      render: () => <DragHandle />,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      ellipsis: true,
      render: (name: string, record: TreeNode) => (
        <span className={record.isCategory ? 'font-semibold text-base' : ''}>
          {name}
        </span>
      ),
    },
    {
      title: '地址',
      dataIndex: 'url',
      key: 'url',
      width: 250,
      ellipsis: true,
      render: (url: string, record: TreeNode) => 
        record.isCategory ? (
          <span className="text-gray-400">-</span>
        ) : url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            {url}
          </a>
        ) : null,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
      render: (description: string, record: TreeNode) => 
        record.isCategory ? (
          <span className="text-gray-500">共 {record.children?.length || 0} 个链接</span>
        ) : (
          description
        ),
    },
    {
      title: '背景颜色',
      dataIndex: 'backgroundColor',
      key: 'backgroundColor',
      width: 140,
      render: (color: string, record: TreeNode) => 
        record.isCategory ? (
          <span className="text-gray-400">-</span>
        ) : (
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: color || '#d9d9d9' }}
            />
            <span className="text-xs text-gray-500">{color || '#d9d9d9'}</span>
          </div>
        ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record: TreeNode) => 
        record.isCategory ? (
          <span className="text-gray-400">-</span>
        ) : (
          <Space size="small">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => onEdit(record as unknown as Link)}
              size="small"
            >
              编辑
            </Button>
            <Popconfirm
              title="确定要删除这个链接吗？"
              onConfirm={() => onDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                size="small"
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  // 行选择配置 - 只允许选择链接，不允许选择分类
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      // 过滤掉分类节点
      const linkKeys = newSelectedRowKeys.filter(key => !String(key).startsWith('category-'));
      if (onSelectionChange) {
        onSelectionChange(linkKeys);
      } else {
        setInternalSelectedRowKeys(linkKeys);
      }
    },
    getCheckboxProps: (record: TreeNode) => ({
      disabled: record.isCategory, // 禁用分类节点的复选框
    }),
  };

  return (
    <div>
      {/* 树形数据表格 */}
      <Table
        columns={columns}
        dataSource={treeData}
        rowKey="key"
        size="middle"
        rowSelection={rowSelection}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: (keys) => setExpandedRowKeys([...keys]),
          defaultExpandAllRows: true,
        }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 个分类`,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        scroll={{ x: 1200 }}
        className="[&_.ant-empty]:z-0"
      />
    </div>
  );
};

export default DataTable;
