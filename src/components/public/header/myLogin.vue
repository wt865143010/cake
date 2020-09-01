<template>
  <div class="loginBox">
    <!--      登录页面-->
    <div class="loginWrap">
      <div class="loginTop" v-show="showTitle">
        <span class="el-icon-user-solid"></span>
        <span>未登录</span>
      </div>
      <div class="loginWay" @click="changeFont" v-show="showWay">
        <h3 @click="toLoginForm">账号密码登录</h3>
        <h3 @click="toPhoneForm">手机验证码登录</h3>
      </div>
      <!--        登录表单-->
      <el-form v-show="showLoginForm" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!--          用户名-->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!--          密码-->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" placeholder="请输入密码" type="password"
                    show-password></el-input>
        </el-form-item>
        <div class="rapid">
          <span>忘记密码</span>
          <p>没有账号？<span @click="toRegister">点击注册</span></p>
        </div>
        <!--          按钮-->
        <div class="btns1">
          <button @click="login">登录</button>
          <button @click="resetLoginForm">重置</button>
        </div>
      </el-form>
    </div>
    <!--      注册表单-->
    <el-form v-show="showRegisterForm" :model="registerForm" :rules="registerFormRules" ref="registerFormRef">
      <h2 class="registerTitle">注册账号</h2>
      <!--          注册用户名-->
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user" v-model="registerForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <!--          设置密码-->
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" v-model="registerForm.password" placeholder="设置密码" type="password"
                  show-password></el-input>
      </el-form-item>
      <!--        确认设置密码-->
      <el-form-item prop="sPassword">
        <el-input prefix-icon="el-icon-lock" v-model="registerForm.sPassword" placeholder="确认密码" type="sPassword"
                  show-password></el-input>
      </el-form-item>
      <div class="rapid">
        <p>已有账号？请<span @click="toLogin">直接登录</span></p>
      </div>
      <!--          按钮-->
      <div class="btns1">
        <button @click="goRegister" plain>注册</button>
        <button @click="resetRegisterForm" plain>重置</button>
      </div>
    </el-form>
    <!--      使用手机验证码登录表单-->
    <el-form v-show="showPhone" :model="phoneForm" :rules="phoneFormRules" ref="phoneFormRef">
      <!--          登录的手机号码-->
      <el-form-item prop="phoneNo">
        <el-input prefix-icon="el-icon-user" v-model="phoneForm.phoneNo" placeholder="手机号"></el-input>
      </el-form-item>
      <!--          图片验证码-->
      <el-form-item prop="imgyz" class="imgyz">
        <el-input prefix-icon="el-icon-picture" v-model="phoneForm.imgyz" placeholder="图片验证码" type="text">
          <template slot="append">
            <img src="static/image/imgyzm.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <!--        手机验证码-->
      <el-form-item prop="phoneyz">
        <el-input prefix-icon="el-icon-phone" v-model="phoneForm.phoneyz" placeholder="手机验证码" type="text">
          <template slot="append">
            <el-button type="danger">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <!--          按钮-->
      <div class="btns1">
        <button plain>登录</button>
        <button @click="resetPhoneForm" plain>重置</button>
      </div>
    </el-form>
    <!--      使用合作网站登录-->
    <div class="login-other">
      <p>使用合作网站账号登录</p>
      <div>
        <img src="static/image/zhi.png" title="支付宝账号登录">
        <img src="static/image/wei.png" title="微博账号登录">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myLogin",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.sPassword !== '') {
            this.$refs.registerFormRef.validateField('sPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 登录表单的数据绑定对象
        loginForm: {
          username: '',
          password: ''
        },
        // 注册表单的数据绑定
        registerForm: {
          username: '',
          password: '',
          sPassword: ''
        },
        // 手机登录表单的数据绑定
        phoneForm: {
          phoneNo: '',
          imgyz: '',
          phoneyz: ''
        },
        // 这是表单的验证规则对象
        loginFormRules: {
          // 验证用户名是否合法
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}
          ],
          // 验证密码是否合法
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
          ]
        },
        registerFormRules: {
          // 验证用户名是否合法
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur'}
          ],
          // 验证密码是否合法
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          sPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        phoneFormRules: {
          phoneNo: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur'}
          ],
          // 验证密码是否合法
          imgyz: [
            {required: true, message: '请输入图片验证码', trigger: 'blur'},
          ],
          phoneyz: [
            {required: true, message: '请输入手机验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur'}
          ]
        },
        // 是否控制可视密码
        showPW: true,
        // 控制登录表单页面和注册表单页面是否显示
        showLoginForm: true,
        showRegisterForm: false,
        showPhone: false,
        showWay: true,
        showTitle: true
      }
    },
    methods: {
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      resetRegisterForm() {
        this.$refs.registerFormRef.resetFields()
      },
      resetPhoneForm() {
        this.$refs.PhoneFormRef.resetFields()
      },
      toRegister() {
        this.showLoginForm = false;
        this.showRegisterForm = true;
        this.showWay = false;
        this.showTitle = false
      },
      toLogin() {
        this.showLoginForm = true;
        this.showRegisterForm = false
        this.showWay = true;
        this.showTitle = true
      },
      toLoginForm() {
        this.showLoginForm = true;
        this.showPhone = false
      },
      toPhoneForm() {
        this.showLoginForm = false;
        this.showPhone = true
      },
      changeFont(e) {
        let siblings = e.target.parentNode.children;
        for (let val of siblings) {
          val.style.fontWeight = '400';
          val.style.color = '#666'
        }
        e.target.style.fontWeight = '900';
        e.target.style.color = '#000';
      },
      // 登录表单预验证，并且提交到服务器检验是否登录成功
      login() {
        this.$refs.loginFormRef.validate(valid => {
          console.log(valid);
          if (!valid) return;
          const result = this.$axios.post('/api/login.do', this.loginForm)
            .then(resp => {
              // console.log(resp)
              // console.log(resp.data)
              if (typeof resp.data == 'string') {
                this.$message.error({
                  message: resp.data,
                  center: true,
                  // offset:200
                })
              } else {
                this.$message.success({
                  message: resp.data[1],
                  center: true
                })
                this.$emit('closeAllBox')
              }
            })
        })
      },
      // 提交注册表单到服务器
      goRegister() {
        this.$refs.registerFormRef.validate(valid => {
          if (!valid) return;
          if (this.sPassword == this.password) {
            let registerUser = {username: this.registerForm.username, password: this.registerForm.password}
            this.$axios.post('/api/register.do', registerUser)
              .then(resp => {
                if (resp.data == '用户名已存在，请重新输入~~') {
                  this.$message.error({
                    message: resp.data,
                    center: true,
                    // offset:200
                  })
                } else {
                  this.$message.success({
                    message: resp.data,
                    center: true,
                    // offset:200
                  });
                  this.registerForm = {username: '', password: '', sPassword: ''};
                  this.showLoginForm = true;
                  this.showRegisterForm = false;
                }
              })
          }
        })
      },

    }
  }
