<template>
  <div class="dp2-root">
    <!-- Floating Toolbar -->
    <div class="dp2-toolbar">
      <div class="toolbar-brand">
        <span class="brand-dot"></span>
        <span class="brand-text">Mysterious · Design v3</span>
        <span class="brand-tag">Refined Engineering</span>
      </div>
      <nav class="toolbar-nav">
        <a href="#layout" class="t-link">Layout</a>
        <a href="#dashboard" class="t-link">Dashboard</a>
        <a href="#login" class="t-link">Login</a>
        <a href="#tokens" class="t-link">Tokens</a>
      </nav>
    </div>

    <!-- ============================================
         SECTION 1 — Main Layout Preview
         ============================================ -->
    <section id="layout" class="dp2-section">
      <header class="dp2-section-head">
        <span class="head-mark">01</span>
        <div>
          <h2>主布局 · Application Shell</h2>
          <p>Sidebar · TopBar · Tags · Content — refined surfaces, brand-aware navigation, pulse-driven status</p>
        </div>
      </header>

      <div class="shell-frame">
        <!-- Sidebar Preview -->
        <aside class="x-sidebar">
          <div class="x-brand">
            <div class="x-brand-logo">
              <svg viewBox="0 0 48 48" width="36" height="36">
                <defs>
                  <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stop-color="#60A5FA"/>
                    <stop offset="1" stop-color="#3B82F6"/>
                  </linearGradient>
                </defs>
                <rect width="48" height="48" rx="11" fill="url(#lg1)" opacity="0.16"/>
                <path d="M14 34V20l10-6 10 6v14l-10 6-10-6z" stroke="url(#lg1)" stroke-width="2" fill="none"/>
                <path d="M24 26v8M20 28h8" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="24" cy="18" r="2.4" fill="#60A5FA"/>
              </svg>
            </div>
            <div class="x-brand-text">
              <span class="x-brand-name">分布式压测平台</span>
              <span class="x-brand-meta">v3.0 · 8 nodes online</span>
            </div>
          </div>

          <div class="x-nav-section">
            <span class="x-nav-label">MANAGE</span>
            <a class="x-nav-item active">
              <span class="rail"></span>
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              <span class="lbl">用例管理</span>
              <span class="badge">128</span>
            </a>
            <a class="x-nav-item">
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17H7A5 5 0 0 1 7 7M15 7h2a5 5 0 0 1 0 10M8 12h8"/></svg>
              <span class="lbl">脚本管理</span>
            </a>
            <a class="x-nav-item">
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              <span class="lbl">数据管理</span>
            </a>
            <a class="x-nav-item">
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 4.27 16.96l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              <span class="lbl">依赖管理</span>
            </a>
          </div>

          <div class="x-nav-section">
            <span class="x-nav-label">EXECUTE</span>
            <a class="x-nav-item">
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/><path d="M10 8l6 4-6 4V8z" fill="currentColor"/></svg>
              <span class="lbl">执行队列</span>
              <span class="pulse-mini"></span>
            </a>
            <a class="x-nav-item">
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 14l4-4 4 4 6-6"/></svg>
              <span class="lbl">执行结果</span>
            </a>
            <a class="x-nav-item">
              <svg class="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              <span class="lbl">节点管理</span>
              <span class="dot-online"></span>
            </a>
          </div>

          <div class="x-sidebar-footer">
            <div class="footer-stat">
              <span class="stat-label">CPU LOAD</span>
              <div class="stat-bar"><span style="width:34%"></span></div>
              <span class="stat-val">34%</span>
            </div>
            <div class="footer-stat">
              <span class="stat-label">MEM</span>
              <div class="stat-bar"><span style="width:67%"></span></div>
              <span class="stat-val">67%</span>
            </div>
          </div>
        </aside>

        <!-- Main Frame -->
        <div class="x-main">
          <!-- TopBar -->
          <header class="x-topbar">
            <div class="x-tb-left">
              <button class="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
              <div class="breadcrumb">
                <span class="bc-item">管理中心</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                <span class="bc-item active">用例管理</span>
              </div>
            </div>
            <div class="x-tb-right">
              <div class="search-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                <span>搜索用例 / 报告 / 节点…</span>
                <kbd>⌘K</kbd>
              </div>
              <button class="icon-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg><span class="notify-dot"></span></button>
              <div class="user-chip">
                <div class="avatar">A</div>
                <div class="u-info">
                  <span class="u-name">admin</span>
                  <span class="u-role">系统管理员</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </header>

          <!-- Tags Bar -->
          <div class="x-tagsbar">
            <div class="tag-chip active"><span class="tc-dot"></span>用例管理<span class="tc-x">✕</span></div>
            <div class="tag-chip">脚本管理<span class="tc-x">✕</span></div>
            <div class="tag-chip">执行队列<span class="tc-x">✕</span></div>
            <div class="tag-chip">节点管理<span class="tc-x">✕</span></div>
            <span class="x-tagsbar-actions">
              <button class="ghost-btn">关闭其他</button>
              <button class="ghost-btn">全部关闭</button>
            </span>
          </div>

          <!-- Content placeholder -->
          <div class="x-content">
            <div class="content-hint">↓ 见 Section 02 — Dashboard 区域将出现于此</div>
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div class="dp2-notes">
        <div class="note">
          <span class="n-num">A</span>
          <div><strong>Sidebar 渐变 + 光柱</strong><p>背景使用深色双层渐变（#0B1226 → #0F1B36），active 项左侧蓝色光柱 + 微 glow，nav 分组使用 uppercase letter-spacing label</p></div>
        </div>
        <div class="note">
          <span class="n-num">B</span>
          <div><strong>TopBar 玻璃感</strong><p>白底叠加 backdrop blur 8px，底部 1px gradient border。命令式搜索栏 + ⌘K，用户区域三段式信息架构</p></div>
        </div>
        <div class="note">
          <span class="n-num">C</span>
          <div><strong>Tags 双层结构</strong><p>chip 圆角 6px，active chip 左侧加 pulse dot + 蓝色边框 + 阴影，关闭按钮 hover 显示</p></div>
        </div>
        <div class="note">
          <span class="n-num">D</span>
          <div><strong>资源监控嵌入</strong><p>侧栏底部嵌入 CPU/MEM 双进度条，强化"压测平台"的实时运维感</p></div>
        </div>
      </div>
    </section>

    <!-- ============================================
         SECTION 2 — Dashboard / List Page Preview
         ============================================ -->
    <section id="dashboard" class="dp2-section">
      <header class="dp2-section-head">
        <span class="head-mark">02</span>
        <div>
          <h2>用例列表页 · Dashboard Composition</h2>
          <p>KPI cards · refined search · status-rich table · 微交互</p>
        </div>
      </header>

      <!-- KPI Strip -->
      <div class="kpi-strip">
        <div class="kpi-card kpi-primary">
          <div class="kpi-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4V8z" fill="currentColor"/></svg>
          </div>
          <div class="kpi-meta">
            <span class="kpi-label">运行中</span>
            <div class="kpi-value-row">
              <span class="kpi-value">3</span>
              <span class="kpi-pulse"></span>
            </div>
            <span class="kpi-delta up">▲ 2 since 1h ago</span>
          </div>
          <svg class="kpi-spark" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,20 12,15 24,18 36,10 48,12 60,6 72,8 84,4 100,2" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon ki-amber">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 6-6"/></svg>
          </div>
          <div class="kpi-meta">
            <span class="kpi-label">今日执行</span>
            <div class="kpi-value-row">
              <span class="kpi-value">42</span>
            </div>
            <span class="kpi-delta up">▲ 12% vs yesterday</span>
          </div>
          <svg class="kpi-spark sp-amber" viewBox="0 0 100 30" preserveAspectRatio="none">
            <polyline points="0,22 12,18 24,20 36,14 48,16 60,10 72,8 84,12 100,6" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon ki-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div class="kpi-meta">
            <span class="kpi-label">成功率</span>
            <div class="kpi-value-row">
              <span class="kpi-value">98.4<small>%</small></span>
            </div>
            <span class="kpi-delta down">▼ 0.6% vs avg</span>
          </div>
          <div class="kpi-progress"><span style="width:98.4%"></span></div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon ki-violet">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          </div>
          <div class="kpi-meta">
            <span class="kpi-label">可用节点</span>
            <div class="kpi-value-row">
              <span class="kpi-value">6<small>/8</small></span>
            </div>
            <span class="kpi-delta neutral">● shanghai · beijing</span>
          </div>
          <div class="kpi-cluster">
            <span class="node-dot on"></span>
            <span class="node-dot on"></span>
            <span class="node-dot on"></span>
            <span class="node-dot on"></span>
            <span class="node-dot on"></span>
            <span class="node-dot on"></span>
            <span class="node-dot off"></span>
            <span class="node-dot off"></span>
          </div>
        </div>
      </div>

      <!-- Surface Card -->
      <div class="surface">
        <div class="surface-glow"></div>

        <!-- Filter Bar -->
        <div class="filter-bar">
          <div class="filter-left">
            <div class="search-input">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input placeholder="用例名称 / 编号" />
            </div>
            <div class="chip-select">
              <span class="cs-label">产品线</span>
              <span class="cs-value">全部</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <div class="chip-select">
              <span class="cs-label">状态</span>
              <span class="cs-value">运行中</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            <button class="ghost-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M6 12h12M10 18h4"/></svg>更多筛选</button>
          </div>
          <div class="filter-right">
            <span class="auto-refresh"><span class="ar-dot"></span>每 15s 自动刷新</span>
            <button class="primary-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>新增用例</button>
          </div>
        </div>

        <!-- Refined Table -->
        <div class="rtable">
          <div class="rtable-head">
            <span class="th c-id">ID</span>
            <span class="th c-name">用例名称</span>
            <span class="th c-tag">产品线</span>
            <span class="th c-tag">服务</span>
            <span class="th c-status">状态</span>
            <span class="th c-user">创建人</span>
            <span class="th c-time">创建时间</span>
            <span class="th c-actions">操作</span>
          </div>

          <div class="rtable-row r-running">
            <span class="td c-id"><span class="id-mono">#1024</span></span>
            <span class="td c-name">
              <span class="row-marker"></span>
              <strong>首页接口压测</strong>
              <span class="row-desc">gateway · 持续 5 分钟</span>
            </span>
            <span class="td c-tag"><span class="biz-chip">核心服务</span></span>
            <span class="td c-tag"><code class="svc">gateway</code></span>
            <span class="td c-status">
              <span class="state-pill running">
                <span class="sp-dot"></span>
                运行中
                <span class="sp-meter"><span style="width:62%"></span></span>
              </span>
            </span>
            <span class="td c-user"><span class="avatar-mini">A</span>admin</span>
            <span class="td c-time"><code>2026-05-19</code><span class="t-sub">14:30</span></span>
            <span class="td c-actions">
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button class="op-btn op-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="1"/></svg></button>
            </span>
          </div>

          <div class="rtable-row r-success">
            <span class="td c-id"><span class="id-mono">#1023</span></span>
            <span class="td c-name">
              <strong>订单查询压测</strong>
              <span class="row-desc">order · 完成于 13:15</span>
            </span>
            <span class="td c-tag"><span class="biz-chip biz-trade">交易平台</span></span>
            <span class="td c-tag"><code class="svc">order</code></span>
            <span class="td c-status">
              <span class="state-pill success">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
                成功
              </span>
            </span>
            <span class="td c-user"><span class="avatar-mini bg2">A</span>admin</span>
            <span class="td c-time"><code>2026-05-19</code><span class="t-sub">13:15</span></span>
            <span class="td c-actions">
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button class="op-btn op-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg></button>
            </span>
          </div>

          <div class="rtable-row r-error">
            <span class="td c-id"><span class="id-mono">#1022</span></span>
            <span class="td c-name">
              <strong>支付回调压测</strong>
              <span class="row-desc">payment · 异常 @12:00</span>
            </span>
            <span class="td c-tag"><span class="biz-chip biz-trade">交易平台</span></span>
            <span class="td c-tag"><code class="svc">payment</code></span>
            <span class="td c-status">
              <span class="state-pill error">
                <span class="sp-dot"></span>
                异常
              </span>
            </span>
            <span class="td c-user"><span class="avatar-mini bg3">Z</span>zhangsan</span>
            <span class="td c-time"><code>2026-05-19</code><span class="t-sub">12:00</span></span>
            <span class="td c-actions">
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button class="op-btn op-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg></button>
            </span>
          </div>

          <div class="rtable-row r-waiting">
            <span class="td c-id"><span class="id-mono">#1021</span></span>
            <span class="td c-name">
              <strong>用户登录压测</strong>
              <span class="row-desc">auth · 队列等待</span>
            </span>
            <span class="td c-tag"><span class="biz-chip">核心服务</span></span>
            <span class="td c-tag"><code class="svc">auth</code></span>
            <span class="td c-status">
              <span class="state-pill waiting">
                <span class="sp-dot"></span>
                队列等待
              </span>
            </span>
            <span class="td c-user"><span class="avatar-mini bg4">L</span>lisi</span>
            <span class="td c-time"><code>2026-05-18</code><span class="t-sub">18:00</span></span>
            <span class="td c-actions">
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button class="op-btn op-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg></button>
            </span>
          </div>

          <div class="rtable-row r-idle">
            <span class="td c-id"><span class="id-mono">#1020</span></span>
            <span class="td c-name">
              <strong>商品列表压测</strong>
              <span class="row-desc">product · 未执行</span>
            </span>
            <span class="td c-tag"><span class="biz-chip biz-product">商品中心</span></span>
            <span class="td c-tag"><code class="svc">product</code></span>
            <span class="td c-status">
              <span class="state-pill idle">
                <span class="sp-dot"></span>
                未执行
              </span>
            </span>
            <span class="td c-user"><span class="avatar-mini bg2">W</span>wangwu</span>
            <span class="td c-time"><code>2026-05-18</code><span class="t-sub">16:30</span></span>
            <span class="td c-actions">
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
              <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              <button class="op-btn op-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg></button>
            </span>
          </div>
        </div>

        <div class="rtable-footer">
          <span class="rt-summary">共 <strong>128</strong> 条记录 · 显示 1 – 5</span>
          <div class="paginator">
            <button class="pg-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
            <button class="pg-btn active">1</button>
            <button class="pg-btn">2</button>
            <button class="pg-btn">3</button>
            <span class="pg-ellipsis">…</span>
            <button class="pg-btn">26</button>
            <button class="pg-btn"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div class="dp2-notes">
        <div class="note"><span class="n-num">E</span><div><strong>KPI 条带</strong><p>4 张卡片提供秒级感知 — 运行中（pulse）/ 今日执行（sparkline）/ 成功率（进度条）/ 节点（点阵）</p></div></div>
        <div class="note"><span class="n-num">F</span><div><strong>状态药丸 + 进度</strong><p>"运行中"状态包含 mini 进度条显示完成度；"成功"状态用 checkmark icon；样式统一来源于 state token</p></div></div>
        <div class="note"><span class="n-num">G</span><div><strong>表格行的呼吸</strong><p>运行中行有左侧 4px brand 光柱 + 极淡背景渐变；hover 时整行下沉 + 光柱亮起</p></div></div>
        <div class="note"><span class="n-num">H</span><div><strong>操作按钮极简化</strong><p>icon-only 圆形按钮，hover 显露品牌色背景，节省横向空间并提升精致度</p></div></div>
      </div>
    </section>

    <!-- ============================================
         SECTION 3 — Login Preview
         ============================================ -->
    <section id="login" class="dp2-section">
      <header class="dp2-section-head">
        <span class="head-mark">03</span>
        <div>
          <h2>登录页 · Brand Gate</h2>
          <p>双柱光晕 · 网格背景 · 渐变 logo · 极简表单</p>
        </div>
      </header>

      <div class="login-stage">
        <!-- decorative -->
        <div class="grid-bg"></div>
        <div class="glow glow-1"></div>
        <div class="glow glow-2"></div>
        <div class="orbit-line"></div>

        <!-- card -->
        <div class="login-card">
          <div class="login-side">
            <div class="brand-stack">
              <div class="brand-mark">
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <defs>
                    <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stop-color="#60A5FA"/>
                      <stop offset="1" stop-color="#3B82F6"/>
                    </linearGradient>
                    <radialGradient id="rg1" cx="0.5" cy="0.5" r="0.5">
                      <stop offset="0" stop-color="#60A5FA" stop-opacity="0.4"/>
                      <stop offset="1" stop-color="#60A5FA" stop-opacity="0"/>
                    </radialGradient>
                  </defs>
                  <circle cx="32" cy="32" r="30" fill="url(#rg1)"/>
                  <rect x="14" y="14" width="36" height="36" rx="8" fill="url(#lg2)" opacity="0.2"/>
                  <path d="M20 44V26l12-8 12 8v18l-12 8-12-8z" stroke="url(#lg2)" stroke-width="2" fill="none"/>
                  <path d="M32 34v8M28 36h8" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="32" cy="22" r="2.6" fill="#60A5FA"/>
                </svg>
              </div>
              <h1 class="brand-title">分布式压测平台</h1>
              <p class="brand-sub">M Y S T E R I O U S</p>
              <p class="brand-tagline">高并发场景的可视化压测控制台<br/>JMeter Cluster · Realtime · Schedule</p>
            </div>

            <div class="brand-stats">
              <div class="bs-item">
                <span class="bs-val">128<small>k</small></span>
                <span class="bs-lbl">累计请求</span>
              </div>
              <div class="bs-sep"></div>
              <div class="bs-item">
                <span class="bs-val">8<small>/8</small></span>
                <span class="bs-lbl">节点在线</span>
              </div>
              <div class="bs-sep"></div>
              <div class="bs-item">
                <span class="bs-val">99.4<small>%</small></span>
                <span class="bs-lbl">服务可用</span>
              </div>
            </div>
          </div>

          <div class="login-form-side">
            <div class="form-head">
              <span class="form-eyebrow">— ACCESS</span>
              <h2 class="form-title">欢迎回来</h2>
              <p class="form-desc">请使用工程账号登录控制台</p>
            </div>

            <div class="form-stack">
              <label class="field">
                <span class="field-label">用户名</span>
                <div class="field-control">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input value="admin" />
                </div>
              </label>

              <label class="field">
                <span class="field-label">密码</span>
                <div class="field-control">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input type="password" value="••••••••" />
                  <svg class="eye" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
              </label>

              <div class="form-aux">
                <label class="checkbox"><span class="cb-box"></span>记住我</label>
                <a class="forgot">忘记密码?</a>
              </div>

              <button class="login-btn">
                <span>登 录</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <div class="form-foot">
                <span class="ff-line"></span>
                <span class="ff-text">Mysterious 控制台 v3.0</span>
                <span class="ff-line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dp2-notes">
        <div class="note"><span class="n-num">I</span><div><strong>双柱光晕 + 网格</strong><p>背景使用 dot-grid 纹理 + 两个 80vw 的 radial 蓝色光晕，制造工程感空间纵深</p></div></div>
        <div class="note"><span class="n-num">J</span><div><strong>双栏分屏</strong><p>左侧品牌叙事 + 实时统计；右侧极简表单。两栏中间 1px gradient divider</p></div></div>
        <div class="note"><span class="n-num">K</span><div><strong>表单细节</strong><p>label + icon prefix + 极淡边框，focus 状态有 brand ring（不刺眼），按钮带箭头 icon + hover 微推进动效</p></div></div>
      </div>
    </section>

    <!-- ============================================
         SECTION 4 — Design Tokens
         ============================================ -->
    <section id="tokens" class="dp2-section">
      <header class="dp2-section-head">
        <span class="head-mark">04</span>
        <div>
          <h2>设计 Token · System</h2>
          <p>颜色 · 阴影 · 圆角 · 间距 · 状态</p>
        </div>
      </header>

      <div class="token-grid">
        <div class="token-block">
          <h4>Brand Color Scale</h4>
          <div class="color-row">
            <div class="csw" style="background:#0B1226"><span>950</span></div>
            <div class="csw" style="background:#1E293B"><span>800</span></div>
            <div class="csw" style="background:#1E40AF;color:#fff"><span>700</span></div>
            <div class="csw" style="background:#2563EB;color:#fff"><span>600</span></div>
            <div class="csw" style="background:#3B82F6;color:#fff"><span>500</span></div>
            <div class="csw" style="background:#60A5FA"><span>400</span></div>
            <div class="csw" style="background:#93C5FD"><span>300</span></div>
            <div class="csw" style="background:#DBEAFE"><span>100</span></div>
          </div>
        </div>

        <div class="token-block">
          <h4>Status Pills</h4>
          <div class="pill-row">
            <span class="state-pill running"><span class="sp-dot"></span>运行中</span>
            <span class="state-pill success"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>成功</span>
            <span class="state-pill error"><span class="sp-dot"></span>异常</span>
            <span class="state-pill waiting"><span class="sp-dot"></span>等待</span>
            <span class="state-pill idle"><span class="sp-dot"></span>未执行</span>
            <span class="state-pill warn"><span class="sp-dot"></span>警告</span>
          </div>
        </div>

        <div class="token-block">
          <h4>Buttons</h4>
          <div class="btn-row">
            <button class="primary-btn">主要按钮</button>
            <button class="ghost-btn">次按钮</button>
            <button class="op-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
            <button class="op-btn op-danger"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/></svg></button>
          </div>
        </div>

        <div class="token-block">
          <h4>Surface Elevation</h4>
          <div class="elev-row">
            <div class="elev e0">resting</div>
            <div class="elev e1">card</div>
            <div class="elev e2">popover</div>
            <div class="elev e3">modal</div>
          </div>
        </div>

        <div class="token-block">
          <h4>Sparklines (data-mono)</h4>
          <div class="spark-row">
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" class="sp-svg sp-blue"><polyline points="0,18 12,12 24,16 36,8 48,10 60,4 72,6 84,2 100,4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" class="sp-svg sp-amber"><polyline points="0,20 12,16 24,18 36,10 48,12 60,8 72,14 84,10 100,6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" class="sp-svg sp-green"><polyline points="0,16 12,12 24,14 36,8 48,10 60,6 72,8 84,4 100,2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            <svg viewBox="0 0 100 24" preserveAspectRatio="none" class="sp-svg sp-red"><polyline points="0,6 12,8 24,4 36,12 48,8 60,16 72,14 84,18 100,20" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          </div>
        </div>

        <div class="token-block">
          <h4>Typography</h4>
          <div class="typo-stack">
            <div class="typo-row" style="font-size:28px;font-weight:700;letter-spacing:-0.02em">KPI Value · 28/700</div>
            <div class="typo-row" style="font-size:20px;font-weight:600">Section Title · 20/600</div>
            <div class="typo-row" style="font-size:14px;font-weight:500">Body Strong · 14/500</div>
            <div class="typo-row" style="font-size:13px;color:#64748B">Caption · 13/400 · #64748B</div>
            <div class="typo-row" style="font-family:'Fira Code',monospace;font-size:13px">monospace · #1024 · 2026-05-19</div>
          </div>
        </div>
      </div>
    </section>

    <footer class="dp2-footer">
      <span>Mysterious Design v3 · Refined Engineering Aesthetics</span>
      <span>© 2026</span>
    </footer>
  </div>
