// module
// exports config
module.exports = {
  // mongo, obj
  mongo: {
    // db name
    name: 'osmosis_zhihu_recommendation',
    // localhost
    host: '127.0.0.1',
    // port
    port: 27017,
    // username
    username: 'osmosis_zhihu_recommendation',
    // password
    password: 'osmosis_zhihu_recommendation',
    url: function() {
      return ['mongodb://',
        this.username, ':',
        this.password, '@',
        this.host, ':', this.port, '/', this.name].join('');
    }
  },
  mongoOptions: {
    server: {
      poolSize: 1,
      socketOptions: {
        auto_reconnect: true
      }
    }
  }
}
