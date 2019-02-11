var ButtonMap = require("./ButtonMap").ButtonMap;
var ItemIndex = require("./ItemIndex").ItemIndex;
var GlobalMem = require("./GlobalMem").GlobalMem;
var Link = require("./Link").Link;
var Game = require("./Game").Game;

var QuickIteratorRunning = false;

//Quick Item *******************************************************************
var QuickItem = (function () {
    function QuickItem(_item, _controller, _button) {
        this.Item = _item;
        this.button = _button;
        this.controller = _controller;
        
        this.wasPressed = false;
        
        this.iterVal = -1;

    }
    
    // QuickItem.prototype.Init = function (_item, _controller, _button) {
        // this.Item = _item;
        // this.button = _button;
        // this.controller = _controller;
        
        // this.wasPressed = false;
    // }
    QuickItem.prototype.Update = function () {

        
        if (!(this.Item.HasItem())) {
            // console.log("Item", this.Item.id, "not in inventory");
            return;
            
        }
        
        if (system.getinput(this.controller, this.button)) {

            if (this.wasPressed == false) {
                
                if (QuickIteratorRunning == false) {
                    if (this.iterVal < 0) {
                    
                        // console.log("spoof start");
                        this.iterVal = 0; 
                    }
                    
                }
                

                

            }
            
            this.wasPressed = true;

        } else {

            this.wasPressed = false;
            
        }
        
        this.doIterator();
        // console.log(this.wasPressed);

        
    };

    
    QuickItem.prototype.doIterator = function () { 
    
        if (this.iterVal < 0) {
            return;
            
        }
        
        switch (this.iterVal) {
            case 0:
            
                QuickIteratorRunning = true;
                this.last_cdown_item = Link.cdown_button_item;
                Link.cdown_button_item = this.Item.id;
                break;
            
            case 3:
                console.log("spoof press");
                system.pressinput(this.controller, ButtonMap.D_CBUTTON.id, true);
                break;
                
            case 6:
                console.log("spoof release");
                system.pressinput(this.controller, ButtonMap.D_CBUTTON.id, false);
                break;
            
            
            case 9:
                if (Link.cdown_button_item == this.Item.id) {
                    Link.cdown_button_item = this.last_cdown_item;
                }
                break;
            
            
            case 12:
                QuickIteratorRunning = false
                this.iterVal = -1;
                break;
                
            default:
                break;
            
        }
        
        if (this.iterVal >= 0) {
            this.iterVal += 1;
            
        }
        

    };
        
    
    return QuickItem;
})();



// Monitored Control *************************************************************

var MonitoredControlsArray = [];


var MonitoredControl = (function () {
    function MonitoredControl(_controller, _button) {
        this.button = _button;
        this.controller = _controller;
        
        
        this.currentState = false;
        this.wasPressed = false;
        
        this.wasKeyUp = false;
        this.wasKeyDown = false;
        
        MonitoredControlsArray.push(this);        
    }
    
    MonitoredControl.prototype.Update = function () {
        
        this.currentState = system.getinput(this.controller, this.button);
        
        if (this.currentState) {
            
            this.wasKeyUp = false;
            
            if (!this.wasPressed) {
                this.wasKeyDown = true;
            } else {
                this.wasKeyDown = false;
            }
            
        } else {
            
            this.wasKeyDown = false;
            
            if (this.wasPressed) {
                this.wasKeyUp = true;
            } else {
                this.wasKeyUp = false;
            }
            
        }
        // console.log("MC_Update: ", this.currentState);
        this.wasPressed = this.currentState; 
    };
    
    MonitoredControl.prototype.Pressed = function () { 
        return this.currentState;
    }
    
    MonitoredControl.prototype.KeyDown = function () { 
        return this.wasKeyDown;
    }
    
    MonitoredControl.prototype.KeyUp = function () { 
        return this.wasKeyUp;
    }
    
    
    return MonitoredControl;
})();

var MonitoredKey = (function () {
    function MonitoredKey(_key) {
        this.key = _key;

        
        this.currentState = false;
        this.wasPressed = false;
        
        this.wasKeyUp = false;
        this.wasKeyDown = false;
        
        MonitoredControlsArray.push(this);        
    }
    
    MonitoredKey.prototype.Update = function () {
        
        this.currentState = system.getkey(this.key);
        
        if (this.currentState) {
            
            this.wasKeyUp = false;
            
            if (!this.wasPressed) {
                this.wasKeyDown = true;
            } else {
                this.wasKeyDown = false;
            }
            
        } else {
            
            this.wasKeyDown = false;
            
            if (this.wasPressed) {
                this.wasKeyUp = true;
            } else {
                this.wasKeyUp = false;
            }
            
        }
        // console.log("MC_Update: ", this.currentState);
        this.wasPressed = this.currentState; 
    };
    
    MonitoredKey.prototype.Pressed = function () { 
        return this.currentState;
    }
    
    MonitoredKey.prototype.KeyDown = function () { 
        return this.wasKeyDown;
    }
    
    MonitoredKey.prototype.KeyUp = function () { 
        return this.wasKeyUp;
    }
    
    
    return MonitoredKey;
})();

// var AutoMC = [[], [], [], []];

// var Setup_AutoMC = function () { 
    // for (var controller = 0; controller <= 3; controller++) { 
        // for (var button = 0; button <= 13; button++) { 
            // var newControl = new MonitoredControl(controller + 1, button);
            
            // AutoMC[controller][button] = newControl;
        
        // }
        
    // }
    
// };

// var Update_AutoMC = function () { 
    // for (var controller = 0; controller <= 3; controller++) { 
        // for (var button = 1; button <= 13; button++) {             
            // AutoMC[controller][button].Update();
        
        // }
        
    // }
    
// };

// var GetMC = function (_controller, _button) { 
    // return AutoMC[_controller - 1][_button];
    
// };

exports.QuickItem = QuickItem;
exports.QuickIteratorRunning = QuickIteratorRunning;
exports.MonitoredControl = MonitoredControl;
exports.MonitoredKey = MonitoredKey;
exports.MonitoredControlsArray = MonitoredControlsArray;
// exports.Setup_AutoMC = Setup_AutoMC;
// exports.GetMC = GetMC;
// exports.AutoMC = AutoMC;