</template>

<script setup lang="ts" name="DesignPreviewV2">
// pure visual mock — no logic required
</script>

<style scoped>
/* ============================================================
   DESIGN PREVIEW V2 — Refined Engineering Aesthetics
   ============================================================ */

.dp2-root {
  --dp-bg: #F4F6FB;
  --dp-bg-2: #EDF1F8;
  --dp-surface: #FFFFFF;
  --dp-surface-2: #F8FAFD;
  --dp-fg: #0F172A;
  --dp-fg-2: #475569;
  --dp-fg-3: #94A3B8;
  --dp-border: #E2E8F0;
  --dp-border-2: #EFF2F7;
  --dp-brand: #1E40AF;
  --dp-brand-2: #2563EB;
  --dp-brand-3: #3B82F6;
  --dp-brand-4: #60A5FA;
  --dp-accent: #D97706;
  --dp-success: #16A34A;
  --dp-error: #DC2626;
  --dp-warn: #F59E0B;
  --dp-violet: #7C3AED;

  --dp-radius-sm: 6px;
  --dp-radius: 10px;
  --dp-radius-lg: 14px;
  --dp-radius-xl: 18px;

  --dp-shadow-1: 0 1px 2px rgba(15,23,42,0.04), 0 1px 1px rgba(15,23,42,0.03);
  --dp-shadow-2: 0 1px 3px rgba(15,23,42,0.06), 0 8px 24px -8px rgba(15,23,42,0.08);
  --dp-shadow-3: 0 2px 4px rgba(15,23,42,0.04), 0 24px 48px -16px rgba(15,23,42,0.14);
  --dp-ring-brand: 0 0 0 3px rgba(59,130,246,0.16);

  --dp-mono: 'Fira Code', 'SF Mono', monospace;
  --dp-sans: 'Fira Sans', -apple-system, 'Segoe UI', sans-serif;

  font-family: var(--dp-sans);
  color: var(--dp-fg);
  background:
    radial-gradient(ellipse 90rem 50rem at 20% 0%, rgba(59,130,246,0.05), transparent 60%),
    radial-gradient(ellipse 80rem 40rem at 90% 30%, rgba(124,58,237,0.04), transparent 55%),
    linear-gradient(180deg, var(--dp-bg) 0%, var(--dp-bg-2) 100%);
  min-height: 100vh;
  padding: 96px 32px 40px;
  scroll-behavior: smooth;
}
.dp2-root::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(rgba(30,41,59,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,41,59,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000, transparent 100%);
  z-index: 0;
}

