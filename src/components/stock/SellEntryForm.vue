<template>
    <v-col class="pa-1" cols="12" sm="12" md="12">
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-card>
                <v-card-text style="border: solid 1px red;">
<!--                    <v-text-field type="number" v-model="price" :rules="priceRules" :min="0.001" step="0.001" label="Price"></v-text-field>-->
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                        <v-text-field :rules="countRules" v-model="count" type="number" :min="0" step="1" :max="maxCount" label="Count"
                                      required></v-text-field>
                    </v-col>
                    <v-btn rounded style="bottom: 15px" :disabled="!valid" absolute right color="red" @click="removeEntry">
                        <v-icon color="white">fa-minus</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-form>
    </v-col>
</template>

<script>
    export default {
        name: "SellEntryForm",
        props: ['max'],
        data() {
            return {
                count: undefined,
                countRules: [
                    v => !!v || 'Count is required',
                ],
                price: undefined,
                priceRules: [
                    v => !!v || 'Price is required',
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
        watch: {
            count: function (val) {
                this.$emit('count-for-sale', val)
            },
            price: function (val) {
                this.$emit('price-for-sale', val)
            },
        },
        methods: {
            validate() {
                return this.$refs.form.validate()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
            removeEntry() {
                if (!this.validate()) return
                const count = this.count
                this.count = undefined
                this.resetValidation()

                this.axios
                    .post('entry-sell', {
                        token: this.$store.getters.token,
                        count: count,
                        stock_id: this.stock.id
                    })
                    .then(() => {
                        this.$emit('removed', true)
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
