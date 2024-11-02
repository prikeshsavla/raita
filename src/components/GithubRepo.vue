<template>
  <div
    v-if="repository && Object.keys(repository).length > 0"
    class="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mb-3"
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
      <div contenteditable="true" class="max-w-xs" :id="repository.id">
        <template v-if="tweetView"> <br /><br /> </template>
        <h4>
          <template v-if="tweetView">
            {{ bolder(repository.name) }}
          </template>
          <template v-else>{{ repository.name }}</template>
          by
          {{ ownerLabel }}
        </h4>
        <p>
          {{ repository.description }}
        </p>

        <p>
          💻: {{ repository.language }}
          <br />
          ⭐ {{ makeNumberString(repository.stargazers_count) }} 👀
          {{ makeNumberString(repository.subscribers_count) }} 🍴
          {{ makeNumberString(repository.forks) }} 🚧
          <a class="underline" target="_blank" :href="url + issues">{{
            makeNumberString(repository.open_issues)
          }}</a>
        </p>
        <p>
          <template v-if="tweetView">
            #opensource #100DaysofCode #{{ repository.language }}
            <br />
            <a
              class="italic underline"
              target="_blank"
              :href="repository.html_url"
              >{{ repository.html_url }}</a
            >
          </template>
          <template v-else>
            <a
              class="italic underline"
              target="_blank"
              :href="repository.html_url"
              >Github</a
            >
            &nbsp;|&nbsp;
            <a class="underline" target="_blank" :href="url + '/issues'"
              >Good First Issues</a
            >
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const chars = {
  a: "𝗮",
  b: "𝗯",
  c: "𝗰",
  d: "𝗱",
  e: "𝗲",
  f: "𝗳",
  g: "𝗴",
  h: "𝗵",
  i: "𝗶",
  j: "𝗷",
  k: "𝗸",
  l: "𝗹",
  m: "𝗺",
  n: "𝗻",
  o: "𝗼",
  p: "𝗽",
  q: "𝗾",
  r: "𝗿",
  s: "𝘀",
  t: "𝘁",
  u: "𝘂",
  v: "𝘃",
  w: "𝘄",
  x: "𝘅",
  y: "𝘆",
  z: "𝘇",
  A: "𝗔",
  B: "𝗕",
  C: "𝗖",
  D: "𝗗",
  E: "𝗘",
  F: "𝗙",
  G: "𝗚",
  H: "𝗛",
  I: "𝗜",
  J: "𝗝",
  K: "𝗞",
  L: "𝗟",
  M: "𝗠",
  N: "𝗡",
  O: "𝗢",
  P: "𝗣",
  Q: "𝗤",
  R: "𝗥",
  S: "𝗦",
  T: "𝗧",
  U: "𝗨",
  V: "𝗩",
  W: "𝗪",
  X: "𝗫",
  Y: "𝗬",
  Z: "𝗭",
  0: "𝟬",
  1: "𝟭",
  2: "𝟮",
  3: "𝟯",
  4: "𝟰",
  5: "𝟱",
  6: "𝟲",
  7: "𝟳",
  8: "𝟴",
  9: "𝟵",
};
export default {
  data() {
    return {
      repository: {},
      owner: {},
      social: false,
      issues: '/issues?q=is%3Aopen+is%3Aissue+label%3A"good+first+issue"',
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
    tweetView: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    const apiURL = this.url.replace(
      "https://github.com/",
      "https://api.github.com/repos/"
    );
    // "https://api.allorigins.win/raw?url=https://api.github.com/repos/"
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
    makeNumberString(number) {
      var orig = number;
      var decPlaces = 1;
      var dec = decPlaces;
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10, decPlaces);

      // Enumerate number abbreviations
      var abbrev = ["k", "m", "b", "t"];

      // Go through the array backwards, so we do the largest first
      for (var i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
          var number = Math.round((number * decPlaces) / size) / decPlaces;

          // Handle special case where we round up to the next abbreviation
          if (number == 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }

          // console.log(number);
          // Add the letter for the abbreviation
          number += abbrev[i];

          // We are done... stop
          break;
        }
      }

      return number;
    },
    bolder(text) {
      return text
        .split("")
        .map((char) => chars[char])
        .join("");
    },
  },
  computed: {
    ownerURL() {
      if (!!this.owner.twitter_username) {
        return `//twitter.com/${this.owner.twitter_username}`;
      } else if (!!this.owner.blog) {
        return this.owner.blog;
      }

      return this.owner.html_url;
    },
    ownerLabel() {
      if (!!this.owner.twitter_username) {
        return "@" + this.owner.twitter_username;
      }

      return this.owner.login;
    },
  },
};
</script>

<style scoped></style>
