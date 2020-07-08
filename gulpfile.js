//导入插件
const gulp = require("gulp");
const cssmin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const clean = require("gulp-clean");
const sass = require("gulp-sass-china");
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

// 处理css的指令：压缩，添加兼容前缀
function cssFn(){
    return gulp.src("./src/css/**/*")
            .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
            .pipe(cssmin())
            .pipe(rename({suffix : '.min'}))
            .pipe(gulp.dest("./dist/css"))
}
module.exports.css = cssFn;

// 定义css的监听
function watchCssFn(){
    return gulp.watch("./src/css/**/*",cssFn);
}
module.exports.watchCss = watchCssFn;

// 定义sass的指令功能
function sassFn(){
    return gulp.src("./src/sass/**/*")
            .pipe(sass())
            .pipe(cssmin())
            .pipe(rename({suffix : '.min'}))
            .pipe(gulp.dest("./dist/css"));
}

// 暴露指令
exports.sass = sassFn;

// 监听sass
function watchSassFn(){
    return gulp.watch("./src/sass/**/*",sassFn);
}
exports.watchSass = watchSassFn;


// 处理js的指令：ES6编译ES5，压缩
function jsFn(){
    return gulp.src("./src/js/**/*")
        .pipe(babel({
            presets:["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest("./dist/js"))
}
module.exports.js = jsFn;

//转存库
function libFn(){
        return gulp.src("./src/libs/**/*")
            .pipe(babel({
                presets:["@babel/env"]
            }))
            .pipe(uglify())
            .pipe(rename({suffix : '.min'}))
            .pipe(gulp.dest("./dist/libs/"))
}

module.exports.lib = libFn;
// 定义js的监听
function watchJsFn(){
    return gulp.watch("./src/js/**/*",jsFn);
}
module.exports.watchJs = watchJsFn;

// 处理html的指令：压缩
function htmlFn(){
    return gulp.src("./src/pages/**/*")
        .pipe(htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./dist/pages"))
}
module.exports.html = htmlFn;

// 定义html的监听
function watchHtmlFn(){
    return gulp.watch("./src/pages/**/*",htmlFn);
}
module.exports.watchHtml = watchHtmlFn;

//定义json数据的拷贝
function dataFn(){
    return gulp.src("./src/data/*")
        .pipe(gulp.dest("./dist/data"));
}

// 监听json数据
function watchDataFn(){
    return gulp.watch("./src/data/*",dataFn);
}
//压缩图片
function imgFn(){
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
}
module.exports.img = imgFn;
    
//定义图片的监听
function watchImgFn(){
    return gulp.watch('./src/img/**/*',imgFn);
}
module.exports.watchimg = watchImgFn;
// 删除文件：慎用！
// 定义功能：
function cleanFn(){
    return gulp.src('./dist')
        .pipe(clean())
}
// 暴露指令
exports.clean = cleanFn;

//首页的拷贝
function indexFn(){
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"));
}
exports.index = indexFn;

//监听部分
function watchPartFn(){
    gulp.watch("./src/index.html",indexFn);
    gulp.watch("./src/sass/**/*",sassFn);
}
//监听所有
function watchAllFn(next){
    gulp.watch("./src/css/**/*",cssFn);
    gulp.watch("./src/js/**/*",jsFn);
    gulp.watch("./src/pages/**/*",htmlFn);
    gulp.watch("./src/index.html",indexFn);
    gulp.watch("./src/sass/**/*",sassFn);
    gulp.watch('./src/img/**/*',imgFn);
    gulp.watch("./src/data/*",dataFn);
    next();
}
//暴露指令
exports.watchAll = watchAllFn;


// 根据当前项目的实际情况，定义对应的处理指令，决定批量执行的处理指令
exports.htmlJsCssStatic = gulp.parallel(htmlFn,jsFn,cssFn,indexFn);

exports.p = gulp.series(gulp.parallel(indexFn,sassFn),watchPartFn);
// 终极打包：先执行打包的文件处理，然后再开启监听和服务器
exports.all = gulp.series(
        gulp.parallel(htmlFn,jsFn,cssFn,indexFn,sassFn,libFn,imgFn,dataFn),
        gulp.parallel(watchAllFn)
);

