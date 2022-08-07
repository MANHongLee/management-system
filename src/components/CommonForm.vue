<template>
  <el-form ref="form" :model="form" label-width="100px" :inline="true" >
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-model="form[item.modle]"
        :placeholder="`请输入${item.label}`"
        v-if="item.modle === 'name'"
        clearable
        maxlength=20
      ></el-input>
      <el-input
        v-model="form[item.modle]"
        :placeholder="`请输入${item.label}`"
        v-if="item.modle === 'age'"
        clearable
        :onkeyup="form[item.modle]=form[item.modle].replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
      ></el-input>
      <el-input
        v-model="form[item.modle]"
        :placeholder="`请输入${item.label}`"
        v-if="item.modle === 'address'"
        style="width: 520px;"
        clearable
      ></el-input>
      <el-select
        v-model="form[item.modle]"
        :placeholder="`请输入${item.label}`"
        v-if="item.modle === 'sex'"
        clearable
      >
        <el-option
          v-for="opt in item.options"
          :key="opt"
          :label="opt"
          :value="opt"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="form[item.modle]"
        :placeholder="`请输入${item.label}`"
        v-if="item.type === 'date'"
        clearable
        value-format = yyyy-MM-dd
      ></el-date-picker>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    formLabel: Array,
    form: Object,
  },
  data() {
    return {
      // form: {},
      // temp : this.form,
    };
  },
  methods: {
    resetForm (){
      // this.form = {}
      // console.log(this.chartData.form);
      // this.$refs['form'].resetFields()
    }
  }
};
</script>

<style lang="less" scoped>
</style>