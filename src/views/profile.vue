<template>
  <div class="profile-page">
    <!-- Left: User Card -->
    <div class="profile-left">
      <div class="user-card">
        <div class="user-avatar-section">
          <div class="avatar-ring">
            <div class="avatar-large">{{ avatarLetter }}</div>
          </div>
          <h3 class="user-name">{{ currentUser.username || '-' }}</h3>
          <span class="user-role">{{ userRole }}</span>
        </div>

        <div class="user-meta-list">
          <div class="meta-item">
            <span class="meta-label">编号</span>
            <span class="meta-value mono">{{ currentUser.id || '-' }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">姓名</span>
            <span class="meta-value">{{ currentUser.realName || '-' }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">登录时间</span>
            <span class="meta-value">{{ currentUser.effectTime || '-' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Tabs -->
    <div class="profile-right">
      <div class="profile-tabs">
        <div
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key"
        >
          <el-icon :size="16"><component :is="tab.icon" /></el-icon>
          <span>{{ tab.label }}</span>
        </div>
      </div>

      <!-- Tab: Basic Info -->
      <div v-show="activeTab === 'info'" class="tab-panel">
        <div class="panel-header">
          <h4>基本信息</h4>
          <p class="panel-desc">您的账户基本信息，部分字段由系统管理员维护</p>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">用户名</span>
            <span class="info-value">{{ currentUser.username || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">姓名</span>
            <span class="info-value">{{ currentUser.realName || '-' }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">角色</span>
            <span class="info-value">
              <span class="state-pill sp-success">{{ userRole }}</span>
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">状态</span>
            <span class="info-value">
              <span class="state-pill sp-success"><span class="sp-dot"></span>正常</span>
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">登录时间</span>
            <span class="info-value mono">{{ currentUser.effectTime || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Tab: Security -->
      <div v-show="activeTab === 'security'" class="tab-panel">
        <div class="panel-header">
          <h4>安全设置</h4>
          <p class="panel-desc">定期修改密码可以保护您的账户安全</p>
        </div>

        <div class="security-form">
          <el-form label-width="100px">
            <el-form-item label="旧密码">
              <el-input
                type="password"
                v-model="pwdForm.oldPassword"
                placeholder="请输入旧密码"
                show-password
              />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input
                type="password"
                v-model="pwdForm.newPassword"
                placeholder="请输入新密码"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认新密码">
              <el-input
                type="password"
                v-model="pwdForm.confirmPassword"
                placeholder="请再次输入新密码"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savePassword">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Profile">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { getCurrentUser, updatePassword } from '../api/user';
import { usePermissStore } from '../store/permiss';

const router = useRouter();
const permiss = usePermissStore();

interface UserItem {
  id: number;
  username: string;
  password: string;
  realName: string;
  roleName: string;
  roleCode: string;
  permissions: string[];
  effectTime: string;
  expireTime: string;
}

const username = localStorage.getItem('ms_username') || '';
const avatarLetter = computed(() => username.charAt(0).toUpperCase());
const userRole = computed(() => currentUser.value.roleName || localStorage.getItem('ms_role_name') || '-');

const currentUser = ref<Partial<UserItem>>({});
const loading = ref(false);

const loadCurrentUser = async () => {
  if (!username) return;
  loading.value = true;
  try {
    const res = await getCurrentUser();
    if (res.data.code === 0 && res.data.data) {
      currentUser.value = res.data.data;
      const permissions = res.data.data.permissions || [];
      localStorage.setItem('ms_role_code', res.data.data.roleCode || '');
      localStorage.setItem('ms_role_name', res.data.data.roleName || '');
      permiss.handleSet(permissions);
    }
  } catch {
    currentUser.value = { username };
  } finally {
    loading.value = false;
  }
};
onMounted(loadCurrentUser);

const tabs = [
  { key: 'info', label: '基本信息', icon: User },
  { key: 'security', label: '安全设置', icon: Lock },
];
const activeTab = ref('info');

const pwdForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const savePassword = async () => {
  if (!pwdForm.value.oldPassword) {
    ElMessage.warning('请输入旧密码');
    return;
  }
  if (!pwdForm.value.newPassword) {
    ElMessage.warning('请输入新密码');
    return;
  }
  if (pwdForm.value.newPassword !== pwdForm.value.confirmPassword) {
    ElMessage.warning('两次输入的新密码不一致');
    return;
  }
  try {
    const res = await updatePassword({
      id: currentUser.value.id || 0,
      oldPassword: pwdForm.value.oldPassword,
      newPassword: pwdForm.value.newPassword,
    });
    if (res.data.code !== 0) {
      ElMessage.error(res.data.message || '修改失败');
      return;
    }
    ElMessage.success('密码修改成功，请重新登录');
    pwdForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' };
    // 修改密码后 token 已失效，清理并跳转登录页
    localStorage.removeItem('token');
    localStorage.removeItem('ms_username');
    localStorage.removeItem('ms_keys');
    router.push('/login');
  } catch {
    ElMessage.error('修改失败，请重试');
  }
};
</script>

<style scoped>
.profile-page {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 960px) {
  .profile-page {
    grid-template-columns: 1fr;
  }
}

/* Left Card */
.user-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md), var(--shadow-inner-light);
  overflow: hidden;
}
.user-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 24px;
  background:
    radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%),
    linear-gradient(180deg, var(--color-bg-subtle) 0%, var(--color-bg-card) 100%);
  border-bottom: 1px solid var(--color-border-light);
}
.avatar-ring {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #60A5FA, #3B82F6);
  margin-bottom: 16px;
}
.avatar-large {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, #93C5FD, #60A5FA);
  color: #fff;
  font-size: 36px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid var(--color-bg-card);
}
.user-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-fg);
  margin: 0 0 6px;
}
.user-role {
  font-size: 12px;
  color: var(--color-fg-tertiary);
  padding: 2px 10px;
  background: var(--color-bg-muted);
  border-radius: 999px;
}

.user-meta-list {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.meta-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
}
.meta-label {
  color: var(--color-fg-tertiary);
}
.meta-value {
  color: var(--color-fg);
  font-weight: 500;
}
.meta-value.mono {
  font-family: var(--font-mono);
  font-size: 12px;
}

/* Right Panel */
.profile-right {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md), var(--shadow-inner-light);
  overflow: hidden;
}
.profile-tabs {
  display: flex;
  gap: 4px;
  padding: 12px 20px 0;
  border-bottom: 1px solid var(--color-border-light);
}
.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-fg-secondary);
  cursor: pointer;
  border-radius: 8px 8px 0 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all var(--transition-fast);
}
.tab-item:hover {
  color: var(--color-fg);
  background: var(--color-bg-muted);
}
.tab-item.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  background: rgba(59, 130, 246, 0.06);
}

.tab-panel {
  padding: 24px;
}
.panel-header {
  margin-bottom: 24px;
}
.panel-header h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-fg);
  margin: 0 0 4px;
}
.panel-desc {
  font-size: 13px;
  color: var(--color-fg-tertiary);
  margin: 0;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
@media (max-width: 640px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}
.info-label {
  font-size: 12px;
  color: var(--color-fg-tertiary);
  font-weight: 500;
}
.info-value {
  font-size: 14px;
  color: var(--color-fg);
  font-weight: 600;
}
.info-value .mono {
  font-family: var(--font-mono);
}

/* Security Form */
.security-form {
  max-width: 480px;
}
</style>
