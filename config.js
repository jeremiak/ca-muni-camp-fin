const sitesToScrape = [
  {
    entity: "Adelanto",
    vendorId: "ADE",
    vendor: "netfile",
  },
  {
    entity: "Alameda County",
    vendorId: "COA",
    vendor: "netfile",
  },
  {
    entity: "Anaheim",
    vendorId: "ANA",
    vendor: "netfile", 
  },
  {
    entity: "Antioch",
    vendorId: "ANT",
    vendor: "netfile",
  },
  {
    entity: "Arroyo Grande",
    vendorId: "CAG",
    vendor: "netfile",
  },
  {
    entity: "Azusa",
    vendorId: "AZU",
    vendor: "netfile",
  },
  {
    entity: "Berkeley",
    vendorId: "BRK",
    vendor: "netfile",
  },
  {
    entity: "Burbank",
    vendorId: "COB",
    vendor: "netfile",
  },
  {
    entity: "Butte County",
    vendorId: "BCO",
    vendor: "netfile",
  },
  {
    entity: "Calistoga",
    vendorId: "CAL",
    vendor: "netfile",
  },
  {
    entity: "Capitola City",
    vendorId: "CAP",
    vendor: "netfile",
  },
  {
    entity: "Carlsbad",
    vendorId: "CAR",
    vendor: "netfile",
  },
  {
    entity: "Carson City",
    vendorId: "CRSN",
    vendor: "netfile",
  },
  {
    entity: "Chico",
    vendorId: "CHCO",
    vendor: "netfile",
  },
  {
    entity: "Chula Vista",
    vendorId: "CCV",
    vendor: "netfile",
  },
  {
    entity: "Colton",
    vendorId: "COL",
    vendor: "netfile",
  },
  {
    entity: "Contra Costa County",
    vendorId: "CCC",
    vendor: "netfile",
  },
  {
    entity: "Coronado",
    vendorId: "COR",
    vendor: "netfile",
  },
  {
    entity: "Cotati",
    vendorId: "COT",
    vendor: "netfile",
  },
  {
    entity: "Covina",
    vendorId: "CVN",
    vendor: "netfile",
  },
  {
    entity: "Culver City",
    vendorId: "CUL",
    vendor: "netfile",
  },
  {
    entity: "Del Norte",
    vendorId: "DEL",
    vendor: "netfile",
  },
  {
    entity: "Desert Hot Springs",
    vendorId: "DHS",
    vendor: "netfile",
  },
  {
    entity: "Dublin",
    vendorId: "DUB",
    vendor: "netfile",
  },
  {
    entity: "East Palo Alto",
    vendorId: "EPA",
    vendor: "netfile",
  },
  {
    entity: "Eastville",
    vendorId: "ESV",
    vendor: "netfile",
  },
  {
    entity: "Escondido",
    vendorId: "ESC",
    vendor: "netfile",
  },
  {
    entity: "Fremont",
    vendorId: "FRE",
    vendor: "netfile",
  },
  {
    entity: "Fresno",
    vendorId: "COF",
    vendor: "netfile",
  },
  {
    entity: "Fullerton",
    vendorId: "FUL",
    vendor: "netfile",
  },
  {
    entity: "Garden Grove",
    vendorId: "GGV",
    vendor: "netfile",
  },
  {
    entity: "Gilroy",
    vendorId: "GIL",
    vendor: "netfile",
  },
  {
    entity: "Glendale",
    vendorId: "GLD",
    vendor: "netfile",
  },
  {
    entity: "Glendora",
    vendorId: "COG",
    vendor: "netfile",
  },
  {
    entity: "Half Moon Bay",
    vendorId: "HMB",
    vendor: "netfile",
  },
  {
    entity: "Hayward",
    vendorId: "HWD",
    vendor: "netfile",
  },
  {
    entity: "Hesperia",
    vendorId: "HES",
    vendor: "netfile",
  },
  {
    entity: "Hollister",
    vendorId: "HOL",
    vendor: "netfile",
  },
  {
    entity: "Hill Valley",
    vendorId: "CHV",
    vendor: "netfile",
  },
  {
    entity: "Huntington Beach",
    vendorId: "CHB",
    vendor: "netfile",
  },
  {
    entity: "Indio",
    vendorId: "IND",
    vendor: "netfile",
  },
  {
    entity: "Irvine",
    vendorId: "COI",
    vendor: "netfile",
  },
  {
    entity: "Kern County",
    vendorId: "KERN",
    vendor: "netfile",
  },
  {
    entity: "Lancaster",
    vendorId: "LAN",
    vendor: "netfile",
  },
  {
    entity: "Laguna Niguel",
    vendorId: "CLN",
    vendor: "netfile",
  },
  {
    entity: "Lake Elsinore",
    vendorId: "LES",
    vendor: "netfile",
  },
  {
    entity: "Lake Forest",
    vendorId: "CLF",
    vendor: "netfile",
  },
  {
    entity: "Livermore",
    vendorId: "LIV",
    vendor: "netfile",
  },
  {
    entity: 'Los Angeles',
    vendorId: 'LAX',
    vendor: 'la-city',
  },
  {
    entity: "Los Angeles County",
    vendorId: "LAC",
    vendor: "la-county",
  },
  {
    entity: "Los Gatos",
    vendorId: "GAT",
    vendor: "netfile",
  },
  {
    entity: "Madera County",
    vendorId: "MAD",
    vendor: "netfile",
  },
  {
    entity: "Manhattan Beach",
    vendorId: "CMB",
    vendor: "netfile",
  },
  {
    entity: "Manteca",
    vendorId: "MTA",
    vendor: "netfile",
  },
  {
    entity: "Marin County",
    vendorId: "CMAR",
    vendor: "netfile",
  },
  {
    entity: "Menifee",
    vendorId: "MEN",
    vendor: "netfile",
  },
  {
    entity: "Menlo Park",
    vendorId: "CMP",
    vendor: "netfile",
  },
  {
    entity: "Milpitas",
    vendorId: "MIL",
    vendor: "netfile",
  },
  {
    entity: "Modesto",
    vendorId: "MOD",
    vendor: "netfile",
  },
  {
    entity: "Monterey",
    vendorId: "COM",
    vendor: "netfile",
  },
  {
    entity: "Monterey County",
    vendorId: "MCE",
    vendor: "netfile",
  },
  {
    entity: "Mountain View",
    vendorId: "MTV",
    vendor: "netfile",
  },
  {
    entity: "Monrovia",
    vendorId: "MON",
    vendor: "netfile",
  },
  {
    entity: "Murrieta",
    vendorId: "CMA",
    vendor: "netfile",
  },
  {
    entity: "Morgan Hill",
    vendorId: "MGH",
    vendor: "netfile",
  },
  {
    entity: "Newport Beach",
    vendorId: "CNB",
    vendor: "netfile",
  },
  {
    entity: "Nevada County",
    vendorId: "NEV",
    vendor: "netfile",
  },
  {
    entity: "Numainville",
    vendorId: "NUM",
    vendor: "netfile",
  },
  {
    entity: "Oakland",
    vendorId: "COAK",
    vendor: "netfile",
  },
  {
    entity: "Oakley",
    vendorId: "OAK",
    vendor: "netfile",
  },
  {
    entity: "Oceanside",
    vendorId: "OCN",
    vendor: "netfile",
  },
  {
    entity: "Orange County",
    vendorId: "COC",
    vendor: "netfile",
  },
  {
    entity: "Oroville",
    vendorId: "ORO",
    vendor: "netfile",
  },
  {
    entity: "Palm Springs",
    vendorId: "CPS",
    vendor: "netfile",
  },
  {
    entity: "Palo Alto",
    vendorId: "CPA",
    vendor: "netfile",
  },
  {
    entity: "Pasadena",
    vendorId: "PSDA",
    vendor: "netfile",
  },
  {
    entity: "Patterson",
    vendorId: "PTSN",
    vendor: "netfile",
  },
  {
    entity: "Perris",
    vendorId: "PRS",
    vendor: "netfile",
  },
  {
    entity: "Placer County",
    vendorId: "PLA",
    vendor: "netfile",
  },
  {
    entity: "Pleasanton",
    vendorId: "COP",
    vendor: "netfile",
  },
  {
    entity: "Rancho Cucamonga",
    vendorId: "CRC",
    vendor: "netfile",
  },
  {
    entity: "Redding",
    vendorId: "RED",
    vendor: "netfile",
  },
  {
    entity: "Redondo Beach",
    vendorId: "CRB",
    vendor: "netfile",
  },
  {
    entity: "Rialto",
    vendorId: "RIAL",
    vendor: "netfile",
  },
  {
    entity: "Riverside",
    vendorId: "CITRIV",
    vendor: "netfile",
  },
  {
    entity: "Riverside County",
    vendorId: "CTRIV",
    vendor: "netfile",
  },
  {
    entity: "Sacramento City",
    vendorId: "SAC",
    vendor: "netfile",
  },
  {
    entity: "Sacramento County",
    vendorId: "SCO",
    vendor: "netfile",
  },
  {
    entity: "Salinas",
    vendorId: "SLNS",
    vendor: "netfile",
  },
  {
    entity: "San Bernadino",
    vendorId: "CSBN",
    vendor: "netfile",
  },
  {
    entity: "San Bernadino County",
    vendorId: "SBD",
    vendor: "netfile",
  },
  {
    entity: "San Bruno",
    vendorId: "BRU",
    vendor: "netfile",
  },
  {
    entity: "San Diego",
    vendorId: "CSD",
    vendor: "netfile",
  },
  {
    entity: "San Dimas",
    vendorId: "SDM",
    vendor: "netfile",
  },
  {
    entity: "San Gabriel",
    vendorId: "CSG",
    vendor: "netfile",
  },
  {
    entity: "San Francisco",
    vendorId: "SFO",
    vendor: "netfile",
  },
  {
    entity: "San Joaquin County",
    vendorId: "SJC",
    vendor: "netfile",
  },
  {
    entity: "San Jose",
    vendorId: "CSJ",
    vendor: "netfile",
  },
  {
    entity: "San Luis Obispo",
    vendorId: "SLO",
    vendor: "netfile",
  },
  {
    entity: "San Luis Obispo County",
    vendorId: "SLOCO",
    vendor: "netfile",
  },
  {
    entity: "San Mateo County",
    vendorId: "MAT",
    vendor: "netfile",
  },
  {
    entity: "San Rafael",
    vendorId: "RAF",
    vendor: "netfile",
  },
  {
    entity: "Santa Ana",
    vendorId: "CSA",
    vendor: "netfile",
  },
  {
    entity: "Santa Barbara",
    vendorId: "CSB",
    vendor: "netfile",
  },
  {
    entity: "Santa Clara",
    vendorId: "CSC",
    vendor: "netfile",
  },
  {
    entity: "Santa Clara County",
    vendorId: "SCC",
    vendor: "netfile",
  },
  {
    entity: "Santa Cruz",
    vendorId: "CRUZ",
    vendor: "netfile",
  },
  {
    entity: "Santa Cruz County",
    vendorId: "SCCO",
    vendor: "netfile",
  },
  {
    entity: "Santa Fe Springs",
    vendorId: "SFS",
    vendor: "netfile",
  },
  {
    entity: "Santa Maria",
    vendorId: "SMAR",
    vendor: "netfile",
  },
  {
    entity: "Santa Monica",
    vendorId: "CSM",
    vendor: "netfile",
  },
  {
    entity: "Santa Rosa",
    vendorId: "CSR",
    vendor: "netfile",
  },
  {
    entity: "Santee",
    vendorId: "STE",
    vendor: "netfile",
  },
  {
    entity: "Sausalito",
    vendorId: "SAU",
    vendor: "netfile",
  },
  {
    entity: "Shasta County",
    vendorId: "CSHA",
    vendor: "netfile",
  },
  {
    entity: "Sonoma",
    vendorId: "SMA",
    vendor: "netfile",
  },
  {
    entity: "Stockton",
    vendorId: "STO",
    vendor: "netfile",
  },
  {
    entity: "Sunnyvale",
    vendorId: "COS",
    vendor: "netfile",
  },
  {
    entity: "Temecula",
    vendorId: "TEM",
    vendor: "netfile",
  },
  {
    entity: "Torrance",
    vendorId: "TOR",
    vendor: "netfile",
  },
  {
    entity: "Ventura",
    vendorId: "COV",
    vendor: "netfile",
  },
  {
    entity: "Ventura County",
    vendorId: "VCO",
    vendor: "netfile",
  },
  {
    entity: "Victorville",
    vendorId: "VIC",
    vendor: "netfile",
  },
  {
    entity: "Watsonville",
    vendorId: "WAT",
    vendor: "netfile",
  },
  {
    entity: "West Hollywood",
    vendorId: "WEHO",
    vendor: "netfile",
  },
  {
    entity: "West Sacramento",
    vendorId: "WESTSAC",
    vendor: "netfile",
  },
  {
    entity: "Westminster",
    vendorId: "COW",
    vendor: "netfile",
  },
  {
    entity: "Yountville",
    vendorId: "TOY",
    vendor: "netfile",
  },
  // {
  //   entity: "",
  //   vendorId: "ACW",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "AGH",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "CPD",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "CSL",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "CVN",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "DCA",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "DOW",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "DPR",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "DWA",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "ETR",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "FRI",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "GCH",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "LAC",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "MCO",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "MGL",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "MPC",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "OES",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "OHF",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "OSI",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "RCA",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "RTA",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "SAM",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "CCA",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "CML",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "SHA",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "TIB",
  //   vendor: "netfile",
  // },
  // {
  //   entity: "",
  //   vendorId: "WLD",
  //   vendor: "netfile",
  // },
]

module.exports = { sitesToScrape }
