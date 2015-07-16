"use strict";angular.module("ngMaterializeDocs",["ngAnimate","ngMessages","ui.router","smoothScroll","ngMaterialize"]).config(["$stateProvider","$urlRouterProvider","$locationProvider","$urlMatcherFactoryProvider",function(a,b,c,d){d.strictMode(!1),c.html5Mode(!1),b.otherwise(function(a){a.invoke(["$state",function(a){a.go("app.main")}])}),a.state("app",{"abstract":!0,templateUrl:"views/partials/app.html",controller:"AppCtrl"}).state("app.main",{url:"/",templateUrl:"views/main.html",controller:"MainCtrl"})}]),angular.module("ngMaterializeDocs").controller("MainCtrl",["$scope","$modal","$toast",function(a,b,c){var d=["Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.","Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.","Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato."];a.openOne=!0,a.flatAccordionGroups=[{title:"First",icon:"subtitles",content:d[0],open:!1},{title:"Second",icon:"games",content:d[1],open:!1},{title:"Third",icon:"library_books",content:d[2],open:!1}],a.popoutAccordionGroups=angular.copy(a.flatAccordionGroups),a.tabs=[{heading:"Tab 1",content:d[0],disable:!1},{heading:"Tab 2",content:d[1],disable:!1},{heading:"Disabled Tab 3",content:"This tab is disabled",disable:!0},{heading:"Tab 4",content:d[2],disable:!1}],a.justifiedTabs=[{heading:"Tab 1",content:d[0],disable:!1},{heading:"Tab 2",content:d[1],disable:!1},{heading:"Tab 3",content:d[2],disable:!1}],a.onTabSelect=function(b){a.selectedTab=b};var e=1;a.showToast=function(a,b){c.show("This is sample toast "+e+".",a,b),e++};var f=["item 1","item 2","item 3"];a.openModal=function(c){var d=b.open({templateUrl:"views/partials/modals/example-modal.html",anchorElement:c?angular.element(c.target):void 0,controller:"ModalInstanceCtrl",resolve:{items:function(){return f}}});d.result.then(function(b){a.modalResult="You selected "+b},function(){a.modalResult="You dismissed the modal"})}}]),angular.module("ngMaterializeDocs").controller("AppCtrl",["$scope","smoothScroll",function(a,b){a.directives=[{name:"Accordion",id:"accordion"},{name:"Dropdown",id:"dropdown"},{name:"Ink",id:"ink"},{name:"Tabs",id:"tabs"},{name:"Text Field",id:"text-field"},{name:"Tooltip",id:"tooltip"}],a.services=[{name:"Modal",id:"modal"},{name:"Toast",id:"toast"}],a.scrollTo=function(a,c){a.preventDefault(),b(document.getElementById(c),{offset:75})}}]),angular.module("ngMaterializeDocs").controller("ModalInstanceCtrl",["$scope","$modalInstance","items",function(a,b,c){a.items=c,a.form={selectedItem:c[0]},a.select=function(a){b.close(a)},a.cancel=function(){b.dismiss("cancel")}}]),angular.module("ngMaterializeDocs").directive("prism",["$window",function(a){return{restrict:"A",link:function(b,c,d){c.ready(function(){a.Prism&&a.Prism.highlightElement(c[0])})}}}]),angular.module("ngMaterialize",["ngAnimate","template/tooltip/tooltip-popup.html","template/tooltip/tooltip-template-popup.html","template/accordion/accordion.html","template/accordion/accordion-group.html","ngMaterialize.core","ngMaterialize.toast","ngMaterialize.accordion","ngMaterialize.tooltip","ngMaterialize.floating-label","ngMaterialize.character-counter","ngMaterialize.modal","ngMaterialize.tabs","ngMaterialize.textarea","ngMaterialize.ink","ngMaterialize.dropdown"]),angular.module("ngMaterialize.core",[]).factory("constant",["$sniffer",function(a){function b(a){return c?"webkit"+a.charAt(0).toUpperCase()+a.substring(1):a}var c=/webkit/i.test(a.vendorPrefix);return{CSS:{TRANSITIONEND:"transitionend"+(c?" webkitTransitionEnd":""),ANIMATIONEND:"animationend"+(c?" webkitAnimationEnd":""),TRANSFORM:b("transform"),TRANSFORM_ORIGIN:b("transformOrigin"),TRANSITION:b("transition"),TRANSITION_DURATION:b("transitionDuration"),ANIMATION_PLAY_STATE:b("animationPlayState"),ANIMATION_DURATION:b("animationDuration"),ANIMATION_NAME:b("animationName"),ANIMATION_TIMING:b("animationTimingFunction"),ANIMATION_DIRECTION:b("animationDirection")}}}]).factory("$position",["$document","$window",function(a,b){function c(a){return"static"===(d(a,"position")||"static")}function d(a,c){return a.currentStyle?a.currentStyle[c]:b.getComputedStyle?b.getComputedStyle(a)[c]:a.style[c]}var e=function(b){for(var d=a[0],e=b.offsetParent||d;e&&e!==d&&c(e);)e=e.offsetParent;return e||d};return{position:function(b){var c=this.offset(b),d={top:0,left:0},f=e(b[0]);f!==a[0]&&(d=this.offset(angular.element(f)),d.top+=f.clientTop-f.scrollTop,d.left+=f.clientLeft-f.scrollLeft);var g=b[0].getBoundingClientRect();return{width:g.width||b.prop("offsetWidth"),height:g.height||b.prop("offsetHeight"),top:c.top-d.top,left:c.left-d.left}},offset:function(c){var d=c[0].getBoundingClientRect();return{width:d.width||c.prop("offsetWidth"),height:d.height||c.prop("offsetHeight"),top:d.top+(b.pageYOffset||a[0].documentElement.scrollTop),left:d.left+(b.pageXOffset||a[0].documentElement.scrollLeft)}},positionElements:function(a,b,c,d){var e,f,g,h,i=c.split("-"),j=i[0],k=i[1]||"center";e=d?this.offset(a):this.position(a),f=b.prop("offsetWidth"),g=b.prop("offsetHeight");var l={center:function(){return e.left+e.width/2-f/2},left:function(){return e.left},right:function(){return e.left+e.width}},m={center:function(){return e.top+e.height/2-g/2},top:function(){return e.top},bottom:function(){return e.top+e.height}};switch(j){case"right":h={top:m[k](),left:l[j]()};break;case"left":h={top:m[k](),left:e.left-f};break;case"bottom":h={top:m[j](),left:l[k]()};break;default:h={top:e.top-g,left:l[k]()}}return h}}}]),angular.module("ngMaterialize.accordion",[]).constant("accordionConfig",{closeOthers:!0}).controller("AccordionController",["$scope","$attrs","accordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(c){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("accordion",function(){return{restrict:"EA",controller:"AccordionController",transclude:!0,replace:!1,templateUrl:"template/accordion/accordion.html",link:function(a,b,c){b.addClass("collapsible"),angular.isDefined(c.accordionPopout)&&b.addClass("popout")}}}).directive("accordionGroup",function(){return{require:"^accordion",restrict:"EA",transclude:!0,replace:!0,templateUrl:"template/accordion/accordion-group.html",scope:{heading:"@",onSelect:"&select",onDeselect:"&deselect",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){d.addGroup(a),a.$watch("isOpen",function(b){b&&d.closeOthers(a)}),a.toggleOpen=function(){a.isDisabled||(a.isOpen=!a.isOpen,a.isOpen?a.onSelect():a.onDeselect())}}}}).directive("accordionHeading",function(){return{restrict:"EA",transclude:!0,template:"",replace:!0,require:"^accordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,angular.noop))}}}).directive("accordionTransclude",function(){return{require:"^accordionGroup",link:function(a,b,c,d){a.$watch(function(){return d[c.accordionTransclude]},function(a){a&&(b.html(""),b.append(a))})}}}),angular.module("template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion-group.html",'<li ng-class="{active: isOpen}">\n  <div class="collapsible-header pointer" ng-click="toggleOpen()" ink>\n      <span accordion-transclude="heading"><span ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></span>\n  </div>\n  <div class="collapsible-body">\n    <div ng-transclude></div>\n  </div>\n</li>\n')}]),angular.module("template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("template/accordion/accordion.html","<ul ng-transclude></ul>")}]),angular.module("ngMaterialize.character-counter",[]).directive("characterCounter",["$compile",function(a){return{require:"ngModel",scope:{},link:function(b,c,d,e){function f(){i.toggleClass("active",!0)}function g(){i.toggleClass("active",!1)}var h=parseInt(d.characterCounter),i=angular.element('<div class="character-counter"><span ng-bind="charCount()"></span>/'+h+"</div>");c.parent().append(a(i)(b)),b.charCount=function(){return e.$viewValue?e.$viewValue.length:0},c.bind("focus",f),c.bind("blur",g),b.$on("$destroy",function(){c.unbind("focus",f),c.unbind("blur",g)})}}}]),angular.module("ngMaterialize.dropdown",[]).service("dropdownService",["$document","$rootScope",function(a,b){var c=null;this.open=function(b){c||(a.bind("click",d),a.bind("keydown",e)),c&&c!==b&&(c.isOpen=!1),c=b},this.close=function(b){c===b&&(c=null,a.unbind("click",d),a.unbind("keydown",e))};var d=function(a){if(c&&(!a||"disabled"!==c.getAutoClose())){var d=c.getToggleElement();if(!(a&&d&&d[0].contains(a.target))){var e=c.getElement();if(!(a&&"outsideClick"===c.getAutoClose()&&e&&e[0].contains(a.target))){var f=c.getMenuElement();a&&"outsideClick"===c.getAutoClose()&&f&&f[0].contains(a.target)||(c.isOpen=!1,b.$$phase||c.$apply())}}}},e=function(a){27===a.which&&(c.focusToggleElement(),d())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownService","$position","$document","$animate","constant",function(a,b,c,d,e,f,g,h){var i,j=this,k=a.$new(),l=angular.noop,m=b.onToggle?c(b.onToggle):angular.noop,n=!1;this.init=function(d){j.$element=d,b.isOpen&&(i=c(b.isOpen),l=i.assign,a.$watch(i,function(a){k.isOpen=!!a})),n=angular.isDefined(b.dropdownAppendToBody),n&&j.dropdownMenu&&(f.find("body").append(j.dropdownMenu),d.on("$destroy",function(){j.dropdownMenu.remove()}))},this.toggle=function(a){return k.isOpen=arguments.length?!!a:!k.isOpen,k.isOpen},this.isOpen=function(){return k.isOpen},k.getToggleElement=function(){return j.toggleElement},k.getAutoClose=function(){return b.autoClose||"always"},k.getElement=function(){return j.$element},k.getMenuElement=function(){return j.dropdownMenu},k.focusToggleElement=function(){j.toggleElement&&j.toggleElement[0].focus()},k.$watch("isOpen",function(b,c){var f,i,o={},p={};j.dropdownMenu&&(b?(n&&(i=e.positionElements(j.$element,j.dropdownMenu,"top-left",!0),o.top=i.top+"px",o.left=i.left+"px"),f=j.toggleElement[0].getBoundingClientRect(),o.display="block",o["min-width"]=f.width+"px",o[h.CSS.TRANSFORM_ORIGIN]="50% 0",o[h.CSS.TRANSFORM]="scale(1, 0.5)",p.opacity=1,p[h.CSS.TRANSFORM]="",j.dropdownMenu.css(o),g.animate(j.dropdownMenu[0],o,p,"dropdown-in")):!b&&c&&(o[h.CSS.TRANSFORM_ORIGIN]="50% 0",p.opacity=0,p[h.CSS.TRANSFORM]="scale(1, 0.5)",j.dropdownMenu.css(o),g.animate(j.dropdownMenu[0],o,p,"dropdown-in").then(function(){j.dropdownMenu.css({display:"none"})}))),b?(k.focusToggleElement(),d.open(k)):d.close(k),l(a,b),angular.isDefined(b)&&b!==c&&m(a,{open:!!b})}),a.$on("$locationChangeSuccess",function(){k.isOpen=!1}),a.$on("$destroy",function(){k.$destroy()})}]).directive("dropdown",function(){return{controller:"DropdownController",link:function(a,b,c,d){d.init(b),b.css({position:"relative"})}}}).directive("dropdownMenu",function(){return{restrict:"AC",require:"?^dropdown",link:function(a,b,c,d){d&&(b.addClass("dropdown-content"),b.css({position:"absolute",top:0,left:0}),d.dropdownMenu=b)}}}).directive("dropdownToggle",function(){return{require:"?^dropdown",link:function(a,b,c,d){if(d){d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("ngMaterialize.floating-label",[]).directive("floatingLabel",[function(){return{require:"ngModel",link:function(a,b,c,d){function e(){console.log("label on? "),b.parent().children().toggleClass(i,!0),h.toggleClass(i,!0)}function f(){var a=!!d.$viewValue&&!!d.$viewValue.length;b.parent().children().toggleClass(i,a),h.toggleClass(i,a)}var g=c.id||"",h=angular.element('<label for="'+g+'">'+c.floatingLabel+"</label>"),i="active";b.parent().append(h),a.ngModel=d,a.$watch("ngModel.$viewValue",f),b.bind("focus",e),b.bind("blur",f),a.$on("$destroy",function(){b.unbind("focus",e),b.unbind("blur",f)})}}}]),angular.module("ngMaterialize.ink",[]).run(["$window",function(a){a.Waves&&a.Waves.init({duration:1e3})}]).factory("$ink",["$window",function(a){return{link:function(b,c,d){if(a.Waves&&("undefined"==typeof d.noInk||b.$eval(d.noInk)===!1)){var e=window.getComputedStyle(c[0],null),f={display:e.getPropertyValue("display"),cursor:e.getPropertyValue("cursor")},g="waves-"+(d.inkColor||"classic");a.Waves.attach(c[0],g),angular.extend(c[0].style,f)}}}}]).directive("ink",["$ink",function(a){return{restrict:"A",link:a.link}}]).directive("button",["$ink",function(a){return{restrict:"E",link:a.link}}]),angular.module("ngMaterialize.modal",["template/modal/backdrop.html","template/modal/window.html"]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b==a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b==a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.splice(a.length-1,1)[0]},length:function(){return a.length}}}}}).directive("modalBackdrop",["$timeout","$modalStack",function(a,b){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(a){a.close=function(a){var c=b.getTop();c&&c.value.backdrop&&"static"!==c.value.backdrop&&a.target===a.currentTarget&&(a.preventDefault(),a.stopPropagation(),b.dismiss(c.key,"backdrop click"))}}}}]).directive("modalWindow",["$modalStack","$q","$timeout","constant",function(a,b,c,d){return{restrict:"EA",scope:{index:"@",anchorElement:"="},replace:!0,transclude:!0,templateUrl:function(a,b){return b.templateUrl||"template/modal/window.html"},link:function(e,f,g){function h(a,b){if(b){var e=b[0].getBoundingClientRect(),f=a[0].getBoundingClientRect(),g=Math.min(.5,e.width/f.width),h=Math.min(.5,e.height/f.height),i=e.left-f.left-f.width/2+e.width/2,j=e.top-f.top-f.height/2+e.height/2;a.css(d.CSS.TRANSFORM,"translate3d("+i+"px,"+j+"px, 0) scale("+g+","+h+")")}else a.css(d.CSS.TRANSFORM,"scaleX(0.8) translate3d(0, 20%, 0)");a.css("opacity",0),c(function(){a.css(d.CSS.TRANSITION,"all 0.25s ease-in-out"),a.css("outline",0),a.css("opacity",1),a.css(d.CSS.TRANSFORM,"")})}e.$isRendered=!0;var i=b.defer();g.$observe("modalRender",function(a){"true"===a&&i.resolve()}),i.promise.then(function(){h(f,e.anchorElement);var b=f[0].querySelectorAll("[autofocus]");b.length?b[0].focus():f[0].focus();var c=a.getTop();c&&a.modalRendered(c.key)})}}}]).directive("modalTransclude",function(){return{link:function(a,b,c,d,e){e(a.$parent,function(a){b.empty(),b.append(a)})}}}).factory("$modalStack",["$timeout","$document","$compile","$rootScope","$$stackedMap","$q","$animate","constant",function(a,b,c,d,e,f,g,h){function i(){for(var a=-1,b=r.keys(),c=0;c<b.length;c++)r.get(b[c]).value.backdrop&&(a=c);return a}function j(a){var c=b.find("body").eq(0),d=r.get(a).value;r.remove(a),m(d.modalDomEl,d.modalScope,function(){c.toggleClass(q,r.length()>0)}),k()}function k(){if(o&&-1===i()){var a=p;g.leave(o).then(function(){a.$destroy()}),o=void 0,p=void 0}}function l(a){function b(d){d.target===a[0]&&(a.off(h.CSS.TRANSITIONEND,b),c.resolve())}var c=f.defer();return a.on(h.CSS.TRANSITIONEND,b),c.promise}function m(a,b,c){function d(){d.done||(d.done=!0,a.remove(),b.$destroy(),c&&c())}if(b.anchorElement){var e=b.anchorElementRect,f=a[0].getBoundingClientRect(),g=Math.min(.5,e.width/f.width),i=Math.min(.5,e.height/f.height),j=e.left-f.left-f.width/2+e.width/2,k=e.top-f.top-f.height/2+e.height/2;a.css(h.CSS.TRANSFORM,"translate3d("+j+"px,"+k+"px, 0) scale("+g+","+i+")")}else a.css(h.CSS.TRANSFORM,"scaleX(0.8) translate3d(0, 20%, 0)");a.css("opacity",0),l(a).then(d)}function n(a,b,c){return!a.value.modalScope.$broadcast("modal.closing",b,c).defaultPrevented}var o,p,q="modal-open",r=e.createNew(),s={};return d.$watch(i,function(a){p&&(p.index=a)}),b.bind("keydown",function(a){var b;27===a.which&&(b=r.top(),b&&b.value.keyboard&&(a.preventDefault(),d.$apply(function(){s.dismiss(b.key,"escape key press")})))}),s.open=function(a,e){var f=b[0].activeElement;r.add(a,{deferred:e.deferred,renderDeferred:e.renderDeferred,modalScope:e.scope,backdrop:e.backdrop,keyboard:e.keyboard});var h=b.find("body").eq(0),j=i();if(j>=0&&!o){p=d.$new(!0),p.index=j;var k=angular.element('<div modal-backdrop="modal-backdrop" class="modal-backdrop"></div>');o=c(k)(p),g.enter(o,h)}e.anchorElement&&(e.scope.anchorElement=e.anchorElement,e.scope.anchorElementRect=e.anchorElement[0].getBoundingClientRect());var l=angular.element('<div modal-window="modal-window"></div>');l.attr({"template-url":e.windowTemplateUrl,index:r.length()-1,"anchor-element":"anchorElement"}).html(e.content);var m=c(l)(e.scope);r.top().value.modalDomEl=m,r.top().value.modalOpener=f,h.append(m),h.addClass(q)},s.close=function(a,b){var c=r.get(a);return c&&n(c,b,!0)?(c.value.deferred.resolve(b),j(a),c.value.modalOpener.focus(),!0):!c},s.dismiss=function(a,b){var c=r.get(a);return c&&n(c,b,!1)?(c.value.deferred.reject(b),j(a),c.value.modalOpener.focus(),!0):!c},s.dismissAll=function(a){for(var b=this.getTop();b&&this.dismiss(b.key,a);)b=this.getTop()},s.getTop=function(){return r.top()},s.modalRendered=function(a){var b=r.get(a);b&&b.value.renderDeferred.resolve()},s}]).provider("$modal",function(){var a={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$templateRequest","$controller","$modalStack",function(b,c,d,e,f,g){function h(a){return a.template?d.when(a.template):e(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl)}function i(a){var c=[];return angular.forEach(a,function(a){(angular.isFunction(a)||angular.isArray(a))&&c.push(d.when(b.invoke(a)))}),c}var j={};return j.open=function(b){var e=d.defer(),j=d.defer(),k=d.defer(),l={result:e.promise,opened:j.promise,rendered:k.promise,close:function(a){return g.close(l,a)},dismiss:function(a){return g.dismiss(l,a)}};if(b=angular.extend({},a.options,b),b.resolve=b.resolve||{},!b.template&&!b.templateUrl)throw new Error("One of template or templateUrl options is required.");var m=d.all([h(b)].concat(i(b.resolve)));return m.then(function(a){var d=(b.scope||c).$new();d.$close=l.close,d.$dismiss=l.dismiss;var h,i={},j=1;b.controller&&(i.$scope=d,i.$modalInstance=l,angular.forEach(b.resolve,function(b,c){i[c]=a[j++]}),h=f(b.controller,i),b.controllerAs&&(d[b.controllerAs]=h)),g.open(l,{scope:d,deferred:e,renderDeferred:k,content:a[0],backdrop:b.backdrop,keyboard:b.keyboard,anchorElement:b.anchorElement,windowTemplateUrl:b.windowTemplateUrl})},function(a){e.reject(a)}),m.then(function(){j.resolve(!0)},function(a){j.reject(a)}),l},j}]};return a}),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(a){a.put("template/modal/backdrop.html",'<div class="lean-overlay"\n	ng-click="close($event)">\n></div>\n')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(a){a.put("template/modal/window.html",'<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal"\n	style="display: block; opacity: 1; top: 10%;"\n	ng-click="close($event)">\n<div modal-transclude></div>\n</div>\n')}]),angular.module("ngMaterialize.tabs",["template/tabs/tabset.html","template/tabs/tab.html"]).controller("TabsetController",["$scope","$timeout","$animate","$window",function(a,b,c,d){function e(b){var c=a.tabsetElement[0].getBoundingClientRect().width,d={left:0,right:c},e=!1;return angular.forEach(l,function(a){var c=a.headingTranscludeElement[0].getBoundingClientRect().width;e||(d.right-=c,a!==b?d.left+=c:e=!0)}),d}function f(b){var c=e(b);a.indicator.css({left:Math.round(c.left)+"px",right:Math.round(c.right)+"px"})}function g(c){var d=e(j),g=i?e(i):d,h=d.left>g.left?"right":"left",k="indicator-"+h;c&&i&&!a.indicator.hasClass(k)?(a.indicator.toggleClass("indicator-left","left"===h),a.indicator.toggleClass("indicator-right","right"===h),b(function(){f(j)})):b(function(){f(j)})}function h(){a.indicator.toggleClass("indicator-left",!1),a.indicator.toggleClass("indicator-right",!1),b(function(){g(!1)})}var i,j,k=this,l=k.tabs=a.tabs=[];a.reverse=!1,k.select=function(c){var d=0,e=0;angular.forEach(l,function(a,b){a.active&&a!==c&&(i=a,a.active=!1,a.onDeselect(),d=b),a===c&&(e=b)}),a.reverse=d>e,c.onSelect(),c.active=!0,j=c,i?g(!0):b(g)},k.addTab=function(a){l.push(a),1===l.length&&a.active!==!1?a.active=!0:a.active?k.select(a):a.active=!1},k.removeTab=function(a){var b=l.indexOf(a);if(a.active&&l.length>1&&!n){var c=b===l.length-1?b-1:b+1;k.select(l[c])}l.splice(b,1)};var m=angular.element(d);m.on("resize",h);var n;a.$on("$destroy",function(){n=!0,m.off("resize",h)})}]).directive("tabset",["$timeout",function(a){return{restrict:"EA",transclude:!0,replace:!0,scope:{type:"@"},controller:"TabsetController",templateUrl:"template/tabs/tabset.html",link:function(b,c,d){b.stateNav=angular.isDefined(d.stateNav)?b.$parent.$eval(d.stateNav):!1,b.justified=angular.isDefined(d.justified)?b.$parent.$eval(d.justified):!1,b.noContent=angular.isDefined(d.noContent)?b.$parent.$eval(d.noContent):!1,b.tabsetElement=c,b.indicator=angular.element('<div class="indicator"></div>'),a(function(){c.append(b.indicator)})}}}]).directive("tab",["$parse","$log",function(a,b){return{require:"^tabset",restrict:"EA",replace:!0,templateUrl:"template/tabs/tab.html",transclude:!0,scope:{active:"=?",disabled:"=?",heading:"@",state:"@",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},compile:function(b,c,d){return function(b,c,e,f){b.$watch("active",function(a){a&&f.select(b)}),b.state=e.state,b.disabled=!1,e.disable&&b.$parent.$watch(a(e.disable),function(a){b.disabled=!!a}),b.select=function(){b.disabled||(b.active=!0)},b.reverse=!1,f.addTab(b),b.$on("$destroy",function(){f.removeTab(b)}),b.$transcludeFn=d}}}}]).directive("tabHeadingTransclude",[function(){return{restrict:"A",require:"^tab",link:function(a,b){a.headingTranscludeElement=b,a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}]).directive("tabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("tab-heading")||a.hasAttribute("data-tab-heading")||"tab-heading"===a.tagName.toLowerCase()||"data-tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^tabset",link:function(b,c,d){var e=b.$eval(d.tabContentTransclude);e.$transcludeFn(e.$parent,function(d){angular.forEach(d,function(d){a(d)?e.headingElement=d:b.stateNav||c.append(d)})})}}}),angular.module("template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tab.html",'<li class="tab" ng-class="{active: active, disabled: disabled}">\n  <a href ng-click="select()" tab-heading-transclude ink>{{heading}}</a>\n</li>\n')}]),angular.module("template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("template/tabs/tabset.html",'<div class="tabs">\n  <ul ng-transclude ng-class="{\'tabs-justified\': justified}"></ul>\n  <div class="tab-content">\n    <div class="tab-pane" \n         ng-repeat="tab in tabs" \n         ng-show="tab.active && !noContent"\n         ng-class="{\'tab-reverse\': reverse}"\n         tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("ngMaterialize.textarea",[]).directive("materializeTextarea",["$document","$window","$timeout",function(a,b,c){return{restrict:"A",require:"ngModel",link:function(d,e,f,g){function h(){c.cancel(j),j=c(i,100)}function i(){var a="none"!==e.css("display"),b=a?e[0].getBoundingClientRect().width:l.getBoundingClientRect().width/2;k.css({"font-size":e.css("font-size"),"font-family":e.css("font-family"),"overflow-wrap":"off"===f.wrap?"normal":void 0,"white-space":"off"===f.wrap?"pre":void 0,width:b+"px"}),k.text(e.val()+"\n"),k.html(k.html().replace(/\n/g,"<br>")),k[0].style.position="fixed",k[0].style.visibility="hidden",e.css("height",k[0].offsetHeight+"px")}var j,k=angular.element('<div class="hiddendiv"></div>'),l=a.find("body"),m=angular.element(b);l.append(k),e.addClass("materialize-textarea"),m.bind("resize",h),d.ngModel=g,d.$watch("ngModel.$viewValue",i),d.$on("$destroy",function(){k.remove(),m.unbind("resize",h)})}}}]),angular.module("ngMaterialize.toast",[]).factory("$toast",["$timeout","$q","$animate",function(a,b,c){function d(){return angular.element(document.body)}function e(){var d=[];return angular.forEach(g,function(b){a.cancel(b.timeout),d.push(c.leave(b.element).then(b.defer.resolve))}),g=[],b.all(d)}function f(a,b){var c=angular.element(document.createElement("div"));return c.addClass("undefined"!=typeof b?b+" toast":"toast"),c.append("<div>"+a+"</div>"),c}var g=[];return{show:function(h,i,j){var k=b.defer();return e().then(function(){var b={element:f(h,j),timeout:a(e,i||2500),defer:k};g.push(b),c.enter(b.element,d())}),k.promise}}}]),angular.module("ngMaterialize.tooltip",["ngMaterialize.core"]).provider("$tooltip",function(){function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"bottom",popupDelay:0,useContentExp:!1},c={mouseenter:{show:["mouseenter"],hide:["mouseleave"]},click:{show:["click"],hide:["click"]},focus:{show:["focus"],hide:["blur"]},clickOff:{show:["mouseenter"],hide:["mouseleave","click"]}},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$document","$position","$interpolate","$animate",function(e,f,g,h,i,j,k){return function(e,l,m,n){function o(a){return c[a]||c[n.trigger]||c[m]}n=angular.extend({},b,d,n);var p=a(e),q=j.startSymbol(),r=j.endSymbol(),s="<div "+p+'-popup title="'+q+"title"+r+'" '+(n.useContentExp?'content-exp="contentExp()" ':'content="'+q+"content"+r+'" ')+'is-open="isOpen"origin-scope="origScope" ></div>';return{restrict:"EA",compile:function(a,b){var c=f(s);return function(a,b,d,f){function j(){F.isOpen?p():m()}function m(){(!E||a.$eval(d[l+"Enable"]))&&(u(),F.popupDelay?B||(B=g(q,F.popupDelay,!1),B.then(function(a){a()})):q()())}function p(){a.$apply(function(){r()})}function q(){return B=null,A&&(g.cancel(A),A=null),(n.useContentExp?F.contentExp():F.content)?(s(),y.css({top:0,left:0,display:"block"}),F.$digest(),G(),F.isOpen=!0,F.$apply(),G):angular.noop}function r(){F.isOpen=!1,g.cancel(B),B=null,t()}function s(){y&&t(),z=F.$new(),y=c(z,function(a){C?k.enter(a,h.find("body")):k.enter(a,void 0,b)}),z.$watch(function(){g(G,0,!1)}),n.useContentExp&&z.$watch("contentExp()",function(a){!a&&F.isOpen&&r()})}function t(){A=null,y&&(k.leave(y),y=null),z&&(z.$destroy(),z=null)}function u(){v(),w()}function v(){F.placement=n.placement}function w(){var a=d[l+"PopupDelay"],b=parseInt(a,10);console.log("delay",b,d,a),F.popupDelay=isNaN(b)?n.popupDelay:b}function x(){var a=d[l+"Trigger"];H(),D=o(a);var c=[];angular.forEach(D.show,function(a){angular.forEach(D.hide,function(b){a===b&&c.push(a)})}),angular.forEach(c,function(a){b.bind(a,j)}),angular.forEach(D.show,function(a){-1===c.indexOf(a)&&b.bind(a,m)}),angular.forEach(D.hide,function(a){-1===c.indexOf(a)&&b.bind(a,p)})}var y,z,A,B,C=angular.isDefined(n.appendToBody)?n.appendToBody:!1,D=o(void 0),E=angular.isDefined(d[l+"Enable"]),F=a.$new(!0),G=function(){if(y){var a=i.positionElements(b,y,F.placement,C);a.top+="px",a.left+="px",y.css(a)}};F.origScope=a,F.isOpen=!1,F.contentExp=function(){return a.$eval(d[e])},n.useContentExp||d.$observe(e,function(a){F.content=a,!a&&F.isOpen&&r()}),d.$observe("disabled",function(a){a&&F.isOpen&&r()}),d.$observe(l+"Title",function(a){F.title=a});var H=function(){angular.forEach(D.show,function(a){b.unbind(a,m)}),angular.forEach(D.hide,function(a){b.unbind(a,p)})};x();var I=a.$eval(d[l+"AppendToBody"]);C=angular.isDefined(I)?I:C,C&&a.$on("$locationChangeSuccess",function(){F.isOpen&&r()}),a.$on("$destroy",function(){g.cancel(A),g.cancel(B),H(),t(),F=null})}}}}}]}).directive("tooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest",function(a,b,c,d){return{link:function(e,f,g){var h,i,j,k=e.$eval(g.tooltipTemplateTranscludeScope),l=0,m=function(){i&&(i.remove(),i=null),h&&(h.$destroy(),h=null),j&&(a.leave(j).then(function(){i=null}),i=j,j=null)};e.$watch(b.parseAsResourceUrl(g.tooltipTemplateTransclude),function(b){var g=++l;b?(d(b,!0).then(function(d){if(g===l){var e=k.$new(),i=d,n=c(i)(e,function(b){m(),a.enter(b,f)});h=e,j=n,h.$emit("$includeContentLoaded",b)}},function(){g===l&&(m(),e.$emit("$includeContentError",b))}),e.$emit("$includeContentRequested",b)):m()}),e.$on("$destroy",m)}}}]).directive("tooltipPopup",function(){return{restrict:"EA",replace:!0,scope:{content:"@",isOpen:"&"},templateUrl:"template/tooltip/tooltip-popup.html"}}).directive("tooltip",["$tooltip",function(a){return a("tooltip","tooltip","mouseenter")}]).directive("tooltipTemplatePopup",function(){return{restrict:"EA",replace:!0,scope:{contentExp:"&",isOpen:"&",originScope:"&"},templateUrl:"template/tooltip/tooltip-template-popup.html"}}).directive("tooltipTemplate",["$tooltip",function(a){return a("tooltipTemplate","","mouseenter",{useContentExp:!0})}]),angular.module("template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-popup.html",'<div class="tooltip"\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-inner" ng-bind="content"></div>\n</div>\n')}]),angular.module("template/tooltip/tooltip-template-popup.html",[]).run(["$templateCache",function(a){a.put("template/tooltip/tooltip-template-popup.html",'<div class="tooltip"\n  ng-class="{ in: isOpen() }">\n  <div class="tooltip-inner"\n    tooltip-template-transclude="contentExp()"\n    tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')}]);angular.module('ngMaterializeDocs').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "\n" +
    "<div class=\"container\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"about\" class=\"header\">About</h2>\n" +
    "      <p class=\"caption\">\n" +
    "        <strong>ng-materialize</strong> is a custom build of the <a href=\"http://materializecss.com/\">Materialize</a> framework that includes native AngularJS components.\n" +
    "        The directives favor simplicity over customization, and aim to adhere to a strict interpretation of Google's <a href=\"https://www.google.com/design/spec/material-design/introduction.html\">Material Design.</a>\n" +
    "        The project removes Materialize's jQuery, Velocity.js and custom JavaScript dependencies, but requires <a href=\"https://docs.angularjs.org/api/ngAnimate\">ngAnimate</a> and <a href=\"http://fian.my.id/Waves/\">Waves</a> (one of Materialize's hidden dependencies).\n" +
    "      </p>\n" +
    "      <p>\n" +
    "        ng-materialize was initially developed alongside a separate project, with directives added on an as-needed basis.\n" +
    "        It is a work in progress.\n" +
    "        It borrows heavily from UI Bootstrap but also uses snippets from Angular Material and Materialize's custom JavaScript.\n" +
    "        A huge thanks goes out to these projects' contributors.\n" +
    "      </p>\n" +
    "    </div>\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"getting-started\" class=\"header\">Getting Started</h2>\n" +
    "      <pre class=\"language-markup\"><code>bower install ng-materialize</code></pre>\n" +
    "      <ul class=\"bulleted\">\n" +
    "        <li>ng-materialize is a custom build of Materialize. Do not include the original library</li>\n" +
    "        <li>The Roboto and Material Icons font families are imported from <a href=\"https://www.google.com/fonts\">Google Fonts</a> in the css</li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"directives\" class=\"header\">Directives</h2>\n" +
    "      <h3 id=\"accordion\">Accordion</h3>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <h4>Default</h4>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <p>\n" +
    "                  <input id=\"open-one\" type=\"checkbox\" ng-model=\"openOne\"/>\n" +
    "                  <label for=\"open-one\">Open only one at a time</label>\n" +
    "                </p>\n" +
    "                <accordion close-others=\"openOne\">\n" +
    "                  <accordion-group ng-repeat=\"accordionGroup in flatAccordionGroups\">\n" +
    "                    <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "                    <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "                  </accordion-group>\n" +
    "                </accordion>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;p&gt;\n" +
    "  &lt;input type=&quot;checkbox&quot; id=&quot;open-one&quot; ng-model=&quot;openOne&quot;/&gt;\n" +
    "  &lt;label for=&quot;open-one&quot;&gt;Open only one at a time&lt;/label&gt;\n" +
    "&lt;/p&gt;\n" +
    "&lt;accordion close-others=&quot;openOne&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.openOne = true;\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0]\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1]\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2]\n" +
    "      }\n" +
    "    ];\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <h4>Popout</h4>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div class=\"row\">\n" +
    "                  <div ng-repeat=\"accordionGroup in popoutAccordionGroups\" class=\"col s12 m4\">\n" +
    "                    <input type=\"checkbox\" ng-model=\"accordionGroup.open\" id=\"{{accordionGroup.title}}\"/>\n" +
    "                    <label for=\"{{accordionGroup.title}}\" ng-bind=\"accordionGroup.title\"></label>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <accordion accordion-popout=\"accordion-popout\" close-others=\"false\">\n" +
    "                  <accordion-group ng-repeat=\"accordionGroup in popoutAccordionGroups\" is-open=\"accordionGroup.open\">\n" +
    "                    <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "                    <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "                  </accordion-group>\n" +
    "                </accordion>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 m4&quot; ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;input type=&quot;checkbox&quot; id=&quot;{{accordionGroup.title}}&quot; ng-model=&quot;accordionGroup.open&quot;/&gt;\n" +
    "    &lt;label for=&quot;{{accordionGroup.title}}&quot;&gt;{{accordionGroup.title}}&lt;/label&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;accordion accordion-popout, close-others=&quot;false&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot; is-open=&quot;accordionGroup.open&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2],\n" +
    "        open: false\n" +
    "      }\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=true {boolean} (bound)</div><code>close-others</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>accordion-popout</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion-group&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"dropdown\">Dropdown</h3><a href=\"http://www.google.com/design/spec/components/menus.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/menus.html\">Menus allow users to take an action by selecting from a list of choices revealed upon opening a temporary, new sheet of material.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div style=\"min-height: 200px;\">\n" +
    "                  <div dropdown=\"dropdown\">\n" +
    "                    <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Default Dropdown</button>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                      <li><a href=\"href\">One</a></li>\n" +
    "                      <li><a href=\"href\">Two</a></li>\n" +
    "                      <li class=\"divider\"></li>\n" +
    "                      <li><a href=\"href\">Three</a></li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Default Dropdown&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div style=\"min-height: 200px;\">\n" +
    "                  <div dropdown=\"dropdown\" auto-close=\"outsideClick\" style=\"display: inline-block;\">\n" +
    "                    <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Outside Click to Close</button>\n" +
    "                    <ul class=\"dropdown-menu\">\n" +
    "                      <li><a>One</a></li>\n" +
    "                      <li><a>Two</a></li>\n" +
    "                      <li class=\"divider\"></li>\n" +
    "                      <li><a>Three</a></li>\n" +
    "                    </ul>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown auto-close=&quot;outsideClick&quot; class=&quot;dropdown-wrap&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Outside Click to Close&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>CSS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-css\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-css\">.dropdown-wrap {display: inline-block;}\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=always | outsideClick | disabled {string}</div><code>auto-close</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>dropdown-append-to-body</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown-toggle</code></li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"ink\">Ink</h3><a href=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">Responsive interaction encourages deeper exploration of an app by creating timely, logical, and delightful screen reactions to user input. Each interaction is thoughtful, perhaps whimsical, but never distracting.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <p>Use the <code>ink-color</code> option to change the ink effect's color:</p>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <div class=\"collection\">\n" +
    "                  <a class=\"collection-item\" href ink>Default Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"light\">Light Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"green\">Green Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"orange\">Orange Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"purple\">Purple Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"red\">Red Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"teal\">Teal Ink</a>\n" +
    "                  <a class=\"collection-item\" href ink ink-color=\"yellow\">Yellow Ink</a>\n" +
    "                </div>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;collection&quot;&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink&gt;Default Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;light&quot;&gt;Light Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;red&quot;&gt;Red Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;yellow&quot;&gt;Yellow Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;orange&quot;&gt;Orange Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;purple&quot;&gt;Purple Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;green&quot;&gt;Green Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;teal&quot;&gt;Teal Ink&lt;/a&gt;\n" +
    "&lt;/div&gt;\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <p>ng-materialize includes the ink effect by default on these components:</p>\n" +
    "          <ul class=\"bulleted\">\n" +
    "            <li><code>&lt;button&gt;</code></li>\n" +
    "            <li><code>&lt;accordion-heading&gt;</code></li>\n" +
    "            <li><code>&lt;tab-heading&gt;</code></li>\n" +
    "          </ul>\n" +
    "          <p>Use the <code>no-ink</code> option to disable the effect on buttons:</p>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <button type=\"button\" class=\"btn btn-default\">Button</button>\n" +
    "                <button type=\"button\" no-ink=\"no-ink\" class=\"btn btn-default\">No Ink</button>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;Button&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; no-ink=&quot;true&quot;&gt;No Ink&lt;/button&gt;\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">ink</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=classic | light | red | yellow | orange | purple | green | teal {string}</div><code>ink-color</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>no-ink</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <p>\n" +
    "        Note: To provide Material Design's ripple effect, Materialize wraps the <a href=\"http://fian.my.id/Waves/\">Waves project</a> into its JavaScript.\n" +
    "        ng-materialize unbundles the project and includes it as a dependency. It is required to use the ink directive.\n" +
    "      </p>\n" +
    "      <h3 id=\"tabs\">Tabs</h3><a href=\"http://www.google.com/design/spec/components/tabs.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/tabs.html\">Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l7\">\n" +
    "          <h4>Default (with content)</h4>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <tabset>\n" +
    "                  <tab ng-repeat=\"tab in tabs\" active=\"tab.activeInline\" disable=\"tab.disable\">\n" +
    "                    <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "                    <p>{{tab.content}}</p>\n" +
    "                  </tab>\n" +
    "                </tabset>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot; active=&quot;tab.active&quot; disable=&quot;tab.disable&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab.heading}}&lt;/tab-heading&gt;\n" +
    "    &lt;p&gt;{{tab.content}}&lt;/p&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.tabs = [\n" +
    "      {heading: 'Tab 1', content: lorem[0], disable: false},\n" +
    "      {heading: 'Tab 2', content: lorem[1], disable: false},\n" +
    "      {heading: 'Disabled Tab 3', content: 'This tab is disabled', disable: true},\n" +
    "      {heading: 'Tab 4', content: lorem[2], disable: false}\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l5\">\n" +
    "          <h4>Justified (no content)</h4>\n" +
    "          <p>\n" +
    "            Tab headers can act independently of tab content.\n" +
    "            Use the <code>no-content</code> option along with <code>active</code> or <code>select()</code> to assist in content display.\n" +
    "          </p>\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <tabset justified=\"true\" no-content=\"true\">\n" +
    "                  <tab ng-repeat=\"tab in justifiedTabs\">\n" +
    "                    <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "                  </tab>\n" +
    "                </tabset>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset justified=&quot;true&quot; no-content=&quot;true&quot;&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab}}&lt;/tab-heading&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    $scope.tabs = ['Tab 1', 'Tab 2', 'Tab 3'];\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tabset&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>justified</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>no-content</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab&gt;</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>active</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean} (bound)</div><code>disable</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{func}</div><code>select()</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{func}</div><code>deselect()</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab-heading&gt;</code></li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"text-field\">Text Field</h3><a href=\"http://www.google.com/design/spec/components/text-fields.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/text-fields.html\">Text fields allow the user to input text. They can be single-line, with or without scrolling, or multi-line, and can have an icon.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <form name=\"exampleForm\" novalidate=\"novalidate\">\n" +
    "                  <div class=\"input-field\">\n" +
    "                    <input id=\"example1\" type=\"text\" name=\"example1\" ng-model=\"textFields.example1\" floating-label=\"Counter &amp; Validation\" character-counter=\"10\" ng-maxlength=\"10\" ng-required=\"true\" class=\"validate\"/>\n" +
    "                    <div ng-messages=\"exampleForm.example1.$error\" ng-show=\"exampleForm.example1.$dirty\" class=\"field-hint\">\n" +
    "                      <div ng-message=\"required\">This is required.</div>\n" +
    "                      <div ng-message=\"maxlength\">This field may not exceed 10 characters.</div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                  <div class=\"input-field\">\n" +
    "                    <textarea id=\"example2\" materialize-textarea=\"true\" floating-label=\"Expanding Textarea\" ng-model=\"textfields.example2\"></textarea>\n" +
    "                  </div>\n" +
    "                </form>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;form name=&quot;exampleForm&quot; novalidate&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;input\n" +
    "      type=&quot;text&quot;\n" +
    "      class=&quot;validate&quot;\n" +
    "      id=&quot;example1&quot;\n" +
    "      name=&quot;example1&quot;\n" +
    "      ng-model=&quot;inputs.example1&quot;\n" +
    "      floating-label=&quot;Counter and Validation&quot;\n" +
    "      character-counter=&quot;10&quot;\n" +
    "      ng-maxlength=&quot;10&quot;\n" +
    "      ng-required=&quot;true&quot;/&gt;\n" +
    "    &lt;div class=&quot;field-hint&quot; ng-messages=&quot;exampleForm.example1.$error&quot; ng-show=&quot;exampleForm.example1.$dirty&quot;&gt;\n" +
    "      &lt;div ng-message=&quot;required&quot;&gt;This is required.&lt;/div&gt;\n" +
    "      &lt;div ng-message=&quot;maxlength&quot;&gt;This field may not exceed 10 characters.&lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;textarea\n" +
    "      id=&quot;example2&quot;\n" +
    "      materialize-textarea=&quot;true&quot;\n" +
    "      floating-label=&quot;Expanding Textarea&quot;\n" +
    "      ng-model=&quot;form.example2&gt;\n" +
    "    &lt;/textarea&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/form&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('InputDemoCtrl', function ($scope) {\n" +
    "    $scope.form = {\n" +
    "      example1: null,\n" +
    "      example2: null\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l6\">\n" +
    "          <p>ng-materialize uses directives and CSS classes to stylize text fields:</p>\n" +
    "          <ul class=\"bulleted\">\n" +
    "            <li>\n" +
    "              <p>Use the <code>floating-label</code> directive to add labels to inputs and textareas (The element must also declare the <code>id</code> attribute).</p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>Use the <code>character-counter</code> directive to add a character hint to inputs and textareas.</p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>\n" +
    "                Add the <code>validate</code> class to inputs/textareas for success and error state styling when using <a href=\"https://docs.angularjs.org/api/ng/directive/input\">Angular.JS input validation</a>.\n" +
    "                Include the <code>ignore-success</code> class to exclude success state styling.\n" +
    "              </p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>Wrap error state messages in a div with the <code>field-hint</code> class. Optionally use <a href=\"https://docs.angularjs.org/api/ngMessages/directive/ngMessages\">ngMessages</a> to streamline the process.</p>\n" +
    "            </li>\n" +
    "            <li>\n" +
    "              <p>Use the <code>materialize-textarea</code> directive on a <code>textarea</code> to make the field resize itself based on its contents.</p>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">floating-label</code>\n" +
    "          <div class=\"right\">{string}</div>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">character-counter</code>\n" +
    "          <div class=\"right\">{int}</div>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">materialize-textarea</code>\n" +
    "          <div class=\"right\">{boolean}</div>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <h3 id=\"tooltip\">Tooltip</h3><a href=\"http://www.google.com/design/spec/components/tooltips.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/tooltips.html\">Tooltips are labels that appear on hover and focus when the user hovers over an element with the cursor, focuses on an element using a keyboard (usually through the tab key), or upon touch (without releasing) in a touch UI. They contain textual identification for the element in question. They may also contain brief helper text regarding the function of the element.</blockquote></a>\n" +
    "      <div class=\"card\">\n" +
    "        <tabset>\n" +
    "          <tab>\n" +
    "            <tab-heading>Demo</tab-heading>\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>\n" +
    "                  <button type=\"button\" tooltip=\"helpful message\" class=\"btn btn-default\">Default</button>\n" +
    "                </p>\n" +
    "              </div>\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>\n" +
    "                  <button type=\"button\" tooltip=\"finally\" tooltip-popup-delay=\"500\" class=\"btn btn-default\">Delay</button>\n" +
    "                </p>\n" +
    "              </div>\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>\n" +
    "                  <button type=\"button\" tooltip=\"mouseleave or click\" tooltip-trigger=\"clickOff\" class=\"btn btn-default\">Click Off</button>\n" +
    "                </p>\n" +
    "              </div>\n" +
    "              <div class=\"col s12 l3\">\n" +
    "                <p>Append To Body?</p>\n" +
    "                <div class=\"card\">\n" +
    "                  <div class=\"card-content\">\n" +
    "                    <button type=\"button\" tooltip=\"over\" tooltip-append-to-body=\"true\" class=\"btn btn-default\">True</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <div class=\"card\">\n" +
    "                  <div class=\"card-content\">\n" +
    "                    <button type=\"button\" tooltip=\"under\" class=\"btn btn-default\">False</button>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </tab>\n" +
    "          <tab>\n" +
    "            <tab-heading>HTML</tab-heading>\n" +
    "            <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;helpful message&quot;&gt;Default&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;finally&quot; tooltip-popup-delay=&quot;500&quot;&gt;Delay&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;mouseleave or click&quot; tooltip-trigger=&quot;clickOff&quot;&gt;Click Off&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;p&gt;Append To Body?&lt;/p&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;over&quot; tooltip-append-to-body=&quot;true&quot;&gt;True&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;under&quot;&gt;False&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "          </tab>\n" +
    "        </tabset>\n" +
    "      </div>\n" +
    "      <h4>Settings</h4>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">tooltip</code>\n" +
    "          <div class=\"right\">{string}</div>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=false {boolean}</div><code>tooltip-append-to-body</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=0 {int} (ms)</div><code>tooltip-popup-delay</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=mouseenter | focus | click | clickOff {string}</div><code>tooltip-trigger</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <h2 id=\"services\" class=\"header\">Services</h2>\n" +
    "      <h3 id=\"modal\">Modal</h3><a href=\"http://www.google.com/design/spec/components/dialogs.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/dialogs.html\">Dialogs inform users about critical information, require users to make decisions, or encapsulate multiple tasks within a discrete process. Use dialogs sparingly because they are interruptive in nature.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <button ng-click=\"openModal()\" class=\"btn btn-default\">Default Modal</button>\n" +
    "                <button ng-click=\"openModal($event)\" class=\"btn btn-default\">Anchored Modal</button>\n" +
    "                <p>{{modalResult}}</p>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; ng-click=&quot;openModal()&quot;&gt;Default Modal&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; ng-click=&quot;openModal($event)&quot;&gt;Anchored Modal&lt;/button&gt;\n" +
    "&lt;p&gt;{{modalResult}}&lt;/p&gt;</code></pre>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;modal-content&quot;&gt;\n" +
    "  &lt;h4 class=&quot;light black-text&quot;&gt;Sample Modal&lt;/h4&gt;\n" +
    "  &lt;p ng-repeat=&quot;item in items&quot;&gt;\n" +
    "    &lt;input type=&quot;radio&quot; name=&quot;item&quot; id=&quot;item-{{$index}}&quot; value=&quot;{{item}}&quot; ng-model=&quot;form.selectedItem&quot;/&gt;\n" +
    "    &lt;label for=&quot;item-{{$index}}&quot;&gt;{{item}}&lt;/label&gt;\n" +
    "  &lt;/p&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;div class=&quot;modal-footer&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;select(form.selectedItem)&quot;&gt;Select&lt;/button&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;cancel()&quot;&gt;Cancel&lt;/button&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ModalDemoCtrl', function ($scope) {\n" +
    "    var items = ['item 1', 'item 2', 'item 3'];\n" +
    "    $scope.openModal = function ($event) {\n" +
    "      var modalInstance = $modal.open({\n" +
    "        templateUrl: 'views/partials/modals/example-modal.html',\n" +
    "        anchorElement: $event ? angular.element($event.target) : undefined,\n" +
    "        controller: 'ModalInstanceCtrl',\n" +
    "        resolve: {\n" +
    "          items: function () {\n" +
    "            return items;\n" +
    "          }\n" +
    "        }\n" +
    "      });\n" +
    "      modalInstance.result.then(function (selectedItem) {\n" +
    "        $scope.modalResult = 'You selected ' + selectedItem;\n" +
    "      }, function () {\n" +
    "        $scope.modalResult = 'You dismissed the modal';\n" +
    "      });\n" +
    "    };\n" +
    "  })\n" +
    "  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {\n" +
    "    $scope.items = items;\n" +
    "    $scope.form = {selectedItem: items[0]};\n" +
    "\n" +
    "    $scope.select = function (item) {\n" +
    "      $modalInstance.close(item);\n" +
    "    };\n" +
    "\n" +
    "    $scope.cancel = function () {\n" +
    "      $modalInstance.dismiss('cancel');\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">@returns {modalInstance}</div><code style=\"font-weight: bold;\">$modal.open(options)</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{jQuery object}</div><code>anchorElement</code><span> - jQuery-wrapped element (see <a href=\"https://docs.angularjs.org/api/ng/function/angular.element\">angular.element</a>) the modal animates from</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>templateUrl</code><span> - path to template representing modal's content</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>template</code><span> - inline template representing modal's content</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=$rootScope</div><code>scope</code><span> - scope instance used for the modal's content</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>controller</code><span> - controller for the modal instance</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{func}</div><code>resolve</code><span> - members resolved and passed to the controller as locals (similar to Angular.JS routes)</span>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">modalInstance</code></li>\n" +
    "        <li class=\"collection-item\"><code>modalInstance.close(result)</code><span> - closes modal, passing a result</span></li>\n" +
    "        <li class=\"collection-item\"><code>modalInstance.dismiss(reason)</code><span> - dismisses modal, passing a reason</span></li>\n" +
    "        <li class=\"collection-item\"><code>modalInstance.result</code><span> - promise that is resolved when modal is closed and rejected when dismissed</span></li>\n" +
    "      </ul>\n" +
    "      <p>Note: The modal is a fork of <a href=\"http://angular-ui.github.io/bootstrap/#/modal\">UI Bootstrap's</a>. Look there for extended documentation.</p>\n" +
    "      <h3 id=\"toast\">Toast</h3><a href=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">\n" +
    "        <blockquote cite=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen...Toasts are similar to snackbars but do not contain actions and cannot be swiped off screen.</blockquote></a>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12\">\n" +
    "          <div class=\"card\">\n" +
    "            <tabset>\n" +
    "              <tab>\n" +
    "                <tab-heading>Demo</tab-heading>\n" +
    "                <button ng-click=\"showToast()\" class=\"btn btn-default\">Default Toast</button>\n" +
    "                <button ng-click=\"showToast(undefined, 'rounded')\" class=\"btn btn-default\">Rounded Toast</button>\n" +
    "                <button ng-click=\"showToast(500)\" class=\"btn btn-default\">Quick Toast</button>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>HTML</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast()&quot;&gt;Default Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(undefined, 'rounded')&quot;&gt;Rounded Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(500)&quot;&gt;Quick Toast&lt;/button&gt;</code></pre>\n" +
    "              </tab>\n" +
    "              <tab>\n" +
    "                <tab-heading>JS</tab-heading>\n" +
    "                <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ToastDemoCtrl', function ($scope) {\n" +
    "    var toastCounter = 1;\n" +
    "    $scope.showToast = function (duration, className) {\n" +
    "      $toast.show('This is sample toast ' + toastCounter + '.', duration, className);\n" +
    "      toastCounter++;\n" +
    "    };\n" +
    "  });\n" +
    "</code></pre>\n" +
    "              </tab>\n" +
    "            </tabset>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <ul class=\"collection\">\n" +
    "        <li class=\"collection-item\"><code style=\"font-weight: bold;\">$toast.show(message, [duration], [className])</code></li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>message - the message to display</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">=2500 {int} (ms)</div><code>duration - the duration to display the tooltip</code>\n" +
    "        </li>\n" +
    "        <li class=\"collection-item\">\n" +
    "          <div class=\"right\">{string}</div><code>className - a css class to assign to the tooltip</code>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <p>Note: Toasts are automatically placed (and animated) based on screen width. They appear at the bottom of small screens, the bottom left of medium screens, and the top right of large screens.</p>\n" +
    "    </div>\n" +
    "    <div class=\"col s12\">\n" +
    "      <h2 id=\"alternatives\" class=\"header\">Alternatives</h2>\n" +
    "      <ul>\n" +
    "        <li><strong><a href=\"https://material.angularjs.org/\">Angular Material</a></strong>\n" +
    "          <p>\n" +
    "            Angular Material is Google's official implementation of Material Design in AngularJS.\n" +
    "            The framework is very modern (flexbox, AMCSS) but suffers from performance issues, particularly noticeable on mobile (it is pre 1.0).\n" +
    "            Another consideration is the project's JavaScript-based theming (something usually handled by a CSS preprocessor).\n" +
    "            It also lacks the Atomic CSS helper/utility classes often found in other frameworks.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"http://krescruz.github.io/angular-materialize/\">angular-materialize</a></strong>\n" +
    "          <p>\n" +
    "            The directives of angular-materialize are mostly initialization wrappers of Materialize's custom JavaScript.\n" +
    "            Therefore, the library largely ignores the \"Angular way\" of doing things. It misses out on things like service-based components, leveraging data binding, templating and ngAnimate.\n" +
    "            It also maintains Materialize's jQuery, Velocity.js and custom JavaScript dependencies.\n" +
    "            It does, however, offer more components.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"https://angular-ui.github.io/bootstrap/\">UI Bootstrap</a></strong>\n" +
    "          <p>\n" +
    "            UI Bootstrap is a full set of AngularJS directives built on top of the Bootstrap framework.\n" +
    "            The project is well-documented and can be paired with a <a href=\"https://fezvrasta.github.io/bootstrap-material-design/\">Material Design-inspired Bootstrap Theme</a>.\n" +
    "            This can result in muddled design that is neither Bootstrap nor Material, particularly when considering details like animations.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"http://ui.lumapps.com/\">lumX</a></strong>\n" +
    "          <p>\n" +
    "            A full framework built for AngularJS based on Material Design. It has about the same level of maturity as Materialize.\n" +
    "            In addition to AngularJS, it has jQuery, Velocity.js and Moment.js dependencies.\n" +
    "            It strictly implements Material Design, but lacks some polish with things like animation.\n" +
    "          </p>\n" +
    "        </li>\n" +
    "        <li><strong><a href=\"http://www.getmdl.io/index.html\">Material Design Lite</a></strong>\n" +
    "          <p>A framework agnostic library by Google. It includes basic components such as inputs, buttons, menus and tooltips. A good choice for a light weight website.</p>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('views/partials/app.html',
    "\n" +
    "<header>\n" +
    "  <div class=\"navbar-fixed\">\n" +
    "    <nav>\n" +
    "      <div class=\"nav-wrapper row\">\n" +
    "        <div class=\"col s12\"><a ng-href=\"/\" class=\"brand-logo\">ng-materialize</a>\n" +
    "          <ul class=\"right hide-on-med-and-down\">\n" +
    "            <li><a href=\"#about\" ng-click=\"scrollTo($event, 'about')\">About</a></li>\n" +
    "            <li><a href=\"#getting-started\" ng-click=\"scrollTo($event, 'getting-started')\">Getting Started</a></li>\n" +
    "            <li dropdown=\"dropdown\"><a href=\"#directives\" dropdown-toggle=\"dropdown-toggle\">Directives<i class=\"material-icons right\">arrow_drop_down</i></a>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"directive in directives\"><a ng-href=\"#{{directive.id}}\" ng-bind=\"directive.name\" ng-click=\"scrollTo($event, directive.id)\"></a></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "            <li dropdown=\"dropdown\"><a href=\"#services\" dropdown-toggle=\"dropdown-toggle\">Services<i class=\"material-icons right\">arrow_drop_down</i></a>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li ng-repeat=\"service in services\"><a ng-href=\"#{{service.id}}\" ng-bind=\"service.name\" ng-click=\"scrollTo($event, service.id)\"></a></li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "            <li><a href=\"#alternatives\" ng-click=\"scrollTo($event, 'alternatives')\">Alternatives</a></li>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </nav>\n" +
    "  </div>\n" +
    "</header><main ui-view></main>\n" +
    "<footer class=\"page-footer\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col s12\">\n" +
    "      <p class=\"grey-text text-lighten-2\">Built by <a href=\"http://www.twitter.com/willthomsen\">Will Thomsen</a> under the <a href=\"http://opensource.org/licenses/MIT\">MIT License</a>.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>"
  );


  $templateCache.put('views/partials/components/accordion.html',
    "\n" +
    "<h3 id=\"accordion\">Accordion</h3>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <h4>Default</h4>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <p>\n" +
    "            <input id=\"open-one\" type=\"checkbox\" ng-model=\"openOne\"/>\n" +
    "            <label for=\"open-one\">Open only one at a time</label>\n" +
    "          </p>\n" +
    "          <accordion close-others=\"openOne\">\n" +
    "            <accordion-group ng-repeat=\"accordionGroup in flatAccordionGroups\">\n" +
    "              <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "              <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "            </accordion-group>\n" +
    "          </accordion>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;p&gt;\n" +
    "  &lt;input type=&quot;checkbox&quot; id=&quot;open-one&quot; ng-model=&quot;openOne&quot;/&gt;\n" +
    "  &lt;label for=&quot;open-one&quot;&gt;Open only one at a time&lt;/label&gt;\n" +
    "&lt;/p&gt;\n" +
    "&lt;accordion close-others=&quot;openOne&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.openOne = true;\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0]\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1]\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2]\n" +
    "      }\n" +
    "    ];\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <h4>Popout</h4>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div class=\"row\">\n" +
    "            <div ng-repeat=\"accordionGroup in popoutAccordionGroups\" class=\"col s12 m4\">\n" +
    "              <input type=\"checkbox\" ng-model=\"accordionGroup.open\" id=\"{{accordionGroup.title}}\"/>\n" +
    "              <label for=\"{{accordionGroup.title}}\" ng-bind=\"accordionGroup.title\"></label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <accordion accordion-popout=\"accordion-popout\" close-others=\"false\">\n" +
    "            <accordion-group ng-repeat=\"accordionGroup in popoutAccordionGroups\" is-open=\"accordionGroup.open\">\n" +
    "              <accordion-heading><i ng-bind=\"accordionGroup.icon\" class=\"material-icons\"></i><span ng-bind=\"accordionGroup.title\"></span></accordion-heading>\n" +
    "              <p ng-bind=\"accordionGroup.content\"></p>\n" +
    "            </accordion-group>\n" +
    "          </accordion>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 m4&quot; ng-repeat=&quot;accordionGroup in accordionGroups&quot;&gt;\n" +
    "    &lt;input type=&quot;checkbox&quot; id=&quot;{{accordionGroup.title}}&quot; ng-model=&quot;accordionGroup.open&quot;/&gt;\n" +
    "    &lt;label for=&quot;{{accordionGroup.title}}&quot;&gt;{{accordionGroup.title}}&lt;/label&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;accordion accordion-popout, close-others=&quot;false&quot;&gt;\n" +
    "  &lt;accordion-group ng-repeat=&quot;accordionGroup in accordionGroups&quot; is-open=&quot;accordionGroup.open&quot;&gt;\n" +
    "    &lt;accordion-heading&gt;\n" +
    "      &lt;i class=&quot;material-icons&quot;&gt;{{accordionGroup.icon}}&lt;/i&gt;\n" +
    "      {{accordionGroup.title}}\n" +
    "    &lt;/accordion-heading&gt;\n" +
    "    &lt;p&gt;{{accordionGroup.content}}&lt;/p&gt;\n" +
    "  &lt;/accordion-group&gt;\n" +
    "&lt;/accordion&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('AccordionDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.accordionGroups = [\n" +
    "      {\n" +
    "        title: 'First',\n" +
    "        icon: 'subtitles',\n" +
    "        content: lorem[0],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Second',\n" +
    "        icon: 'games',\n" +
    "        content: lorem[1],\n" +
    "        open: false\n" +
    "      }, {\n" +
    "        title: 'Third',\n" +
    "        icon: 'library_books',\n" +
    "        content: lorem[2],\n" +
    "        open: false\n" +
    "      }\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=true {boolean} (bound)</div><code>close-others</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>accordion-popout</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;accordion-group&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/dropdown.html',
    "\n" +
    "<h3 id=\"dropdown\">Dropdown</h3><a href=\"http://www.google.com/design/spec/components/menus.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/menus.html\">Menus allow users to take an action by selecting from a list of choices revealed upon opening a temporary, new sheet of material.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div style=\"min-height: 200px;\">\n" +
    "            <div dropdown=\"dropdown\">\n" +
    "              <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Default Dropdown</button>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li><a href=\"href\">One</a></li>\n" +
    "                <li><a href=\"href\">Two</a></li>\n" +
    "                <li class=\"divider\"></li>\n" +
    "                <li><a href=\"href\">Three</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Default Dropdown&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div style=\"min-height: 200px;\">\n" +
    "            <div dropdown=\"dropdown\" auto-close=\"outsideClick\" style=\"display: inline-block;\">\n" +
    "              <button type=\"button\" dropdown-toggle=\"dropdown-toggle\" class=\"btn btn-default\">Outside Click to Close</button>\n" +
    "              <ul class=\"dropdown-menu\">\n" +
    "                <li><a>One</a></li>\n" +
    "                <li><a>Two</a></li>\n" +
    "                <li class=\"divider\"></li>\n" +
    "                <li><a>Three</a></li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div dropdown auto-close=&quot;outsideClick&quot; class=&quot;dropdown-wrap&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; dropdown-toggle class=&quot;btn btn-default&quot;&gt;Outside Click to Close&lt;/button&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;ul class=&quot;dropdown-menu&quot;&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;One&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Two&lt;/a&gt;&lt;/li&gt;\n" +
    "  &lt;li class=&quot;divider&quot;&gt;&lt;/li&gt;\n" +
    "  &lt;li&gt;&lt;a href&gt;Three&lt;/a&gt;&lt;/li&gt;\n" +
    "&lt;/ul&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular.module('ng-materialize.demo');</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>CSS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-css\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-css\">.dropdown-wrap {display: inline-block;}\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=always | outsideClick | disabled {string}</div><code>auto-close</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>dropdown-append-to-body</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>is-open</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">dropdown-toggle</code></li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/ink.html',
    "\n" +
    "<h3 id=\"ink\">Ink</h3><a href=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/animation/responsive-interaction.html\">Responsive interaction encourages deeper exploration of an app by creating timely, logical, and delightful screen reactions to user input. Each interaction is thoughtful, perhaps whimsical, but never distracting.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <p>Use the <code>ink-color</code> option to change the ink effect's color:</p>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <div class=\"collection\">\n" +
    "            <a class=\"collection-item\" href ink>Default Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"light\">Light Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"green\">Green Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"orange\">Orange Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"purple\">Purple Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"red\">Red Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"teal\">Teal Ink</a>\n" +
    "            <a class=\"collection-item\" href ink ink-color=\"yellow\">Yellow Ink</a>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;collection&quot;&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink&gt;Default Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;light&quot;&gt;Light Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;red&quot;&gt;Red Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;yellow&quot;&gt;Yellow Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;orange&quot;&gt;Orange Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;purple&quot;&gt;Purple Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;green&quot;&gt;Green Ink&lt;/a&gt;\n" +
    "  &lt;a href class=&quot;collection-item&quot; ink ink-color=&quot;teal&quot;&gt;Teal Ink&lt;/a&gt;\n" +
    "&lt;/div&gt;\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <p>ng-materialize includes the ink effect by default on these components:</p>\n" +
    "    <ul class=\"bulleted\">\n" +
    "      <li><code>&lt;button&gt;</code></li>\n" +
    "      <li><code>&lt;accordion-heading&gt;</code></li>\n" +
    "      <li><code>&lt;tab-heading&gt;</code></li>\n" +
    "    </ul>\n" +
    "    <p>Use the <code>no-ink</code> option to disable the effect on buttons:</p>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <button type=\"button\" class=\"btn btn-default\">Button</button>\n" +
    "          <button type=\"button\" no-ink=\"no-ink\" class=\"btn btn-default\">No Ink</button>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;Button&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; no-ink=&quot;true&quot;&gt;No Ink&lt;/button&gt;\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">ink</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=classic | light | red | yellow | orange | purple | green | teal {string}</div><code>ink-color</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>no-ink</code>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "<p>\n" +
    "  Note: To provide Material Design's ripple effect, Materialize wraps the <a href=\"http://fian.my.id/Waves/\">Waves project</a> into its JavaScript.\n" +
    "  ng-materialize unbundles the project and includes it as a dependency. It is required to use the ink directive.\n" +
    "</p>"
  );


  $templateCache.put('views/partials/components/modal.html',
    "\n" +
    "<h3 id=\"modal\">Modal</h3><a href=\"http://www.google.com/design/spec/components/dialogs.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/dialogs.html\">Dialogs inform users about critical information, require users to make decisions, or encapsulate multiple tasks within a discrete process. Use dialogs sparingly because they are interruptive in nature.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <button ng-click=\"openModal()\" class=\"btn btn-default\">Default Modal</button>\n" +
    "          <button ng-click=\"openModal($event)\" class=\"btn btn-default\">Anchored Modal</button>\n" +
    "          <p>{{modalResult}}</p>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; ng-click=&quot;openModal()&quot;&gt;Default Modal&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; ng-click=&quot;openModal($event)&quot;&gt;Anchored Modal&lt;/button&gt;\n" +
    "&lt;p&gt;{{modalResult}}&lt;/p&gt;</code></pre>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;modal-content&quot;&gt;\n" +
    "  &lt;h4 class=&quot;light black-text&quot;&gt;Sample Modal&lt;/h4&gt;\n" +
    "  &lt;p ng-repeat=&quot;item in items&quot;&gt;\n" +
    "    &lt;input type=&quot;radio&quot; name=&quot;item&quot; id=&quot;item-{{$index}}&quot; value=&quot;{{item}}&quot; ng-model=&quot;form.selectedItem&quot;/&gt;\n" +
    "    &lt;label for=&quot;item-{{$index}}&quot;&gt;{{item}}&lt;/label&gt;\n" +
    "  &lt;/p&gt;\n" +
    "&lt;/div&gt;\n" +
    "&lt;div class=&quot;modal-footer&quot;&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;select(form.selectedItem)&quot;&gt;Select&lt;/button&gt;\n" +
    "  &lt;button type=&quot;button&quot; class=&quot;btn-flat&quot; ng-click=&quot;cancel()&quot;&gt;Cancel&lt;/button&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ModalDemoCtrl', function ($scope) {\n" +
    "    var items = ['item 1', 'item 2', 'item 3'];\n" +
    "    $scope.openModal = function ($event) {\n" +
    "      var modalInstance = $modal.open({\n" +
    "        templateUrl: 'views/partials/modals/example-modal.html',\n" +
    "        anchorElement: $event ? angular.element($event.target) : undefined,\n" +
    "        controller: 'ModalInstanceCtrl',\n" +
    "        resolve: {\n" +
    "          items: function () {\n" +
    "            return items;\n" +
    "          }\n" +
    "        }\n" +
    "      });\n" +
    "      modalInstance.result.then(function (selectedItem) {\n" +
    "        $scope.modalResult = 'You selected ' + selectedItem;\n" +
    "      }, function () {\n" +
    "        $scope.modalResult = 'You dismissed the modal';\n" +
    "      });\n" +
    "    };\n" +
    "  })\n" +
    "  .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {\n" +
    "    $scope.items = items;\n" +
    "    $scope.form = {selectedItem: items[0]};\n" +
    "\n" +
    "    $scope.select = function (item) {\n" +
    "      $modalInstance.close(item);\n" +
    "    };\n" +
    "\n" +
    "    $scope.cancel = function () {\n" +
    "      $modalInstance.dismiss('cancel');\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">@returns {modalInstance}</div><code style=\"font-weight: bold;\">$modal.open(options)</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{jQuery object}</div><code>anchorElement</code><span> - jQuery-wrapped element (see <a href=\"https://docs.angularjs.org/api/ng/function/angular.element\">angular.element</a>) the modal animates from</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>templateUrl</code><span> - path to template representing modal's content</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>template</code><span> - inline template representing modal's content</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=$rootScope</div><code>scope</code><span> - scope instance used for the modal's content</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>controller</code><span> - controller for the modal instance</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{func}</div><code>resolve</code><span> - members resolved and passed to the controller as locals (similar to Angular.JS routes)</span>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">modalInstance</code></li>\n" +
    "  <li class=\"collection-item\"><code>modalInstance.close(result)</code><span> - closes modal, passing a result</span></li>\n" +
    "  <li class=\"collection-item\"><code>modalInstance.dismiss(reason)</code><span> - dismisses modal, passing a reason</span></li>\n" +
    "  <li class=\"collection-item\"><code>modalInstance.result</code><span> - promise that is resolved when modal is closed and rejected when dismissed</span></li>\n" +
    "</ul>\n" +
    "<p>Note: The modal is a fork of <a href=\"http://angular-ui.github.io/bootstrap/#/modal\">UI Bootstrap's</a>. Look there for extended documentation.</p>"
  );


  $templateCache.put('views/partials/components/tabs.html',
    "\n" +
    "<h3 id=\"tabs\">Tabs</h3><a href=\"http://www.google.com/design/spec/components/tabs.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/tabs.html\">Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l7\">\n" +
    "    <h4>Default (with content)</h4>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <tabset>\n" +
    "            <tab ng-repeat=\"tab in tabs\" active=\"tab.activeInline\" disable=\"tab.disable\">\n" +
    "              <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "              <p>{{tab.content}}</p>\n" +
    "            </tab>\n" +
    "          </tabset>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot; active=&quot;tab.active&quot; disable=&quot;tab.disable&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab.heading}}&lt;/tab-heading&gt;\n" +
    "    &lt;p&gt;{{tab.content}}&lt;/p&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    var lorem = [\n" +
    "      'Single latte grounds Sit rich black extra seasonal medium filter qui sugar caffeine. Cream arabica cup go body acerbic cinnamon espresso shot americano origin foam extraction froth café.',\n" +
    "      'Iced french variety aftertaste milk ristretto white instant skinny filter redeye sweet galão whipped dripper. Cinnamon that so mazagran Coffee crema cup cortado turkish breve foam siphon panna french aroma.',\n" +
    "      'Arabica cinnamon doppio viennese rich sugar percolator white cappuccino panna plunger fair extraction brewed. Saucer froth irish barista ut half aged Sit filter caffeine aftertaste sit macchiato.'\n" +
    "    ];\n" +
    "    $scope.tabs = [\n" +
    "      {heading: 'Tab 1', content: lorem[0], disable: false},\n" +
    "      {heading: 'Tab 2', content: lorem[1], disable: false},\n" +
    "      {heading: 'Disabled Tab 3', content: 'This tab is disabled', disable: true},\n" +
    "      {heading: 'Tab 4', content: lorem[2], disable: false}\n" +
    "    ];\n" +
    "  });\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l5\">\n" +
    "    <h4>Justified (no content)</h4>\n" +
    "    <p>\n" +
    "      Tab headers can act independently of tab content.\n" +
    "      Use the <code>no-content</code> option along with <code>active</code> or <code>select()</code> to assist in content display.\n" +
    "    </p>\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <tabset justified=\"true\" no-content=\"true\">\n" +
    "            <tab ng-repeat=\"tab in justifiedTabs\">\n" +
    "              <tab-heading>{{tab.heading}}</tab-heading>\n" +
    "            </tab>\n" +
    "          </tabset>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;tabset justified=&quot;true&quot; no-content=&quot;true&quot;&gt;\n" +
    "  &lt;tab ng-repeat=&quot;tab in tabs&quot;&gt;\n" +
    "    &lt;tab-heading&gt;{{tab}}&lt;/tab-heading&gt;\n" +
    "  &lt;/tab&gt;\n" +
    "&lt;/tabset&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('TabsDemoCtrl', function ($scope) {\n" +
    "    $scope.tabs = ['Tab 1', 'Tab 2', 'Tab 3'];\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tabset&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>justified</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>no-content</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab&gt;</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>active</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean} (bound)</div><code>disable</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{func}</div><code>select()</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{func}</div><code>deselect()</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">&lt;tab-heading&gt;</code></li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/text-field.html',
    "\n" +
    "<h3 id=\"text-field\">Text Field</h3><a href=\"http://www.google.com/design/spec/components/text-fields.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/text-fields.html\">Text fields allow the user to input text. They can be single-line, with or without scrolling, or multi-line, and can have an icon.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <form name=\"exampleForm\" novalidate=\"novalidate\">\n" +
    "            <div class=\"input-field\">\n" +
    "              <input id=\"example1\" type=\"text\" name=\"example1\" ng-model=\"textFields.example1\" floating-label=\"Counter &amp; Validation\" character-counter=\"10\" ng-maxlength=\"10\" ng-required=\"true\" class=\"validate\"/>\n" +
    "              <div ng-messages=\"exampleForm.example1.$error\" ng-show=\"exampleForm.example1.$dirty\" class=\"field-hint\">\n" +
    "                <div ng-message=\"required\">This is required.</div>\n" +
    "                <div ng-message=\"maxlength\">This field may not exceed 10 characters.</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"input-field\">\n" +
    "              <textarea id=\"example2\" materialize-textarea=\"true\" floating-label=\"Expanding Textarea\" ng-model=\"textfields.example2\"></textarea>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;form name=&quot;exampleForm&quot; novalidate&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;input\n" +
    "      type=&quot;text&quot;\n" +
    "      class=&quot;validate&quot;\n" +
    "      id=&quot;example1&quot;\n" +
    "      name=&quot;example1&quot;\n" +
    "      ng-model=&quot;inputs.example1&quot;\n" +
    "      floating-label=&quot;Counter and Validation&quot;\n" +
    "      character-counter=&quot;10&quot;\n" +
    "      ng-maxlength=&quot;10&quot;\n" +
    "      ng-required=&quot;true&quot;/&gt;\n" +
    "    &lt;div class=&quot;field-hint&quot; ng-messages=&quot;exampleForm.example1.$error&quot; ng-show=&quot;exampleForm.example1.$dirty&quot;&gt;\n" +
    "      &lt;div ng-message=&quot;required&quot;&gt;This is required.&lt;/div&gt;\n" +
    "      &lt;div ng-message=&quot;maxlength&quot;&gt;This field may not exceed 10 characters.&lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;input-field&quot;&gt;\n" +
    "    &lt;textarea\n" +
    "      id=&quot;example2&quot;\n" +
    "      materialize-textarea=&quot;true&quot;\n" +
    "      floating-label=&quot;Expanding Textarea&quot;\n" +
    "      ng-model=&quot;form.example2&gt;\n" +
    "    &lt;/textarea&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/form&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('InputDemoCtrl', function ($scope) {\n" +
    "    $scope.form = {\n" +
    "      example1: null,\n" +
    "      example2: null\n" +
    "    };\n" +
    "  });</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col s12 l6\">\n" +
    "    <p>ng-materialize uses directives and CSS classes to stylize text fields:</p>\n" +
    "    <ul class=\"bulleted\">\n" +
    "      <li>\n" +
    "        <p>Use the <code>floating-label</code> directive to add labels to inputs and textareas (The element must also declare the <code>id</code> attribute).</p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>Use the <code>character-counter</code> directive to add a character hint to inputs and textareas.</p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>\n" +
    "          Add the <code>validate</code> class to inputs/textareas for success and error state styling when using <a href=\"https://docs.angularjs.org/api/ng/directive/input\">Angular.JS input validation</a>.\n" +
    "          Include the <code>ignore-success</code> class to exclude success state styling.\n" +
    "        </p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>Wrap error state messages in a div with the <code>field-hint</code> class. Optionally use <a href=\"https://docs.angularjs.org/api/ngMessages/directive/ngMessages\">ngMessages</a> to streamline the process.</p>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <p>Use the <code>materialize-textarea</code> directive on a <code>textarea</code> to make the field resize itself based on its contents.</p>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">floating-label</code>\n" +
    "    <div class=\"right\">{string}</div>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">character-counter</code>\n" +
    "    <div class=\"right\">{int}</div>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">materialize-textarea</code>\n" +
    "    <div class=\"right\">{boolean}</div>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/components/toast.html',
    "\n" +
    "<h3 id=\"toast\">Toast</h3><a href=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/snackbars-toasts.html\">Snackbars provide lightweight feedback about an operation by showing a brief message at the bottom of the screen...Toasts are similar to snackbars but do not contain actions and cannot be swiped off screen.</blockquote></a>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col s12\">\n" +
    "    <div class=\"card\">\n" +
    "      <tabset>\n" +
    "        <tab>\n" +
    "          <tab-heading>Demo</tab-heading>\n" +
    "          <button ng-click=\"showToast()\" class=\"btn btn-default\">Default Toast</button>\n" +
    "          <button ng-click=\"showToast(undefined, 'rounded')\" class=\"btn btn-default\">Rounded Toast</button>\n" +
    "          <button ng-click=\"showToast(500)\" class=\"btn btn-default\">Quick Toast</button>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>HTML</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast()&quot;&gt;Default Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(undefined, 'rounded')&quot;&gt;Rounded Toast&lt;/button&gt;\n" +
    "&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; ng-click=&quot;showToast(500)&quot;&gt;Quick Toast&lt;/button&gt;</code></pre>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "          <tab-heading>JS</tab-heading>\n" +
    "          <pre prism=\"prism\" class=\"language-javascript\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-javascript\">angular\n" +
    "  .module('ng-materialize.demo')\n" +
    "  .controller('ToastDemoCtrl', function ($scope) {\n" +
    "    var toastCounter = 1;\n" +
    "    $scope.showToast = function (duration, className) {\n" +
    "      $toast.show('This is sample toast ' + toastCounter + '.', duration, className);\n" +
    "      toastCounter++;\n" +
    "    };\n" +
    "  });\n" +
    "</code></pre>\n" +
    "        </tab>\n" +
    "      </tabset>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">$toast.show(message, [duration], [className])</code></li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>message - the message to display</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=2500 {int} (ms)</div><code>duration - the duration to display the tooltip</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">{string}</div><code>className - a css class to assign to the tooltip</code>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "<p>Note: Toasts are automatically placed (and animated) based on screen width. They appear at the bottom of small screens, the bottom left of medium screens, and the top right of large screens.</p>"
  );


  $templateCache.put('views/partials/components/tooltip.html',
    "\n" +
    "<h3 id=\"tooltip\">Tooltip</h3><a href=\"http://www.google.com/design/spec/components/tooltips.html\">\n" +
    "  <blockquote cite=\"http://www.google.com/design/spec/components/tooltips.html\">Tooltips are labels that appear on hover and focus when the user hovers over an element with the cursor, focuses on an element using a keyboard (usually through the tab key), or upon touch (without releasing) in a touch UI. They contain textual identification for the element in question. They may also contain brief helper text regarding the function of the element.</blockquote></a>\n" +
    "<div class=\"card\">\n" +
    "  <tabset>\n" +
    "    <tab>\n" +
    "      <tab-heading>Demo</tab-heading>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>\n" +
    "            <button type=\"button\" tooltip=\"helpful message\" class=\"btn btn-default\">Default</button>\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>\n" +
    "            <button type=\"button\" tooltip=\"finally\" tooltip-popup-delay=\"500\" class=\"btn btn-default\">Delay</button>\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>\n" +
    "            <button type=\"button\" tooltip=\"mouseleave or click\" tooltip-trigger=\"clickOff\" class=\"btn btn-default\">Click Off</button>\n" +
    "          </p>\n" +
    "        </div>\n" +
    "        <div class=\"col s12 l3\">\n" +
    "          <p>Append To Body?</p>\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-content\">\n" +
    "              <button type=\"button\" tooltip=\"over\" tooltip-append-to-body=\"true\" class=\"btn btn-default\">True</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"card\">\n" +
    "            <div class=\"card-content\">\n" +
    "              <button type=\"button\" tooltip=\"under\" class=\"btn btn-default\">False</button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </tab>\n" +
    "    <tab>\n" +
    "      <tab-heading>HTML</tab-heading>\n" +
    "      <pre prism=\"prism\" class=\"language-markup\"><code ng-non-bindable=\"ng-non-bindable\" class=\"language-markup\">&lt;div class=&quot;row&quot;&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;helpful message&quot;&gt;Default&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;finally&quot; tooltip-popup-delay=&quot;500&quot;&gt;Delay&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;mouseleave or click&quot; tooltip-trigger=&quot;clickOff&quot;&gt;Click Off&lt;/button&gt;\n" +
    "  &lt;/div&gt;\n" +
    "  &lt;div class=&quot;col s12 l3&quot;&gt;\n" +
    "    &lt;p&gt;Append To Body?&lt;/p&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;over&quot; tooltip-append-to-body=&quot;true&quot;&gt;True&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "    &lt;div class=&quot;card&quot;&gt;\n" +
    "      &lt;div class=&quot;card-content&quot;&gt;\n" +
    "        &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot; tooltip=&quot;under&quot;&gt;False&lt;/button&gt;\n" +
    "      &lt;/div&gt;\n" +
    "    &lt;/div&gt;\n" +
    "  &lt;/div&gt;\n" +
    "&lt;/div&gt;</code></pre>\n" +
    "    </tab>\n" +
    "  </tabset>\n" +
    "</div>\n" +
    "<h4>Settings</h4>\n" +
    "<ul class=\"collection\">\n" +
    "  <li class=\"collection-item\"><code style=\"font-weight: bold;\">tooltip</code>\n" +
    "    <div class=\"right\">{string}</div>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=false {boolean}</div><code>tooltip-append-to-body</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=0 {int} (ms)</div><code>tooltip-popup-delay</code>\n" +
    "  </li>\n" +
    "  <li class=\"collection-item\">\n" +
    "    <div class=\"right\">=mouseenter | focus | click | clickOff {string}</div><code>tooltip-trigger</code>\n" +
    "  </li>\n" +
    "</ul>"
  );


  $templateCache.put('views/partials/modals/example-modal.html',
    "\n" +
    "<div class=\"modal-content\">\n" +
    "  <h4 class=\"light black-text\">Sample Modal</h4>\n" +
    "  <p ng-repeat=\"item in items\">\n" +
    "    <input type=\"radio\" ng-model=\"form.selectedItem\" name=\"item\" id=\"item-{{$index}}\" value=\"{{item}}\"/>\n" +
    "    <label for=\"item-{{$index}}\" ng-bind=\"item\"></label>\n" +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button ng-click=\"select(form.selectedItem)\" class=\"btn-flat\">Select</button>\n" +
    "  <button ng-click=\"cancel()\" class=\"btn-flat\">Cancel</button>\n" +
    "</div>"
  );

}]);
