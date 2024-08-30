const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter')
const postRoutes = require('./postRoutes')
const profileRoutes = require('./profileRoutes')
const googleAuthRoutes = require('./googleAuthRoutes')
const commentRoutes = require('./commentRoutes')
const searchRoutes = require('./searchRoutes')
const followerRoutes = require('./followerRoutes')
const friendRoutes = require('./friendRoutes')
const videoRoutes = require('./videoRoutes')
const likesRoutes = require('./likesRoutes')
const savedContentRoutes = require('./savedContentRoutes')
const ChatRoutes = require('./ChatRoutes')
const NotificationsRoutes = require('./NotificationsRoutes')
const mediaRoutes = require('./mediaRoutes')

function setupRoutes(app) {
    app.use('/api/sofi', registerRouter);
    app.use('/api/sofi', loginRouter); 
    app.use('/api/sofi', postRoutes);
    app.use('/api/sofi', profileRoutes);
    app.use('/api/sofi', commentRoutes);
    app.use('/api/sofi', searchRoutes);
    app.use('/api/sofi', followerRoutes);
    app.use('/api/sofi', friendRoutes);
    app.use('/api/sofi', videoRoutes);
    app.use('/api/sofi', likesRoutes);
    app.use('/api/sofi', savedContentRoutes);
    app.use('/api/sofi', ChatRoutes);
    app.use('/api/sofi', NotificationsRoutes);
    app.use('/auth/google', googleAuthRoutes);
    app.use('/api/sofi', mediaRoutes);
    
}

module.exports = { setupRoutes };
