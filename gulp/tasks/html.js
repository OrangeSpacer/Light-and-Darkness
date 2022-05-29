import fileinclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}