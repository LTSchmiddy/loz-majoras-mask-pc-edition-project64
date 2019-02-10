#include "stdafx.h"
#include <Project64-core/AppInit.h>
#include <Project64-core/GameMods.h>
#include "Multilanguage\LanguageSelector.h"
#include "Settings/UISettings.h"

int WINAPI WinMain(HINSTANCE /*hInstance*/, HINSTANCE /*hPrevInstance*/, LPSTR /*lpszArgs*/, int /*nWinMode*/)
{
    try
    {
        CoInitialize(NULL);
        AppInit(&Notify(), CPath(CPath::MODULE_DIRECTORY), __argc, __argv);
        if (!g_Lang->IsLanguageLoaded())
        {
            CLanguageSelector().Select();
        }

        //Create the main window with Menu
        WriteTrace(TraceUserInterface, TraceDebug, "Create Main Window");
        CMainGui MainWindow(true, stdstr_f("Project64 %s", VER_FILE_VERSION_STR).c_str()), HiddenWindow(false);
        CMainMenu MainMenu(&MainWindow);
        CDebuggerUI Debugger;
        g_Debugger = &Debugger;
		// Added By Alex
		GameMods_DBUI = &Debugger;

		GameMods_MainWindow = &MainWindow;
		//GameMods_MainMenu = &MainMenu;

        g_Plugins->SetRenderWindows(&MainWindow, &HiddenWindow);
        Notify().SetMainWindow(&MainWindow);
        CSupportWindow SupportWindow;


		//Added by Alex:

		bool LoadRomNow = true;
		int ShowSettingsChoice = 0;
		string romPath = g_Settings->LoadStringVal(Cmd_RomFile);

		if (romPath.length() <= 0) {
			romPath = DEFAULT_ROM_PATH_ARG;
		}
		//else if (romPath.compare(SHOW_GUI_ARG) == 0) {
		else if (romPath.compare(SHOW_GUI_ARG) == 0) {
			LoadRomNow = false;

		}
		else if (romPath.compare(NO_MAIN_JS_ARG) == 0) {
			LoadRomNow = false;
			GameMods_UseJSMods = false;
		}
		else if (romPath.compare(SHOW_EMUSETTINGS_ARG) == 0) {
			LoadRomNow = false;
			ShowSettingsChoice = 1;
			GameMods_UseJSMods = false;
		}
		else if (romPath.compare(SHOW_GFXSETTINGS_ARG) == 0) {
			LoadRomNow = false;
			ShowSettingsChoice = 2;
			GameMods_UseJSMods = false;
		}
		else if (romPath.compare(SHOW_AUDIOSETTINGS_ARG) == 0) {
			LoadRomNow = false;
			ShowSettingsChoice = 3;
			GameMods_UseJSMods = false;
		}
		else if (romPath.compare(SHOW_CONTROLSETTINGS_ARG) == 0) {
			LoadRomNow = false;
			ShowSettingsChoice = 4;
			GameMods_UseJSMods = false;
		}


        if (LoadRomNow)
        //if (romPath.length() > 0)
        {
            MainWindow.Show(true);	//Show the main window
            //N64 ROM or 64DD Disk
            stdstr ext = CPath(romPath).GetExtension();
            if (!(_stricmp(ext.c_str(), "ndd") == 0))
            {
                //File Extension is not *.ndd so it should be a N64 ROM
                CN64System::RunFileImage(romPath.c_str());
            }
            else
            {

                //Ext is *.ndd, so it should be a disk file.
                if (CN64System::RunDiskImage(g_Settings->LoadStringVal(Cmd_RomFile).c_str()))
                {
                    stdstr IPLROM = g_Settings->LoadStringVal(File_DiskIPLPath);
                    if ((IPLROM.length() <= 0) || (!CN64System::RunFileImage(IPLROM.c_str())))
                    {
                        CPath FileName;
                        const char * Filter = "64DD IPL ROM Image (*.zip, *.7z, *.?64, *.rom, *.usa, *.jap, *.pal, *.bin)\0*.?64;*.zip;*.7z;*.bin;*.rom;*.usa;*.jap;*.pal\0All files (*.*)\0*.*\0";
                        if (FileName.SelectFile(NULL, g_Settings->LoadStringVal(RomList_GameDir).c_str(), Filter, true))
                        {
                            CN64System::RunFileImage(FileName);
                        }
                    }
                }
            }
        }
        else
        {
            //SupportWindow.Show(reinterpret_cast<HWND>(MainWindow.GetWindowHandle()));
            if (UISettingsLoadBool(RomBrowser_Enabled) && ShowSettingsChoice == 0)
            {
                WriteTrace(TraceUserInterface, TraceDebug, "Show Rom Browser");
                //Display the rom browser
                MainWindow.ShowRomList();
                MainWindow.Show(true);	//Show the main window
                MainWindow.HighLightLastRom();
            }
            else
            {
                WriteTrace(TraceUserInterface, TraceDebug, "Show Main Window");
				if (ShowSettingsChoice == 0) {
					MainWindow.Show(true);	//Show the main window
				}

            }
        }
		//MainWindow.BringToTop();
		//MainWindow.MakeWindowOnTop(true);

		if (ShowSettingsChoice == 1) {
			MainMenu.OnSettings((HWND)MainWindow.GetWindowHandle());
		}
		else if (ShowSettingsChoice == 2) {

			g_Plugins->ConfigPlugin((HWND)MainWindow.GetWindowHandle(), PLUGIN_TYPE_GFX);
		}
		else if (ShowSettingsChoice == 3) {

			g_Plugins->ConfigPlugin((HWND)MainWindow.GetWindowHandle(), PLUGIN_TYPE_AUDIO);
		}
		else if (ShowSettingsChoice == 4) {

			g_Plugins->ConfigPlugin((HWND)MainWindow.GetWindowHandle(), PLUGIN_TYPE_CONTROLLER);
		}

		//ShowSettingsChoice = 0;
		
		else {
			//Process Messages till program is closed
			WriteTrace(TraceUserInterface, TraceDebug, "Entering Message Loop");
			MainWindow.ProcessAllMessages();
			WriteTrace(TraceUserInterface, TraceDebug, "Message Loop Finished");
		}

        if (g_BaseSystem)
        {
            g_BaseSystem->CloseCpu();
            delete g_BaseSystem;
            g_BaseSystem = NULL;
        }
        WriteTrace(TraceUserInterface, TraceDebug, "System Closed");
    }
    catch (...)
    {
        WriteTrace(TraceUserInterface, TraceError, "Exception caught (File: \"%s\" Line: %d)", __FILE__, __LINE__);
        MessageBox(NULL, stdstr_f("Exception caught\nFile: %s\nLine: %d", __FILE__, __LINE__).c_str(), "Exception", MB_OK);
    }
    AppCleanup();
    CoUninitialize();
    return true;
}