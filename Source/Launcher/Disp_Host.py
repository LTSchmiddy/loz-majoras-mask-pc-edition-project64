# ************************************************************
# Engine Project Name: Panels - PC Action/Adventure 2D Game Engine
# Game Project Name: Comical - The Decrepit Mansion
# Project Creation Date: April 2017
# --------------------------------------------------------
# Script Title: Panels Game Engine - Master File
# Script Creation Date: April 2015
# Author: Alex "LT_Schmiddy" Schmid
# Version: 0.a
# ************************************************************

#NOTICE: The Panels Engine comes with it's own bundled version of python 2.7
import sys, gameSettingsMaster, pygame, os, time, thread
import MainMenu, SettingsMenu, ModsMenu, Background

mainSettings = gameSettingsMaster.getSettingsDict()
hardSettings = gameSettingsMaster.getHardSettings()

# if (("--useLauncher" in sys.argv) or mainSettings["Game"]["Use Launcher"]) and not "--bypassLauncher" in sys.argv:
    # Launcher.loadLauncher()

modules = [[Background], [MainMenu], [SettingsMenu], [ModsMenu]]

# dispdims = [1920, 1080]

targetFPS = 30

# ***********DO_NOT_TOUCH_THIS_LINE**************

# The content above can be re-written by "Start_HUB.py".
# The "disp_config.txt" file is the easiest way to configure the panels used in this file.
# In that file, define the panel modules, their dimension arguments, and their position arguements.
# Then Run "Start_HUB.py". It will update the information above to reflect "disp_config.txt".


# from dataManagers import audioMan, dialogManager, flipBookHandler, debugLogging, steamWrapper, storeManager, saveManager, counter, contentPackages

# if mainSettings["Editor"]["isServerActive"]:
    # import EditorSystem, cherrypy



# fpsFontRend = pygame.font.Font("_IMAGES\\ComicSans.ttf", 20)

displaySettings = mainSettings["Display"]
useFPSStabilizing = displaySettings["Use Frame Stabilizing"]

screenSettings = gameSettingsMaster.getScreenSettings(displaySettings["DisplayFile"])

dispdims = screenSettings["Screen Resolution"]

currentFPS = 0

for i in range(0, len(modules)):
    useName = str(modules[i][0].__name__)
    modules[i].append(screenSettings["Panel Settings"][useName]["res"])
    modules[i].append(screenSettings["Panel Settings"][useName]["pos"])
    modules[i].append(screenSettings["Panel Settings"][useName])

# Loading Steam API:

# run Visual Studio dev version of the API wrapper:
# steamAPI = steamWrapper.API(True, True, "C:\\Users\\Alex Schmid\\Documents\\Visual Studio 2017\\Projects\\SBPv2\\Debug")
# steamAPI = steamWrapper.API(True)
# steamAPI = steamWrapper.API(False)


# isSteamLoaded = steamAPI.initSteam()
# print steamAPI.getSpam()

# from EngineControl import flipAnim

#
# import OpenGL.GL
# import OpenGL.GLU
pygame.init()
pygame.mixer.init()

gfxFPS = displaySettings["Frames Per Second"]

# pygame.display.set_caption("Comical - v0.1")
pygame.display.set_icon(pygame.image.load("LauncherData/_IMAGES/Majoras Mask Icon.png"))

pygame.display.set_caption("Majora's Mask")

# if (displaySettings["Fullscreen"]):
    # screen = pygame.display.set_mode(dispdims, pygame.FULLSCREEN | pygame.DOUBLEBUF | pygame.HWSURFACE)
    
# else:
    # screen = pygame.display.set_mode(dispdims, pygame.DOUBLEBUF | pygame.RESIZABLE)
# screen = pygame.display.set_mode(dispdims, pygame.DOUBLEBUF | pygame.RESIZABLE)
screen = pygame.display.set_mode(dispdims, pygame.DOUBLEBUF)


if "--FPS" in sys.argv:
    gfxFPS = int(sys.argv[sys.argv.index("--FPS") + 1])
    print "FPS Set to", gfxFPS
    time.sleep(1)

fpsFactor = int(60 / gfxFPS)
# print fpsFactor
flipCounter = fpsFactor

# audio = audioMan.AudioController()

# Initialize Loading Screen. Automatically appears if the main loop is taking too long.
# canUseLoadingScreen = False
# isLoading = False
# lastFrameUpdate = 0
# loadingAnim = flipAnim.Animation(1)
# loadingAnim.loadFramesFromFolder("_IMAGES/SplashScreen/LoadingAnim", ".png")
# fpsWasLoading = False


