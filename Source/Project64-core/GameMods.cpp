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
#include <Project64/UserInterface/Debugger/debugger.h>
#include <Project64/UserInterface/Debugger/Debugger-Scripts.h>
#include <Common/Util.h>
#include <float.h>
#include <time.h>

#include "stdafx.h"
#include "GameMods.h"
#include "Mods\JSMods.h"
#include "Mods\MenuControls.h"


// Global Variables:


bool GameMods_UseJSMods = true;
CDebuggerUI * GameMods_DBUI = NULL;

CMainGui * GameMods_MainWindow = NULL;
CMainMenu * GameMods_MainMenu = NULL;

CCheats * GameMods_Cheats;
uint32_t GameMods_Controller1;
uint32_t GameMods_Controller2;
uint32_t GameMods_Controller3;
uint32_t GameMods_Controller4;

uint32_t GameMods_Controller1Spoof;
uint32_t GameMods_Controller2Spoof;
uint32_t GameMods_Controller3Spoof;
uint32_t GameMods_Controller4Spoof;

// Private Variables:
const int DefaultInitCountdown = 10;
int InitCountdown = 10;


bool StartSpammer = true;
bool readyToSpoof = false;

int XSpoof1 = 0;
int YSpoof1 = 0;

//Misc Functions:

bool checkBit(uint8_t val, int pos) {
	return 0x00000000 != (val & (0x01 << pos));
}

void setHealth(uint16_t val) {
	if (GameMods_Cheats) {
		GameMods_Cheats->ModifyMemory16(0x801EF6A6, val);

	}
}

bool GameMods_CheckInputButton(int inputNum, int pos) {

	uint32_t val = 0;
	
	if (inputNum == 0) {
		val = GameMods_Controller1;
	} else if (inputNum == 1) {
		val = GameMods_Controller2;
	} else if (inputNum == 2) {
		val = GameMods_Controller3;
	} else if (inputNum == 3) {
		val = GameMods_Controller4;
	} 

	return 0x00000000000000000000000000000000 != (val & (0x01 << pos));
}

bool GameMods_CheckInputSpoof(int inputNum, int pos) {

	uint32_t val = 0;

	if (inputNum == 0) {
		val = GameMods_Controller1Spoof;
	}
	else if (inputNum == 1) {
		val = GameMods_Controller2Spoof;
	}
	else if (inputNum == 2) {
		val = GameMods_Controller3Spoof;
	}
	else if (inputNum == 3) {
		val = GameMods_Controller4Spoof;
	}

	return 0x00000000000000000000000000000000 != (val & (0x01 << pos));
}

void GameMods_PressInputButton(int inputNum, int pos, bool pressed) {

	//setHealth(0x30);

	uint32_t val = 0;

	if (inputNum == 0) {
		val = GameMods_Controller1Spoof;
	}
	else if (inputNum == 1) {
		val = GameMods_Controller2Spoof;
	}
	else if (inputNum == 2) {
		val = GameMods_Controller3Spoof;
	}
	else if (inputNum == 3) {
		val = GameMods_Controller4Spoof;
	}

	if (pressed) {
		if (!GameMods_CheckInputSpoof(inputNum, pos)) {
			val = val | (0x01 << pos);
		}

	}
	else {
		if (GameMods_CheckInputSpoof(inputNum, pos)) {
			val = val - (0x01 << pos);
		}
	}



	if (inputNum == 0) {
		GameMods_Controller1Spoof = val;
	}
	else if (inputNum == 1) {
		GameMods_Controller2Spoof = val;
	}
	else if (inputNum == 2) {
		GameMods_Controller3Spoof = val;
	}
	else if (inputNum == 3) {
		GameMods_Controller4Spoof = val;
	}
}

void GameMods_PressJoy1X(int pos) { 
	XSpoof1 = pos;
}

void GameMods_PressJoy1Y(int pos) {
	YSpoof1 = pos;
}

uint32_t GameMods_CheckInput(int inputNum) {

	uint32_t val = 0;

	//if (inputNum == 0) {
	//	val = GameMods_Controller1;
	//}
	//else if (inputNum == 1) {
	//	val = GameMods_Controller2;
	//}
	//else if (inputNum == 2) {
	//	val = GameMods_Controller3;
	//}
	//else if (inputNum == 3) {
	//	val = GameMods_Controller4;
	//}

	if (inputNum == 0) {
		val = GameMods_Controller1Spoof;
	}
	else if (inputNum == 1) {
		val = GameMods_Controller2Spoof;
	}
	else if (inputNum == 2) {
		val = GameMods_Controller3Spoof;
	}
	else if (inputNum == 3) {
		val = GameMods_Controller4Spoof;
	}

	return val;
}


