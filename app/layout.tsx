import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import '@ant-design/v5-patch-for-react-19';

export const metadata: Metadata = {
  title: '前端导航网站',
  description: '现代化的个人前端导航网站',
  keywords: ['前端', '导航', '开发工具', '资源导航'],
  authors: [{ name: '前端导航' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          跳转到主内容
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
