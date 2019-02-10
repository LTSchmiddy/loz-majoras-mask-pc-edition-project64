import pygame

import descriptionPane, scrollingList
# from dataManagers import audioMan
# from dataManagers import contentPackages
# contentHandler = contentPackages.mainHandler

# __all__ = ["descriptionPane", "scrollingList"]

# buttonSounds = audioMan.SoundController()

# buttonSounds.soundDict = {
#     "MouseOver": pygame.mixer.Sound("_AUDIO\\UI\\Button2.wav"),
#     "MouseHit": pygame.mixer.Sound("_AUDIO\\UI\\Button1.wav")
#
# }


pygame.font.init()


class ButtonUI(pygame.sprite.Sprite):
    def __init__(self, pos, dimens, offset, color=[0, 0, 0], highlightColor=[125, 255, 125], clickboolCanHighlight=True):
        # global buttonSounds
        super(ButtonUI, self).__init__()

        # self.sounds = buttonSounds
        self.image = pygame.Surface(dimens)
        self.rect = pygame.Rect(pos, dimens)
        self.screenOffset = offset
        self.highlightColor = highlightColor
        self.color = color
        self.clickboolCanHighlight = clickboolCanHighlight
        self.isHighlighted = False
        self.wasHighlighted = False
        self.mLast = [0, 0, 0]
        self.image.fill([0, 0, 0])

    def clickCheck(self, events):
        if self.rect.collidepoint(
                [pygame.mouse.get_pos()[0] - self.screenOffset[0], pygame.mouse.get_pos()[1] - self.screenOffset[1]]):
            if self.mLast[0] == 1 and events["mstate"][0] == 0:
                self.onClicked()
        self.mLast = events["mstate"]

    def clickBool(self, events):
        self.wasHighlighted = self.isHighlighted

        if self.rect.collidepoint(
                [pygame.mouse.get_pos()[0] - self.screenOffset[0], pygame.mouse.get_pos()[1] - self.screenOffset[1]]):
            self.isHighlighted = True
            # self.Draw()
            if self.mLast[0] == 1 and events["mstate"][0] == 0:
                self.mLast = events["mstate"]
                # self.sounds.triggerSound("MouseHit")
                return True
        else:
            self.isHighlighted = False
            # self.Draw()
        self.mLast = events["mstate"]

        # if self.isHighlighted and not self.wasHighlighted:
        #     self.sounds.triggerSound("MouseOver")
        return False

    def onClicked(self):
        pass

    def Draw(self):
        pass


########



class CloseButton(ButtonUI):
    def __init__(self, pos, dimens, offset):
        super(CloseButton, self).__init__(pos, dimens, offset)

    def onClicked(self):
        exit()


class DirectionButton(ButtonUI):
    def __init__(self, pos, dimens, offset, vector):
        super(DirectionButton, self).__init__(pos, dimens, offset)
        self.vector = vector


class LabelButton(ButtonUI):
    def __init__(self, pos, offset, string, size, color=[255, 255, 255], useOutline = False):
        self.pos = pos
        super(LabelButton, self).__init__(pos, [1, 1], offset)
        self.string = string
        self.id = string
        self.color = color
        self.fontRend = pygame.font.Font("LauncherData/_IMAGES/Fonts/Triforce.ttf", size)
        self.image = self.fontRend.render(self.string, True, self.color)
        self.rect = pygame.Rect(pos, self.image.get_size())
        self.useOutline = useOutline

    def makeBlack(self):
        self.image = self.fontRend.render(self.string, True, [0, 0, 0])
        self.rect = pygame.Rect(self.pos, self.image.get_size())

    def makeWhite(self):
        self.image = self.fontRend.render(self.string, True, [255, 255, 255])
        self.rect = pygame.Rect(self.pos, self.image.get_size())

    def setColor(self, color):
        self.image = self.fontRend.render(self.string, True, color)
        self.rect = pygame.Rect(self.pos, self.image.get_size())

    def Draw(self, useColor = None):
        # self.fontRend = pygame.font.Font("_IMAGES\\ComicSans.ttf", size)
        if self.clickboolCanHighlight and self.isHighlighted:
            self.image = self.fontRend.render(self.string, True, self.highlightColor)
            if self.useOutline:
                pygame.draw.rect(self.image, self.highlightColor, pygame.Rect([0, 0], self.image.get_size()), 2)
        else:
            if useColor != None:
                self.image = self.fontRend.render(self.string, True, useColor)
            else:
                self.image = self.fontRend.render(self.string, True, self.color)
            if self.useOutline:
                pygame.draw.rect(self.image, self.color, pygame.Rect([0, 0], self.image.get_size()), 2)

