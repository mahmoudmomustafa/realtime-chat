<template>
  <div class="home">
    <div class="container-fluid wow fadeIn">
      <div class="row" style="height:100vh">
        <!-- contacts -->
        <ContactsComp></ContactsComp>
        <!-- chat -->
        <div class="col-12 col-md-8 p-0">
          <div class="messags p-0 h-100 d-flex flex-column align-content-between">
            <div class="msgs flex-fill">
              <div class="chat d-flex flex-column justify-content-center align-items-center h-100">
                <img src="../assets/img/msg.svg" alt="start-msg" width="200" />
                <h1 class="font-weight-bold text-muted">Chat Messages..</h1>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-sm"
                  @click="ShowSide()"
                >Begin Chat</button>
              </div>
            </div>
          </div>
        </div>
        <div class="msgner position-absolute rounded-full" @click="ShowSide()">
          <i class="fab fa-facebook-messenger"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchComp from "@/components/SearchComp.vue";
import ContactsComp from "@/components/ContactsComp.vue";

export default {
  name: "chat",
  components: {
    SearchComp,
    ContactsComp
  },
  methods: {
    ShowSide() {
      $(".side").toggleClass("show");
      $(".search-input").focus();
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu&display=swap");
.msgner {
  display: none;
}
@media (max-width: 765px) {
  .msgner {
    display: block;
    top: 10%;
    right: 10%;
    padding: 0.4rem 0.8rem;
    font-size: 25px;
    background: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
    color: white;
    box-shadow: 0 0 10px #8ddad5;
    padding-bottom: 4px;
  }
}
.messags {
  font-family: "Ubuntu", sans-serif;
  background: #f1f1f1;
  .msgs {
    overflow: auto;
    background-color: #f6f5f7;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23dbdbdb' fill-opacity='0.29' fill-rule='evenodd'/%3E%3C/svg%3E");
    button {
      background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
      transition: 500ms ease;
      &:hover {
        box-shadow: 0 0 10px #00cdac !important;
      }
    }
  }
}
</style>