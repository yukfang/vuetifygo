const {koaApp, init} = require('./koaApp');
const PORT = process.env.PORT || 80

if(process.env.PLATFORM != 'FAAS') { // FaaS does not require consul service
    init();
    koaApp.listen(PORT);
} else {
    exports.handler = koaApp.callback();
    exports.initializer = init;
}