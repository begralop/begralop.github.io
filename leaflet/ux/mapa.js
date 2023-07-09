var markers_manifestations = {};

var marker_cities = {};

var marker_active = {};

var marker_route = {};

var marker_active_natural = {};

var marker_active_natural_monument = {};

var marker_active_flower = {};

var marker_active_natural_event = {};

var marker_active_natural_tangibleCulturalMov = {};

var marker_active_natural_tangibleCulturalInmov = {};

var marker_active_natural_intangible = {};

var marker_active_natural_mixed = {};

var markerNow = {};

var name_cities = [];

var dataLISTA_cities = {};

var dataLISTA_grouproutes = {};

var dataLISTA_grouproutesherit = {};

var dataLISTA_hierarchies = {};

var dataLISTA_hierarhierarchies = {};

var dataLISTA_manif = {};

var customcrt = false;

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

var map = L.map("map", {
  preferCanvas: true,
  center: [40, 0],
  zoom: 2,
  gestureHandling: true,
  attributionControl: false,
});

var customControl = L.Control.extend({
  options: {
    position: "topleft",
  },

  onAdd: function (map) {
    var container = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control leaflet-control-custom"
    );

    container.style.backgroundColor = "white";
    container.style.backgroundImage =
      "url(../dist/icons/globe-europe-solid.svg)";
    container.style.backgroundSize = "26px 26px";
    container.style.width = "30px";
    container.style.height = "30px";

    container.onclick = function () {
      map.setView([40, 0], 2);
      reset();
      resetManif();
    };

    return container;
  },
});

map.addControl(new customControl());

var customControl2;

var clickManif = false;

var clickCity = false;

function createControl() {
  customControl = L.control({ position: "bottomright" });

  customControl.onAdd = function (map) {
    var container = L.DomUtil.create(
      "div",
      "leaflet-bar leaflet-control leaflet-control-custom"
    );

    container.style.backgroundColor = "white";
    container.style.backgroundImage =
      "url(../dist/icons/icons8-girar-a-la-izquierda-30.png)";
    container.style.backgroundSize = "45px 45px";
    container.style.width = "50px";
    container.style.height = "50px";

    container.onclick = function () {
      map.setView([40, 0], 7);
      customcrt = true;

      if (clickManif == true) {
        resetManif();
        reset();
        recorrerCities(
          dataLISTA_cities,
          dataLISTA_manif,
          dataLISTA_grouproutes,
          dataLISTA_grouproutesherit,
          dataLISTA_hierarchies,
          dataLISTA_hierarhierarchies
        );
      }

      if (clickCity == true) {
        if (markers_cities != undefined) {
          markers_cities.clearLayers();
        }

        if (marker_active != undefined) {
          map.removeLayer(marker_active);
        }

        if (marker_active_natural != undefined) {
          map.removeLayer(marker_active_natural);
        }

        if (marker_active_natural_monument != undefined) {
          map.removeLayer(marker_active_natural_monument);
        }

        if (marker_active_flower != undefined) {
          map.removeLayer(marker_active_flower);
        }

        if (marker_active_natural_event != undefined) {
          map.removeLayer(marker_active_natural_event);
        }

        if (marker_active_natural_tangibleCulturalMov != undefined) {
          map.removeLayer(marker_active_natural_tangibleCulturalMov);
        }

        if (marker_active_natural_tangibleCulturalInmov != undefined) {
          map.removeLayer(marker_active_natural_tangibleCulturalInmov);
        }

        if (marker_active_natural_intangible != undefined) {
          map.removeLayer(marker_active_natural_intangible);
        }

        if (marker_active_natural_mixed != undefined) {
          map.removeLayer(marker_active_natural_mixed);
        }

        if (markers_manif_naturalSite != undefined) {
          markers_manif_naturalSite.clearLayers();
        }

        if (markers_manif_naturalMonument != undefined) {
          markers_manif_naturalMonument.clearLayers();
        }

        if (markers_manif_flower != undefined) {
          markers_manif_flower.clearLayers();
        }

        if (markers_manif_naturalEvent != undefined) {
          markers_manif_naturalEvent.clearLayers();
        }

        if (markers_manif_tangibleCulturaMovable != undefined) {
          markers_manif_tangibleCulturaMovable.clearLayers();
        }

        if (markers_manif_tangibleCulturalInmovable != undefined) {
          markers_manif_tangibleCulturalInmovable.clearLayers();
        }

        if (markers_manif_IntangibleCultural != undefined) {
          markers_manif_IntangibleCultural.clearLayers();
        }

        if (markers_manif_mixed != undefined) {
          markers_manif_mixed.clearLayers();
        }
        recorrerCities(
          dataLISTA_cities,
          dataLISTA_manif,
          dataLISTA_grouproutes,
          dataLISTA_grouproutesherit,
          dataLISTA_hierarchies,
          dataLISTA_hierarhierarchies
        );
      }
    };

    return container;
  };
  customControl.addTo(map);
}

// Agrupar las ciudades, en un futuro con el tamaño podrían adaptarse estos clusters
var markers_cities = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  disableClusteringAtZoom: 10,
  zoomToBoundsOnClick: true,
  maxClusterRadius: 20,
});

var markers_manif_naturalSite = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_naturalMonument = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_flower = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_naturalEvent = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_tangibleCulturaMovable = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_tangibleCulturalInmovable = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_IntangibleCultural = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});
var markers_manif_mixed = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
  removeOutsideVisibleBounds: true,
  maxClusterRadius: 0,
});

