<template>
  <div class="preview-root">
    <!-- Theme Toggle -->
    <div class="preview-toolbar">
      <span class="preview-title">Mysterious Design System v2.0</span>
      <el-switch
        v-model="isDark"
        size="large"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleTheme"
      />
    </div>

    <!-- ====== Color Palette ====== -->
    <section class="preview-section">
      <h2 class="section-title">Color Palette</h2>
      <div class="color-grid">
        <div class="color-card" v-for="c in brandColors" :key="c.name">
          <div class="color-swatch" :style="{ background: c.value }"></div>
          <div class="color-info">
            <span class="color-name">{{ c.name }}</span>
            <span class="color-hex">{{ c.value }}</span>
          </div>
        </div>
      </div>

      <h3 style="margin-top:24px;margin-bottom:12px;color:var(--color-fg-secondary);font-size:14px;">Status Colors</h3>
      <div class="color-grid">
        <div class="color-card" v-for="c in statusColors" :key="c.name">
          <div class="color-swatch" :style="{ background: c.value }"></div>
          <div class="color-info">
            <span class="color-name">{{ c.name }}</span>
            <span class="color-hex">{{ c.value }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== Typography ====== -->
    <section class="preview-section">
      <h2 class="section-title">Typography</h2>
      <div class="type-scale">
        <div class="type-row" style="font-size:32px;font-weight:700;">KPI Value 32px Bold</div>
        <div class="type-row" style="font-size:24px;font-weight:700;">Page Title 24px Bold</div>
        <div class="type-row" style="font-size:20px;font-weight:600;">Section Header 20px Semi-Bold</div>
        <div class="type-row" style="font-size:16px;font-weight:600;">Card Title 16px Semi-Bold</div>
        <div class="type-row" style="font-size:14px;font-weight:400;">Body Text 14px Regular — 分布式压测平台提供了一站式的JMeter压测管理能力，支持用例管理、脚本管理、数据驱动、定时执行等功能。</div>
        <div class="type-row" style="font-size:13px;font-weight:400;color:var(--color-fg-secondary);">Secondary Text 13px — 辅助信息，描述性文字，标签</div>
        <div class="type-row" style="font-size:12px;font-weight:400;color:var(--color-fg-tertiary);">Tertiary Text 12px — 时间戳、编号等辅助数据</div>
        <div class="type-row" style="font-family:var(--font-mono);font-size:14px;">Monospace 14px — console.log("hello world")</div>
      </div>
    </section>

    <!-- ====== Buttons ====== -->
    <section class="preview-section">
      <h2 class="section-title">Buttons</h2>
      <div class="row-gap">
        <el-button type="primary">Primary Action</el-button>
        <el-button type="primary" :icon="Search">Search</el-button>
        <el-button type="primary" loading>Loading</el-button>
        <el-button type="primary" disabled>Disabled</el-button>
      </div>
      <div class="row-gap" style="margin-top:12px;">
        <el-button>Default</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-button text>Text Button</el-button>
      </div>
      <div class="row-gap" style="margin-top:12px;">
        <el-button size="small">Small</el-button>
        <el-button size="large">Large</el-button>
        <el-button :icon="Refresh" circle />
        <el-button type="primary" :icon="Plus" circle />
      </div>
    </section>

    <!-- ====== Status Tags ====== -->
    <section class="preview-section">
      <h2 class="section-title">Status Tags</h2>
      <div class="row-gap">
        <el-tag type="success">执行成功</el-tag>
        <el-tag type="warning">运行中</el-tag>
        <el-tag type="danger">执行异常</el-tag>
        <el-tag type="info">没有执行</el-tag>
        <el-tag>等待中</el-tag>
        <el-tag type="success" effect="dark">Dark Success</el-tag>
        <el-tag type="warning" effect="dark">Dark Warning</el-tag>
        <el-tag type="danger" effect="dark">Dark Danger</el-tag>
      </div>

      <!-- Custom status dot with pulse -->
      <div class="row-gap" style="margin-top:16px;">
        <span class="status-indicator running">
          <span class="status-dot"></span>
          运行中
        </span>
        <span class="status-indicator online">
          <span class="status-dot"></span>
          在线
        </span>
        <span class="status-indicator offline">
          <span class="status-dot"></span>
          离线
        </span>
      </div>
    </section>

    <!-- ====== Data Table ====== -->
    <section class="preview-section">
      <h2 class="section-title">Data Table</h2>

      <div class="handle-box">
        <el-input v-model="searchName" placeholder="用例名称" style="width:180px;" clearable />
        <el-select v-model="searchStatus" placeholder="状态" style="width:140px;" clearable>
          <el-option label="运行中" value="running" />
          <el-option label="成功" value="success" />
          <el-option label="失败" value="failed" />
        </el-select>
        <el-button type="primary" :icon="Search">搜索</el-button>
        <el-button :icon="Refresh">重置</el-button>
        <el-button type="primary" :icon="Plus" style="margin-left:auto;">新增</el-button>
      </div>

      <el-table :data="tableData" stripe style="width:100%;margin-top:16px;" size="medium">
        <el-table-column prop="id" label="编号" width="70" align="center" />
        <el-table-column prop="name" label="用例名称" min-width="160" show-overflow-tooltip />
        <el-table-column prop="biz" label="产品线" width="120" />
        <el-table-column prop="service" label="服务" width="120" />
        <el-table-column prop="status" label="状态" width="110" align="center">
          <template #default="{ row }">
            <el-tag :type="row.statusType" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="100" />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default>
            <el-button text type="primary" size="small" :icon="Search">详情</el-button>
            <el-button text type="primary" size="small" :icon="Edit">编辑</el-button>
            <el-dropdown trigger="click">
              <el-button text type="primary" size="small" :icon="Right">执行</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>调试</el-dropdown-item>
                  <el-dropdown-item>压测</el-dropdown-item>
                  <el-dropdown-item>定时压测</el-dropdown-item>
                  <el-dropdown-item divided>停止</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button text type="danger" size="small" :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
        <span style="color:var(--color-fg-secondary);font-size:13px;">共 128 条</span>
        <el-pagination background layout="prev, pager, next" :total="128" :page-size="10" />
      </div>
    </section>

    <!-- ====== KPI Cards ====== -->
    <section class="preview-section">
      <h2 class="section-title">KPI Cards</h2>
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">今日执行</div>
          <div class="kpi-value">1,284</div>
          <div class="kpi-trend up">↑ 12.5%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">成功率</div>
          <div class="kpi-value">98.6%</div>
          <div class="kpi-trend up">↑ 0.3%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">平均响应时间</div>
          <div class="kpi-value">234<span style="font-size:14px;">ms</span></div>
          <div class="kpi-trend down">↓ 8.2%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">活跃节点</div>
          <div class="kpi-value">12<span style="font-size:14px;">/16</span></div>
          <div class="kpi-trend neutral">在线率 75%</div>
        </div>
      </div>
    </section>

    <!-- ====== Forms & Dialog ====== -->
    <section class="preview-section">
      <h2 class="section-title">Forms &amp; Dialog</h2>
      <div class="row-gap">
        <el-button type="primary" @click="dialogVisible = true">Open Dialog</el-button>
      </div>

      <div style="max-width:480px;margin-top:20px;">
        <el-form label-width="80px">
          <el-form-item label="并发数">
            <el-input placeholder="并发线程数，如 100" />
          </el-form-item>
          <el-form-item label="启动时间">
            <el-input placeholder="Ramp-Up 秒数，如 10" />
            <span style="margin-left:8px;color:var(--color-fg-tertiary);font-size:12px;">建议设置 5-30 秒</span>
          </el-form-item>
          <el-form-item label="运行时间">
            <el-input placeholder="持续时间 秒数，如 300" />
          </el-form-item>
          <el-form-item label="目标区域">
            <el-select style="width:100%;" placeholder="全部区域">
              <el-option label="华东" value="east" />
              <el-option label="华北" value="north" />
              <el-option label="华南" value="south" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </section>

    <el-dialog v-model="dialogVisible" title="新增用例" width="520px">
      <el-form label-width="80px">
        <el-form-item label="名称" required>
          <el-input placeholder="请输入用例名称" />
        </el-form-item>
        <el-form-item label="产品线">
          <el-select style="width:100%;" placeholder="请选择产品线">
            <el-option label="核心服务" value="core" />
            <el-option label="数据平台" value="data" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="3" placeholder="用例描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </template>
    </el-dialog>

    <!-- ====== Empty State ====== -->
    <section class="preview-section">
      <h2 class="section-title">Empty &amp; Loading States</h2>
      <div style="display:flex;gap:24px;">
        <div style="flex:1;">
          <el-empty description="暂无数据">
            <el-button type="primary">创建第一条用例</el-button>
          </el-empty>
        </div>
        <div style="flex:1;">
          <div style="padding:40px;display:flex;flex-direction:column;align-items:center;gap:16px;">
            <el-icon class="is-loading" :size="32" color="var(--color-primary)"><Loading /></el-icon>
            <span style="color:var(--color-fg-secondary);">加载中...</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ====== Sidebar Preview ====== -->
    <section class="preview-section">
      <h2 class="section-title">Sidebar Menu Preview</h2>
      <div class="sidebar-preview">
        <div class="mini-sidebar">
          <div class="sb-item" v-for="item in menuItems" :key="item.label"
               :class="{ active: item.label === '用例管理' }">
            <el-icon :size="18"><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Search, Refresh, Plus, Edit, Delete, Right,
  Moon, Sunny, Loading, Odometer, DocumentCopy,
  Calendar, Setting, List, PieChart, Warning, CoffeeCup
} from '@element-plus/icons-vue';

