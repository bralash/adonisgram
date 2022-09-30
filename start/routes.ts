import Route from '@ioc:Adonis/Core/Route'


Route.get('/','AuthController.index')
Route.get('signup', 'AuthController.showSignup').middleware('guest')
Route.get('login', 'AuthController.showLogin').middleware('guest')
Route.get('/profile', 'AuthController.showProfile').middleware('auth')
Route.get('/logout', 'AuthController.logout')
Route.get('verify-email/:email', 'AuthController.confirmEmail').as('verifyEmail')

Route.post('signup', 'AuthController.signup')
Route.post('login', 'AuthController.login')
Route.post('verify-email', 'AuthController.verifyEmail').middleware('auth')
