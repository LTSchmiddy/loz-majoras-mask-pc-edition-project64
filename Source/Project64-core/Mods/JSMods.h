
#include <Project64/UserInterface/Debugger/debugger.h>
#include <Project64/UserInterface/Debugger/Debugger-Scripts.h>
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

#include <3rdParty/duktape/duktape.h>

#include <Common/Util.h>
#include <float.h>
#include <time.h>
#include "stdafx.h"

#define DEFAULT_MOD_SCRIPT "main.js"

//
//#include "GameMods.h"

extern bool JSMods_IsRunning;

extern CScriptInstance* GM_JSMods_MainScript;

void GM_JSMods_OnStart();
void GM_JSMods_OnUpdate();
void GM_JSMods_OnEnd();