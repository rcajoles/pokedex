<template>
    <div id="register" class="register-container">
        <form role="form" method="POST" action="/register">
            <input type="hidden" name="_token" :value="csrf_token">
            <div class="form-control">
                <input id="name" type="text" name="name" v-model="form.name"
                       placeholder="Name" required autofocus>
            </div>
            <div class="form-control">
                <input id="email" type="email" name="email" v-model="form.email"
                       placeholder="Email Address" required>
            </div>
            <div class="form-control">
                <input id="password" type="password" name="password" v-model="form.password"
                       placeholder="Password" required>
            </div>
            <div class="form-control">
                <input id="confirm_password" type="password" name="confirm_password" v-model="form.confirm_password"
                       placeholder="Confirm Password" required>
            </div>
            <div class="form-control">
                <button type="submit" @click="submitRegistration">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import Auth from "../services/auth";
// import router from '../router';

    export default {
        data() {
            return {
                csrf_token: window.csrf_token,
                form: {
                    _token: '',
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                },
            };
        },
        methods: {
            submitRegistration(e) {
                e.preventDefault();
                try {
                    Auth.register(this.form)
                    .then(res => {
                        console.log('response: ');
                        console.log(res);
                        if (res.status === 200 || res.status === 201) {
                            this.form = {
                                name: '',
                                email: '',
                                password: '',
                            };
                        }
                    });    
                } catch (error) {
                    console.log(error);
                    throw new Error(error)
                }               
            },
        },
    };
</script>

<style>
    #register form {
        padding-top: 40px;
    }

    @media (min-width: 744px) {
        #register form {
            padding-top: 80px;
        }
    }

    #register .form-control {
        margin-bottom: 1em;
    }

    #register input[id=name],
    #register input[type=email],
    #register input[type=password],
    #register button,
    #register label {
        width: 100%;
        font-size: 19px !important;
        line-height: 24px;
        color: #484848;
        font-weight: 300;
        -webkit-appearance: none;
    }

    #register input {
        background-color: transparent;
        padding: 11px;
        border: 1px solid #dbdbdb;
        border-radius: 2px;
        box-sizing:border-box
    }

    #register button {
        background-color: #4fc08d;
        color: #ffffff;
        cursor: pointer;
        border: #4fc08d;
        border-radius: 4px;
        padding-top: 12px;
        padding-bottom: 12px;
    }
</style>