function removeSpecialCharAndAccents(s) {
  var r = s;
  //r = r.replace(new RegExp(/\s/g), "");
  r = r.replace(new RegExp(/[àáâãäå]/g), "a");
  r = r.replace(new RegExp(/[ÁÀÂÄ]/g), "A");
  r = r.replace(new RegExp(/æ/g), "ae");
  r = r.replace(new RegExp(/ç/g), "c");
  r = r.replace(new RegExp(/[èéêë]/g), "e");
  r = r.replace(new RegExp(/[ÉÈÊË]/g), "E");
  r = r.replace(new RegExp(/[ìíîï]/g), "i");
  r = r.replace(new RegExp(/[ÍÌÏÎ]/g), "I");
  r = r.replace(new RegExp(/ñ/g), "n");
  r = r.replace(new RegExp(/Ñ/g), "N");
  r = r.replace(new RegExp(/ç/g), "c");
  r = r.replace(new RegExp(/Ç/g), "C");
  r = r.replace(new RegExp(/[òóôõö]/g), "o");
  r = r.replace(new RegExp(/[ÓÒÖÔ]/g), "O");
  r = r.replace(new RegExp(/œ/g), "oe");
  r = r.replace(new RegExp(/[ùúûü]/g), "u");
  r = r.replace(new RegExp(/[ÚÙÛÜ]/g), "U");
  r = r.replace(new RegExp(/[ýÿ]/g), "y");
  r = r.replace(new RegExp(/[']/g), "");
  return r;
}
// Remplazar espacios nuevos por -
function replaceEmptySpace(value) {
  if (value != null) {
    return value.replace(/\s/g, "-");
  } else {
    return value;
  }
}

var manif_now = {};

var lista_manifs = [];

var country;

var aux_city;

var state_reg;

function manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies, id_rutas) {
  markers_cities.clearLayers();
  reset();
  for (var i = 0; i < dataLISTA_hierarhierarchies.length; i++) {
    var id_hierar_hierarchies = dataLISTA_hierarhierarchies[i].hierarchy_id;
    var heritage_id = dataLISTA_hierarhierarchies[i].heritage_id;
    if (id_rutas == id_hierar_hierarchies) {
      for (var z = 0; z < dataLISTA_manif.length; z++) {
        manif_now = dataLISTA_manif[z].id_manif;
        if (manif_now == heritage_id) {
          lista_manifs.push(manif_now);
          console.log(aux_city);
          var arraySeparado = dataLISTA_manif[z].location_manif.split(",");
          var lat = arraySeparado[0];
          var lon = arraySeparado[1];
          var tipo = dataLISTA_manif[z].type_manif;
          var ciudad = dataLISTA_manif[z].city_manif;
          var nombre = dataLISTA_manif[z].name_manif;
          var imagen = dataLISTA_manif[z].image_manif;
          var imagen_author = dataLISTA_manif[z].image_author_manif;
          var comments = dataLISTA_manif[z].comments_manif;
          var links_interest = dataLISTA_manif[z].links_interest_manif;
          var manif_descrip =
            dataLISTA_manif[z].manifestation_short_description_local_manif;
          var name_ruta = comprobarRutamanifest(
            manif_now,
            dataLISTA_hierarhierarchies,
            dataLISTA_hierarchies
          );

          if (name_ruta == undefined) {
            name_ruta = "";
          }
          comprobarTipo(
            tipo,
            lat,
            lon,
            manif_now,
            nombre,
            ciudad,
            imagen,
            imagen_author,
            comments,
            links_interest,
            country,
            state_reg,
            aux_city,
            manif_descrip,
            name_ruta
          );
        }
      }
    }
  }
  clickManif = true;
  createControl();
}

function comprobarRutamanifest(
  id_manifest,
  dataLISTA_hierarhierarchies,
  dataLISTA_hierarchies
) {
  for (var i = 0; i < dataLISTA_hierarhierarchies.length; i++) {
    var id_hierarhierarch = dataLISTA_hierarhierarchies[i].heritage_id;
    var group_hierar_id = dataLISTA_hierarhierarchies[i].hierarchy_id;

    if (id_manifest == id_hierarhierarch) {
      for (var z = 0; z < dataLISTA_hierarchies.length; z++) {
        var hierarchies_id = dataLISTA_hierarchies[z].id;
        if (hierarchies_id == group_hierar_id) {
          var datosRutaManif = [dataLISTA_hierarchies[z].name, hierarchies_id];
          return datosRutaManif;
        }
      }
    }
  }
}

function recorrerManifest(
  ciudad_marker,
  dataLISTA_manif,
  country,
  state_reg,
  aux_city,
  dataLISTA_hierarhierarchies,
  dataLISTA_hierarchies
) {
  // Bucle que recorre la lista de manifestations de la bbdd
  for (var i = 0; i < dataLISTA_manif.length; i++) {
    var id = dataLISTA_manif[i].id_manif;
    var date_manif = dataLISTA_manif[i].date_manif;
    var org_pers_information_manif =
      dataLISTA_manif[i].org_pers_information_manif;
    var nombre = dataLISTA_manif[i].name_manif;
    var ciudad = dataLISTA_manif[i].city_manif;
    var city_id = dataLISTA_manif[i].city_manif;
    var city = dataLISTA_manif[i].city_name_aux_manif;
    var arraySeparado = dataLISTA_manif[i].location_manif.split(",");
    var lat = arraySeparado[0];
    var lon = arraySeparado[1];
    var description = dataLISTA_manif[i].manifestation_description_manif;
    var imagen = dataLISTA_manif[i].image_manif;
    var url = dataLISTA_manif[i].image_manif;
    var time_manif = dataLISTA_manif[i].time_manif;
    var tipo = dataLISTA_manif[i].type_manif;
    var imagen_author = dataLISTA_manif[i].image_author_manif;
    var unesco = dataLISTA_manif[i].protected_unesco_manif;
    var comments = dataLISTA_manif[i].comments_manif;
    var links_interest = dataLISTA_manif[i].links_interest_manif;
    var tags = dataLISTA_manif[i].tags_manif;
    var manif_descrip =
      dataLISTA_manif[i].manifestation_description_local_manif;
    var name_ruta = comprobarRutamanifest(
      id,
      dataLISTA_hierarhierarchies,
      dataLISTA_hierarchies
    );

    if (name_ruta == undefined) {
      name_ruta = "";
    }

    if (ciudad_marker == ciudad) {
      comprobarTipo(
        id,
        city_id,
        city,
        tags,
        description,
        unesco,
        url,
        tipo,
        lat,
        lon,
        id,
        nombre,
        ciudad,
        imagen,
        imagen_author,
        comments,
        links_interest,
        country,
        state_reg,
        aux_city,
        manif_descrip,
        name_ruta
      );
    }
  }

  map.addLayer(markers_manif_naturalSite);
  map.addLayer(markers_manif_naturalMonument);
  map.addLayer(markers_manif_flower);
  map.addLayer(markers_manif_naturalEvent);
  map.addLayer(markers_manif_tangibleCulturaMovable);
  map.addLayer(markers_manif_tangibleCulturalInmovable);
  map.addLayer(markers_manif_IntangibleCultural);
  map.addLayer(markers_manif_mixed);
}

function popupResources(feature, layer) {
  layer.on("click", (e) => {});
}

// Comprobar el tipo de manifestation
function comprobarTipo(
  id,
  city_id,
  city,
  tags,
  description,
  unesco,
  url,
  tipo,
  lat,
  lon,
  id,
  nombre,
  ciudad,
  imagen,
  imagen_author,
  comments,
  links_interest,
  country,
  state_reg,
  aux_city,
  manif_descrip,
  name_ruta
) {
  if (tipo == "N") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,
      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      type: tipo,
      links: links_interest,
      manif_des: manif_descrip,
      image_author_manif: imagen_author,
      name_rute: name_ruta[0],
      id_rutas: name_ruta[1],
      id: id,
      img: {
        url: "../dist/img/tree_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    markers_manifestations[id].on("click", function (layer) {
      resetManif();
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;
      links = JSON.parse(links);

      var latitud_longitud = this.getLatLng();
      var latitud = latitud_longitud.lat;
      var longitud = latitud_longitud.lng;

      marker_active_natural = L.canvasMarker(L.latLng(latitud, longitud), {
        radius: 20,
        title: ciudad,
        img: {
          url: "../dist/img/tree_marker_active.png", //image link
          size: [40, 50], //image size ( default [40, 40] )
          rotate: 0, //image base rotate ( default 0 )
          offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
        },
      }).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";
      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");
      var city_ci = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      var id_ruta = layer.target.options.id_rutas;

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      cn_html = "<h5>" + city + "</h5>";
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          ")' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });

    markers_manif_naturalSite.addLayer(markers_manifestations[id]);
  } else if (tipo == "N2") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,

      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      links: links_interest,
      manif_des: manif_descrip,
      comentarios: comments,
      name_rute: name_ruta[0],
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/landscape_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    // markers_manifestations[id].bindPopup(nombre+" /n Tipo: Monumento natural" + ciudad).openPopup();

    markers_manifestations[id].on("click", function (layer) {
      resetManif();

      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_natural_monument = L.canvasMarker(
        L.latLng(latitud, longitud),
        {
          radius: 20,
          title: ciudad,
          img: {
            url: "../dist/img/landscape_marker_active.png", //image link
            size: [40, 50], //image size ( default [40, 40] )
            rotate: 0, //image base rotate ( default 0 )
            offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
          },
        }
      ).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      // sidebar.open("home");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      cn_html = "<h5>" + city + "</h5>";
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          ")' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });

    markers_manif_naturalMonument.addLayer(markers_manifestations[id]);
  } else if (tipo == "N3") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,

      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      links: links_interest,
      name_rute: name_ruta[0],
      manif_des: manif_descrip,
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/wildlife_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    // markers_manifestations[id].bindPopup(nombre+" /n Tipo: Flora y fauna" + ciudad).openPopup();

    markers_manifestations[id].on("click", function (layer) {
      resetManif();
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_flower = L.canvasMarker(L.latLng(latitud, longitud), {
        radius: 20,
        title: ciudad,
        img: {
          url: "../dist/img/wildlife_marker_active.png", //image link
          size: [40, 50], //image size ( default [40, 40] )
          rotate: 0, //image base rotate ( default 0 )
          offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
        },
      }).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      //  sidebar.open("home");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      cn_html = "<h5>" + city + "</h5>";
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          ")' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });

    markers_manif_flower.addLayer(markers_manifestations[id]);
  } else if (tipo == "N4") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,
      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      links: links_interest,
      manif_des: manif_descrip,
      name_rute: name_ruta[0],
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/event_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    //   markers_manifestations[id].bindPopup(nombre+" /n Tipo: Natural event" + ciudad).openPopup();

    markers_manifestations[id].on("click", function (layer) {
      resetManif();
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_natural_event = L.canvasMarker(
        L.latLng(latitud, longitud),
        {
          radius: 20,
          title: ciudad,
          img: {
            url: "../dist/img/event_marker_active.png", //image link
            size: [40, 50], //image size ( default [40, 40] )
            rotate: 0, //image base rotate ( default 0 )
            offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
          },
        }
      ).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      cn_html = "<h5>" + city + "</h5>";
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          " )' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "auto",
      });
      layer.target.openPopup();
    });

    markers_manif_naturalEvent.addLayer(markers_manifestations[id]);
  } else if (tipo == "C1") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,

      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      name_rute: name_ruta[0],
      links: links_interest,
      manif_des: manif_descrip,
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/book_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });

    markers_manifestations[id].on("click", function (layer) {
      resetManif();
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_natural_tangibleCulturalMov = L.canvasMarker(
        L.latLng(latitud, longitud),
        {
          radius: 20,
          title: ciudad,
          img: {
            url: "../dist/img/book_marker_active.png", //image link
            size: [40, 50], //image size ( default [40, 40] )
            rotate: 0, //image base rotate ( default 0 )
            offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
          },
        }
      ).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      cn_html = "<h5>" + city + "</h5>";
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          ")' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });

    markers_manif_tangibleCulturaMovable.addLayer(markers_manifestations[id]);
  } else if (tipo == "I") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,

      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      links: links_interest,
      manif_des: manif_descrip,
      name_rute: name_ruta[0],
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/landmark_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    //   markers_manifestations[id].bindPopup(nombre+" /n Tipo: Tangible cultural Inmobil" + ciudad).openPopup();

    markers_manifestations[id].on("click", function (layer) {
      resetManif();
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_natural_tangibleCulturalInmov = L.canvasMarker(
        L.latLng(latitud, longitud),
        {
          radius: 20,
          title: ciudad,
          img: {
            url: "img/landmark_marker_active.png", //image link
            size: [40, 50], //image size ( default [40, 40] )
            rotate: 0, //image base rotate ( default 0 )
            offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
          },
        }
      ).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      cn_html = "<h5>" + city + "</h5>";
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          " )' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });
    markers_manif_tangibleCulturalInmovable.addLayer(
      markers_manifestations[id]
    );
  } else if (tipo == "C") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,

      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      name_rute: name_ruta[0],
      links: links_interest,
      manif_des: manif_descrip,
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/theatre_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    //   markers_manifestations[id].bindPopup(nombre+" /n Tipo: Intangible cultural" + ciudad).openPopup();

    markers_manifestations[id].on("click", function (layer) {
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      resetManif();

      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_natural_intangible = L.canvasMarker(
        L.latLng(latitud, longitud),
        {
          radius: 20,
          title: ciudad,
          img: {
            url: "../dist/img/theatre_marker_active.png", //image link
            size: [40, 50], //image size ( default [40, 40] )
            rotate: 0, //image base rotate ( default 0 )
            offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
          },
        }
      ).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var nombre_ruta = layer.target.options.name_rute;
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      cn_html = "<h5>" + city + "</h5>";
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          " )' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });

    markers_manif_IntangibleCultural.addLayer(markers_manifestations[id]);
  } else if (tipo == "M1") {
    markers_manifestations[id] = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,

      id: id,
      description: description,
      manif_descrip_local: manif_descrip,
      url: url,
      unesco: unesco,
      city_id: city_id,
      city: city,
      tags: tags,
      ciudad: nombre,
      imagen: imagen,
      comentarios: comments,
      name_rute: name_ruta[0],
      links: links_interest,
      manif_des: manif_descrip,
      image_author_manif: imagen_author,
      id_rutas: name_ruta[1],

      img: {
        url: "../dist/img/mixto_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });
    //    markers_manifestations[id].bindPopup(nombre+" /n Tipo: Mixto" + ciudad).openPopup();

    markers_manifestations[id].on("click", function (layer) {
      resetManif();
      var id = layer.target.options.id;
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;
      var img_path = "https://ocityplatform.webs.upv.es/manifestations_media/";
      var autor_img = layer.target.options.image_author_manif;
      var imagen = img_path + img;
      var comments = layer.target.options.comentarios;
      var links = layer.target.options.links;
      var manif_descr = layer.target.options.manif_des;
      var id_rutas = layer.target.options.id_rutas;
      var city_id = layer.target.options.city_id;
      var ciudad = layer.target.options.city;
      var tags = layer.target.options.tags;
      var url = layer.target.options.url;
      var uensco = layer.target.options.unesco;
      var description = layer.target.options.description;
      var type = layer.target.options.type;
      var manif_descrip_local = layer.target.options.manif_descrip_local;

      links = JSON.parse(links);

      var imagen = img_path + img;
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active_natural_mixed = L.canvasMarker(
        L.latLng(latitud, longitud),
        {
          radius: 20,
          title: ciudad,
          img: {
            url: "../dist/img/mix_marker_active.png", //image link
            size: [40, 50], //image size ( default [40, 40] )
            rotate: 0, //image base rotate ( default 0 )
            offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
          },
        }
      ).addTo(map);

      let aux_manif = removeSpecialCharAndAccents(city);
      aux_manif = replaceEmptySpace(aux_manif);
      aux_manif = aux_manif.toLowerCase();
      aux_city_minus = aux_city.toLowerCase();
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_manif +
        "-" +
        aux_city_minus +
        ".html";

      var links_url =
        "https://" +
        links[0].url.replace("http://", "").replace("https://", "");

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          id: id,
          name: city,
          description: description,
          description_local: manif_descr,
          url: url,
          hierarchy_id: id,
          hierarchy_name: "",
          tipo: type,
          unesco: unesco,
          city_id: city_id,
          city: ciudad,
          tags: tags,
          country: country,
          nombre_ruta: img,
          id_ruta: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      map.setView([latitud, longitud]);
    });

    markers_manifestations[id].on("mouseover", function (layer) {
      var city = layer.target.options.ciudad;
      var img = layer.target.options.imagen;

      var img_path =
        "https://ocityplatform.webs.upv.es/manifestations_media/picture_city/";

      var nombre_ruta = layer.target.options.name_rute;

      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }

      cn_html = "<h5>" + city + "</h5>";
      if (nombre_ruta != "") {
        cn_html +=
          "Group: <br/><a href='#' onclick='manifFilter(dataLISTA_manif, dataLISTA_hierarhierarchies," +
          id_ruta +
          " )' ><span >" +
          nombre_ruta +
          "</span></a>";
      }
      layer.target.bindPopup(cn_html, {
        closeButton: true,
        offset: [0, -15],
        autopan: false,
        maxWidth: "200",
      });
      layer.target.openPopup();
    });
    markers_manif_mixed.addLayer(markers_manifestations[id]);
  }
}

function cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit, id_rutas) {
  markers_cities.clearLayers();

  for (var i = 0; i < dataLISTA_grouproutesherit.length; i++) {
    var id_group_routes = dataLISTA_grouproutesherit[i].group_route_id;
    var heritage_id = dataLISTA_grouproutesherit[i].heritage_id;
    if (id_rutas == id_group_routes) {
      for (var z = 0; z < dataLISTA_cities.length; z++) {
        markerNow = dataLISTA_cities[z].id;
        if (markerNow == heritage_id) {
          var arraySeparado = dataLISTA_cities[z].location.split(",");
          var lat = arraySeparado[0];
          var id = dataLISTA_cities[z].id;
          var lon = arraySeparado[1];
          var ciudad = dataLISTA_cities[z].city;
          var description = dataLISTA_cities[z].city_description_en;
          var imagen = dataLISTA_cities[z].picture;
          var city_networks = dataLISTA_cities[z].cityNetworks;
          var pais = dataLISTA_cities[z].country;
          var state_region = dataLISTA_cities[z].state_region;

          var datos_route = comprobarRutaciudad(
            id,
            dataLISTA_grouproutesherit,
            dataLISTA_grouproutes
          );

          if (datos_route == undefined) {
            datos_route = "";
          }

          markerNow = L.canvasMarker(L.latLng(lat, lon), {
            radius: 20,
            title: ciudad,
            imagen: imagen,
            id: id,
            name_route: datos_route[0],
            id_rutas: datos_route[1],
            pais: pais,
            state_reg: state_region,
            city_net: city_networks,
            img: {
              url: "../dist/img/city_marker.png", //image link
              size: [30, 50], //image size ( default [40, 40] )
              rotate: 0, //image base rotate ( default 0 )
              offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
            },
          });
          markers_cities.addLayer(markerNow);

          // Al hacer click cambia en el sidebar con el título de la ciudad
          markerNow.on("click", function (layer) {
            if (marker_active != undefined) {
              map.removeLayer(marker_active);
            }

            if (marker_active_natural != undefined) {
              map.removeLayer(marker_active_natural);
            }

            if (marker_active_natural_monument != undefined) {
              map.removeLayer(marker_active_natural_monument);
            }

            if (marker_active_flower != undefined) {
              map.removeLayer(marker_active_flower);
            }

            if (marker_active_natural_event != undefined) {
              map.removeLayer(marker_active_natural_event);
            }

            if (marker_active_natural_tangibleCulturalMov != undefined) {
              map.removeLayer(marker_active_natural_tangibleCulturalMov);
            }

            if (marker_active_natural_tangibleCulturalInmov != undefined) {
              map.removeLayer(marker_active_natural_tangibleCulturalInmov);
            }

            if (marker_active_natural_intangible != undefined) {
              map.removeLayer(marker_active_natural_intangible);
            }

            if (marker_active_natural_mixed != undefined) {
              map.removeLayer(marker_active_natural_mixed);
            }

            if (markers_manif_naturalSite != undefined) {
              markers_manif_naturalSite.clearLayers();
            }

            if (markers_manif_naturalMonument != undefined) {
              markers_manif_naturalMonument.clearLayers();
            }

            if (markers_manif_flower != undefined) {
              markers_manif_flower.clearLayers();
            }

            if (markers_manif_naturalEvent != undefined) {
              markers_manif_naturalEvent.clearLayers();
            }

            if (markers_manif_tangibleCulturaMovable != undefined) {
              markers_manif_tangibleCulturaMovable.clearLayers();
            }

            if (markers_manif_tangibleCulturalInmovable != undefined) {
              markers_manif_tangibleCulturalInmovable.clearLayers();
            }

            if (markers_manif_IntangibleCultural != undefined) {
              markers_manif_IntangibleCultural.clearLayers();
            }

            if (markers_manif_mixed != undefined) {
              markers_manif_mixed.clearLayers();
            }

            var city = layer.target.options.title;
            var city_networks = layer.target.options.city_net;
            var img = layer.target.options.imagen;
            country = layer.target.options.pais;
            state_reg = layer.target.options.state_reg;
            var city_descrip = layer.target.options.city_description_local;

            // Cambiar el icono de la ciudad que se ha hecho click
            latitud_longitud = this.getLatLng();
            latitud = latitud_longitud.lat;
            longitud = latitud_longitud.lng;

            marker_active = L.canvasMarker(L.latLng(latitud, longitud), {
              radius: 20,
              title: ciudad,
              img: {
                url: "../dist/img/city_marker_active.png", //image link
                size: [40, 50], //image size ( default [40, 40] )
                rotate: 0, //image base rotate ( default 0 )
                offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
              },
            }).addTo(map);

            var img_path =
              "https://ocityplatform.webs.upv.es/manifestations_media/picture_city/";

            aux_city = removeSpecialCharAndAccents(city);
            aux_city = replaceEmptySpace(aux_city);
            let city_url =
              "https://o-city.org/OCityWeb/" +
              country +
              "/" +
              state_reg +
              "/" +
              aux_city +
              "/" +
              aux_city +
              "_heritages.html";
            var imagen_url = img_path + img;

            ciudad_marker = layer.target.options.id;

            city_net = JSON.parse(city_networks);
            var city_nets;

            for (var i = 0; i < city_net.length; i++) {
              city_nets =
                "https://" +
                city_net[i].url.replace("http://", "").replace("https://", "");
              var city_names = city_net[i].name;
            }

            recorrerManifest(
              ciudad_marker,
              dataLISTA_manif,
              country,
              state_reg,
              aux_city,
              dataLISTA_hierarhierarchies,
              dataLISTA_hierarchies
            );

            var z = Number(parseFloat(map.getZoom()).toPrecision(3));
            if (z < 11 && z > 4) {
              map.setView([latitud, longitud], 12, {
                animate: true,
                pan: {
                  duration: 1,
                },
              });
            }

            if (z > 11) {
              map.setView([latitud, longitud], z, {
                animate: true,
                pan: {
                  duration: 1,
                },
              });
            }
            if (z == 2) {
              map.setView([latitud, longitud], 7, {
                animate: true,
                pan: {
                  duration: 1,
                },
              });
            }
          });

          markerNow.on("mouseover", function (layer) {
            var city = layer.target.options.title;
            var city_networks = layer.target.options.city_net;
            var img = layer.target.options.imagen;
            country = layer.target.options.pais;
            state_reg = layer.target.options.state_reg;
            var nombre_ruta = layer.target.options.name_route;
            var id_ruta = layer.target.options.id_rutas;

            // Cambiar el icono de la ciudad que se ha hecho click
            latitud_longitud = this.getLatLng();
            latitud = latitud_longitud.lat;
            longitud = latitud_longitud.lng;

            if (nombre_ruta == undefined) {
              nombre_ruta = "";
            }
            // var cn_html = "";
            var img_path =
              "https://ocityplatform.webs.upv.es/manifestations_media/picture_city/";

            aux_city = removeSpecialCharAndAccents(city);
            aux_city = replaceEmptySpace(aux_city);
            let city_url =
              "https://o-city.org/OCityWeb/" +
              country +
              "/" +
              state_reg +
              "/" +
              aux_city +
              "/" +
              aux_city +
              "_heritages.html";

            //HAY CITY NETWORKS
            if (city_networks.length > 0 && city_networks[0].name != "") {
              cn_html = "<h5>" + city + "</h5>";
              if (nombre_ruta != "") {
                cn_html +=
                  "Group: <br/><a href='#' onclick='cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit," +
                  id_ruta +
                  " )' ><span >" +
                  nombre_ruta +
                  "</span></a>";
              }
              layer.target.bindPopup(cn_html, {
                closeButton: true,
                maxWidth: "200",
                autopan: false,
                offset: [0, -15],
                closeOnClick: true,
              });
              layer.target.openPopup();
            }
            //NO HAY CITY NETWORKS
            else {
              if (map.getZoom() >= 11) {
                cn_html = "<h5>" + nombre_ruta + "</h5>";
                if (nombre_ruta != "") {
                  ("");
                  cn_html +=
                    "Group: <br/><a href='#' onclick='cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit," +
                    id_ruta +
                    " )' ><span >" +
                    nombre_ruta +
                    "</span></a>";
                }
                layer.target.bindPopup(cn_html, {
                  closeButton: true,
                  maxWidth: "200",
                  autopan: false,
                  offset: [0, -15],
                  closeOnClick: true,
                });
                layer.target.openPopup();
              }
            }
          });
        }
      }
    }
  }
  map.addLayer(markers_cities);

  clickCity = true;
  createControl();
}

function getData() {
  $.ajax({
    type: "GET", // Para POST sustituir por "POST"
    url: "../conexiones/getData.php",
  }).done((res) => {
    var json = JSON.parse(res);
    dataLISTA_cities = json[0];
    dataLISTA_manif = json[1];
    dataLISTA_grouproutes = json[2];
    dataLISTA_grouproutesherit = json[3];
    dataLISTA_hierarchies = json[4];
    dataLISTA_hierarhierarchies = json[5];
    recorrerCities(
      dataLISTA_cities,
      dataLISTA_manif,
      dataLISTA_grouproutes,
      dataLISTA_grouproutesherit,
      dataLISTA_hierarchies,
      dataLISTA_hierarhierarchies
    );
  });
}

function comprobarRutaciudad(
  id_ciudad,
  dataLISTA_grouproutesherit,
  dataLISTA_grouproutes
) {
  for (var i = 0; i < dataLISTA_grouproutesherit.length; i++) {
    var id_routeherit = dataLISTA_grouproutesherit[i].heritage_id;
    var group_herit_id = dataLISTA_grouproutesherit[i].group_route_id;

    if (id_ciudad == id_routeherit) {
      for (var z = 0; z < dataLISTA_grouproutes.length; z++) {
        var group_route_id = dataLISTA_grouproutes[z].id;

        if (group_herit_id == group_route_id) {
          var datosRutaCiudad = [dataLISTA_grouproutes[z].name, group_route_id];
          return datosRutaCiudad;
        }
      }
    }
  }
}

var data = [];

function recorrerCities(
  dataLISTA_cities,
  dataLISTA_manif,
  dataLISTA_grouproutes,
  dataLISTA_grouproutesherit,
  dataLISTA_hierarchies,
  dataLISTA_hierarhierarchies
) {
  if (customcrt == true) {
    customcrt = false;
    clickCity = false;
    clickManif = false;

    map.removeControl(customControl);
  }

  // Bucle que recorre la lista de cities de la bbdd
  for (var i = 0; i < dataLISTA_cities.length; i++) {
    markerNow = dataLISTA_cities[i].id; // ID CIUDAD
    var arraySeparado = dataLISTA_cities[i].location.split(",");
    var lat = arraySeparado[0];
    var id = dataLISTA_cities[i].id;
    var lon = arraySeparado[1];
    var ciudad = dataLISTA_cities[i].city;
    var description = dataLISTA_cities[i].city_description_en;
    var imagen = dataLISTA_cities[i].picture;
    var city_networks = dataLISTA_cities[i].cityNetworks;
    var pais = dataLISTA_cities[i].country;
    var state_region = dataLISTA_cities[i].state_region;
    data = dataLISTA_cities[i];

    var datos_route = comprobarRutaciudad(
      id,
      dataLISTA_grouproutesherit,
      dataLISTA_grouproutes
    );

    if (datos_route == undefined) {
      datos_route = "";
    }

    markerNow = L.canvasMarker(L.latLng(lat, lon), {
      radius: 20,
      title: ciudad,
      imagen: imagen,
      id: id,
      name_route: datos_route[0],
      id_rutas: datos_route[1],
      pais: pais,
      state_reg: state_region,
      city_net: city_networks,
      img: {
        url: "../dist/img/city_marker.png", //image link
        size: [30, 50], //image size ( default [40, 40] )
        rotate: 0, //image base rotate ( default 0 )
        offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
      },
    });

    //markerNow.addTo(map);

    markers_cities.addLayer(markerNow);
    name_cities.push(ciudad);

    // Al hacer click cambia en el sidebar con el título de la ciudad
    markerNow.on("click", function (layer) {
      reset();
      var id = layer.target.options.id;
      var city = layer.target.options.title;
      var city_networks = layer.target.options.city_net;
      var img = layer.target.options.imagen;
      country = layer.target.options.pais;
      state_reg = layer.target.options.state_reg;
      var city_descrip = layer.target.options.city_description_local;
      var point = layer.target.options.punto;

      //window.parent.window.postMessage(point,"*");
      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      marker_active = L.canvasMarker(L.latLng(latitud, longitud), {
        radius: 20,
        title: ciudad,
        img: {
          url: "../dist/img/city_marker_active.png", //image link
          size: [50, 70], //image size ( default [40, 40] )
          rotate: 0, //image base rotate ( default 0 )
          offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
        },
      }).addTo(map);

      var img_path =
        "https://ocityplatform.webs.upv.es/manifestations_media/picture_city/";

      aux_city = removeSpecialCharAndAccents(city);
      aux_city = replaceEmptySpace(aux_city);
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_city +
        "_heritages.html";
      var imagen_url = img_path + img;

      ciudad_marker = layer.target.options.id;

      city_net = JSON.parse(city_networks);
      var city_nets;

      for (var i = 0; i < city_net.length; i++) {
        city_nets =
          "https://" +
          city_net[i].url.replace("http://", "").replace("https://", "");
        var city_names = city_net[i].name;
      }

      var geojsonFeaturePoint = {
        type: "Feature",
        properties: {
          NAME: city,
          COUNTRY: country,
          ID: id,
          ENROLLEMENT_LETTER: "d",
          CITY_NETWORKS: city_net,
          IMG: img,
        },
        geometry: {
          type: "Point",
          coordinates: [latitud, longitud],
        },
      };

      var point = new L.geoJson(geojsonFeaturePoint, {});

      window.parent.window.postMessage(geojsonFeaturePoint, "*");

      recorrerManifest(
        ciudad_marker,
        dataLISTA_manif,
        country,
        state_reg,
        aux_city,
        dataLISTA_hierarhierarchies,
        dataLISTA_hierarchies
      );

      var z = Number(parseFloat(map.getZoom()).toPrecision(3));
      if (z < 11 && z > 4) {
        map.setView([latitud, longitud], 12, {
          animate: true,
          pan: {
            duration: 1,
          },
        });
      }

      if (z > 11) {
        map.setView([latitud, longitud], z, {
          animate: true,
          pan: {
            duration: 1,
          },
        });
      }
      if (z == 2) {
        map.setView([latitud, longitud], 7, {
          animate: true,
          pan: {
            duration: 1,
          },
        });
      }
    });

    markerNow.on("mouseover", function (layer) {
      var city = layer.target.options.title;
      var city_networks = layer.target.options.city_net;
      var img = layer.target.options.imagen;
      country = layer.target.options.pais;
      state_reg = layer.target.options.state_reg;
      var nombre_ruta = layer.target.options.name_route;
      var id_ruta = layer.target.options.id_rutas;

      // Cambiar el icono de la ciudad que se ha hecho click
      latitud_longitud = this.getLatLng();
      latitud = latitud_longitud.lat;
      longitud = latitud_longitud.lng;

      if (nombre_ruta == undefined) {
        nombre_ruta = "";
      }
      // var cn_html = "";
      var img_path =
        "https://ocityplatform.webs.upv.es/manifestations_media/picture_city/";

      aux_city = removeSpecialCharAndAccents(city);
      aux_city = replaceEmptySpace(aux_city);
      let city_url =
        "https://o-city.org/OCityWeb/" +
        country +
        "/" +
        state_reg +
        "/" +
        aux_city +
        "/" +
        aux_city +
        "_heritages.html";

      //HAY CITY NETWORKS
      if (city_networks.length > 0 && city_networks[0].name != "") {
        cn_html = "<h5>" + city + "</h5>";
        if (nombre_ruta != "") {
          cn_html +=
            "Group: <br/><a href='#' onclick='cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit," +
            id_ruta +
            " )' ><span >" +
            nombre_ruta +
            "</span></a>";
        }
        layer.target.bindPopup(cn_html, {
          closeButton: true,
          maxWidth: "200",
          autopan: false,
          offset: [0, -15],
          closeOnClick: true,
        });
        layer.target.openPopup();
      }
      //NO HAY CITY NETWORKS
      else {
        if (map.getZoom() >= 11) {
          cn_html = "<h5>" + nombre_ruta + "</h5>";
          if (nombre_ruta != "") {
            ("");
            cn_html +=
              "Group: <br/><a href='#' onclick='cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit," +
              id_ruta +
              " )' ><span >" +
              nombre_ruta +
              "</span></a>";
          }
          layer.target.bindPopup(cn_html, {
            closeButton: true,
            maxWidth: "200",
            autopan: false,
            offset: [0, -15],
            closeOnClick: true,
          });
          layer.target.openPopup();
        }
      }
    });
  }
  map.addLayer(markers_cities);
}

function resetManif() {
  if (marker_active_natural != undefined) {
    map.removeLayer(marker_active_natural);
  }

  if (marker_active_natural_monument != undefined) {
    map.removeLayer(marker_active_natural_monument);
  }

  if (marker_active_flower != undefined) {
    map.removeLayer(marker_active_flower);
  }

  if (marker_active_natural_event != undefined) {
    map.removeLayer(marker_active_natural_event);
  }

  if (marker_active_natural_tangibleCulturalMov != undefined) {
    map.removeLayer(marker_active_natural_tangibleCulturalMov);
  }

  if (marker_active_natural_tangibleCulturalInmov != undefined) {
    map.removeLayer(marker_active_natural_tangibleCulturalInmov);
  }

  if (marker_active_natural_intangible != undefined) {
    map.removeLayer(marker_active_natural_intangible);
  }

  if (marker_active_natural_mixed != undefined) {
    map.removeLayer(marker_active_natural_mixed);
  }
}

function reset() {
  // Elimino el anterior para que no de problemas

  if (markerNow != undefined) {
    map.removeLayer(markerNow);
  }

  if (marker_active != undefined) {
    map.removeLayer(marker_active);
  }

  if (marker_active_natural != undefined) {
    map.removeLayer(marker_active_natural);
  }

  if (marker_active_natural_monument != undefined) {
    map.removeLayer(marker_active_natural_monument);
  }

  if (marker_active_flower != undefined) {
    map.removeLayer(marker_active_flower);
  }

  if (marker_active_natural_event != undefined) {
    map.removeLayer(marker_active_natural_event);
  }

  if (marker_active_natural_tangibleCulturalMov != undefined) {
    map.removeLayer(marker_active_natural_tangibleCulturalMov);
  }

  if (marker_active_natural_tangibleCulturalInmov != undefined) {
    map.removeLayer(marker_active_natural_tangibleCulturalInmov);
  }

  if (marker_active_natural_intangible != undefined) {
    map.removeLayer(marker_active_natural_intangible);
  }

  if (marker_active_natural_mixed != undefined) {
    map.removeLayer(marker_active_natural_mixed);
  }

  if (markers_manif_naturalSite != undefined) {
    markers_manif_naturalSite.clearLayers();
  }

  if (markers_manif_naturalMonument != undefined) {
    markers_manif_naturalMonument.clearLayers();
  }

  if (markers_manif_flower != undefined) {
    markers_manif_flower.clearLayers();
  }

  if (markers_manif_naturalEvent != undefined) {
    markers_manif_naturalEvent.clearLayers();
  }

  if (markers_manif_tangibleCulturaMovable != undefined) {
    markers_manif_tangibleCulturaMovable.clearLayers();
  }

  if (markers_manif_tangibleCulturalInmovable != undefined) {
    markers_manif_tangibleCulturalInmovable.clearLayers();
  }

  if (markers_manif_IntangibleCultural != undefined) {
    markers_manif_IntangibleCultural.clearLayers();
  }

  if (markers_manif_mixed != undefined) {
    markers_manif_mixed.clearLayers();
  }
}

getData();

var baseMapLayer = L.esri.basemapLayer("ShadedRelief").addTo(map);

var layer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
    edgeBufferTiles: 2,
  }
);

