var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rev = require('gulp-rev'),	//MD5戳
    revCollector = require('gulp-rev-collector'), //路径替换
    gulpSequence = require('gulp-sequence'),    //序列
    imagemin = require('gulp-imagemin'), //图片
    htmlmin = require('gulp-htmlmin'),	//压缩HTML
    autoprefixer = require('gulp-autoprefixer');	//前缀的后处理程序

//sass
gulp.task('sass', function () {
  return gulp.src('./assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))

    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest('bulid/assets/css'));
});

//压缩css
gulp.task('minifycss', function(){
	return gulp.src('./assets/css/*.css')
		.pipe(minifycss())
		.pipe(rev())				//给文件添加hash编码  
		.pipe(gulp.dest('bulid/assets/css'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('bulid/assets/css'));//rev-manifest.json文件
})

//压缩js
gulp.task('uglify', function(){
	return gulp.src('./assets/js/*.js')
		.pipe(uglify())
		.pipe(rev())				//给文件添加hash编码  
		.pipe(gulp.dest('bulid/assets/js'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('bulid/assets/js'));//rev-manifest.json文件
})

//压缩img
gulp.task('imagemin', function () {
    return gulp.src('./assets/images/**')
        // .pipe(imagemin())
        // .pipe(rev())
        // .pipe(gulp.dest('bulid/assets/images'))
        // .pipe(rev.manifest())
        .pipe(gulp.dest('bulid/assets/images'));//rev-manifest.json文件
});

//插件
gulp.task('plugins', function () {
    return gulp.src('./assets/plugins/**')
        .pipe(gulp.dest('bulid/assets/plugins'));
});


//压缩html
gulp.task('htmlMin', function() {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };

    gulp.src(['bulid/assets/images/*.json','bulid/assets/css/*.css'])
	    .pipe(revCollector())
	    .pipe(gulp.dest('bulid/assets/css'));

    gulp.src(['bulid/assets/images/*.json','bulid/assets/css/*.json','bulid/assets/js/*.json','./*.html'])
	    .pipe(revCollector()) //执行文件内引用名的替换
	    .pipe(htmlmin(options))
	    .pipe(gulp.dest('bulid'));
});

gulp.task('product',gulpSequence('imagemin','sass','minifycss','uglify','htmlMin','plugins'));

gulp.task('default',['product'], function() {
    console.log('ok');
});



