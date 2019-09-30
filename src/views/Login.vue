<template>
  <div class="container">
    <div class="wel d-flex justify-content-center align-items-center">
      <!-- error -->
      <div class="toast" v-for="err in errors" :key="err" @click="close()">
        <div class="toast-body" v-text="err"></div>
      </div>
      <div class="col-10 col-md-7 col-lg-5">
        <div class="card">
          <div id="Indicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner p-4">
              <div class="carousel-item first-item active">
                <div class="welcome px-4">
                  <h3 class="font-weight-bold">Sign In</h3>
                </div>
                <img src="../assets/img/sign-in.svg" class="d-block w-100 sign-pic" alt="sign-pic" />
                <!-- form -->
                <form @submit.prevent="login">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control rounded-pill border-0 shadow pl-4"
                      v-model="email"
                      placeholder="Email Address"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control rounded-pill border-0 shadow pl-4"
                      v-model="password"
                      placeholder="Password"
                      autocomplete="off"
                    />
                  </div>
                  <div class="form-group mb-0">
                    <button type="submit" class="btn btn-primary w-100 shadow rounded-pill">Sign In</button>
                    <span class="m-2">
                      Or
                      <router-link to="/auth/register" class="m-2">Create new account.</router-link>
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
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    close() {
      this.errors = [];
    },
    login() {
      // check empty inputs
      if (this.email == "" || this.password == "") {
        this.errors = [];
        this.errors.push("Please fill the fields");
      } else {
        //connect to db
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$router.replace("chat");
          })
          .catch(error => {
            this.errors = [];
            this.errors.push(error.message);
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Mansalva&display=swap");
.wel {
  position: relative;
  height: 100vh;
  background: #ecf2ff;
  font-family: "Mansalva", cursive;
  .card {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0 20px #80808012;
    .carousel-item {
      img {
        height: 250px;
      }
      .text {
        height: 180px;
      }
    }
  }
}
.toast {
  position: absolute;
  top: 5%;
  right: 0px;
  opacity: 1;
  min-width: 240px;
  background: #ff5555;
  box-shadow: 0 0 5px #ff5555;
  color: white;
  z-index: 1;
  animation: fade-in-right 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
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