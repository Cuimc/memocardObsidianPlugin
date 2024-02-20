<template>
    <!-- <headerCom></headerCom> -->
    <preview></preview>
    <!-- <bottom-footer></bottom-footer> -->
</template>

<script setup lang="ts">
    // import headerCom from './components/headerCom.vue'
    import preview from './components/preview.vue'
    // import bottomFooter from './components/bottomFooter.vue'

    import { useDark, useToggle } from '@vueuse/core'
    import { onMounted } from 'vue'
    const darkMode = useDark()

    onMounted(() => {
        const node = document.getElementsByTagName('body');
        console.log("node", node[0]);
        darkMode.value = node[0]?.classList.contains('theme-dark')
        console.log("darkMode", darkMode.value);
        useToggle(darkMode)
    })

</script>

<style lang="scss">
    *{
        box-sizing: content-box;
    }
</style>