#!/bin/sh

setxkbmap -model thinkpad us \
    -option caps:ctrl_modifier \
    -keycodes tilde \
    -variant mac \
    -print | \
    xkbcomp - $DISPLAY -I$HOME/.xkb

exec bin/startxmonad
