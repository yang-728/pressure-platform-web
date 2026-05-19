<template>
  <div class="execution-page">
    <!-- Search Bar -->
    <div class="search-bar">
      <el-input v-model="query.name" placeholder="用例名称" style="width:200px" clearable />
      <el-input v-model="query.region" placeholder="区域" style="width:150px" clearable />
      <el-button type="primary" :icon="Search" @click="refreshData">搜索</el-button>
      <el-button :icon="Refresh" @click="refreshData">重置</el-button>
      <span class="auto-refresh">
        <span class="refresh-dot"></span>
        每 15s 自动刷新
      </span>
    </div>

    <!-- Table -->
    <div class="table-card">
      <el-table
        :data="tableData"
        stripe
        style="width:100%"
        size="medium"
        empty-text="当前无执行任务"
      >
        <el-table-column prop="id" label="编号" width="80" align="center">
          <template #default="{ row }">
            <span :class="row.rowType === 'report' ? 'id-tag running' : 'id-tag scheduled'">
              {{ row.rowType === 'report' ? 'R' : 'S' }}-{{ row.seqId }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="testCaseName" label="用例名称" min-width="140" show-overflow-tooltip />
        <el-table-column prop="region" label="区域" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.region" size="small" type="info">{{ row.region }}</el-tag>
            <span v-else style="color:var(--color-fg-tertiary);font-size:12px">全部</span>
          </template>
        </el-table-column>
        <el-table-column prop="rowType" label="类型" width="100" align="center">
          <template #default="{ row }">
            <template v-if="row.rowType === 'report'">
              <el-tag v-if="row.execType === 1" size="small" type="warning" effect="dark">调试</el-tag>
              <el-tag v-else size="small" effect="dark">执行</el-tag>
            </template>
            <template v-else>
              <el-tag v-if="row.scheduleType === 'once'" size="small" type="success" effect="plain">仅一次</el-tag>
              <el-tag v-else-if="row.scheduleType === 'daily'" size="small" effect="plain">每日</el-tag>
              <el-tag v-else-if="row.scheduleType === 'weekly'" size="small" type="warning" effect="plain">每周</el-tag>
              <el-tag v-else size="small" type="info" effect="plain">每月</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="110" align="center">
          <template #default="{ row }">
            <template v-if="row.rowType === 'report'">
              <span class="live-status running">
                <span class="live-dot"></span>运行中
              </span>
            </template>
            <template v-else>
              <span class="live-status waiting">等待中</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="runTime" label="执行时间" width="170" align="center" />
        <el-table-column label="操作" width="250" align="right">
          <template #default="{ row }">
            <div class="action-group">
              <template v-if="row.rowType === 'report'">
                <el-button text type="danger" size="small" :icon="VideoPause">停止</el-button>
                <el-button v-if="row.execType === 2" text type="primary" size="small" :icon="TrendCharts" @click="chartVisible = true">曲线</el-button>
              </template>
              <template v-else>
                <el-button text type="success" size="small" :icon="VideoPlay">立即执行</el-button>
                <el-button text type="primary" size="small" :icon="Edit" @click="scheduleVisible = true">编辑</el-button>
                <el-button text type="danger" size="small" :icon="Delete">删除</el-button>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-footer">
        <span class="table-total">共 7 条</span>
        <el-pagination background layout="prev, pager, next" :total="7" :page-size="10" size="small" />
      </div>
    </div>

    <!-- ====== Chart Dialog ====== -->
    <el-dialog v-model="chartVisible" title="实时监控曲线" width="800px" destroy-on-close>
      <div class="chart-grid">
        <div class="chart-box">
          <div class="chart-title">吞吐量 (req/s)</div>
          <div class="mock-chart">
            <svg width="100%" height="200" viewBox="0 0 720 200">
              <defs>
                <linearGradient id="tpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#3B82F6" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <rect width="720" height="200" fill="var(--color-bg)" rx="4"/>
              <!-- grid -->
              <line v-for="y in 4" :key="'g'+y" x1="50" :y1="y*40" x2="710" :y2="y*40" stroke="#E2E8F0" stroke-width="0.5"/>
              <!-- Y labels -->
              <text v-for="y in 4" :key="'yl'+y" x="44" :y="y*40+4" text-anchor="end" font-size="10" fill="#94A3B8">{{ (5-y)*250 }}</text>
              <!-- area -->
              <path d="M50,160 L140,155 L230,140 L320,145 L410,125 L500,130 L590,110 L680,100 L710,95 L710,200 L50,200 Z" fill="url(#tpGrad)"/>
              <!-- line -->
              <path d="M50,160 L140,155 L230,140 L320,145 L410,125 L500,130 L590,110 L680,100 L710,95" stroke="#3B82F6" stroke-width="2" fill="none" stroke-linecap="round"/>
              <!-- dots -->
              <circle v-for="(d,i) in chartDots" :key="'td'+i" :cx="50+i*82.5" :cy="d.tp" r="3" fill="#3B82F6"/>
            </svg>
            <div class="chart-legend">
              <span class="legend-dot blue"></span>吞吐量
            </div>
          </div>
        </div>
        <div class="chart-box">
          <div class="chart-title">响应时间 (ms)</div>
          <div class="mock-chart">
            <svg width="100%" height="200" viewBox="0 0 720 200">
              <defs>
                <linearGradient id="rtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <rect width="720" height="200" fill="var(--color-bg)" rx="4"/>
              <line v-for="y in 4" :key="'rg'+y" x1="50" :y1="y*40" x2="710" :y2="y*40" stroke="#E2E8F0" stroke-width="0.5"/>
              <text v-for="y in 4" :key="'ryl'+y" x="44" :y="y*40+4" text-anchor="end" font-size="10" fill="#94A3B8">{{ (5-y)*50 }}</text>
              <path d="M50,90 L140,88 L230,95 L320,85 L410,92 L500,80 L590,88 L680,78 L710,75" stroke="#F59E0B" stroke-width="2" fill="none" stroke-linecap="round"/>
              <circle v-for="(d,i) in chartDots" :key="'rd'+i" :cx="50+i*82.5" :cy="d.rt" r="3" fill="#F59E0B"/>
            </svg>
            <div class="chart-legend">
              <span class="legend-dot orange"></span>响应时间
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="chartVisible = false">关闭</el-button>
      </template>
    </el-dialog>

    <!-- ====== Schedule Edit Dialog ====== -->
    <el-dialog v-model="scheduleVisible" title="编辑定时任务" width="540px" destroy-on-close>
      <el-form label-width="90px">
        <el-form-item label="执行方式">
          <el-radio-group v-model="scheduleForm.type">
            <el-radio-button label="once">仅执行一次</el-radio-button>
            <el-radio-button label="daily">每日</el-radio-button>
            <el-radio-button label="weekly">每周</el-radio-button>
            <el-radio-button label="monthly">每月</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="scheduleForm.type === 'once'" label="执行时间">
          <el-date-picker v-model="scheduleForm.onceTime" type="datetime" placeholder="选择日期时间" style="width:100%" />
        </el-form-item>
        <el-form-item v-if="scheduleForm.type === 'daily'" label="执行时间">
          <el-time-picker v-model="scheduleForm.dailyTime" placeholder="选择时间" style="width:100%" />
        </el-form-item>
        <template v-if="scheduleForm.type === 'weekly'">
          <el-form-item label="执行时间">
            <el-time-picker v-model="scheduleForm.weeklyTime" placeholder="选择时间" style="width:100%" />
          </el-form-item>
          <el-form-item label="执行日">
            <el-checkbox-group v-model="scheduleForm.daysOfWeek">
              <el-checkbox v-for="d in weekDays" :key="d.val" :label="d.val">{{ d.label }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template v-if="scheduleForm.type === 'monthly'">
          <el-form-item label="执行时间">
            <el-time-picker v-model="scheduleForm.monthlyTime" placeholder="选择时间" style="width:100%" />
          </el-form-item>
          <el-form-item label="每月日">
            <el-input-number v-model="scheduleForm.dayOfMonth" :min="1" :max="28" />
            <span class="form-hint">建议1-28日，确保每月都可执行</span>
          </el-form-item>
        </template>

        <el-divider content-position="left">压测参数</el-divider>

        <el-form-item label="并发数">
          <el-input v-model="scheduleForm.numThreads" placeholder="并发线程数，如 100" />
        </el-form-item>
        <el-form-item label="启动时间">
          <el-input v-model="scheduleForm.rampTime" placeholder="Ramp-Up 秒数，如 10" />
          <span class="form-hint">逐步加压的时间</span>
        </el-form-item>
        <el-form-item label="运行时间">
          <el-input v-model="scheduleForm.duration" placeholder="持续时间 秒数，如 300" />
        </el-form-item>
        <el-form-item label="目标区域">
          <el-select v-model="scheduleForm.region" placeholder="全部区域" style="width:100%">
            <el-option label="全部区域" value="" />
            <el-option label="华东" value="east" />
            <el-option label="华北" value="north" />
            <el-option label="华南" value="south" />
          </el-select>
        </el-form-item>
        <el-form-item label="压力机数">
          <el-input-number v-model="scheduleForm.slaveCount" :min="1" :max="8" />
          <span class="form-hint">可用 8 台</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="scheduleVisible = false">取消</el-button>
        <el-button type="primary" @click="scheduleVisible = false">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {
  Search, Refresh, VideoPlay, VideoPause, Edit, Delete, TrendCharts,
} from '@element-plus/icons-vue';

const query = reactive({ name: '', region: '' });
const chartVisible = ref(false);
const scheduleVisible = ref(false);

const chartDots = [
  { tp: 160, rt: 90 },
  { tp: 155, rt: 88 },
  { tp: 140, rt: 95 },
  { tp: 145, rt: 85 },
  { tp: 125, rt: 92 },
  { tp: 130, rt: 80 },
  { tp: 110, rt: 88 },
  { tp: 100, rt: 78 },
  { tp: 95, rt: 75 },
];

const scheduleForm = reactive({
  type: 'once',
  onceTime: '',
  dailyTime: '',
  weeklyTime: '',
  daysOfWeek: [] as number[],
  monthlyTime: '',
  dayOfMonth: 1,
  numThreads: '100',
  rampTime: '10',
  duration: '300',
  region: '',
  slaveCount: 2,
});

const weekDays = [
  { val: 1, label: '周一' }, { val: 2, label: '周二' }, { val: 3, label: '周三' },
  { val: 4, label: '周四' }, { val: 5, label: '周五' }, { val: 6, label: '周六' }, { val: 7, label: '周日' },
];

const tableData = ref([
  { id: 'R-1', seqId: 1, testCaseName: '首页接口压测', region: '华东', rowType: 'report', execType: 2, runTime: '2026-05-19 14:30:00' },
  { id: 'R-2', seqId: 2, testCaseName: '支付回调压测-灰度', region: '华北', rowType: 'report', execType: 1, runTime: '2026-05-19 14:28:00' },
  { id: 'R-3', seqId: 3, testCaseName: '订单查询压测', region: '', rowType: 'report', execType: 2, runTime: '2026-05-19 14:25:00' },
  { id: 'S-1', seqId: 1, testCaseName: '每日核心链路巡检', region: '华东', rowType: 'scheduled', scheduleType: 'daily', runTime: '2026-05-20 09:00:00' },
  { id: 'S-2', seqId: 2, testCaseName: '大促全链路压测', region: '', rowType: 'scheduled', scheduleType: 'once', runTime: '2026-06-01 00:00:00' },
  { id: 'S-3', seqId: 3, testCaseName: '周末容量评估', region: '华南', rowType: 'scheduled', scheduleType: 'weekly', runTime: '2026-05-24 02:00:00' },
  { id: 'S-4', seqId: 4, testCaseName: '月底报表压测', region: '', rowType: 'scheduled', scheduleType: 'monthly', runTime: '2026-05-28 01:00:00' },
]);

const refreshData = () => { /* mock */ };
</script>

<style scoped>
.execution-page {
  padding: 16px 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.auto-refresh {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 12px;
  color: var(--color-fg-tertiary);
}
.refresh-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--color-success);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.table-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 20px;
}

/* ID tag prefix */
.id-tag {
  font-size: 11px;
  padding: 1px 5px;
  border-radius: 3px;
  font-weight: 600;
}
.id-tag.running {
  color: #D97706;
  background: #FEF3C7;
}
.id-tag.scheduled {
  color: #3B82F6;
  background: #DBEAFE;
}

/* Live status */
.live-status {
  font-size: 12px;
}
.live-status.running {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #D97706;
}
.live-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #D97706;
  animation: pulse 1.5s infinite;
}
.live-status.waiting {
  color: var(--color-fg-tertiary);
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

/* Chart */
.chart-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.chart-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 16px;
}
.chart-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-fg);
  margin-bottom: 8px;
}
.chart-legend {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-fg-secondary);
  margin-top: 4px;
}
.legend-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
}
.legend-dot.blue { background: #3B82F6; }
.legend-dot.orange { background: #F59E0B; }

.action-group {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;
}

.form-hint {
  margin-left: 8px;
  font-size: 12px;
  color: var(--color-fg-tertiary);
}
</style>
