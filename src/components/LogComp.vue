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
  name: "logComp"
};
</script>

<style scoped lang="scss">
.searching {
  border: 0;
  min-width: 300px;
  &:focus {
    box-shadow: 0 0 8px gainsboro;
  }
}
.msg {
  display: none;
}
</style>
