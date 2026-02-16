const storedUser = JSON.parse(localStorage.getItem('user'));

class AuthStore {
    user = $state(storedUser);

    login(userData) {
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
    }
}

export const auth = new AuthStore;