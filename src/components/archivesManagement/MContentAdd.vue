
<template>
    <div id="addContent">
        <div id="addBg">
            <el-form 
                ref="form" 
                :model="editObj" 
                label-width="100px" 
                size="medium"
                id="addForm">
                <el-row :gutter="80" class="row">
                    <el-col :span="12">
                        <el-form-item label="教师姓名" class="itemsName">
                            <el-input v-model="editObj.teacherName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期" class="itemsName">
                            <el-date-picker type="date" placeholder="选择出生日期" v-model="editObj.birthday" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row :gutter="80" class="row">
                    <el-col :span="12">
                        <el-form-item label="毕业学校" class="itemsName">
                            <el-input v-model="editObj.graduateSchool"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学历" class="itemsName">
                            <el-select v-model="editObj.education" placeholder="选择学历" class="selectItems">
                                <el-option 
                                    v-for="item in degreeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="80" class="row">
                    <el-col :span="24">
                        <el-form-item label="政治面貌" class="itemsName">
                            <el-radio-group v-model="editObj.politicalStatus" size="medium" id="radioGroup">
                                <el-radio 
                                    v-for="item in pStatusOptions" 
                                    :key="item.value" 
                                    :label="item.value" 
                                    border
                                    class="radioItems">
                                    {{item.label}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="80" class="row">
                    <el-col :span="12">
                        <el-form-item label="职称" class="itemsName">
                            <el-select v-model="editObj.title" placeholder="选择职称" class="selectItems">
                                <el-option 
                                    v-for="item in titleOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="职称授予时间" class="itemsName">
                            <el-date-picker type="date" placeholder="选择授予职称的日期" v-model="editObj.titleGivenTime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="80" class="row">
                    <el-col :span="12">
                        <el-form-item label="工作时间" class="itemsName">
                            <el-date-picker type="date" placeholder="选择开始工作的日期" v-model="editObj.worktime" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="累计授课学时" class="itemsName">
                            <el-input v-model="editObj.workingHours"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="80" class="row">
                    <el-col :span="2" :offset="7">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- {{editObj}} -->
        </div>
    </div>
</template>

<script>
// import eventBus from '../../assets/editEventBus'
export default {
  name: 'MContentAdd',
  data() {
    return {
      titleOptions: [
        { value: '0', label: '教授' },
        { value: '1', label: '副教授' },
        { value: '2', label: '讲师' },
        { value: '3', label: '助教' },
        { value: '4', label: '其他' }
      ],
      degreeOptions: [
        { value: '0', label: '研究生' },
        { value: '1', label: '本科' },
        { value: '2', label: '大专' },
        { value: '3', label: '中专' },
        { value: '4', label: '其他' }
      ],
      pStatusOptions: [
        { value: '0', label: '党员' },
        { value: '1', label: '团员' },
        { value: '2', label: '群众' },
        { value: '3', label: '其他' }
      ]
    }
  },
  props: {
    editObj: {
      type: Object,
      required: true
    }
  },
  
    // this.$watch('editObj', function() {
    //   this.form = this.editObj;
    //   console.log(editObj);
    // });
  methods: {
    onSubmit() {
      console.log('submit!');
      // 向父组件传值
      let editable = false;
      this.$emit('editEnd', editable);
      this.$router.push('./');
      console.log(this.form);
    }
  },
//   getEditData() {
//     eventBus.$on("selectRowData",function(data) {
//     this.editDataObj = data;
//     })
//     console.log("获取到的需要编辑的对象是"+this.editDataObj);
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/archivesManagement.css";
</style>