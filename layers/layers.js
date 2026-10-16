var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });

        var lyr_GoogleHybrid_1 = new ol.layer.Tile({
            'title': 'Google Hybrid',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '<a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            })
        });

        var lyr_ESRITopo_2 = new ol.layer.Tile({
            'title': 'ESRI Topo',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
            })
        });
var format_Municipioscomaltopotencialenergticosolar_3 = new ol.format.GeoJSON();
var jsonSource_Municipioscomaltopotencialenergticosolar_3 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_Municipioscomaltopotencialenergticosolar_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Municipioscomaltopotencialenergticosolar_3, 
                style: style_Municipioscomaltopotencialenergticosolar_3,
                popuplayertitle: 'Municipios com alto potencial energético solar',
                interactive: true,
                title: '<img src="styles/legend/Municipioscomaltopotencialenergticosolar_3.png" /> Municipios com alto potencial energético solar'
            });

fetchWFSMunicipioscomaltopotencialenergticosolar_3Data(lyr_Municipioscomaltopotencialenergticosolar_3.get('title'), function (error, response) {
    var features_Municipioscomaltopotencialenergticosolar_3;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_Municipioscomaltopotencialenergticosolar_3 = format_Municipioscomaltopotencialenergticosolar_3.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_Municipioscomaltopotencialenergticosolar_3 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_Municipioscomaltopotencialenergticosolar_3 && features_Municipioscomaltopotencialenergticosolar_3.length > 0) {
            jsonSource_Municipioscomaltopotencialenergticosolar_3.addFeatures(features_Municipioscomaltopotencialenergticosolar_3);
        } else {
            lyr_Municipioscomaltopotencialenergticosolar_3.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_Municipioscomaltopotencialenergticosolar_3.get('title'));
            console.warn("No features loaded for Municipioscomaltopotencialenergticosolar_3");
        }
    } catch (e) {
        console.error("Error parsing WFS for Municipioscomaltopotencialenergticosolar_3:", e);
    }
});
var lyr_PotencialEnergticoSolar_4 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mapa_potencial_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Potencial Energético Solar<br />\
                                    <img src="styles/legend/PotencialEnergticoSolar_5_0.png" /> 0,00<br />\
                                    <img src="styles/legend/PotencialEnergticoSolar_5_1.png" /> 0,49<br />\
                                    <img src="styles/legend/PotencialEnergticoSolar_5_2.png" /> 0,97<br />',
                            popuplayertitle: 'Potencial Energético Solar',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_PotencialEnergticoSolar_4, 0]);
var lyr_reaoptasaimplantaodeenergiasolar_5 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mapa_aptidao_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Áreas aptas a implantação de energia solar<br />\
                            <img src="styles/legend/reasaptasaimplantaodeenergiasolar_4_1.png" /> Áreas aptas<br />',
                            popuplayertitle: 'Área optas a implantação de energia solar',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_reaoptasaimplantaodeenergiasolar_5, 0]);
var lyr_Restrioporcorpohdrico_6 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mask_agua_pi_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Restrição por corpo hídrico<br />\
                                    <img src="styles/legend/Restrioporcorpohdrico_6_0.png" /> Área restrita (corpo hídrico)<br />\
                                    <img src="styles/legend/Restrioporcorpohdrico_6_1.png" /> Área apta<br />',
                            popuplayertitle: 'Restrição por corpo hídrico',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Restrioporcorpohdrico_6, 0]);
var lyr_Restrioporreadeconservao_7 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mask_conservacao_pi_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Restrição por área de conservação<br />\
                                    <img src="styles/legend/Restrioporreadeconservao_7_0.png" /> Área restrita (unidade de conservação)<br />\
                                    <img src="styles/legend/Restrioporreadeconservao_7_1.png" /> Área apta<br />',
                            popuplayertitle: 'Restrição por área de conservação',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Restrioporreadeconservao_7, 0]);
var lyr_Restrioporvegetaonatural_8 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mask_florestas_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Restrição por vegetação natural<br />\
                            <img src="styles/legend/Restrioporvegetaonatural_8_0.png" /> Área restrita (vegetação natural)<br />\
                            <img src="styles/legend/Restrioporvegetaonatural_8_1.png" /> Área apta<br />',
                            popuplayertitle: 'Restrição por vegetação natural',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Restrioporvegetaonatural_8, 0]);
var lyr_Restriopordeclividade_9 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mask_declividade_pi_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Restrição por declividade<br />\
                                    <img src="styles/legend/Restriopordeclividade_9_0.png" /> Área restrita (>8°)<br />\
                                    <img src="styles/legend/Restriopordeclividade_9_1.png" /> Área apta (< 8°)<br />',
                            popuplayertitle: 'Restrição por declividade',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Restriopordeclividade_9, 0]);
var lyr_Restrioreaurbana_10 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:mask_urbano_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Restrição por área urbana<br />\
                            <img src="styles/legend/Restrioporreaurbana_10_0.png" /> Área restrita (área urbana)<br />\
                            <img src="styles/legend/Restrioporreaurbana_10_1.png" /> Área apta<br />',
                            popuplayertitle: 'Restrição área urbana',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Restrioreaurbana_10, 0]);
var format_Linhadetransmissoplanejado_11 = new ol.format.GeoJSON();
var jsonSource_Linhadetransmissoplanejado_11 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_Linhadetransmissoplanejado_11 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Linhadetransmissoplanejado_11, 
                style: style_Linhadetransmissoplanejado_11,
                popuplayertitle: 'Linha de transmissão planejado',
                interactive: true,
                title: '<img src="styles/legend/Linhadetransmissoplanejado_11.png" /> Linha de transmissão planejado'
            });

fetchWFSLinhadetransmissoplanejado_11Data(lyr_Linhadetransmissoplanejado_11.get('title'), function (error, response) {
    var features_Linhadetransmissoplanejado_11;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_Linhadetransmissoplanejado_11 = format_Linhadetransmissoplanejado_11.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_Linhadetransmissoplanejado_11 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_Linhadetransmissoplanejado_11 && features_Linhadetransmissoplanejado_11.length > 0) {
            jsonSource_Linhadetransmissoplanejado_11.addFeatures(features_Linhadetransmissoplanejado_11);
        } else {
            lyr_Linhadetransmissoplanejado_11.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_Linhadetransmissoplanejado_11.get('title'));
            console.warn("No features loaded for Linhadetransmissoplanejado_11");
        }
    } catch (e) {
        console.error("Error parsing WFS for Linhadetransmissoplanejado_11:", e);
    }
});
var format_SubestaesExpansoPlanejada_12 = new ol.format.GeoJSON();
var jsonSource_SubestaesExpansoPlanejada_12 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_SubestaesExpansoPlanejada_12 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SubestaesExpansoPlanejada_12, 
                style: style_SubestaesExpansoPlanejada_12,
                popuplayertitle: 'Subestações Expansão Planejada',
                interactive: true,
                title: '<img src="styles/legend/SubestaesExpansoPlanejada_12.png" /> Subestações Expansão Planejada'
            });

