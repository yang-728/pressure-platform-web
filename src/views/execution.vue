<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.region" placeholder="区域" class="handle-input mr10" style="width:150px"></el-input>
        <el-input v-model="query.name" placeholder="用例名称" class="handle-input mr10" style="width:150px"></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" :icon="Refresh" @click="handleReset">重置</el-button>
      </div>

      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="编号" width="70" align="center"></el-table-column>
        <el-table-column prop="testCaseId" label="用例" align="center">
          <template #default="scope">
            {{ testcaseNameMap[scope.row.testCaseId] || scope.row.testCaseId }}
          </template>
        </el-table-column>
        <el-table-column prop="region" label="区域" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.region" type="info">{{ scope.row.region }}</el-tag>
            <span v-else>全部</span>
          </template>
        </el-table-column>
        <el-table-column prop="rowType" label="类型" align="center" width="100">
          <template #default="scope">
            <template v-if="scope.row.rowType === 'report'">
              <el-tag v-if="scope.row.execType === 1" type="warning">调试</el-tag>
              <el-tag v-else type="primary">执行</el-tag>
            </template>
            <template v-else>
              <el-tag v-if="scope.row.scheduleType === 'once'" type="success">仅一次</el-tag>
              <el-tag v-else-if="scope.row.scheduleType === 'daily'" type="primary">每日</el-tag>
              <el-tag v-else-if="scope.row.scheduleType === 'weekly'" type="warning">每周</el-tag>
              <el-tag v-else type="info">每月</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="90">
          <template #default="scope">
            <template v-if="scope.row.rowType === 'report'">
              <el-tag type="warning">运行中</el-tag>
            </template>
            <template v-else>
              <el-tag type="info">等待中</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="runTime" label="执行时间" align="center"></el-table-column>
        <el-table-column label="操作" width="240" align="center">
          <template #default="scope">
            <template v-if="scope.row.rowType === 'report'">
              <el-button text :icon="Close" class="red"
                @click="handleStop(scope.row.reportId)">停止</el-button>
              <el-button v-if="scope.row.execType === 2" text :icon="TrendCharts" class="bg-blue"
                @click="openChartDialog(scope.row.reportId)">曲线</el-button>
            </template>
            <template v-else>
              <el-button text :icon="VideoPlay" class="bg-green"
                @click="handleTriggerNow(scope.row.scheduleId)">立即执行</el-button>
              <el-button text :icon="Edit" class="bg-blue"
                @click="openScheduleEdit(scope.row)">编辑</el-button>
              <el-button text :icon="Delete" class="red"
                @click="handleDeleteSchedule(scope.row.scheduleId)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next"
          :current-page="query.page" :page-size="query.size" :total="total"
          @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 定时任务编辑弹出框 -->
    <el-dialog title="编辑定时任务" v-model="scheduleVisible" width="35%">
      <el-form label-width="90px">
        <el-form-item label="执行方式">
          <el-radio-group v-model="scheduleForm.scheduleType">
            <el-radio label="once">仅执行一次</el-radio>
            <el-radio label="daily">每日</el-radio>
            <el-radio label="weekly">每周</el-radio>
            <el-radio label="monthly">每月</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="scheduleForm.scheduleType === 'once'" label="执行时间">
          <el-date-picker
              v-model="scheduleForm.onceDateTime"
              type="datetime"
              placeholder="选择日期时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="scheduleForm.scheduleType === 'daily'" label="执行时间">
          <el-time-picker
              v-model="scheduleForm.dailyTime"
              placeholder="选择时间"
              format="HH:mm"
              value-format="HH:mm"
              style="width:100%">
          </el-time-picker>
        </el-form-item>
        <template v-if="scheduleForm.scheduleType === 'weekly'">
          <el-form-item label="执行时间">
            <el-time-picker
                v-model="scheduleForm.weeklyTime"
                placeholder="选择时间"
                format="HH:mm"
                value-format="HH:mm"
                style="width:100%">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="执行日">
            <el-checkbox-group v-model="scheduleForm.daysOfWeek">
              <el-checkbox :label="1">周一</el-checkbox>
              <el-checkbox :label="2">周二</el-checkbox>
              <el-checkbox :label="3">周三</el-checkbox>
              <el-checkbox :label="4">周四</el-checkbox>
              <el-checkbox :label="5">周五</el-checkbox>
              <el-checkbox :label="6">周六</el-checkbox>
              <el-checkbox :label="7">周日</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template v-if="scheduleForm.scheduleType === 'monthly'">
          <el-form-item label="执行时间">
            <el-time-picker
                v-model="scheduleForm.monthlyTime"
                placeholder="选择时间"
                format="HH:mm"
                value-format="HH:mm"
                style="width:100%">
            </el-time-picker>
          </el-form-item>
          <el-form-item label="每月日">
            <el-input-number v-model="scheduleForm.dayOfMonth" :min="1" :max="28" :step="1" step-strictly></el-input-number>
            <span style="margin-left:8px;color:#909399;font-size:12px">建议1-28日以确保每月都可执行</span>
          </el-form-item>
        </template>
        <el-divider content-position="left">压测参数</el-divider>
        <el-form-item label="并发数">
          <el-input v-model="scheduleForm.runParam.numThreads" placeholder="并发线程数，如 100"></el-input>
        </el-form-item>
        <el-form-item label="启动时间">
          <el-input v-model="scheduleForm.runParam.rampTime" placeholder="Ramp-Up 秒数，如 10"></el-input>
        </el-form-item>
        <el-form-item label="运行时间">
          <el-input v-model="scheduleForm.runParam.duration" placeholder="持续时间 秒数，如 300"></el-input>
        </el-form-item>
        <el-form-item label="目标区域">
          <el-select v-model="scheduleForm.runParam.region" placeholder="全部区域" @change="onScheduleRegionChange" style="width:100%">
            <el-option key="" label="全部区域" value=""></el-option>
            <el-option v-for="r in regionList" :key="r" :label="r" :value="r"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="压力机数">
          <el-input-number v-model="scheduleForm.runParam.slaveCount" :min="1" :max="maxSlaveCount" :step="1" :disabled="maxSlaveCount <= 1"></el-input-number>
          <span style="margin-left:8px;color:#909399;font-size:12px">可用 {{ maxSlaveCount }} 台</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="scheduleVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmScheduleEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 曲线图弹出框 -->
    <el-dialog title="实时数据" v-model="chartDialogVisible" width="60%">
      <schart class="bar-schart" canvasId="throughputChart" :options="throughputChart"></schart>
      <schart class="bar-schart" canvasId="responseTimeChart" :options="responseTimeChart"></schart>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="execution">
