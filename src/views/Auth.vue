<template>
  <div class="container">
    <div class="wel d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-7 col-lg-5 wow fadeIn">
        <div class="card">
          <div id="Indicators" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner px-4 pt-4">
              <div class="carousel-item first-item active">
                <img
                  src="../assets/img/hm.svg"
                  class="d-block w-100 wow fadeInUp"
                  alt="hm-pic"
                  data-wow-duration="2s" data-wow-delay="0s"
                />
                <div
                  class="welcome text text-center d-flex justify-content-center align-items-center"
                >
                  <h3 class="font-weight-bold wow heartBeat" data-wow-duration="2s" data-wow-delay="2s">Haaa !!</h3>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src="../assets/img/welcome-2.svg"
                  class="d-block w-100 wow flipInX" data-wow-duration="1s" data-wow-delay="0s"
                  alt="wel-pic"
                />
                <div
                  class="welcome text text-center d-flex justify-content-center align-items-center flex-column wow zoomInDown" data-wow-duration="1s" data-wow-delay="0s"
                >
                  <h4 class="font-weight-bold">Waait wait wait..</h4>
                  <h3 class="font-weight-bold">Hi!</h3>
                  <h5>Wlecome To Chat app.</h5>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src="../assets/img/ready.svg"
                  class="d-block w-100 wow slideInDown" data-wow-duration="1s" data-wow-delay="0s"
                  alt="ready-pic"
                />
                <div
                  class="welcome text text-center d-flex justify-content-center align-items-center flex-column wow fadeIn" data-wow-duration="1s" data-wow-delay="1s"
                >
                  <h3 class="font-weight-bold mb-3">Ready to try it?!</h3>
                  <div
                    class="d-flex justify-content-center align-items-center flex-row p-1 border rounded-full shadow"
                  >
                    <router-link to="/register">
                      <button
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold py-2 px-4 border-0 hover:border-transparent rounded-full"
                      >
                        Sign Up <i class="fas fa-user-plus"></i>
                      </button>
                    </router-link>
                    <router-link to="/login">
                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Sign In <i class="fas fa-sign-in-alt"></i>
                      </button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <ol class="carousel-indicators position-relative">
              <li
                data-target="#Indicators"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#Indicators" data-slide-to="1"></li>
              <li data-target="#Indicators" data-slide-to="2"></li>
            </ol>
            <!-- btns -->
            <!-- <div class="btns d-flex justify-content-center mb-3 inline-flex">
              <button
                class="pre-btn bg-transparent hover:bg-blue-700 font-bold text-black py-2 px-4 rounded-l shadow"
              >
                <a class="carousel-control-prev" href="#Indicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon w-100" aria-hidden="true">Prev</span>
                </a>
              </button>
              <button
                class="next-btn bg-blue-500 hover:bg-blue-700 font-bold text-black py-2 px-4 shadow rounded-r"
              >
                <a
                  class="carousel-control-next"
                  href="#Indicators"
                  role="button"
                  data-slide="next"
                  style="color:white"
                >
                  <span class="carousel-control-next-icon w-100" aria-hidden="true">Next</span>
                </a>
              </button>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "auth",
  components: {},
  methods: {}
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Mansalva&display=swap");
.wel {
  height: 100vh;
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
.pre-btn,
.next-btn {
  position: relative;
  a {
    width: 100%;
    position: relative;
    color: rgb(66, 66, 66);
    &:hover {
      color: rgb(66, 66, 66);
    }
    span {
      background-image: none;
    }
  }
}
.carousel-indicators li {
  border-radius: 15px;
  height: 8px !important;
  width: 10px !important;
  border-top: 0 !important;
  border-bottom: 0 !important;
  background: #628fe9 !important;
}
.carousel-indicators .active {
  height: 8px !important;
  width: 26px !important;
  box-shadow: 0 0 5px #2568ef;
  background: #2568ef !important;
}
</style>
