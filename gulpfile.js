/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util')
    concat = require('gulp-concat-util');

// create a default task and just log a message
gulp.task('default', function() {
  return gulp.src(['views/angular.min.js', 'views/angular-material.min.js', 'views/angular-animate.min.js', 'views/svg-assets-cache.js', 'views/angular-aria.min.js', 'views/angular-messages.min.js', 'views/angular-ui-router.min.js', 'views/angular-cookies.min.js', 'views/angular-scroll.js', 'views/angular-youtube-embed.js', 'views/angular-sanitize.min.js', 'views/angular-socialshare.js', 'views/angular-clipboard.js', 'views/angular-sidebarjs.min.js', 'views/angular-ui-notification.min.js', 'views/angular-material-datetimepicker.js', 'views/loading-bar.min.js'])
    .pipe(concat('eb.js'))
    .pipe(gulp.dest('views/'));
});



gulp.task('dependenttask', ['scripts'], function() {
  return gutil.log('Scripting finished!')
});