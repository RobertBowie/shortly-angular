angular.module('shortly.services', [])

.factory('Links', function ($http) {
  // Function to shorten links
  var addLink = function (link) {
    // body...
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    })
    .then(function(resp) {
      //find the returned format of the response to get to the shortened url
      console.log('addLink called. returned resp, resp.data: ', resp.data);
      return resp.data;
    });
  };
  // Function to add links to list??
  var getLinks = function (data) {
    return $http({
      method: 'GET',
      url: '/api/links'
      // data: data // Do we need this?
    })
    .then(function (resp) {
      console.log('getLinks called. returned resp, resp.data: ', typeof resp.data);
      return resp.data; // what comes back here? JSON links table?
    })
  };
  return {
    addLink: addLink,
    getLinks: getLinks
  };
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