import Schart from 'vue-schart';
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, Refresh, Close, TrendCharts, VideoPlay, Edit, Delete } from '@element-plus/icons-vue';
import { getReportListAll, getJMeterResultByReport } from '../api/report';
import { stopExecution } from '../api/testcase';
import { getTestCaseList } from '../api/testcase';
import { listScheduledTasks, triggerScheduledTask, updateScheduledTask, deleteScheduledTask } from '../api/scheduledTask';
import { getRegions, getEnableSlaveCount } from '../api/node';
import { checkToLogin } from '../common/push';

interface TableRow {
  id: string;
  testCaseId: number;
  region: string;
  rowType: 'report' | 'scheduled';
  execType?: number;
  scheduleType?: string;
  runTime: string;
  reportId?: number;
  scheduleId?: number;
  _scheduleData?: string;
  _runParam?: string;
}

const query = reactive({
  name: null as string | null,
  region: null as string | null,
  page: 1,
  size: 10
});

const tableData = ref<TableRow[]>([]);
const total = ref(0);
const testcaseNameMap = ref<Record<number, string>>({});

const loadTestcaseNames = async () => {
  try {
    const res = await getTestCaseList({ page: 1, size: 999 });
    if (res.data.code === 0) {
      const map: Record<number, string> = {};
      res.data.data.list.forEach((tc: any) => { map[tc.id] = tc.name; });
      testcaseNameMap.value = map;
    }
  } catch { /* ignore */ }
};

let refreshTimer: ReturnType<typeof setInterval> | null = null;

const getList = async () => {
  const params: any = { page: 1, size: 999 };
  if (query.name != null && query.name !== '') params.name = query.name;
  if (query.region != null && query.region !== '') params.region = query.region;

  const [reportRes, scheduleRes] = await Promise.all([
    getReportListAll(params),
    listScheduledTasks({ enabled: 1, page: 1, size: 999 })
  ]);

  const rows: TableRow[] = [];

  // 运行中的执行
  if (reportRes.data.code === 0) {
    const reports = (reportRes.data.data.list as any[]).filter((r: any) => r.status === 1);
    for (const r of reports) {
      if (query.region && r.region !== query.region) continue;
      rows.push({
        id: 'R-' + r.id,
        testCaseId: r.testCaseId,
        region: r.region || '',
        rowType: 'report',
        execType: r.execType,
        runTime: r.createTime,
        reportId: r.id
      });
    }
  }

  // 定时任务
  if (scheduleRes.data.code === 0) {
    const tasks = scheduleRes.data.data.list as any[];
    for (const t of tasks) {
      let runParam: any = {};
      try { runParam = JSON.parse(t.runParam); } catch { /* ignore */ }
      const region = runParam.region || '';
      if (query.region && region !== query.region) continue;
      if (query.name) {
        const tcName = testcaseNameMap.value[t.testCaseId] || '';
        if (!tcName.includes(query.name)) continue;
      }
      rows.push({
        id: 'S-' + t.id,
        testCaseId: t.testCaseId,
        region,
        rowType: 'scheduled',
        scheduleType: t.scheduleType,
        runTime: t.nextRunAt || '-',
        scheduleId: t.id,
        _scheduleData: t.scheduleData,
        _runParam: t.runParam
      });
    }
  }

  tableData.value = rows;
  total.value = rows.length;
};

