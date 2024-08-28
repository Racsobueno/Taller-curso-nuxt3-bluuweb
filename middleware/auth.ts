export default defineNuxtRouteMiddleware( async (to,from) =>{
    if (import.meta.server) return

    const {currentUserPromise} =  useFirebaseAuth();

    const user = await currentUserPromise();

    if( !user && to.path !== "/login" ){
        return navigateTo("/login");
    }

} )