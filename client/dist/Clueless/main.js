(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#gameboard-container {\n  position: relative;\n  top: 30px;\n  text-align: center;\n}\n\n#gameboard {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 75%;\n}\n\n#toast-button {\n  margin-top: 50px;\n}\n\n.game-title {\n  margin-top: 10px;\n  display: block;\n  text-align: center;\n}\n\n.room-id {\n  margin: 6px 4px 0px 0px;\n}\n\n.uppper-left-room-id {\n  margin: 6px 4px 5px 5px;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"showRoomId\" class=\"uppper-left-room-id\">Room ID: {{ roomId }}</div>\n<div class=\"container\">\n  <div class=\"row game-title\">\n    <h1>\n      {{ title }}\n    </h1>\n  </div>\n  \n  <div *ngIf=\"!isConnectedToGame\">\n    <app-landing-page></app-landing-page>\n  </div>\n  \n  <div *ngIf=\"isConnectedToGame\">\n    <app-game></app-game>\n  </div>\n</div>\n\n<ng-template #choosePlayerModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">Welcome to Clue-Less!</h4>\n    <span class=\"room-id\">Room ID: {{ roomId }}</span>\n  </div>\n  <div class=\"modal-body\">\n    <form>\n      <label>Please select a player:</label>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"colonelMustard\" name=\"character\" value=\"Colonel Mustard\">\n            Colonel Mustard\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"missScarlet\" name=\"character\" value=\"Miss Scarlet\">\n            Miss Scarlet\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"mrGreen\" name=\"character\" value=\"Mr. Green\">\n              Mr. Green\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"mrsPeacock\" name=\"character\" value=\"Mrs. Peacock\">\n            Mrs. Peacock\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"mrWhite\" name=\"character\" value=\"Mr. White\">\n            Mr. White\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"professorPlum\" name=\"character\" value=\"Professor Plum\">\n            Professor Plum\n          </label>\n        </div>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"handleCharacterSelected()\">Play!</button>\n  </div>\n</ng-template>\n\n\n<button id=\"select-character-modal\" hidden (click)=\"openModal(choosePlayerModal)\"></button>\n  \n  "

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(modalService, socketService) {
        this.modalService = modalService;
        this.socketService = socketService;
        this.title = 'Clue-Less';
        this.nameToIdMapping = {
            'Colonel Mustard': 'colonelMustard',
            'Miss Scarlet': 'missScarlet',
            'Mr. Green': 'mrGreen',
            'Mrs. Peacock': 'mrsPeacock',
            'Mr. White': 'mrWhite',
            'Professor Plum': 'professorPlum'
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isConnectedToGame = false;
        this.showRoomId = false;
        // when a new game is created
        this.socketService.onNewGameCreated().subscribe(function (msg) {
            console.log('onNewGameCreated received from server.');
            _this.name = msg.name;
            _this.roomId = msg.roomId;
            _this.showRoomId = true;
            // console.log(`name: ${this.name}`);
            // console.log(`roomId: ${this.roomId}`);
            _this.showSelectCharacterModal();
        });
        // when a new game is joined
        this.socketService.onGameJoined().subscribe(function (msg) {
            console.log('onGameJoined received from from server.');
            _this.name = msg.name;
            _this.roomId = msg.roomId;
            var canJoin = msg.canJoin;
            var takenPieces = msg.takenPieces;
            _this.showRoomId = true;
            if (!canJoin) {
                alert('Unable to join game');
            }
            else {
                _this.showSelectCharacterModal(takenPieces);
            }
            // console.log(`name: ${this.name}`);
            // console.log(`roomId: ${this.roomId}`);
        });
    };
    AppComponent.prototype.showSelectCharacterModal = function (takenPieces) {
        if (takenPieces === void 0) { takenPieces = undefined; }
        if (takenPieces == undefined) {
            document.getElementById('select-character-modal').click();
        }
        else {
            document.getElementById('select-character-modal').click();
            for (var _i = 0, takenPieces_1 = takenPieces; _i < takenPieces_1.length; _i++) {
                var piece = takenPieces_1[_i];
                var id = this.nameToIdMapping[piece];
                if (id == undefined) {
                    continue;
                }
                var elm = document.getElementById(id);
                if (elm != undefined) {
                    elm.disabled = true;
                }
            }
        }
        this.isConnectedToGame = true;
    };
    AppComponent.prototype.openModal = function (content) {
        this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false });
    };
    AppComponent.prototype.handleCharacterSelected = function () {
        var colonlel = document.getElementById('colonelMustard');
        var missScarlet = document.getElementById('missScarlet');
        var mrGreen = document.getElementById('mrGreen');
        var mrsPeacock = document.getElementById('mrsPeacock');
        var mrWhite = document.getElementById('mrWhite');
        var professorPlum = document.getElementById('professorPlum');
        var selectedCharacter;
        if (colonlel.checked) {
            selectedCharacter = 'Colonel Mustard';
        }
        else if (missScarlet.checked) {
            selectedCharacter = 'Miss Scarlet';
        }
        else if (mrGreen.checked) {
            selectedCharacter = 'Mr. Green';
        }
        else if (mrsPeacock.checked) {
            selectedCharacter = 'Mrs. Peacock';
        }
        else if (mrWhite.checked) {
            selectedCharacter = 'Mr. White';
        }
        else if (professorPlum.checked) {
            selectedCharacter = 'Professor Plum';
        }
        // console.log('Player selected: ' + selectedCharacter);
        if (selectedCharacter != undefined) {
            this.socketService.choosePlayer(this.roomId, this.name, selectedCharacter);
            // if an elemnent is selected dismiss modal
            this.modalService.dismissAll();
        }
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"],
            _socket_service__WEBPACK_IMPORTED_MODULE_0__["SocketService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./landing-page/landing-page.component */ "./src/app/landing-page/landing-page.component.ts");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./game/game.component */ "./src/app/game/game.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _landing_page_landing_page_component__WEBPACK_IMPORTED_MODULE_7__["LandingPageComponent"],
                _game_game_component__WEBPACK_IMPORTED_MODULE_8__["GameComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_1__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"].forRoot(),
                ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrModule"].forRoot(),
            ],
            providers: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbActiveModal"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/game/game.component.css":
/*!*****************************************!*\
  !*** ./src/app/game/game.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#gameboard {\n    margin: 25px auto;\n    /* width: 50%; */\n}\n\n.close {\n    outline: none;\n}"

