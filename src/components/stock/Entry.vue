<template>
    <div v-if="group">
        <v-card class="mx-auto ma-2" min-width="400" v-for="item in entries" :key="item.id">
            <v-card-text style="height: 55px">
                        <span style="position: absolute;">{{item.amount}}
                        </span> <span style="position: absolute; margin-left: 100px">x{{item.count}}</span>
                <span class="float-right">{{new Date(item.created_at).toDateString()}}</span>
            </v-card-text>
        </v-card>
    </div>
    <div v-else>
        <v-card class="mx-auto ma-2" min-width="400" v-for="(item, i) in ungroupedEntries" :key="i + item.id">
            <v-card-text v-bind:style="getHighlightStyle(i)">
                <span style="position: absolute;">{{item.amount}}</span>
                <span class="float-right">{{new Date(item.created_at).toDateString()}}</span>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Entry",
        props: ['entries', 'group', 'sellCount'],
        methods: {
            getHighlightStyle(index) {
                return {
                    height: '55px',
                    'background-color': index < Number(this.sellCount) ? 'rgba(231,76,60,0.25)' : ''
                }
            },
        },
        computed: {
            ungroupedEntries() {
                const RANGE_ITER = (x, y) => (function* () {
                    while (x <= y) yield x++;
                })();

                let result = []
                for (let key in this.entries) {
                    /* eslint-disable no-unused-vars */
                    for (let n of RANGE_ITER(1, this.entries[key].count)) {
                        result.push(this.entries[key])
                    }
                }
                return result
            }
        }
    }
</script>

<style scoped>

</style>