onMounted(async () => {
  await loadTestcaseNames();
  getList();
  refreshTimer = setInterval(getList, 15000);
});

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer);
  if (chartTimer) clearInterval(chartTimer);
});

const handleSearch = () => { query.page = 1; getList(); };
const handleReset = () => { query.name = null; query.region = null; getList(); };
const handlePageChange = (val: number) => { query.page = val; };

const handleStop = async (reportId: number) => {
  const res = await stopExecution(reportId);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
  } else {
    ElMessage.success('已停止');
    getList();
  }
};

const handleTriggerNow = async (scheduleId: number) => {
  const res = await triggerScheduledTask(scheduleId);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
  } else {
    ElMessage.success('已触发执行');
    getList();
  }
};

// ---------- 定时任务编辑 ----------
const scheduleVisible = ref(false);
const editingScheduleId = ref<number | null>(null);
const maxSlaveCount = ref(1);
const regionList = ref<string[]>([]);

const scheduleForm = reactive({
  scheduleType: 'once' as string,
  onceDateTime: '' as string,
  dailyTime: '' as string,
  weeklyTime: '' as string,
  daysOfWeek: [] as number[],
  monthlyTime: '' as string,
  dayOfMonth: 1 as number,
  runParam: {
    numThreads: '10',
    rampTime: '0',
    duration: '60',
    slaveCount: 1,
    region: ''
  }
});

const openScheduleEdit = async (row: TableRow) => {
  editingScheduleId.value = row.scheduleId!;
  // Parse schedule_data
  let sd: any = {};
  try { sd = JSON.parse(row._scheduleData || '{}'); } catch { /* ignore */ }
  // Parse run_param
  let rp: any = {};
  try { rp = JSON.parse(row._runParam || '{}'); } catch { /* ignore */ }

  scheduleForm.scheduleType = row.scheduleType || 'once';
  scheduleForm.daysOfWeek = [];
  scheduleForm.dayOfMonth = 1;
  scheduleForm.onceDateTime = '';
  scheduleForm.dailyTime = '';
  scheduleForm.weeklyTime = '';
  scheduleForm.monthlyTime = '';

  if (row.scheduleType === 'once') {
    scheduleForm.onceDateTime = sd.time || '';
  } else if (row.scheduleType === 'daily') {
    scheduleForm.dailyTime = sd.time || '';
  } else if (row.scheduleType === 'weekly') {
    scheduleForm.weeklyTime = sd.time || '';
    scheduleForm.daysOfWeek = sd.daysOfWeek || [];
  } else if (row.scheduleType === 'monthly') {
    scheduleForm.monthlyTime = sd.time || '';
    scheduleForm.dayOfMonth = sd.dayOfMonth || 1;
  }

  scheduleForm.runParam.numThreads = rp.numThreads || '10';
  scheduleForm.runParam.rampTime = rp.rampTime || '0';
  scheduleForm.runParam.duration = rp.duration || '60';
  scheduleForm.runParam.slaveCount = rp.slaveCount || 1;
  scheduleForm.runParam.region = rp.region || '';

  try {
    const [regionRes, countRes] = await Promise.all([
      getRegions(),
      getEnableSlaveCount(rp.region || undefined)
    ]);
    if (regionRes.data.code === 0) regionList.value = regionRes.data.data;
    if (countRes.data.code === 0) maxSlaveCount.value = Math.max(1, countRes.data.data);
  } catch { /* ignore */ }

  scheduleVisible.value = true;
};

