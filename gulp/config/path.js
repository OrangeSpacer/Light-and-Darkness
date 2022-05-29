//Для получения имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const scrFolder = `./src`;

export const path = {
    build: {
        js : `${buildFolder}/js/`,
        images: `${buildFolder}/img`,
        css : `${buildFolder}/css/`,
        fonts: `${buildFolder}/fonts`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`
    },
    src: {
        js : `${scrFolder}/js/main.js`,
        images: `${scrFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        scss: `${scrFolder}/scss/style.scss`,
        fonts: `${scrFolder}/fonts/*`,
        html: `${scrFolder}/*.html`,
        files: `${scrFolder}/files/**/*.*`,
    },
    watch: {
        js : `${scrFolder}/js/**/*.js`,
        images: `${scrFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        scss: `${scrFolder}/scss/**/*.scss`,
        fonts: `${scrFolder}/fonts/*`,
        html: `${scrFolder}/**/*.html`,
        files: `${scrFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: scrFolder,
    rootFolder: rootFolder,
    ftp: ``
}