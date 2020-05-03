<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <v-list-item v-if="isLoggedIn" @click="logout">
                    <v-list-item-action>
                        <v-icon>fa-sign-out-alt</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-else link href="/signin">
                    <v-list-item-action>
                        <v-icon>fa-sign-in-alt</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
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
            }
        },
    }
</script>
