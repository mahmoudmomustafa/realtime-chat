<template>
  <div class="col-4 p-0 side">
    <div class="contacts shadow-sm h-100 d-flex flex-column container">
      <!-- auth info -->
      <div class="auth p-4">
        <div class="info p-2 d-flex relative">
          <img
            src="../assets/img/user.svg"
            class="rounded-circle"
            alt="auth-pic"
            style="width:calc(2vw + 30px);"
          />
          <div class="div px-3 flex flex-col justify-center">
            <h6
              class="mb-0 text-gray-700 font-weight-bold capitalize text-lg"
              v-text="userName"
              style="font-size: calc(1vw + 8px);"
              @click="filter()"
            ></h6>
            <span
              class="text-gray-600 font-semibold italic text-sm"
              v-text="userMail"
              style="font-size:calc(1vw + 2px)"
            ></span>
          </div>
          <i
            class="fas fa-sign-out-alt ml-auto absolute right-0 out text-lg"
            @click="logOut()"
            data-toggle="tooltip"
            data-placement="right"
            title="Sign Out"
            style="top:15px"
          ></i>
        </div>
      </div>
      <!-- contacts -->
      <div class="contats px-4">
        <!-- header -->
        <div class="header p-4 pb-0 d-flex">
          <h5 class="mb-0 text-gray-500 italic">Contacts..</h5>
        </div>
        <SearchComp></SearchComp>
      </div>
      <div v-if="contacts == ''" class="contact m-2 p-2 px-4">
        <h6 class="py-4 px-2 mb-0 text-muted font-weight-bold">No contacts yet..</h6>
      </div>
      <div v-else class="conts flex-fill">
        <div
          v-for="contact in contacts"
          :key="contact.ContactName"
          class="contact m-2 p-2 px-4 d-flex shadow-sm wow fadeIn border-l-2 border-gray-600"
          data-wow-duration="2s"
          data-wow-delay="0s"
        >
          <router-link :to="contact.ContactID" class="contact-link">
            <img src="../assets/img/user.svg" class="rounded-circle" alt="auth-pic" width="30" />
            <h6
              class="py-4 px-2 mb-0 text-gray-600 font-semibold italic capitalize"
              v-text="contact.ContactName"
            ></h6>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchComp from "@/components/SearchComp.vue";

export default {
  name: "contactsComp",
  components: {
    SearchComp
  },
  data() {
    return {
      userName: "",
      userMail: "",
      contacts: []
    };
  },
  created() {
    //get userName
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.userName = doc.data().name;
        this.userMail = firebase.auth().currentUser.email;
      });
    //get msgs
    firebase
      .firestore()
      .collection("messages")
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().userId == firebase.auth().currentUser.uid) {
            this.user(doc.data().to);
          } else if (doc.data().to == firebase.auth().currentUser.uid) {
            this.user(doc.data().userId);
          }
        });
      });
  },
  methods: {
    filter(arr, comp) {
      const unique = arr
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);
      this.contacts = unique
    },
    user(user) {
      firebase
        .firestore()
        .collection("users")
        .doc(user)
        .get()
        .then(doc => {
          this.contacts.push({
            ContactName: doc.data().name,
            ContactID: doc.id
          });
          this.filter(this.contacts, "ContactID");
        });
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("auth");
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped lang="scss">
h6 {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.div {
  min-width: max-content;
}
@media (max-width: 765px) {
  .side {
    left: -3000px;
    max-width: 50%;
    position: absolute;
    z-index: 1;
    height: 100vh;
    box-shadow: 0 0 10px #b2b2b2;
    background: #edededf2;
    transition: 800ms ease;
    min-width: min-content;
  }
}
.show {
  left: 0% !important;
}
.out {
  &:hover {
    color: rgb(255, 65, 65);
    cursor: pointer;
  }
}
.contact-link {
  display: flex;
  text-decoration: none;
  color: #6c757d;
}
.contacts {
  // min-width: 80%;
  font-family: "Ubuntu", sans-serif;
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  .search {
    color: #8e8e8e;
    cursor: pointer;
    &:hover {
      color: #19d0b3;
    }
  }
}
.conts {
  max-height: calc(90vh - 10rem);
  overflow-y: auto;
  .contact {
    background: #f0ffff0d;
    transition: 500ms ease;
    clip-path: circle(100% at 10% 10%);
    &:hover {
      background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
      clip-path: circle(75%);
    }
  }
}
</style>
