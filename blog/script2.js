(function(undefined) {
  var app = angular.module("RSSFeed", []);

  app.controller("FeedController", [
    "$http",
    "$window",
    function($http, $window) {
      let module = this;

      module.entry = {
        'name': '',
        'url': ''
      };
      
      module.submitEntry = function(){
        module.feeds.push({ 'name': module.entry.name, 'url': module.entry.url });
        module.entry.name = '', module.entry.url = '';
        
        module.fetch();
      };
      
      module.removeEntry = function(o){
        let index = module.feeds.indexOf(o)
        if (index > -1) {
          module.feeds.splice(index, 1);
          module.fetch();
}
      };
      
      module.feeds = [
        {
          name: "Perth Masters",
          url: "https://perthmastersswimclub.wordpress.com/feed/"
        }
      ];
      module.posts = [];

      module.fetch = function() {
        module.posts = [];
        for (let i = 0, l = module.feeds.length; i < l; i++) {
          $http.get('https://api.rss2json.com/v1/api.json?rss_url=' + $window.encodeURIComponent(module.feeds[i].url)).then( function(response) {
            module.posts = module.posts.concat(response.data.items);
          });
        }
      };
      
      module.sanitiseContent = function(s) {
        let regex = / *\<[^>]*\> */g;
        s = s.replace(regex, "");
        return s.replace('Read More', "");
      };
      
      module.sanitiseDate = function(d) {
        return moment(d).format('MMM DD YYYY | hh:mm')
      }
      
      function initialise(){
        module.fetch();
      };
      
      initialise();

      return module;
    }
  ]);
})();
