export default function goToRoute(router, route) {

    if (router && route) {
        router.push(route);
    } else {
        console.error('Route Or Router Is Missing')
    }
}