const isDark = ref(false);
const dialogVisible = ref(false);
const searchName = ref('');
const searchStatus = ref('');

const toggleTheme = () => {
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};

const brandColors = [
  { name: 'Primary', value: 'var(--color-primary)' },
  { name: 'Secondary', value: 'var(--color-secondary)' },
  { name: 'Background', value: 'var(--color-bg)' },
  { name: 'Card', value: 'var(--color-bg-card)' },
  { name: 'Foreground', value: 'var(--color-fg)' },
  { name: 'Muted', value: 'var(--color-bg-muted)' },
  { name: 'Border', value: 'var(--color-border)' },
  { name: 'Sidebar', value: 'var(--color-sidebar-bg)' },
];

const statusColors = [
  { name: 'Success', value: 'var(--color-success)' },
  { name: 'Warning', value: 'var(--color-warning)' },
  { name: 'Error', value: 'var(--color-error)' },
  { name: 'Info', value: 'var(--color-info)' },
  { name: 'Disabled', value: 'var(--color-disabled)' },
];

const tableData = [
  { id: 1, name: '首页接口压测', biz: '核心服务', service: 'gateway', status: '运行中', statusType: 'warning', creator: 'admin', createTime: '2026-05-18 14:30:00' },
  { id: 2, name: '订单查询压测', biz: '交易平台', service: 'order', status: '执行成功', statusType: 'success', creator: 'admin', createTime: '2026-05-18 13:15:00' },
  { id: 3, name: '支付接口压测', biz: '交易平台', service: 'payment', status: '执行异常', statusType: 'danger', creator: 'zhangsan', createTime: '2026-05-18 12:00:00' },
  { id: 4, name: '用户登录压测', biz: '核心服务', service: 'auth', status: '没有执行', statusType: 'info', creator: 'lisi', createTime: '2026-05-17 18:00:00' },
  { id: 5, name: '商品列表压测', biz: '商品中心', service: 'product', status: '排队等待', statusType: '', creator: 'wangwu', createTime: '2026-05-17 16:30:00' },
];

