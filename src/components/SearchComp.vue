<template>
  <!-- model -->
  <div
    class="modal fade"
    id="search"
    tabindex="-1"
    role="dialog"
    aria-labelledby="searchTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 shadow-sm">
          <form @keyup="searchReasult()">
            <div class="form-group mb-0">
              <div class="col">
                <input
                  type="text"
                  class="form-control searching"
                  placeholder="Type username to find contact"
                  v-model="search"
                />
              </div>
            </div>
          </form>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- search result -->
          <div class="reasult m-3">
            <div class="card border-0 shadow" v-for="result in results" :key="result.id">
              <div class="card-body d-flex rounded" style="background:rgb(239, 239, 239);">
                <div class="info">
                  <h6 class="p-2 mb-0" v-text="result.data().name"></h6>
                </div>
                <div class="ml-auto">
                  <div class="input-group" style="height:38px">
                    <div class="input-group-append">
                      <span
                        class="input-group-text border-0 shadow rounded-circle ml-2"
                        style="background:#00cdac;color:white;cursor: pointer;"
                        id="basic-addon2"
                        @click="addContact(result.data().name)"
                        data-toggle="tooltip"
                        data-placement="right"
                        title="Add Contact"
                      >
                        <i class="fas fa-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
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
            if (doc.data().name == this.search) this.results.push(doc);
          });
        });
    },
    //add contact
    addContact(Contact) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("contacts")
        .doc(Contact)
        .set({ ContactName: Contact});
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
