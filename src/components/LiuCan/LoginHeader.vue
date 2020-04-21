<template>
  <!-- 页面头部 -->
  <div id="loginHeader">
    <!-- 学校的校名图片-->
    <div id="schoolLogo">
      <img src="../../assets/schoolLogo.png" />
    </div>
    <!-- 文字 -->
    <span id="sysTitle">{{msg}}</span>
  </div>
</template>


<script>
export default {
  name: "LoginHeader",
  data() {
    return {
      msg: "教学质量评估管理系统"
    };
  }
};
</script>

<style>
#loginHeader {
  width: 100%;
  height: 120px;
  position: absolute;
}

#schoolLogo {
  width: 200px;
  height: 50px;
  padding-left: 200px;
  padding-top: 10px;
}

#sysTitle {
  margin-left: 580px;
  color: #76a3c7;
  font-weight: bold;
  padding-top: 0px;
  display: inline-block;
  font-size: 30px;
  width: 400px;
  position: relative;
  font-family: Britannic;
  font-weight: bold;
}
</style>