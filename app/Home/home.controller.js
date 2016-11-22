(function() {
    'use strict';

    angular
        .module('app')
        .controller('GithubController', GithubController);

    GithubController.$inject = ['$http'];

    /* @ngInject */
    function GithubController($http) {
    	var vm = this;

        vm.callGithubApi = callGithubApi;

        vm.isHireableOrNot = function() {
            if (vm.isHireableOrNot == null) {
                vm.user.hireable = 'Not looking for work';
                vm.hireableColor = 'text-danger';
            } else {
                vm.user.hireable = 'Looking for work';
                vm.hireableColor = 'text-success';
            }
        }

         vm.showUserDetails = function() {
            document.getElementById('details').style.visibility='visible';
        }


        ////////////////

        function callGithubApi(username) {
        	$http
        		.get("http://api.github.com/users/" + username + "?access_token=c96c4ec0db9475028a27993b7cfdc1f03df9c2e4")
        		.then(function(response) {
        			//'user' as the object
        			vm.user = response.data;
                    vm.showUserDetails();
                    vm.isHireableOrNot();
        			console.log(vm.user);
        		})
        		.catch(function(error) {
        			alert("An error occured downloading " + username + " from Github");
        		});
        }

    }
})();