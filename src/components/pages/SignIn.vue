<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="login" label="Login" required></v-text-field>
                            <validation-error :errors="loginErrors"></validation-error>
                            <v-text-field v-model="password" label="Password" required :type="'password'"></v-text-field>
                            <validation-error :errors="passwordErrors"></validation-error>
                        </v-form>
                        <validation-error :errors="commonErrors"></validation-error>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn :disabled="login.length < 3 || password.length < 5" color="success" outlined @click="signIn">Sign in</v-btn>
                        <v-btn :disabled="login.length < 3 || password.length < 5" color="success" @click="signUp">Sign up</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import {IS_LOGGED_IN, TOKEN} from "../../vuex/mutation-types";
    import ValidationError from "../ValidationError";

    export default {
        name: "SignIn",
        components: {ValidationError},
        data() {
            return {
                login: '',
                password: '',
                loginErrors: [],
                passwordErrors: [],
                commonErrors: []
            }
        },
        methods: {
            action(route) {
                this.passwordErrors = []
                this.loginErrors = []
                this.commonErrors = []
                this.axios
                    .post(route, {login: this.login, password: this.password})
                    .then(response => {
                        this.$store.commit(IS_LOGGED_IN, true)
                        this.$store.commit(TOKEN, response.token)
                        this.$router.push({name: 'main'});
                    })
                    .catch(err => {
                        if (err.response.data.login) {
                            this.loginErrors = err.response.data.login
                        }
                        if (err.response.data.password) {
                            this.passwordErrors = err.response.data.password
                        }

                        if (!err.response.data.login && !err.response.data.password) {
                            this.commonErrors = [err.message]
                        }
                    })
            },
            signIn() {
                this.action('signin')
            },
            signUp() {
                this.action('signup')
            },
        }
    }
</script>

<style scoped>

</style>
