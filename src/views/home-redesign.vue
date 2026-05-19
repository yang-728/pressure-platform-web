<template>
  <div class="app-shell">
    <!-- ====== Header ====== -->
    <header class="app-header">
      <div class="header-left">
        <button class="collapse-btn" @click="collapsed = !collapsed" :title="collapsed ? '展开菜单' : '收起菜单'">
          <el-icon :size="20"><Fold v-if="!collapsed" /><Expand v-else /></el-icon>
        </button>
        <span class="header-logo">分布式压测平台</span>
      </div>
      <div class="header-right">
        <el-tooltip content="GitHub" placement="bottom">
          <a class="header-link" href="https://github.com" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </el-tooltip>
        <el-dropdown trigger="click">
          <div class="user-avatar">
            <el-avatar :size="32" icon="UserFilled" />
            <span class="user-name">admin</span>
            <el-icon :size="14"><ArrowDown /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>

    <!-- ====== Sidebar ====== -->
    <aside class="app-sidebar" :class="{ collapsed }">
      <!-- Brand -->
      <div class="sidebar-brand" v-show="!collapsed">
        <div class="brand-logo">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="10" fill="rgba(96,165,250,0.15)"/>
            <path d="M14 34V20l10-6 10 6v14l-10 6-10-6z" stroke="#60A5FA" stroke-width="2" fill="none"/>
            <path d="M24 26v8M20 28h8" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
            <circle cx="24" cy="18" r="2" fill="#60A5FA"/>
          </svg>
        </div>
        <div class="brand-info">
          <span class="brand-name">分布式压测平台</span>
          <span class="brand-ver">v2.0</span>
        </div>
      </div>
      <div class="sidebar-divider" v-show="!collapsed"></div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        <div class="nav-section-label" v-show="!collapsed">导航菜单</div>
        <a
          v-for="item in menuItems"
          :key="item.path"
          :class="['nav-item', { active: currentRoute === item.path }]"
          @click="currentRoute = item.path"
        >
          <el-icon :size="18"><component :is="item.icon" /></el-icon>
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>
    </aside>

    <!-- ====== Main Content ====== -->
    <main class="app-main">
      <!-- Tags Bar -->
      <div class="tags-bar">
        <div class="tags-list">
          <span
            v-for="tag in openTags"
            :key="tag.path"
            :class="['tag-item', { active: currentRoute === tag.path }]"
            @click="currentRoute = tag.path"
          >
            {{ tag.label }}
            <el-icon :size="12" class="tag-close" @click.stop="removeTag(tag)"><Close /></el-icon>
          </span>
        </div>
        <div class="tags-actions">
          <el-dropdown trigger="click" size="small">
            <el-button size="small">标签选项<el-icon :size="12" style="margin-left:4px"><ArrowDown /></el-icon></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>关闭其他</el-dropdown-item>
                <el-dropdown-item>关闭所有</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- Page Content -->
      <div class="content-area">
        <!-- KPI Row -->
        <div class="kpi-row">
          <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
            <div class="kpi-label">{{ kpi.label }}</div>
            <div class="kpi-value">{{ kpi.value }}</div>
          </div>
        </div>

        <!-- Search + Table -->
        <div class="content-card">
          <div class="search-bar">
            <el-input v-model="search.id" placeholder="编号" style="width:120px" clearable />
            <el-input v-model="search.name" placeholder="用例名称" style="width:180px" clearable />
            <el-select v-model="search.status" placeholder="状态" style="width:140px" clearable>
              <el-option label="运行中" value="running" />
              <el-option label="执行成功" value="success" />
              <el-option label="执行异常" value="failed" />
            </el-select>
            <el-button type="primary" :icon="Search">搜索</el-button>
            <el-button :icon="Refresh">重置</el-button>
            <el-button type="primary" :icon="Plus" style="margin-left:auto">新增用例</el-button>
          </div>

          <el-table
            :data="tableData"
            stripe
            style="width:100%;margin-top:16px"
            size="medium"
            empty-text="暂无用例数据，点击上方「新增用例」创建"
          >
            <el-table-column prop="id" label="编号" width="70" align="center" />
            <el-table-column prop="name" label="用例名称" min-width="160" show-overflow-tooltip />
            <el-table-column prop="biz" label="产品线" width="110">
              <template #default="{ row }">
                <el-tag size="small" type="info">{{ row.biz }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="service" label="服务" width="110" />
            <el-table-column prop="status" label="状态" width="110" align="center">
              <template #default="{ row }">
                <el-tag :type="row.statusType" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="creator" label="创建人" width="90" />
            <el-table-column prop="createTime" label="创建时间" width="170" />
            <el-table-column label="操作" width="250" align="right" fixed="right">
              <template #default>
                <div class="action-group">
                  <el-button text type="primary" size="small" :icon="View">详情</el-button>
                  <el-button text type="primary" size="small" :icon="Edit">编辑</el-button>
                  <el-dropdown trigger="click">
                    <el-button text type="primary" size="small" :icon="VideoPlay">执行</el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :icon="VideoPlay">调试</el-dropdown-item>
                        <el-dropdown-item :icon="CaretRight">压测</el-dropdown-item>
                        <el-dropdown-item :icon="Clock">定时压测</el-dropdown-item>
                        <el-dropdown-item divided :icon="CloseBold">停止</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <el-button text type="danger" size="small" :icon="Delete">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="table-footer">
            <span class="table-total">共 128 条</span>
            <el-pagination background layout="prev, pager, next" :total="128" :page-size="10" size="small" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  Fold, Expand, ArrowDown, Close, Search, Refresh, Plus,
  View, Edit, Delete, VideoPlay, CaretRight, Clock, CloseBold,
  Odometer, DocumentCopy, Calendar, Setting, List, PieChart, Monitor, Tickets, UserFilled
} from '@element-plus/icons-vue';

