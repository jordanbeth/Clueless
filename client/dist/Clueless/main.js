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

module.exports = "#gameboard-container {\n  position: relative;\n  top: 30px;\n  text-align: center;\n}\n\n#gameboard {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 75%;\n}\n\n#toast-button {\n  margin-top: 50px;\n}\n\n.game-title {\n  /* margin-top: 10px; */\n  /* display: block;\n  text-align: center; */\n  position: absolute;\n  top: 10px;\n  top: 27px;\n  margin: auto;\n  left: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.room-id {\n  font-weight: bold;\n}\n\n.upper-left-room-id {\n  margin: 6px 4px 5px 5px;\n  font-weight: bold;\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"showRoomId\" class=\"upper-left-room-id\">\n  Room ID: {{ roomId }} \n  <br/>\n  My Player: {{ myPlayerPiece }} \n  <br/>\n  Number of Players: {{ numPlayers }}\n</div>\n<div>\n  <!-- <div class=\"row game-title\">\n    <h2>\n      {{ title }}\n    </h2>\n  </div> -->\n  \n  <div *ngIf=\"!isConnectedToGame\">\n    <app-landing-page></app-landing-page>\n  </div>\n  \n  <div *ngIf=\"isConnectedToGame\">\n    <app-game></app-game>\n  </div>\n</div>\n\n<ng-template #choosePlayerModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">Welcome to Clue-Less!</h4>\n    <span class=\"room-id\">Room ID: {{ roomId }}</span>\n  </div>\n  <div class=\"modal-body\">\n    <form>\n      <label>Please select a player:</label>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"colonelMustard\" name=\"character\" value=\"Colonel Mustard\">\n            Colonel Mustard\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"missScarlet\" name=\"character\" value=\"Miss Scarlet\">\n            Miss Scarlet\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"mrGreen\" name=\"character\" value=\"Mr. Green\">\n              Mr. Green\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"mrsPeacock\" name=\"character\" value=\"Mrs. Peacock\">\n            Mrs. Peacock\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"mrsWhite\" name=\"character\" value=\"Mrs. White\">\n            Mrs. White\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label>\n            <input type=\"radio\" id=\"professorPlum\" name=\"character\" value=\"Professor Plum\">\n            Professor Plum\n          </label>\n        </div>\n    </form>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"handleCharacterSelected()\">Play!</button>\n  </div>\n</ng-template>\n\n\n<button id=\"select-character-modal\" hidden (click)=\"openModal(choosePlayerModal)\"></button>\n  \n  "

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
            'Mrs. White': 'mrsWhite',
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
            _this.roomId = msg.roomId;
            _this.name = msg.name;
            _this.numPlayers = msg.numPlayers;
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
        var mrWhite = document.getElementById('mrsWhite');
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
            selectedCharacter = 'Mrs. White';
        }
        else if (professorPlum.checked) {
            selectedCharacter = 'Professor Plum';
        }
        // console.log('Player selected: ' + selectedCharacter);
        if (selectedCharacter != undefined) {
            this.myPlayerPiece = selectedCharacter;
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

module.exports = "#current-game-status {\n  text-align: center;\n  font-style: italic;\n  color: blue;\n  margin: auto;\n}\n\n#gameboard-container {\n  width: 86%;\n  margin: 46px auto;\n}\n\n#my-cards-btn {\n  background: darkgreen;\n}\n\n/**\n * Game board styles\n */\n\n.gameboard {\n  /* width: 76%;\n  margin: auto; */\n  display: table;\n  table-layout: fixed;\n  margin: auto;\n}\n\n.room {\n  border: 1px solid;\n  text-align: center;\n  padding: 25px;\n  color: black;\n  background: lightgrey;\n  height: 116px;\n}\n\n.hall {\n  text-align: center;\n}\n\n.hall-horizontal {\n  border: 1px dashed;\n  height: 50px;\n  width: 100px;\n}\n\n.hall-vertical {\n  border: 1px dashed;\n  height: 100px;\n  width: 50px;\n  margin: auto;\n}\n\n.selectable-room {\n  border: 1px solid darkgreen;\n  background-color: lightgreen;\n}\n\n.game-status-row {\n  border: 1px dashed;\n  width: 36%;\n  margin: 19px auto 0px;\n  height: 64px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n}\n\n#accusation-btn {\n  background: darkred;\n  border: darkred;\n}\n\n.offer-clue-btn {\n  background: darkgreen;\n  border: darkgreen;\n  color: white;\n}\n\n.reject-offer-clue-btn {\n  background: darkred;\n  border: darkred;\n  color: white;\n}\n\n.close {\n  outline: none;\n}\n\n.button-bottom-row {\n  display: block;\n  text-align: center;\n  margin-top: 10px;\n  margin-bottom: 50px;\n}\n\n.btn {\n  min-width: 135px;\n}\n\n.btn:disabled {\n  cursor: not-allowed;\n}\n\n/**\n * 1200px or greater\n */\n\n/* @media only screen and (min-width: 1200px) {\n  .hall-horizontal {\n    margin-right: -41px;\n  }\n}\n\n@media only screen and (max-width: 1200px) {\n  .hall-horizontal {\n    margin-right: 0;\n  }\n}\n\n@media only screen and (min-width: 1200px) {\n  .room {\n    height: 150px;\n  }\n} */\n"

/***/ }),

