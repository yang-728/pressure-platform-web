<template>
  <v-chart class="chart" :option="chartOption" autoresize />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  DataZoomComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';

use([CanvasRenderer, LineChart, GridComponent, LegendComponent, TooltipComponent, DataZoomComponent]);

interface MetricsItem {
  timestamp: string;
  qps: number;
  avgRt: number;
  p99Rt: number;
  errorRate: number;
  threads: number;
}

const props = defineProps<{
  data: MetricsItem[];
}>();

const chartOption = computed(() => {
  const timestamps = props.data.map((d) => d.timestamp);
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    legend: {
      data: ['QPS', '平均RT', 'P99 RT', '错误率', '线程数'],
      top: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '10%',
      containLabel: true,
    },
    dataZoom: [
      { type: 'inside', start: 0, end: 100 },
      { type: 'slider', start: 0, end: 100, bottom: 0 },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: timestamps,
    },
    yAxis: [
      {
        type: 'value',
        name: 'QPS / 线程数',
        position: 'left',
      },
      {
        type: 'value',
        name: 'RT(ms) / 错误率(%)',
        position: 'right',
      },
    ],
    series: [
      {
        name: 'QPS',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: props.data.map((d) => d.qps),
        itemStyle: { color: '#3B82F6' },
        areaStyle: { opacity: 0.1 },
      },
      {
        name: '平均RT',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: props.data.map((d) => d.avgRt),
        itemStyle: { color: '#10B981' },
      },
      {
        name: 'P99 RT',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: props.data.map((d) => d.p99Rt),
        itemStyle: { color: '#F59E0B' },
      },
      {
        name: '错误率',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: props.data.map((d) => d.errorRate),
        itemStyle: { color: '#EF4444' },
      },
      {
        name: '线程数',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        data: props.data.map((d) => d.threads),
        itemStyle: { color: '#8B5CF6' },
      },
    ],
  };
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 420px;
}
</style>
