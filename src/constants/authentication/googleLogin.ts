// import { gapi } from 'gapi-script';

// const handleGoogleLogin = async () => {
//     console.log('hii');

//     const authInstance = gapi.auth2.getAuthInstance();

//     if (authInstance.isSignedIn.get()) {
//         //logout
//         authInstance.signOut().then((res: any) => {
//             console.log(res, 'resout');
//             setIsGoogleSignedIn(false);
//             dispatch(updateUserLogout())

//         })
//         setIsModalOpen(false)
//     } else {
//         console.log("before signing in")
//         //login
//         authInstance.signIn().then((res: any) => {
//             const result = res.wt
//             console.log(result.cu, result.hK, result, 'resss');

//             console.log("Hello..u are signed in")

//             axios.post(`${serverApi}/login`, { name: result.Ad, email: result.cu, picture: result.hK }).then((res) => {
//                 if (res.status === 200) {
//                     dispatch(updateUserLogin({ user: result.cu, picture: result.hK }))
//                 }
//             })
//             setIsGoogleSignedIn(true); // Set to true on sign-in
//         });
//     }
// };