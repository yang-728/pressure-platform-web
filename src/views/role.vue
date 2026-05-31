<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="角色名称" class="handle-input mr10"></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
        <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="handleInsert">新增</el-button>
      </div>

      <el-table :data="roleData" stripe class="table" v-loading="loading">
        <el-table-column prop="id" label="编号" width="70" align="center"></el-table-column>
        <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
        <el-table-column label="内置" width="90" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.builtin ? 'warning' : 'success'">{{ scope.row.builtin ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限" min-width="220" align="center">
          <template #default="scope">
            <el-tag v-for="code in scope.row.permissions" :key="code" size="small" style="margin:2px">
              {{ permissionName(code) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="right">
          <template #default="scope">
            <div class="action-group">
              <el-button text type="primary" @click="handleEdit(scope.row)" :disabled="scope.row.code === 'admin'">编辑</el-button>
              <el-button text type="danger" @click="handleDelete(scope.row)" :disabled="scope.row.builtin">删除</el-button>
            </div>
          </template>
        </el-table-column>
        <template #empty><el-empty description="暂无角色数据" /></template>
      </el-table>

      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.page"
            :page-size="query.size"
            :total="total"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog :title="form.id ? '编辑角色' : '新增角色'" v-model="formVisible" width="620px">
      <el-form label-width="90px">
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="导航权限">
          <div class="permission-groups form-permissions">
            <div v-for="group in groupedPermissions" :key="group.group" class="permission-group">
              <div class="permission-group-title">{{ group.group }}</div>
              <el-checkbox-group v-model="form.permissions">
                <el-checkbox v-for="item in group.items" :key="item.code" :label="item.code">
                  {{ item.name }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="formVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRole">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="baseRole">
import { computed, reactive, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Refresh, Search } from '@element-plus/icons-vue';
import { addRole, deleteRole, getPermissionCatalog, getRoleList, updateRole } from '../api/role';

const query = reactive({
  name: null,
  page: 1,
  size: 10
});
const loading = ref(false);
const roleData = ref<any[]>([]);
const total = ref(0);
const permissions = ref<any[]>([]);

const permissionName = (code: string) => permissions.value.find(item => item.code === code)?.name || code;
const groupedPermissions = computed(() => {
  const groups: Record<string, any[]> = {};
  permissions.value.forEach(item => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });
  return Object.keys(groups).map(group => ({
    group,
    items: groups[group].sort((a, b) => a.sort - b.sort)
  }));
});

const loadPermissions = async () => {
  const res = await getPermissionCatalog();
  if (res.data.code === 0) permissions.value = res.data.data || [];
};

const getList = async () => {
  loading.value = true;
  try {
    const res = await getRoleList(query);
    if (res.data.code !== 0) {
      ElMessage.error(res.data.message);
      return;
    }
    roleData.value = res.data.data.list || [];
    total.value = res.data.data.total || 0;
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  query.page = 1;
  if (query.name === '') query.name = null;
  getList();
};

const handleReset = () => {
  query.name = null;
  query.page = 1;
  getList();
};

const handlePageChange = (page: number) => {
  query.page = page;
  getList();
};

const formVisible = ref(false);
const form = reactive({
  id: 0,
  name: '',
  description: '',
  permissions: [] as string[]
});

const handleInsert = () => {
  form.id = 0;
  form.name = '';
  form.description = '';
  form.permissions = [];
  formVisible.value = true;
};

const handleEdit = (row: any) => {
  form.id = row.id;
  form.name = row.name;
  form.description = row.description;
  form.permissions = [...(row.permissions || [])];
  formVisible.value = true;
};

const saveRole = async () => {
  if (!form.name.trim()) {
    ElMessage.warning('请输入角色名称');
    return;
  }
  const res = form.id
    ? await updateRole(form.id, form)
    : await addRole(form);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
    return;
  }
  ElMessage.success(form.id ? '修改成功' : '新增成功');
  formVisible.value = false;
  await getList();
};

const handleDelete = async (row: any) => {
  await ElMessageBox.confirm(`确定删除角色「${row.name}」吗？`, '提示', { type: 'warning' });
  const res = await deleteRole(row.id);
  if (res.data.code !== 0) {
    ElMessage.error(res.data.message);
    return;
  }
  ElMessage.success('删除成功');
  await getList();
};

loadPermissions();
getList();
</script>

<style scoped>
.permission-groups {
  display: grid;
  gap: 14px;
}

.permission-group {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 12px;
}

.permission-group-title {
  color: #303133;
  font-weight: 600;
  margin-bottom: 8px;
}

.permission-group :deep(.el-checkbox) {
  margin-right: 18px;
  margin-bottom: 6px;
}

.form-permissions {
  width: 100%;
}
</style>
