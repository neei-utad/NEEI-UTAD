var map = L.map("map").setView([41.28861, -7.73897], 17);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var entradaIcon = L.icon({
  iconUrl: "images/markers/1.png",
  iconSize: [35, 35],
});
var poloIIcon = L.icon({
  iconUrl: "images/markers/2.png",
  iconSize: [35, 35],
});

var entrada = L.marker([41.28967, -7.73748], {
  icon: entradaIcon,
})
  .bindPopup("Entrada UTAD")
  .openPopup()
  .addTo(map);

var poloI = L.marker([41.28676, -7.74081], {
  icon: poloIIcon,
})
  .bindPopup("ECT Polo I")
  .openPopup()
  .addTo(map);

var caminho = L.polyline(
  [
    [41.28967, -7.73748],
    [41.28967, -7.73748],
    [41.2889038313278, -7.737902361917983],
    [41.289392, -7.739495],
    [41.28932712772795, -7.73996756137665],
    [41.287472885289155, -7.740600663224964],
    [41.28731142044198, -7.740595219787478],
    [41.28711793797456, -7.742043612567446],
    [41.28672290948874, -7.7422260027693675],
    [41.286513301565904, -7.741635916821973],
    [41.28676, -7.74081],
  ],
  { color: "lime", weight: 8 }
).addTo(map);
