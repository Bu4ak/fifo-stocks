<template>
    <div>
        <v-label  v-for="error in errors" :key="error">
            <p style="color: darkred">{{error}}</p>
        </v-label>
    </div>
</template>

<script>
    export default {
        name: "ValidationError",
        props: ['errors']
    }
</script>

<style scoped>

</style>
