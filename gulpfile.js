var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("build", function() {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
            module: "commonjs",
            target: "es5",
            removeComments: true,
            noImplicitAny: true,
        }));
    return tsResult.js.pipe(gulp.dest('built'));
});