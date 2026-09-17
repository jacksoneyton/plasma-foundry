// Nightfall's panel layout: a top bar (launcher, clock, system tray) and a
// floating bottom dock (task icons, trash) — one deliberate arrangement
// instead of whatever panel setup happened to be there before.
//
// Only ships stock Plasma widgets (nothing from the KDE Store) so this
// works on a completely fresh KDE Plasma 6 install with no extra plasmoids
// to fetch first — the same "works everywhere, no assumptions" bar the
// rest of Nightfall holds itself to.
//
// Applied via: qdbus6 org.kde.plasmashell /PlasmaShell
//   org.kde.PlasmaShell.evaluateScript "$(cat nightfall-layout.js)"
//
// panelIds is a live, shifting list — removing by a cached index skips
// entries as the list shrinks underneath you. Draining it from the front
// in a while loop instead sidesteps that.
var plasma = getApiVersion(1);

while (panelIds.length > 0) {
    panelById(panelIds[0]).remove();
}

var layout = {
    "panels": [
        {
            "alignment": "center",
            "applets": [
                { "config": {}, "plugin": "org.kde.plasma.kickoff" },
                { "config": {}, "plugin": "org.kde.plasma.marginsseparator" },
                { "config": {}, "plugin": "org.kde.plasma.panelspacer" },
                { "config": {}, "plugin": "org.kde.plasma.digitalclock" },
                { "config": {}, "plugin": "org.kde.plasma.marginsseparator" },
                { "config": {}, "plugin": "org.kde.plasma.systemtray" }
            ],
            "config": {
                "/": {
                    "formfactor": "2",
                    "lastScreen": "0"
                }
            },
            "height": 3,
            "hiding": "normal",
            "location": "top",
            "maximumLength": 160,
            "minimumLength": 160,
            "offset": 0
        },
        {
            "alignment": "center",
            "applets": [
                { "config": {}, "plugin": "org.kde.plasma.icontasks" },
                { "config": {}, "plugin": "org.kde.plasma.trash" }
            ],
            "config": {
                "/": {
                    "formfactor": "2",
                    "lastScreen": "0"
                }
            },
            "height": 4,
            "hiding": "normal",
            "location": "bottom",
            "maximumLength": 160,
            "minimumLength": 160,
            "offset": 0
        }
    ],
    "serializationFormatVersion": "1"
};

plasma.loadSerializedLayout(layout);

// loadSerializedLayout's JSON schema has no "floating"/"lengthMode"/
// "opacity" keys at all — confirmed by inspecting its own output via
// dumpCurrentLayoutJS(), which never includes them either. Without this
// second pass panels come out flush against the screen edge, full-width,
// opaque — not the floating, centered, translucent pill look every
// screenshot of this design actually has. Has to be set via the
// imperative Panel API instead, which does expose them as real
// properties (confirmed on a live panel: floating=true, lengthMode=
// "fill"/"fit", opacity="adaptive"/"translucent").
for (var i = 0; i < panelIds.length; i++) {
    var p = panelById(panelIds[i]);
    p.floating = true;
    p.opacity = (p.location === "bottom") ? "translucent" : "adaptive";
    p.lengthMode = (p.location === "bottom") ? "fit" : "fill";
}
