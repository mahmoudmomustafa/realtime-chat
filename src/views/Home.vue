<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row" style="height:100vh">
        <!-- contacts -->
        <ContactsComp></ContactsComp>
        <!-- chat -->
        <div class="col-12 col-md-8 p-0">
          <div class="messages p-4 h-100 d-flex flex-column align-content-between">
            <div class="msgs flex-fill">
              <div class="chat d-flex flex-column justify-content-center align-items-center h-100">
                <img src="../assets/img/msg.svg" alt="start-msg" width="200" />
                <h1 class="font-weight-bold text-muted">Chat Messages..</h1>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-sm"
                  data-toggle="modal"
                  data-target="#search"
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
  methods:{
    ShowSide(){
      $('.side').toggleClass('show');
    }
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu&display=swap");
.msgner{
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
  }
}
.messages {
  font-family: "Ubuntu", sans-serif;
  background: #f1f1f1;
  .msgs {
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