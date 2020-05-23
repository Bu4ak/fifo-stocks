<template>
        <v-col class="pa-1" cols="12" sm="12" md="12">
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
            >
                <v-card>
                    <v-card-text style="border: solid 1px green;">
                        <v-text-field :rules="priceRules" v-model="price" type="number" :min="0.001" step="0.001" label="Price"></v-text-field>
                        <v-col class="pa-0" cols="6" sm="6" md="6">
                            <v-text-field :rules="countRules" v-model="count" type="number" :min="1" step="1" label="Count"></v-text-field>
                        </v-col>
                        <v-btn rounded style="bottom: 15px" :disabled="!valid" absolute right color="green" @click="addEntry">
                            <v-icon color="white">fa-plus</v-icon>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-col>
</template>

<script>
    import {STOCK_OBJECT} from "../../vuex/mutation-types";

    export default {
        name: "BuyEntryForm",
        // props: ['max'],
        data() {
            return {
                price: undefined,
                priceRules: [
                    v => !!v || 'Price is required',
                    // v => (v && v < this.maxCount) || `Price must be greater than 0`,
                ],
                count: undefined,
                countRules: [
                    v => !!v || 'Count is required',
                    // v => (v && v < this.maxCount) || `Count must be less than ${this.maxCount + 1}`,
                ],
                valid: true
            }
        },
        computed: {
            maxCount() {
                return this.max
            },
            stock() {
                return this.$store.state.stocks.stock
            },
        },
        methods: {
            validate() {
                return this.$refs.form.validate()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            addEntry() {
                if (!this.validate()) return
                const count = this.count
                const amount = this.price
                this.price = undefined
                this.count = undefined
                this.resetValidation()
                this.axios
                    .post('entry', {
                        token: this.$store.getters.token,
                        amount: amount,
                        count: count,
                        stock_id: this.stock.id
                    })
                    .then(response => {
                        let entries = {...this.stock.entries}
                        entries[response.data.id] = {
                            id: response.data.id,
                            count: response.data.count,
                            amount: response.data.amount,
                            stock_id: response.data.stock_id,
                            created_at: response.data.created_at,
                            updated_at: response.data.updated_at,
                        }

                        this.$store.commit(STOCK_OBJECT, {
                            ...this.stock, entries: entries
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
        }
    }
</script>

<style scoped>

</style>
