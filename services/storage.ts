import { Link } from '@/types/link';
import { Settings } from '@/types/settings';

/**
 * LocalStorage 键名常量
 */
const STORAGE_KEYS = {
  LINKS: 'nav_links',
  SETTINGS: 'nav_settings',
  VERSION: 'nav_version',
} as const;

/**
 * 当前数据版本
 * 用于未来的数据迁移
 */
const CURRENT_VERSION = '1.0.0';

/**
 * 存储服务类
 * 封装 LocalStorage 操作，提供类型安全的数据持久化功能
 */
class StorageService {
  /**
   * 检查 LocalStorage 是否可用
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.error('LocalStorage is not available:', error);
      return false;
    }
  }

  /**
   * 安全地解析 JSON 数据
   */
  private safeJSONParse<T>(data: string | null, fallback: T): T {
    if (!data) return fallback;
    
    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return fallback;
    }
  }

  /**
   * 验证链接数据的有效性
   */
  private validateLink(link: any): link is Link {
    return (
      typeof link === 'object' &&
      link !== null &&
      typeof link.id === 'string' &&
      typeof link.name === 'string' &&
      typeof link.url === 'string' &&
      typeof link.description === 'string' &&
      typeof link.order === 'number' &&
      typeof link.createdAt === 'number' &&
      typeof link.updatedAt === 'number'
    );
  }

  /**
   * 验证链接数组的有效性
   */
  private validateLinks(data: any): data is Link[] {
    return Array.isArray(data) && data.every(link => this.validateLink(link));
  }

  /**
   * 验证设置数据的有效性
   */
  private validateSettings(data: any): data is Settings {
    return (
      typeof data === 'object' &&
      data !== null &&
      ['light', 'dark', 'system'].includes(data.theme) &&
      typeof data.searchEngine === 'string' &&
      ['grid', 'list'].includes(data.layout)
    );
  }

  /**
   * 保存链接数据到 LocalStorage
   * @param links 链接数组
   * @returns 是否保存成功
   */
  saveLinks(links: Link[]): boolean {
    if (!this.isLocalStorageAvailable()) {
      console.error('Cannot save links: LocalStorage is not available');
      return false;
    }

    try {
      const data = JSON.stringify(links);
      localStorage.setItem(STORAGE_KEYS.LINKS, data);
      localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error('LocalStorage quota exceeded. Please export your data and clear some space.');
      } else {
        console.error('Failed to save links:', error);
      }
      return false;
    }
  }

  /**
   * 从 LocalStorage 加载链接数据
   * @returns 链接数组，如果不存在或无效则返回 null
   */
  loadLinks(): Link[] | null {
    if (!this.isLocalStorageAvailable()) {
      console.error('Cannot load links: LocalStorage is not available');
      return null;
    }

    try {
      const data = localStorage.getItem(STORAGE_KEYS.LINKS);
      if (!data) return null;

      const parsed = this.safeJSONParse<any>(data, null);
      if (!parsed) return null;

      if (!this.validateLinks(parsed)) {
        console.error('Invalid links data format');
        return null;
      }

      return parsed;
    } catch (error) {
      console.error('Failed to load links:', error);
      return null;
    }
  }

  /**
   * 保存设置到 LocalStorage
   * @param settings 设置对象
   * @returns 是否保存成功
   */
  saveSettings(settings: Settings): boolean {
    if (!this.isLocalStorageAvailable()) {
      console.error('Cannot save settings: LocalStorage is not available');
      return false;
    }

    try {
      const data = JSON.stringify(settings);
      localStorage.setItem(STORAGE_KEYS.SETTINGS, data);
      return true;
    } catch (error) {
      console.error('Failed to save settings:', error);
      return false;
    }
  }

  /**
   * 从 LocalStorage 加载设置
   * @returns 设置对象，如果不存在或无效则返回 null
   */
  loadSettings(): Settings | null {
    if (!this.isLocalStorageAvailable()) {
      console.error('Cannot load settings: LocalStorage is not available');
      return null;
    }

    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return null;

      const parsed = this.safeJSONParse<any>(data, null);
      if (!parsed) return null;

      if (!this.validateSettings(parsed)) {
        console.error('Invalid settings data format');
        return null;
      }

      return parsed;
    } catch (error) {
      console.error('Failed to load settings:', error);
      return null;
    }
  }

  /**
   * 清除所有存储的数据
   * @returns 是否清除成功
   */
  clear(): boolean {
    if (!this.isLocalStorageAvailable()) {
      console.error('Cannot clear storage: LocalStorage is not available');
      return false;
    }

    try {
      localStorage.removeItem(STORAGE_KEYS.LINKS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.VERSION);
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  }

  /**
   * 获取当前存储的数据版本
   */
  getVersion(): string | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    return localStorage.getItem(STORAGE_KEYS.VERSION);
  }

  /**
   * 获取存储使用情况（估算）
   * @returns 使用的字节数，如果无法计算则返回 null
   */
  getStorageSize(): number | null {
    if (!this.isLocalStorageAvailable()) {
      return null;
    }

    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }
      return totalSize;
    } catch (error) {
      console.error('Failed to calculate storage size:', error);
      return null;
    }
  }
}

/**
 * 导出单例实例
 */
export const storageService = new StorageService();

/**
 * 默认导出
 */
export default storageService;
