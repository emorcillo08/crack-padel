// Ajusta el proyecto Android que genera Capacitor: colores y número de versión.
// Los íconos los genera make-icons.py.
import fs from 'node:fs';

const res = 'android/app/src/main/res';
let problems = 0;
const warn = (m) => { problems++; console.warn('AVISO: ' + m); };

// Número de versión: sube en cada compilación para que Android lo acepte como actualización
const gradlePath = 'android/app/build.gradle';
let gradle = fs.readFileSync(gradlePath, 'utf8');
const run = process.env.GITHUB_RUN_NUMBER || '1';
const before = gradle;
gradle = gradle.replace(/versionCode\s+\d+/, `versionCode ${run}`).replace(/versionName\s+"[^"]*"/, `versionName "1.0.${run}"`);
if (gradle === before && run !== '1') warn('no se pudo cambiar la versión en build.gradle');
fs.writeFileSync(gradlePath, gradle);

// Barra de estado y de navegación con el color de la app, y pantalla de arranque oscura
const stylesPath = `${res}/values/styles.xml`;
let styles = fs.readFileSync(stylesPath, 'utf8');
const s0 = styles;
if (styles.includes('windowNoTitle')) {
  styles = styles.replace(
    /(<item name="windowNoTitle">true<\/item>)/,
    '$1\n        <item name="android:statusBarColor">#0A1322</item>\n        <item name="android:navigationBarColor">#0A1322</item>'
  );
} else {
  warn('styles.xml sin windowNoTitle: no se cambió el color de la barra de estado');
}
styles = styles.replace(
  /<item name="android:background">@drawable\/splash<\/item>/,
  '<item name="android:background">#0A1322</item>\n        <item name="windowSplashScreenBackground">#0A1322</item>'
);
if (styles === s0) warn('styles.xml no cambió');
fs.writeFileSync(stylesPath, styles);

console.log(`Proyecto Android ajustado (versión 1.0.${run}).` + (problems ? ` Avisos: ${problems}.` : ''));
