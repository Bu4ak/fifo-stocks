<template>
    <v-col class="pa-1" cols="12" sm="12" md="12">
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-card>
                <v-card-text style="border: solid 1px red;">
                    <v-col class="pa-0" cols="6" sm="6" md="6">
                        <v-text-field :rules="sellCountRules" v-model="sellCount" type="number" :min="0" step="1" :max="maxCount" label="Sell count"
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
                sellCount: undefined,
                sellCountRules: [
                    v => !!v || 'Count is required',
                    v => (v && v < this.maxCount) || `Count must be less than ${this.maxCount + 1}`,
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
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            removeEntry() {
                if (!this.validate()) return
                const count = this.sellCount
                this.sellCount = ''
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