/* ============================================================
   TOOLBAR
   ============================================================ */
.dp2-toolbar {
  position: fixed;
  top: 16px; left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 16px 8px 12px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(16px) saturate(1.6);
  -webkit-backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgba(226,232,240,0.8);
  border-radius: 999px;
  box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 32px -12px rgba(15,23,42,0.16);
}
.toolbar-brand {
  display: flex; align-items: center; gap: 8px;
  padding-right: 16px;
  border-right: 1px solid var(--dp-border);
}
.brand-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--dp-brand-3);
  box-shadow: 0 0 0 4px rgba(59,130,246,0.16);
  animation: pulse-mini 2s infinite;
}
.brand-text {
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.02em;
}
.brand-tag {
  font-family: var(--dp-mono);
  font-size: 10px;
  color: var(--dp-fg-3);
  padding: 2px 6px;
  background: var(--dp-bg-2);
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.toolbar-nav {
  display: flex; gap: 4px;
}
.t-link {
  font-size: 12px;
  font-weight: 500;
  color: var(--dp-fg-2);
  padding: 6px 10px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 150ms;
}
.t-link:hover {
  background: var(--dp-bg-2);
  color: var(--dp-fg);
}

@keyframes pulse-mini {
  0%, 100% { box-shadow: 0 0 0 4px rgba(59,130,246,0.16); }
  50% { box-shadow: 0 0 0 8px rgba(59,130,246,0.04); }
}

/* ============================================================
   SECTION
   ============================================================ */
.dp2-section {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto 96px;
}
.dp2-section-head {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 28px;
}
.head-mark {
  font-family: var(--dp-mono);
  font-size: 14px;
  color: var(--dp-brand);
  padding: 6px 10px;
  background: rgba(30,64,175,0.08);
  border: 1px solid rgba(30,64,175,0.16);
  border-radius: 8px;
  letter-spacing: 0.08em;
}
.dp2-section-head h2 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
}
.dp2-section-head p {
  font-size: 14px;
  color: var(--dp-fg-2);
  margin: 0;
}