fetchWFSSubestaesExpansoPlanejada_12Data(lyr_SubestaesExpansoPlanejada_12.get('title'), function (error, response) {
    var features_SubestaesExpansoPlanejada_12;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_SubestaesExpansoPlanejada_12 = format_SubestaesExpansoPlanejada_12.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_SubestaesExpansoPlanejada_12 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_SubestaesExpansoPlanejada_12 && features_SubestaesExpansoPlanejada_12.length > 0) {
            jsonSource_SubestaesExpansoPlanejada_12.addFeatures(features_SubestaesExpansoPlanejada_12);
        } else {
            lyr_SubestaesExpansoPlanejada_12.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_SubestaesExpansoPlanejada_12.get('title'));
            console.warn("No features loaded for SubestaesExpansoPlanejada_12");
        }
    } catch (e) {
        console.error("Error parsing WFS for SubestaesExpansoPlanejada_12:", e);
    }
});
var format_SubestaesBaseExistente_13 = new ol.format.GeoJSON();
var jsonSource_SubestaesBaseExistente_13 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_SubestaesBaseExistente_13 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SubestaesBaseExistente_13, 
                style: style_SubestaesBaseExistente_13,
                popuplayertitle: 'Subestações Base Existente',
                interactive: true,
                title: '<img src="styles/legend/SubestaesBaseExistente_13.png" /> Subestações Base Existente'
            });

fetchWFSSubestaesBaseExistente_13Data(lyr_SubestaesBaseExistente_13.get('title'), function (error, response) {
    var features_SubestaesBaseExistente_13;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_SubestaesBaseExistente_13 = format_SubestaesBaseExistente_13.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_SubestaesBaseExistente_13 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_SubestaesBaseExistente_13 && features_SubestaesBaseExistente_13.length > 0) {
            jsonSource_SubestaesBaseExistente_13.addFeatures(features_SubestaesBaseExistente_13);
        } else {
            lyr_SubestaesBaseExistente_13.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_SubestaesBaseExistente_13.get('title'));
            console.warn("No features loaded for SubestaesBaseExistente_13");
        }
    } catch (e) {
        console.error("Error parsing WFS for SubestaesBaseExistente_13:", e);
    }
});
var format_Linhadetransmissaoexistente_14 = new ol.format.GeoJSON();
var jsonSource_Linhadetransmissaoexistente_14 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_Linhadetransmissaoexistente_14 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Linhadetransmissaoexistente_14, 
                style: style_Linhadetransmissaoexistente_14,
                popuplayertitle: 'Linha de transmissao existente',
                interactive: true,
                title: '<img src="styles/legend/Linhadetransmissaoexistente_14.png" /> Linha de transmissao existente'
            });

fetchWFSLinhadetransmissaoexistente_14Data(lyr_Linhadetransmissaoexistente_14.get('title'), function (error, response) {
    var features_Linhadetransmissaoexistente_14;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_Linhadetransmissaoexistente_14 = format_Linhadetransmissaoexistente_14.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_Linhadetransmissaoexistente_14 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_Linhadetransmissaoexistente_14 && features_Linhadetransmissaoexistente_14.length > 0) {
            jsonSource_Linhadetransmissaoexistente_14.addFeatures(features_Linhadetransmissaoexistente_14);
        } else {
            lyr_Linhadetransmissaoexistente_14.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_Linhadetransmissaoexistente_14.get('title'));
            console.warn("No features loaded for Linhadetransmissaoexistente_14");
        }
    } catch (e) {
        console.error("Error parsing WFS for Linhadetransmissaoexistente_14:", e);
    }
});
var format_usinas_foto_editado_15 = new ol.format.GeoJSON();
var features_usinas_foto_editado_15 = format_usinas_foto_editado_15.readFeatures(json_usinas_foto_editado_15, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_usinas_foto_editado_15 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_usinas_foto_editado_15.addFeatures(features_usinas_foto_editado_15);
var lyr_usinas_foto_editado_15 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_usinas_foto_editado_15, 
                style: style_usinas_foto_editado_15,
                popuplayertitle: 'Usinas Fotovotaicas',
                interactive: true,
                title: '<img src="styles/legend/usinas_foto_editado_15.png" /> Usinas Fotovotaicas'
            });
var format_CadastroAmbientalRuralCAR_16 = new ol.format.GeoJSON();
var jsonSource_CadastroAmbientalRuralCAR_16 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_CadastroAmbientalRuralCAR_16 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CadastroAmbientalRuralCAR_16, 
                style: style_CadastroAmbientalRuralCAR_16,
                popuplayertitle: 'Cadastro Ambiental Rural (CAR)',
                interactive: true,
                title: '<img src="styles/legend/CadastroAmbientalRuralCAR_16.png" /> Cadastro Ambiental Rural (CAR)'
            });

fetchWFSCadastroAmbientalRuralCAR_16Data(lyr_CadastroAmbientalRuralCAR_16.get('title'), function (error, response) {
    var features_CadastroAmbientalRuralCAR_16;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_CadastroAmbientalRuralCAR_16 = format_CadastroAmbientalRuralCAR_16.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_CadastroAmbientalRuralCAR_16 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_CadastroAmbientalRuralCAR_16 && features_CadastroAmbientalRuralCAR_16.length > 0) {
            jsonSource_CadastroAmbientalRuralCAR_16.addFeatures(features_CadastroAmbientalRuralCAR_16);
        } else {
            lyr_CadastroAmbientalRuralCAR_16.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_CadastroAmbientalRuralCAR_16.get('title'));
            console.warn("No features loaded for CadastroAmbientalRuralCAR_16");
        }
    } catch (e) {
        console.error("Error parsing WFS for CadastroAmbientalRuralCAR_16:", e);
    }
});
var format_SistemadeGestoFundiriaSIGEF_17 = new ol.format.GeoJSON();
var jsonSource_SistemadeGestoFundiriaSIGEF_17 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_SistemadeGestoFundiriaSIGEF_17 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_SistemadeGestoFundiriaSIGEF_17, 
                style: style_SistemadeGestoFundiriaSIGEF_17,
                popuplayertitle: 'Sistema de Gestão Fundiária (SIGEF)',
                interactive: true,
                title: '<img src="styles/legend/SistemadeGestoFundiriaSIGEF_17.png" /> Sistema de Gestão Fundiária (SIGEF)'
            });

fetchWFSSistemadeGestoFundiriaSIGEF_17Data(lyr_SistemadeGestoFundiriaSIGEF_17.get('title'), function (error, response) {
    var features_SistemadeGestoFundiriaSIGEF_17;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_SistemadeGestoFundiriaSIGEF_17 = format_SistemadeGestoFundiriaSIGEF_17.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_SistemadeGestoFundiriaSIGEF_17 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_SistemadeGestoFundiriaSIGEF_17 && features_SistemadeGestoFundiriaSIGEF_17.length > 0) {
            jsonSource_SistemadeGestoFundiriaSIGEF_17.addFeatures(features_SistemadeGestoFundiriaSIGEF_17);
        } else {
            lyr_SistemadeGestoFundiriaSIGEF_17.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_SistemadeGestoFundiriaSIGEF_17.get('title'));
            console.warn("No features loaded for SistemadeGestoFundiriaSIGEF_17");
        }
    } catch (e) {
        console.error("Error parsing WFS for SistemadeGestoFundiriaSIGEF_17:", e);
    }
});
var format_BiomasMAPBIOMAS_18 = new ol.format.GeoJSON();
var jsonSource_BiomasMAPBIOMAS_18 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_BiomasMAPBIOMAS_18 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_BiomasMAPBIOMAS_18, 
                style: style_BiomasMAPBIOMAS_18,
                popuplayertitle: 'Biomas (MAPBIOMAS)',
                interactive: true,
    title: 'Biomas (MAPBIOMAS)<br />\
    <img src="styles/legend/BiomasMAPBIOMAS_18_0.png" /> Caatinga<br />\
    <img src="styles/legend/BiomasMAPBIOMAS_18_1.png" /> Cerrado<br />' });

