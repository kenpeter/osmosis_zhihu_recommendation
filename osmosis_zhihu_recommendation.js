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
/**** Same as above ****/
  /*
  .follow('.r @href')         // Follow the link. Really that's it!!
  .set({
     'pageText': 'body'       // Set some property for the pageText by parsing body tag
  })
  */
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
  .error(console.log)
  //.debug(console.log);