const confirmScheduleEdit = async () => {
  let scheduleData: any = {};
  if (scheduleForm.scheduleType === 'once') {
    if (!scheduleForm.onceDateTime) { ElMessage.error('请选择执行时间'); return; }
    scheduleData = { time: scheduleForm.onceDateTime };
  } else if (scheduleForm.scheduleType === 'daily') {
    if (!scheduleForm.dailyTime) { ElMessage.error('请选择执行时间'); return; }
    scheduleData = { time: scheduleForm.dailyTime };
  } else if (scheduleForm.scheduleType === 'weekly') {
    if (!scheduleForm.weeklyTime) { ElMessage.error('请选择执行时间'); return; }
    if (scheduleForm.daysOfWeek.length === 0) { ElMessage.error('请选择执行日'); return; }
    scheduleData = { time: scheduleForm.weeklyTime, daysOfWeek: scheduleForm.daysOfWeek };
  } else if (scheduleForm.scheduleType === 'monthly') {
    if (!scheduleForm.monthlyTime) { ElMessage.error('请选择执行时间'); return; }
    scheduleData = { time: scheduleForm.monthlyTime, dayOfMonth: scheduleForm.dayOfMonth };
  }
  const body = {
    testCaseId: tableData.value.find(r => r.scheduleId === editingScheduleId.value)?.testCaseId,
    scheduleType: scheduleForm.scheduleType,
    scheduleData,
    runParam: {
      numThreads: scheduleForm.runParam.numThreads,
      rampTime: scheduleForm.runParam.rampTime,
      duration: scheduleForm.runParam.duration,
      slaveCount: scheduleForm.runParam.slaveCount,
      region: scheduleForm.runParam.region
    }
  };
  const res = await updateScheduledTask(editingScheduleId.value!, body);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
  } else {
    ElMessage.success('修改成功');
    scheduleVisible.value = false;
    getList();
  }
};

const handleDeleteSchedule = async (scheduleId: number) => {
  await ElMessageBox.confirm('确定删除该定时任务？', '提示', { type: 'warning' });
  const res = await deleteScheduledTask(scheduleId);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
  } else {
    ElMessage.success('已删除');
    getList();
  }
};

const onScheduleRegionChange = async () => {
  scheduleForm.runParam.slaveCount = 1;
  try {
    const res = await getEnableSlaveCount(scheduleForm.runParam.region || undefined);
    if (res.data.code === 0) maxSlaveCount.value = Math.max(1, res.data.data);
  } catch { /* ignore */ }
};

// ---------- 曲线弹窗 ----------
const chartDialogVisible = ref(false);
const currentReportId = ref(0);
let chartTimer: ReturnType<typeof setInterval> | null = null;

const throughputChart = reactive({
  type: 'line' as const,
  title: { text: '吞吐量' },
  bgColor: '#ffffff',
  labels: [] as string[],
  xRorate: 45,
  datasets: [{ label: '单位：/s', data: [] as (string | number)[] }]
});

const responseTimeChart = reactive({
  type: 'line' as const,
  title: { text: '响应时间' },
  bgColor: '#ffffff',
  labels: [] as string[],
  xRorate: 45,
  datasets: [{ label: '单位：ms', data: [] as (string | number)[] }]
});

const fetchChartData = async () => {
  if (!currentReportId.value) return;
  const res = await getJMeterResultByReport(currentReportId.value);
  if (res.data.code !== 0) return;
  const resultData = res.data.data;
  if (resultData.length === 0) {
    throughputChart.labels = [];
    throughputChart.datasets[0].data = ['0'];
    responseTimeChart.labels = [];
    responseTimeChart.datasets[0].data = ['0'];
    return;
  }
  throughputChart.labels = resultData.map((item: any) => item.currentTime);
  throughputChart.datasets[0].data = resultData.map((item: any) => item.throughput);
  responseTimeChart.labels = resultData.map((item: any) => item.currentTime);
  responseTimeChart.datasets[0].data = resultData.map((item: any) => item.avgResponseTime);
};

const openChartDialog = async (reportId: number) => {
  currentReportId.value = reportId;
  chartDialogVisible.value = true;
  await fetchChartData();
  chartTimer = setInterval(fetchChartData, 15000);
};

watch(chartDialogVisible, (visible) => {
  if (!visible) {
    if (chartTimer) { clearInterval(chartTimer); chartTimer = null; }
    currentReportId.value = 0;
  }
});
</script>

<style scoped>
.handle-box { margin-bottom: 20px; }
.handle-input { width: 120px; }
.mr10 { margin-right: 10px; }
.table { width: 100%; font-size: 14px; }
.red { color: #EF5350; }
.bg-blue { color: #409EFF; }
.bg-green { color: #67C23A; }
.pagination { margin-top: 20px; display: flex; justify-content: flex-end; }
.bar-schart { width: 100%; height: 30vh; margin-bottom: 20px; }
</style>
