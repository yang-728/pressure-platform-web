<template>
  <div class="app-tags" v-if="tags.show">
    <div class="tags-list">
      <span
        v-for="(item, index) in tags.list"
        :key="index"
        :class="['tag-chip', { active: isActive(item.path) }]"
      >
        <span v-if="isActive(item.path)" class="tc-dot"></span>
        <router-link :to="item.path" class="tag-link">{{ item.title }}</router-link>
        <span class="tc-close" @click.stop="closeTags(index)" aria-label="关闭标签">
          <el-icon :size="12"><Close /></el-icon>
        </span>
      </span>
    </div>
    <div class="tags-actions">
      <el-dropdown @command="handleTags" size="small">
        <button class="tags-action-btn">
          标签选项<el-icon :size="12" style="margin-left:4px"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagsStore } from '../store/tags';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { Close, ArrowDown } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const isActive = (path: string) => path === route.fullPath;

const tags = useTagsStore();

const closeTags = (index: number) => {
  const delItem = tags.list[index];
  tags.delTagsItem(index);
  const item = tags.list[index] ? tags.list[index] : tags.list[index - 1];
  if (item) {
    delItem.path === route.fullPath && router.push(item.path);
  } else {
    router.push('/');
  }
};

const setTags = (route: any) => {
  const isExist = tags.list.some(item => item.path === route.fullPath);
  if (!isExist) {
    if (tags.list.length >= 8) tags.delTagsItem(0);
    tags.setTagsItem({
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    });
  }
};
setTags(route);
onBeforeRouteUpdate(to => { setTags(to); });

const closeAll = () => {
  tags.clearTags();
  router.push('/');
};
const closeOther = () => {
  const curItem = tags.list.filter(item => item.path === route.fullPath);
  tags.closeTagsOther(curItem);
};
const handleTags = (command: string) => {
  command === 'other' ? closeOther() : closeAll();
};
</script>

<style scoped>
.app-tags {
  grid-area: tags;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
  background: var(--color-tags-bg);
  border-bottom: 1px solid var(--color-tags-border);
  height: var(--tags-height);
  overflow: hidden;
  z-index: var(--z-tags);
}
.tags-list {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  flex: 1;
  height: 100%;
  padding: 6px 0;
}
.tag-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 6px 3px 10px;
  font-size: 12px;
  color: var(--color-fg-secondary);
  background: var(--color-bg-muted);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}
.tag-chip:hover {
  color: var(--color-fg);
  background: var(--color-bg-muted);
}
.tag-chip.active {
  color: var(--color-primary);
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(30, 64, 175, 0.06);
}
.tc-dot {
  width: 6px; height: 6px;
  background: var(--color-brand-500);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.18);
  flex-shrink: 0;
}
.tag-link {
  color: inherit;
  text-decoration: none;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tc-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px; height: 16px;
  border-radius: 3px;
  opacity: 0.5;
  transition: all var(--transition-fast);
  color: inherit;
}
.tc-close:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.06);
}
.tag-chip.active .tc-close:hover {
  background: rgba(59, 130, 246, 0.12);
}
.tags-actions {
  flex-shrink: 0;
  padding-left: var(--space-3);
  border-left: 1px solid var(--color-border-light);
  margin-left: var(--space-2);
}
.tags-action-btn {
  display: inline-flex;
  align-items: center;
  font-family: inherit;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--color-fg-secondary);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.tags-action-btn:hover {
  background: var(--color-bg-muted);
  color: var(--color-fg);
  border-color: var(--color-fg-tertiary);
}
.tags-list::-webkit-scrollbar { height: 2px; }
.tags-list::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 1px;
}
</style>
