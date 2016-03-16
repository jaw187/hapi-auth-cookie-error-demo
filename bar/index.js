function register(server, options, next) {
    const sessions = {};

    server.auth.strategy('session', 'cookie', true, {
        password: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        appendNext: true,
        redirectTo: '/login',
        clearInvalid: true,
        validateFunc: (request, session, callback) => {
            const data = sessions[session.sid];
            if (!data) {
                return callback(null, false);
            }
            return callback(null, true, data.user);
        }
    });
    next();
}

register.attributes = {
  name: 'bar',
  version: require('../package.json').version
};

module.exports.register = register;
