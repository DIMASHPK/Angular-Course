const apiKey = 'AIzaSyCZ5TgzGlktYzwu9qg3rH3oLYkb4mzI07w'

export const environment = {
  production: true,
  signUpUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
  signInUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
  fireBaseUrl: 'https://angular-app-cdf7d-default-rtdb.europe-west1.firebasedatabase.app/'
};
