const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter')
const postRoutes = require('./postRoutes')
const profileRoutes = require('./profileRoutes')
const googleAuthRoutes = require('./googleAuthRoutes')
const commentRoutes = require('./commentRoutes')
const searchRoutes = require('./searchRoutes')

function setupRoutes(app) {
    app.use('/api/sofi', registerRouter);
    app.use('/api/sofi', loginRouter); 
    app.use('/api/sofi', postRoutes);
    app.use('/api/sofi', profileRoutes);
    app.use('/api/sofi', commentRoutes);
    app.use('/api/sofi', searchRoutes);
    app.use('/auth/google', googleAuthRoutes);
    
}

module.exports = { setupRoutes };
