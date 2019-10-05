<template>
  <!-- model -->
  <div class="search">
    <form @keyup="searchReasult()">
      <div class="form-group mb-0 relative">
        <div class="col">
          <input
            type="text"
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none search-input"
            placeholder="Type username to find contact"
            v-model="search"
          />
        </div>
        <i class="fas fa-search absolute right-0" style="top:5px"></i>
      </div>
    </form>
    <!-- search result -->
    <div class="reasult m-3">
      <div class="card border-0 shadow mb-2" v-for="result in results" :key="result.id">
        <div class="card-body d-flex rounded" style="background:rgb(239, 239, 239);">
          <router-link :to="result.id" class="contact-link w-100">
            <div class="info float-left">
              <h6 class="p-2 mb-0 text-gray-700 font-weight-bold" v-text="result.data().name"></h6>
            </div>
            <div class="ml-auto float-right">
              <div class="input-group" style="height:38px">
                <div class="input-group-append">
                  <span
                    class="input-group-text border-0 shadow rounded-circle ml-2"
                    style="background:#00cdac;color:white;cursor: pointer;"
                    id="basic-addon2"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Start Msg"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchModel",
  data() {
    return {
      userName: "",
      search: "",
      results: []
    };
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        this.userName = doc.data().name;
      });
  },
  methods: {
    //search reasult
    searchReasult() {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
          this.results = [];
          querySnapshot.forEach(doc => {
            doc.data().name == this.search ? this.results.push(doc) : false;
          });
        });
    },
    //add contact
    addContact(Contact, ContactID) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("contacts")
        .doc(Contact)
        .set({ ContactName: Contact, ContactID: ContactID });
    }
  }
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