/***/ }),

/***/ "./src/app/game/game.component.html":
/*!******************************************!*\
  !*** ./src/app/game/game.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"gameboard-container\" class=\"container\">\n  <div class=\"row\">\n    <img id=\"gameboard\" src=\"../../assets/gameboard.jpg\" />\n  </div>\n  <div class=\"row\">\n    <button id=\"toast-button\" class=\"btn btn-primary\" (click)=\"showToaster()\">\n      Show Toast\n    </button>\n\n    <button id=\"suggest-player-modal\" class=\"btn btn-primary\" (click)=\"openModal(suggestionModal)\">Make a suggestion</button>\n  </div>\n</div>\n\n<ng-template #suggestionModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">Make a suggestion</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <form>\n      <label>Suggest a player:</label>\n      <div class=\"form-group\">\n        <label>\n          <input type=\"radio\" id=\"colonelMustard\" name=\"character\" value=\"Colonel Mustard\">\n          Colonel Mustard\n        </label>\n      </div>\n      <div class=\"form-group\">\n        <label>\n          <input type=\"radio\" id=\"missScarlet\" name=\"character\" value=\"Miss Scarlet\">\n          Miss Scarlet\n        </label>\n      </div>\n      <div class=\"form-group\">\n        <label>\n          <input type=\"radio\" id=\"mrGreen\" name=\"character\" value=\"Mr. Green\">\n          Mr. Green\n        </label>\n      </div>\n      <div class=\"form-group\">\n        <label>\n          <input type=\"radio\" id=\"mrsPeacock\" name=\"character\" value=\"Mrs. Peacock\">\n          Mrs. Peacock\n        </label>\n      </div>\n      <div class=\"form-group\">\n        <label>\n          <input type=\"radio\" id=\"mrWhite\" name=\"character\" value=\"Mr. White\">\n          Mr. White\n        </label>\n      </div>\n      <div class=\"form-group\">\n        <label>\n          <input type=\"radio\" id=\"professorPlum\" name=\"character\" value=\"Professor Plum\">\n          Professor Plum\n        </label>\n      </div>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"handleSuggestion()\">Suggest!</button>\n  </div>\n</ng-template>\n\n"

/***/ }),

