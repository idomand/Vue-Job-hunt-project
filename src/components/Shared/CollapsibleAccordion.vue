<template>
  <div class="border-b border-solid border-brand-gray-2 pt-5">
    <div
      role="button"
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot><p>default-content</p></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
defineProps({ header: { type: String, require: true } });
const isOpen = ref(false);
const open = () => {
  isOpen.value = !isOpen.value;
};
const caretIcon = computed(() => {
  return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
});
</script>

<!-- <script>
import { ref, computed } from "vue";
export default {
  name: "CollapsibleAccordion",
  props: {
    header: { type: String, require: true },
  },
  setup() {
    const isOpen = ref(false);
    const open = () => {
      isOpen.value = !isOpen.value;
    };
    const caretIcon = computed(() => {
      return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
    });
    return { caretIcon, open, isOpen };
  },
};
</script> -->

<!-- <script>
export default {
  name: "CollapsibleAccordion",
  props: {
    header: { type: String, require: true },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script> -->