fetchWFSBiomasMAPBIOMAS_18Data(lyr_BiomasMAPBIOMAS_18.get('title'), function (error, response) {
    var features_BiomasMAPBIOMAS_18;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_BiomasMAPBIOMAS_18 = format_BiomasMAPBIOMAS_18.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_BiomasMAPBIOMAS_18 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_BiomasMAPBIOMAS_18 && features_BiomasMAPBIOMAS_18.length > 0) {
            jsonSource_BiomasMAPBIOMAS_18.addFeatures(features_BiomasMAPBIOMAS_18);
        } else {
            lyr_BiomasMAPBIOMAS_18.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_BiomasMAPBIOMAS_18.get('title'));
            console.warn("No features loaded for BiomasMAPBIOMAS_18");
        }
    } catch (e) {
        console.error("Error parsing WFS for BiomasMAPBIOMAS_18:", e);
    }
});
var lyr_UsoeocupaodoSolo_19 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:uso_solo_pi_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Uso e cobertura do solo (MapBiomas)<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_0.png" /> Formação Florestal<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_1.png" /> Formação Savânica<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_2.png" /> Mangue<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_3.png" /> Floresta Alagável<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_4.png" /> Silvicultura<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_5.png" /> Campo Alagado e Área Pantanosa<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_6.png" /> Formação Campestre<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_7.png" /> Pastagem<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_8.png" /> Cana<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_9.png" /> Mosaico de Usos<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_10.png" /> Praia, Duna e Areal<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_11.png" /> Área Urbanizada<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_12.png" /> Outras Áreas não Vegetadas<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_13.png" /> Afloramento Rochoso<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_14.png" /> Mineração<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_15.png" /> Aquicultura<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_16.png" /> Apicum<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_17.png" /> Rio, Lago e Oceano<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_18.png" /> Dendê<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_19.png" /> Soja<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_20.png" /> Arroz<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_21.png" /> Outras Lavouras Temporárias<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_22.png" /> Café<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_23.png" /> Citrus<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_24.png" /> Outras Lavouras Perenes<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_25.png" /> Restinga Arbórea<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_26.png" /> Restinga Herbácea<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_27.png" /> Algodão<br />\
                                    <img src="styles/legend/UsoecoberturadosoloMapBiomas_19_28.png" /> Usina Fotovoltaica<br />',
                            popuplayertitle: 'Uso e ocupação do Solo',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_UsoeocupaodoSolo_19, 0]);
var format_reasdeconservaoICMBio_20 = new ol.format.GeoJSON();
var jsonSource_reasdeconservaoICMBio_20 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_reasdeconservaoICMBio_20 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_reasdeconservaoICMBio_20, 
                style: style_reasdeconservaoICMBio_20,
                popuplayertitle: 'Áreas de conservação (ICMBio)',
                interactive: true,
    title: 'Áreas de conservação (ICMBio)<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_0.png" /> ESTAÇÃO ECOLÓGICA DE URUÇUÍ - UNA<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_1.png" /> FLORESTA NACIONAL DE PALMARES<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_2.png" /> PARQUE NACIONAL DA SERRA DA CAPIVARA<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_3.png" /> PARQUE NACIONAL DA SERRA DAS CONFUSÕES<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_4.png" /> PARQUE NACIONAL DAS NASCENTES DO RIO PARNAÍBA<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_5.png" /> PARQUE NACIONAL DE SETE CIDADES<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_6.png" /> RESERVA EXTRATIVISTA MARINHA DO DELTA DO PARNAÍBA<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_7.png" /> ÁREA DE PROTEÇÃO AMBIENTAL DA CHAPADA DO ARARIPE<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_8.png" /> ÁREA DE PROTEÇÃO AMBIENTAL DELTA DO PARNAÍBA<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_9.png" /> ÁREA DE PROTEÇÃO AMBIENTAL SERRA DA IBIAPABA<br />\
    <img src="styles/legend/reasdeconservaoICMBio_20_10.png" /> ÁREA DE PROTEÇÃO AMBIENTAL SERRA DA TABATINGA<br />' });

fetchWFSreasdeconservaoICMBio_20Data(lyr_reasdeconservaoICMBio_20.get('title'), function (error, response) {
    var features_reasdeconservaoICMBio_20;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_reasdeconservaoICMBio_20 = format_reasdeconservaoICMBio_20.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_reasdeconservaoICMBio_20 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_reasdeconservaoICMBio_20 && features_reasdeconservaoICMBio_20.length > 0) {
            jsonSource_reasdeconservaoICMBio_20.addFeatures(features_reasdeconservaoICMBio_20);
        } else {
            lyr_reasdeconservaoICMBio_20.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_reasdeconservaoICMBio_20.get('title'));
            console.warn("No features loaded for reasdeconservaoICMBio_20");
        }
    } catch (e) {
        console.error("Error parsing WFS for reasdeconservaoICMBio_20:", e);
    }
});
var lyr_DeclividadeSRTM_21 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:declividade_piaui_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Declividade (SRTM)<br />\
                            <img src="styles/legend/DeclividadeSRTM_21_0.png" /> Plano (0%-3%)<br />\
                            <img src="styles/legend/DeclividadeSRTM_21_1.png" /> Suave-Ondulado (3%-8%)<br />\
                            <img src="styles/legend/DeclividadeSRTM_21_2.png" /> Ondulado (8%-20%)<br />\
                            <img src="styles/legend/DeclividadeSRTM_21_3.png" /> Forte ondulado (20%-45%)<br />\
                            <img src="styles/legend/DeclividadeSRTM_21_4.png" /> Montanhoso (45%-75%)<br />\
                            <img src="styles/legend/DeclividadeSRTM_21_5.png" /> Escarpado (>75%)<br />',
                            popuplayertitle: 'Declividade (SRTM)',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_DeclividadeSRTM_21, 0]);
var format_RedeHidrogrficaANA_22 = new ol.format.GeoJSON();
var jsonSource_RedeHidrogrficaANA_22 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_RedeHidrogrficaANA_22 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_RedeHidrogrficaANA_22, 
                style: style_RedeHidrogrficaANA_22,
                popuplayertitle: 'Rede Hidrográfica (ANA)',
                interactive: true,
                title: '<img src="styles/legend/RedeHidrogrficaANA_22.png" /> Rede Hidrográfica (ANA)'
            });

