const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const webserver = require("gulp-webserver");
const clean = require("gulp-clean");
const sass = require("gulp-sass-china");


//文件的批量转存
function copyFileFn(){
    return gulp.src("./project/static/**/*")
            .pipe(gulp.dest("./server/static"));
}
module.exports.copyFile = copyFileFn;


//开启监听
function watchFn(){
    return gulp.watch("./project/static/**/*",copyFileFn);
}
module.exports.watch = watchFn;

// 处理css的指令：压缩，添加兼容前缀
function cssFn(){
    return gulp.src("./project/css/**/*")
            .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
            // .pipe(cssmin())
            .pipe(gulp.dest("./server/css"))
}
module.exports.css = cssFn;

// 定义css的监听
function watchCssFn(){
    return gulp.watch("./project/css/**/*",cssFn);
}
module.exports.watchCss = watchCssFn;

// 定义sass的指令功能
function sassFn(){
    return gulp.src("./project/sass/**/*")
            .pipe(sass())
            .pipe(gulp.dest("./server/css"));
}

// 暴露指令
exports.sass = sassFn;

// 监听sass
function watchSassFn(){
    return gulp.watch("./project/sass/**/*",sassFn);
}
exports.watchSass = watchSassFn;


// 处理js的指令：ES6编译ES5，压缩
function jsFn(){
    return gulp.src("./project/js/**/*")
        .pipe(babel({
            presets:["@babel/env"]
        }))
        // .pipe(uglify())
        .pipe(gulp.dest("./server/js"))
}
module.exports.js = jsFn;

function libFn(){
        return gulp.src("./project/libs/**/*")
            .pipe(babel({
                presets:["@babel/env"]
            }))
            .pipe(uglify())
            .pipe(gulp.dest("./server/libs/"))
}

module.exports.lib = libFn;
// 定义js的监听
function watchJsFn(){
    return gulp.watch("./project/js/**/*",jsFn);
}
module.exports.watchJs = watchJsFn;

// 处理html的指令：压缩
function htmlFn(){
    return gulp.src("./project/pages/**/*")
        // .pipe(htmlmin({
        //     removeEmptyAttributes:true,
        //     collapseWhitespace:true
        // }))
        .pipe(gulp.dest("./server/pages"))
}
module.exports.html = htmlFn;

// 定义html的监听
function watchHtmlFn(){
    return gulp.watch("./project/pages/**/*",htmlFn);
}
module.exports.watchHtml = watchHtmlFn;

// 删除文件：慎用！
// 定义功能：
function cleanFn(){
    return gulp.src('./server')
        .pipe(clean())
}
// 暴露指令
exports.clean = cleanFn;

//首页的拷贝
function indexFn(){
    return gulp.src("./project/index.html")
        .pipe(gulp.dest("./server"));
}
exports.index = indexFn;

//监听所有
function watchAllFn(next){
    gulp.watch("./project/static/**/*",copyFileFn);
    gulp.watch("./project/css/**/*",cssFn);
    gulp.watch("./project/js/**/*",jsFn);
    gulp.watch("./project/pages/**/*",htmlFn);
    gulp.watch("./project/index.html",indexFn);
    gulp.watch("./project/sass/**/*",sassFn);
    next();
}
//暴露指令
exports.watchAll = watchAllFn;

// 定义服务器功能
function serverFn(){
    return gulp.src("./server")
        .pipe(webserver({
            host:"localhost",
            port:"2000",
            livereload:true,
            open:"./index.html",
        }))
}
// 暴露指令
exports.server = serverFn;

// 根据当前项目的实际情况，定义对应的处理指令，决定批量执行的处理指令
exports.htmlJsCssStatic = gulp.parallel(htmlFn,jsFn,cssFn,copyFileFn,indexFn);

exports.p = gulp.series(gulp.parallel(htmlFn,copyFileFn,cssFn),watchAllFn);
// 终极打包：先执行打包的文件处理，然后再开启监听和服务器
exports.all = gulp.series(
        gulp.parallel(htmlFn,copyFileFn,jsFn,cssFn,indexFn,sassFn,libFn),
        gulp.parallel(watchAllFn,serverFn)
);