/* ============================================================
   SECTION 1 — Shell Frame
   ============================================================ */
.shell-frame {
  display: grid;
  grid-template-columns: 240px 1fr;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius-xl);
  box-shadow: var(--dp-shadow-3);
  overflow: hidden;
  height: 560px;
}

/* Sidebar Preview */
.x-sidebar {
  background:
    radial-gradient(ellipse 200% 100% at 0% 0%, rgba(96,165,250,0.08), transparent 50%),
    linear-gradient(180deg, #0F1B36 0%, #0B1226 100%);
  color: #CBD5E1;
  display: flex;
  flex-direction: column;
  position: relative;
}
.x-sidebar::after {
  content: '';
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(96,165,250,0.16), transparent);
}
.x-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px 16px;
}
.x-brand-logo {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(96,165,250,0.06);
  border: 1px solid rgba(96,165,250,0.16);
  border-radius: 10px;
}
.x-brand-text { display: flex; flex-direction: column; }
.x-brand-name {
  font-size: 14px;
  font-weight: 600;
  color: #F1F5F9;
  letter-spacing: 0.02em;
}
.x-brand-meta {
  font-family: var(--dp-mono);
  font-size: 10px;
  color: rgba(203,213,225,0.5);
  letter-spacing: 0.05em;
  margin-top: 2px;
}
.x-nav-section {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-top: 1px solid rgba(255,255,255,0.04);
}
.x-nav-label {
  font-family: var(--dp-mono);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: rgba(203,213,225,0.32);
  padding: 8px 12px 6px;
}
.x-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  font-size: 13px;
  color: #CBD5E1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 150ms;
}
.x-nav-item:hover { background: rgba(255,255,255,0.04); color: #F1F5F9; }
.x-nav-item .ico { color: rgba(203,213,225,0.6); }
.x-nav-item .lbl { flex: 1; }
.x-nav-item.active {
  background: linear-gradient(90deg, rgba(59,130,246,0.18), rgba(59,130,246,0.04));
  color: #F1F5F9;
}
.x-nav-item.active::before {
  content: '';
  position: absolute;
  left: -8px; top: 8px; bottom: 8px;
  width: 3px;
  background: linear-gradient(180deg, #60A5FA, #3B82F6);
  border-radius: 0 3px 3px 0;
  box-shadow: 0 0 12px #3B82F6;
}
.x-nav-item.active .ico { color: #60A5FA; }
.x-nav-item .badge {
  font-family: var(--dp-mono);
  font-size: 10px;
  padding: 1px 6px;
  background: rgba(96,165,250,0.16);
  color: #93C5FD;
  border-radius: 4px;
}
.x-nav-item .pulse-mini {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #F59E0B;
  box-shadow: 0 0 0 4px rgba(245,158,11,0.16);
  animation: pulse-amber 1.6s infinite;
}
.x-nav-item .dot-online {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #16A34A;
}
@keyframes pulse-amber {
  0%,100% { box-shadow: 0 0 0 4px rgba(245,158,11,0.16); }
  50% { box-shadow: 0 0 0 8px rgba(245,158,11,0.02); }
}

.x-sidebar-footer {
  margin-top: auto;
  padding: 16px;
  border-top: 1px solid rgba(255,255,255,0.04);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.footer-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-family: var(--dp-mono);
}
.stat-label {
  width: 64px;
  color: rgba(203,213,225,0.4);
  letter-spacing: 0.08em;
}
.stat-bar {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 2px;
  overflow: hidden;
}
.stat-bar > span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #60A5FA, #3B82F6);
  border-radius: 2px;
}
.stat-val {
  color: #93C5FD;
  font-weight: 600;
  width: 32px;
  text-align: right;
}

/* Top bar */
.x-main {
  display: flex;
  flex-direction: column;
  background: var(--dp-surface-2);
}
.x-topbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--dp-border);
  position: relative;
}
.x-topbar::after {
  content: '';
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--dp-brand-4), transparent);
  opacity: 0.3;
}
.x-tb-left { display: flex; align-items: center; gap: 12px; }
.icon-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--dp-fg-2);
  cursor: pointer;
  transition: all 150ms;
  position: relative;
}
.icon-btn:hover {
  background: var(--dp-bg-2);
  color: var(--dp-fg);
  border-color: var(--dp-border);
}
.notify-dot {
  position: absolute;
  top: 6px; right: 6px;
  width: 7px; height: 7px;
  background: var(--dp-error);
  border-radius: 50%;
  border: 2px solid var(--dp-surface);
}
.breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px;
  color: var(--dp-fg-3);
}
.bc-item.active {
  color: var(--dp-fg);
  font-weight: 600;
}
.x-tb-right { display: flex; align-items: center; gap: 12px; }
.search-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px 6px 12px;
  background: var(--dp-bg-2);
  border: 1px solid var(--dp-border);
  border-radius: 8px;
  font-size: 12px;
  color: var(--dp-fg-3);
  width: 240px;
}
.search-pill kbd {
  margin-left: auto;
  font-family: var(--dp-mono);
  font-size: 10px;
  padding: 2px 6px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: 4px;
  color: var(--dp-fg-2);
}
.user-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 4px 8px 4px 4px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: 999px;
  cursor: pointer;
  transition: all 150ms;
}
.user-chip:hover { box-shadow: var(--dp-shadow-1); border-color: var(--dp-brand-4); }
.avatar {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60A5FA, #3B82F6);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}
.u-info { display: flex; flex-direction: column; line-height: 1.2; }
.u-name { font-size: 12px; font-weight: 600; }
.u-role { font-size: 10px; color: var(--dp-fg-3); }

/* tags */
.x-tagsbar {
  height: 38px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px;
  background: var(--dp-surface);
  border-bottom: 1px solid var(--dp-border);
}
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 10px;
  background: var(--dp-bg-2);
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 12px;
  color: var(--dp-fg-2);
  cursor: pointer;
  transition: all 150ms;
}
.tag-chip:hover { color: var(--dp-fg); }
.tag-chip.active {
  background: rgba(59,130,246,0.08);
  border-color: rgba(59,130,246,0.2);
  color: var(--dp-brand);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(30,64,175,0.06);
}
.tc-dot {
  width: 6px; height: 6px;
  background: var(--dp-brand-3);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.18);
}
.tc-x {
  font-size: 10px;
  opacity: 0.5;
  width: 14px; height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}
