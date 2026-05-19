<template>
  <div class="app-tags" v-if="tags.show">
    <div class="tags-list">
      <span
        v-for="(item, index) in tags.list"
        :key="index"
        :class="['tag-item', { active: isActive(item.path) }]"
      >
        <router-link :to="item.path" class="tag-link">{{ item.title }}</router-link>
        <el-icon :size="14" class="tag-close" @click="closeTags(index)"><Close /></el-icon>
      </span>
    </div>
    <div class="tags-actions">
      <el-dropdown @command="handleTags" size="small">
        <el-button size="small">
          标签选项<el-icon :size="12" style="margin-left:4px"><ArrowDown /></el-icon>
        </el-button>
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
  padding: 0 var(--space-3);
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
}
.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  font-size: var(--text-xs);
  color: var(--color-fg-secondary);
  background: var(--color-bg-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}
.tag-item:hover {
  color: var(--color-fg);
}
.tag-item.active {
  color: #FFFFFF;
  background: var(--color-primary);
  border-color: var(--color-primary);
}
.tag-link {
  color: inherit;
  text-decoration: none;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tag-close {
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}
.tag-close:hover { opacity: 1; }
.tags-actions {
  flex-shrink: 0;
  padding-left: var(--space-3);
}
.tags-list::-webkit-scrollbar { height: 2px; }
.tags-list::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 1px;
}
</style>
