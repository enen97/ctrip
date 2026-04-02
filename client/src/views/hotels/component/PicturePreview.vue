<template>
  <el-dialog v-model="dialogVisible" title="图片详情" width="90%" class="hotel-gallery-dialog" destroy-on-close>
    <div class="gallery-container">
      <el-tabs v-model="activeTab" class="gallery-tabs">
        <el-tab-pane label="酒店上传" name="hotel" />
        <el-tab-pane label="用户上传" name="user" />
      </el-tabs>

      <div class="main-content">
        <div class="image-scroll-view" ref="scrollContainer" @scroll="handleScroll">
          <div 
            v-for="group in currentImages" 
            :key="group.id" 
            :id="'group-' + group.id"
            class="image-group"
          >
            <h3 class="group-title">{{ group.name }}</h3>
            <div class="image-grid">
              <el-image 
                v-for="(url, index) in group.list" 
                :key="index" 
                :src="url" 
                lazy
                :preview-src-list="allUrls"
                :initial-index="getAllIndex(url)"
              />
            </div>
          </div>
        </div>

        <div class="side-nav">
          <div 
            v-for="group in currentImages" 
            :key="group.id"
            :class="['nav-item', activeGroupId === group.id ? 'is-active' : '']"
            @click="scrollToGroup(group.id)"
          >
            <el-icon><Picture /></el-icon>
            <span>{{ group.name }} ({{ group.list.length }})</span>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Picture } from '@element-plus/icons-vue';

const dialogVisible = ref(true);
const activeTab = ref('hotel');
const scrollContainer = ref(null);
const activeGroupId = ref('精选');

// 模拟数据结构
const hotelImages1 = [
  { id: '精选', name: '精选', list: ['https://dimg04.c-ctrip.com/images/0232t12000puj6rg8D1AA_R_600_400_R5.webp', 'url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6'] },
  { id: '外观', name: '外观', list: ['url7', 'url8'] },
  { id: '房间', name: '房间', list: ['url9', 'url10', 'url11','url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6','url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6','url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6','url1', 'url2', 'url3', 'url4', 'url5', 'url6'] },
];

const hotelImages2 = [
  { id: '精选1', name: '精选1', list: ['url1', 'url2', 'url3'] },
  { id: '外观1', name: '外观1', list: ['url7', 'url8'] },
  { id: '房间1', name: '房间1', list: ['url9'] },
];

const currentImages = computed(() => {
  // 根据 activeTab 切换数据源
  return activeTab.value === 'hotel' ? hotelImages1 : hotelImages2; 
});

// 点击右侧导航，平滑滚动
const scrollToGroup = (id) => {
  activeGroupId.value = id;
  const element = document.getElementById('group-' + id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// 监听左侧滚动，自动高亮右侧导航
const handleScroll = (e) => {
  const container = e.target;
  const groups = container.querySelectorAll('.image-group');
  groups.forEach((el) => {
    const rect = el.getBoundingClientRect();
    // 当组标题距离容器顶部较近时，切换高亮
    if (rect.top >= 0 && rect.top < 150) {
      activeGroupId.value = el.id.replace('group-', '');
    }
  });
};

// 获取图片在总列表中的索引，用于预览
const allUrls = computed(() => currentImages.value.flatMap(g => g.list));
const getAllIndex = (url) => allUrls.value.indexOf(url);
</script>

<style scoped lang="less">
.gallery-container {
  display: flex;
  flex-direction: column;
  height: 80vh; // 固定高度，使内部可滚动

  .main-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .image-scroll-view {
    flex: 1;
    overflow-y: auto;
    padding-right: 20px;
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); // 三列布局
      gap: 10px;
      margin-bottom: 30px;
      
      .el-image {
        width: 100%;
        height: 180px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }

  .side-nav {
    width: 150px;
    border-left: 1px solid #eee;
    padding-left: 15px;

    .nav-item {
      padding: 10px;
      margin-bottom: 5px;
      cursor: pointer;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #666;

      &:hover { background: #f5f7fa; }
      &.is-active {
        background: #ecf5ff;
        color: #409eff;
        font-weight: bold;
      }
    }
  }
}
</style>