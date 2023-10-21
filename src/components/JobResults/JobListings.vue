<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <div class="flex justify-between items-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: JobResults, query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous
          </router-link>
          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: JobResults, query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next
          </router-link>
        </div>
        <p class="flex-grow text-sm">page {{ currentPage }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import JobListing from "@/components/JobResults/JobListing.vue";

import axios from "axios";
export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
      jobsSlice: [],
      jobsPerPage: 10,
    };
  },
  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },

    nextPage() {
      const nextPage = this.currentPage + 1;
      const maxPage = Math.ceil(this.jobs.length / this.jobsPerPage);
      return nextPage <= maxPage ? nextPage : undefined;
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },

    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (pageNumber - 1) * this.jobsPerPage;
      const lastJobIndex = pageNumber * this.jobsPerPage;
      return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    const basicURL = "http://localhost:3000/jobs/";
    const response = await axios.get(basicURL);
    const data = await response.data;
    this.jobs = data;
  },
};
</script>