fetchWFSRedeHidrogrficaANA_22Data(lyr_RedeHidrogrficaANA_22.get('title'), function (error, response) {
    var features_RedeHidrogrficaANA_22;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_RedeHidrogrficaANA_22 = format_RedeHidrogrficaANA_22.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_RedeHidrogrficaANA_22 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_RedeHidrogrficaANA_22 && features_RedeHidrogrficaANA_22.length > 0) {
            jsonSource_RedeHidrogrficaANA_22.addFeatures(features_RedeHidrogrficaANA_22);
        } else {
            lyr_RedeHidrogrficaANA_22.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_RedeHidrogrficaANA_22.get('title'));
            console.warn("No features loaded for RedeHidrogrficaANA_22");
        }
    } catch (e) {
        console.error("Error parsing WFS for RedeHidrogrficaANA_22:", e);
    }
});
var lyr_Precipitaoacumulada2025CHIRPS_23 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:Precipitacao_Anual_2025_CHIRPS_PI_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Precipitação acumulada 2025 (CHIRPS)<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_0.png" /> 300<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_1.png" /> 476<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_2.png" /> 651<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_3.png" /> 827<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_4.png" /> 1002<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_5.png" /> 1178<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_6.png" /> 1353<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_7.png" /> 1515<br />\
                                    <img src="styles/legend/Precipitaoacumulada2025CHIRPS_23_8.png" /> 1650<br />',
                            popuplayertitle: 'Precipitação acumulada 2025 (CHIRPS)',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Precipitaoacumulada2025CHIRPS_23, 0]);
var lyr_IrradiaoSolarDiriaINPE_24 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:irradiacao_utm_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Irradiação Solar Diária (INPE)<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_0.png" /> 0,0049<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_1.png" /> 0,1343<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_2.png" /> 0,2637<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_3.png" /> 0,3930<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_4.png" /> 0,5224<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_5.png" /> 0,6517<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_6.png" /> 0,7811<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_7.png" /> 0,9005<br />\
                            <img src="styles/legend/IrradiaoSolarDiriaINPE_24_8.png" /> 1,0000<br />',
                            popuplayertitle: 'Irradiação Solar Diária (INPE)',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_IrradiaoSolarDiriaINPE_24, 0]);
var lyr_Albedomdiaanual2025MODIS_25 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:albedo_reclassificado_normalizado_final_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Albedo média anual 2025 (MODIS)<br />\
    <img src="styles/legend/Albedomdiaanual2025MODIS_25_0.png" /> -0,1398<br />\
    <img src="styles/legend/Albedomdiaanual2025MODIS_25_1.png" /> 0,1453<br />\
    <img src="styles/legend/Albedomdiaanual2025MODIS_25_2.png" /> 0,4304<br />\
    <img src="styles/legend/Albedomdiaanual2025MODIS_25_3.png" /> 0,7156<br />\
    <img src="styles/legend/Albedomdiaanual2025MODIS_25_4.png" /> 1,0007<br />',
                            popuplayertitle: 'Albedo média anual 2025 (MODIS)',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_Albedomdiaanual2025MODIS_25, 0]);
var lyr_TemperaturaMdiaanual2025_26 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "https://geoserver-sigweb.duckdns.org/geoserver/wms",
                              attributions: ' ',
                              params: {
                                "LAYERS": "sigweb:Temperatura_Media_2025_ERA5_Piaui_cog",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Temperatura Média Anual 2025 (ERA5)<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_0.png" /> 24<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_1.png" /> 25<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_2.png" /> 26<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_3.png" /> 27<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_4.png" /> 28<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_5.png" /> 29<br />\
                                    <img src="styles/legend/TemperaturaMdiaAnual2025ERA5_26_6.png" /> 30<br />',
                            popuplayertitle: 'Temperatura Média anual 2025',
                            type: '',
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_TemperaturaMdiaanual2025_26, 0]);
var format_Piau_27 = new ol.format.GeoJSON();
var jsonSource_Piau_27 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_Piau_27 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Piau_27, 
                style: style_Piau_27,
                popuplayertitle: 'Piauí',
                interactive: false,
                title: '<img src="styles/legend/Piau_27.png" /> Piauí'
            });

fetchWFSPiau_27Data(lyr_Piau_27.get('title'), function (error, response) {
    var features_Piau_27;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_Piau_27 = format_Piau_27.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_Piau_27 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_Piau_27 && features_Piau_27.length > 0) {
            jsonSource_Piau_27.addFeatures(features_Piau_27);
        } else {
            lyr_Piau_27.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_Piau_27.get('title'));
            console.warn("No features loaded for Piau_27");
        }
    } catch (e) {
        console.error("Error parsing WFS for Piau_27:", e);
    }
});
var format_MunicpiosPiau_28 = new ol.format.GeoJSON();
var jsonSource_MunicpiosPiau_28 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_MunicpiosPiau_28 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_MunicpiosPiau_28, 
                style: style_MunicpiosPiau_28,
                popuplayertitle: 'Municípios Piauí',
                interactive: true,
                title: '<img src="styles/legend/MunicpiosPiau_28.png" /> Municípios Piauí'
            });

fetchWFSMunicpiosPiau_28Data(lyr_MunicpiosPiau_28.get('title'), function (error, response) {
    var features_MunicpiosPiau_28;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_MunicpiosPiau_28 = format_MunicpiosPiau_28.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_MunicpiosPiau_28 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_MunicpiosPiau_28 && features_MunicpiosPiau_28.length > 0) {
            jsonSource_MunicpiosPiau_28.addFeatures(features_MunicpiosPiau_28);
        } else {
            lyr_MunicpiosPiau_28.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_MunicpiosPiau_28.get('title'));
            console.warn("No features loaded for MunicpiosPiau_28");
        }
    } catch (e) {
        console.error("Error parsing WFS for MunicpiosPiau_28:", e);
    }
});
var format_Brasil_29 = new ol.format.GeoJSON();
var jsonSource_Brasil_29 = new ol.source.Vector({
    attributions: ' ',
});
var lyr_Brasil_29 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Brasil_29, 
                style: style_Brasil_29,
                popuplayertitle: 'Brasil',
                interactive: false,
                title: '<img src="styles/legend/Brasil_29.png" /> Brasil'
            });

fetchWFSBrasil_29Data(lyr_Brasil_29.get('title'), function (error, response) {
    var features_Brasil_29;
    try {
        if (typeof response === "object" && !response.nodeType) {
            // Case JSONP/GeoJSON
            features_Brasil_29 = format_Brasil_29.readFeatures(response);
        } else {
            // Case XML string o DOM
            var parser = new DOMParser();
            var xmlDoc = (typeof response === "string")
                ? parser.parseFromString(response, "text/xml")
                : response;

            // Find GML version from tags
            var gmlFormat;
            if (xmlDoc.getElementsByTagName("gml:featureMember").length > 0) {
                // GML2
                gmlFormat = new ol.format.GML2();
            } else if (xmlDoc.getElementsByTagName("gml:featureMembers").length > 0 ||
                    xmlDoc.getElementsByTagName("gml:FeatureCollection").length > 0) {
                // GML3
                gmlFormat = new ol.format.GML3();
            } else {
                // Fallback generico
                gmlFormat = new ol.format.WFS();
            }

            features_Brasil_29 = gmlFormat.readFeatures(xmlDoc, {
                dataProjection: 'EPSG:3857',
                featureProjection: map.getView().getProjection()
            });
        }

        if (features_Brasil_29 && features_Brasil_29.length > 0) {
            jsonSource_Brasil_29.addFeatures(features_Brasil_29);
        } else {
            lyr_Brasil_29.set('title', '<i class="fa-regular fa-triangle-exclamation" title="Parsing Error"></i> ' + lyr_Brasil_29.get('title'));
            console.warn("No features loaded for Brasil_29");
        }
    } catch (e) {
        console.error("Error parsing WFS for Brasil_29:", e);
    }
});
var group_Limites = new ol.layer.Group({
                                layers: [lyr_Piau_27,lyr_MunicpiosPiau_28,lyr_Brasil_29,],
                                fold: 'close',
                                title: 'Limites'});
