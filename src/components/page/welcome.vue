<template>
<div>
  <div>
    <span >
      <div id="a" @click="jumpTouLogin()"><p id="sLeft">用户登录界面</p></div>    
    welcome back!
      <div id="b" @click="jumpToaLogin()"><p id="sRight">管理员登录界面</p></div>
  </span>
  </div>
</div>

</template>

<script>


export default {
//import引入的组件需要注入到对象中才能使用

data() {
//这里存放数据
return {

};
},
//方法集合
methods: {
  //点击span标签跳转到登录页面
  jumpTouLogin() {
    this.$router.push('/uLogin');
  },
  jumpToaLogin() {
    this.$router.push('/aLogin');
  },
},
}
</script>
<style scoped>
#container {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#a{
  padding-top: 3%;
  padding-right: 5%;
  all: revert;
}

#b{
  padding-left: 5%;

  /* 不继承所有样式 */
  all: revert;
}

#sLeft {
  display:inline;
  position: relative; 
  height: 100%;
  color: transparent;
  text-shadow:
    0px 0px 1px rgba(255, 255, 255, .6),
    0px 4px 4px rgba(0, 0, 0, .05);
  z-index: 1;
  font-size: 1rem;
  align-items: center;
  display: flex;
}

#sRight {
  display:inline;
  position: relative;
  /* padding-left: 82%; */
  /* padding-right: 7%; */
  height: 100%;
  color: transparent;
  text-shadow:
    0px 0px 1px rgba(255, 255, 255, .6),
    0px 4px 4px rgba(0, 0, 0, .05);
  z-index: 1;
  font-size: 1rem;
  align-items: center;
  display: flex;
}

div {
  font-family: 'Quicksand', sans-serif;
  margin: 0;
  /* min-height: 100vh; */
  background-color: #e493d0;
  background-image: 
    radial-gradient(closest-side, rgba(235, 105, 78, 1), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgba(243, 11, 164, 1), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgba(254, 234, 131, 1), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 1), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size: 
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
}

/* body::after {
  content: '';
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
} */

span {
  position: relative;
  z-index: 10;
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: transparent;
  text-shadow:
    0px 0px 1px rgba(255, 255, 255, .6),
    0px 4px 4px rgba(0, 0, 0, .05);
  letter-spacing: .2rem;
}

@keyframes movement {
  0%, 100% {
    background-size: 
      130vmax 130vmax,
      80vmax 80vmax,
      90vmax 90vmax,
      110vmax 110vmax,
      90vmax 90vmax;
    background-position:
      -80vmax -80vmax,
      60vmax -30vmax,
      10vmax 10vmax,
      -30vmax -10vmax,
      50vmax 50vmax;
  }
  25% {
    background-size: 
      100vmax 100vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      60vmax 60vmax;
    background-position:
      -60vmax -90vmax,
      50vmax -40vmax,
      0vmax -20vmax,
      -40vmax -20vmax,
      40vmax 60vmax;
  }
  50% {
    background-size: 
      80vmax 80vmax,
      110vmax 110vmax,
      80vmax 80vmax,
      60vmax 60vmax,
      80vmax 80vmax;
    background-position:
      -50vmax -70vmax,
      40vmax -30vmax,
      10vmax 0vmax,
      20vmax 10vmax,
      30vmax 70vmax;
  }
  75% {
    background-size: 
      90vmax 90vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      70vmax 70vmax;
    background-position:
      -50vmax -40vmax,
      50vmax -30vmax,
      20vmax 0vmax,
      -10vmax 10vmax,
      40vmax 60vmax;
  }
}
</style>