<template>
  <div class="login-page">
    <!-- Decorative -->
    <div class="grid-bg"></div>
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>
    <div class="orbit-line"></div>

    <!-- Card -->
    <div class="login-card">
      <!-- Brand side -->
      <div class="login-side">
        <div class="brand-stack">
          <div class="brand-mark">
            <svg width="64" height="64" viewBox="0 0 64 64">
              <defs>
                <linearGradient id="loginLogo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#60A5FA"/>
                  <stop offset="1" stop-color="#3B82F6"/>
                </linearGradient>
                <radialGradient id="loginHalo" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stop-color="#60A5FA" stop-opacity="0.4"/>
                  <stop offset="1" stop-color="#60A5FA" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#loginHalo)"/>
              <rect x="14" y="14" width="36" height="36" rx="8" fill="url(#loginLogo)" opacity="0.2"/>
              <path d="M20 44V26l12-8 12 8v18l-12 8-12-8z" stroke="url(#loginLogo)" stroke-width="2" fill="none"/>
              <path d="M32 34v8M28 36h8" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
              <circle cx="32" cy="22" r="2.6" fill="#60A5FA"/>
            </svg>
          </div>
          <h1 class="brand-title">分布式压测平台</h1>
          <p class="brand-sub">M Y S T E R I O U S</p>
          <p class="brand-tagline">
            高并发场景的可视化压测控制台<br/>
            JMeter Cluster · Realtime · Schedule
          </p>
        </div>

      </div>

      <!-- Form side -->
      <div class="login-form-side">
        <div class="form-head">
          <span class="form-eyebrow">— ACCESS</span>
          <h2 class="form-title">欢迎回来</h2>
          <p class="form-desc">请使用工程账号登录控制台</p>
        </div>

        <el-form :model="param" :rules="rules" ref="userLoginForm" class="login-form">
          <el-form-item prop="username">
            <label class="field-wrap">
              <span class="field-label">用户名</span>
              <el-input
                v-model="param.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
                size="large"
              />
            </label>
          </el-form-item>
          <el-form-item prop="password">
            <label class="field-wrap">
              <span class="field-label">密码</span>
              <el-input
                type="password"
                placeholder="请输入密码"
                v-model="param.password"
                :prefix-icon="Lock"
                size="large"
                show-password
                @keyup.enter="userLogin"
              />
            </label>
          </el-form-item>

          <div class="form-aux">
            <el-checkbox v-model="remember">记住我</el-checkbox>
          </div>

          <button type="button" class="login-btn" :class="{ loading }" :disabled="loading" @click="userLogin">
            <span class="lb-text">{{ loading ? '登录中…' : '登 录' }}</span>
            <svg v-if="!loading" class="lb-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            <svg v-else class="lb-spin" width="16" height="16" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="40" stroke-dashoffset="20"/>
            </svg>
          </button>

          <div class="form-foot">
            <span class="ff-line"></span>
            <span class="ff-text">Mysterious 控制台 v3.0</span>
            <span class="ff-line"></span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { Lock, User } from '@element-plus/icons-vue';
import { getCurrentUser, login } from '../api/user';

interface LoginInfo {
  username: string | null;
  password: string | null;
}

const router = useRouter();
const loading = ref(false);
const remember = ref(false);
const param = reactive<LoginInfo>({ username: null, password: null });

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};
const permiss = usePermissStore();

const userLogin = async () => {
  loading.value = true;
  try {
    const res = await login(param);
    const code = res.data.code;
    if (code != 0) {
      ElMessage.error(res.data.message);
      return false;
    }
    const token = res.data.data;
    localStorage.setItem('token', token);
    ElMessage.success('登录成功');
    const current = await getCurrentUser();
    if (current.data.code !== 0) {
      ElMessage.error(current.data.message);
      return false;
    }
    const user = current.data.data;
    localStorage.setItem('ms_username', user.username);
    localStorage.setItem('ms_role_code', user.roleCode || '');
    localStorage.setItem('ms_role_name', user.roleName || '');
    const keys = user.permissions || [];
    permiss.handleSet(keys);
    router.push('/');
  } finally {
    loading.value = false;
  }
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(160deg, #F4F6FB 0%, #E8EEF8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Decorative */
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 50% 50%, #000 25%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 25%, transparent 80%);
  pointer-events: none;
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
  background: radial-gradient(circle, rgba(59, 130, 246, 0.35), transparent 60%);
  animation: glow-float-1 12s ease-in-out infinite;
}
.glow-2 {
  bottom: -20%; right: -10%;
  width: 60%; height: 80%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.25), transparent 60%);
  animation: glow-float-2 16s ease-in-out infinite;
}
@keyframes glow-float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, 40px) scale(1.1); }
}
@keyframes glow-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -20px) scale(1.05); }
}
.orbit-line {
  position: absolute;
  left: 50%; top: 50%;
  width: 800px; height: 800px;
  margin-left: -400px; margin-top: -400px;
  border-radius: 50%;
  border: 1px dashed rgba(59, 130, 246, 0.12);
  animation: orbit-rotate 60s linear infinite;
  pointer-events: none;
}
@keyframes orbit-rotate {
  to { transform: rotate(360deg); }
}