.tc-x:hover { opacity: 1; background: rgba(0,0,0,0.05); }
.x-tagsbar-actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

/* content */
.x-content {
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.x-content::before {
  content: '';
  position: absolute; inset: 0;
  background-image:
    radial-gradient(circle, rgba(15,23,42,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}
.content-hint {
  font-family: var(--dp-mono);
  font-size: 12px;
  color: var(--dp-fg-3);
  padding: 8px 16px;
  background: var(--dp-surface);
  border: 1px dashed var(--dp-border);
  border-radius: 999px;
  z-index: 1;
}

/* ============================================================
   NOTES
   ============================================================ */
.dp2-notes {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}
.note {
  display: flex; gap: 12px;
  padding: 14px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius);
  box-shadow: var(--dp-shadow-1);
}
.n-num {
  width: 24px; height: 24px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #60A5FA, #3B82F6);
  color: #fff;
  font-family: var(--dp-mono);
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
}
.note strong { font-size: 13px; }
.note p {
  font-size: 12px;
  color: var(--dp-fg-2);
  margin: 4px 0 0;
  line-height: 1.6;
}

/* ============================================================
   SECTION 2 — KPI Strip
   ============================================================ */
.kpi-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.kpi-card {
  position: relative;
  padding: 18px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius-lg);
  box-shadow: var(--dp-shadow-1), 0 1px 0 rgba(255,255,255,0.8) inset;
  overflow: hidden;
  transition: all 200ms;
}
.kpi-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--dp-shadow-2);
  border-color: var(--dp-brand-4);
}
.kpi-primary {
  background:
    radial-gradient(circle at 100% 0%, rgba(59,130,246,0.06), transparent 60%),
    var(--dp-surface);
  border-color: rgba(59,130,246,0.16);
}
.kpi-primary::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--dp-brand-3), var(--dp-brand-4));
  opacity: 0.6;
}
.kpi-icon {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(59,130,246,0.1);
  color: var(--dp-brand-2);
  border-radius: 10px;
  margin-bottom: 12px;
}
.kpi-icon.ki-amber { background: rgba(245,158,11,0.1); color: var(--dp-warn); }
.kpi-icon.ki-green { background: rgba(22,163,74,0.1); color: var(--dp-success); }
.kpi-icon.ki-violet { background: rgba(124,58,237,0.1); color: var(--dp-violet); }

