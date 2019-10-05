<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row" style="height:100vh">
        <!-- contacts -->
        <ContactsComp></ContactsComp>
        <!-- chat -->
        <div class="col-12 col-md-8 p-0">
          <div class="messages d-flex flex-column align-content-between h-100" style="height:100vh !important">
            <!-- chatter info -->
            <div class="header d-flex shadow-sm px-4">
              <img src="../assets/img/user.svg" class="rounded-circle" alt="auth-pic" width="40" />
              <h6
                class="py-4 px-3 mb-0 text-gray-700 font-weight-bold capitalize text-md"
                v-text="contactName"
              ></h6>
            </div>
            <!-- mssg -->
            <div class="msgs flex-fill">
              <div class="chat d-flex flex-column justify-content-center align-items-center">
                <ul class="ul d-flex w-100 h-100 flex-column p-3">
                  <li
                    v-for="msg in allMsg"
                    :key="msg.message"
                    class="Send-msging m-1 wow fadeIn"
                    data-wow-duration="2s"
                    data-wow-delay="0s"
                  >
                    <div
                      v-if="msg.from == userId"
                      class="msging p-2 rounded shadow-sm text-gray-200 font-semibold"
                    >
                      <span
                        v-text="msg.message"
                        class="px-2"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        :title="msg.timestamp"
                      ></span>
                    </div>
                    <div
                      v-else
                      class="msging p-2 rounded shadow-sm float-left recieve text-gray-200 font-semibold"
                    >
                      <span
                        v-text="msg.message"
                        class="px-2"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        :title="msg.timestamp"
                      ></span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- send -->
            <div class="send-msg">
              <form class="w-full">
                <div class="flex items-center border-b border-b-2 border-teal-500 p-2">
                  <textarea
                    v-model="msg"
                    id
                    class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-700"
                    placeholder="Write Your Msg.."
                    rows="1"
                  ></textarea>
                  <button
                    class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button"
                    @click="sendMsg()"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
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
  name: "msg",
  components: {
    ContactsComp
  },
  data() {
    return {
      userName: "",
      userId: firebase.auth().currentUser.uid,
      contactName: "",
      msg: "",
      allMsg: []
    };
  },
  created() {
    this.fetchData();
    // get username
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.userName = doc.data().name;
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    //show side nav
    ShowSide() {
      $(".side").toggleClass("show");
    },
    //send msgs
    sendMsg() {
      if (this.msg !== "") {
        firebase
          .firestore()
          .collection("messages")
          .add({
            userId: firebase.auth().currentUser.uid,
            to: this.$route.params.contact,
            message: this.msg,
            timestamp: Date.now()
          })
          .then(() => {
            this.msg = "";
          });
      }
    },
    //get msgs
    fetchData() {
      // get contact name
      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.contact)
        .get()
        .then(doc => {
          this.contactName = doc.data().name;
        });
      this.msg = "";
      this.allMsg = [];
      // get msgs
      firebase
        .firestore()
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot(querySnapshot => {
          this.allMsg = [];
          querySnapshot.forEach(doc => {
            if (
              doc.data().userId == firebase.auth().currentUser.uid &&
              doc.data().to == this.$route.params.contact
            ) {
              this.allMsg.push({
                from: firebase.auth().currentUser.uid,
                to: this.$route.params.contact,
                message: doc.data().message,
                timestamp: moment(doc.data().timestamp).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )
              });
            } else if (
              doc.data().userId == this.$route.params.contact &&
              doc.data().to == firebase.auth().currentUser.uid
            ) {
              this.allMsg.push({
                from: doc.data().from,
                to: doc.data().userId,
                message: doc.data().message,
                timestamp: moment(doc.data().timestamp).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )
              });
            }
          });
        });
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
    top: 1.5%;
    right: 5%;
    padding: 0.4rem 0.8rem;
    font-size: 25px;
    background: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
    color: white;
    box-shadow: 0 0 10px #8ddad5;
    padding-bottom: 4px;
  }
}
.messages {
  font-family: "Ubuntu", sans-serif;
  background: #f1f1f1;
  height: -webkit-fill-available !important;
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
.ul {
  .Send-msging {
    .msging {
      position: relative;
      background: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
      float: right;
      span {
        max-width: 300px;
        word-break: break-word;
      }
    }
  }
}
.recieve {
  background: linear-gradient(45deg, #88a7ff 0%, #57d1d8 100%) !important;
}
</style>
