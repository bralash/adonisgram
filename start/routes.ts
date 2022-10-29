import Route from '@ioc:Adonis/Core/Route'


// Authentication
Route.get('/','HomeController.index')
Route.get('signup', 'AuthController.showSignup').middleware('guest')
Route.get('login', 'AuthController.showLogin').middleware('guest')
Route.get('/logout', 'AuthController.logout')
Route.post('signup', 'AuthController.signup')
Route.post('login', 'AuthController.login')


// Emails
Route.get('verify-email/:email', 'EmailsController.confirmEmail').as('verifyEmail')
Route.post('verify-email', 'EmailsController.verifyEmail').middleware('auth')

// Posts
Route.get('/posts/create', 'PostsController.create').middleware('auth')
Route.post('/posts/create', 'PostsController.store').middleware('auth')

Route.post('/follow/:userId', 'FollowsController.store').middleware('auth')


// Profile
Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth')
Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth')
Route.get('/:username', 'ProfilesController.index').middleware('auth')
