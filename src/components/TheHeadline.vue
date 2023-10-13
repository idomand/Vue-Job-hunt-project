<template>
  <section>
    <h1>
      <span :class="actionClasses">{{ action }}</span
      ><br />
      for everyone
    </h1>
    <h2>Find you next job</h2>
  </section>
</template>

<script>
export default {
  name: "TheHeadline",
  data() {
    return {
      action: "Build",
      interval: null,
    };
  },
  computed: {
    actionClasses() {
      return {
        build: this.action === "Build",
        create: this.action === "Create",
        design: this.action === "Design",
        code: this.action === "Code",
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Build", "Create", "Design", "Code"];
        const currentIndex = actions.indexOf(this.action);
        const nextIndex = (currentIndex + 1) % 4;
        const nextAction = actions[nextIndex];
        this.action = nextAction;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.build {
  color: blue;
}
.create {
  color: green;
}
.design {
  color: orange;
}
.code {
  color: red;
}
</style>
