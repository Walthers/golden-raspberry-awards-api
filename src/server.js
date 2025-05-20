const { app, init } = require('./app');

init().then(() => {
    app.listen(3000, () => console.log('API running on http://localhost:3000'));
});