.kpi-meta { display: flex; flex-direction: column; gap: 2px; }
.kpi-label {
  font-size: 12px;
  color: var(--dp-fg-2);
  font-weight: 500;
}
.kpi-value-row { display: flex; align-items: baseline; gap: 8px; }
.kpi-value {
  font-family: var(--dp-mono);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--dp-fg);
  line-height: 1.1;
}
.kpi-value small {
  font-size: 14px;
  color: var(--dp-fg-3);
  font-weight: 500;
  margin-left: 2px;
}
.kpi-pulse {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--dp-warn);
  box-shadow: 0 0 0 4px rgba(245,158,11,0.16);
  animation: pulse-amber 1.6s infinite;
}
.kpi-delta {
  font-family: var(--dp-mono);
  font-size: 11px;
  margin-top: 6px;
}
.kpi-delta.up { color: var(--dp-success); }
.kpi-delta.down { color: var(--dp-error); }
.kpi-delta.neutral { color: var(--dp-fg-3); }

.kpi-spark {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 30px;
  color: var(--dp-brand-3);
  opacity: 0.18;
}
.kpi-spark.sp-amber { color: var(--dp-warn); }
.kpi-progress {
  margin-top: 10px;
  height: 4px;
  background: var(--dp-bg-2);
  border-radius: 2px;
  overflow: hidden;
}
.kpi-progress > span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--dp-success), #22C55E);
  border-radius: 2px;
}
.kpi-cluster {
  display: flex;
  gap: 4px;
  margin-top: 10px;
}
.node-dot {
  flex: 1;
  height: 4px;
  border-radius: 2px;
}
.node-dot.on { background: var(--dp-violet); }
.node-dot.off { background: var(--dp-border); }

/* ============================================================
   SECTION 2 — Surface
   ============================================================ */
.surface {
  position: relative;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius-xl);
  box-shadow: var(--dp-shadow-2);
  overflow: hidden;
}
.surface-glow {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 60%; height: 1px;
  background: linear-gradient(90deg, transparent, var(--dp-brand-4), transparent);
  opacity: 0.4;
}

/* Filter bar */
.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--dp-border);
  background: linear-gradient(180deg, var(--dp-surface-2) 0%, var(--dp-surface) 100%);
}
.filter-left, .filter-right {
  display: flex; align-items: center; gap: 8px;
}
.search-input {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 12px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: 8px;
  transition: all 150ms;
  width: 220px;
}
.search-input:focus-within {
  border-color: var(--dp-brand-3);
  box-shadow: var(--dp-ring-brand);
}
.search-input svg { color: var(--dp-fg-3); }
.search-input input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 13px;
  flex: 1;
  font-family: inherit;
}
.chip-select {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 10px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 150ms;
}
.chip-select:hover { border-color: var(--dp-brand-4); }
.cs-label { color: var(--dp-fg-3); }
.cs-value { color: var(--dp-fg); font-weight: 500; }
.chip-select svg { color: var(--dp-fg-3); }

.ghost-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--dp-border);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--dp-fg-2);
  cursor: pointer;
  transition: all 150ms;
  font-family: inherit;
}
.ghost-btn:hover {
  background: var(--dp-bg-2);
  color: var(--dp-fg);
  border-color: var(--dp-fg-3);
}
.primary-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  background: linear-gradient(180deg, var(--dp-brand-2), var(--dp-brand));
  color: #fff;
  border: 1px solid var(--dp-brand);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms;
  box-shadow: 0 1px 0 rgba(255,255,255,0.16) inset, 0 1px 2px rgba(30,64,175,0.32);
  font-family: inherit;
}
.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.16) inset, 0 4px 12px rgba(30,64,175,0.32);
}

.auto-refresh {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11px;
  color: var(--dp-fg-3);
  padding-right: 8px;
}
.ar-dot {
  width: 6px; height: 6px;
  background: var(--dp-warn);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(245,158,11,0.16);
  animation: pulse-amber 1.6s infinite;
}

/* ============================================================
   Refined Table
   ============================================================ */
