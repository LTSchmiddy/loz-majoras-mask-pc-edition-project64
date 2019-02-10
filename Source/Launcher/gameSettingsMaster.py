import os, json, pygame

pygame.init()
pygame.font.init()

defaultControlPath = "LauncherData/launcherSettings.json"
controlPath = "LauncherData/launcherSettings.json"

GameProc = None


# print os.path.isfile(controlPath)

def getSettingsDict(inPath = controlPath):
    # import json
    
    scanMetaFile = open(inPath)
    retVal = json.loads(scanMetaFile.read())
    scanMetaFile.close()

    return retVal

def setSettingsDict(dataOut):
    global controlPath

    scanMetaOut = open(controlPath, 'w')
    json.dump(dataOut, scanMetaOut, indent=4, sort_keys=True)
    scanMetaOut.close()


def getScreenSettings(fileName):
    scanMetaFile = open("LauncherData\\ScreenConfigs\\" + fileName + ".json")
    retVal = json.loads(scanMetaFile.read())
    scanMetaFile.close()

    return retVal

def getHardSettings():
    retVal = {
        "FontPath": "LauncherData/_IMAGES/Fonts/Triforce.ttf",
        "BackgroundsDir": "LauncherData/_IMAGES/Backgrounds/",
        "PJ64ConfigPath": "Config/project64.cfg",
        "NRageConfigPath": "Config/NRage.ini",
        "GlideN64ConfigPath": "Plugin/Zilmar-specs/GLideN64.ini"
    }

    return retVal