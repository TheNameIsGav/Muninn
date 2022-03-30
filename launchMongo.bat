@echo off
set /p id="Would you like to start the connector? [Y/N] "

::Start the Mongo Server
start cmd /k ""C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath ".\data""

::Wait for 5000 miliseconds before starting the connection
if %id%==Y ping 192.0.2.2 -n 1 -w 5000 > nul

::Start the Connector
if %id%==Y start cmd /k "C:\Program Files\MongoDB\Server\5.0\bin\mongo.exe"
pause