const menuItems = [
  { icon: Odometer, label: '用例管理' },
  { icon: DocumentCopy, label: '脚本管理' },
  { icon: Calendar, label: '数据管理' },
  { icon: Setting, label: '依赖管理' },
  { icon: List, label: '执行队列' },
  { icon: PieChart, label: '执行结果' },
  { icon: Warning, label: '节点管理' },
  { icon: Setting, label: '配置管理' },
  { icon: CoffeeCup, label: '用户管理' },
];

// Force colors to resolve
const getColorVar = (name: string) => {
  if (typeof window !== 'undefined') {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(name).trim();
  }
  return '';
};
</script>

<style scoped>
.preview-root {
  min-height: 100vh;
  background: var(--color-bg);
  padding: 0;
  color: var(--color-fg);
  font-family: var(--font-sans);
}
.preview-toolbar {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  height: 56px;
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-header-border);
  box-shadow: var(--shadow-xs);
}
.preview-title {
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-fg);
}
.preview-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  border-bottom: 1px solid var(--color-border);
}
.section-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-5);
  color: var(--color-fg);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

/* Color Grid */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-3);
}
.color-swatch {
  height: 60px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.color-info {
  padding: var(--space-2) var(--space-1);
}
.color-name {
  display: block;
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-fg);
}
.color-hex {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-tertiary);
}

/* Typography */
.type-scale {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.type-row {
  padding: var(--space-2) 0;
  color: var(--color-fg);
  max-width: 660px;
}

/* Buttons etc */
.row-gap {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-4);
}
.kpi-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: box-shadow var(--transition-fast);
}
.kpi-card:hover {
  box-shadow: var(--shadow-md);
}
.kpi-label {
  font-size: var(--text-sm);
  color: var(--color-fg-secondary);
  margin-bottom: var(--space-2);
}
.kpi-value {
  font-size: var(--text-kpi);
  font-weight: 700;
  color: var(--color-fg);
  font-family: var(--font-mono);
}
.kpi-trend {
  font-size: var(--text-xs);
  margin-top: var(--space-2);
}
.kpi-trend.up { color: var(--color-success); }
.kpi-trend.down { color: var(--color-error); }
.kpi-trend.neutral { color: var(--color-fg-tertiary); }

/* Status Indicator with Pulse */
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-sm);
  color: var(--color-fg);
}
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  display: inline-block;
}
.status-indicator.running .status-dot {
  background: var(--color-warning);
  animation: pulse 2s infinite;
}
.status-indicator.online .status-dot {
  background: var(--color-success);
}
.status-indicator.offline .status-dot {
  background: var(--color-disabled);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Handle Box */
.handle-box {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}

/* Sidebar Mini Preview */
.sidebar-preview {
  display: flex;
  justify-content: center;
}
.mini-sidebar {
  width: 240px;
  background: var(--color-sidebar-bg);
  border-radius: var(--radius-lg);
  padding: var(--space-2);
  overflow: hidden;
}
.sb-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  color: var(--color-sidebar-fg);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.sb-item:hover {
  background: var(--color-sidebar-hover);
}
.sb-item.active {
  background: var(--color-primary);
  color: #fff;
}

/* fix el-empty bg */
:deep(.el-empty__description) {
  color: var(--color-fg-secondary);
}
</style>
