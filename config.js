const sitesToScrape = [
  {
    entity: "Adelanto",
    aid: "ADE",
  },
  {
    entity: "Alameda",
    aid: "COA",
  },
  {
    entity: "Anaheim",
    aid: "ANA",
  },
  {
    entity: "Antioch",
    aid: "ANT",
  },
  {
    entity: "Arroyo Grande",
    aid: "CAG",
  },
  {
    entity: "Azusa",
    aid: "AZU",
  },
  {
    entity: "Berkeley",
    aid: "BRK",
  },
  {
    entity: "Burbank",
    aid: "COB",
  },
  {
    entity: "Butte County",
    aid: "BCO",
  },
  {
    entity: "Calistoga",
    aid: "CAL",
  },
  {
    entity: "Capitola City",
    aid: "CAP",
  },
  {
    entity: "Carlsbad",
    aid: "CAR",
  },
  {
    entity: "Carson City",
    aid: "CRSN",
  },
  {
    entity: "Chico",
    aid: "CHCO",
  },
  {
    entity: "Chula Vista",
    aid: "CCV",
  },
  {
    entity: "Colton",
    aid: "COL",
  },
  {
    entity: "Contra Costa County",
    aid: "CCC",
  },
  {
    entity: "Coronado",
    aid: "COR",
  },
  {
    entity: "Cotati",
    aid: "COT",
  },
  {
    entity: "Covina",
    aid: "CVN",
  },
  {
    entity: "Culver City",
    aid: "CUL",
  },
  {
    entity: "Del Norte",
    aid: "DEL",
  },
  {
    entity: "Desert Hot Springs",
    aid: "DHS",
  },
  {
    entity: "Dublin",
    aid: "DUB",
  },
  {
    entity: "East Palo Alto",
    aid: "EPA",
  },
  {
    entity: "Eastville",
    aid: "ESV",
  },
  {
    entity: "Escondido",
    aid: "ESC",
  },
  {
    entity: "Fremont",
    aid: "FRE",
  },
  {
    entity: "Fresno",
    aid: "COF",
  },
  {
    entity: "Fullerton",
    aid: "FUL",
  },
  {
    entity: "Garden Grove",
    aid: "GGV",
  },
  {
    entity: "Gilroy",
    aid: "GIL",
  },
  {
    entity: "Glendale",
    aid: "GLD",
  },
  {
    entity: "Glendora",
    aid: "COG",
  },
  {
    entity: "Half Moon Bay",
    aid: "HMB",
  },
  {
    entity: "Hayward",
    aid: "HWD",
  },
  {
    entity: "Hesperia",
    aid: "HES",
  },
  {
    entity: "Hollister",
    aid: "HOL",
  },
  {
    entity: "Hill Valley",
    aid: "CHV",
  },
  {
    entity: "Huntington Beach",
    aid: "CHB",
  },
  {
    entity: "Indio",
    aid: "IND",
  },
  {
    entity: "Irvine",
    aid: "COI",
  },
  {
    entity: "Kern County",
    aid: "KERN",
  },
  {
    entity: "Lancaster",
    aid: "LAN",
  },
  {
    entity: "Laguna Niguel",
    aid: "CLN",
  },
  {
    entity: "Lake Elsinore",
    aid: "LES",
  },
  {
    entity: "Lake Forest",
    aid: "CLF",
  },
  {
    entity: "Livermore",
    aid: "LIV",
  },
  {
    entity: "Los Gatos",
    aid: "GAT",
  },
  {
    entity: "Madera County",
    aid: "MAD",
  },
  {
    entity: "Manhattan Beach",
    aid: "CMB",
  },
  {
    entity: "Manteca",
    aid: "MTA",
  },
  {
    entity: "Marin County",
    aid: "CMAR",
  },
  {
    entity: "Menifee",
    aid: "MEN",
  },
  {
    entity: "Menlo Park",
    aid: "CMP",
  },
  {
    entity: "Milpitas",
    aid: "MIL",
  },
  {
    entity: "Modesto",
    aid: "MOD",
  },
  {
    entity: "Monterey",
    aid: "COM",
  },
  {
    entity: "Monterey County",
    aid: "MCE",
  },
  {
    entity: "Mountain View",
    aid: "MTV",
  },
  {
    entity: "Monrovia",
    aid: "MON",
  },
  {
    entity: "Murrieta",
    aid: "CMA",
  },
  {
    entity: "Morgan Hill",
    aid: "MGH",
  },
  {
    entity: "Newport Beach",
    aid: "CNB",
  },
  {
    entity: "Nevada County",
    aid: "NEV",
  },
  {
    entity: "Numainville",
    aid: "NUM",
  },
  {
    entity: "Oakland",
    aid: "COAK",
  },
  {
    entity: "Oakley",
    aid: "OAK",
  },
  {
    entity: "Oceanside",
    aid: "OCN",
  },
  {
    entity: "Orange County",
    aid: "COC",
  },
  {
    entity: "Oroville",
    aid: "ORO",
  },
  {
    entity: "Palm Springs",
    aid: "CPS",
  },
  {
    entity: "Palo Alto",
    aid: "CPA",
  },
  {
    entity: "Pasadena",
    aid: "PSDA",
  },
  {
    entity: "Patterson",
    aid: "PTSN",
  },
  {
    entity: "Perris",
    aid: "PRS",
  },
  {
    entity: "Placer County",
    aid: "PLA",
  },
  {
    entity: "Pleasanton",
    aid: "COP",
  },
  {
    entity: "Rancho Cucamonga",
    aid: "CRC",
  },
  {
    entity: "Redding",
    aid: "RED",
  },
  {
    entity: "Redondo Beach",
    aid: "CRB",
  },
  {
    entity: "Rialto",
    aid: "RIAL",
  },
  {
    entity: "Riverside",
    aid: "CITRIV",
  },
  {
    entity: "Riverside County",
    aid: "CTRIV",
  },
  {
    entity: "Sacramento City",
    aid: "SAC",
  },
  {
    entity: "Sacramento County",
    aid: "SCO",
  },
  {
    entity: "Salinas",
    aid: "SLNS",
  },
  {
    entity: "San Bernadino",
    aid: "CSBN",
  },
  {
    entity: "San Bernadino County",
    aid: "SBD",
  },
  {
    entity: "San Bruno",
    aid: "BRU",
  },
  {
    entity: "San Diego",
    aid: "CSD",
  },
  {
    entity: "San Dimas",
    aid: "SDM",
  },
  {
    entity: "San Gabriel",
    aid: "CSG",
  },
  {
    entity: "San Francisco",
    aid: "SFO",
  },
  {
    entity: "San Joaquin County",
    aid: "SJC",
  },
  {
    entity: "San Jose",
    aid: "CSJ",
  },
  {
    entity: "San Luis Obispo",
    aid: "SLO",
  },
  {
    entity: "San Luis Obispo County",
    aid: "SLOCO",
  },
  {
    entity: "San Mateo County",
    aid: "MAT",
  },
  {
    entity: "San Rafael",
    aid: "RAF",
  },
  {
    entity: "Santa Ana",
    aid: "CSA",
  },
  {
    entity: "Santa Barbara",
    aid: "CSB",
  },
  {
    entity: "Santa Clara",
    aid: "CSC",
  },
  {
    entity: "Santa Clara County",
    aid: "SCC",
  },
  {
    entity: "Santa Cruz",
    aid: "CRUZ",
  },
  {
    entity: "Santa Cruz County",
    aid: "SCCO",
  },
  {
    entity: "Santa Fe Springs",
    aid: "SFS",
  },
  {
    entity: "Santa Maria",
    aid: "SMAR",
  },
  {
    entity: "Santa Monica",
    aid: "CSM",
  },
  {
    entity: "Santa Rosa",
    aid: "CSR",
  },
  {
    entity: "Santee",
    aid: "STE",
  },
  {
    entity: "Sausalito",
    aid: "SAU",
  },
  {
    entity: "Shasta County",
    aid: "CSHA",
  },
  {
    entity: "Sonoma",
    aid: "SMA",
  },
  {
    entity: "Stockton",
    aid: "STO",
  },
  {
    entity: "Sunnyvale",
    aid: "COS",
  },
  {
    entity: "Temecula",
    aid: "TEM",
  },
  {
    entity: "Torrance",
    aid: "TOR",
  },
  {
    entity: "Ventura",
    aid: "COV",
  },
  {
    entity: "Ventura County",
    aid: "VCO",
  },
  {
    entity: "Victorville",
    aid: "VIC",
  },
  {
    entity: "Watsonville",
    aid: "WAT",
  },
  {
    entity: "West Hollywood",
    aid: "WEHO",
  },
  {
    entity: "West Sacramento",
    aid: "WESTSAC",
  },
  {
    entity: "Westminster",
    aid: "COW",
  },
  {
    entity: "Yountville",
    aid: "TOY",
  },
]

module.exports = { sitesToScrape }
