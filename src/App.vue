<template>
  <div id="container">
  </div>
</template>

<script>
import {BvModel} from "@/bvModelCore/bvModel";
import sampleData from "@/assets/sample.json";

export default {
  name: 'App',
  mounted() {
    this.dappModel = new BvModel(document.getElementById("container"), sampleData);
  },
  beforeDestroy() {
    this.dappModel.clear();
  }
}
</script>

<style>
#container {
  height: 100vh;
  width: 100vw;
}
</style>
