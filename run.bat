@echo off
echo [ INFORMACION ] Yuki_Suou-Bot para Windows

REM Ejecutar el archivo setup.bat
echo [Console @ Yuki_Suou] Verificando si los programas de ejecucion estan instalados...
call setup.bat

REM Verificar si setup.bat terminó correctamente
if %errorlevel% neq 0 (
    echo [Console @ Yuki_Suou] setup.bat termino con errores, pero se continuara con la ejecución.
)

REM Ejecutar node index.js
echo [Console @ Yuki_Suou] Iniciando Yuki_Suou-Bot...
node index.js
if %errorlevel% neq 0 (
    echo [ERROR] Ocurrio un error. Verifica la instalacion.
)

REM Pausa final para mantener la ventana abierta
echo Presiona una tecla para cerrar esta ventana...
pause