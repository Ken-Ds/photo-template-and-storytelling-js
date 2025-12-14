@echo off
title Master Image Server
color 6
echo Hello! This script will start the Master Image server.
echo ------------------------------------------
echo Starting the server...
echo ------------------------------------------
echo Press CTRL+C to stop the server at any time.
echo ------------------------------------------

:: Run the server
node server.js

:: This keeps the window open if the server crashes so you can see the error
echo ------------------------------------------
echo Server stopped.
pause