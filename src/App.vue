<template>
  <div class="container mx-auto">
    <fieldset class="text-center">
      <h1>Github Repo</h1>

      <pre>
        #Opensource #OSS #100DaysofCode #technology #tech #development #code
        #webdevelopment #webdev #webdeveloper #webdevelopers #github
      </pre>
    </fieldset>
    <fieldset class="text-center">
      <label for="" class="font-bold block">Repo URLs on newline</label>

      <textarea
        rows="6"
        class="w-full border-gray-900 border-2 border-b-2 mt-2 max-w-xl"
        placeholder="on Newline URLs"
        @input="addRepo"
      >
      </textarea>
    </fieldset>

    <GithubRepo v-for="url in repos" :key="url" :url="url" />
  </div>
</template>

<script>
import GithubRepo from "./components/GithubRepo.vue";
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

export default {
  components: { GithubRepo },
  data() {
    return {
      repos: [],
      reposInput: "",
    };
  },
  methods: {
    addRepo(repoUrl) {
      this.repos = repoUrl.currentTarget.value
        .split("\n")
        .filter((value) => !!value);
    },
  },
};
</script>

<style></style>
