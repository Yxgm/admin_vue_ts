<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs class="eltabs" type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="btn-login" type="success" @click="handleLoginClick">
      立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const currentTab = ref<string>("account");
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    // 定义方法
    const handleLoginClick = () => {
      if (currentTab.value === "account") {
        accountRef.value?.loginAction(isKeepPassword.value);
      } else {
        console.log("phone登录，在去login-phone中");
      }
    };
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phoneRef
    };
  }
});
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 450px;
}
.title {
  text-align: center;
}
.btn-login {
  width: 450px;
}
.account-control {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
}

.eltabs {
  width: 450px;
}
</style>
