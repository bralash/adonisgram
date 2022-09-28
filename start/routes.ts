import Route from '@ioc:Adonis/Core/Route'


Route.get('/','AuthController.index')
Route.get('signup', 'AuthController.showSignup')
Route.get('login', 'AuthController.showLogin')
Route.get('/profile', 'AuthController.showProfile').middleware('auth')
Route.get('/logout', 'AuthController.logout')
Route.get('confirm-email/:uid/:token', 'AuthController.confirmEmail').middleware('auth') 

Route.post('signup', 'AuthController.signup')
Route.post('login', 'AuthController.login')
Route.post('verify-email', 'AuthController.verifyEmail').middleware('auth')