</script>

<style scoped>

  .loginBox {
    width: 380px;
    /*float: right;*/
    /*margin-top: 121px;*/
    /*outline: 1px solid red;*/
    padding: 30px 20px;
    box-sizing: border-box;
    position: fixed;
    z-index: 99;
    background-color: white;
    right: 0;
  }

  .loginTop {
    display: flex;
    justify-content: space-between;
    color: #606060;
    font-size: 14px;
  }

  .loginTop span:nth-child(1) {
    font-size: 20px;
  }

  .loginWay {
    display: flex;
    justify-content: center;
  }

  .loginWay h3 {
    margin: 20px 5px;
    cursor: pointer;
  }

  .loginWay h3:nth-child(2) {
    font-weight: normal;
    color: #666;
  }

  .rapid {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    margin: 20px 0;
  }

  .rapid p {
    margin: 0;
    padding: 0;
  }

  .rapid span {
    color: #48e;
    cursor: pointer;
  }

  .btns1 {
    position: absolute;
    left: 0;
    bottom: -70px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 70px;
  }

  .btns1 button {
    flex: 1;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
  }

  .btns1 button:nth-child(1) {
    background-color: #333;
    color: #fff;
  }

  .btns1 button:nth-child(2) {
    background-color: #ffe32a;
  }

  .imgyz {
    position: relative;
  }

  .imgyz img {
    height: 38px;
    position: absolute;
    top: 0;
    right: 0;
  }

  .login-other {
    text-align: center;
    color: #606060;
    font-size: 14px;
  }

  .login-other img {
    margin: 0 10px;
  }

  .registerTitle {
    margin-top: 0;
  }
</style>
