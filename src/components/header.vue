<template>
  <header class="app-header">
    <div class="header-left">
      <button class="collapse-btn" @click="collapseChage" :title="sidebar.collapse ? '展开菜单' : '收起菜单'" aria-label="切换侧边栏">
        <el-icon :size="20"><Fold v-if="!sidebar.collapse" /><Expand v-else /></el-icon>
      </button>
      <span class="header-logo">分布式压测平台</span>
    </div>

    <div class="header-right">
      <a class="header-link" href="https://github.com/yang-728/pressure-platform" target="_blank" rel="noopener" title="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
      </a>

      <el-dropdown trigger="click" @command="handleCommand">
        <div class="user-avatar">
          <el-avatar :size="28" :icon="UserFilled" />
          <span class="user-name">{{ username }}</span>
          <el-icon :size="12"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRouter } from 'vue-router';
import { Fold, Expand, ArrowDown, UserFilled } from '@element-plus/icons-vue';

const username: string | null = localStorage.getItem('ms_username');
const sidebar = useSidebarStore();

const collapseChage = () => {
  sidebar.handleCollapse();
};

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage();
  }
});

const router = useRouter();
const handleCommand = (command: string) => {
  if (command == 'loginout') {
    localStorage.removeItem('ms_username');
    localStorage.removeItem('token');
    router.push('/login');
  } else if (command == 'user') {
    router.push('/user');
  }
};
</script>

<style scoped>
.app-header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-5);
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-header-border);
  z-index: var(--z-header);
  height: var(--header-height);
}
.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  border: none;
  background: none;
  color: var(--color-fg-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}
.collapse-btn:hover {
  background: var(--color-bg-muted);
  color: var(--color-fg);
}
.header-logo {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-fg);
  letter-spacing: 0.5px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.header-link {
  display: flex;
  align-items: center;
  color: var(--color-fg-tertiary);
  transition: color var(--transition-fast);
}
.header-link:hover { color: var(--color-fg); }
.user-avatar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}
.user-avatar:hover { background: var(--color-bg-muted); }
.user-name {
  font-size: var(--text-sm);
  color: var(--color-fg);
}
</style>
