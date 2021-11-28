<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: { ElConfigProvider },
  setup() {
    return { zhCn };
  }
});
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
