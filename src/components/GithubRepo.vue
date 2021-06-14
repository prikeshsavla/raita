<template>
  <div
    class="
      p-6
      max-w-lg
      mx-auto
      bg-white
      rounded-xl
      shadow-md
      flex
      items-center
      space-x-4
      mb-3
    "
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
      <div
        v-if="repository && Object.keys(repository).length > 0"
        contenteditable="true"
        class="max-w-xs"
      >
        <h4>
          <a
            class="font-bold underline"
            target="_blank"
            :href="repository.html_url"
            >{{ repository.name }}</a
          >
          by
          <a class="underline" target="_blank" :href="ownerURL"
            >@{{ ownerLabel }}</a
          >
        </h4>
        <p>
          {{ repository.description }}
        </p>

        <p>
          💻: {{ repository.language }}
          <br />
          ⭐ {{ repository.stargazers_count }} 👀
          {{ repository.subscribers_count }} 🍴 {{ repository.forks }} 🚧
          <a class="underline" target="_blank" :href="url + '/issues'">{{
            repository.open_issues
          }}</a>
        </p>
        <p>
          <a
            class="italic underline"
            target="_blank"
            :href="repository.homepage"
            >Read More >>>
          </a>
          <br /><br />
          <a
            class="italic underline"
            target="_blank"
            :href="repository.html_url"
            >{{ repository.html_url }}</a
          >
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
      owner: {},
      social: false,
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
    const apiURL = this.url.replace(
      "https://github.com/",
      "https://api.allorigins.win/raw?url=http://api.github.com/repos/"
    );
    this.repository = await fetch(apiURL).then((r) => r.json());

    const ownerURL = `${this.repository.owner.url}`;
    this.owner = await fetch(ownerURL).then((r) => r.json());
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
  computed: {
    ownerURL() {
      if (!!this.owner.twitter_username) {
        return `https://twitter.com/${this.owner.twitter_username}`;
      } else if (!!this.owner.blog) {
        return this.owner.blog;
      }

      return this.owner.html_url;
    },
    ownerLabel() {
      return !!this.owner.twitter_username
        ? this.owner.twitter_username
        : this.owner.login;
    },
  },
};
</script>

<style scoped></style>
