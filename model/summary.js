var mongodb = require('./connect');

// exports.mongoose = mongoose;
var Schema = mongodb.mongoose.Schema;

var SummarySchema = new Schema({
  title:  String,
  link: String,
  author: String,
  content: String,
  imgUrl: String
});

var SummaryDAO = function(){};
// we can use this to do find, save, delete.
var Summary = mongodb.mongoose.model('Summary', SummarySchema);

SummaryDAO.prototype =  {
  // constructor
  constructor: SummaryDAO,

  // save
  save: function(obj){
    // always promise
    return new Promise((resolve, reject) => {
      // have a instance
      var instance = new Summary(obj);
        // actual save
        instance.save((err) => {
          // err
          if(err) return reject(err);
          // resolve
          resolve();
        });
      });
    },

    // delete
    delete: function(query) {
      return new Promise((resolve, reject) => {
        Summary.remove(query, (err, data) => {
          // err
          if(err) return reject(err)
          // what is inside data
          resolve(data);
        });
      });
    },

    // search, func, query
    search: function(query){
      return new Promise((resolve, reject) => {
        Summary.find(query, (err, data) => {
          //
          if(err) return reject(err)
          // we push results later
          var result = [];
          // if we have data
          if(data) {
            for(var i=0,len=data.length;i<len;i++){
              // d = {}
              d = {
                _id: data[i]._id,
                title: data[i].title,
                link: data[i].link,
                author: data[i].author,
                content: data[i].content,
                imgUrl: data[i].imgUrl
              }
              // push it
              result.push(d)
            }
          }
          // return
          resolve(result);
        });
      });
    }
}

module.exports = SummaryDAO;
