// Ontario First Nations Communities Data
// Source: Crown-Indigenous Relations and Northern Affairs Canada, First Nation Profiles
// Data reflects information available as of October 2025
// Coordinates are approximate administrative office locations

export interface FirstNationCommunity {
  name: string;
  lat: number;
  lng: number;
  onReservePopulation: number;
  tribalCouncil?: string;
  treaty?: string;
}

export const ONTARIO_FIRST_NATIONS: FirstNationCommunity[] = [
  // Northern Ontario
  { name: "Fort Albany First Nation", lat: 52.20, lng: -81.72, onReservePopulation: 850, tribalCouncil: "Mushkegowuk Council" },
  { name: "Kashechewan First Nation", lat: 52.28, lng: -81.68, onReservePopulation: 1900, tribalCouncil: "Mushkegowuk Council" },
  { name: "Attawapiskat First Nation", lat: 52.93, lng: -82.43, onReservePopulation: 2100, tribalCouncil: "Mushkegowuk Council" },
  { name: "Moose Cree First Nation", lat: 51.27, lng: -80.60, onReservePopulation: 1700, tribalCouncil: "Mushkegowuk Council" },
  { name: "Weenusk First Nation (Peawanuck)", lat: 54.98, lng: -85.43, onReservePopulation: 250, tribalCouncil: "Mushkegowuk Council" },
  { name: "Taykwa Tagamou Nation", lat: 50.47, lng: -81.33, onReservePopulation: 350 },
  { name: "Chapleau Cree First Nation", lat: 47.84, lng: -83.40, onReservePopulation: 100 },
  { name: "Missanabie Cree First Nation", lat: 48.00, lng: -83.78, onReservePopulation: 80 },
  { name: "Constance Lake First Nation", lat: 49.78, lng: -84.68, onReservePopulation: 900, tribalCouncil: "Matawa First Nations" },
  { name: "Hornepayne (Marten Falls First Nation)", lat: 51.37, lng: -85.80, onReservePopulation: 350, tribalCouncil: "Matawa First Nations" },
  { name: "Aroland First Nation", lat: 50.23, lng: -86.95, onReservePopulation: 500, tribalCouncil: "Matawa First Nations" },
  { name: "Ginoogaming First Nation", lat: 49.73, lng: -86.57, onReservePopulation: 200, tribalCouncil: "Matawa First Nations" },
  { name: "Long Lake #58 First Nation", lat: 49.78, lng: -86.53, onReservePopulation: 550, tribalCouncil: "Matawa First Nations" },
  { name: "Eabametoong First Nation", lat: 51.35, lng: -87.93, onReservePopulation: 1500, tribalCouncil: "Matawa First Nations" },
  { name: "Neskantaga First Nation", lat: 51.90, lng: -87.83, onReservePopulation: 350, tribalCouncil: "Matawa First Nations" },
  { name: "Nibinamik First Nation", lat: 52.45, lng: -88.25, onReservePopulation: 400, tribalCouncil: "Matawa First Nations" },
  { name: "Webequie First Nation", lat: 52.95, lng: -87.37, onReservePopulation: 750, tribalCouncil: "Matawa First Nations" },

  // Northwestern Ontario / Treaty 3
  { name: "Grassy Narrows First Nation", lat: 49.78, lng: -94.60, onReservePopulation: 950, treaty: "Treaty 3" },
  { name: "Wabaseemoong Independent Nations", lat: 49.87, lng: -94.93, onReservePopulation: 1200, treaty: "Treaty 3" },
  { name: "Wauzhushk Onigum Nation", lat: 49.77, lng: -94.48, onReservePopulation: 500, treaty: "Treaty 3" },
  { name: "Washagamis Bay First Nation", lat: 49.70, lng: -94.25, onReservePopulation: 300, treaty: "Treaty 3" },
  { name: "Obashkaandagaang First Nation", lat: 49.58, lng: -93.60, onReservePopulation: 200, treaty: "Treaty 3" },
  { name: "Naotkamegwanning First Nation", lat: 49.07, lng: -93.87, onReservePopulation: 250, treaty: "Treaty 3" },
  { name: "Couchiching First Nation", lat: 48.78, lng: -93.42, onReservePopulation: 700, treaty: "Treaty 3" },
  { name: "Rainy River First Nations", lat: 48.73, lng: -94.10, onReservePopulation: 500, treaty: "Treaty 3" },
  { name: "Naicatchewenin First Nation", lat: 48.68, lng: -93.52, onReservePopulation: 200, treaty: "Treaty 3" },
  { name: "Lac La Croix First Nation", lat: 48.35, lng: -92.22, onReservePopulation: 350, treaty: "Treaty 3" },
  { name: "Seine River First Nation", lat: 48.62, lng: -92.08, onReservePopulation: 350, treaty: "Treaty 3" },
  { name: "Lac des Mille Lacs First Nation", lat: 48.90, lng: -90.25, onReservePopulation: 100, treaty: "Treaty 3" },
  { name: "Eagle Lake First Nation", lat: 49.82, lng: -93.70, onReservePopulation: 350, treaty: "Treaty 3" },
  { name: "Wabauskang First Nation", lat: 50.30, lng: -92.55, onReservePopulation: 100, treaty: "Treaty 3" },
  { name: "Lac Seul First Nation", lat: 50.30, lng: -92.20, onReservePopulation: 2800, treaty: "Treaty 3" },
  { name: "Cat Lake First Nation", lat: 51.72, lng: -91.82, onReservePopulation: 600 },
  { name: "Slate Falls Nation", lat: 51.17, lng: -91.60, onReservePopulation: 250 },

  // Sioux Lookout area
  { name: "Kitchenuhmaykoosib Inninuwug", lat: 53.10, lng: -89.87, onReservePopulation: 1300 },
  { name: "Wapekeka First Nation", lat: 53.85, lng: -89.57, onReservePopulation: 450 },
  { name: "Kasabonika Lake First Nation", lat: 53.52, lng: -88.62, onReservePopulation: 900 },
  { name: "Wunnumin Lake First Nation", lat: 52.90, lng: -89.28, onReservePopulation: 600 },
  { name: "Kingfisher Lake First Nation", lat: 53.02, lng: -89.85, onReservePopulation: 500 },
  { name: "North Caribou Lake First Nation", lat: 52.87, lng: -90.42, onReservePopulation: 900 },
  { name: "Pikangikum First Nation", lat: 51.80, lng: -93.98, onReservePopulation: 3500 },
  { name: "Poplar Hill First Nation", lat: 52.12, lng: -94.27, onReservePopulation: 500 },
  { name: "Deer Lake First Nation", lat: 52.63, lng: -94.05, onReservePopulation: 1100 },
  { name: "Sandy Lake First Nation", lat: 53.07, lng: -93.35, onReservePopulation: 2500 },
  { name: "Keewaywin First Nation", lat: 53.00, lng: -92.83, onReservePopulation: 500 },
  { name: "North Spirit Lake First Nation", lat: 52.50, lng: -93.03, onReservePopulation: 350 },
  { name: "Sachigo Lake First Nation", lat: 53.87, lng: -92.18, onReservePopulation: 550 },
  { name: "Bearskin Lake First Nation", lat: 53.93, lng: -91.03, onReservePopulation: 500 },
  { name: "Muskrat Dam Lake First Nation", lat: 53.45, lng: -91.77, onReservePopulation: 350 },

  // Thunder Bay area
  { name: "Fort William First Nation", lat: 48.37, lng: -89.33, onReservePopulation: 2200 },
  { name: "Red Rock Indian Band", lat: 48.95, lng: -88.10, onReservePopulation: 350 },
  { name: "Pays Plat First Nation", lat: 48.78, lng: -87.42, onReservePopulation: 100 },
  { name: "Pic Mobert First Nation", lat: 48.68, lng: -85.67, onReservePopulation: 550 },
  { name: "Biigtigong Nishnaabeg (Pic River)", lat: 48.60, lng: -86.30, onReservePopulation: 500 },
  { name: "Animbiigoo Zaagi'igan Anishinaabek", lat: 49.10, lng: -88.35, onReservePopulation: 100 },
  { name: "Bingwi Neyaashi Anishinaabek", lat: 48.50, lng: -88.80, onReservePopulation: 50 },
  { name: "Whitesand First Nation", lat: 49.30, lng: -87.55, onReservePopulation: 350 },

  // Robinson-Superior / Robinson-Huron Treaty
  { name: "Michipicoten First Nation", lat: 47.93, lng: -84.90, onReservePopulation: 200 },
  { name: "Batchewana First Nation", lat: 46.53, lng: -84.33, onReservePopulation: 1200 },
  { name: "Garden River First Nation", lat: 46.52, lng: -84.07, onReservePopulation: 1200 },
  { name: "Thessalon First Nation", lat: 46.25, lng: -83.55, onReservePopulation: 300 },
  { name: "Mississauga First Nation", lat: 46.07, lng: -82.87, onReservePopulation: 700 },
  { name: "Serpent River First Nation", lat: 46.20, lng: -82.60, onReservePopulation: 350 },
  { name: "Sagamok Anishnawbek", lat: 46.15, lng: -81.72, onReservePopulation: 1100 },
  { name: "Atikameksheng Anishnawbek", lat: 46.37, lng: -81.20, onReservePopulation: 600 },
  { name: "Wahnapitae First Nation", lat: 46.55, lng: -80.78, onReservePopulation: 150 },
  { name: "Dokis First Nation", lat: 46.27, lng: -80.10, onReservePopulation: 150 },
  { name: "Henvey Inlet First Nation", lat: 45.87, lng: -80.30, onReservePopulation: 200 },
  { name: "Magnetawan First Nation", lat: 45.67, lng: -79.63, onReservePopulation: 100 },
  { name: "Shawanaga First Nation", lat: 45.52, lng: -80.07, onReservePopulation: 250 },
  { name: "Wasauksing First Nation", lat: 45.35, lng: -80.05, onReservePopulation: 450 },
  { name: "Nipissing First Nation", lat: 46.32, lng: -79.92, onReservePopulation: 1200 },

  // Manitoulin Island / North Shore
  { name: "M'Chigeeng First Nation", lat: 45.85, lng: -82.05, onReservePopulation: 1000 },
  { name: "Aundeck Omni Kaning First Nation", lat: 45.87, lng: -81.90, onReservePopulation: 300 },
  { name: "Sheguiandah First Nation", lat: 45.88, lng: -81.82, onReservePopulation: 200 },
  { name: "Zhiibaahaasing First Nation", lat: 45.77, lng: -82.28, onReservePopulation: 80 },
  { name: "Sheshegwaning First Nation", lat: 45.82, lng: -82.40, onReservePopulation: 100 },
  { name: "Wikwemikong Unceded Territory", lat: 45.73, lng: -81.72, onReservePopulation: 3200 },
  { name: "Whitefish River First Nation", lat: 45.97, lng: -81.70, onReservePopulation: 450 },

  // Southern Ontario
  { name: "Six Nations of the Grand River", lat: 43.07, lng: -80.12, onReservePopulation: 13000 },
  { name: "Mississaugas of the Credit First Nation", lat: 43.12, lng: -80.18, onReservePopulation: 1800 },
  { name: "Oneida Nation of the Thames", lat: 42.82, lng: -81.35, onReservePopulation: 2100 },
  { name: "Chippewas of the Thames First Nation", lat: 42.87, lng: -81.48, onReservePopulation: 1100 },
  { name: "Munsee-Delaware Nation", lat: 42.83, lng: -81.47, onReservePopulation: 200 },
  { name: "Moravian of the Thames", lat: 42.57, lng: -81.82, onReservePopulation: 500 },
  { name: "Caldwell First Nation", lat: 42.05, lng: -82.55, onReservePopulation: 50 },
  { name: "Walpole Island First Nation", lat: 42.58, lng: -82.50, onReservePopulation: 2500 },
  { name: "Aamjiwnaang First Nation", lat: 42.93, lng: -82.38, onReservePopulation: 900 },
  { name: "Kettle and Stony Point First Nation", lat: 43.22, lng: -81.93, onReservePopulation: 1100 },
  { name: "Chippewas of Nawash Unceded First Nation", lat: 44.78, lng: -81.03, onReservePopulation: 700 },
  { name: "Saugeen First Nation", lat: 44.73, lng: -81.22, onReservePopulation: 1200 },

  // Central Ontario
  { name: "Beausoleil First Nation", lat: 44.87, lng: -79.87, onReservePopulation: 800 },
  { name: "Rama First Nation (Chippewas of Rama)", lat: 44.62, lng: -79.32, onReservePopulation: 1200 },
  { name: "Georgina Island First Nation", lat: 44.35, lng: -79.22, onReservePopulation: 350 },
  { name: "Curve Lake First Nation", lat: 44.47, lng: -78.42, onReservePopulation: 1000 },
  { name: "Hiawatha First Nation", lat: 44.22, lng: -78.28, onReservePopulation: 350 },
  { name: "Alderville First Nation", lat: 44.15, lng: -78.08, onReservePopulation: 350 },
  { name: "Scugog Island First Nation", lat: 44.18, lng: -78.88, onReservePopulation: 100 },
  { name: "Mississaugas of Scugog Island", lat: 44.18, lng: -78.88, onReservePopulation: 100 },

  // Eastern Ontario
  { name: "Tyendinaga Mohawk Territory", lat: 44.18, lng: -77.12, onReservePopulation: 2400 },
  { name: "Mohawks of the Bay of Quinte", lat: 44.18, lng: -77.12, onReservePopulation: 2400 },
  { name: "Wahta Mohawks", lat: 45.08, lng: -79.50, onReservePopulation: 200 },
  { name: "Mohawks of Akwesasne", lat: 44.98, lng: -74.72, onReservePopulation: 5500 },
  { name: "Algonquins of Pikwakanagan", lat: 45.53, lng: -77.07, onReservePopulation: 450 },
  { name: "Shabot Obaadjiwan First Nation", lat: 44.90, lng: -76.85, onReservePopulation: 50 },
  { name: "Algonquins of Pikwakanagan (Golden Lake)", lat: 45.53, lng: -77.07, onReservePopulation: 450 },

  // Temiskaming / Northeastern
  { name: "Temagami First Nation", lat: 47.05, lng: -79.80, onReservePopulation: 250 },
  { name: "Timiskaming First Nation", lat: 47.52, lng: -79.68, onReservePopulation: 750 },
  { name: "Matachewan First Nation", lat: 47.95, lng: -80.67, onReservePopulation: 200 },
  { name: "Mattagami First Nation", lat: 47.92, lng: -81.38, onReservePopulation: 200 },
  { name: "Flying Post First Nation", lat: 48.25, lng: -81.72, onReservePopulation: 50 },
  { name: "Wahgoshig First Nation", lat: 48.77, lng: -80.18, onReservePopulation: 200 },
  { name: "Moose Cree First Nation (Moose Factory)", lat: 51.27, lng: -80.60, onReservePopulation: 1700 },

  // Additional communities
  { name: "Wabigoon Lake Ojibway Nation", lat: 49.72, lng: -92.55, onReservePopulation: 350, treaty: "Treaty 3" },
  { name: "Mishkeegogamang First Nation", lat: 51.57, lng: -90.22, onReservePopulation: 1100 },
  { name: "Wawakapewin First Nation", lat: 53.47, lng: -89.78, onReservePopulation: 30 },
  { name: "Koocheching First Nation", lat: 49.80, lng: -93.38, onReservePopulation: 200, treaty: "Treaty 3" },
  { name: "Ojibways of Onigaming First Nation", lat: 49.55, lng: -94.07, onReservePopulation: 400, treaty: "Treaty 3" },
  { name: "Iskatewizaagegan #39 Independent First Nation", lat: 49.83, lng: -93.50, onReservePopulation: 250, treaty: "Treaty 3" },
  { name: "Migisi Sahgaigan (Eagle Lake)", lat: 49.82, lng: -93.70, onReservePopulation: 350, treaty: "Treaty 3" },
  { name: "Asubpeeschoseewagong First Nation (Grassy Narrows)", lat: 49.78, lng: -94.60, onReservePopulation: 950, treaty: "Treaty 3" },
];

// Ontario center coordinates for map initialization
export const ONTARIO_CENTER = { lat: 50.0, lng: -86.0 };
export const ONTARIO_ZOOM = 5;
