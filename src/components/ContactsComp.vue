<template>
  <div class="col-4 p-0 side">
    <div class="contacts shadow-sm h-100 d-flex flex-column container">
      <!-- auth info -->
      <div class="auth p-4">
        <div class="info p-2 d-flex">
          <img src="../assets/img/user.svg" class="rounded-circle" alt="auth-pic" width="50" />
          <h6 class="py-4 px-3 mb-0 text-muted font-weight-bold" v-text="userName"></h6>
          <i
            class="fas fa-sign-out-alt ml-auto p-4 out"
            @click="logOut()"
            data-toggle="tooltip"
            data-placement="right"
            title="Sign Out"
          ></i>
        </div>
      </div>
      <!-- contacts -->
      <div class="contacts px-4">
        <!-- header -->
        <div class="header p-4 d-flex">
          <h5 class="mb-0 text-muted">Contacts..</h5>
          <div class="search ml-auto" data-toggle="tooltip" data-placement="right" title="Search">
            <i class="fas fa-search" data-toggle="modal" data-target="#search"></i>
          </div>
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
          class="contact m-2 p-2 px-4 d-flex shadow-sm"
        >
          <router-link
            :to="{ name: 'msg', params: { contact: contact.data().ContactName } }"
            class="contact-link"
          >
            <img src="../assets/img/user.svg" class="rounded-circle" alt="auth-pic" width="30" />
            <h6 class="py-4 px-2 mb-0 font-weight-bold" v-text="contact.data().ContactName"></h6>
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
      contacts: []
    };
  },
  created() {
    this.contacts = [];
    //get userName
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.userName = doc.data().name;
      });
    //get contacts
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("contacts")
      .onSnapshot(querySnapshot => {
        this.contacts = [];
        querySnapshot.forEach(doc => {
          this.contacts.push(doc);
        });
      });
  },
  methods: {
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
@media (max-width: 765px) {
  .side {
    left: -300px;
    max-width: fit-content;
    position: absolute;
    z-index: 1;
    height: 100%;
    box-shadow: 0 0 10px #b2b2b2;
    background: #edededf2;
    transition: 500ms ease;
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
  font-family: "Ubuntu", sans-serif;
  background: #ffffff;
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
    background: rgba(240, 255, 255, 0.274);
    transition: 500ms ease;
    clip-path: circle(100% at 10% 10%);
    &:hover {
      background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);
      clip-path: circle(75%);
    }
  }
}
</style>
