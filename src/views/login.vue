<template>
  <div class="login-page">
    <div class="login-card">
      <div class="card-header">
        <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#E9EEF6"/>
          <path d="M14 34V20l10-6 10 6v14l-10 6-10-6z" stroke="#1E40AF" stroke-width="2" fill="none"/>
          <path d="M24 26v8M20 28h8" stroke="#64748B" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="24" cy="18" r="2" fill="#3B82F6"/>
        </svg>
        <h1 class="card-title">分布式压测平台</h1>
        <p class="card-subtitle">MYSTERIOUS</p>
      </div>

      <el-form :model="param" :rules="rules" ref="userLogin" size="large" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="param.password"
            :prefix-icon="Lock"
            show-password
            @keyup.enter="userLogin"
          />
        </el-form-item>
        <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="userLogin">
          {{ loading ? '登录中...' : '登 录' }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { login } from '../api/user';

interface LoginInfo {
  username: string | null;
  password: string | null;
}

const router = useRouter();
const loading = ref(false);
const param = reactive<LoginInfo>({ username: null, password: null });

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const permiss = usePermissStore();
const userLogin = () => {
  loading.value = true;
  login(param).then(res => {
    loading.value = false;
    const code = res.data.code;
    if (code != 0) {
      ElMessage.error(res.data.message);
      return false;
    }
    const token = res.data.data;
    localStorage.setItem('token', token);
    ElMessage.success('登录成功');
    localStorage.setItem('ms_username', param.username!);
    const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'demo'];
    permiss.handleSet(keys);
    localStorage.setItem('ms_keys', JSON.stringify(keys));
    router.push('/');
  }).catch(() => { loading.value = false; });
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #F0F2F5;
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(30,64,175,0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.05) 0%, transparent 50%);
}
.login-card {
  width: 420px;
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 10px 30px rgba(0,0,0,0.08);
  padding: 48px 44px 40px;
}
.card-header {
  text-align: center;
  margin-bottom: 36px;
}
.card-title {
  font-size: 22px;
  font-weight: 700;
  color: #1E293B;
  margin: 16px 0 6px;
  letter-spacing: 1px;
}
.card-subtitle {
  font-size: 11px;
  color: #94A3B8;
  letter-spacing: 4px;
  margin: 0;
}
.login-form {
  margin-top: 8px;
}
.login-btn {
  width: 100%;
  height: 44px;
  font-size: 15px;
  letter-spacing: 6px;
  margin-top: 8px;
}
:deep(.el-form-item) {
  margin-bottom: 20px;
}
</style>
