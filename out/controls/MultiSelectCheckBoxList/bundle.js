/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./MultiSelectCheckBoxList/index.ts":
/*!******************************************!*\
  !*** ./MultiSelectCheckBoxList/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MultiSelectCheckBoxList: () => (/* binding */ MultiSelectCheckBoxList)\n/* harmony export */ });\nclass MultiSelectCheckBoxList {\n  notifyChange(value) {\n    this.selectedOptions = value;\n    this._notifyOutputChanged;\n  }\n  /**\r\n   * Empty constructor.\r\n   */\n  constructor() {}\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n  init(context, notifyOutputChanged, state, container) {\n    this._notifyOutputChanged = notifyOutputChanged;\n    // Add control initialization code\n    this._context = context;\n    this._container = document.createElement(\"div\");\n    //Get Previously stored JSON (i.e. Options)\n    var _previousOptions = [];\n    var _previousOptionsRaw = \"\";\n    _previousOptionsRaw = context.parameters.multiSelectJsonValues.raw; //Bound == Two Way\n    if (_previousOptionsRaw != null && _previousOptionsRaw != \"\" && _previousOptionsRaw != undefined) {\n      _previousOptions = JSON.parse(_previousOptionsRaw);\n    }\n    //Fetch available options.\n    var availableOptions = null;\n    availableOptions = this.Retrieve(context, context.parameters.relatedEntityName.raw, context.parameters.relatedEntityIdColumn.raw, context.parameters.relatedEntityNameColumn.raw, context.parameters.relatedEntitySearchColumn1.raw, _previousOptions);\n    var _innerHtml = \"\";\n    _innerHtml = '<ul class=\"list-items\"> ';\n    if (_previousOptions != null) {\n      _innerHtml = _innerHtml + this.getPreInnerHtml(_previousOptions);\n    }\n    if (availableOptions != null) {\n      _innerHtml = _innerHtml + this.getAvailInnerHtml(availableOptions);\n    }\n    _innerHtml = _innerHtml + \"</ul>\";\n    /* '<ul class=\"list-items\"> '\r\n           <li class=\"item checked\" data-value=\"123\" data-label=\"123\" data-parentEntityId=\"1234\">\r\n          <span class=\"checkbox\"> <i class=\"fa-solid fa-check check-icon\"></i> </span>\r\n          <span class=\"item-text\">French</span></li>\r\n        </ul>';\r\n    */\n    //Generate HTML\n    this._container.innerHTML = '<div class=\"select-btn\"> <span class=\"btn-text\">' + (context.parameters.OptionsPlaceHolder.raw == \"\" ? \"Select Options\" : context.parameters.OptionsPlaceHolder.raw) + '</span> <span class=\"arrow-dwn\"><i class=\"fa-solid fa-chevron-down\"></i>  </span>   </div>' + _innerHtml;\n    //append to parent container\n    container.appendChild(this._container);\n    /* IMP CODE */\n    //JS Code\n    var selectBtn = document.querySelector(\".select-btn\"),\n      items = document.querySelectorAll(\".item\");\n    if (selectBtn != null && selectBtn != undefined) {\n      selectBtn.addEventListener(\"click\", () => {\n        selectBtn.classList.toggle(\"open\");\n      });\n    }\n    items.forEach(item => {\n      item.addEventListener(\"click\", () => {\n        item.classList.toggle(\"checked\");\n        var checked = document.querySelectorAll(\".checked\");\n        var btnText = document.querySelector(\".btn-text\");\n        if (btnText != null && btnText != undefined) {\n          if (checked && checked.length > 0) {\n            btnText.innerHTML = \"\".concat(checked.length, \" Selected\"); //innerText\n            var optionArray;\n            optionArray = null; //To handle : 'optionArray' is never reassigned. Use 'const' instead\n            optionArray = [];\n            var childNodesArr = Array.prototype.slice.call(checked);\n            for (var i = 0; i < childNodesArr.length; i++) {\n              if (childNodesArr[i].getAttribute(\"data-value\") != undefined && childNodesArr[i].getAttribute(\"data-value\") != null && childNodesArr[i].getAttribute(\"data-label\") != undefined && childNodesArr[i].getAttribute(\"data-label\") != null && childNodesArr[i].getAttribute(\"data-parentEntityId\") != undefined && childNodesArr[i].getAttribute(\"data-parentEntityId\") != null) {\n                console.log(childNodesArr[i].getAttribute(\"data-label\"));\n                console.log(childNodesArr[i].getAttribute(\"data-value\"));\n                console.log(childNodesArr[i].getAttribute(\"data-parentEntityId\"));\n                optionArray.push({\n                  label: childNodesArr[i].getAttribute(\"data-label\"),\n                  value: childNodesArr[i].getAttribute(\"data-value\"),\n                  parentEntityId: childNodesArr[i].getAttribute(\"data-parentEntityId\")\n                });\n              }\n            }\n            if (optionArray.length == 0) {\n              //Each time call on-change\n              this.notifyChange([]);\n              this.selectedOptions = [];\n              this._notifyOutputChanged();\n            } else {\n              this.notifyChange(optionArray);\n              this.selectedOptions = optionArray;\n              this._notifyOutputChanged();\n            }\n          } else {\n            //btnText.innerHTML = \"Select Roles\"; //innerText\n            //alert(\"no item selected\");\n          }\n        }\n      });\n    });\n  }\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n  updateView(context) {\n    // Add code to update control view\n  }\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as \"bound\" or \"output\"\r\n   */\n  getOutputs() {\n    return {\n      //This methods gets called on notifyOutputChange\n      multiSelectJsonValues: JSON.stringify(this.selectedOptions)\n    };\n  }\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n  destroy() {\n    // Add code to cleanup control if necessary\n  }\n  //Custom Methods\n  getPreInnerHtml(preValue) {\n    var _innerHtml = \"\";\n    if (preValue != null) {\n      for (var j = 0; j < preValue.length; j++) {\n        if (preValue[j].label != null && preValue[j].value != null && preValue[j].parentEntityId != null) {\n          _innerHtml = _innerHtml + '<li class=\"item checked\" data-value=\"' + preValue[j].value + '\" data-label=\"' + preValue[j].label + '\" data-parentEntityId=\"' + preValue[j].parentEntityId + '\">' + '<span class=\"checkbox\"> <i class=\"fa-solid fa-check check-icon\"></i> </span> ' + '<span class=\"item-text\">' + preValue[j].label + \"</span></li>\";\n        }\n      }\n    }\n    return _innerHtml;\n  }\n  getAvailInnerHtml(preValue) {\n    var _innerHtml = \"\";\n    if (preValue != null) {\n      for (var j = 0; j < preValue.length; j++) {\n        if (preValue[j].label != null && preValue[j].value != null && preValue[j].parentEntityId != null) {\n          _innerHtml = _innerHtml + '<li class=\"item\" data-value=\"' + preValue[j].value + '\" data-label=\"' + preValue[j].label + '\" data-parentEntityId=\"' + preValue[j].parentEntityId + '\">' + '<span class=\"checkbox\"> <i class=\"fa-solid fa-check check-icon\"></i> </span> ' + '<span class=\"item-text\">' + preValue[j].label + \"</span></li>\";\n        }\n      }\n    }\n    return _innerHtml;\n  }\n  Retrieve(context, relatedEntityName, relatedEntityIdColumn, relatedEntityNameColumn, relatedEntitySearchColumn1, previousOptions) {\n    //\n    var outArray;\n    outArray = null; //To handle : 'outArray' is never reassigned. Use 'const' instead\n    outArray = [];\n    context.webAPI.retrieveMultipleRecords(relatedEntityName, \"?$select=\" + relatedEntityIdColumn + \",\" + relatedEntityNameColumn + \"&$filter=\" + relatedEntitySearchColumn1 + \" ne \" + \"null\") //  filter is experiemental\n    .then(function success(results) {\n      console.log(results);\n      if (results.entities.length > 0) {\n        outArray = [];\n        for (var i = 0; i < results.entities.length; i++) {\n          var isPrevious = false;\n          if (previousOptions != null) {\n            for (var j = 0; j < previousOptions.length; j++) {\n              if (results.entities[i][relatedEntityIdColumn].toString() == previousOptions[j].value) {\n                isPrevious = true;\n              } else {\n                isPrevious = false;\n              }\n            }\n          }\n          if (!isPrevious) {\n            outArray.push({\n              label: results.entities[i][relatedEntityNameColumn].toString(),\n              value: results.entities[i][relatedEntityIdColumn].toString(),\n              parentEntityId: \"\"\n            });\n          }\n        }\n      }\n      return outArray;\n    }, function (error) {\n      outArray = [];\n      console.log(error.message);\n      /*\r\n      outArray.push({\r\n        value: \"1234\",\r\n        label: \"Option 2\",\r\n        parentEntityId: \"\",\r\n      });\r\n      */\n    });\n    return outArray;\n  }\n}\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./MultiSelectCheckBoxList/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./MultiSelectCheckBoxList/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = __webpack_exports__;
/******/ 	
/******/ })()
;
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('MultiSelectCheckBoxList.MultiSelectCheckBoxList', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.MultiSelectCheckBoxList);
} else {
	var MultiSelectCheckBoxList = MultiSelectCheckBoxList || {};
	MultiSelectCheckBoxList.MultiSelectCheckBoxList = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.MultiSelectCheckBoxList;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}