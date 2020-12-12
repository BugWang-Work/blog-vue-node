<template>
  <div class="home">home{{test}}</div>
</template>

<script lang="ts">
import { mapState } from 'vuex'
export default {
  components: {},
  data() {
    return {};
  },
  computed:{
    ...mapState(['test'])
  }
};
</script>
<style lang="less" scoped>
.home {

}
</style>
