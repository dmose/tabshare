/*global Components,Services,XPCOMUtils */
/* jshint moz: true */

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Restartless.
 *
 * The Initial Developer of the Original Code is The Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Edward Lee <edilee@mozilla.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

const {classes: Cc, interfaces: Ci, manager: Cm, utils: Cu, results: Cr} =
  Components;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

// Set various values for an about:ed service
const TSContract = "@mozilla.org/tab-source-service;1";
const TSDescription = "Simple Insecure Tab Source Service";
const TSUUID = Components.ID("C672D64A-E089-41A7-870E-90C37DB1A191");

// Create a factory that gives the about:ed service
let TSFactory = {
  createInstance: function(outer, iid) {
    if (outer != null)
      throw Cr.NS_ERROR_NO_AGGREGATION;
    Services.console.logStringMessage("about to call QI");
    return TabSourceService.QueryInterface(iid);
  }
};

// Implement about:ed
let TabSourceService = {
  QueryInterface: XPCOMUtils.generateQI([Ci.nsITabSource]),

  getTabToStream: function() {
      Services.console.logStringMessage("in getTabToStream");
      let gBrowser = Services.wm.getMostRecentWindow("navigator:browser").gBrowser;
      Services.console.logStringMessage("about to return contentWindow");
      return gBrowser.contentWindow;
  }
};

/**
 * Handle the add-on being activated on install/enable
 */
function startup(data, reason) {
  Cm.QueryInterface(Ci.nsIComponentRegistrar).
    registerFactory(TSUUID, TSDescription, TSContract, TSFactory);
}

/**
 * Handle the add-on being deactivated on uninstall/disable
 */
function shutdown(data, reason) {
  Cm.QueryInterface(Ci.nsIComponentRegistrar).
    unregisterFactory(TSUUID, TSFactory);
}

/**
 * Handle the add-on being installed
 */
function install(data, reason) {}

/**
 * Handle the add-on being uninstalled
 */
function uninstall(data, reason) {}