/***/ "./src/app/game/game.component.ts":
/*!****************************************!*\
  !*** ./src/app/game/game.component.ts ***!
  \****************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket.service */ "./src/app/socket.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GameComponent = /** @class */ (function () {
    // Dependency injection syntax
    function GameComponent(modalService, socketService, toastr) {
        this.modalService = modalService;
        this.socketService = socketService;
        this.toastr = toastr;
    }
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketService.onNewGameCreated().subscribe(function (msg) {
            console.log('newGame received from game component.');
            // const name = msg.name;
            // const roomId = msg.roomId;
            // console.log(`name: ${name}`);
            // console.log(`roomId: ${roomId}`);
            _this.toastr.success("A new game was created: " + msg.roomId);
        });
        this.socketService.onPlayerSelected().subscribe(function (msg) {
            console.log('onPlayerSelected received from game component.');
            var player = msg.player;
            var socketId = player.socketId;
            var name = player.name;
            var piece = player.piece;
            console.log("socketId: " + socketId);
            console.log("name: " + name);
            console.log("piece: " + piece);
            _this.toastr.success(name + " is playing as " + piece);
        });
    };
    GameComponent.prototype.showToaster = function () {
        console.log('show toast');
        this.toastr.success('Hello, I\'m the toastr message.');
    };
    /**
     * A method to handle suggestions from the suggestion modal
     */
    GameComponent.prototype.handleSuggestion = function () {
    };
    GameComponent.prototype.openModal = function (content) {
        this.modalService.open(content, {
            size: 'lg',
        });
    };
    GameComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(/*! ./game.component.html */ "./src/app/game/game.component.html"),
            styles: [__webpack_require__(/*! ./game.component.css */ "./src/app/game/game.component.css")]
        }),
        __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModal"],
            _socket_service__WEBPACK_IMPORTED_MODULE_2__["SocketService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]])
    ], GameComponent);
    return GameComponent;
}());



/***/ }),

/***/ "./src/app/landing-page/landing-page.component.css":
/*!*********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-menu {\n  width: 60%;\n  margin: 27px auto;\n}\n\n.error {\n  color: red;\n}\n\n.form-title {\n  text-align: center;\n}\n\n.how-to-play-header {\n  text-align: center;\n}\n\nselect:required:invalid {\n  color: gray;\n}\n\noption[value=\"\"][disabled] {\n  display: none;\n}\n\noption {\n  color: black;\n}\n\np {\n  margin-bottom: 8px;\n}\n"

/***/ }),

/***/ "./src/app/landing-page/landing-page.component.html":
/*!**********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"menu\">\n    <div class=\"header-menu\">\n      <h3 class=\"how-to-play-header\">How To Play</h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col col-6 offset-3\">\n        <h4 class=\"form-title\">Create a new game</h4>\n        <div>\n          <p>1. Enter a username and select the number of players</p>\n          <p>2. Click on new game.</p>\n        </div>\n        <form>\n          <div class=\"form-group row\">\n            <input [(ngModel)]=\"creatorPlayerName\" class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"Enter your name\"\n              required>\n          </div>\n          <div class=\"form-group row\">\n            <!-- <input [(ngModel)]=\"numberOfPlayers\" class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"Enter the number of players\"\n              required> -->\n              <select [(ngModel)]=\"numberOfPlayers\" name=\"numberOfPlayers\" class=\"form-control\">\n                  <option disabled selected>Select the number of players</option>\n                  <option value=\"3\">3</option>\n                  <option value=\"4\">4</option>\n                  <option value=\"5\">5</option>\n                  <option value=\"6\">6</option>\n              </select>\n\n          </div>\n          <div class=\"form-group row\">\n            <button class=\"btn btn-primary\" type=\"button\" (click)=\"createGame()\">New Game</button>\n          </div>\n        </form>\n        <div class=\"row error\" *ngIf=\"createGameError\">\n          <p>{{ createGameErrorMessage }}</p>\n        </div>\n      </div>\n    </div>\n    <br />\n    <div class=\"row\">\n      <div class=\"col col-6 offset-3\">\n        <h4 class=\"form-title\">Join an existing game</h4>\n        <div>\n          <p>1. Enter a username and the room id.</p>\n          <p>2. Click on join game.</p>\n        </div>\n        <form>\n          <div class=\"form-group row\">\n            <input [(ngModel)]=\"joiningPlayerName\" class=\"form-control\" type=\"text\" name=\"name\" id=\"nameJoin\"\n              placeholder=\"Enter your name\" required>\n          </div>\n          <div class=\"form-group row\">\n            <input [(ngModel)]=\"roomId\" class=\"form-control\" type=\"text\" name=\"room\" id=\"room\" placeholder=\"Enter Game ID\"\n              required>\n          </div>\n          <div class=\"form-group row\">\n            <button id=\"join\" class=\"btn btn-primary\" type=\"button\" (click)=\"joinGame()\">Join Game</button>\n          </div>\n        </form>\n        <div class=\"row error\" *ngIf=\"joinGameError\">\n          <p>{{ joinGameErrorMessage }}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/landing-page/landing-page.component.ts":
/*!********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.ts ***!
  \********************************************************/
