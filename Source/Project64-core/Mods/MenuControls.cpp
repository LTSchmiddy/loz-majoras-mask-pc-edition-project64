#include <Project64/UserInterface/Debugger/debugger.h>
#include <Project64/UserInterface/Debugger/Debugger-Scripts.h>
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

#include "stdafx.h"
#include "GameMods.h"
#include "MenuControls.h"


bool GameMods_KbdKeys[0xff];

void GameMods_SetKeyInput(uint32_t key, bool pressed) {
	GameMods_KbdKeys[key] = pressed;
}

bool GameMods_GetKeyInput(uint32_t key) {
	return GameMods_KbdKeys[key];
}