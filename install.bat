@echo off
C:
cd %USERPROFILE%\Documents
IF NOT EXIST %USERPROFILE%\Documents\Spotify mkdir Spotify
cd Spotify
git clone git@github.com:FreddieBoi\Awesomeness-Spotify awesomeness