.rtable {
  display: flex;
  flex-direction: column;
}
.rtable-head, .rtable-row {
  display: grid;
  grid-template-columns: 80px 1.6fr 1fr 1fr 1.1fr 1fr 1.1fr 140px;
  gap: 16px;
  align-items: center;
  padding: 12px 20px;
}
.rtable-head {
  background: var(--dp-surface-2);
  border-bottom: 1px solid var(--dp-border);
}
.th {
  font-family: var(--dp-mono);
  font-size: 10px;
  font-weight: 600;
  color: var(--dp-fg-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.rtable-row {
  position: relative;
  border-bottom: 1px solid var(--dp-border-2);
  font-size: 13px;
  transition: all 150ms;
  cursor: pointer;
}
.rtable-row:hover {
  background: linear-gradient(90deg, rgba(59,130,246,0.04), transparent 80%);
}
.rtable-row:hover::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: var(--dp-brand-3);
  border-radius: 0 2px 2px 0;
}
.rtable-row.r-running {
  background: linear-gradient(90deg, rgba(59,130,246,0.04), transparent 80%);
}
.rtable-row.r-running::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--dp-warn), #FB923C);
  box-shadow: 0 0 12px rgba(245,158,11,0.4);
}

.td { display: flex; align-items: center; gap: 8px; }
.id-mono {
  font-family: var(--dp-mono);
  font-size: 12px;
  color: var(--dp-fg-2);
  background: var(--dp-bg-2);
  padding: 2px 6px;
  border-radius: 4px;
}
.c-name {
  display: flex !important;
  flex-direction: column;
  align-items: flex-start !important;
  gap: 2px;
}
.c-name strong {
  font-weight: 600;
  color: var(--dp-fg);
  font-size: 13.5px;
}
.row-desc {
  font-size: 11px;
  color: var(--dp-fg-3);
  font-family: var(--dp-mono);
}
.biz-chip {
  font-size: 11px;
  color: var(--dp-brand);
  background: rgba(59,130,246,0.08);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
}
.biz-chip.biz-trade { color: var(--dp-warn); background: rgba(245,158,11,0.1); }
.biz-chip.biz-product { color: var(--dp-violet); background: rgba(124,58,237,0.1); }
.svc {
  font-family: var(--dp-mono);
  font-size: 12px;
  color: var(--dp-fg-2);
}

/* state pills */
.state-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.state-pill .sp-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
}
.state-pill.running {
  color: var(--dp-warn);
  background: rgba(245,158,11,0.1);
  border: 1px solid rgba(245,158,11,0.24);
}
.state-pill.running .sp-dot {
  background: var(--dp-warn);
  box-shadow: 0 0 0 3px rgba(245,158,11,0.2);
  animation: pulse-amber 1.6s infinite;
}
.state-pill.success {
  color: var(--dp-success);
  background: rgba(22,163,74,0.1);
  border: 1px solid rgba(22,163,74,0.24);
}
.state-pill.error {
  color: var(--dp-error);
  background: rgba(220,38,38,0.08);
  border: 1px solid rgba(220,38,38,0.24);
}
.state-pill.error .sp-dot { background: var(--dp-error); }
.state-pill.waiting {
  color: var(--dp-brand);
  background: rgba(59,130,246,0.08);
  border: 1px solid rgba(59,130,246,0.24);
}
.state-pill.waiting .sp-dot { background: var(--dp-brand); }
.state-pill.idle {
  color: var(--dp-fg-3);
  background: var(--dp-bg-2);
  border: 1px solid var(--dp-border);
}
.state-pill.idle .sp-dot { background: var(--dp-fg-3); }
.state-pill.warn {
  color: var(--dp-warn);
  background: rgba(245,158,11,0.08);
  border: 1px solid rgba(245,158,11,0.24);
}
.state-pill.warn .sp-dot { background: var(--dp-warn); }
.sp-meter {
  display: inline-block;
  width: 28px;
  height: 3px;
  background: rgba(245,158,11,0.16);
  border-radius: 2px;
  margin-left: 4px;
  overflow: hidden;
}
.sp-meter > span {
  display: block;
  height: 100%;
  background: var(--dp-warn);
}

.avatar-mini {
  width: 20px; height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60A5FA, #3B82F6);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.avatar-mini.bg2 { background: linear-gradient(135deg, #34D399, #16A34A); }
.avatar-mini.bg3 { background: linear-gradient(135deg, #FBBF24, #D97706); }
.avatar-mini.bg4 { background: linear-gradient(135deg, #A78BFA, #7C3AED); }

.c-time { display: flex !important; flex-direction: column; align-items: flex-start !important; gap: 1px !important; }
.c-time code {
  font-family: var(--dp-mono);
  font-size: 12px;
  color: var(--dp-fg);
}
.t-sub {
  font-size: 10.5px;
  color: var(--dp-fg-3);
  font-family: var(--dp-mono);
}

.c-actions {
  justify-content: flex-end;
  gap: 4px !important;
}
.op-btn {
  width: 28px; height: 28px;
  display: flex; align-items: center; justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
  color: var(--dp-fg-3);
  cursor: pointer;
  transition: all 150ms;
}
.op-btn:hover {
  background: rgba(59,130,246,0.08);
  color: var(--dp-brand);
  border-color: rgba(59,130,246,0.16);
}
.op-btn.op-danger:hover {
  background: rgba(220,38,38,0.08);
  color: var(--dp-error);
  border-color: rgba(220,38,38,0.16);
}

/* footer */
.rtable-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: var(--dp-surface-2);
  border-top: 1px solid var(--dp-border);
}
.rt-summary {
  font-size: 12px;
  color: var(--dp-fg-2);
}
.paginator {
  display: flex; gap: 4px;
  align-items: center;
}
.pg-btn {
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: 6px;
  font-size: 12px;
  font-family: var(--dp-mono);
  color: var(--dp-fg-2);
  cursor: pointer;
  transition: all 150ms;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.pg-btn:hover {
  border-color: var(--dp-brand-3);
  color: var(--dp-brand);
}
.pg-btn.active {
  background: linear-gradient(180deg, var(--dp-brand-2), var(--dp-brand));
  color: #fff;
  border-color: var(--dp-brand);
}
.pg-ellipsis { color: var(--dp-fg-3); padding: 0 4px; }

/* ============================================================
   SECTION 3 — Login
   ============================================================ */
.login-stage {
  position: relative;
  height: 640px;
  background: linear-gradient(160deg, #F4F6FB 0%, #E8EEF8 100%);
  border-radius: var(--dp-radius-xl);
  border: 1px solid var(--dp-border);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-bg {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 50%, #000 30%, transparent 80%);
}
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
}
.glow-1 {
  top: -10%; left: -5%;
  width: 60%; height: 80%;
  background: radial-gradient(circle, rgba(59,130,246,0.35), transparent 60%);
  animation: glow-float-1 12s ease-in-out infinite;
}
.glow-2 {
  bottom: -20%; right: -10%;
  width: 60%; height: 80%;
  background: radial-gradient(circle, rgba(124,58,237,0.25), transparent 60%);
  animation: glow-float-2 16s ease-in-out infinite;
}
@keyframes glow-float-1 {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(20px, 40px) scale(1.1); }
}
@keyframes glow-float-2 {
  0%, 100% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-30px, -20px) scale(1.05); }
}

.orbit-line {
  position: absolute;
  left: 50%; top: 50%;
  width: 800px; height: 800px;
  margin-left: -400px; margin-top: -400px;
  border-radius: 50%;
  border: 1px dashed rgba(59,130,246,0.12);
  animation: orbit-rotate 60s linear infinite;
}
@keyframes orbit-rotate {
  to { transform: rotate(360deg); }
}

.login-card {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 380px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: var(--dp-radius-xl);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.8) inset,
    0 40px 80px -20px rgba(15,23,42,0.16),
    0 0 0 1px rgba(15,23,42,0.04);
  overflow: hidden;
  width: 880px;
  min-height: 480px;
}

.login-side {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:
    radial-gradient(circle at 20% 30%, rgba(59,130,246,0.06), transparent 50%),
    linear-gradient(180deg, transparent 0%, rgba(248,250,253,0.6) 100%);
  position: relative;
}
.login-side::after {
  content: '';
  position: absolute;
  right: 0; top: 24px; bottom: 24px;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--dp-border), transparent);
}