# inIntro = True
# def LogoIntro():
    # global canUseLoadingScreen, inIntro
    # if not "--SkipLogo" in sys.argv:

        # screen.fill([255, 255, 255])
        # splash = pygame.image.load("_IMAGES\\SplashScreen\\SiteLogoTab_v3.png")
        # # screen.fill([0, 0, 0])
        # screen.blit(splash, [(screen.get_size()[0] / 2) - (splash.get_size()[0] / 2),
                             # (screen.get_size()[1] / 2) - (splash.get_size()[1] / 2)])
        # pygame.display.flip()

        # LogoCounter = counter.TickCounter(4, False, True)
        # channela = audio.triggerSound("AngelFishJingle")

        # while LogoCounter.check():
            # ISEvent = pygame.event.get()
            # time.sleep(1)



    # canUseLoadingScreen = True
    # inIntro = False
    # if mainSettings["Audio"]["Use Game Music"]:
        # audio.setMusicTrack("MainTheme")


# thread.start_new_thread(LogoIntro, ())

hostvar = {
    "currentMenu": "main",
    "showFPS": False,
    "targetFPS": targetFPS,
    "hardSettings": hardSettings,
    "mainSettings": mainSettings
    
}

# startup loop:



panels = []

# for i in range(0, len(modules)):
#     modules[i][3]["hostVar"] = hostvar

for mod in modules:
    n = mod[0].GUI(mod[1], mod[2], mod[3], hostvar)
    #    n.updatePanel()
    panels.append(n)

# print panels

clockLogic = pygame.time.Clock()
clockGFX = pygame.time.Clock()

for i in panels:
    screen.blit(i.Panel, i.pos)


pygame.display.flip()

# if mainSettings["Editor"]["isServerActive"]:
    # thread.start_new_thread(EditorSystem.launchServer, tuple([hostvar]))


# def GFXThread(myPanels):
    # global allowFlip
    # print "THREAD2"
    # for i in myPanels:
    #     i.get_hostvar(hostvar)

    # while True:
        # pygame.display.flip()
        # clockGFX.tick(gfxFPS)


# drawingPanels = 0


# def panelDrawThread(i, ext):
    # global drawingPanels

    # drawingPanels += 1

    # if i.show:
        # if i.get_updatePanel():
            # i.updatePanel()
        # screen.blit(i.Panel, i.pos)

    # drawingPanels -= 1


# def panelDraw(Panel):
    # thread.start_new_thread(panelDrawThread, (Panel, "hi"))


# def flipOnThread():
    # thread.start_new_thread(pygame.display.flip, ())


keyheldlist = []
# while not os.path.isfile("kill"):

# while inIntro:
#     pass

while True:
    flipCounter += 1

    # print flipCounter
    if flipCounter >= fpsFactor:
        flipCounter = 0
        # print "Tick!"

    # GET EVENTS
    event_list = pygame.event.get()

    kdnlist = []
    kuplist = []

    mouseDownList = []
    mouseUpList = []

    mouseaction = list(pygame.mouse.get_pressed())
    mouseaction.append(0)

    for event in event_list:
        if event.type == pygame.QUIT:
            sys.exit(0)
        elif event.type == pygame.KEYDOWN:
            kdnlist.append(event.key)
            keyheldlist.append(event.key)

        elif event.type == pygame.KEYUP:
            kuplist.append(event.key)
            keyheldlist.remove(event.key)
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 4:
                mouseaction[3] = (1)

            elif event.button == 5:
                mouseaction[3] = (-1)

            mouseDownList.append(event.button)

        elif event.type == pygame.MOUSEBUTTONUP:
            mouseUpList.append(event.button)

    if (pygame.K_RALT in keyheldlist or pygame.K_LALT in keyheldlist) and pygame.K_F4 in keyheldlist:
        sys.exit(0)

    # pygame.event.clear()
    # if kdnlist != []:
    #     print kdnlist


    screen.fill([25, 25, 25])
    # RUN EACH PANEL
    for i in panels:

        i.get_hostvar(hostvar)
        i.bg_tasks()

        i.event_loop(
            {"kdown": kdnlist, "kup": kuplist, "kheld": keyheldlist, "mdown": mouseDownList, "mup": mouseUpList,
             "mstate": mouseaction})
        hostvar = i.send_hostvar()

        # if useGFXThread == False:
        if flipCounter == 0:
            # panelDraw(i)
            #
            if i.show:
                if i.get_updatePanel():
                    i.updatePanel()

                screen.blit(i.Panel, i.pos)             
                
                
    if flipCounter == 0:

        # while drawingPanels != 0:
        #     pass
        #
        # if hostvar["showFPS"]:
        #     screen.blit(fpsFontRend.render(str(currentFPS), True, [255, 255, 200], [0, 0, 0]), [0, 0])
        
        pygame.display.flip()
        currentFPS = clockLogic.get_fps()
        fpsFactor = int(targetFPS / gfxFPS) # - 1
        # print "Flip"





    clockLogic.tick(targetFPS)
    if useFPSStabilizing:
        currentFPS = clockLogic.get_fps()
        if currentFPS > 0:
            # print currentFPS
            fpsFactor = int(targetFPS/currentFPS)

    lastFrameUpdate = pygame.time.get_ticks()

    # isLoading = False


