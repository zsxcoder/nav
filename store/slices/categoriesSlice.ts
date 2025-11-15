import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/category';

/**
 * Categories 状态接口
 */
interface CategoriesState {
  /** 所有分类 */
  items: Category[];
  /** 加载状态 */
  loading: boolean;
  /** 错误信息 */
  error: string | null;
}

/**
 * 默认分类数据
 */
const defaultCategories: Category[] = [
  {
    id: 'common-tools',
    name: '常用工具',
    icon: 'ToolOutlined',
    order: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'react',
    name: 'React',
    icon: 'CodeOutlined',
    order: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'vue',
    name: 'Vue',
    icon: 'CodepenOutlined',
    order: 2,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'node',
    name: 'Node',
    icon: 'CloudServerOutlined',
    order: 3,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'build-tools',
    name: '构建工具',
    icon: 'BuildOutlined',
    order: 4,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'css',
    name: 'CSS',
    icon: 'BgColorsOutlined',
    order: 5,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'community',
    name: '社区',
    icon: 'TeamOutlined',
    order: 6,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'code-hosting',
    name: '代码托管',
    icon: 'GithubOutlined',
    order: 7,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'hosting',
    name: '网站托管',
    icon: 'CloudOutlined',
    order: 8,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

/**
 * 初始状态
 */
const initialState: CategoriesState = {
  items: defaultCategories,
  loading: false,
  error: null,
};

/**
 * 生成唯一 ID
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Categories Slice
 * 管理分类的状态
 */
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    /**
     * 添加新分类
     */
    addCategory: (state, action: PayloadAction<CreateCategoryInput>) => {
      const now = Date.now();
      const newCategory: Category = {
        ...action.payload,
        id: generateId(),
        order: state.items.length,
        createdAt: now,
        updatedAt: now,
      };
      state.items.push(newCategory);
      state.error = null;
    },

    /**
     * 更新分类
     */
    updateCategory: (state, action: PayloadAction<UpdateCategoryInput>) => {
      const index = state.items.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: Date.now(),
        };
        state.error = null;
      } else {
        state.error = `Category with id ${action.payload.id} not found`;
      }
    },

    /**
     * 删除分类
     */
    deleteCategory: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(cat => cat.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        // 重新排序
        state.items.forEach((cat, idx) => {
          cat.order = idx;
        });
        state.error = null;
      } else {
        state.error = `Category with id ${action.payload} not found`;
      }
    },

    /**
     * 重新排序分类
     */
    reorderCategories: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      
      if (fromIndex < 0 || fromIndex >= state.items.length ||
          toIndex < 0 || toIndex >= state.items.length) {
        state.error = 'Invalid reorder indices';
        return;
      }

      const [movedItem] = state.items.splice(fromIndex, 1);
      state.items.splice(toIndex, 0, movedItem);
      
      // 更新所有分类的 order 属性
      state.items.forEach((cat, index) => {
        cat.order = index;
        cat.updatedAt = Date.now();
      });
      
      state.error = null;
    },

    /**
     * 加载分类数据
     */
    loadCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = [...action.payload].sort((a, b) => a.order - b.order);
      state.loading = false;
      state.error = null;
    },

    /**
     * 重置分类数据
     */
    resetCategories: (state, action: PayloadAction<Category[]>) => {
      state.items = [...action.payload].sort((a, b) => a.order - b.order);
      state.error = null;
    },

    /**
     * 设置加载状态
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * 设置错误信息
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * 清除错误信息
     */
    clearError: (state) => {
      state.error = null;
    },
  },
});

/**
 * 导出 actions
 */
export const {
  addCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  loadCategories,
  resetCategories,
  setLoading,
  setError,
  clearError,
} = categoriesSlice.actions;

/**
 * 导出 reducer
 */
export default categoriesSlice.reducer;

/**
 * 导出默认分类
 */
export { defaultCategories };
