# ng-materialize

A custom build of [Materialize][materialize] featuring native [AngularJS][angular] components.

## About

ng-materialize is a custom build of the Materialize framework that includes native AngularJS components. The directives favor simplicity over customization, and aim to adhere to a strict interpretation of Google's Material Design. The project removes Materialize's jQuery, Velocity.js and custom JavaScript dependencies, but requires ngAnimate and Waves (one of Materialize's hidden dependencies).

Visit [http://wthomsen.github.io/ng-materialize][gh-pages] for demos and documentation.

## Getting Started

```bash
bower install ng-materialize
```

Notes:

1. You do not need to include the original Materialize library.
2. The Roboto and Material Icons font families are imported from [Google Fonts][google-fonts] in the css.

## Running Documentation Locally

1. Run `npm install` and `bower install`
2. Run `grunt serve`
3. Visit http://localhost:9000 in a browser

[gh-pages]: http://wthomsen.github.io/ng-materialize
[angular]: https://angularjs.org/
[materialize]: http://materializecss.com/
[google-fonts]: https://www.google.com/fonts
