define(["globalize", "loading", "libraryMenu", "emby-checkbox", "emby-button", "emby-button"], function(globalize, loading, libraryMenu) {
    "use strict";

    function getTabs() {
        return [{
            href: "library.html",
            name: Globalize.translate("HeaderLibraries")
        }, {
            href: "librarydisplay.html",
            name: Globalize.translate("TabDisplay")
        }, {
            href: "metadataimages.html",
            name: Globalize.translate("TabMetadata")
        }, {
            href: "metadatanfo.html",
            name: Globalize.translate("TabNfoSettings")
        }, {
            href: "librarysettings.html",
            name: Globalize.translate("TabAdvanced")
        }]
    }
    return function(view, params) {
        function loadData() {
            ApiClient.getServerConfiguration().then(function(config) {
                view.querySelector(".chkFolderView").checked = config.EnableFolderView, view.querySelector(".chkGroupMoviesIntoCollections").checked = config.EnableGroupingIntoCollections, view.querySelector(".chkDisplaySpecialsWithinSeasons").checked = config.DisplaySpecialsWithinSeasons, view.querySelector(".chkExternalContentInSuggestions").checked = config.EnableExternalContentInSuggestions
            })
        }
        view.querySelector("form").addEventListener("submit", function(e) {
            loading.show();
            var form = this;
            return ApiClient.getServerConfiguration().then(function(config) {
                config.EnableFolderView = form.querySelector(".chkFolderView").checked, config.EnableGroupingIntoCollections = form.querySelector(".chkGroupMoviesIntoCollections").checked, config.DisplaySpecialsWithinSeasons = form.querySelector(".chkDisplaySpecialsWithinSeasons").checked, config.EnableExternalContentInSuggestions = form.querySelector(".chkExternalContentInSuggestions").checked, ApiClient.updateServerConfiguration(config).then(Dashboard.processServerConfigurationUpdateResult)
            }), e.preventDefault(), !1
        }), view.addEventListener("viewshow", function() {
            libraryMenu.setTabs("librarysetup", 1, getTabs), loadData()
        })
    }
});