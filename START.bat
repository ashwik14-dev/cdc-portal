@echo off
title CDC Portal Launcher
color 0B

echo ============================================
echo            CDC PORTAL LAUNCHER
echo ============================================
echo.
echo Starting backend (API on port 5000)...
start "CDC Server" cmd /k "cd /d "%~dp0server" && npm run start"

echo Starting frontend (Website on port 5173)...
start "CDC Client" cmd /k "cd /d "%~dp0client" && npm run dev"

echo.
echo Waiting for servers to start...
timeout /t 7 /nobreak >nul

REM --- detect LAN IP so phones on the same Wi-Fi can open the app ---
set "LANIP="
for /f "usebackq delims=" %%a in (`powershell -NoProfile -Command "$ips=@(Get-NetIPAddress -AddressFamily IPv4).Where({$_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*'}); $ips[0].IPAddress"`) do set "LANIP=%%a"

echo Opening browser (localhost)...
start "" http://localhost:5173

echo.
echo ============================================
echo  CDC Portal is running!
echo.
echo   On this PC:          http://localhost:5173
if defined LANIP echo   On a phone (Wi-Fi):  http://%LANIP%:5173
echo.
echo  If the page does not load, wait 5 seconds
echo  then refresh the browser.
echo.
echo  To STOP the app: just close the two
echo  black terminal windows (CDC Server/Client).
echo ============================================
echo.
pause