var group_Clima = new ol.layer.Group({
                                layers: [lyr_Precipitaoacumulada2025CHIRPS_23,lyr_IrradiaoSolarDiriaINPE_24,lyr_Albedomdiaanual2025MODIS_25,lyr_TemperaturaMdiaanual2025_26,],
                                fold: 'close',
                                title: 'Clima'});
var group_Geogrficos = new ol.layer.Group({
                                layers: [lyr_DeclividadeSRTM_21,lyr_RedeHidrogrficaANA_22,],
                                fold: 'close',
                                title: 'Geográficos'});
var group_Institucionais = new ol.layer.Group({
                                layers: [lyr_CadastroAmbientalRuralCAR_16,lyr_SistemadeGestoFundiriaSIGEF_17,lyr_BiomasMAPBIOMAS_18,lyr_UsoeocupaodoSolo_19,lyr_reasdeconservaoICMBio_20,],
                                fold: 'close',
                                title: 'Institucionais'});
var group_InfraestruturaEnergtica = new ol.layer.Group({
                                layers: [lyr_usinas_foto_editado_15,],
                                fold: 'close',
                                title: 'Infraestrutura Energética'});
var group_Existentes = new ol.layer.Group({
                                layers: [lyr_SubestaesBaseExistente_13,lyr_Linhadetransmissaoexistente_14,],
                                fold: 'close',
                                title: 'Existentes'});
var group_Planejadas = new ol.layer.Group({
                                layers: [lyr_Linhadetransmissoplanejado_11,lyr_SubestaesExpansoPlanejada_12,],
                                fold: 'close',
                                title: 'Planejadas'});
var group_Mapasderestrio = new ol.layer.Group({
                                layers: [lyr_Restrioporcorpohdrico_6,lyr_Restrioporreadeconservao_7,lyr_Restrioporvegetaonatural_8,lyr_Restriopordeclividade_9,lyr_Restrioreaurbana_10,],
                                fold: 'close',
                                title: 'Mapas de restrição'});
var group_PotencialSolar = new ol.layer.Group({
                                layers: [lyr_Municipioscomaltopotencialenergticosolar_3,lyr_PotencialEnergticoSolar_4,lyr_reaoptasaimplantaodeenergiasolar_5,],
                                fold: 'close',
                                title: 'Potencial Solar'});
var group_MapaBase = new ol.layer.Group({
                                layers: [lyr_OSMStandard_0,lyr_GoogleHybrid_1,lyr_ESRITopo_2,],
                                fold: 'close',
                                title: 'Mapa Base'});

