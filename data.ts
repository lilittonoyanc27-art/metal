export interface FullTextParagraph {
  id: string;
  es: string;
  hy: string;
}

export interface DetailedSection {
  id: string;
  number: number;
  titleEs: string;
  titleHy: string;
  iconName?: string;
  items?: {
    es: string;
    hy: string;
    note?: string;
  }[];
  subsections?: {
    titleEs: string;
    titleHy: string;
    items: {
      es: string;
      hy: string;
    }[];
  }[];
  specialNote?: {
    es: string;
    hy: string;
  };
}

export interface VocabItem {
  id: number;
  es: string;
  hy: string;
  category?: string;
}

export interface ExamQuestion {
  id: number;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
}

export const APP_DATA = {
  header: {
    unit: "UNIT 1: PREHISTORY",
    titleEs: "4. THE METAL AGES — LA EDAD DE LOS METALES",
    titleHy: "ՄԵՏԱՂՆԵՐԻ ԴԱՐԱՇՐՋԱՆԸ",
    subtitleEs: "Texto completo para entender y contar",
    subtitleHy: "Լիարժեք տեքստ՝ հասկանալու և պատմելու համար"
  },

  // 0. MAIN SUMMARY (ГЛАВНАЯ / ԳԼԽԱՎՈՐ)
  mainSummary: {
    titleEs: "La Edad de los Metales",
    titleHy: "Մետաղների դարաշրջանը",
    paragraphsEs: [
      "La Edad de los Metales fue una etapa de la Prehistoria posterior al Neolítico.",
      "Durante este periodo, los seres humanos aprendieron a trabajar primero el cobre, después el bronce y finalmente el hierro.",
      "Gracias a los metales, fabricaron herramientas y armas más resistentes. También crecieron los poblados y aumentó el comercio.",
      "Además, se desarrollaron avances importantes como la rueda, el arado y la vela.",
      "La sociedad se hizo más organizada y aparecieron diferentes trabajos y grupos sociales."
    ],
    paragraphsHy: [
      "Մետաղների դարաշրջանը նախապատմության մի փուլ էր, որը հաջորդեց Նեոլիթին։",
      "Այս ժամանակաշրջանում մարդիկ սովորեցին սկզբում մշակել պղինձը, հետո՝ բրոնզը, իսկ վերջում՝ երկաթը։",
      "Մետաղների շնորհիվ նրանք պատրաստեցին ավելի ամուր գործիքներ և զենքեր։ Բնակավայրերը մեծացան, և առևտուրը զարգացավ։",
      "Բացի այդ, կարևոր առաջընթացներ եղան՝ անիվը, գութանը և առագաստը։",
      "Հասարակությունը դարձավ ավելի կազմակերպված, և առաջացան տարբեր աշխատանքներ ու սոցիալական խմբեր։"
    ]
  },

  // 1. FULL TEXT
  fullText: [
    {
      id: "p1",
      es: "La Edad de los Metales fue una etapa de la Prehistoria que comenzó después del Neolítico.",
      hy: "Մետաղների դարաշրջանը նախապատմության մի փուլ էր, որը սկսվեց Նեոլիթից հետո։"
    },
    {
      id: "p2",
      es: "Durante este periodo, los seres humanos aprendieron a trabajar diferentes metales. Primero utilizaron el cobre, después el bronce y, finalmente, el hierro.",
      hy: "Այս ժամանակաշրջանում մարդիկ սովորեցին մշակել տարբեր մետաղներ։ Սկզբում նրանք օգտագործում էին պղինձը, հետո՝ բրոնզը, իսկ վերջում՝ երկաթը։"
    },
    {
      id: "p3",
      es: "El uso de los metales fue muy importante porque permitió fabricar herramientas y armas más resistentes y eficaces que las de piedra.",
      hy: "Մետաղների օգտագործումը շատ կարևոր էր, որովհետև հնարավորություն տվեց պատրաստել ավելի ամուր և արդյունավետ գործիքներ ու զենքեր, քան քարից պատրաստվածները։"
    },
    {
      id: "p4",
      es: "En esta etapa, muchas aldeas crecieron y algunas se convirtieron en poblados más grandes. Las comunidades se hicieron más organizadas y aumentó la división del trabajo.",
      hy: "Այս ժամանակաշրջանում շատ գյուղեր մեծացան, և դրանցից որոշները դարձան ավելի խոշոր բնակավայրեր։ Համայնքները դարձան ավելի կազմակերպված, և աշխատանքի բաժանումն ավելի մեծացավ։"
    },
    {
      id: "p5",
      es: "No todas las personas realizaban las mismas tareas. Algunas trabajaban en la agricultura, otras cuidaban animales, otras fabricaban objetos de metal y otras se dedicaban al comercio.",
      hy: "Բոլոր մարդիկ նույն աշխատանքը չէին կատարում։ Ոմանք զբաղվում էին գյուղատնտեսությամբ, մյուսները խնամում էին կենդանիներին, ուրիշները պատրաստում էին մետաղական իրեր, իսկ որոշ մարդիկ զբաղվում էին առևտրով։"
    },
    {
      id: "p6",
      es: "También se desarrolló el intercambio de productos entre diferentes comunidades. Las personas intercambiaban alimentos, metales, herramientas, tejidos y otros productos.",
      hy: "Տարբեր համայնքների միջև զարգացավ նաև ապրանքների փոխանակումը։ Մարդիկ փոխանակում էին սնունդ, մետաղներ, գործիքներ, գործվածքներ և այլ ապրանքներ։"
    },
    {
      id: "p7",
      es: "Con el desarrollo del comercio, algunas comunidades entraron en contacto con lugares más lejanos.",
      hy: "Առևտրի զարգացման շնորհիվ որոշ համայնքներ կապ հաստատեցին ավելի հեռու գտնվող վայրերի հետ։"
    },
    {
      id: "p8",
      es: "Durante la Edad de los Metales también aparecieron nuevos inventos y avances. Entre ellos se encuentran la rueda, el arado y la vela para la navegación.",
      hy: "Մետաղների դարաշրջանում առաջացան նաև նոր գյուտեր և զարգացումներ։ Դրանցից էին անիվը, գութանը և առագաստը։"
    },
    {
      id: "p9",
      es: "La rueda facilitó el transporte de personas y mercancías. El arado ayudó a trabajar la tierra de una manera más eficaz. La vela permitió aprovechar el viento para navegar.",
      hy: "Անիվը հեշտացրեց մարդկանց և ապրանքների տեղափոխումը։ Գութանը օգնեց ավելի արդյունավետ մշակել հողը։ Առագաստը հնարավորություն տվեց օգտագործել քամին նավարկության համար։"
    },
    {
      id: "p10",
      es: "La sociedad se hizo más compleja. Algunas personas acumularon más riqueza y poder que otras, por lo que comenzaron a aparecer mayores diferencias sociales.",
      hy: "Հասարակությունը դարձավ ավելի բարդ։ Որոշ մարդիկ ավելի շատ հարստություն և իշխանություն ունեցան, քան մյուսները, և այդ պատճառով սոցիալական տարբերություններն ավելի մեծացան։"
    },
    {
      id: "p11",
      es: "También se construyeron grandes monumentos de piedra, llamados monumentos megalíticos. Algunos ejemplos son los menhires, los dólmenes y los crómlech.",
      hy: "Այս ժամանակաշրջանում կառուցվեցին նաև մեծ քարե հուշարձաններ, որոնք կոչվում են մեգալիթյան հուշարձաններ։ Դրանց օրինակներն են մենհիրները, դոլմենները և կրոմլեխները։"
    },
    {
      id: "p12",
      es: "En resumen, durante la Edad de los Metales, los seres humanos aprendieron a trabajar el cobre, el bronce y el hierro, mejoraron sus herramientas y armas, desarrollaron el comercio, inventaron nuevos medios de transporte y construyeron sociedades más complejas.",
      hy: "Ամփոփելով՝ Մետաղների դարաշրջանում մարդիկ սովորեցին մշակել պղինձը, բրոնզը և երկաթը, բարելավեցին գործիքներն ու զենքերը, զարգացրին առևտուրը, ստեղծեցին նոր փոխադրամիջոցներ և կառուցեցին ավելի բարդ հասարակություններ։"
    }
  ] as FullTextParagraph[],

  // 2. DETAILED EXPLANATION (1 to 12)
  detailedSections: [
    {
      id: "sec-1",
      number: 1,
      titleEs: "¿Qué fue la Edad de los Metales?",
      titleHy: "Ի՞նչ էր Մետաղների դարաշրջանը։",
      items: [
        {
          es: "Fue una etapa de la Prehistoria posterior al Neolítico.",
          hy: "Դա նախապատմության մի փուլ էր, որը հաջորդեց Նեոլիթին։"
        },
        {
          es: "Se caracteriza por el uso de metales para fabricar herramientas, armas y otros objetos.",
          hy: "Այն բնորոշվում է գործիքներ, զենքեր և այլ իրեր պատրաստելու համար մետաղների օգտագործմամբ։"
        }
      ]
    },
    {
      id: "sec-2",
      number: 2,
      titleEs: "¿Qué metales se utilizaron?",
      titleHy: "Ի՞նչ մետաղներ էին օգտագործվում։",
      specialNote: {
        es: "La Edad de los Metales suele dividirse en tres etapas: Cobre → Bronce → Hierro",
        hy: "Մետաղների դարաշրջանը սովորաբար բաժանվում է երեք փուլի՝ Պղինձ → Բրոնզ → Երկաթ"
      },
      subsections: [
        {
          titleEs: "Edad del Cobre",
          titleHy: "Պղնձի դար",
          items: [
            {
              es: "El cobre fue uno de los primeros metales utilizados.",
              hy: "Պղինձը առաջին օգտագործվող մետաղներից մեկն էր։"
            },
            {
              es: "Era más fácil de trabajar, pero no era muy resistente.",
              hy: "Այն հեշտ էր մշակել, բայց այնքան էլ ամուր չէր։"
            }
          ]
        },
        {
          titleEs: "Edad del Bronce",
          titleHy: "Բրոնզի դար",
          items: [
            {
              es: "El bronce es una aleación de cobre y estaño.",
              hy: "Բրոնզը պղնձի և անագի համաձուլվածք է։"
            },
            {
              es: "Era más resistente que el cobre.",
              hy: "Այն ավելի ամուր էր, քան պղինձը։"
            },
            {
              es: "Se utilizaba para fabricar herramientas, armas y objetos.",
              hy: "Այն օգտագործվում էր գործիքներ, զենքեր և տարբեր իրեր պատրաստելու համար։"
            }
          ]
        },
        {
          titleEs: "Edad del Hierro",
          titleHy: "Երկաթի դար",
          items: [
            {
              es: "El hierro era más duro y resistente.",
              hy: "Երկաթն ավելի կոշտ և ամուր էր։"
            },
            {
              es: "Permitió fabricar herramientas y armas más eficaces.",
              hy: "Այն հնարավորություն տվեց պատրաստել ավելի արդյունավետ գործիքներ և զենքեր։"
            }
          ]
        }
      ]
    },
    {
      id: "sec-3",
      number: 3,
      titleEs: "Las herramientas y las armas",
      titleHy: "Գործիքներն ու զենքերը",
      items: [
        {
          es: "Los objetos de metal eran más resistentes que muchos objetos de piedra.",
          hy: "Մետաղական իրերն ավելի ամուր էին, քան քարե շատ իրեր։"
        },
        {
          es: "Se fabricaban cuchillos, hachas, puntas de lanza, espadas y herramientas agrícolas.",
          hy: "Պատրաստվում էին դանակներ, կացիններ, նիզակների ծայրեր, սրեր և գյուղատնտեսական գործիքներ։"
        },
        {
          es: "Esto facilitó el trabajo y también cambió la forma de luchar.",
          hy: "Դա հեշտացրեց աշխատանքը և փոխեց նաև կռվելու ձևերը։"
        }
      ]
    },
    {
      id: "sec-4",
      number: 4,
      titleEs: "Los artesanos",
      titleHy: "Արհեստավորները",
      items: [
        {
          es: "Aparecieron especialistas que sabían trabajar los metales.",
          hy: "Առաջացան մասնագետներ, որոնք գիտեին մետաղ մշակել։"
        },
        {
          es: "Estos artesanos fabricaban herramientas, armas, adornos y otros objetos.",
          hy: "Այս արհեստավորները պատրաստում էին գործիքներ, զենքեր, զարդեր և այլ իրեր։"
        },
        {
          es: "El trabajo de los metales necesitaba conocimientos especiales.",
          hy: "Մետաղների մշակումը հատուկ գիտելիքներ էր պահանջում։"
        }
      ]
    },
    {
      id: "sec-5",
      number: 5,
      titleEs: "El crecimiento de los poblados",
      titleHy: "Բնակավայրերի մեծացումը",
      items: [
        {
          es: "Muchas aldeas crecieron y se hicieron más importantes.",
          hy: "Շատ գյուղեր մեծացան և դարձան ավելի կարևոր։"
        },
        {
          es: "Algunos poblados tenían defensas o murallas.",
          hy: "Որոշ բնակավայրեր ունեին պաշտպանական կառույցներ կամ պարիսպներ։"
        },
        {
          es: "Las comunidades eran cada vez más numerosas y organizadas.",
          hy: "Համայնքները դառնում էին ավելի մեծ և կազմակերպված։"
        }
      ]
    },
    {
      id: "sec-6",
      number: 6,
      titleEs: "La división del trabajo",
      titleHy: "Աշխատանքի բաժանումը",
      items: [
        {
          es: "No todas las personas hacían el mismo trabajo.",
          hy: "Բոլոր մարդիկ նույն աշխատանքը չէին անում։"
        },
        {
          es: "Algunas personas eran: agricultores, ganaderos, artesanos, comerciantes, guerreros.",
          hy: "Որոշ մարդիկ էին՝ հողագործներ, անասնապահներ, արհեստավորներ, առևտրականներ, ռազմիկներ։"
        },
        {
          es: "agricultores — ganaderos — artesanos — comerciantes — guerreros",
          hy: "հողագործներ — անասնապահներ — արհեստավորներ — առևտրականներ — ռազմիկներ"
        },
        {
          es: "Esto hizo que la sociedad fuera más compleja.",
          hy: "Սա հասարակությունը դարձրեց ավելի բարդ։"
        }
      ]
    },
    {
      id: "sec-7",
      number: 7,
      titleEs: "El comercio",
      titleHy: "Առևտուրը",
      items: [
        {
          es: "El comercio aumentó durante la Edad de los Metales.",
          hy: "Մետաղների դարաշրջանում առևտուրը զարգացավ։"
        },
        {
          es: "Los metales no estaban disponibles en todos los lugares.",
          hy: "Մետաղները բոլոր վայրերում հասանելի չէին։"
        },
        {
          es: "Por eso, las comunidades intercambiaban productos con otros pueblos.",
          hy: "Այդ պատճառով համայնքները ապրանքներ էին փոխանակում այլ բնակավայրերի հետ։"
        },
        {
          es: "Podían intercambiar metales, alimentos, tejidos, herramientas y cerámica.",
          hy: "Կարող էին փոխանակել մետաղներ, սնունդ, գործվածքներ, գործիքներ և խեցեղեն։"
        }
      ]
    },
    {
      id: "sec-8",
      number: 8,
      titleEs: "La rueda",
      titleHy: "Անիվը",
      items: [
        {
          es: "La rueda fue un avance muy importante.",
          hy: "Անիվը շատ կարևոր առաջընթաց էր։"
        },
        {
          es: "Permitió construir carros y transportar productos con mayor facilidad.",
          hy: "Այն հնարավորություն տվեց կառուցել սայլեր և ավելի հեշտ տեղափոխել ապրանքներ։"
        }
      ]
    },
    {
      id: "sec-9",
      number: 9,
      titleEs: "El arado",
      titleHy: "Գութանը",
      items: [
        {
          es: "El arado permitió trabajar la tierra de forma más eficaz.",
          hy: "Գութանը հնարավորություն տվեց ավելի արդյունավետ մշակել հողը։"
        },
        {
          es: "Esto ayudó a mejorar la agricultura.",
          hy: "Սա օգնեց զարգացնել գյուղատնտեսությունը։"
        }
      ]
    },
    {
      id: "sec-10",
      number: 10,
      titleEs: "La vela y la navegación",
      titleHy: "Առագաստը և նավարկությունը",
      items: [
        {
          es: "La vela permitió utilizar la fuerza del viento para mover embarcaciones.",
          hy: "Առագաստը հնարավորություն տվեց օգտագործել քամու ուժը նավերը շարժելու համար։"
        },
        {
          es: "Esto facilitó los viajes y el comercio.",
          hy: "Սա հեշտացրեց ճանապարհորդությունն ու առևտուրը։"
        }
      ]
    },
    {
      id: "sec-11",
      number: 11,
      titleEs: "Las diferencias sociales",
      titleHy: "Սոցիալական տարբերությունները",
      items: [
        {
          es: "La sociedad se hizo más desigual.",
          hy: "Հասարակության մեջ անհավասարությունն ավելի մեծացավ։"
        },
        {
          es: "Algunas personas tenían más riqueza, tierras o poder.",
          hy: "Որոշ մարդիկ ավելի շատ հարստություն, հող կամ իշխանություն ունեին։"
        },
        {
          es: "Por eso comenzaron a aparecer grupos sociales diferentes.",
          hy: "Այդ պատճառով սկսեցին առաջանալ տարբեր սոցիալական խմբեր։"
        }
      ]
    },
    {
      id: "sec-12",
      number: 12,
      titleEs: "Los monumentos megalíticos",
      titleHy: "Մեգալիթյան հուշարձանները",
      items: [
        {
          es: "Un monumento megalítico es una construcción hecha con grandes piedras.",
          hy: "Մեգալիթյան հուշարձանը մեծ քարերով կառուցված կառույց է։"
        }
      ],
      subsections: [
        {
          titleEs: "Menhir",
          titleHy: "Մենհիր",
          items: [
            {
              es: "Es una gran piedra colocada verticalmente.",
              hy: "Մեծ քար է, որը ուղղահայաց տեղադրված է։"
            }
          ]
        },
        {
          titleEs: "Dolmen",
          titleHy: "Դոլմեն",
          items: [
            {
              es: "Está formado por grandes piedras verticales y una piedra horizontal encima.",
              hy: "Կազմված է ուղղահայաց մեծ քարերից, որոնց վրա դրված է հորիզոնական քար։"
            }
          ]
        },
        {
          titleEs: "Crómlech",
          titleHy: "Կրոմլեխ",
          items: [
            {
              es: "Es un conjunto de piedras colocadas formando un círculo.",
              hy: "Շրջանաձև դասավորված մեծ քարերի խումբ է։"
            }
          ]
        }
      ]
    }
  ] as DetailedSection[],

  // 3. VOCABULARY (22 terms)
  vocabulary: [
    { id: 1, es: "Edad de los Metales", hy: "Մետաղների դարաշրջան", category: "Época" },
    { id: 2, es: "cobre", hy: "պղինձ", category: "Metal" },
    { id: 3, es: "bronce", hy: "բրոնզ", category: "Metal" },
    { id: 4, es: "hierro", hy: "երկաթ", category: "Metal" },
    { id: 5, es: "metal", hy: "մետաղ", category: "Material" },
    { id: 6, es: "arma", hy: "զենք", category: "Objeto" },
    { id: 7, es: "herramienta", hy: "գործիք", category: "Objeto" },
    { id: 8, es: "artesano", hy: "արհեստավոր", category: "Oficio" },
    { id: 9, es: "comercio", hy: "առևտուր", category: "Economía" },
    { id: 10, es: "intercambio", hy: "փոխանակում", category: "Economía" },
    { id: 11, es: "riqueza", hy: "հարստություն", category: "Sociedad" },
    { id: 12, es: "poder", hy: "իշխանություն", category: "Sociedad" },
    { id: 13, es: "rueda", hy: "անիվ", category: "Invento" },
    { id: 14, es: "carro", hy: "սայլ", category: "Invento" },
    { id: 15, es: "arado", hy: "գութան", category: "Invento" },
    { id: 16, es: "vela", hy: "առագաստ", category: "Invento" },
    { id: 17, es: "navegación", hy: "նավարկություն", category: "Invento" },
    { id: 18, es: "poblado", hy: "բնակավայր", category: "Sociedad" },
    { id: 19, es: "muralla", hy: "պարիսպ", category: "Defensa" },
    { id: 20, es: "monumento megalítico", hy: "մեգալիթյան հուշարձան", category: "Monumento" },
    { id: 21, es: "menhir", hy: "մենհիր", category: "Monumento" },
    { id: 22, es: "dolmen", hy: "դոլմեն", category: "Monumento" },
    { id: 23, es: "crómlech", hy: "կրոմլեխ", category: "Monumento" }
  ] as VocabItem[],

  // 4. EXAM QUESTIONS AND ANSWERS (24 Q&A)
  examQuestions: [
    {
      id: 1,
      questionEs: "¿Qué fue la Edad de los Metales?",
      questionHy: "Ի՞նչ էր Մետաղների դարաշրջանը։",
      answerEs: "Fue una etapa de la Prehistoria en la que los seres humanos aprendieron a trabajar los metales.",
      answerHy: "Դա նախապատմության մի փուլ էր, երբ մարդիկ սովորեցին մշակել մետաղները։"
    },
    {
      id: 2,
      questionEs: "¿Qué etapa fue anterior a la Edad de los Metales?",
      questionHy: "Ո՞ր ժամանակաշրջանն էր նախորդում Մետաղների դարաշրջանին։",
      answerEs: "El Neolítico.",
      answerHy: "Նեոլիթը։"
    },
    {
      id: 3,
      questionEs: "¿Cuáles fueron los tres metales principales?",
      questionHy: "Որո՞նք էին երեք հիմնական մետաղները։",
      answerEs: "El cobre, el bronce y el hierro.",
      answerHy: "Պղինձը, բրոնզը և երկաթը։"
    },
    {
      id: 4,
      questionEs: "¿Cuál fue el primer metal utilizado?",
      questionHy: "Ո՞ր մետաղն առաջինը սկսեցին օգտագործել։",
      answerEs: "El cobre.",
      answerHy: "Պղինձը։"
    },
    {
      id: 5,
      questionEs: "¿Qué es el bronce?",
      questionHy: "Ի՞նչ է բրոնզը։",
      answerEs: "Es una aleación de cobre y estaño.",
      answerHy: "Այն պղնձի և անագի համաձուլվածք է։"
    },
    {
      id: 6,
      questionEs: "¿Qué metal era más duro y resistente?",
      questionHy: "Ո՞ր մետաղն էր ավելի կոշտ և ամուր։",
      answerEs: "El hierro.",
      answerHy: "Երկաթը։"
    },
    {
      id: 7,
      questionEs: "¿Por qué fueron importantes los metales?",
      questionHy: "Ինչո՞ւ էին մետաղները կարևոր։",
      answerEs: "Porque permitieron fabricar herramientas y armas más resistentes.",
      answerHy: "Որովհետև հնարավորություն տվեցին պատրաստել ավելի ամուր գործիքներ և զենքեր։"
    },
    {
      id: 8,
      questionEs: "¿Qué objetos fabricaban con metal?",
      questionHy: "Ի՞նչ իրեր էին պատրաստում մետաղից։",
      answerEs: "Herramientas, armas y adornos.",
      answerHy: "Գործիքներ, զենքեր և զարդեր։"
    },
    {
      id: 9,
      questionEs: "¿Quiénes trabajaban los metales?",
      questionHy: "Ովքե՞ր էին մշակում մետաղները։",
      answerEs: "Los artesanos especializados.",
      answerHy: "Մասնագիտացված արհեստավորները։"
    },
    {
      id: 10,
      questionEs: "¿Qué ocurrió con las aldeas?",
      questionHy: "Ի՞նչ տեղի ունեցավ գյուղերի հետ։",
      answerEs: "Muchas crecieron y se convirtieron en poblados más grandes.",
      answerHy: "Դրանցից շատերը մեծացան և դարձան ավելի խոշոր բնակավայրեր։"
    },
    {
      id: 11,
      questionEs: "¿Qué significa división del trabajo?",
      questionHy: "Ի՞նչ է նշանակում աշխատանքի բաժանում։",
      answerEs: "Significa que diferentes personas realizan trabajos diferentes.",
      answerHy: "Դա նշանակում է, որ տարբեր մարդիկ տարբեր աշխատանքներ են կատարում։"
    },
    {
      id: 12,
      questionEs: "¿Qué trabajos existían?",
      questionHy: "Ի՞նչ աշխատանքներ կային։",
      answerEs: "Agricultura, ganadería, artesanía, comercio y otras actividades.",
      answerHy: "Գյուղատնտեսություն, անասնապահություն, արհեստագործություն, առևտուր և այլ աշխատանքներ։"
    },
    {
      id: 13,
      questionEs: "¿Por qué aumentó el comercio?",
      questionHy: "Ինչո՞ւ զարգացավ առևտուրը։",
      answerEs: "Porque las comunidades necesitaban intercambiar productos y conseguir metales.",
      answerHy: "Որովհետև համայնքները պետք է փոխանակեին ապրանքներ և ձեռք բերեին մետաղներ։"
    },
    {
      id: 14,
      questionEs: "¿Qué productos se intercambiaban?",
      questionHy: "Ի՞նչ ապրանքներ էին փոխանակում։",
      answerEs: "Metales, alimentos, herramientas, tejidos y otros productos.",
      answerHy: "Մետաղներ, սնունդ, գործիքներ, գործվածքներ և այլ ապրանքներ։"
    },
    {
      id: 15,
      questionEs: "¿Para qué servía la rueda?",
      questionHy: "Ինչի՞ համար էր օգտագործվում անիվը։",
      answerEs: "Para facilitar el transporte.",
      answerHy: "Փոխադրումը հեշտացնելու համար։"
    },
    {
      id: 16,
      questionEs: "¿Para qué servía el arado?",
      questionHy: "Ինչի՞ համար էր օգտագործվում գութանը։",
      answerEs: "Para trabajar la tierra de forma más eficaz.",
      answerHy: "Հողն ավելի արդյունավետ մշակելու համար։"
    },
    {
      id: 17,
      questionEs: "¿Para qué servía la vela?",
      questionHy: "Ինչի՞ համար էր օգտագործվում առագաստը։",
      answerEs: "Para aprovechar el viento y facilitar la navegación.",
      answerHy: "Քամու ուժն օգտագործելու և նավարկությունը հեշտացնելու համար։"
    },
    {
      id: 18,
      questionEs: "¿Cómo cambió la sociedad?",
      questionHy: "Ինչպե՞ս փոխվեց հասարակությունը։",
      answerEs: "Se hizo más grande, organizada y compleja.",
      answerHy: "Այն դարձավ ավելի մեծ, կազմակերպված և բարդ։"
    },
    {
      id: 19,
      questionEs: "¿Por qué aparecieron diferencias sociales?",
      questionHy: "Ինչո՞ւ առաջացան սոցիալական տարբերություններ։",
      answerEs: "Porque algunas personas tenían más riqueza y poder que otras.",
      answerHy: "Որովհետև որոշ մարդիկ ավելի շատ հարստություն և իշխանություն ունեին, քան մյուսները։"
    },
    {
      id: 20,
      questionEs: "¿Qué es un monumento megalítico?",
      questionHy: "Ի՞նչ է մեգալիթյան հուշարձանը։",
      answerEs: "Es una construcción hecha con grandes piedras.",
      answerHy: "Դա մեծ քարերից կառուցված կառույց է։"
    },
    {
      id: 21,
      questionEs: "¿Qué es un menhir?",
      questionHy: "Ի՞նչ է մենհիրը։",
      answerEs: "Es una gran piedra colocada verticalmente.",
      answerHy: "Դա ուղղահայաց կանգնեցված մեծ քար է։"
    },
    {
      id: 22,
      questionEs: "¿Qué es un dolmen?",
      questionHy: "Ի՞նչ է դոլմենը։",
      answerEs: "Es una construcción formada por grandes piedras verticales y una piedra horizontal encima.",
      answerHy: "Դա կառույց է՝ կազմված ուղղահայաց մեծ քարերից և դրանց վրա դրված հորիզոնական քարից։"
    },
    {
      id: 23,
      questionEs: "¿Qué es un crómlech?",
      questionHy: "Ի՞նչ է կրոմլեխը։",
      answerEs: "Es un conjunto de grandes piedras colocadas formando un círculo.",
      answerHy: "Դա շրջանաձև դասավորված մեծ քարերի խումբ է։"
    },
    {
      id: 24,
      questionEs: "¿Cuáles son los principales avances de la Edad de los Metales?",
      questionHy: "Որո՞նք են Մետաղների դարաշրջանի հիմնական առաջընթացները։",
      answerEs: "El trabajo de los metales, el comercio, la rueda, el arado y la navegación.",
      answerHy: "Մետաղների մշակումը, առևտուրը, անիվը, գութանը և նավարկությունը։"
    }
  ] as ExamQuestion[],

  // 5. SHORT TEXT
  shortText: {
    titleEs: "Texto corto",
    titleHy: "Կարճ տեքստ՝",
    paragraphs: [
      {
        id: "st1",
        es: "La Edad de los Metales fue una etapa de la Prehistoria después del Neolítico. Los seres humanos aprendieron a trabajar primero el cobre, después el bronce y finalmente el hierro.",
        hy: "Մետաղների դարաշրջանը նախապատմության մի փուլ էր, որը հաջորդեց Նեոլիթին։ Մարդիկ սովորեցին սկզբում մշակել պղինձը, հետո՝ բրոնզը, իսկ վերջում՝ երկաթը։"
      },
      {
        id: "st2",
        es: "Gracias a los metales, fabricaron herramientas y armas más resistentes. También crecieron los poblados, aumentó el comercio y apareció una mayor división del trabajo.",
        hy: "Մետաղների շնորհիվ նրանք պատրաստեցին ավելի ամուր գործիքներ և զենքեր։ Բնակավայրերը մեծացան, զարգացավ առևտուրը և աշխատանքի բաժանումը։"
      },
      {
        id: "st3",
        es: "En esta etapa se desarrollaron avances importantes como la rueda, el arado y la vela. La sociedad se hizo más compleja y aparecieron diferencias de riqueza y poder.",
        hy: "Այս ժամանակաշրջանում զարգացան նաև անիվը, գութանը և առագաստը։ Հասարակությունը դարձավ ավելի բարդ, և առաջացան հարստության ու իշխանության տարբերություններ։"
      }
    ]
  }
};
