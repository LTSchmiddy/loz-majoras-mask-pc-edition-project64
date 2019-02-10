# -*- coding: utf-8 -*-
"""
Created on Sat Mar 14 16:03:01 2015

@author: alex
"""

import AssetUI
import pygame, os
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
        self.Panel = pygame.Surface(self.dimens)
        self.fillColor = [255, 255, 255]

        self.animating = False
        self.UpToDate = False

        self.UnsortedImageNames = []
        self.ImageNames = []

        for i in os.listdir(hostVars["hardSettings"]["BackgroundsDir"]):
            if i.endswith(".png"):
                self.UnsortedImageNames.append(i)

        while (len(self.UnsortedImageNames) > 0):
            lowestNum = 10000
            lowestNumImg = ""

            for i in self.UnsortedImageNames:
                newNum = int(i.split(".")[0])
                if int(i.split(".")[0]) < lowestNum:
                    lowestNum = newNum
                    lowestNumImg = i


            self.ImageNames.append(lowestNumImg)
            self.UnsortedImageNames.remove(lowestNumImg)

        print self.ImageNames

        self.Images = []

        for i in self.ImageNames:
            newSurf = pygame.image.load(hostVars["hardSettings"]["BackgroundsDir"] + i)
            self.Images.append(newSurf)

        self.currentImage = 0
        self.currentFrame = 0
        self.maxFrame = hostVars["targetFPS"] * 5


    def get_hostvar(self, var):
        self.hostvar = var
 
    def send_hostvar(self):
        return self.hostvar           
            
    def bg_tasks(self):
        self.currentFrame += 1



        if self.currentFrame > self.maxFrame:
            self.UpToDate = False
            self.currentImage += 1

            self.currentFrame = 0


            if self.currentImage >= len(self.Images):
                self.currentImage = 0


    def event_loop(self, event):
        pass


    def percents(self, val, off):
        x = ((self.dimens[0] * val[0])/100) + off[0]
        y = ((self.dimens[1] * val[1])/100) + off[1]
        pixels = [x, y]
        return pixels
    
    def updatePanel(self):
        self.surfaceDrawn = False
        self.Panel.fill(self.fillColor)
        self.Panel.blit(self.Images[self.currentImage], [0, 0])


        # pygame.draw.rect(self.Panel, [0, 0, 0], pygame.Rect([0, 0], self.dimens), 10)

        # print "BG Drawn"


        self.UpToDate = True
        self.surfaceDrawn = True




    def get_updatePanel(self):
        # return self.currentFrame < self.maxstaticFrame
        return (self.animating or not self.UpToDate)
            

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
        
