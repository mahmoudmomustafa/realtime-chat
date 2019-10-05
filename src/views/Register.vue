<template>
  <div class="container">
    <div class="wel d-flex justify-content-center align-items-center">
      <!-- error -->
      <div class="toasts position-absolute">
        <div class="toast" v-for="err in errors" :key="err" @click="close()">
          <div class="toast-body position-relative" v-text="err"></div>
        </div>
      </div>
      <div class="col-12 col-md-7 col-lg-5 wow fadeIn">
        <div class="card">
          <div id="Indicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner p-4">
              <div class="carousel-item first-item active">
                <div class="welcome px-4">
                  <h3 class="font-weight-bold">Sign Up</h3>
                </div>
                <img src="../assets/img/sign-up.svg" class="d-block w-100" alt="sign-pic" />
                <!-- form -->
                <form @submit.prevent="register">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="userName"
                      class="form-control rounded-pill border-0 shadow pl-4"
                      placeholder="UserName"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      v-model="email"
                      class="form-control rounded-pill border-0 shadow pl-4"
                      placeholder="Email Address"
                    />
                  </div>
                  <div class="form-row">
                    <div class="form-group col-6">
                      <input
                        type="password"
                        v-model="password"
                        class="form-control rounded-pill border-0 shadow pl-4"
                        placeholder="Password"
                        autocomplete="off"
                      />
                    </div>
                    <div class="form-group col-6">
                      <input
                        type="password"
                        v-model="repassword"
                        class="form-control rounded-pill border-0 shadow pl-4"
                        placeholder="RePassword"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <button
                      type="submit"
                      class="btn btn-primary w-100 shadow rounded-pill"
                      @click="error()"
                    >Sign Up</button>
                    <span class="m-2">
                      Or
                      <router-link to="/login" class="m-2">Having an account.</router-link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      repassword: "",
      errors: []
    };
  },
  methods: {
    close() {
      this.errors = [];
    },
    register() {
      // check empty input
      if (this.email == "" || this.password == "" || this.userName == "") {
        this.errors = [];
        this.errors.push("Please fill the fields");
      } else {
        this.errors = [];
        var re = /^\w+$/;
        if (!re.test(this.userName)) {
          this.errors.push("Invaild UserName.");
        }
        // check user length
        if (this.userName.length < 5) {
          this.errors.push("USerName must be 5 Char at least.");
        }
        // check pass length
        if (this.password.length < 8) {
          // this.errors = [];
          this.errors.push("Passwords must be 8 Char at least.");
        }
        // check pass match
        if (this.password !== this.repassword) {
          this.errors.push("Passwords are not match");
        }
        // connect to db
        else {
          //connect
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              firebase
                .firestore()
                .collection("users")
                .doc(user.user.uid)
                .set({ name: this.userName, email: this.email });
            })
            .then(user => {
              this.$router.replace("chat");
            })
            .catch(error => {
              // Handle Errors here.
              this.erros = [];
              this.erros.push(error.message);
            });
        }
      }
    },
    error() {
      setTimeout(() => {
        // this.errors = [];
      }, 15000);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Mansalva&display=swap");
.wel {
  position: relative;
  height: 100vh;
  font-family: "Mansalva", cursive;
  .card {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0 20px #80808012;
    .carousel-item {
      img {
        height: 200px;
      }
      .text {
        height: 180px;
      }
    }
  }
}
.toasts {
  top: 5%;
  right: 0;
}
.toast {
  top: 5%;
  right: 0px;
  opacity: 1;
  min-width: 240px;
  max-width: 300px;
  background: #ff5555;
  box-shadow: 0 0 5px #ff5555;
  color: white;
  z-index: 1;
  font-family: sans-serif;
  animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  .toast-body::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: black;
    top: 0;
    right: 0;
  }
}
@keyframes fade-in-right {
  0% {
    -webkit-transform: translateX(50px);
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
