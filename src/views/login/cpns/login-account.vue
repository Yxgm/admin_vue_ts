<template>
  <div class="login-account">
    <el-form ref="formRef" :rules="rules" :model="account" label-width="60px">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" prefix-icon="el-icon-user-solid" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          prefix-icon="el-icon-lock"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ElForm } from "element-plus";

import localCache from "../../../utils/cache";
import { rules } from "../config/account-config";
export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? ""
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
        }
        store.dispatch("login/accountLoginAction", { ...account });
      });
    };

    return { account, rules, loginAction, formRef };
  }
});
</script>

<style scoped></style>