lyr_OSMStandard_0.setVisible(true);lyr_GoogleHybrid_1.setVisible(true);lyr_ESRITopo_2.setVisible(true);lyr_Municipioscomaltopotencialenergticosolar_3.setVisible(false);lyr_PotencialEnergticoSolar_4.setVisible(true);lyr_reaoptasaimplantaodeenergiasolar_5.setVisible(false);lyr_Restrioporcorpohdrico_6.setVisible(false);lyr_Restrioporreadeconservao_7.setVisible(false);lyr_Restrioporvegetaonatural_8.setVisible(false);lyr_Restriopordeclividade_9.setVisible(false);lyr_Restrioreaurbana_10.setVisible(false);lyr_Linhadetransmissoplanejado_11.setVisible(false);lyr_SubestaesExpansoPlanejada_12.setVisible(false);lyr_SubestaesBaseExistente_13.setVisible(false);lyr_Linhadetransmissaoexistente_14.setVisible(false);lyr_usinas_foto_editado_15.setVisible(true);lyr_CadastroAmbientalRuralCAR_16.setVisible(false);lyr_SistemadeGestoFundiriaSIGEF_17.setVisible(false);lyr_BiomasMAPBIOMAS_18.setVisible(false);lyr_UsoeocupaodoSolo_19.setVisible(false);lyr_reasdeconservaoICMBio_20.setVisible(false);lyr_DeclividadeSRTM_21.setVisible(false);lyr_RedeHidrogrficaANA_22.setVisible(false);lyr_Precipitaoacumulada2025CHIRPS_23.setVisible(false);lyr_IrradiaoSolarDiriaINPE_24.setVisible(false);lyr_Albedomdiaanual2025MODIS_25.setVisible(false);lyr_TemperaturaMdiaanual2025_26.setVisible(false);lyr_Piau_27.setVisible(true);lyr_MunicpiosPiau_28.setVisible(true);lyr_Brasil_29.setVisible(true);
var layersList = [group_MapaBase,group_PotencialSolar,group_Mapasderestrio,group_Planejadas,group_Existentes,group_InfraestruturaEnergtica,group_Institucionais,group_Geogrficos,group_Clima,group_Limites];
lyr_Municipioscomaltopotencialenergticosolar_3.set('fieldAliases', {'fid': 'fid', 'CD_MUN': 'CD_MUN', 'NM_MUN': 'NM_MUN', 'CD_RGI': 'CD_RGI', 'NM_RGI': 'NM_RGI', 'CD_RGINT': 'CD_RGINT', 'NM_RGINT': 'NM_RGINT', 'CD_UF': 'CD_UF', 'NM_UF': 'NM_UF', 'SIGLA_UF': 'SIGLA_UF', 'CD_REGIA': 'CD_REGIA', 'NM_REGIA': 'NM_REGIA', 'SIGLA_RG': 'SIGLA_RG', 'CD_CONCU': 'CD_CONCU', 'NM_CONCU': 'NM_CONCU', 'AREA_KM2': 'AREA_KM2', 'dens_demo': 'dens_demo', 'dens_2010': 'dens_2010', });
lyr_Linhadetransmissoplanejado_11.set('fieldAliases', {'fid': 'fid', 'Nome': 'Nome', 'Ano_Planej': 'Ano_Planej', 'Tensao': 'Tensao', 'Extensao': 'Extensao', 'Concession': 'Concession', 'Shape_STLe': 'Shape_STLe', });
lyr_SubestaesExpansoPlanejada_12.set('fieldAliases', {'Nome': 'Nome', 'Concession': 'Concession', 'Ano_Opera': 'Ano_Opera', 'Tensao': 'Tensao', 'longitude': 'longitude', 'latitude': 'latitude', });
lyr_SubestaesBaseExistente_13.set('fieldAliases', {'Nome': 'Nome', 'Concession': 'Concession', 'Ano_Opera': 'Ano_Opera', 'Tensao': 'Tensao', 'longitude': 'longitude', 'latitude': 'latitude', 'CD_MUN': 'CD_MUN', });
lyr_Linhadetransmissaoexistente_14.set('fieldAliases', {'fid': 'fid', 'Nome': 'Nome', 'Concession': 'Concession', 'Tensao': 'Tensao', 'Extensao': 'Extensao', 'Ano_Opera': 'Ano_Opera', 'created_us': 'created_us', 'created_da': 'created_da', 'last_edite': 'last_edite', 'last_edi_1': 'last_edi_1', 'Shape_STLe': 'Shape_STLe', });
lyr_usinas_foto_editado_15.set('fieldAliases', {'fid': 'fid', 'Empreendim': 'Empreendim', 'CEG': 'CEG', 'UF': 'UF', 'Fonte': 'Fonte', 'Fase': 'Fase', 'Origem': 'Origem', 'Tipo de At': 'Tipo de At', 'Tipo': 'Tipo', 'Combustive': 'Combustive', 'Inicio_ope': 'Inicio_ope', 'Potencia_O': 'Potencia_O', 'Potencia_F': 'Potencia_F', 'Garantia_F': 'Garantia_F', 'Geracao_Qu': 'Geracao_Qu', 'Latitude_D': 'Latitude_D', 'Longitude': 'Longitude', 'Inicio_Vig': 'Inicio_Vig', 'Fim_Vigenc': 'Fim_Vigenc', 'Proprietar': 'Proprietar', 'Sub_Bacia': 'Sub_Bacia', 'Municipio': 'Municipio', 'ID': 'ID', 'categoria': 'categoria', 'parent_id': 'parent_id', 'name': 'name', 'Label': 'Label', });
lyr_CadastroAmbientalRuralCAR_16.set('fieldAliases', {'fid': 'fid', 'cod_tema': 'cod_tema', 'nom_tema': 'nom_tema', 'cod_imovel': 'cod_imovel', 'mod_fiscal': 'mod_fiscal', 'num_area': 'num_area', 'ind_status': 'ind_status', 'ind_tipo': 'ind_tipo', 'des_condic': 'des_condic', 'municipio': 'municipio', 'cod_estado': 'cod_estado', 'dat_criaca': 'dat_criaca', 'dat_atuali': 'dat_atuali', });
lyr_SistemadeGestoFundiriaSIGEF_17.set('fieldAliases', {'parcela_co': 'parcela_co', 'rt': 'rt', 'art': 'art', 'situacao_i': 'situacao_i', 'codigo_imo': 'codigo_imo', 'data_submi': 'data_submi', 'data_aprov': 'data_aprov', 'status': 'status', 'nome_area': 'nome_area', 'registro_m': 'registro_m', 'registro_d': 'registro_d', 'municipio_': 'municipio_', 'uf_id': 'uf_id', });
lyr_BiomasMAPBIOMAS_18.set('fieldAliases', {'fid': 'fid', 'Bioma': 'Bioma', 'CD_Bioma': 'CD_Bioma', });
lyr_reasdeconservaoICMBio_20.set('fieldAliases', {'fid': 'fid', 'ogc_fid': 'ogc_fid', 'nomeuc': 'nomeuc', 'cnuc': 'cnuc', 'criacaoano': 'criacaoano', 'areahaalb': 'areahaalb', 'perimm': 'perimm', 'criacaoato': 'criacaoato', 'esferaadm': 'esferaadm', 'siglacateg': 'siglacateg', 'grupouc': 'grupouc', 'ufabrang': 'ufabrang', 'biomaibge': 'biomaibge', 'biomacrl': 'biomacrl', 'gregional': 'gregional', 'fusoabrang': 'fusoabrang', 'abrev': 'abrev', 'escalauc': 'escalauc', 'demarcacao': 'demarcacao', });
lyr_RedeHidrogrficaANA_22.set('fieldAliases', {'fid': 'fid', 'id_drenage': 'id_drenage', 'Nome': 'Nome', 'Ordem': 'Ordem', 'Dominialid': 'Dominialid', 'Compriment': 'Compriment', 'Dist_Foz_B': 'Dist_Foz_B', 'Dist_Foz_C': 'Dist_Foz_C', 'Area_Contr': 'Area_Contr', 'Area_Monta': 'Area_Monta', 'dt_ini': 'dt_ini', 'dt_fim': 'dt_fim', });
lyr_Piau_27.set('fieldAliases', {'fid': 'fid', 'CD_UF': 'CD_UF', 'NM_UF': 'NM_UF', 'SIGLA_UF': 'SIGLA_UF', 'CD_REGIA': 'CD_REGIA', 'NM_REGIA': 'NM_REGIA', 'SIGLA_RG': 'SIGLA_RG', 'AREA_KM2': 'AREA_KM2', });
lyr_MunicpiosPiau_28.set('fieldAliases', {'CD_MUN': 'CD_MUN', 'NM_MUN': 'NM_MUN', 'CD_RGI': 'CD_RGI', 'NM_RGI': 'NM_RGI', 'CD_RGINT': 'CD_RGINT', 'NM_RGINT': 'NM_RGINT', 'CD_UF': 'CD_UF', 'NM_UF': 'NM_UF', 'SIGLA_UF': 'SIGLA_UF', 'CD_REGIA': 'CD_REGIA', 'NM_REGIA': 'NM_REGIA', 'SIGLA_RG': 'SIGLA_RG', 'CD_CONCU': 'CD_CONCU', 'NM_CONCU': 'NM_CONCU', 'AREA_KM2': 'AREA_KM2', 'densi_2010': 'densi_2010', 'densi_2022': 'densi_2022', 'texa_cresc': 'texa_cresc', 'pop_percen': 'pop_percen', 'Perimetro': 'Perimetro', });
lyr_Brasil_29.set('fieldAliases', {'CD_UF': 'CD_UF', 'NM_UF': 'NM_UF', 'SIGLA_UF': 'SIGLA_UF', 'CD_REGIA': 'CD_REGIA', 'NM_REGIA': 'NM_REGIA', 'SIGLA_RG': 'SIGLA_RG', 'AREA_KM2': 'AREA_KM2', });
lyr_Municipioscomaltopotencialenergticosolar_3.set('fieldImages', {'fid': 'TextEdit', 'CD_MUN': 'TextEdit', 'NM_MUN': 'TextEdit', 'CD_RGI': 'TextEdit', 'NM_RGI': 'TextEdit', 'CD_RGINT': 'TextEdit', 'NM_RGINT': 'TextEdit', 'CD_UF': 'TextEdit', 'NM_UF': 'TextEdit', 'SIGLA_UF': 'TextEdit', 'CD_REGIA': 'TextEdit', 'NM_REGIA': 'TextEdit', 'SIGLA_RG': 'TextEdit', 'CD_CONCU': 'TextEdit', 'NM_CONCU': 'TextEdit', 'AREA_KM2': 'TextEdit', 'dens_demo': 'TextEdit', 'dens_2010': 'TextEdit', });
lyr_Linhadetransmissoplanejado_11.set('fieldImages', {'fid': '', 'Nome': '', 'Ano_Planej': '', 'Tensao': '', 'Extensao': '', 'Concession': '', 'Shape_STLe': '', });
lyr_SubestaesExpansoPlanejada_12.set('fieldImages', {'Nome': 'TextEdit', 'Concession': 'TextEdit', 'Ano_Opera': 'TextEdit', 'Tensao': 'TextEdit', 'longitude': 'TextEdit', 'latitude': 'TextEdit', });
lyr_SubestaesBaseExistente_13.set('fieldImages', {'Nome': 'TextEdit', 'Concession': 'TextEdit', 'Ano_Opera': 'TextEdit', 'Tensao': 'TextEdit', 'longitude': 'TextEdit', 'latitude': 'TextEdit', 'CD_MUN': 'TextEdit', });
lyr_Linhadetransmissaoexistente_14.set('fieldImages', {'fid': '', 'Nome': '', 'Concession': '', 'Tensao': '', 'Extensao': '', 'Ano_Opera': '', 'created_us': '', 'created_da': '', 'last_edite': '', 'last_edi_1': '', 'Shape_STLe': '', });
lyr_usinas_foto_editado_15.set('fieldImages', {'fid': 'TextEdit', 'Empreendim': 'TextEdit', 'CEG': 'TextEdit', 'UF': 'TextEdit', 'Fonte': 'TextEdit', 'Fase': 'TextEdit', 'Origem': 'TextEdit', 'Tipo de At': 'TextEdit', 'Tipo': 'TextEdit', 'Combustive': '', 'Inicio_ope': '', 'Potencia_O': '', 'Potencia_F': '', 'Garantia_F': '', 'Geracao_Qu': '', 'Latitude_D': '', 'Longitude': 'TextEdit', 'Inicio_Vig': '', 'Fim_Vigenc': '', 'Proprietar': '', 'Sub_Bacia': '', 'Municipio': '', 'ID': 'TextEdit', 'categoria': 'TextEdit', 'parent_id': 'TextEdit', 'name': 'TextEdit', 'Label': 'TextEdit', });
lyr_CadastroAmbientalRuralCAR_16.set('fieldImages', {'fid': 'TextEdit', 'cod_tema': 'TextEdit', 'nom_tema': 'TextEdit', 'cod_imovel': 'TextEdit', 'mod_fiscal': 'TextEdit', 'num_area': 'TextEdit', 'ind_status': 'TextEdit', 'ind_tipo': 'TextEdit', 'des_condic': 'TextEdit', 'municipio': 'TextEdit', 'cod_estado': 'TextEdit', 'dat_criaca': 'TextEdit', 'dat_atuali': 'TextEdit', });
lyr_SistemadeGestoFundiriaSIGEF_17.set('fieldImages', {'parcela_co': 'TextEdit', 'rt': 'TextEdit', 'art': 'TextEdit', 'situacao_i': 'TextEdit', 'codigo_imo': 'TextEdit', 'data_submi': 'DateTime', 'data_aprov': 'DateTime', 'status': 'TextEdit', 'nome_area': 'TextEdit', 'registro_m': 'TextEdit', 'registro_d': 'DateTime', 'municipio_': 'Range', 'uf_id': 'Range', });
lyr_BiomasMAPBIOMAS_18.set('fieldImages', {'fid': 'TextEdit', 'Bioma': 'TextEdit', 'CD_Bioma': 'Range', });
lyr_reasdeconservaoICMBio_20.set('fieldImages', {'fid': 'TextEdit', 'ogc_fid': 'Range', 'nomeuc': 'TextEdit', 'cnuc': 'TextEdit', 'criacaoano': 'TextEdit', 'areahaalb': 'TextEdit', 'perimm': 'TextEdit', 'criacaoato': 'TextEdit', 'esferaadm': 'TextEdit', 'siglacateg': 'TextEdit', 'grupouc': 'TextEdit', 'ufabrang': 'TextEdit', 'biomaibge': 'TextEdit', 'biomacrl': 'TextEdit', 'gregional': 'TextEdit', 'fusoabrang': 'TextEdit', 'abrev': 'TextEdit', 'escalauc': 'TextEdit', 'demarcacao': 'TextEdit', });
lyr_RedeHidrogrficaANA_22.set('fieldImages', {'fid': 'TextEdit', 'id_drenage': 'Range', 'Nome': 'TextEdit', 'Ordem': 'Range', 'Dominialid': 'TextEdit', 'Compriment': 'TextEdit', 'Dist_Foz_B': 'TextEdit', 'Dist_Foz_C': 'TextEdit', 'Area_Contr': 'TextEdit', 'Area_Monta': 'TextEdit', 'dt_ini': 'DateTime', 'dt_fim': 'DateTime', });
lyr_Piau_27.set('fieldImages', {'fid': 'TextEdit', 'CD_UF': 'TextEdit', 'NM_UF': 'TextEdit', 'SIGLA_UF': 'TextEdit', 'CD_REGIA': 'TextEdit', 'NM_REGIA': 'TextEdit', 'SIGLA_RG': 'TextEdit', 'AREA_KM2': 'TextEdit', });
lyr_MunicpiosPiau_28.set('fieldImages', {'CD_MUN': 'TextEdit', 'NM_MUN': 'TextEdit', 'CD_RGI': 'TextEdit', 'NM_RGI': 'TextEdit', 'CD_RGINT': 'TextEdit', 'NM_RGINT': 'TextEdit', 'CD_UF': 'TextEdit', 'NM_UF': 'TextEdit', 'SIGLA_UF': 'TextEdit', 'CD_REGIA': 'TextEdit', 'NM_REGIA': 'TextEdit', 'SIGLA_RG': 'TextEdit', 'CD_CONCU': 'TextEdit', 'NM_CONCU': 'TextEdit', 'AREA_KM2': 'TextEdit', 'densi_2010': 'TextEdit', 'densi_2022': 'TextEdit', 'texa_cresc': 'TextEdit', 'pop_percen': 'TextEdit', 'Perimetro': 'TextEdit', });
lyr_Brasil_29.set('fieldImages', {'CD_UF': 'TextEdit', 'NM_UF': 'TextEdit', 'SIGLA_UF': 'TextEdit', 'CD_REGIA': 'TextEdit', 'NM_REGIA': 'TextEdit', 'SIGLA_RG': 'TextEdit', 'AREA_KM2': 'TextEdit', });
lyr_Municipioscomaltopotencialenergticosolar_3.set('fieldLabels', {'fid': 'hidden field', 'CD_MUN': 'hidden field', 'NM_MUN': 'header label - visible with data', 'CD_RGI': 'hidden field', 'NM_RGI': 'hidden field', 'CD_RGINT': 'hidden field', 'NM_RGINT': 'hidden field', 'CD_UF': 'hidden field', 'NM_UF': 'inline label - visible with data', 'SIGLA_UF': 'no label', 'CD_REGIA': 'hidden field', 'NM_REGIA': 'inline label - visible with data', 'SIGLA_RG': 'hidden field', 'CD_CONCU': 'hidden field', 'NM_CONCU': 'hidden field', 'AREA_KM2': 'inline label - visible with data', 'dens_demo': 'hidden field', 'dens_2010': 'hidden field', });
lyr_Linhadetransmissoplanejado_11.set('fieldLabels', {'fid': 'hidden field', 'Nome': 'inline label - visible with data', 'Ano_Planej': 'hidden field', 'Tensao': 'inline label - visible with data', 'Extensao': 'inline label - visible with data', 'Concession': 'inline label - visible with data', 'Shape_STLe': 'hidden field', });
lyr_SubestaesExpansoPlanejada_12.set('fieldLabels', {'Nome': 'inline label - visible with data', 'Concession': 'inline label - visible with data', 'Ano_Opera': 'header label - always visible', 'Tensao': 'inline label - visible with data', 'longitude': 'hidden field', 'latitude': 'hidden field', });
lyr_SubestaesBaseExistente_13.set('fieldLabels', {'Nome': 'inline label - visible with data', 'Concession': 'inline label - visible with data', 'Ano_Opera': 'hidden field', 'Tensao': 'inline label - visible with data', 'longitude': 'hidden field', 'latitude': 'hidden field', 'CD_MUN': 'hidden field', });
lyr_Linhadetransmissaoexistente_14.set('fieldLabels', {'fid': 'hidden field', 'Nome': 'inline label - visible with data', 'Concession': 'inline label - visible with data', 'Tensao': 'inline label - visible with data', 'Extensao': 'inline label - visible with data', 'Ano_Opera': 'hidden field', 'created_us': 'hidden field', 'created_da': 'hidden field', 'last_edite': 'hidden field', 'last_edi_1': 'hidden field', 'Shape_STLe': 'hidden field', });
lyr_usinas_foto_editado_15.set('fieldLabels', {'fid': 'hidden field', 'Empreendim': 'inline label - visible with data', 'CEG': 'hidden field', 'UF': 'inline label - visible with data', 'Fonte': 'inline label - visible with data', 'Fase': 'inline label - visible with data', 'Origem': 'inline label - visible with data', 'Tipo de At': 'hidden field', 'Tipo': 'hidden field', 'Combustive': 'hidden field', 'Inicio_ope': 'hidden field', 'Potencia_O': 'hidden field', 'Potencia_F': 'hidden field', 'Garantia_F': 'hidden field', 'Geracao_Qu': 'hidden field', 'Latitude_D': 'hidden field', 'Longitude': 'hidden field', 'Inicio_Vig': 'hidden field', 'Fim_Vigenc': 'hidden field', 'Proprietar': 'hidden field', 'Sub_Bacia': 'hidden field', 'Municipio': 'hidden field', 'ID': 'hidden field', 'categoria': 'hidden field', 'parent_id': 'hidden field', 'name': 'inline label - visible with data', 'Label': 'hidden field', });
lyr_CadastroAmbientalRuralCAR_16.set('fieldLabels', {'fid': 'hidden field', 'cod_tema': 'hidden field', 'nom_tema': 'hidden field', 'cod_imovel': 'inline label - visible with data', 'mod_fiscal': 'inline label - visible with data', 'num_area': 'inline label - visible with data', 'ind_status': 'inline label - visible with data', 'ind_tipo': 'inline label - visible with data', 'des_condic': 'hidden field', 'municipio': 'inline label - visible with data', 'cod_estado': 'inline label - visible with data', 'dat_criaca': 'hidden field', 'dat_atuali': 'hidden field', });
lyr_SistemadeGestoFundiriaSIGEF_17.set('fieldLabels', {'parcela_co': 'hidden field', 'rt': 'hidden field', 'art': 'hidden field', 'situacao_i': 'hidden field', 'codigo_imo': 'inline label - visible with data', 'data_submi': 'hidden field', 'data_aprov': 'hidden field', 'status': 'inline label - visible with data', 'nome_area': 'header label - visible with data', 'registro_m': 'hidden field', 'registro_d': 'hidden field', 'municipio_': 'inline label - visible with data', 'uf_id': 'hidden field', });
lyr_BiomasMAPBIOMAS_18.set('fieldLabels', {'fid': 'hidden field', 'Bioma': 'inline label - visible with data', 'CD_Bioma': 'inline label - visible with data', });
lyr_reasdeconservaoICMBio_20.set('fieldLabels', {'fid': 'hidden field', 'ogc_fid': 'hidden field', 'nomeuc': 'inline label - visible with data', 'cnuc': 'hidden field', 'criacaoano': 'hidden field', 'areahaalb': 'inline label - visible with data', 'perimm': 'inline label - visible with data', 'criacaoato': 'hidden field', 'esferaadm': 'inline label - visible with data', 'siglacateg': 'hidden field', 'grupouc': 'hidden field', 'ufabrang': 'hidden field', 'biomaibge': 'inline label - visible with data', 'biomacrl': 'hidden field', 'gregional': 'hidden field', 'fusoabrang': 'inline label - visible with data', 'abrev': 'hidden field', 'escalauc': 'hidden field', 'demarcacao': 'hidden field', });
lyr_RedeHidrogrficaANA_22.set('fieldLabels', {'fid': 'hidden field', 'id_drenage': 'hidden field', 'Nome': 'inline label - visible with data', 'Ordem': 'hidden field', 'Dominialid': 'hidden field', 'Compriment': 'inline label - visible with data', 'Dist_Foz_B': 'hidden field', 'Dist_Foz_C': 'hidden field', 'Area_Contr': 'inline label - visible with data', 'Area_Monta': 'inline label - visible with data', 'dt_ini': 'hidden field', 'dt_fim': 'hidden field', });
lyr_Piau_27.set('fieldLabels', {'fid': 'no label', 'CD_UF': 'no label', 'NM_UF': 'no label', 'SIGLA_UF': 'no label', 'CD_REGIA': 'no label', 'NM_REGIA': 'no label', 'SIGLA_RG': 'no label', 'AREA_KM2': 'no label', });
lyr_MunicpiosPiau_28.set('fieldLabels', {'CD_MUN': 'hidden field', 'NM_MUN': 'header label - visible with data', 'CD_RGI': 'hidden field', 'NM_RGI': 'hidden field', 'CD_RGINT': 'hidden field', 'NM_RGINT': 'hidden field', 'CD_UF': 'hidden field', 'NM_UF': 'inline label - visible with data', 'SIGLA_UF': 'inline label - visible with data', 'CD_REGIA': 'hidden field', 'NM_REGIA': 'inline label - visible with data', 'SIGLA_RG': 'hidden field', 'CD_CONCU': 'hidden field', 'NM_CONCU': 'hidden field', 'AREA_KM2': 'inline label - visible with data', 'densi_2010': 'hidden field', 'densi_2022': 'hidden field', 'texa_cresc': 'hidden field', 'pop_percen': 'hidden field', 'Perimetro': 'inline label - visible with data', });
lyr_Brasil_29.set('fieldLabels', {'CD_UF': 'no label', 'NM_UF': 'no label', 'SIGLA_UF': 'no label', 'CD_REGIA': 'no label', 'NM_REGIA': 'no label', 'SIGLA_RG': 'no label', 'AREA_KM2': 'no label', });
lyr_Brasil_29.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});