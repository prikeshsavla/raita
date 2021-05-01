<template>
  <div
    class="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mb-3"
  >
    <div class="flex-shrink-0">
      <svg
        class="h-12 w-12"
        height="32"
        viewBox="0 0 16 16"
        version="1.1"
        width="32"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        ></path>
      </svg>
    </div>
    <div>
      <div v-if="repository && Object.keys(repository).length > 0">
        <h4>
          <a
            class="font-bold underline"
            target="_blank"
            :href="repository.owner.html_url"
            >{{ repository.owner.login }}</a
          >
          /
          <a
            class="font-bold underline"
            target="_blank"
            :href="repository.html_url"
            >{{ repository.name }}</a
          >
        </h4>
        <p>
          {{ repository.description }}
        </p>
        <p>
          <a
            class="italic underline"
            target="_blank"
            :href="repository.homepage"
            >{{ getUrl(repository.homepage) }}</a
          >
        </p>

        <p>💻: {{ repository.language }}</p>

        <p>
          ⭐ {{ repository.stargazers_count }} 👀
          {{ repository.subscribers_count }} 🍴 {{ repository.forks }} 💬
          <a class="underline" target="_blank" :href="url + '/issues'">{{
            repository.open_issues
          }}</a>
          📆 {{ formatDate(repository.updated_at) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repository: {},
    };
  },
  props: {
    showHashtags: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    const apiUrl = this.url.replace(
      "https://github.com/",
      "http://api.github.com/repos/"
    );
    this.repository = await fetch(apiUrl).then((r) => r.json());
  },
  methods: {
    getUrl(url) {
      // debugger
      if (url && url != "") {
        const urlObj = new URL(url);
        return urlObj.host + urlObj.pathname;
      }
      return url;
    },
    formatDate(dateString) {
      const dateObj = new Date(dateString);
      return dateObj.toDateString().substring(4, dateObj.toDateString().length);
    },
  },
};
</script>

<style scoped></style>
