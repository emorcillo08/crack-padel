# Crack Padel

Ranking y jornadas de pádel para el grupo. Los datos se comparten por Firebase (proyecto `crack-padel`) y la app se instala en Android como APK.

## Cómo está armado

- `www/` es la app (una sola página). Se publica como web y también se empaqueta en el APK.
- `firestore.rules` son las reglas de seguridad. Se pegan en Firebase, en Firestore Database, pestaña Reglas.
- `.github/workflows/build.yml` publica la web y compila el APK cada vez que se sube un cambio a `main`.
- El APK queda en la página de Releases del repositorio, siempre en el mismo enlace.

## Acceso del grupo

La primera vez, cada teléfono pide el **código del grupo**. El código se guarda en Firestore, colección `groupSecret`, documento `main`, campo `code`. Para cambiarlo, edita ese campo. Los teléfonos que ya entraron siguen dentro. Para sacar a alguien, cambia el código y borra su documento en la colección `members`.

## Instalar el APK

1. Abre la página de Releases del repositorio desde el teléfono y descarga `CrackPadel.apk`.
2. Android pedirá permiso para instalar apps de esta fuente. Acéptalo solo para el navegador que usaste.
3. Para actualizar, instala el APK nuevo encima. Los datos están en la nube y no se pierden.
