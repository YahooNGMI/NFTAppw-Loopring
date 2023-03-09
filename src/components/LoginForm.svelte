<script lang="ts">
    import axios from "axios";
    // import alertMessage from "../store/alertMessage";
    // import errorMessage from "../store/errorMessage";
    // import loginToken from "../store/loginToken";


    let emailAddress: string;
    let password: string;

    let username: string;
    let newEmailAddress: string;
    let newPassword1: string;
    let newPassword2: string;
    let loginButton = true;
    let userCreateButton = true;
    async function submitNewUser() {
        console.log("submitnewuser")
    //     errorMessage.set("");
    //     alertMessage.set("");

    //     const result = await axios.post(
    //         `${import.meta.env.VITE_SERVER_URL}/user`,
    //         {
    //             username: username,
    //             emailAddress: newEmailAddress,
    //             newPassword1: newPassword1,
    //             newPassword2: newPassword2,
    //         }
    //     );

    //     if (result.data.error) {
    //         console.log(result);
    //         errorMessage.set(result.data.error);
    //         return;
    //     } else {
    //         console.log("result2", result);
    //         userCreateButton = false;
    //         alertMessage.set(
    //             'Account Created! Log in then go check it out by clicking "Display all Existing Users!"'
    //         );
    //     }

    //     // // errorMessage.set(result.data.error);
    }
// 
    async function userLogin() {
        console.log("UserLogin");
        // console.log(password);
        // const result = await axios.post(
        //     `${import.meta.env.VITE_SERVER_URL}/login`,
        //     {
        //         emailAddress: emailAddress,
        //         password: password,
        //     }
        // );
        // console.log("result", result.data.token);
        // if (errorMessage) {
        //     alertMessage.set("");
        //     errorMessage.set(result.data.error);
        // }
        // if (result.data.token) {
        //     loginToken.set(result.data.token);
        //     errorMessage.set("");
        //     alertMessage.set(
        //         'Login succesful. View your account among the others by clicking "Display All Existing Users"'
        //     );
        //     loginButton = false;
        // }
    }
</script>

<div class="flex flex-col w-full lg:flex-row">
    <div id="loginForm" class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-column-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">
                    Login to your existing account
                </h1>
                <p class="py-6">
                    Enter your username and password to resume your session!
                </p>
            </div>
            <div
                class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            bind:value={emailAddress}
                            type="text"
                            placeholder="Email"
                            class="input input-bordered"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            bind:value={password}
                            type="text"
                            placeholder="Password"
                            class="input input-bordered"
                        />
                        <label class="label">
                  <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                </label>
                    </div>
                    <div class="form-control mt-6">
                        <button
                            disabled={!loginButton}
                            on:click={async () => await userLogin()}
                            class="btn btn-primary">Login</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="divider lg:divider-horizontal">OR</div>
    <div id="loginForm" class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-column-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">
                    Don't have an account yet? Create one!
                </h1>
                <p class="py-6">
                    Enter a unique and custom username and your email address to
                    get started now!
                </p>
            </div>
            <div
                class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            >
                <div class="card-body">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input
                            bind:value={username}
                            type="text"
                            placeholder="Username"
                            class="input input-bordered"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input
                            bind:value={newEmailAddress}
                            type="text"
                            placeholder="Email"
                            class="input input-bordered"
                        />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input
                            bind:value={newPassword1}
                            type="text"
                            placeholder="Password"
                            class="input input-bordered"
                        />
                    </div>
                    <div class="form-control">
                        <input
                            bind:value={newPassword2}
                            type="text"
                            placeholder="Reenter Password"
                            class="input input-bordered"
                        />
                    </div>
                    <div class="form-control mt-6">
                        <button
                            disabled={!userCreateButton}
                            on:click={async () => await submitNewUser()}
                            class="btn btn-primary">Create account</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style global lang="postcss">
    #loginForm {
        margin-top: 50px;
    }
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
