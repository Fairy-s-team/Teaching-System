<template>
  <div id="content">
    <div id="docInfo">
      <div class="setlist">
        <ul>
          <li class="setname setleft">
            <p>工号：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="teaid">{{userInfo.teaId}}</span>
            </div>
          </li>
          <li class="setname setright">
            <p>姓名：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="teaname">{{userInfo.teaName}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="setlist">
        <ul>
          <li class="setname setleft">
            <p>职称：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="title">{{userInfo.title}}</span>
            </div>
          </li>
          <li class="setname setright">
            <p>授予时间：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="pstatustitletime">{{userInfo.titleGivenTime}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="setlist">
        <ul>
          <li class="setname setleft">
            <p>学历：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="education">{{userInfo.edu}}</span>
            </div>
          </li>
          <li class="setname setright">
            <p>毕业院校：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="graSchool">{{userInfo.graSchool}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="setlist">
        <ul>
          <li class="setname setleft">
            <p>政治身份：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="pStatus">{{userInfo.pStatus}}</span>
            </div>
          </li>
          <li class="setname setright">
            <p>出生日期：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="birth">{{userInfo.birth}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="setlist" style="display:;border-bottom:0px">
        <ul>
          <li class="setname setleft">
            <p>工作年限：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="worktime">{{userInfo.workTime}}年</span>
            </div>
          </li>
          <li class="setname setright">
            <p>累计学时：</p>
          </li>
          <li class="setname setinter">
            <div class="organization">
              <span id="workinghours">{{userInfo.workingHours}}课时</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import axios from "axios";
export default {
  name: "NormalContent",
  data() {
    return {
      docData: [],
      userInfo: {
        teaId: "",
        teaName: "",
        birth: new Date(),
        edu: "",
        workTime: 0,
        graSchool: "",
        pStatus: "",
        title: "",
        titleGivenTime: new Date(),
        workingHours: 0,
        currentUserId: store.state.loginData.userId
      }
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      axios
        .get("http://localhost:8090//queryById", {
          params: {
            teacherId: this.currentUserId
          }
        })
        .then(response => {
          this.docData = response.data;
          this.userInfo.teaId = this.docData.teacherId;
          this.userInfo.teaName = this.docData.teacherName;
          this.userInfo.birth = this.docData.birthday;
          this.userInfo.edu = this.docData.education;
          this.userInfo.workTime = this.docData.workTime;
          this.userInfo.graSchool = this.docData.graduateSchool;
          this.userInfo.pStatus = this.docData.politicalStatus;
          this.userInfo.title = this.docData.title;
          this.userInfo.titleGivenTime = this.docData.titleGivenTime;
          this.userInfo.workingHours = this.docData.workingHours;
        })
        //获取失败
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>
