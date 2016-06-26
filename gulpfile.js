/************************************************************************************************/
/* Gulpfile for quickly optimizing images in a directory and keeping their directory structure  */
/************************************************************************************************/

/* Execute this via CLI only because of potential performance/crashing issues */

/* Dependencies */
var gulp = require('gulp');
var gutil = require('gulp-util');
var imageOp = require('gulp-image-optimization');

/* Base path is relative to the directory the gulpfile.js file is placed */
var BASEPATH = 'input';
/* Wildcard */
var WILDCARD = '/**/*';
/* Folder where files will be output to from the base path*/
var OUTPUT = 'output';
/* Relative path within the base path if you do not want to recursively output every directory*/
var RELATIVE_PATH = '';
/* Extensions to feed the image optimization task */
var GULP_IMAGE_TYPES = ['.png', '.jpg', '.jpeg', '.gif']
/* Optional Argument for commandline relative path  */
var i = process.argv.indexOf('--option');
if (i >= 0 && process.argv[i + 1]) {
    gutil.log(process.argv[i + 1]);
    RELATIVE_PATH = '/' + process.argv[i + 1];
}

/* Gulp image optimization task */
gulp.task('gulp-image-optimization', function (cb) {
    var src = BASEPATH + WILDCARD;
    gutil.log('Optimizing directory: ' + src);
    gutil.log('Optimizing images of type: ' + GULP_IMAGE_TYPES);
    var srcArr = [];
    GULP_IMAGE_TYPES.forEach(function (item, index) {
        srcArr.push(src + item)
    });
    gutil.log('Optimizing at: ' + srcArr);
    gulp.src(srcArr).pipe(
        imageOp({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }
            )).pipe(gulp.dest(OUTPUT)).on('end', cb).on('error', cb);
});

/* Images task for Gulp CLI */
gulp.task('images', ['gulp-image-optimization']);
