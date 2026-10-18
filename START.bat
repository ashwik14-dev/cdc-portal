@echo off
setlocal EnableExtensions
title CDC Portal Launcher
color 0B
cd /d "%~dp0"

echo ============================================
echo            CDC PORTAL LAUNCHER
echo ============================================
echo.

REM ---------- 1) Node.js ----------
where node >nul 2>nul
if errorlevel 1 goto :no_node
for /f "delims=" %%v in ('node -v 2^>nul') do echo [OK]  Node.js %%v

REM ---------- 2) Packages (only the first time) ----------
if not exist "server\node_modules" (
  echo [..]  Installing backend packages ^(first run, this can take a minute^)...
  call npm --prefix server install --no-audit --no-fund
  if errorlevel 1 goto :install_failed
) else (
  echo [OK]  Backend packages installed
)
if not exist "client\node_modules" (
  echo [..]  Installing frontend packages ^(first run, this can take a minute^)...
  call npm --prefix client install --no-audit --no-fund
  if errorlevel 1 goto :install_failed
) else (
  echo [OK]  Frontend packages installed
)

REM ---------- 3) Settings file ----------
if not exist "server\.env" (
  copy /Y "server\.env.example" "server\.env" >nul
  if errorlevel 1 goto :no_env_example
  echo [OK]  Created server\.env from server\.env.example
) else (
  echo [OK]  server\.env found
)

REM ---------- 4) Already running? ----------
netstat -an | findstr /C:"LISTENING" | findstr /C:":5000 " >nul
if not errorlevel 1 goto :already_running
netstat -an | findstr /C:"LISTENING" | findstr /C:":5173 " >nul
if not errorlevel 1 goto :already_running

REM ---------- 5) Database + accounts ----------
echo [..]  Connecting to MongoDB and creating any missing accounts...
call npm --prefix server run seed
if errorlevel 1 goto :no_mongo

REM ---------- 6) Start the app ----------
echo.
echo Starting backend (API on port 5000)...
start "CDC Server" cmd /k "cd /d "%~dp0server" && npm run start"

echo Starting frontend (website on port 5173)...
start "CDC Client" cmd /k "cd /d "%~dp0client" && npm run dev"

echo.
echo Waiting for the servers to start...
timeout /t 7 /nobreak >nul

set "LANIP="
for /f "usebackq delims=" %%a in (`powershell -NoProfile -Command "$ips=@(Get-NetIPAddress -AddressFamily IPv4).Where({$_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*'}); $ips[0].IPAddress"`) do set "LANIP=%%a"

echo Opening the browser...
start "" http://localhost:5173

echo.
echo ============================================
echo  CDC Portal is running!
echo.
echo   On this PC:          http://localhost:5173
if defined LANIP echo   On a phone (Wi-Fi):  http://%LANIP%:5173
echo.
echo  Log in with the accounts printed above
echo  ^(admin@cdc.ac.in / Admin@123 by default^).
echo.
echo  To STOP the app: close the two black
echo  windows named "CDC Server" and "CDC Client".
echo ============================================
echo.
pause
exit /b 0

:no_node
echo [X]   Node.js was not found on this computer.
echo.
echo       Install the LTS version from https://nodejs.org
echo       then run START.bat again.
echo.
pause
exit /b 1

:install_failed
echo [X]   Installing the packages failed.
echo       Check your internet connection and run START.bat again.
echo.
pause
exit /b 1

:no_env_example
echo [X]   server\.env.example is missing, so server\.env could not be created.
echo.
pause
exit /b 1

:already_running
echo [X]   The app already looks like it is running ^(ports 5000/5173 are busy^).
echo.
echo       Close the windows named "CDC Server" and "CDC Client",
echo       or just open http://localhost:5173 in your browser.
echo.
pause
exit /b 1

:no_mongo
echo.
echo [X]   Could not reach the database, so the app cannot start.
echo.
echo       Easiest fix: install MongoDB Community Server
echo       https://www.mongodb.com/try/download/community
echo       choose "Complete" setup, keep it running as a Windows service,
echo       then run START.bat again.
echo.
echo       Already have a database elsewhere ^(e.g. MongoDB Atlas^)?
echo       Put its address in server\.env as MONGO_URI and run START.bat again.
echo.
pause
exit /b 1
