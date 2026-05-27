<template>
  <div class="case-generation-page">
    <div class="page-header">
      <div>
        <h2>用例生成</h2>
        <p>通过接口文档、需求文档生成测试产物，生成后先预览和下载，人工审查后再使用。</p>
      </div>
      <el-button type="primary" :icon="Plus" @click="openCreateDrawer">新建生成任务</el-button>
    </div>

    <el-card shadow="never" class="filter-card">
      <el-form :inline="true" :model="query" class="filter-form">
        <el-form-item label="任务类型">
          <el-select v-model="query.generationType" clearable placeholder="全部" style="width: 150px">
            <el-option label="JMeter JMX" value="jmeter_jmx" />
            <el-option label="功能测试用例" value="functional_case" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="query.status" clearable placeholder="全部" style="width: 130px">
            <el-option label="等待中" value="pending" />
            <el-option label="生成中" value="running" />
            <el-option label="成功" value="success" />
            <el-option label="失败" value="failed" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="query.creator" clearable placeholder="创建人" style="width: 140px" />
        </el-form-item>
        <el-form-item label="任务名称">
          <el-input v-model="query.taskName" clearable placeholder="请输入任务名称" style="width: 220px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTasks">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="metric-grid">
      <el-card shadow="never" class="metric-card">
        <div class="metric-label">总任务</div>
        <div class="metric-value">{{ stats.total }}</div>
      </el-card>
      <el-card shadow="never" class="metric-card">
        <div class="metric-label">生成中</div>
        <div class="metric-value running">{{ stats.running }}</div>
      </el-card>
      <el-card shadow="never" class="metric-card">
        <div class="metric-label">成功</div>
        <div class="metric-value success">{{ stats.success }}</div>
      </el-card>
      <el-card shadow="never" class="metric-card">
        <div class="metric-label">失败</div>
        <div class="metric-value failed">{{ stats.failed }}</div>
      </el-card>
    </div>

    <el-card shadow="never" class="table-card">
      <el-table :data="taskData" stripe v-loading="loading" class="case-task-table">
        <el-table-column prop="taskName" label="任务名称" min-width="190" align="center" show-overflow-tooltip>
          <template #default="scope">
            <span class="task-name">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="generationType" label="类型" width="130" align="center">
          <template #default="scope">{{ generationTypeLabel(scope.row.generationType) }}</template>
        </el-table-column>
        <el-table-column prop="inputFilename" label="输入文件" min-width="150" align="center" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="scope">
            <el-tag :type="statusType(scope.row.status)" effect="light">{{ statusLabel(scope.row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="artifactCount" label="产物" width="80" align="center" />
        <el-table-column prop="creator" label="创建人" width="110" align="center" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" width="170" align="center" />
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template #default="scope">
            <div class="table-actions">
              <el-button text type="primary" :icon="View" :disabled="scope.row.artifactCount <= 0" @click="openPreview(scope.row)">产物</el-button>
              <el-button text type="primary" :icon="Document" @click="openLog(scope.row)">日志</el-button>
              <el-button text type="danger" :icon="Delete" @click="deleteTask(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :total="page.total"
          v-model:current-page="page.page"
          v-model:page-size="page.size"
          @current-change="loadTasks"
          @size-change="loadTasks"
        />
      </div>
    </el-card>

    <el-drawer v-model="createDrawer" title="新建生成任务" size="420px" destroy-on-close>
      <el-form ref="createFormRef" :model="createForm" :rules="rules" label-position="top">
        <div class="section-title">基本信息</div>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="createForm.taskName" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="生成类型" prop="generationType">
          <el-select v-model="createForm.generationType" style="width: 100%">
            <el-option label="JMeter JMX 脚本" value="jmeter_jmx" />
            <el-option label="功能测试用例" value="functional_case" />
          </el-select>
        </el-form-item>
        <el-form-item label="输入文档" prop="inputFile">
          <el-upload
            class="upload-block"
            drag
            action=""
            :accept="inputAccept"
            :auto-upload="false"
            :limit="1"
            :on-change="handleInputFileChange"
            :on-remove="handleInputFileRemove"
          >
            <el-icon class="upload-icon"><UploadFilled /></el-icon>
            <div>{{ uploadTip }}</div>
          </el-upload>
        </el-form-item>

        <div class="section-title">{{ createForm.generationType === 'jmeter_jmx' ? 'JMX 参数' : '测试用例参数' }}</div>
        <el-form-item label="输出文件名" prop="outputFilename">
          <el-input v-model="createForm.outputFilename" :placeholder="outputFilenamePlaceholder" />
        </el-form-item>
        <template v-if="createForm.generationType === 'jmeter_jmx'">
          <el-form-item label="输出模式">
            <el-radio-group v-model="createForm.jmxOutputMode" class="jmx-output-mode">
              <el-radio-button label="single">合并一个 JMX</el-radio-button>
              <el-radio-button label="split">按接口单独生成</el-radio-button>
            </el-radio-group>
            <div class="form-tip">按接口单独生成时，输出文件名会作为文件名前缀，最终产物中会出现多个 .jmx 文件。</div>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="协议">
                <el-select v-model="createForm.protocol" style="width: 100%">
                  <el-option label="http" value="http" />
                  <el-option label="https" value="https" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="端口">
                <el-input v-model="createForm.port" placeholder="8080" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Host/IP">
            <el-input v-model="createForm.host" placeholder="可为空，优先从文档识别" />
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="线程数">
                <el-input-number v-model="createForm.threads" :min="1" controls-position="right" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ramp-up 秒">
                <el-input-number v-model="createForm.rampUp" :min="1" controls-position="right" style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="循环次数">
            <el-input-number v-model="createForm.loopCount" :min="1" controls-position="right" style="width: 100%" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="输出格式">
            <el-checkbox-group v-model="createForm.outputFormats" class="output-format-group">
              <el-checkbox label="xlsx">Excel</el-checkbox>
              <el-checkbox label="xmind">XMind</el-checkbox>
            </el-checkbox-group>
            <div class="form-tip">输出文件名作为基础名，选择 XMind 时会生成同名 .xmind 文件。</div>
          </el-form-item>
          <el-form-item label="设计人">
            <el-input v-model="createForm.designer" placeholder="可选，留空则不填充" />
          </el-form-item>
          <el-checkbox v-model="createForm.splitByModule">按模块拆分生成</el-checkbox>
          <el-checkbox v-model="createForm.includeDetailScenarios">覆盖边界值、异常、权限、状态流转等详细场景</el-checkbox>
        </template>

        <div class="section-title">生成选项</div>
        <template v-if="createForm.generationType === 'jmeter_jmx'">
          <el-checkbox v-model="createForm.generateAssertion">生成基础断言</el-checkbox>
          <el-checkbox v-model="createForm.generateCsvParam">生成 CSV 参数化配置</el-checkbox>
        </template>
        <el-form-item label="额外生成要求" class="custom-requirement-field">
          <el-input
            v-model="createForm.customRequirement"
            type="textarea"
            :rows="4"
            maxlength="1000"
            show-word-limit
            :placeholder="customRequirementPlaceholder"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDrawer = false">取消</el-button>
        <el-button type="primary" :loading="creating" @click="submitCreate">开始生成</el-button>
      </template>
    </el-drawer>

    <el-drawer v-model="previewDrawer" :title="previewTitle" size="720px" destroy-on-close>
      <div class="artifact-toolbar">
        <span>已选择 {{ selectedArtifacts.length }} 个产物</span>
        <el-button
          type="primary"
          size="small"
          :disabled="selectedArtifacts.length <= 0"
          @click="downloadSelectedArtifacts"
        >
          下载
        </el-button>
      </div>
      <el-table
        class="artifact-table"
        :data="artifactData"
        stripe
        size="default"
        v-loading="artifactLoading"
        @selection-change="handleArtifactSelectionChange"
      >
        <el-table-column type="selection" width="48" align="center" />
        <el-table-column prop="filename" label="产物文件" min-width="300" show-overflow-tooltip />
        <el-table-column prop="artifactType" label="类型" width="100" align="center" />
        <el-table-column prop="fileSize" label="大小" width="110" align="center">
          <template #default="scope">{{ formatSize(scope.row.fileSize) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="90" align="center">
          <template #default="scope">
            <el-button text type="primary" @click="downloadArtifact(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer v-model="logDrawer" :title="logTitle" size="620px" destroy-on-close>
      <div class="log-box">
        <VirtualTextViewer :content="logContent || '暂无日志'" />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="CaseGeneration">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox, FormInstance, FormRules, UploadFile } from 'element-plus';
import { Delete, Document, Plus, UploadFilled, View } from '@element-plus/icons-vue';
import VirtualTextViewer from '../components/VirtualTextViewer.vue';
import {
  createAiGenerationTask,
  deleteAiGenerationTask,
  downloadAiGenerationArtifact,
  downloadAiGenerationArtifactsZip,
  getAiGenerationArtifacts,
  getAiGenerationLog,
  getAiGenerationStats,
  getAiGenerationTasks,
} from '../api/aiGeneration';

interface TaskItem {
  id: number;
  taskName: string;
  generationType: string;
  inputFilename: string;
  status: string;
  artifactCount: number;
  creator: string;
  createTime: string;
}

interface ArtifactItem {
  id: number;
  artifactType: string;
  filename: string;
  fileSize: number;
}

const loading = ref(false);
const taskData = ref<TaskItem[]>([]);
const page = reactive({ page: 1, size: 10, total: 0 });
const query = reactive({ generationType: '', status: '', creator: '', taskName: '' });
const stats = reactive({ total: 0, pending: 0, running: 0, success: 0, failed: 0 });

const createDrawer = ref(false);
const creating = ref(false);
const createFormRef = ref<FormInstance>();
const createForm = reactive({
  taskName: '',
  generationType: 'jmeter_jmx',
  outputFilename: '',
  protocol: 'http',
  host: '',
  port: '',
  threads: 1,
  rampUp: 1,
  loopCount: 1,
  jmxOutputMode: 'single',
  generateAssertion: true,
  generateCsvParam: false,
  outputFormats: ['xlsx'] as string[],
  designer: '',
  splitByModule: true,
  includeDetailScenarios: true,
  customRequirement: '',
  inputFile: null as File | null,
});

const rules: FormRules = {
  taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  generationType: [{ required: true, message: '请选择生成类型', trigger: 'change' }],
  outputFilename: [{ required: true, message: '请输入输出文件名', trigger: 'blur' }],
  inputFile: [{ required: true, message: '请选择输入文档', trigger: 'change' }],
};

const previewDrawer = ref(false);
const artifactLoading = ref(false);
const artifactData = ref<ArtifactItem[]>([]);
const selectedArtifacts = ref<ArtifactItem[]>([]);
const previewTask = ref<TaskItem | null>(null);
const previewTitle = computed(() => previewTask.value ? `任务产物：${previewTask.value.taskName}` : '任务产物');

const logDrawer = ref(false);
const logTask = ref<TaskItem | null>(null);
const logContent = ref('');
const logTitle = computed(() => logTask.value ? `生成日志：${logTask.value.taskName}` : '生成日志');
const inputAccept = computed(() => createForm.generationType === 'jmeter_jmx' ? '.md' : '.md,.txt,.docx');
const outputFilenamePlaceholder = computed(() => createForm.generationType === 'jmeter_jmx' ? '例如 emm_login.jmx' : '例如 login_cases.xlsx');
const uploadTip = computed(() => createForm.generationType === 'jmeter_jmx'
  ? '选择 Markdown 文件或拖拽上传'
  : '选择 Markdown、TXT、Word 文件或拖拽上传'
);
const customRequirementPlaceholder = computed(() => createForm.generationType === 'jmeter_jmx'
  ? '可填写额外要求，例如：登录接口需要提取 token 并在后续请求 Header 中使用；每个接口增加响应码断言。'
  : '可填写额外要求，例如：重点覆盖登录失败锁定、验证码过期、权限控制、边界值和异常提示。'
);

let refreshTimer: number | undefined;

const generationTypeLabel = (value: string) => {
  if (value === 'jmeter_jmx') return 'JMeter JMX';
  if (value === 'functional_case') return '功能测试用例';
  return value || '-';
};

const statusLabel = (value: string) => {
  const map = { pending: '等待中', running: '生成中', success: '成功', failed: '失败' };
  return map[value] || value || '-';
};

const statusType = (value: string) => {
  if (value === 'success') return 'success';
  if (value === 'failed') return 'danger';
  if (value === 'running') return '';
  return 'info';
};

const formatSize = (size: number) => {
  if (!size) return '0 B';
  if (size < 1024) return `${size} B`;
  return `${(size / 1024).toFixed(1)} KB`;
};

const outputSuffix = () => createForm.generationType === 'jmeter_jmx' ? '.jmx' : '.xlsx';

const replaceInputSuffix = (filename: string) => {
  return filename.replace(/\.(md|txt|docx)$/i, outputSuffix());
};

const loadStats = async () => {
  const res = await getAiGenerationStats();
  if (res.data.code === 0 && res.data.data) {
    Object.assign(stats, res.data.data);
  }
};

const loadTasks = async () => {
  loading.value = true;
  try {
    const res = await getAiGenerationTasks({
      page: page.page,
      size: page.size,
      generationType: query.generationType || undefined,
      status: query.status || undefined,
      creator: query.creator || undefined,
      taskName: query.taskName || undefined,
    });
    if (res.data.code !== 0) {
      ElMessage.error(res.data.message);
      return;
    }
    page.total = res.data.data.total;
    taskData.value = res.data.data.list || [];
  } finally {
    loading.value = false;
  }
};

const refreshPage = async () => {
  await Promise.all([loadStats(), loadTasks()]);
};

const searchTasks = async () => {
  page.page = 1;
  await refreshPage();
};

const resetSearch = async () => {
  query.generationType = '';
  query.status = '';
  query.creator = '';
  query.taskName = '';
  page.page = 1;
  await refreshPage();
};

const openCreateDrawer = () => {
  createForm.taskName = '';
  createForm.outputFilename = '';
  createForm.protocol = 'http';
  createForm.host = '';
  createForm.port = '';
  createForm.threads = 1;
  createForm.rampUp = 1;
  createForm.loopCount = 1;
  createForm.jmxOutputMode = 'single';
  createForm.generateAssertion = true;
  createForm.generateCsvParam = false;
  createForm.outputFormats = ['xlsx'];
  createForm.designer = '';
  createForm.splitByModule = true;
  createForm.includeDetailScenarios = true;
  createForm.customRequirement = '';
  createForm.inputFile = null;
  createDrawer.value = true;
};

const handleInputFileChange = (file: UploadFile) => {
  createForm.inputFile = file.raw || null;
  if (!createForm.taskName && file.name) {
    createForm.taskName = file.name.replace(/\.(md|txt|docx)$/i, '');
  }
  if (!createForm.outputFilename && file.name) {
    createForm.outputFilename = replaceInputSuffix(file.name);
  }
};

const handleInputFileRemove = () => {
  createForm.inputFile = null;
};

const submitCreate = async () => {
  if (!createFormRef.value) return;
  await createFormRef.value.validate(async (valid) => {
    if (!valid) return;
    const suffix = outputSuffix();
    if (!createForm.outputFilename.endsWith(suffix)) {
      ElMessage.warning(`输出文件名必须以 ${suffix} 结尾`);
      return;
    }
    if (createForm.generationType === 'functional_case' && createForm.outputFormats.length <= 0) {
      ElMessage.warning('请至少选择一种输出格式');
      return;
    }
    const formData = new FormData();
    formData.append('taskName', createForm.taskName);
    formData.append('generationType', createForm.generationType);
    formData.append('outputFilename', createForm.outputFilename);
    formData.append('protocol', createForm.protocol);
    formData.append('host', createForm.host);
    formData.append('port', createForm.port);
    formData.append('threads', String(createForm.threads));
    formData.append('rampUp', String(createForm.rampUp));
    formData.append('loopCount', String(createForm.loopCount));
    formData.append('jmxOutputMode', createForm.jmxOutputMode);
    formData.append('generateAssertion', String(createForm.generateAssertion));
    formData.append('generateCsvParam', String(createForm.generateCsvParam));
    formData.append('outputFormats', createForm.outputFormats.join(','));
    formData.append('designer', createForm.designer);
    formData.append('splitByModule', String(createForm.splitByModule));
    formData.append('includeDetailScenarios', String(createForm.includeDetailScenarios));
    formData.append('customRequirement', createForm.customRequirement);
    formData.append('inputFile', createForm.inputFile as File);
    creating.value = true;
    try {
      const res = await createAiGenerationTask(formData);
      if (res.data.code !== 0) {
        ElMessage.error(res.data.message);
        return;
      }
      ElMessage.success('生成任务已创建');
      createDrawer.value = false;
      await refreshPage();
    } finally {
      creating.value = false;
    }
  });
};

watch(
  () => createForm.generationType,
  () => {
    createForm.outputFilename = createForm.inputFile ? replaceInputSuffix(createForm.inputFile.name) : '';
    createForm.jmxOutputMode = 'single';
    createForm.outputFormats = ['xlsx'];
  }
);

const openPreview = async (task: TaskItem) => {
  previewTask.value = task;
  selectedArtifacts.value = [];
  previewDrawer.value = true;
  artifactLoading.value = true;
  try {
    const res = await getAiGenerationArtifacts(task.id);
    if (res.data.code !== 0) {
      ElMessage.error(res.data.message);
      artifactData.value = [];
      return;
    }
    artifactData.value = res.data.data || [];
  } finally {
    artifactLoading.value = false;
  }
};

const handleArtifactSelectionChange = (selection: ArtifactItem[]) => {
  selectedArtifacts.value = selection;
};

const downloadArtifact = async (artifact: ArtifactItem) => {
  const res = await downloadAiGenerationArtifact(artifact.id, artifact.filename);
  if (!res.success) {
    ElMessage.error('下载失败, 请重试');
  }
};

const downloadSelectedArtifacts = async () => {
  if (!previewTask.value || selectedArtifacts.value.length <= 0) {
    ElMessage.warning('请先选择要下载的产物');
    return;
  }
  const artifactIds = selectedArtifacts.value.map((item) => item.id);
  const filename = `${previewTask.value.taskName || previewTask.value.id}_产物.zip`;
  const res = await downloadAiGenerationArtifactsZip(previewTask.value.id, artifactIds, filename);
  if (!res.success) {
    ElMessage.error('批量下载失败, 请重试');
  }
};

const openLog = async (task: TaskItem) => {
  logTask.value = task;
  logDrawer.value = true;
  const res = await getAiGenerationLog(task.id);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
    logContent.value = '';
    return;
  }
  logContent.value = res.data.data || '';
};

const deleteTask = async (task: TaskItem) => {
  await ElMessageBox.confirm(`确认删除生成任务「${task.taskName}」吗？`, '提示', { type: 'warning' });
  const res = await deleteAiGenerationTask(task.id);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
    return;
  }
  ElMessage.success('删除成功');
  await refreshPage();
};

