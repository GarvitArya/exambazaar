/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util')
    concat = require('gulp-concat-util');

// create a default task and just log a message
gulp.task('scripts', function() {
  return gulp.src(['views/angular.min.js', 'views/angular-material.min.js', 'views/angular-animate.min.js', 'views/svg-assets-cache.js', 'views/angular-aria.min.js', 'views/angular-messages.min.js', 'views/angular-ui-router.min.js', 'views/angular-cookies.min.js', 'views/angular-scroll.js', 'views/angular-youtube-embed.js', 'views/angular-sanitize.min.js', 'views/angular-socialshare.js', 'views/angular-clipboard.js', 'views/angular-sidebarjs.min.js', 'views/angular-ui-notification.min.js', 'views/angular-material-datetimepicker.js', 'views/loading-bar.min.js'])
    .pipe(concat('eb.js'))
    .pipe(gulp.dest('views/'));
});


gulp.task('css', function() {
  return gulp.src(['public/css/angular-material.css', 'public/css/paper-bootstrap.min.css', 'public/css/loading-bar.min.css', 'public/css/breadcrumb.css', 'public/css/ui-bootstrap-csp.css', 'public/css/angular-ui-notification.min.css', 'public/css/animate.min.css', 'public/css/angular-sidebarjs.min.css', 'public/css/material-datetimepicker.min.css'])
    .pipe(concat('eb.css'))
    .pipe(gulp.dest('public/css/'));
});





gulp.task('dependenttask', ['scripts'], function() {
  return gutil.log('Scripting finished!')
});