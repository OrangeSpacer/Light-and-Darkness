//Основной модуль
import gulp from "gulp";
//Импорт модулей
import {path} from "./gulp/config/path.js";
import { plugins } from "./gulp/config/plugins.js";
// Передаем значения в глобальную переменную
global.app = {
    path:path,
    gulp:gulp,
    plugins:plugins,
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build')
}

// Имопрт задач
import { copy } from "./gulp/tasks/copy.js";
import { html } from "./gulp/tasks/html.js";
import {reset} from "./gulp/tasks/reset.js";
import { scss } from "./gulp/tasks/scss.js";
import { server } from "./gulp/tasks/server.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { fonts } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";



// Функция для наблюдения
function watch(){
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
    gulp.watch(path.watch.fonts, fonts)
}

const mainTasks = gulp.parallel(copy, html, scss, js, images, fonts)

const dev = gulp.series(reset, mainTasks, gulp.parallel(watch,server));
const build = gulp.series(reset,mainTasks)
const zipArchive = gulp.series(reset, mainTasks, zip);

export { dev }
export { build }
export { zipArchive }
// Выполеннеи сценария по умолчанию
gulp.task('default', dev);