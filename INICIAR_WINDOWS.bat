@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js 22 o posterior y vuelve a abrir este archivo.
  echo Descarga: https://nodejs.org/
  pause
  exit /b 1
)
node scripts\serve.mjs
pause
