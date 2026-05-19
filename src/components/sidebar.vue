<template>
  <aside class="app-sidebar">
    <!-- Brand -->
    <div class="sidebar-brand">
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="10" fill="rgba(96,165,250,0.15)"/>
        <path d="M14 34V20l10-6 10 6v14l-10 6-10-6z" stroke="#60A5FA" stroke-width="2" fill="none"/>
        <path d="M24 26v8M20 28h8" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="24" cy="18" r="2" fill="#60A5FA"/>
      </svg>
      <div class="brand-info">
        <span class="brand-name">分布式压测平台</span>
        <span class="brand-ver">v2.0</span>
      </div>
    </div>
    <div class="sidebar-divider"></div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <div class="nav-section-label">导航菜单</div>
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="['nav-item', { active: isActive(item.path) }]"
        v-permiss="item.permiss"
      >
        <el-icon :size="18"><component :is="item.icon" /></el-icon>
        <span class="nav-label">{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Odometer, DocumentCopy, Calendar, Setting, List, TrendCharts, Monitor, Tickets, UserFilled } from '@element-plus/icons-vue';

const menuItems = [
  { icon: Odometer, path: '/testcase', label: '用例管理', permiss: '1' },
  { icon: DocumentCopy, path: '/jmx', label: '脚本管理', permiss: '1' },
  { icon: Calendar, path: '/csv', label: '数据管理', permiss: '1' },
  { icon: Setting, path: '/jar', label: '依赖管理', permiss: '1' },
  { icon: List, path: '/execution', label: '执行队列', permiss: '1' },
  { icon: TrendCharts, path: '/report', label: '执行结果', permiss: '1' },
  { icon: Monitor, path: '/node', label: '节点管理', permiss: '1' },
  { icon: Tickets, path: '/config', label: '配置管理', permiss: '1' },
  { icon: UserFilled, path: '/user', label: '用户管理', permiss: '1' },
];

const route = useRoute();
const isActive = (path: string) => route.path === path;
</script>

<style scoped>
.app-sidebar {
  grid-area: sidebar;
  background: var(--color-sidebar-bg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: var(--z-sidebar);
}

/* Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: var(--space-5) var(--space-4) var(--space-4);
  flex-shrink: 0;
}
.brand-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.brand-name {
  font-size: 14px;
  font-weight: 600;
  color: #F1F5F9;
  white-space: nowrap;
  letter-spacing: 0.5px;
}
.brand-ver {
  font-size: 10px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 2px;
  text-transform: uppercase;
}
.sidebar-divider {
  margin: 0 var(--space-4) var(--space-2);
  border-top: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
}

/* Nav */
.sidebar-nav {
  flex: 1;
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-section-label {
  padding: var(--space-1) var(--space-3) var(--space-2);
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--color-sidebar-fg);
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}
.nav-item:hover {
  background: var(--color-sidebar-hover);
}
.nav-item.active {
  background: var(--color-primary);
  color: #FFFFFF;
}
.nav-label {
  overflow: hidden;
}

/* Collapsed */
.content-collapse .app-sidebar {
  width: var(--sidebar-collapsed);
}
.content-collapse .sidebar-brand,
.content-collapse .nav-section-label {
  display: none;
}
.content-collapse .nav-item {
  justify-content: center;
  padding: 10px;
}
.content-collapse .nav-label {
  display: none;
}

/* Scrollbar */
.app-sidebar::-webkit-scrollbar { width: 4px; }
.app-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
}
</style>
