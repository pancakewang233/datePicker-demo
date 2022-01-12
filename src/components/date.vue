<template>
  <el-form>
    <el-form-item label="出生日期：">
      <el-date-picker
        v-model="temp.birth"
        type="date"
        v-date-format
        placeholder="选择日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="放假日期：">
      <el-date-picker
        v-model="temp.holiday"
        type="daterange"
        v-date-format
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    temp: {
      type: Object,
    },
  },
  data() {
    return {
      value1: "",
      value2: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
