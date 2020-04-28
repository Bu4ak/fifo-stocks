<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="login" label="Login" required></v-text-field>
                            <v-text-field v-model="password" label="Password" required :type="'password'"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="success" outlined @click="signIn">Sign in</v-btn>
                        <v-btn color="success" @click="signIn">Sign up</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import {IS_LOGGED_IN} from "../../vuex/mutation-types";

    export default {
        name: "SignIn",
        data() {
            return {
                login: '',
                password: '',
            }
        },
        methods: {
            signIn() {
                this.$store.commit(IS_LOGGED_IN, true)
                this.$router.push({name: 'main'});
            }
        }
    }
</script>

<style scoped>

</style>
