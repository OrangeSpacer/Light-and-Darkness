import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'
import groupMediaQueriesCss from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass)

export const scss =   () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: true})
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(groupMediaQueriesCss())
        // .pipe(
        //     app.plugins.if(
        //         app.isBuild,
        //         groupMediaQueriesCss() //Если что-то нужно использовать только в продакшен билде
        //     )
        // )
        //.pipe(app.gulp.dest(app.path.build.css)) //Добавляет обычный файл css без сжатия
        .pipe(cleanCss())
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}