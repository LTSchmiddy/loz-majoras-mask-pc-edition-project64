
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

#include <3rdParty/duktape/duktape.h>

#include <Common/Util.h>
#include <float.h>
#include <time.h>
//

#include "stdafx.h"
#include "GameMods.h"
#include "JSMods.h"

bool JSMods_IsRunning = false;
CScriptInstance* GM_JSMods_MainScript = NULL;

void GM_JSMods_OnStart() {

	GM_JSMods_MainScript = new CScriptInstance(GameMods_DBUI);
	GM_JSMods_MainScript->InDebugUI = false;
	char* pathSaved = (char*)malloc(strlen(DEFAULT_MOD_SCRIPT)); // freed via DeleteStoppedInstances
	strcpy(pathSaved, DEFAULT_MOD_SCRIPT);

	GM_JSMods_MainScript->Start(pathSaved);

	return;
}

void StoppedCheck() {
	if (GM_JSMods_MainScript->GetState() == STATE_STOPPED)
	{
		CScriptInstance* instance = GM_JSMods_MainScript;
		delete instance;
	}
	return;
}


void GM_JSMods_OnUpdate() {
	StoppedCheck();
}

void GM_JSMods_OnEnd() {
	if (GM_JSMods_MainScript == NULL)
	{
		return;
	}

	GM_JSMods_MainScript->ForceStop();

	StoppedCheck();
	
}