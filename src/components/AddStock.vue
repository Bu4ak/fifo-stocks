<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
                <v-fab-transition>
                    <v-btn  style="bottom: 15px;"
                            color="green"
                            dark
                            absolute
                            bottom
                            right
                            fab
                            v-on="on"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-fab-transition>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Add new stock</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="name" label="Name *" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="ticker" label="Ticker" required></v-text-field>
                            </v-col>
                        </v-row>
                        <small>* - required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" :disabled="!name || !ticker" text @click="addStock(name, ticker)">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {STOCK_OBJECT} from "../vuex/mutation-types";

    export default {
        name: "AddStock",
        data: () => ({
            dialog: false,
            name: '',
            ticker: ''
        }),
        methods: {
            addStock(name, ticker) {
                this.dialog = false
                this.$store.commit(STOCK_OBJECT, {name: name, ticker: ticker, positions: []})
                this.name = ''
                this.ticker = ''
            }
        },

    }
</script>

<style scoped>

</style>
