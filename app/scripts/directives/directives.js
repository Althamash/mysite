'use strict';

app.directive('navAction', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				scope.selectNav(attrs.navAction);
				scope.changeView(attrs.navAction);
			});
			scope.selectNav = function(view){
				var navLength = element.parent().find('li').length;
				var navArray = [];
				for(var i = 0; i < navLength; i++){
					navArray.push(element.parent().children().eq(i));
				}
				for(var i = 0; i < navLength; i++){
					if(navArray[i].hasClass('active')){
						navArray[i].removeClass('active');
					} else if(navArray[i].hasClass(view)) {
						navArray[i].addClass('active');
					}
				}
			};
		}
	};
});

app.directive('initGraph', function($window){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			angular.element($window).bind('scroll', function(e){
				console.log(scope.otherGraphLoaded);
				if(this.pageYOffset > 500){
					scope.otherGraphLoaded = true;
					scope.$apply();
				}
			});
		}
	};
});