/* Card */
.login-card {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 380px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 18px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 40px 80px -20px rgba(15, 23, 42, 0.16),
    0 0 0 1px rgba(15, 23, 42, 0.04);
  overflow: hidden;
  width: 880px;
  min-height: 480px;
  animation: card-in 700ms cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes card-in {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@media (max-width: 880px) {
  .login-card {
    grid-template-columns: 1fr;
    width: min(420px, calc(100vw - 32px));
    min-height: auto;
  }
  .login-side { display: none; }
}

/* Brand side */
.login-side {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background:
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.06), transparent 50%),
    linear-gradient(180deg, transparent 0%, rgba(248, 250, 253, 0.6) 100%);
  position: relative;
}
.login-side::after {
  content: '';
  position: absolute;
  right: 0; top: 24px; bottom: 24px;
  width: 1px;
  background: linear-gradient(180deg, transparent, var(--color-border), transparent);
}

.brand-stack { display: flex; flex-direction: column; gap: 4px; }
.brand-mark {
  width: 64px; height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.brand-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--color-fg);
  margin: 0;
  letter-spacing: -0.01em;
}
.brand-sub {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-fg-tertiary);
  letter-spacing: 0.4em;
  margin: 4px 0 16px;
  font-weight: 500;
}
.brand-tagline {
  font-size: 13px;
  color: var(--color-fg-secondary);
  line-height: 1.7;
  margin: 0;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
  padding: 16px 0;
  border-top: 1px solid var(--color-border-light);
}
.bs-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.bs-val {
  font-family: var(--font-mono);
  font-size: 20px;
  font-weight: 700;
  color: var(--color-fg);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.bs-val small {
  font-size: 12px;
  color: var(--color-fg-tertiary);
  font-weight: 500;
  margin-left: 1px;
}
.bs-lbl {
  font-size: 11px;
  color: var(--color-fg-tertiary);
}
.bs-sep {
  width: 1px;
  height: 32px;
  background: var(--color-border);
}

/* Form side */
.login-form-side {
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
}
.form-head { margin-bottom: 24px; }
.form-eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-primary);
  letter-spacing: 0.2em;
  font-weight: 600;
}
.form-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-fg);
  margin: 6px 0 6px;
}
.form-desc {
  font-size: 13px;
  color: var(--color-fg-secondary);
  margin: 0;
}

.login-form { width: 100%; }
.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-fg-secondary);
}

.form-aux {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -8px;
  margin-bottom: 8px;
}
.forgot {
  font-size: 12px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}
.forgot:hover { text-decoration: underline; }

.login-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px;
  background: linear-gradient(180deg, var(--color-brand-600) 0%, var(--color-brand-700) 100%);
  color: #fff;
  border: 1px solid var(--color-brand-700);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 200ms;
  font-family: inherit;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.16) inset,
    0 8px 24px -8px rgba(30, 64, 175, 0.4),
    0 1px 2px rgba(30, 64, 175, 0.32);
  position: relative;
  overflow: hidden;
}
.login-btn::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.16), transparent);
  transition: left 600ms;
}
.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.16) inset,
    0 12px 32px -8px rgba(30, 64, 175, 0.48),
    0 2px 4px rgba(30, 64, 175, 0.32);
}
.login-btn:hover:not(:disabled)::before {
  left: 100%;
}
.login-btn:hover:not(:disabled) .lb-arrow {
  transform: translateX(2px);
}
.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.lb-arrow {
  transition: transform 200ms;
}
.lb-spin {
  animation: lb-spin 800ms linear infinite;
}
@keyframes lb-spin {
  to { transform: rotate(360deg); }
}

.form-foot {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-fg-tertiary);
  letter-spacing: 0.08em;
}
.ff-line {
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

/* Element Plus refinements (scoped) */
:deep(.el-input__wrapper) {
  padding: 6px 12px;
  border-radius: 10px;
}
:deep(.el-form-item) {
  margin-bottom: 18px;
}
:deep(.el-form-item__error) {
  font-size: 11px;
  padding-top: 2px;
}
:deep(.el-checkbox__label) {
  font-size: 12px;
  color: var(--color-fg-secondary);
}
</style>
