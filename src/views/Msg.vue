<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row" style="height:100vh">
        <!-- contacts -->
        <ContactsComp></ContactsComp>
        <!-- chat -->
        <div class="col-12 col-md-8 p-0">
          <div class="messages h-100 d-flex flex-column align-content-between">
            <!-- chatter info -->
            <div class="header d-flex shadow-sm px-4">
              <img src="../assets/img/user.svg" class="rounded-circle" alt="auth-pic" width="40" />
              <h6 class="py-4 px-3 mb-0 text-muted font-weight-bold" v-text="msgReciver"></h6>
            </div>
            <!-- mssg -->
            <div class="msgs flex-fill">
              <div class="chat d-flex flex-column justify-content-center align-items-center h-100">
                <ul class="ul d-flex w-100 h-100 flex-column p-3">
                  <li v-for="msg in allMsg" :key="msg.message" class="Send-msging m-1">
                    <div v-if="msg.to !== userName" class="msging p-2 rounded shadow-sm">
                      <span v-text="msg.message" class="px-2" data-toggle="tooltip" data-placement="bottom" :title="msg.timestamp"></span>
                    </div>
                    <div v-else class="msging p-2 rounded shadow-sm float-left">
                      <span v-text="msg.message" class="px-2" data-toggle="tooltip" data-placement="bottom" :title="msg.timestamp"></span>
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
                    class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="Write Your Msg.."
                    rows="1"
                  ></textarea>
                  <button
                    class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="button"
                    @click="sendMsg(msgReciver)"
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
    sendMsg(msgReciver) {
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
      this.msgReciver = this.$route.params.contact;
      this.msg = "";
      this.allMsg = [];
      firebase
        .firestore()
        .collection("messages")
        .orderBy("timestamp")
        .onSnapshot(querySnapshot => {
          this.allMsg = [];
          querySnapshot.forEach(doc => {
            console.log(doc.data().message)
            if (
              doc.data().userId == firebase.auth().currentUser.uid &&
              doc.data().to == this.$route.params.contact
            ) {
              this.allMsg.push({
                from: doc.data().userId,
                to: doc.data().to,
                message: doc.data().message,
                timestamp: moment(doc.data().timestamp).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )
              });
            }
            if (
              doc.data().userId == this.$route.params.contact &&
              doc.data().to == firebase.auth().currentUser.uid
            ) {
              this.allMsg.push({
                from: doc.data().to,
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
.ul {
  .Send-msging {
    .msging {
      background: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
      float: right;
      span {
        max-width: 300px;
        word-break: break-word;
      }
    }
  }
}
</style>