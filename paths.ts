import moduleAlias from 'module-alias';

moduleAlias.addAliases({
    '@application': __dirname + '/src/application',
    '@auth': __dirname + '/src/presentation/modules/auth',
    '@config': __dirname + '/src/config',
    '@domain': __dirname + '/src/domain',
    '@infrastructure': __dirname + '/src/infrastructure',
    '@notifications': __dirname + '/src/presentation/modules/notifications',
    '@server': __dirname + '/src/presentation/server'
});

moduleAlias();