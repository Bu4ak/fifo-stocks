<template>
        <v-container>
            <v-row class="">
                <v-col v-for="item in items" :key="item.id" cols="12" md="6" sm="12" lg="4">
                    <v-card class="" @click="show(item.id)" outlined flat hover>
                        <div class="display-1 text-center">
                            <v-list-item-title class="headline mb-1 ml-1 mr-1">{{item.name}}</v-list-item-title>
                            <v-list-item-subtitle>{{item.ticker}}</v-list-item-subtitle>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
    export default {
        name: "Group",
        props: [
            'items'
        ],
        methods: {
            show(id) {
                this.$router.push({name: 'stock_show', params: {id: id}});
            }
        }
    }
</script>

<style scoped>

</style>