var city_search;

// Función para buscar coincidencias en la lista de ciudades
function searchCities(query) {
  if (query.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  const matchedCities = name_cities.filter((city) =>
    city.toLowerCase().startsWith(query.toLowerCase())
  );

  displayResults(matchedCities);
}

// Función para mostrar los resultados de búsqueda
function displayResults(matchedCities) {
  const html = matchedCities.map((city) => `<li>${city}</li>`).join("");

  searchResults.innerHTML = html;
}

// Evento de entrada de texto en la barra de búsqueda
searchInput.addEventListener("input", function () {
  const query = this.value;
  searchCities(query);
});

// Evento de clic en un resultado de búsqueda
searchResults.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    searchInput.value = e.target.innerText;
    searchResults.innerHTML = "";
    city_search = searchInput.value;
    citySearch(city_search, dataLISTA_cities);
  }
});
function citySearch(city_search, dataLISTA_cities) {
  for (var i = 0; i < dataLISTA_cities.length; i++) {
    var ciudad = dataLISTA_cities[i].city;

    if (city_search == ciudad) {
      markerNow = dataLISTA_cities[i].id; // ID CIUDAD
      var arraySeparado = dataLISTA_cities[i].location.split(",");
      var id = dataLISTA_cities[i].id;
      var lat = arraySeparado[0];
      var id = dataLISTA_cities[i].id;
      var lon = arraySeparado[1];
      ciudad_marker = id;

      map.setView([lat, lon], 12, {
        animate: true,
        pan: {
          duration: 1,
        },
      });

      recorrerManifest(
        ciudad_marker,
        dataLISTA_manif,
        country,
        state_reg,
        aux_city,
        dataLISTA_hierarhierarchies,
        dataLISTA_hierarchies
      );

      // Al hacer click cambia en el sidebar con el título de la ciudad
      markerNow.on("click", function (layer) {});

      markerNow.on("mouseover", function (layer) {
        var city = layer.target.options.title;
        var city_networks = layer.target.options.city_net;
        var img = layer.target.options.imagen;
        country = layer.target.options.pais;
        state_reg = layer.target.options.state_reg;
        var nombre_ruta = layer.target.options.name_route;
        var id_ruta = layer.target.options.id_rutas;

        // Cambiar el icono de la ciudad que se ha hecho click
        latitud_longitud = this.getLatLng();
        latitud = latitud_longitud.lat;
        longitud = latitud_longitud.lng;

        if (nombre_ruta == undefined) {
          nombre_ruta = "";
        }
        // var cn_html = "";
        var img_path =
          "https://ocityplatform.webs.upv.es/manifestations_media/picture_city/";

        aux_city = removeSpecialCharAndAccents(city);
        aux_city = replaceEmptySpace(aux_city);
        let city_url =
          "https://o-city.org/OCityWeb/" +
          country +
          "/" +
          state_reg +
          "/" +
          aux_city +
          "/" +
          aux_city +
          "_heritages.html";

        //HAY CITY NETWORKS
        if (city_networks.length > 0 && city_networks[0].name != "") {
          cn_html = "<h5>" + city + "</h5>";
          if (nombre_ruta != "") {
            cn_html +=
              "Group: <br/><a href='#' onclick='cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit," +
              id_ruta +
              " )' ><span >" +
              nombre_ruta +
              "</span></a>";
          }
          layer.target.bindPopup(cn_html, {
            closeButton: true,
            maxWidth: "200",
            autopan: false,
            offset: [0, -15],
            closeOnClick: true,
          });
          layer.target.openPopup();
        }
        //NO HAY CITY NETWORKS
        else {
          if (map.getZoom() >= 11) {
            cn_html = "<h5>" + nombre_ruta + "</h5>";
            if (nombre_ruta != "") {
              ("");
              cn_html +=
                "Group: <br/><a href='#' onclick='cityFilter(dataLISTA_cities, dataLISTA_grouproutesherit," +
                id_ruta +
                " )' ><span >" +
                nombre_ruta +
                "</span></a>";
            }
            layer.target.bindPopup(cn_html, {
              closeButton: true,
              maxWidth: "200",
              autopan: false,
              offset: [0, -15],
              closeOnClick: true,
            });
            layer.target.openPopup();
          }
        }
      });
    }
    map.addLayer(markers_cities);
  }
}
var borders;

//añadimos el mapa desde inicio de ciudades
map.on("zoom", function () {
  var z = Number(parseFloat(map.getZoom()).toPrecision(3));
  //Capa de mapa base
  if (z < 7) {
    resetManif();
    reset();
    mapNoBorders();
  }
  if (z >= 7) {
    mapBorders();
  }
});

map.on("click", function () {
  //.close();
});

function mapNoBorders() {
  map.removeLayer(layer);
  baseMapLayer.addTo(map);
}

function mapBorders() {
  map.removeLayer(baseMapLayer);
  layer.addTo(map);
}

// Control de escala
L.control.scale().addTo(map);

var basemaps = {
  Mapa: baseMapLayer,
};

var overlayMaps = {
  "Sitio natural": markers_manif_naturalSite,
  "Monumento natural": markers_manif_naturalMonument,
  "Flora y fauna": markers_manif_flower,
  "Evento natural": markers_manif_naturalEvent,
  "Tangible cultural mobil": markers_manif_tangibleCulturaMovable,
  "Tangible cultural inmobil": markers_manif_tangibleCulturalInmovable,
  "Intangible cultural": markers_manif_IntangibleCultural,
  Mixto: markers_manif_mixed,
};

L.control.layers(basemaps, overlayMaps).addTo(map);