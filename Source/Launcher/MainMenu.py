# -*- coding: utf-8 -*-
"""
Created on Sat Mar 14 16:03:01 2015

@author: alex
"""

import AssetUI
import pygame, os, subprocess, configparser, sys
import gameSettingsMaster as gsm
import BasePanel

pygame.init()
pygame.font.init()


class GUI(BasePanel.BaseGUI):
    def __init__(self, rect, pos, jsonArgs = None, hostVars = None):
        # super(BasePanel.BaseGUI, self).__init__()

        self.show = True
        self.surfaceDrawn = True
        self.pos = pos
        self.dimens = rect
        self.Panel = pygame.Surface(self.dimens).convert_alpha()
        # self.Panel.set_alpha(jsonArgs["alpha"])
        self.fillColor = [0, 0, 0, jsonArgs["alpha"]]
        # self.fillColor = [0, 0, 0, 0]
        self.hostvar = hostVars
        self.animating = True
        self.UpToDate = False

        # Data Setup:
        self.PJ64Config = configparser.ConfigParser()
        self.PJ64Config.read(hostVars["hardSettings"]["PJ64ConfigPath"])

        # self.NRageConfig = configparser.ConfigParser()
        # self.NRageConfig.read(hostVars["hardSettings"]["NRageConfigPath"])

        self.LocalTexturePath = hostVars["mainSettings"]["Game"]["Local Texture Path"]
        self.GlideN64Config = configparser.ConfigParser()
        self.GlideN64Config.read(hostVars["hardSettings"]["GlideN64ConfigPath"])

        # logo: https://www.deviantart.com/blueamnesiac/art/Majora-s-Mask-Logo-448835669

        # UI Setup:
        self.useFont = pygame.font.Font(hostVars["hardSettings"]["FontPath"], 30)
        self.Logo = pygame.image.load("LauncherData/_IMAGES/Logo.png")

        self.buttons = {
            "Play": AssetUI.LabelButton([55, 220], self.pos, "Play Game", 80),
            "Settings": AssetUI.LabelButton([80, 300], self.pos, "Settings", 30),
            "Exit": AssetUI.LabelButton([400, 400], self.pos, "Exit", 20),
            # "Mods": AssetUI.LabelButton([240, 300], self.pos, "Mods", 30),

        }



        # print self.GlideN64Config.get("textureFilter", "txPath")

        self.updateGlobalTexturePath()

    def get_hostvar(self, var):
        self.hostvar = var
 
    def send_hostvar(self):
        return self.hostvar           

    def updateGlobalTexturePath(self):
        useCWD = os.getcwd().replace("\\", "/")

        newTexturePath = useCWD + self.LocalTexturePath

        # print "New Texture Path:", newTexturePath
        self.GlideN64Config.set("textureFilter", "txPath", newTexturePath)

        writeFile = open(self.hostvar["hardSettings"]["GlideN64ConfigPath"], "w")
        self.GlideN64Config.write(writeFile, True)
        writeFile.close()

    def bg_tasks(self):
        self.show = (self.hostvar["currentMenu"] == "main")


    def event_loop(self, event):
        if (not self.show):
            return

        if gsm.GameProc != None:

            if gsm.GameProc.poll() == None:
                return
            else:
                gsm.GameProc = None


        for key, value in self.buttons.iteritems():
            if value.clickBool(event):

                if key == "Play":
                    self.updateGlobalTexturePath()
                    gsm.GameProc = subprocess.Popen([self.hostvar["mainSettings"]["Game"]["Game Exec"]], cwd=self.hostvar["mainSettings"]["Game"]["Game Working Dir"])

                    if self.hostvar["mainSettings"]["Game"]["Close Launcher On Start"]:
                        sys.exit()

                elif key == "Settings":
                    self.hostvar["currentMenu"] = "settings"
                # elif key == "Mods":
                #     self.hostvar["currentMenu"] = "mods"
                elif key == "Exit":
                    sys.exit()


    def percents(self, val, off):
        x = ((self.dimens[0] * val[0])/100) + off[0]
        y = ((self.dimens[1] * val[1])/100) + off[1]
        pixels = [x, y]
        return pixels
    
    def updatePanel(self):
        self.surfaceDrawn = False
        self.Panel.fill(self.fillColor)
        self.Panel.blit(self.Logo, [20, 0])
        # pygame.draw.rect(self.Panel, [0, 0, 0], pygame.Rect([0, 0], self.dimens), 10)

        for key, value in self.buttons.iteritems():
            value.Draw()
            self.Panel.blit(value.image, value.pos)

        self.UpToDate = True
        self.surfaceDrawn = True




    def get_updatePanel(self):
        return True


# if __name__ == '__main__':
    # disp=GUI([800,600], [0, 0])
    # screen = pygame.display.set_mode(disp.dimens)
    # disp.updatePanel()
    # while not os.path.isfile("kill"):
        # disp.bg_tasks()
        # disp.event_loop()
        # if disp.get_updatePanel() == True:    
            # disp.updatePanel()
            
        # screen.blit(disp.Panel, disp.pos)
        # pygame.display.flip()

        # time.sleep(.05)
        
