<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <div v-if="isLoggedIn">
                    <v-list-item @click="home">
                        <v-list-item-action>
                            <v-icon>fa-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <br>
                    <v-list-item @click="logout">
                        <v-list-item-action>
                            <v-icon>fa-sign-out-alt</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
                <div v-else>
                    <v-list-item link href="/signin">
                        <v-list-item-action>
                            <v-icon>fa-sign-in-alt</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Login</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="#8bc34a" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title></v-toolbar-title>
        </v-app-bar>

        <v-content>
            <router-view/>
        </v-content>
        <v-footer color="#8bc34a" app>
            <span class="white--text">&copy; 2020</span>
        </v-footer>
    </v-app>
</template>

<script>
    import '@fortawesome/fontawesome-free/css/all.css'

    export default {
        iconfont: 'fa',
        data: () => ({
            drawer: false,
        }),
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout() {
                window.localStorage.clear();
                window.location.reload();
                this.$router.push({name: 'signin'});
            },
            home() {
                this.$router.push({name: 'main'});
            },
        },
    }
</script>