/***/ "./src/app/game/game.component.html":
/*!******************************************!*\
  !*** ./src/app/game/game.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row game-status-row\">\n  <p id=\"current-game-status\">{{ currentStatus }}</p>\n</div>\n\n<div id=\"gameboard-container\">\n  <!-- Game board -->\n\n  <table cellpadding=\"0\" cellspacing=\"0\" class=\"gameboard\">\n    <tbody>\n      <tr>\n        <td id=\"study\" #study (click)=\"boardClicked(study)\" class=\"room\">Study</td>\n        <td>\n          <div id=\"hall-3\" #hall3 (click)=\"boardClicked(hall3)\" class=\"hall-horizontal\"></div>\n        </td>\n        <td id=\"hall\" #hall (click)=\"boardClicked(hall)\" class=\"room\">Hall</td>\n        <td>\n          <div id=\"hall-8\" #hall8 (click)=\"boardClicked(hall8)\" class=\"hall-horizontal\"></div>\n        </td>\n        <td id=\"lounge\" #lounge (click)=\"boardClicked(lounge)\" class=\"room\">Lounge</td>\n      </tr>\n      <tr>\n        <td class=\"hall\">\n          <div id=\"hall-1\" #hall1 (click)=\"boardClicked(hall1)\" class=\"hall-vertical\"></div>\n        </td>\n        <td></td>\n        <td class=\"hall\">\n          <div id=\"hall-6\" #hall6 (click)=\"boardClicked(hall6)\" class=\"hall-vertical\"></div>\n        </td>\n        <td></td>\n        <td class=\"hall\">\n          <div id=\"hall-11\" #hall11 (click)=\"boardClicked(hall11)\" class=\"hall-vertical\"></div>\n        </td>\n      </tr>\n      <tr>\n        <td id=\"library\" #library (click)=\"boardClicked(library)\" class=\"room\">Library</td>\n        <td>\n          <div id=\"hall-4\" #hall4 (click)=\"boardClicked(hall4)\" class=\"hall-horizontal\"></div>\n        </td>\n        <td id=\"billiard-room\" #billiardRoom (click)=\"boardClicked(billiardRoom)\" class=\"room\">Billiard Room</td>\n        <td>\n          <div id=\"hall-9\" #hall9 (click)=\"boardClicked(hall9)\" class=\"hall-horizontal\"></div>\n        </td>\n        <td id=\"dining-room\" #diningRoom (click)=\"boardClicked(diningRoom)\" class=\"room\">Dining Room</td>\n      </tr>\n      <tr>\n        <td class=\"hall\">\n          <div id=\"hall-2\" #hall2 (click)=\"boardClicked(hall2)\" class=\"hall-vertical\"></div>\n        </td>\n        <td></td>\n        <td class=\"hall\">\n          <div id=\"hall-7\" #hall7 (click)=\"boardClicked(hall7)\" class=\"hall-vertical\"></div>\n        </td>\n        <td></td>\n        <td class=\"hall\">\n          <div id=\"hall-12\" #hall12 (click)=\"boardClicked(hall12)\" class=\"hall-vertical\"></div>\n        </td>\n      </tr>\n      <tr>\n        <td id=\"conservatory\" #conservatory (click)=\"boardClicked(conservatory)\" class=\"room\">Conservatory</td>\n        <td>\n          <div id=\"hall-5\" #hall5 (click)=\"boardClicked(hall5)\" class=\"hall-horizontal\"></div>\n        </td>\n        <td id=\"ballroom\" #ballroom (click)=\"boardClicked(ballroom)\" class=\"room\">Ballroom</td>\n        <td>\n          <div id=\"hall-10\" #hall10 (click)=\"boardClicked(hall10)\" class=\"hall-horizontal\"></div>\n        </td>\n        <td id=\"kitchen\" #kitchen (click)=\"boardClicked(kitchen)\" class=\"room\">Kitchen</td>\n      </tr>\n    </tbody>\n  </table>\n\n</div>\n<!-- Button row -->\n<div class=\"row button-bottom-row\">\n  <button id=\"accusation-btn\" [disabled]=\"!isMyTurn || hasMadeAccusation\" class=\"btn btn-primary\"\n    (click)=\"openModalAccusation(accusationModal)\">\n    Accuse!\n  </button>\n  &nbsp;&nbsp;\n  <button id=\"suggestion-btn\" [disabled]=\"!isMyTurn || !hasMoved || hasMadeSuggestion\" class=\"btn btn-primary\"\n    (click)=\"openModalSuggestion(suggestionModal)\">\n    Suggest!\n  </button>\n  &nbsp;&nbsp;\n  <button id=\"end-turn-btn\" [disabled]=\"!isMyTurn\" class=\"btn btn-secondary\" (click)=\"endTurn()\">\n    End turn\n  </button>\n  &nbsp;&nbsp;\n  <button id=\"my-cards-btn\" class=\"btn btn-secondary\" (click)=\"openMyCardsModal(myCardsModal)\">\n    My Cards\n  </button>\n</div>\n<!-- End Button row -->\n<!-- Accusation modal -->\n<ng-template #accusationModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">Make an accusation</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-4\">\n        <form>\n          <label>Player:</label>\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"colonelMustard\" name=\"character\" value=\"Colonel Mustard\">\n                Colonel Mustard\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"missScarlet\" name=\"character\" value=\"Miss Scarlet\">\n                Miss Scarlet\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"mrGreen\" name=\"character\" value=\"Mr. Green\">\n                Mr. Green\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"mrsPeacock\" name=\"character\" value=\"Mrs. Peacock\">\n                Mrs. Peacock\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"mrWhite\" name=\"character\" value=\"Mr. White\">\n                Mr. White\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"professorPlum\" name=\"character\" value=\"Professor Plum\">\n                Professor Plum\n              </label>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"col-4\">\n        <form>\n          <label>Weapon:</label>\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"candlestick\" name=\"weapon\" value=\"Candlestick\">\n                Candlestick\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"revolver\" name=\"weapon\" value=\"Revolver\">\n                Revolver\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"knife\" name=\"weapon\" value=\"Knife\">\n                Knife\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"leapPipe\" name=\"weapon\" value=\"Lead Pipe\">\n                Lead Pipe\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"rope\" name=\"weapon\" value=\"Rope\">\n                Rope\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"wrench\" name=\"weapon\" value=\"Wrench\">\n                Wrench\n              </label>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"col-4\">\n        <form>\n          <label>Room:</label>\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-study\" name=\"room\" value=\"Study\">\n                Study\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-hall\" name=\"room\" value=\"Hall\">\n                Hall\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-lounge\" name=\"room\" value=\"Lounge\">\n                Lounge\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-library\" name=\"room\" value=\"Library\">\n                Library\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-billiardRoom\" name=\"room\" value=\"Billiard Room\">\n                Billiard Room\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-diningRoom\" name=\"room\" value=\"Dining Room\">\n                Dining Room\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-conservatory\" name=\"room\" value=\"Conservatory\">\n                Conservatory\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-ballroom\" name=\"room\" value=\"Ballroom\">\n                Ballroom\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-kitchen\" name=\"room\" value=\"Kitchen\">\n                Kitchen\n              </label>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"handleAccusation()\">Accuse!</button>\n  </div>\n</ng-template>\n<!-- End Accusation modal -->\n\n<!-- Suggestion modal -->\n<ng-template #suggestionModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">Make a suggestion</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <div class=\"col-6\">\n        <form>\n          <label>Player:</label>\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"colonelMustard\" name=\"character\" value=\"Colonel Mustard\">\n                Colonel Mustard\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"missScarlet\" name=\"character\" value=\"Miss Scarlet\">\n                Miss Scarlet\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"mrGreen\" name=\"character\" value=\"Mr. Green\">\n                Mr. Green\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"mrsPeacock\" name=\"character\" value=\"Mrs. Peacock\">\n                Mrs. Peacock\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"mrWhite\" name=\"character\" value=\"Mr. White\">\n                Mr. White\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"professorPlum\" name=\"character\" value=\"Professor Plum\">\n                Professor Plum\n              </label>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"col-6\">\n        <form>\n          <label>Weapon:</label>\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"candlestick\" name=\"weapon\" value=\"Candlestick\">\n                Candlestick\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"revolver\" name=\"weapon\" value=\"Revolver\">\n                Revolver\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"knife\" name=\"weapon\" value=\"Knife\">\n                Knife\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"leapPipe\" name=\"weapon\" value=\"Lead Pipe\">\n                Lead Pipe\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"rope\" name=\"weapon\" value=\"Rope\">\n                Rope\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"wrench\" name=\"weapon\" value=\"Wrench\">\n                Wrench\n              </label>\n            </div>\n          </div>\n        </form>\n      </div>\n      <!-- <div class=\"col-4\">\n        <form>\n          <label>Room:</label>\n          <div class=\"form-group\">\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-study\" name=\"room\" value=\"Study\">\n                Study\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-hall\" name=\"room\" value=\"Hall\">\n                Hall\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-lounge\" name=\"room\" value=\"Lounge\">\n                Lounge\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-library\" name=\"room\" value=\"Library\">\n                Library\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-billiardRoom\" name=\"room\" value=\"Billiard Room\">\n                Billiard Room\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-diningRoom\" name=\"room\" value=\"Dining Room\">\n                Dining Room\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-conservatory\" name=\"room\" value=\"Conservatory\">\n                Conservatory\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-ballroom\" name=\"room\" value=\"Ballroom\">\n                Ballroom\n              </label>\n            </div>\n            <div class=\"form-group\">\n              <label>\n                <input type=\"radio\" id=\"suggest-kitchen\" name=\"room\" value=\"Kitchen\">\n                Kitchen\n              </label>\n            </div>\n          </div>\n        </form>\n      </div> -->\n    </div>\n  </div>\n  <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"handleSuggestion()\">Suggest!</button>\n  </div>\n</ng-template>\n<!-- End Suggestion modal -->\n\n<!-- My Cards modal -->\n<ng-template #myCardsModal let-modal>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\" id=\"modal-basic-title\">My Cards</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss('Cross click')\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <div class=\"row\">\n      <!-- <div class=\"col-4\">\n          <label>Character:</label>\n          <ul>\n            <li *ngFor=\"let card of myCards\">\n              {{ card }}\n            </li>\n          </ul>\n      </div>\n      <div class=\"col-4\">\n        <label>Weapon:</label>\n        <ul>\n\n        </ul>\n      </div>\n      <div class=\"col-4\">\n        <label>Room:</label>\n        <ul>\n\n        </ul>\n\n      </div> -->\n      <div class=\"col-12\">\n          <label>Cards:</label>\n          <ul>\n            <li *ngFor=\"let card of myCards\">\n              {{ card }}\n            </li>\n          </ul>\n      </div>\n    </div>\n  </div>\n  <!-- <div class=\"modal-footer\">\n    <button type=\"button\" class=\"btn btn-outline-dark\" (click)=\"handleSuggestion()\">Suggest!</button>\n  </div> -->\n</ng-template>\n<!-- End My Cards Modal -->\n\n<!-- Offer Clue modal -->\n<ng-template #offerClueModal let-modal>\n    <div class=\"modal-header\">\n      <h4 class=\"modal-title\" id=\"modal-basic-title\">Offer Clue</h4>\n    </div>\n    <div class=\"modal-body\">\n      <div class=\"row\">\n        <div class=\"col-12\">\n            <span>\n                {{ lastSuggestion }}\n            </span>\n        </div>\n      </div>\n      <br/>\n      <div class=\"row\">\n        <div class=\"col-12\">\n            <label>Cards:</label>\n            <ul>\n              <li *ngFor=\"let card of myCards\">\n                {{ card }}\n              </li>\n            </ul>\n        </div>\n        <!-- <div class=\"col-4\">\n          <label>Weapon:</label>\n          <ul>\n  \n          </ul>\n        </div>\n        <div class=\"col-4\">\n          <label>Room:</label>\n          <ul>\n  \n          </ul>s\n  \n        </div> -->\n      </div>\n    </div>\n    <div class=\"modal-footer\">\n      <button type=\"button\" class=\"btn btn-outline-dark offer-clue-btn\" (click)=\"handleOfferClue()\">Offer Clue</button>\n      <button type=\"button\" class=\"btn btn-outline-dark reject-offer-clue-btn\" (click)=\"handleRejectOfferClue()\">Reject</button>\n    </div>\n  </ng-template>\n  <!-- End Offer Clue Modal -->\n  <button hidden style=\"display:none;\" id=\"offer-clue-modal-btn\" (click)=\"openOfferClueModal(offerClueModal)\"></button>\n\n"

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
/* harmony import */ var src_models_Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/models/Player */ "./src/models/Player.ts");
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
        this.accusationBtn = "accusation-btn";
        this.suggestionBtn = "suggestion-btn";
        this.endBtn = "end-turn-btn";
        // Pieces each first letter inn piece are uppercase, i.e. Colonel Mustard, Mrs. White
        this.playersByPiece = {};
        this.opponents = [];
        this.opponentsIndex = 0;
        this.currentStatus = 'Awaiting players...';
        this.isMyPlayer = true;
        this.isMyTurn = false;
        this.hasMoved = false;
        this.hasMadeSuggestion = false;
        this.hasMadeAccusation = false;
        this.myCards = [];
        this.legalMoves = [];
    }
    GameComponent_1 = GameComponent;
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Player selected event from server
         */
        this.socketService.onPlayerSelected().subscribe(function (msg) {
            console.log('onPlayerSelected received from game component.');
            _this.roomId = msg.roomId;
            var newPlayer = msg.newPlayer;
            var socketId = newPlayer.socketId;
            var name = newPlayer.name;
            var piece = newPlayer.piece;
            if (GameComponent_1.DEBUG) {
                console.log("socketId: " + socketId);
                console.log("name: " + name);
                console.log("piece: " + piece);
            }
            _this.toastr.success(name + " is playing as " + piece, 'Player Joined');
            // the first message received will be my player
            if (GameComponent_1.PLAYER_NAME === name) {
                _this.myPlayerPiece = piece;
                console.log("myPlayerPiece = " + _this.myPlayerPiece);
            }
        });
        /**
         * Start game event from server
         */
        this.socketService.onStartGame().subscribe(function (msg) {
            console.log('onStartGame received from game component.');
            var players = msg.players;
            for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
                var p = players_1[_i];
                var playerPiece = p.piece;
                var cards = p.cards;
                var mappedPlayer = new src_models_Player__WEBPACK_IMPORTED_MODULE_4__["Player"](p.socketId, p.name, playerPiece, p.currentLocation, cards);
                console.log(mappedPlayer);
                _this.playersByPiece[playerPiece] = mappedPlayer;
                if (playerPiece != _this.myPlayerPiece) {
                    _this.opponents.push(mappedPlayer);
                }
                else {
                    _this.myCards = cards;
                    console.log(_this.myCards);
                }
            }
            var firstPiece = msg.firstPiece;
            _this.startGame(firstPiece);
        });
        /**
         * Get legal moves event from server. This is for the current myPlayer only.
         */
        this.socketService.onGetLegalMovesResponse().subscribe(function (msg) {
            var moves = msg.legalMoves;
            _this.isMyTurn = true;
            _this.legalMoves = [];
            for (var i = 0; i < moves.length; i++) {
                var move = moves[i];
                _this.legalMoves.push(move);
            }
            if (_this.legalMoves.length == 0) {
                alert('You have no legal moves avaialble. Either make an accusation or end your turn.');
                // lose turn or make an accusation
                document.getElementById(_this.suggestionBtn).setAttribute('diabled', 'true');
                document.getElementById(_this.accusationBtn).click();
                _this.currentStatus = 'You have no legal moves available. Either make an accusation or end your turn.';
            }
            else {
                _this.currentStatus = "It is your turn " + _this.myPlayerPiece + "! Select a room.";
                for (var i = 0; i < GameComponent_1.boardLocationIds.length; i++) {
                    var location_1 = GameComponent_1.boardLocationIds[i];
                    var node = document.getElementById(location_1);
                    if (_this.legalMoves.indexOf(location_1) != -1) {
                        node.classList.add('selectable-room');
                    }
                    else {
                        node.classList.remove('selectable-room');
                    }
                }
            }
        });
        /**
         * Player moved returned from server.
         */
        this.socketService.onPlayerMoved().subscribe(function (msg) {
            var piece = msg.piece;
            var location = msg.location;
            _this.movePieceOnGameboard(piece, location);
        });
        /**
         * Suggestion made
         */
        this.socketService.onSuggestionMade().subscribe(function (msg) {
            var piece = msg.piece; // Colonel Mustard ... etc
            var suggestedPlayer = msg.suggestedPlayer;
            var weapon = msg.weapon;
            var room = msg.room;
            _this.lastSuggestion = piece + " suggested '" + suggestedPlayer + "' in '" + room + "' with '" + weapon + "'";
            if (piece != _this.myPlayerPiece) {
                _this.currentStatus = _this.lastSuggestion;
            }
            else {
                _this.currentStatus = "You suggested '" + suggestedPlayer + "' in '" + room + "' with '" + weapon + "'";
                _this.getCluesFromOtherPlayer();
            }
            _this.toastr.info(_this.currentStatus, 'Suggestion Made', {
                disableTimeOut: false
            });
            _this.movePieceOnGameboard(suggestedPlayer, room);
        });
        /**
         * Next player up
         */
        this.socketService.onNextPlayerUp().subscribe(function (msg) {
            var piece = msg.piece;
            _this.handleNextPlayerUp(piece);
        });
        /**
         * Accusation made
         */
        this.socketService.onAccusationMade().subscribe(function (msg) {
            var piece = msg.piece; // Colonel Mustard ... etc
            var suggestedPlayer = msg.suggestedPlayer;
            var weapon = msg.weapon;
            var room = msg.room;
            var didWin = msg.didWin;
            _this.toastr.info(piece + " accused " + suggestedPlayer + " in " + room + " with " + weapon, 'Accusation Made', {
                disableTimeOut: true
            });
            if (didWin) {
                if (piece === _this.myPlayerPiece) {
                    alert('Game Over. You win the game!!!');
                }
                else {
                    alert("Game Over. " + piece + " won the game :(");
                }
                setTimeout(location.reload, 3000);
            }
        });
        /**
         * Offer clue
         */
        this.socketService.onRequestOfferClue().subscribe(function (msg) {
            console.log('You must offer a clue or reject the offer');
            _this.requestingPlayerSocketId = msg.requestingPlayerSocketId;
            document.getElementById('offer-clue-modal-btn').click();
        });
        /**
         *
         */
        this.socketService.onClueOfferRejected().subscribe(function (msg) {
            _this.getCluesFromOtherPlayer();
        });
        this.socketService.onClueOffered().subscribe(function (msg) {
            var requestedPlayerSocketId = msg.requestedPlayerSocketId;
            var clue = msg.clue;
            var opponent = _this.getOpponentBySocketId(requestedPlayerSocketId);
            _this.toastr.success(opponent.piece + " offered " + clue, 'Clue Offered');
        });
    };
    /**
     * Start of the game
     * @param firstPiece
     */
    GameComponent.prototype.startGame = function (firstPiece) {
        console.log('starting the game');
        // iterate over the keys of the object and put the players on the board
        for (var piece in this.playersByPiece) {
            var player = this.playersByPiece[piece];
            var node = player.node;
            var location_2 = player.currentLocation;
            var elm = document.getElementById(player.currentLocation);
            elm.appendChild(node);
        }
        console.log('myPlayerPiece: ' + this.myPlayerPiece);
        if (this.myPlayerPiece != firstPiece) {
            this.isMyTurn = false;
            this.currentStatus = firstPiece + " is making a move...";
            this.toastr.success(firstPiece + " is first. Please wait for your turn", 'Game Started');
        }
        else {
            this.toastr.success(firstPiece + " take your turn!", 'Game Started');
            this.resetStateForMyTurn();
            var myPlayer = this.getMyPlayer();
            var location_3 = myPlayer.currentLocation;
            this.socketService.getLegalMoves(this.roomId, location_3);
        }
    };
    /**
     * Handle next player up.
     * @param piece
     */
    GameComponent.prototype.handleNextPlayerUp = function (piece) {
        var toastrMessage;
        if (this.myPlayerPiece === piece) {
            this.resetStateForMyTurn();
            var myPlayer = this.getMyPlayer();
            var location_4 = myPlayer.currentLocation;
            toastrMessage = "Its your turn";
            this.socketService.getLegalMoves(this.roomId, location_4);
        }
        else {
            toastrMessage = piece + "'s turn";
            this.isMyTurn = false;
            this.currentStatus = piece + " is making a move...";
        }
        this.toastr.success(toastrMessage, 'Next player up');
    };
    GameComponent.prototype.resetStateForMyTurn = function () {
        this.isMyTurn = true;
        this.hasMoved = false;
        this.hasMadeSuggestion = false;
        this.hasMadeAccusation = false;
        this.opponentsIndex = 0;
    };
    GameComponent.prototype.boardClicked = function (elmRef) {
        // console.log(this.hasMoved)
        if (!this.isMyTurn || this.hasMoved) {
            return;
        }
        var location = elmRef.id;
        if (this.legalMoves.indexOf(location) != -1) {
            var formattedId = location.replace('-', ' ').toLowerCase();
            console.log(formattedId);
            this.currentStatus = "You selected the " + location;
            this.hasMoved = true;
            this.socketService.movePlayer(this.roomId, this.myPlayerPiece, location);
            this.resetBoardColors();
        }
    };
    /**
     * A method to handle suggestions from the suggestion modal
     */
    GameComponent.prototype.handleSuggestion = function () {
        var suggestedPlayer;
        for (var _i = 0, _a = GameComponent_1.suggestionPlayerIds; _i < _a.length; _i++) {
            var suggestionPlayerId = _a[_i];
            var player = document.getElementById(suggestionPlayerId);
            if (player == undefined)
                continue;
            if (player.checked) {
                suggestedPlayer = player.value;
            }
        }
        console.log(suggestedPlayer);
        if (suggestedPlayer === undefined) {
            return;
        }
        var suggestedWeapon;
        for (var _b = 0, _c = GameComponent_1.suggestionWeaponIds; _b < _c.length; _b++) {
            var suggestionWeaponId = _c[_b];
            var weapon = document.getElementById(suggestionWeaponId);
            if (weapon.checked) {
                suggestedWeapon = weapon.value;
            }
        }
        console.log(suggestedWeapon);
        if (suggestedWeapon === undefined) {
            return;
        }
        var suggestedRoom = this.getMyPlayer().currentLocation;
        console.log(this.playersByPiece);
        this.socketService.makeSuggestion(this.roomId, this.myPlayerPiece, suggestedPlayer, suggestedWeapon, suggestedRoom);
        this.modalService.dismissAll();
        this.hasMadeSuggestion = true;
    };
    /**
     * A method to handle suggestions from the suggestion modal
     */
    GameComponent.prototype.handleAccusation = function () {
        var accusedPlayer;
        for (var _i = 0, _a = GameComponent_1.suggestionPlayerIds; _i < _a.length; _i++) {
            var suggestionPlayerId = _a[_i];
            var player = document.getElementById(suggestionPlayerId);
            if (player == undefined)
                continue;
            if (player.checked) {
                accusedPlayer = player.value;
            }
        }
        console.log(accusedPlayer);
        if (accusedPlayer === undefined) {
            return;
        }
        var accusedWeapon;
        for (var _b = 0, _c = GameComponent_1.suggestionWeaponIds; _b < _c.length; _b++) {
            var suggestionWeaponId = _c[_b];
            var weapon = document.getElementById(suggestionWeaponId);
            if (weapon.checked) {
                accusedWeapon = weapon.value;
            }
        }
        console.log(accusedWeapon);
        if (accusedWeapon === undefined) {
            return;
        }
        var accusedRoom;
        for (var _d = 0, _e = GameComponent_1.suggestionRoomIds; _d < _e.length; _d++) {
            var suggestionRoom = _e[_d];
            var room = document.getElementById(suggestionRoom);
            if (room.checked) {
                accusedRoom = room.value;
            }
        }
        console.log(accusedRoom);
        if (accusedRoom === undefined) {
            return;
        }
        this.currentStatus = "You accused " + accusedPlayer + " in " + accusedRoom + " with " + accusedWeapon;
        this.socketService.makeAccusation(this.roomId, this.myPlayerPiece, accusedPlayer, accusedRoom, accusedWeapon);
        this.modalService.dismissAll();
        this.hasMadeAccusation = true;
    };
    GameComponent.prototype.endTurn = function () {
        this.socketService.endTurn(this.roomId, this.myPlayerPiece);
    };
    GameComponent.prototype.resetBoardColors = function () {
        for (var i = 0; i < GameComponent_1.boardLocationIds.length; i++) {
            var location_5 = GameComponent_1.boardLocationIds[i];
            var node = document.getElementById(location_5);
            if (node.classList.contains('selectable-room')) {
                node.classList.remove('selectable-room');
            }
        }
    };
    GameComponent.prototype.movePieceOnGameboard = function (piece, location) {
        var player = this.playersByPiece[piece];
        console.log("player : " + player);
        console.log("location : " + location);
        if (player === undefined)
            return;
        // The player image
        var node = player.node;
        // remove from old locationn
        var currentLocation = player.currentLocation;
        var currElm = document.getElementById(currentLocation);
        currElm.removeChild(node);
        // move to new location
        player.currentLocation = location;
        var newElm = document.getElementById(location);
        newElm.appendChild(node);
    };
    /**
     * Get clues from other player.
     */
    GameComponent.prototype.getCluesFromOtherPlayer = function () {
        if (this.opponentsIndex >= this.opponents.length) {
            alert('All players could not offer a clue');
            return;
        }
        var opponent = this.opponents[this.opponentsIndex];
        var socketId = opponent.socketId;
        var myPlayerSocketId = this.getMyPlayer().socketId;
        this.socketService.getClueFromPlayer(this.roomId, myPlayerSocketId, socketId);
        this.opponentsIndex++;
    };
    /**
     * Get my player.
     */
    GameComponent.prototype.getMyPlayer = function () {
        return this.playersByPiece[this.myPlayerPiece];
    };
    /**
     * Open Suggestion modal
     * @param content
     */
    GameComponent.prototype.openModalSuggestion = function (content) {
        this.modalService.open(content, {
            size: 'lg',
        });
        // const player: Player = this.getMyPlayer();
        // const playerId = player.playerId;
        // console.log(playerId);
        // const elm: HTMLElement = document.getElementById(playerId);
        // elm.parentElement.parentElement.remove();
    };
    /**
     * Open Accusation modal
     * @param content
     */
    GameComponent.prototype.openModalAccusation = function (content) {
        this.modalService.open(content, {
            size: 'lg',
        });
        // const player: Player = this.getMyPlayer();
        // const playerId = player.playerId;
        // console.log(playerId)
        // const elm: HTMLElement = document.getElementById(playerId);
        // elm.parentElement.parentElement.remove();
    };
    /**
     * Open My cards modal
     * @param content
     */
    GameComponent.prototype.openMyCardsModal = function (content) {
        this.modalService.open(content, {
            size: 'lg',
        });
    };
    /**
     * Open Offer clue
     * @param content
     */
    GameComponent.prototype.openOfferClueModal = function (content) {
        this.modalService.open(content, {
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        });
    };
    GameComponent.prototype.handleOfferClue = function () {
        var card = '';
        this.socketService.offerClue(this.requestingPlayerSocketId, this.getMySocketId(), card);
        this.modalService.dismissAll();
    };
    GameComponent.prototype.handleRejectOfferClue = function () {
        this.socketService.rejectOfferClue(this.requestingPlayerSocketId, this.getMySocketId());
        this.modalService.dismissAll();
    };
    GameComponent.prototype.getMySocketId = function () {
        return this.getMyPlayer().socketId;
    };
    GameComponent.prototype.getOpponentBySocketId = function (socketId) {
        for (var _i = 0, _a = this.opponents; _i < _a.length; _i++) {
            var opp = _a[_i];
            if (opp.socketId === socketId) {
                return opp;
            }
        }
    };
    GameComponent.DEBUG = true;
    GameComponent.boardLocationIds = ['study', 'hall-1', 'library', 'hall-2', 'conservatory', 'hall-3', 'hall-4',
        'hall-5', 'hall', 'hall-6', 'billiard-room', 'hall-7', 'ballroom', 'hall-8',
        'hall-9', 'hall-10', 'lounge', 'hall-11', 'dining-room', 'hall-12', 'kitchen'];
    GameComponent.suggestionPlayerIds = ['colonelMustard', 'missScarlet', 'mrGreen', 'mrsPeacock', 'mrWhite', 'professorPlum'];
    GameComponent.suggestionWeaponIds = ['candlestick', 'revolver', 'knife', 'leapPipe', 'rope', 'wrench'];
    GameComponent.suggestionRoomIds = ['suggest-study', 'suggest-hall', 'suggest-lounge', 'suggest-library', 'suggest-billiardRoom', 'suggest-diningRoom', 'suggest-conservatory', 'suggest-ballroom', 'suggest-kitchen'];
    GameComponent = GameComponent_1 = __decorate([
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
    var GameComponent_1;
}());



