const Glue = require('glue');

const internals = {
    manifest: {
        connections: [
            {
                port: 3000,
                labels: ['foo']
            },
            {
                port: 3001,
                labels: ['bar']
            }
        ],
        registrations: [
            {
                plugin: 'hapi-auth-cookie'
            },
            {
                plugin: {
                    register: './foo'
                },
                options: {
                    select: ['foo']
                }
            },
            {
                plugin: {
                    register: './bar'
                },
                options: {
                    select: ['bar']
                }
            }
        ]
    }
};

Glue.compose(internals.manifest, {relativeTo: __dirname}, (err, pack) => {
    if (err) {
        console.error(err);
        throw err;
    }
    pack.start(() => {
        console.log('started');
    });
});