onMounted(async () => {
  await refreshPage();
  refreshTimer = window.setInterval(() => {
    if (taskData.value.some((item) => ['pending', 'running'].includes(item.status))) {
      refreshPage();
    }
  }, 5000);
});

onUnmounted(() => {
  if (refreshTimer) {
    window.clearInterval(refreshTimer);
  }
});
</script>

<style scoped>
.case-generation-page {
  padding: 18px;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}

.page-header h2 {
  margin: 0 0 6px;
  font-size: 22px;
  color: #111827;
}

.page-header p {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.filter-card,
.table-card {
  border-radius: 8px;
  margin-bottom: 14px;
}

.filter-form :deep(.el-form-item) {
  margin-bottom: 0;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.metric-card {
  border-radius: 8px;
}

.metric-label {
  color: #6b7280;
  font-size: 13px;
  margin-bottom: 6px;
}

.metric-value {
  color: #111827;
  font-size: 26px;
  font-weight: 700;
  line-height: 1;
}

.metric-value.running {
  color: #2563eb;
}

.metric-value.success {
  color: #16a34a;
}

.metric-value.failed {
  color: #dc2626;
}

.task-name {
  font-weight: 600;
  color: #1f2937;
}

.table-card :deep(.el-table__cell) {
  vertical-align: middle;
}

.case-task-table :deep(.cell) {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
}

.table-card :deep(.el-table__body .el-table__cell) {
  padding: 10px 0;
}

.table-actions {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 6px;
  white-space: nowrap;
}

.table-actions :deep(.el-button) {
  margin-left: 0;
  padding: 0 4px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  padding-top: 14px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 12px;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
}

.section-title::before {
  content: "";
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: #409eff;
}

.upload-block {
  width: 100%;
}

.upload-block :deep(.el-upload),
.upload-block :deep(.el-upload-dragger) {
  width: 100%;
}

.upload-icon {
  margin-bottom: 8px;
  color: #409eff;
  font-size: 28px;
}

.custom-requirement-field {
  margin-top: 12px;
}

.output-format-group {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 32px;
}

.jmx-output-mode {
  display: flex;
  align-items: center;
  min-height: 32px;
}

.output-format-group :deep(.el-checkbox) {
  margin-right: 0;
}

.form-tip {
  width: 100%;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
}

.artifact-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  margin-bottom: 10px;
  color: #6b7280;
  font-size: 13px;
}

.artifact-table :deep(.el-table__cell) {
  vertical-align: middle;
}

.artifact-table :deep(.cell) {
  display: flex;
  align-items: center;
  min-height: 32px;
}

.artifact-table :deep(th .cell),
.artifact-table :deep(.el-table-column--selection .cell),
.artifact-table :deep(.is-center .cell) {
  justify-content: center;
}

.artifact-table :deep(td .cell) {
  justify-content: flex-start;
}

.artifact-table :deep(.el-table__body .el-table__cell) {
  padding: 10px 0;
}

.log-box {
  height: calc(100vh - 250px);
  margin-top: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}
</style>
