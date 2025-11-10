'use client';

import React, { useState } from 'react';
import { Modal, Input, Typography, Space, Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface ResetDataModalProps {
  open: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

/**
 * 数据重置确认对话框
 * 实现二次确认机制，要求用户输入"确认"文本
 */
export const ResetDataModal: React.FC<ResetDataModalProps> = ({
  open,
  onConfirm,
  onCancel,
}) => {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);

  const CONFIRM_KEYWORD = '确认';
  const isConfirmValid = confirmText === CONFIRM_KEYWORD;

  const handleOk = async () => {
    if (!isConfirmValid) return;

    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      setConfirmText('');
    }
  };

  const handleCancel = () => {
    if (loading) return;
    setConfirmText('');
    onCancel();
  };

  const handleAfterClose = () => {
    setConfirmText('');
  };

  return (
    <Modal
      open={open}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
          <span>重置所有数据</span>
        </div>
      }
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={handleAfterClose}
      okText="确认重置"
      cancelText="取消"
      okButtonProps={{
        danger: true,
        disabled: !isConfirmValid,
        loading,
      }}
      cancelButtonProps={{ disabled: loading }}
      closable={!loading}
      maskClosable={!loading}
      keyboard={!loading}
      width={500}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Alert
          message="警告：此操作不可撤销"
          description="重置数据将删除所有自定义链接和设置，并恢复到默认状态。"
          type="warning"
          showIcon
        />

        <div>
          <Paragraph>
            此操作将：
          </Paragraph>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li>删除所有自定义导航链接</li>
            <li>清除所有用户设置</li>
            <li>恢复到初始默认数据</li>
          </ul>
        </div>

        <div>
          <Paragraph>
            请输入 <Text strong code>{CONFIRM_KEYWORD}</Text> 以确认重置操作：
          </Paragraph>
          <Input
            placeholder={`请输入"${CONFIRM_KEYWORD}"`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            onPressEnter={handleOk}
            disabled={loading}
            status={confirmText && !isConfirmValid ? 'error' : undefined}
            autoFocus
          />
          {confirmText && !isConfirmValid && (
            <Text type="danger" style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}>
              请输入正确的确认文本
            </Text>
          )}
        </div>
      </Space>
    </Modal>
  );
};

export default ResetDataModal;
