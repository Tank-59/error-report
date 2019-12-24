<!--错误测试-->
<template>
  <div class="error-test" @click="opps">
    <h2>Error Testing ...</h2>
    <button>oops!</button>
  </div>
</template>
<script>
export default {
  name: 'ErrorTestPage',
  data () {
    return {}
  },
  mounted () {
    this.throwErrTest();
    // this.scriptErr();
  },
  methods: {
    opps () {
      console.log('oops!!');

      this.throwErrTest();
      // this.scriptErr();
      // this.imgError();
      // this.promiseErr();
    },
    throwErrTest () {
      throw new Error('my throw error test');
    },
    scriptErr () {
      const scriptEle = document.createElement('script');
      scriptEle.src = 'https://www.baidu.com/666.js';
      document.appendChild(scriptEle);
    },
    promiseErr () {
      Promise.reject('promise error ooooo');
      return new Promise((resolve, reject) => {
        reject('promise error ooh!!')
      })
    },
    imgError () {
      const img = document.createElement('img');
      img.src = 'https://www.baidu.com/test.jpg';
      document.appendChild(img);
    }
  }
}
</script>
<style scoped>
  .error-test{
    width: 100%;
    /*height: 30px;*/
    line-height: 30px;
    text-align: center;
    background: orangered;
  }
  .error-test button{
    padding: 2px 5px;
  }
</style>
