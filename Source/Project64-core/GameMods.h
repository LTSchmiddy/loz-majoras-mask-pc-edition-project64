
#include <Project64-core/N64System/N64Class.h>
#include <Project64-core/3rdParty/zip.h>
#include <Project64-core/N64System/Recompiler/RecompilerCodeLog.h>
#include <Project64-core/N64System/SystemGlobals.h>
#include <Project64-core/N64System/Mips/Mempak.h>
#include <Project64-core/N64System/Mips/Transferpak.h>
#include <Project64-core/N64System/Interpreter/InterpreterCPU.h>
#include <Project64-core/N64System/Mips/OpcodeName.h>
#include <Project64-core/N64System/N64DiskClass.h>
#include <Project64-core/ExceptionHandler.h>
#include <Project64-core/Logging.h>
#include <Project64-core/Debugger.h>
#include <Common/Util.h>
#include <float.h>
#include <time.h>
#include <Project64/UserInterface/Debugger/debugger.h>
#include <Project64/UserInterface/Debugger/Debugger-Scripts.h>
//

#include "stdafx.h"
//#include "Mods\JSMods.h"

	// get status
#define GM_RD_GETSTATUS		0x00
	// read button values
#define GM_RD_READKEYS			0x01
	// read from controllerpak
#define GM_RD_READPAK			0x02
	// write to controllerpack
#define GM_RD_WRITEPAK			0x03
	// reset controller
#define GM_RD_RESETCONTROLLER	0xff
	// read eeprom
#define GM_RD_READEEPROM		0x04
	// write eeprom
#define GM_RD_WRITEEPROM		0x05


extern bool GameMods_UseJSMods;
extern CDebuggerUI * GameMods_DBUI;

//extern CRecompiler * GameMods_Recomp;

extern CMainGui * GameMods_MainWindow;
extern CMainMenu * GameMods_MainMenu;

extern CCheats * GameMods_Cheats;
extern uint32_t GameMods_Controller1;
extern uint32_t GameMods_Controller2;
extern uint32_t GameMods_Controller3;
extern uint32_t GameMods_Controller4;


// Methods:

void setHealth(uint16_t val);

bool GameMods_CheckInputButton(int inputNum, int pos);
void GameMods_PressInputButton(int inputNum, int pos, bool pressed);
uint32_t GameMods_CheckInput(int inputNum);

void GameMods_PressJoy1X(int pos);

void GameMods_PressJoy1Y(int pos);


void GameMods_OnStart();
//void GameMods_OnStart(CCheats& CheatModule, uint32_t& Ctrl1, uint32_t& Ctrl2, uint32_t& Ctrl3, uint32_t& Ctrl4);

void GameMods_OnReset();

uint32_t GameMods_DoInputSpoofing(int Control);
void GameMods_DoReadController(int32_t Control, uint8_t * Command);

//void GameMods_MainLoop();
//void GameMods_MainLoop(CCheats& CheatModule);
void GameMods_MainLoop(CCheats& CheatModule, uint32_t Ctrl1, uint32_t Ctrl2, uint32_t Ctrl3, uint32_t Ctrl4);
//void GameMods_MainLoop(CCheats& CheatModule, uint32_t MyButtons[4]);

void GameMods_CallFunction(uint32_t funcAddr);

void GameMods_OnEnd();