.brand-stack { display: flex; flex-direction: column; gap: 4px; }
.brand-mark {
  width: 64px; height: 64px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.brand-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--dp-fg);
  margin: 0;
  letter-spacing: -0.01em;
}
.brand-sub {
  font-family: var(--dp-mono);
  font-size: 11px;
  color: var(--dp-fg-3);
  letter-spacing: 0.4em;
  margin: 4px 0 16px;
  font-weight: 500;
}
.brand-tagline {
  font-size: 13px;
  color: var(--dp-fg-2);
  line-height: 1.7;
  margin: 0;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
  padding: 16px 0;
  border-top: 1px solid var(--dp-border-2);
}
.bs-item { display: flex; flex-direction: column; gap: 2px; }
.bs-val {
  font-family: var(--dp-mono);
  font-size: 20px;
  font-weight: 700;
  color: var(--dp-fg);
  letter-spacing: -0.01em;
}
.bs-val small {
  font-size: 12px;
  color: var(--dp-fg-3);
  font-weight: 500;
  margin-left: 1px;
}
.bs-lbl {
  font-size: 11px;
  color: var(--dp-fg-3);
}
.bs-sep {
  width: 1px;
  height: 32px;
  background: var(--dp-border);
}

/* form side */
.login-form-side {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255,255,255,0.6);
}
.form-head { margin-bottom: 28px; }
.form-eyebrow {
  font-family: var(--dp-mono);
  font-size: 11px;
  color: var(--dp-brand);
  letter-spacing: 0.2em;
  font-weight: 600;
}
.form-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--dp-fg);
  margin: 6px 0 6px;
}
.form-desc {
  font-size: 13px;
  color: var(--dp-fg-2);
  margin: 0;
}

.form-stack { display: flex; flex-direction: column; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--dp-fg-2);
}
.field-control {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: 10px;
  transition: all 150ms;
}
.field-control:focus-within {
  border-color: var(--dp-brand-3);
  box-shadow: var(--dp-ring-brand);
}
.field-control svg { color: var(--dp-fg-3); }
.field-control input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  font-family: inherit;
  color: var(--dp-fg);
}
.field-control .eye { cursor: pointer; }
.field-control .eye:hover { color: var(--dp-fg); }

.form-aux {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -4px;
}
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--dp-fg-2);
  cursor: pointer;
}
.cb-box {
  width: 14px; height: 14px;
  border: 1.5px solid var(--dp-border);
  background: var(--dp-surface);
  border-radius: 3px;
  position: relative;
}
.forgot {
  font-size: 12px;
  color: var(--dp-brand);
  text-decoration: none;
  font-weight: 500;
}
.forgot:hover { text-decoration: underline; }

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  background:
    linear-gradient(180deg, var(--dp-brand-2) 0%, var(--dp-brand) 100%);
  color: #fff;
  border: 1px solid var(--dp-brand);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 200ms;
  margin-top: 8px;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.16) inset,
    0 8px 24px -8px rgba(30,64,175,0.4),
    0 1px 2px rgba(30,64,175,0.32);
  position: relative;
  overflow: hidden;
  font-family: inherit;
}
.login-btn::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent);
  transition: left 600ms;
}
.login-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    0 1px 0 rgba(255,255,255,0.16) inset,
    0 12px 32px -8px rgba(30,64,175,0.48),
    0 2px 4px rgba(30,64,175,0.32);
}
.login-btn:hover::before { left: 100%; }
.login-btn:hover svg { transform: translateX(2px); }
.login-btn svg { transition: transform 200ms; }

.form-foot {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  font-family: var(--dp-mono);
  font-size: 10px;
  color: var(--dp-fg-3);
  letter-spacing: 0.08em;
}
.ff-line {
  flex: 1;
  height: 1px;
  background: var(--dp-border);
}

/* ============================================================
   SECTION 4 — Tokens
   ============================================================ */
.token-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.token-block {
  padding: 20px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius-lg);
  box-shadow: var(--dp-shadow-1);
}
.token-block h4 {
  font-size: 13px;
  font-weight: 600;
  color: var(--dp-fg);
  margin: 0 0 16px;
  font-family: var(--dp-mono);
  letter-spacing: 0.04em;
}
.color-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
}
.csw {
  height: 56px;
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  padding: 6px;
  font-family: var(--dp-mono);
  font-size: 10px;
  color: var(--dp-fg);
}
.csw span { background: rgba(255,255,255,0.6); padding: 1px 5px; border-radius: 3px; }
.pill-row { display: flex; flex-wrap: wrap; gap: 8px; }
.btn-row { display: flex; align-items: center; gap: 8px; }
.elev-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.elev {
  height: 60px;
  background: var(--dp-surface);
  border: 1px solid var(--dp-border);
  border-radius: var(--dp-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-family: var(--dp-mono);
  color: var(--dp-fg-2);
}
.elev.e1 { box-shadow: var(--dp-shadow-1); }
.elev.e2 { box-shadow: var(--dp-shadow-2); }
.elev.e3 { box-shadow: var(--dp-shadow-3); }

.spark-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.sp-svg {
  width: 100%;
  height: 32px;
}
.sp-svg.sp-blue { color: var(--dp-brand-3); }
.sp-svg.sp-amber { color: var(--dp-warn); }
.sp-svg.sp-green { color: var(--dp-success); }
.sp-svg.sp-red { color: var(--dp-error); }

.typo-stack { display: flex; flex-direction: column; gap: 8px; }
.typo-row { padding: 4px 0; }

/* footer */
.dp2-footer {
  max-width: 1280px;
  margin: 60px auto 0;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  font-family: var(--dp-mono);
  font-size: 11px;
  color: var(--dp-fg-3);
  border-top: 1px solid var(--dp-border);
}
</style>
