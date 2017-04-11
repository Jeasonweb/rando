// 引入gulp
	var gulp = require('gulp');				// 基础库
	
	// 引入gulp插件
	var livereload = require('gulp-livereload'), // 网页自动刷新（服务器控制客户端同步刷新）
		webserver = require('gulp-webserver'); // 本地服务器
	
	// 注册任务
	gulp.task('webserver', function() {
		gulp.src( './app/static' ) // 服务器目录（./代表根目录）
		.pipe(webserver({ // 运行gulp-webserver
			livereload: true, // 启用LiveReload
			open: true // 服务器启动时自动打开网页
		}));
	});
	
	var clean = require('gulp-clean-css');
	
	var concat = require('gulp-concat');
	
	gulp.task('clean',function(){
		
		return gulp.src('app/static/css/*.css')
				    .pipe(concat('JZ.min.css'))
				   .pipe(clean())
				   .pipe(gulp.dest('dest/css'));
	});
	
	gulp.task('watchCss',function(){
		
		gulp.watch('app/static/css/*.css',['clean']);		
		
	});
	var uglify = require('gulp-uglify');
	
	gulp.task('uglifyjs',function(){
		
		return gulp.src('app/static/js/*.js')
					.pipe(concat('JZ.min.js'))
					.pipe(uglify())
					.pipe(gulp.dest('dest/js'));
		
	});
	
	gulp.task('watchJS',function(){		
		gulp.watch(['app/static/js/*.js','app/static/lib/*.js'],['uglifyjs','move']);
		
	});
	var htmlArr = ['app/static/*.html'];
	var htmlmin = require('gulp-htmlmin');
	gulp.task('htmlmin',function(){
		var options = {
	        removeComments: true,//清除HTML注释
	        collapseWhitespace: true,//压缩HTML
	        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
	    };
		return gulp.src(htmlArr)
		.pipe(htmlmin(options))
		.pipe(gulp.dest('dest/'));		
	})
	// 监听任务
	gulp.task('watchHtml',function(){
		gulp.watch( ['app/static/view/*.html','app/static/*.html'], ['htmlmin']); // 监听根目录下所有.html文件
	});
	
	gulp.task('move',function(){
		return gulp.src('app/static/lib/*.{js,css}')
					.pipe(gulp.dest('dest/lib'));	
		
	})
	gulp.task('help',function () {

		console.log('	gulp build			文件打包');
	
		console.log('	gulp watch			文件监控打包');
	
		console.log('	gulp help			gulp参数说明');
	
		console.log('	gulp server			测试server');
	
		console.log('	gulp -p				生产环境（默认生产环境）');
	
		console.log('	gulp -d				开发环境');
	
		console.log('	gulp -m <module>    部分模块打包（默认全部打包）');

	});
	
	gulp.task('watch',['watchCss','watchJS','watchHtml']);
	
	// 默认任务
	gulp.task('default',['webserver','clean','uglifyjs','htmlmin','watch']);
	