/***/ }),

/***/ "./src/app/landing-page/landing-page.component.css":
/*!*********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header-menu {\n  width: 60%;\n  margin: 27px auto;\n}\n\n.error {\n  color: red;\n}\n\n.form-title {\n  text-align: center;\n}\n\n.how-to-play-header {\n  text-align: center;\n}\n\nselect:required:invalid {\n  color: gray;\n}\n\noption[value=\"\"][disabled] {\n  display: none;\n}\n\noption {\n  color: black;\n}\n\np {\n  margin-bottom: 8px;\n}\n\n.join-row {\n   margin-bottom: 50px;\n}\n"

/***/ }),

/***/ "./src/app/landing-page/landing-page.component.html":
/*!**********************************************************!*\
  !*** ./src/app/landing-page/landing-page.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"menu\">\n    <div class=\"header-menu\">\n      <h3 class=\"how-to-play-header\">How To Play</h3>\n    </div>\n    <div class=\"row\">\n      <div class=\"col col-sm-7 col-lg-6 offset-3\">\n        <h4 class=\"form-title\">Create a new game</h4>\n        <div>\n          <p>1. Enter a username and select the number of players</p>\n          <p>2. Click on new game.</p>\n        </div>\n        <form>\n          <div class=\"form-group row\">\n            <input [(ngModel)]=\"creatorPlayerName\" class=\"form-control\" type=\"text\" name=\"name\" placeholder=\"Enter your name\"\n              required>\n          </div>\n          <div class=\"form-group row\">\n              <select [(ngModel)]=\"numberOfPlayers\" name=\"numberOfPlayers\" class=\"form-control\">\n                  <option disabled selected>Select the number of players</option>\n                  <!-- start test values -->\n                  <option value=\"1\">1</option>\n                  <option value=\"2\">2</option>\n                  <!-- end test values -->\n                  <option value=\"3\">3</option>\n                  <option value=\"4\">4</option>\n                  <option value=\"5\">5</option>\n                  <option value=\"6\">6</option>\n              </select>\n\n          </div>\n          <div class=\"form-group row\">\n            <button class=\"btn btn-primary\" type=\"button\" (click)=\"createGame()\">New Game</button>\n          </div>\n        </form>\n        <div class=\"row error\" *ngIf=\"createGameError\">\n          <p>{{ createGameErrorMessage }}</p>\n        </div>\n      </div>\n    </div>\n    <br />\n    <div class=\"row join-row\">\n      <div class=\"col col-sm-7 col-lg-6 offset-3\">\n        <h4 class=\"form-title\">Join an existing game</h4>\n        <div>\n          <p>1. Enter a username and the room id.</p>\n          <p>2. Click on join game.</p>\n        </div>\n        <form>\n          <div class=\"form-group row\">\n            <input [(ngModel)]=\"joiningPlayerName\" class=\"form-control\" type=\"text\" name=\"name\" id=\"nameJoin\"\n              placeholder=\"Enter your name\" required>\n          </div>\n          <div class=\"form-group row\">\n            <input [(ngModel)]=\"roomId\" class=\"form-control\" type=\"text\" name=\"room\" id=\"room\" placeholder=\"Enter Game ID\"\n              required>\n          </div>\n          <div class=\"form-group row\">\n            <button id=\"join\" class=\"btn btn-primary\" type=\"button\" (click)=\"joinGame()\">Join Game</button>\n          </div>\n        </form>\n        <div class=\"row error\" *ngIf=\"joinGameError\">\n          <p>{{ joinGameErrorMessage }}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

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
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game/game.component */ "./src/app/game/game.component.ts");
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
        _game_game_component__WEBPACK_IMPORTED_MODULE_2__["GameComponent"].PLAYER_NAME = this.creatorPlayerName;
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
        _game_game_component__WEBPACK_IMPORTED_MODULE_2__["GameComponent"].PLAYER_NAME = this.joiningPlayerName;
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
     * Socket events to client.
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
    SocketService.prototype.onStartGame = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('start-game', function (msg) {
                // console.log('player selected...');
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onGetLegalMovesResponse = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('get-legal-moves-response', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onPlayerMoved = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('player-moved', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onSuggestionMade = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('suggestion-made', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onNextPlayerUp = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('next-player-up', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onAccusationMade = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('accusation-made', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onRequestOfferClue = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('request-offer-clue', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onClueOffered = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('clue-offered', function (msg) {
                observer.next(msg);
            });
        });
    };
    SocketService.prototype.onClueOfferRejected = function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (observer) {
            _this.socket.on('clue-offer-rejected', function (msg) {
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
            roomId: roomId,
            name: name
        };
        this.socket.emit('player-join-game', message);
    };
    SocketService.prototype.getLegalMoves = function (roomId, location) {
        var message = {
            roomId: roomId,
            location: location
        };
        this.socket.emit('get-legal-moves', message);
    };
    SocketService.prototype.movePlayer = function (roomId, piece, location) {
        var message = {
            roomId: roomId,
            piece: piece,
            location: location
        };
        this.socket.emit('move-player', message);
    };
    SocketService.prototype.makeSuggestion = function (roomId, piece, player, weapon, room) {
        var message = {
            roomId: roomId,
            piece: piece,
            player: player,
            weapon: weapon,
            room: room
        };
        this.socket.emit('make-suggestion', message);
    };
    SocketService.prototype.makeAccusation = function (roomId, piece, player, weapon, room) {
        var message = {
            roomId: roomId,
            piece: piece,
            player: player,
            weapon: weapon,
            room: room
        };
        this.socket.emit('make-accusation', message);
    };
    SocketService.prototype.endTurn = function (roomId, piece) {
        var message = {
            roomId: roomId,
            piece: piece
        };
        this.socket.emit('end-turn', message);
    };
    SocketService.prototype.getClueFromPlayer = function (roomId, requestingPlayerSocketId, requestedPlayerSocketId) {
        var message = {
            roomId: roomId,
            requestingPlayerSocketId: requestingPlayerSocketId,
            requestedPlayerSocketId: requestedPlayerSocketId
        };
        this.socket.emit('get-clue-from-player', message);
    };
    SocketService.prototype.offerClue = function (requestingPlayerSocketId, requestedPlayerSocketId, card) {
        var message = {
            requestingPlayerSocketId: requestingPlayerSocketId,
            requestedPlayerSocketId: requestedPlayerSocketId,
            card: card
        };
        this.socket.emit('offer-clue', message);
    };
    SocketService.prototype.rejectOfferClue = function (requestingPlayerSocketId, requestedPlayerSocketId) {
        var message = {
            requestingPlayerSocketId: requestingPlayerSocketId,
            requestedPlayerSocketId: requestedPlayerSocketId
        };
        this.socket.emit('reject-offer-clue', message);
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

/***/ "./src/models/Player.ts":
/*!******************************!*\
  !*** ./src/models/Player.ts ***!
  \******************************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
var Player = /** @class */ (function () {
    function Player(socketId, name, piece, currentLocation, cards) {
        this.pieceToImageMap = {
            'Colonel Mustard': '../../assets/colonelMustard.png',
            'Miss Scarlet': '../../assets/missScarlet.png',
            'Mr. Green': '../../assets/mrGreen.png',
            'Mrs. Peacock': '../../assets/mrsPeacock.png',
            'Mrs. White': '../../assets/mrsWhite.png',
            'Professor Plum': '../../assets/professorPlum.png'
        };
        this.pieceToIdMap = {
            'Colonel Mustard': 'colonelMustard',
            'Miss Scarlet': 'missScarlet',
            'Mr. Green': 'mrGreen',
            'Mrs. Peacock': 'mrsPeacock',
            'Mrs. White': 'mrsWhite',
            'Professor Plum': 'professorPlum'
        };
        this._socketId = socketId;
        this._name = name;
        this._piece = piece;
        this._currentLocation = currentLocation;
        this._cards = cards;
        this._imageUrl = this.pieceToImageMap[piece];
        this._playerId = this.pieceToIdMap[piece];
        this._node = document.createElement('IMG');
        this._node.setAttribute('src', this._imageUrl);
        this._node.setAttribute('width', '50px');
    }
    Object.defineProperty(Player.prototype, "playerId", {
        get: function () {
            return this._playerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "node", {
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "imageUrl", {
        get: function () {
            return this._imageUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "currentLocation", {
        get: function () {
            return this._currentLocation;
        },
        set: function (currentLocation) {
            this._currentLocation = currentLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "socketId", {
        get: function () {
            return this._socketId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "piece", {
        get: function () {
            return this._piece;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.toString = function () {
        return "{ name=" + this._name + ", piece=" + this._piece + ", currentLocation=" + this._currentLocation + ", imgUrl=" + this._imageUrl + " }";
    };
    return Player;
}());



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