/*! exports provided: LandingPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LandingPageComponent", function() { return LandingPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _socket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../socket.service */ "./src/app/socket.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LandingPageComponent = /** @class */ (function () {
    // Dependency injection syntax
    function LandingPageComponent(socketService) {
        this.socketService = socketService;
        // @Output() landingPageStatusChange = new EventEmitter();
        this.creatorPlayerName = '';
        this.createGameError = false;
        this.createGameErrorMessage = '';
        this.joiningPlayerName = '';
        this.roomId = '';
        this.joinGameError = false;
        this.joinGameErrorMessage = '';
    }
    LandingPageComponent.prototype.ngOnInit = function () {
    };
    LandingPageComponent.prototype.createGame = function () {
        if (this.creatorPlayerName === '') {
            this.createGameErrorMessage = 'Please enter your name.';
            this.createGameError = true;
            return;
        }
        if (this.numberOfPlayers === undefined) {
            this.createGameErrorMessage = 'Please enter the number of players name.';
            this.createGameError = true;
            return;
        }
        this.createGameError = false;
        this.socketService.createGame(this.creatorPlayerName, this.numberOfPlayers);
    };
    LandingPageComponent.prototype.joinGame = function () {
        if (this.joiningPlayerName === '') {
            this.joinGameErrorMessage = 'Please enter your name.';
            this.joinGameError = true;
            return;
        }
        if (this.roomId === '') {
            this.joinGameErrorMessage = 'Please enter the room id.';
            this.joinGameError = true;
            return;
        }
        this.joinGameError = false;
        this.socketService.joinGame(this.joiningPlayerName, this.roomId);
        // const event = new JoinGame(this.joiningPlayerName, this.roomId);
        // this.landingPageStatusChange.emit(event);
    };
    LandingPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-landing-page',
            template: __webpack_require__(/*! ./landing-page.component.html */ "./src/app/landing-page/landing-page.component.html"),
            styles: [__webpack_require__(/*! ./landing-page.component.css */ "./src/app/landing-page/landing-page.component.css")]
        }),
        __metadata("design:paramtypes", [_socket_service__WEBPACK_IMPORTED_MODULE_1__["SocketService"]])
    ], LandingPageComponent);
    return LandingPageComponent;
}());



/***/ }),

/***/ "./src/app/socket.service.ts":
/*!***********************************!*\
  !*** ./src/app/socket.service.ts ***!
  \***********************************/
/*! exports provided: SocketService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketService", function() { return SocketService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Singleton service
 */
var SocketService = /** @class */ (function () {
    function SocketService() {
        this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_1__["connect"]();
        this.init();
    }
    /**
     * Socket events from server.
     */
    SocketService.prototype.init = function () {
        console.log('initializing sockets');
        this.socket.on('connect', function (msg) {
            console.log('socket connected to server');
        });
    };
    SocketService.prototype.onNewGameCreated = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('new-game-created', function (msg) {
                // console.log('new game created...');
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onGameJoined = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('player-joined-game', function (msg) {
                // console.log('new game created...');
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onPlayerSelected = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('player-selected', function (msg) {
                // console.log('player selected...');
                observer.next(msg);
            });
        });
    };
    /**
     * Socket events to server.
     */
    SocketService.prototype.choosePlayer = function (roomId, name, player) {
        var message = {
            roomId: roomId,
            name: name,
            piece: player
        };
        this.socket.emit('select-player', message);
    };
    SocketService.prototype.createGame = function (name, numPlayers) {
        var message = {
            name: name,
            numPlayers: numPlayers
        };
        this.socket.emit('create-game', message);
    };
    SocketService.prototype.joinGame = function (name, roomId) {
        var message = {
            name: name,
            roomId: roomId
        };
        this.socket.emit('player-join-game', message);
    };
    SocketService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], SocketService);
    return SocketService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/jordanbeth/Desktop/JHU/605/601 Foundations of Software Engineering/Group Project/Clueless/client/src/main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map