// Exec Functions
void GameMods_OnStart() {
	InitCountdown = DefaultInitCountdown;


}
//void GameMods_OnStart(CCheats& CheatModule, uint32_t& Ctrl1, uint32_t& Ctrl2, uint32_t& Ctrl3, uint32_t& Ctrl4) {
//	InitCountdown = DefaultInitCountdown;
//
//
//
//}

void GameMods_OnReset() {

	if (GameMods_UseJSMods) {
		GM_JSMods_OnEnd();
	}

	InitCountdown = DefaultInitCountdown;
	readyToSpoof = false;
}

void DoInit() {
	if (GameMods_UseJSMods) {
		GM_JSMods_OnStart();
	}

	readyToSpoof = true;
	//GameMods_MainWindow->SetWindowMenu(NULL);
	//GameMods_MainWindow->ShowStatusBar(false);
}

uint32_t GameMods_DoInputSpoofing(int Control) {
	uint32_t spoof = g_BaseSystem->GetButtons(Control);


	uint32_t val = 0;

	if (Control == 0) {
		val = GameMods_Controller1Spoof;
	}
	else if (Control == 1) {
		val = GameMods_Controller2Spoof;
	}
	else if (Control == 2) {
		val = GameMods_Controller3Spoof;
	}
	else if (Control == 3) {
		val = GameMods_Controller4Spoof;
	}

	return val | spoof;

}

uint32_t GameMods_DoRCInputSpoofing(int Control, uint8_t * Command) {

	if (!Command) { return 0; }
	if (Command == NULL) { return 0; }
	//if (!readyToSpoof) { return 0; }

	uint32_t spoof = 0;
	memcpy(&spoof, &Command[3], sizeof(uint32_t));
	

	uint32_t val = 0;

	if (Control == 0) {
		val = GameMods_Controller1Spoof;
	}
	else if (Control == 1) {
		val = GameMods_Controller2Spoof;
	}
	else if (Control == 2) {
		val = GameMods_Controller3Spoof;
	}
	else if (Control == 3) {
		val = GameMods_Controller4Spoof;
	}

	return val | spoof;

}


void GameMods_DoReadController(int32_t Control, uint8_t * Command) {
	g_Plugins->Control()->ReadController(Control, Command);
	
	if (!Command) { return; }
	if (Command == NULL) { return; }
	//if (!readyToSpoof) { return; }


	if (Command[2] == GM_RD_READKEYS) {


		//if (Control == 0) {
		//	memcpy(&GameMods_Controller1, &Command[3], sizeof(uint32_t));
		//}
		//else if (Control == 1) {
		//	memcpy(&GameMods_Controller2, &Command[3], sizeof(uint32_t));
		//}
		//else if (Control == 2) {
		//	memcpy(&GameMods_Controller3, &Command[3], sizeof(uint32_t));
		//}
		//else if (Control == 3) {
		//	memcpy(&GameMods_Controller4, &Command[3], sizeof(uint32_t));
		//}
		
		const uint32_t buttons = GameMods_DoRCInputSpoofing(Control, Command);

		memcpy(&Command[3], &buttons, sizeof(uint32_t));

		if (XSpoof1 > 0) {
			Command[5] = 0x7f;
		}
		else if (XSpoof1 < 0) {
			Command[5] = 0x81;
		}

		if (YSpoof1 > 0) {
			Command[6] = 0x7f;
		}
		else if (YSpoof1 < 0) {
			Command[6] = 0x81;
		}


	}
	else {
		//if (GameMods_Cheats) {
		//	GameMods_Cheats->ModifyMemory16(0x801EF6A6, 0x09);
		//}
	}




}

//void GameMods_MainLoop(CCheats& CheatModule) {
void GameMods_MainLoop(CCheats& CheatModule, uint32_t Ctrl1, uint32_t Ctrl2, uint32_t Ctrl3, uint32_t Ctrl4) {
//void GameMods_MainLoop() {
	if (InitCountdown > 0) {
		InitCountdown -= 1;

		if (InitCountdown == 0) {
			GameMods_Cheats = &CheatModule;
			if (GameMods_UseJSMods) {
				//try {
					DoInit();



				//}
				//catch (...) {
					//InitCountdown = DefaultInitCountdown;
				//}


			}

		}
		return;
	}
	GameMods_Controller1 = Ctrl1;
	GameMods_Controller2 = Ctrl2;
	GameMods_Controller3 = Ctrl3;
	GameMods_Controller4 = Ctrl4;




	if (GameMods_UseJSMods) {
		GM_JSMods_OnUpdate();
	}
	
}


void GameMods_OnEnd() {
	//GameMods_MainWindow->SetWindowMenu(GameMods_MainMenu);
	//GameMods_MainWindow->ShowStatusBar(true);
	if (GameMods_UseJSMods) {
		GM_JSMods_OnEnd();
	}

}
