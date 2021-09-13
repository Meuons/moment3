const {src, dest, watch, series, parallel} = require("gulp");
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const terser = require('gulp-terser');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');


const options = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false,
    },
};

const gulp = require('gulp');
const cssScss = require('gulp-css-scss');

livereload({ start: true })
//Filepaths
const files = { 
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    imgPath: "src/**/*.jpg",
    sassPath: "src/**/*.scss"
}

function sassTask() {
    return src(files.sassPath)
    .pipe(concat('styles.scss'))
        .pipe(sass().on("error", sass.logError))
        .pipe(minifyCSS())
        .pipe(dest("pub/css"));
}
        
//HTML-task, duplicate files
function htmlTask() {
return src(files.htmlPath)

.pipe(dest('pub'))

}
//Img-task, duplicate files
function imgTask() {
    return src(files.imgPath)
    .pipe(dest('pub'))
    }

//JS-task,  minify, concat
function jsTask() {
    return src(files.jsPath)
    .pipe(concat('scripts.js'))
    .pipe(terser())
    .pipe(dest('pub/js'));ulp
}

//Watch
function watchTask(){
  watch([files.htmlPath, files.jsPath, files.imgPath, files.sassPath], parallel(htmlTask, jsTask, imgTask, sassTask));
}

exports.default = series (
    parallel(htmlTask, jsTask, imgTask, sassTask),
    watchTask
);
