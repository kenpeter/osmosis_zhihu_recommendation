var osmosis = require('osmosis');
var Promise = require('bluebird');
var SummaryDAO = require('./model/summary');

var summary = new SummaryDAO();
var searchUrl = 'https://www.zhihu.com/explore/recommendations';

/**** Same as above ****/
osmosis
  .get(searchUrl)
  .find('.zm-item')
  .set({
    'title': '.question_link',
    'link': '.question_link @href',
    'author': '.author-link-line',
    'content': '.content',
    'imgUrl': '.post-content img @src'
  })
  .data((data) => {
    //console.log('--- single data ---');
    //console.log(data);

    return new Promise((resolve, reject) => {
      summary.delete({}).then(() => {
        let obj = {
          title: data.title,
          link: 'https://www.zhihu.com' + data.link,
          author: data.author,
          //content: data.content,
          imgUrl: data.imgUrl
        };
        summary.save(obj).then(() => {
          //console.log(data);

          let msg = "---------" + data.title + " is saved ---------";
          console.log(msg);
          resolve();
        });
      });

    });
  })
  .error(console.log);
  //.debug(console.log);
