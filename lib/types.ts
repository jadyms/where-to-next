import { ReactNode } from "react";

export type Currency = {
  readonly name: string;
  readonly symbol: string;
};

export type Language = {
  readonly code: string;
  readonly name: string;
};

export type ApiCountry = {
  readonly cca3: string;
  readonly capital?: [string];
  readonly name?: {
    readonly common: string;
    readonly official: string;
    readonly nativeName: {
      readonly spa: {
        readonly official: string;
        readonly common: string;
      };
    };
  };
  readonly population?: number;
  readonly flag?: ReactNode;
  readonly currencies?: {
    readonly [key: string]: {
      readonly name: string;
      readonly symbol: string;
    };
  };
  readonly languages?: {
    readonly [key: string]: string;
  };
  readonly borders?: [string];
  readonly unMember?: boolean;
};

[
  {
    name: {
      common: "Chile",
      official: "Republic of Chile",
      nativeName: {
        spa: {
          official: "República de Chile",
          common: "Chile",
        },
      },
    },
    tld: [".cl"],
    cca2: "CL",
    ccn3: "152",
    cca3: "CHL",
    cioc: "CHI",
    independent: true,
    status: "officially-assigned",
    unMember: true,
    currencies: {
      CLP: {
        name: "Chilean peso",
        symbol: "$",
      },
    },
    idd: {
      root: "+5",
      suffixes: ["6"],
    },
    capital: ["Santiago"],
    altSpellings: ["CL", "Republic of Chile", "República de Chile"],
    region: "Americas",
    subregion: "South America",
    languages: {
      spa: "Spanish",
    },
    translations: {
      ara: {
        official: "جمهورية تشيلي",
        common: "تشيلي",
      },
      ces: {
        official: "Chilská republika",
        common: "Chile",
      },
      cym: {
        official: "Gweriniaeth Chile",
        common: "Chile",
      },
      deu: {
        official: "Republik Chile",
        common: "Chile",
      },
      est: {
        official: "Tšiili Vabariik",
        common: "Tšiili",
      },
      fin: {
        official: "Chilen tasavalta",
        common: "Chile",
      },
      fra: {
        official: "République du Chili",
        common: "Chili",
      },
      hrv: {
        official: "Republika Čile",
        common: "Čile",
      },
      hun: {
        official: "Chilei Köztársaság",
        common: "Chile",
      },
      ita: {
        official: "Repubblica del Cile",
        common: "Cile",
      },
      jpn: {
        official: "チリ共和国",
        common: "チリ",
      },
      kor: {
        official: "칠레 공화국",
        common: "칠레",
      },
      nld: {
        official: "Republiek Chili",
        common: "Chili",
      },
      per: {
        official: "جمهوری شیلی",
        common: "شیلی",
      },
      pol: {
        official: "Republika Chile",
        common: "Chile",
      },
      por: {
        official: "República do Chile",
        common: "Chile",
      },
      rus: {
        official: "Республика Чили",
        common: "Чили",
      },
      slk: {
        official: "Čílska republika",
        common: "Čile",
      },
      spa: {
        official: "República de Chile",
        common: "Chile",
      },
      swe: {
        official: "Republiken Chile",
        common: "Chile",
      },
      urd: {
        official: "جمہوریہ چلی",
        common: "چلی",
      },
      zho: {
        official: "智利共和国",
        common: "智利",
      },
    },
    latlng: [-30, -71],
    landlocked: false,
    borders: ["ARG", "BOL", "PER"],
    area: 756102,
    demonyms: {
      eng: {
        f: "Chilean",
        m: "Chilean",
      },
      fra: {
        f: "Chilienne",
        m: "Chilien",
      },
    },
    flag: "🇨🇱",
    maps: {
      googleMaps: "https://goo.gl/maps/XboxyNHh2fAjCPNn9",
      openStreetMaps: "https://www.openstreetmap.org/relation/167454",
    },
    population: 19116209,
    gini: {
      2017: 44.4,
    },
    fifa: "CHI",
    car: {
      signs: ["RCH"],
      side: "right",
    },
    timezones: ["UTC-06:00", "UTC-04:00"],
    continents: ["South America"],
    flags: {
      png: "https://flagcdn.com/w320/cl.png",
      svg: "https://flagcdn.com/cl.svg",
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/cl.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/cl.svg",
    },
    startOfWeek: "monday",
    capitalInfo: {
      latlng: [-33.45, -70.67],
    },
    postalCode: {
      format: "#######",
      regex: "^(d{7})$",
    },
  },
];
