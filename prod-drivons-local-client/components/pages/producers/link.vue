<template>
  <div style="height: 5px">
    <a
      class="green--text text--darken-2"
      style="text-decoration: none"
      v-if="link"
      :href="link"
      target="_blank"
    >
      Site web
    </a>
  </div>
</template>

<script>
export default {
  props: ['link'],
}
</script>

<style></style>
