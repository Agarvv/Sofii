const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter')
const postRoutes = require('./postRoutes')
const profileRoutes = require('./profileRoutes')
const googleAuthRoutes = require('./googleAuthRoutes')

function setupRoutes(app) {
    app.use('/api/sofi', registerRouter);
    app.use('/api/sofi', loginRouter); 
    app.use('/api/sofi', postRoutes);
    app.use('/api/sofi', profileRoutes);
    app.use('/auth/google', googleAuthRoutes);
}

module.exports = { setupRoutes };