const collapsed = ref(false);
const currentRoute = ref('/testcase');

const search = reactive({ id: '', name: '', status: '' });

const menuItems = [
  { icon: Odometer, label: '用例管理', path: '/testcase' },
  { icon: DocumentCopy, label: '脚本管理', path: '/jmx' },
  { icon: Calendar, label: '数据管理', path: '/csv' },
  { icon: Setting, label: '依赖管理', path: '/jar' },
  { icon: List, label: '执行队列', path: '/execution' },
  { icon: PieChart, label: '执行结果', path: '/report' },
  { icon: Monitor, label: '节点管理', path: '/node' },
  { icon: Tickets, label: '配置管理', path: '/config' },
  { icon: UserFilled, label: '用户管理', path: '/user' },
];

const openTags = ref([
  { label: '用例管理', path: '/testcase' },
  { label: '执行队列', path: '/execution' },
]);

const removeTag = (tag: { label: string; path: string }) => {
  openTags.value = openTags.value.filter(t => t.path !== tag.path);
};

const kpis = [
  { label: '今日执行', value: '1,284' },
  { label: '成功率', value: '98.6%' },
  { label: '平均响应', value: '234ms' },
  { label: '活跃节点', value: '12/16' },
];

const tableData = [
  { id: 1, name: '首页接口压测', biz: '核心服务', service: 'gateway', status: '运行中', statusType: 'warning', creator: 'admin', createTime: '2026-05-19 14:30:00' },
  { id: 2, name: '订单查询压测', biz: '交易平台', service: 'order', status: '执行成功', statusType: 'success', creator: 'admin', createTime: '2026-05-19 13:15:00' },
  { id: 3, name: '支付回调压测', biz: '交易平台', service: 'payment', status: '执行异常', statusType: 'danger', creator: 'zhangsan', createTime: '2026-05-19 12:00:00' },
  { id: 4, name: '用户登录压测', biz: '核心服务', service: 'auth', status: '没有执行', statusType: 'info', creator: 'lisi', createTime: '2026-05-18 18:00:00' },
  { id: 5, name: '商品列表压测', biz: '商品中心', service: 'product', status: '排队等待', statusType: '', creator: 'wangwu', createTime: '2026-05-18 16:30:00' },
  { id: 6, name: '库存扣减压测', biz: '交易平台', service: 'inventory', status: '执行成功', statusType: 'success', creator: 'admin', createTime: '2026-05-18 15:00:00' },
  { id: 7, name: '优惠券查询压测', biz: '营销中心', service: 'coupon', status: '执行异常', statusType: 'danger', creator: 'zhangsan', createTime: '2026-05-18 14:00:00' },
  { id: 8, name: '搜索接口压测', biz: '核心服务', service: 'search', status: '执行成功', statusType: 'success', creator: 'lisi', createTime: '2026-05-18 11:20:00' },
];
</script>

<style scoped>
/* ============ Grid Layout ============ */
.app-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: var(--header-height) auto 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar main";
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.app-shell:has(.collapsed) {
  grid-template-columns: var(--sidebar-collapsed) 1fr;
}

/* ============ Header ============ */
.app-header {
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-header-border);
  z-index: var(--z-header);
}
.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.collapse-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
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
  font-size: 16px;
  font-weight: 600;
  color: var(--color-fg);
  letter-spacing: 0.5px;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
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
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}
.user-avatar:hover { background: var(--color-bg-muted); }
.user-name {
  font-size: 13px;
  color: var(--color-fg);
}

/* ============ Sidebar ============ */
.app-sidebar {
  grid-area: sidebar;
  background: var(--color-sidebar-bg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width var(--transition-slow);
  z-index: var(--z-sidebar);
}
.app-sidebar.collapsed {
  width: var(--sidebar-collapsed);
}

/* Sidebar Brand */
.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px 16px;
}
.brand-logo {
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
  margin: 0 16px 8px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.sidebar-nav {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-section-label {
  padding: 4px 12px 8px;
  font-size: 11px;
  color: rgba(255,255,255,0.25);
  letter-spacing: 1px;
  text-transform: uppercase;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  font-size: 14px;
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
.collapsed .nav-label {
  display: none;
}
.collapsed .nav-item {
  justify-content: center;
  padding: 10px;
}

/* ============ Main ============ */
.app-main {
  grid-area: main;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--color-bg);
}

/* Tags Bar */
.tags-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--tags-height);
  padding: 0 12px;
  background: var(--color-tags-bg);
  border-bottom: 1px solid var(--color-tags-border);
  flex-shrink: 0;
}
.tags-list {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
}
.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  font-size: 12px;
  color: var(--color-fg-secondary);
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}
.tag-item:hover {
  color: var(--color-fg);
}
.tag-item.active {
  color: #FFFFFF;
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.tag-close {
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}
.tag-close:hover { opacity: 1; }

/* Content Area */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

/* KPI Row */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}
.kpi-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
}
.kpi-label {
  font-size: 12px;
  color: var(--color-fg-tertiary);
  margin-bottom: 6px;
}
.kpi-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-fg);
}

/* Content Card */
.content-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
}
.action-group {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.table-total {
  font-size: 13px;
  color: var(--color-fg-secondary);
}

/* Scrollbar */
.app-sidebar::-webkit-scrollbar,
.content-area::-webkit-scrollbar { width: 4px; }
.app-sidebar::-webkit-scrollbar-thumb,
.content-area::-webkit-scrollbar-thumb {
  background: var(--color-fg-tertiary);
  border-radius: 2px;
}
</style>
