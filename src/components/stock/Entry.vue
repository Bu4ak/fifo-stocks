<template>
    <!--    <div v-if="group">-->
    <!--        <v-card class="mx-auto ma-2" min-width="400" v-for="item in groupedEntries" :key=" item[0].id">-->
    <!--            <v-card-text style="height: 55px" >-->
    <!--                <span style="position: absolute;">{{item[0].amount}}</span>-->
    <!--                <span style="position: absolute; margin-left: 100px">x{{item.length }}</span>-->
    <!--                <span class="float-right">{{new Date(item[0].created_at).toDateString()}}</span>-->
    <!--            </v-card-text>-->
    <!--        </v-card>-->

    <!--    </div>-->
    <div class="ma-1">
        <v-card class="mx-auto ma-2" min-width="367" v-for="(item, i) in entries" :key="item.id">
            <v-card-text v-bind:style="getHighlightStyle(i)">
                <span style="position: absolute;"><b>{{parseFloat(item.amount).toFixed(2)}}</b> </span>
                <span style="position: absolute; margin-left: 100px"><b>{{item.count}}</b> <small>x{{stock.lot_size }}</small></span>
                <span class="float-right">{{new Date(item.created_at).toDateString()}}</span>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Entry",
        props: ['stock', 'entries', 'group', 'sellCount'],
        methods: {
            getHighlightStyle(index) {
                return {
                    height: '55px',
                    'background-color': index < Number(this.sellCount) ? 'rgba(231,76,60,0.25)' : ''
                }
            },
        },
        computed: {
            groupedEntries() {
                const groupBy = (items, key) => items.reduce(
                    (result, item) => ({
                        ...result,
                        [item[key]]: [
                            ...(result[item[key]] || []),
                            item,
                        ],
                    }),
                    {},
                );

                // const RANGE_ITER = (x, y) => (function* () {
                //     while (x <= y) yield x++;
                // })();
                // let index = 0
                let amount = 0
                // let result = []
                // let transactionId = ''
                // for (let key in this.entries) {
                //     let entry = this.entries[key]
                //     /* eslint-disable no-unused-vars */
                //     // if (index < Number(this.sellCount)) {
                //     amount += Number(entry.amount)
                //     // index++
                //     if (transactionId != entry.transaction_id) {
                //         let count =
                //         result.push(entry)
                //     }
                //     transactionId = entry.transaction_id
                //     // }
                // }

                const array = Object.values(this.entries);

                this.$emit('stocks-for-sale', amount)
                return groupBy(array, 'transaction_id')
            }
        }
    }
</script>

<style scoped>
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.2s;
        max-height: 230px;
    }
    .fadeHeight-enter,
    .fadeHeight-leave-to
    {
        opacity: 0;
        max-height: 0px;
    }
</style>
