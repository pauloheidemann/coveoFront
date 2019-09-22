<template>
    <div class="painel">
        <a :href="uri" target="_blank">
            <h2 class="painel-title">{{ title }}</h2>
        </a>
        <div class="painel-content" >
            <slot></slot>
            <img :src="thumbnail">
            <br>
            <span>{{ category }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'uri', 'thumbnail', 'category']
}

</script>

<style scoped>
   .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    box-shadow: 5px 5px 10px grey;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .painel .painel-title {
    text-align: center;
    border: solid 2px;
    background: lightblue;
    margin: 0 0 15px 0;
    padding: 10px;
    text-transform: uppercase;
  }

  * {
      box-shadow: 5px 5px 5px;
  }

</style>