<template>
    <v-card class="mx-auto" max-width="255" >
        <v-card-text>
            <p class="display-2 text--primary">
                {{name || '.......'}}
            </p>
            <div class="display-1 text--primary">
                {{price || '000,0'}}
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="green">
                add
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "StockCard",
        props: [
            'name',
            'price',
        ]
    }
</script>

<style scoped>

</style>
