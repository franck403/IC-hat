// Les variables d'environnement seront injectées ici
const auth0_domain = '__AUTH0_DOMAIN__';
const auth0_client_id = '__AUTH0_CLIENT_ID__';

let auth0Client = null;

const createAuth0API = () => {
    
    // Déclare l'objet de l'API globale
    const auth0API = {};

    auth0API.initialize = async () => {
        auth0Client = await auth0.createAuth0Client({
            domain: auth0_domain,
            clientId: auth0_client_id,
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        });
        
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    };
    
    auth0API.getUser = async () => {
        return await auth0Client.getUser();
    };

    auth0API.getAccessToken = async () => {
        return await auth0Client.getTokenSilently();
    };

    auth0API.login = async () => {
        await auth0Client.loginWithRedirect();
    };

    auth0API.logout = () => {
        auth0Client.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
    };

    auth0API.isAuthenticated = async () => {
        return await auth0Client.isAuthenticated();
    };

    // Ajoute l'objet à la portée globale
    window.auth0API = auth0API;
};

// Initialisation de l'API au chargement de la page
window.onload = createAuth0API;