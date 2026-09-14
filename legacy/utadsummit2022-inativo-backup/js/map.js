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
var coffeeBreakIcon = L.icon({
  iconUrl: "images/markers/2.png",
  iconSize: [35, 35],
});
var auditorioIcon = L.icon({
  iconUrl: "images/markers/3.png",
  iconSize: [35, 35],
});
var feiraIcon = L.icon({
  iconUrl: "images/markers/4.png",
  iconSize: [35, 35],
});
var poloIIcon = L.icon({
  iconUrl: "images/markers/5.png",
  iconSize: [35, 35],
});
var poloIIIcon = L.icon({
  iconUrl: "images/markers/6.png",
  iconSize: [35, 35],
});
var aulaMagnaIcon = L.icon({
  iconUrl: "images/markers/7.png",
  iconSize: [35, 35],
});

var entrada = L.marker([41.28967, -7.73748], {
  icon: entradaIcon,
})
  .bindPopup("Entrada UTAD")
  .openPopup()
  .addTo(map);
var coffeeBreak = L.marker([41.28829, -7.73911], {
  icon: coffeeBreakIcon,
})
  .bindPopup("Coffee Break")
  .openPopup()
  .addTo(map);
var auditorio = L.marker([41.28851, -7.73907], {
  icon: auditorioIcon,
})
  .bindPopup("Auditório AAUTAD")
  .openPopup()
  .addTo(map);
var feira = L.marker([41.28855, -7.73946], {
  icon: feiraIcon,
})
  .bindPopup("Feira de Emprego")
  .openPopup()
  .addTo(map);
var poloI = L.marker([41.28676, -7.74081], {
  icon: poloIIcon,
})
  .bindPopup("ECT Polo I")
  .openPopup()
  .addTo(map);
var aulaMagna = L.marker([41.28586, -7.74352], {
  icon: poloIIIcon,
})
  .bindPopup("ECT Polo II")
  .openPopup()
  .addTo(map);
var aulaMagna = L.marker([41.28593, -7.73854], {
  icon: aulaMagnaIcon,
})
  .bindPopup("Aula Magna")
  .openPopup()
  .addTo(map);
