# The Legend of Zelda: Majora's Mask - PC Edition

(Note, this readme is still under construction, and I'm still in the process of organizing and uploading the project, and packaging a release. Stay tuned!)

DISCLAIMER: 'The Legend of Zelda: Majora's Mask' and the entire 'The Legend of Zelda' franchise are the intellectual property of Nintendo Co., Ltd. I have no affiliation with them, nor do I have any legal rights or ownership over the aforementioned properties. I'm just a fan.

Then again, you probably new that.

DISCLAIMER 2: This README is designed for someone not TOO familiar with emulation and ROM-Hacking. Sorry if this is too dumbed down for you. Please read the whole thing anyway.

Download Latest Stable Build: getting there....

Date of Readme: 2/14/2019

## Table of Contents:

1. Introduction

2. Features

3. How To Configure

4. QIAWBFAIIDATH (Questions I Assume Will Be Frequently Asked If I Don't Answer Them Here)

5. Links

5. Conclusion


## 1) Introduction:

Well, as I am continuing my adventures in building emulator-based PC versions of retro games, I decided to tackle my own favorite game of all time: **The Legend of Zelda - Majora's Mask**.

Admittedly, this was probably the trickiest one I've attempted so far. I decided to base the project on Project64, since that's been my first choice for a N64 emulator since forever and I'm the most familiar with. Also, I was actually able to figure out how to compile it (not always a guarantee with these things). Well, since most of the major components of the emulator are broken into different plugins, it was a bit tricky to expose all of the functions and variables I needed to manipulate. Additionally, version 2.4 of Project64 (only available if build from sourcecode) has a built-in Javascript interpreter, mainly for use with the debugger. I decided to expand and modify it to work as a auxilary scripting system to go along with the emulator execution. That way, I could code my game mods in JavaScript, which is easier to write and doesn't require compilation for the smallest tweak, instead of hardcoding them into the C++ of the emulator... This turned out to be rather tricky, but I eventually got it to work.

---

This project is a customized build of Project64 v2.4, specially designed for running The Legend of Zelda: Majora's Mask. My goal is to create a gamepley experience that feels native (or as close to it as possible) to PCs.

This project also includes some (entirely optional) tweaks and minor improvements to the original game, including better textures, hotkeys for the Ocarina of Time and the transformation masks, magic regeneration, and bigger wallets and ammo bags. All of these mods are written with a JavaScript API, so users can easily tweak/change them to suit their desires or even implement their own mods.

It also features a custom ROM file that makes the Razor Sword a permenant upgrade to your sword, instead of reverting to the Kokiri Sword after 100 uses or playing the Song of Time (this doesn't make the Gilded Sword pointless, however, since the Gilded Sword still does more damage than the Razor Sword), and I've changed some of the dialog to match. However, if you don't like this, a vanilla version of the ROM is available as well.


## 2) Features:

So, exactly what does "The Legend of Zelda: Majora's Mask - PC Edition" have to offer?

No config file yet. Working on that...

### a) ADDITIONAL CONTROLS:

I've added a number of additional controls to the game. This system works by hijacking joypads 2, 3, and 4 in the emulator, so they do work with hardware controllers. The programs's input configuration screen reflects these new controls.

**** Vanilla Controls ****

Movement: WASD

Action/Interact/Roll: Space Bar

Use Sword: J

...

**** New Controls ****

...

Menu - Navigate: Arrow Keys

Menu - Select/Confirm: Enter

Menu - Back/Cancel: Backspace

Pause Game: Escape (Not in menus)

### b) IMPROVED MOVEMENT:

...

### c) MAGIC REGENERATION:

...


## 3) How To Configure:

...


## 4) QIAWBFAIIDATH (Questions I Assume Will Be Frequently Asked If I Don't Answer Them Here):

Q: What ROMs is this compatable with? A:

...

Q: Where can I get your source code? Where are your changes? A: Right Here.

If people are interested, I could put in a programmer's API/Documentation at some point.


Q: Does this work on Mac/Linux? A: No.

... I'll be adding to this part as people begin to ask questions....


## 5) Links 



https://visualstudio.microsoft.com/downloads/ - If you wanna try to work on my code, you're gonna need Microsoft Visual Studio 2017 - Community Edition (which is what I used).


## 6) Conclusion 

Well, that's all I gotta say about this project. Give it a play, lemme know what ya think!

If you got questions or comments or feedback, hit me up on Twitter (@Lt_ASchmiddy) or Discord (LT_Schmiddy#4805), and I'll be glad to talk / help you out!

LT_Schmiddy, out.

