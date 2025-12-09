import api from '../AxiosConfig'

const register = async (userData) => {
    // POST request to /api/users/signup
    const response = await api.post('/users/signup', userData);

    /* Receiving JWT token from login response
    if(response.data.jwtToken) {
        console.log("1. Receiving authorization token from registration");
        localStorage.setItem('jwtToken', response.data.jwtToken);
    }*/
    return response.data;
};

const login = async (credentials) => {
    // POST request to /api/users/signin
    const response = await api.post('/users/signin', credentials);

    // Receiving JWT token from login response
    //if(response.data.jwtToken) {
    //    console.log("1. Receiving authorization token");
    //    localStorage.setItem('jwtToken', response.data.jwtToken);
    //}
    return response.data;
};

const getUser = async () => {
    // GET request to /api/users/user
    // The interceptor automatically adds the token here
    const response = await api.get('/users/user');
    return response.data;
}

const getProfile = async () => {
    // GET request to /api/users/profile
    // The interceptor automatically adds the token here
    const response = await api.get('/users/profile');
    return response.data;
};

const logout = async () => {
    // POST request to /api/users/logout
    const response = await api.post('/users/logout');
    //localStorage.removeItem('jwtToken');
    //console.log("JWT removed from the local storage.");
}

const AuthService = {
    register,
    login,
    getUser,
    getProfile,
    logout
};


export default AuthService;