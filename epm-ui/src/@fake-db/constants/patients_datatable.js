import mock from '../mock'
import {paginateArray} from '../utils'

const data = [
  {
    responsive_id: "",
    id: 1,
    avatar: "10.jpg",
    patient_name: "Korrie O'Crevy",
    dob: "09/23/2016",
    age: "61",
    primary_phone: "",
    primary_provider: "",
    email: "kocrevy0@thetimes.co.uk",
    city: "Krasnosilka",
    status: 2
  },
  {
    responsive_id: "",
    id: 2,
    avatar: "1.jpg",
    patient_name: "Bailie Coulman",
    primary_phone: "",
    primary_provider: "",
    secondary_provider: "",
    email: "bcoulman1@yolasite.com",
    city: "Hinigaran",
    dob: "05/20/2018",
    age: "63",
    status: 2
  },
  {
    responsive_id: "",
    id: 3,
    avatar: "9.jpg",
    patient_name: "Stella Ganderton",
    primary_phone: "",
    primary_provider: "",
    secondary_provider: "",
    email: "sganderton2@tuttocitta.it",
    city: "Golcowa",
    dob: "03/24/2018",
    age: "66",
    experience: "6 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 4,
    avatar: "10.jpg",
    patient_name: "Dorolice Crossman",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "dcrossman3@google.co.jp",
    city: "Paquera",
    dob: "12/03/2017",
    age: "22",
    experience: "2 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 5,
    avatar: "",
    patient_name: "Harmonia Nisius",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "hnisius4@gnu.org",
    city: "Lucan",
    dob: "08/25/2017",
    age: "33",
    experience: "3 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 6,
    avatar: "",
    patient_name: "Genevra Honeywood",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ghoneywood5@narod.ru",
    city: "Maofan",
    dob: "06/01/2017",

    age: "61",
    experience: "1 Year",
    status: 1
  },
  {
    responsive_id: "",
    id: 7,
    avatar: "",
    patient_name: "Eileen Diehn",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ediehn6@163.com",
    city: "Lampuyang",
    dob: "10/15/2017",

    age: "59",
    experience: "9 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 8,
    avatar: "9.jpg",
    patient_name: "Richardo Aldren",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "raldren7@mtv.com",
    city: "Skoghall",
    dob: "11/05/2016",

    age: "55",
    experience: "5 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 9,
    avatar: "2.jpg",
    patient_name: "Allyson Moakler",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "amoakler8@shareasale.com",
    city: "Mogilany",
    dob: "12/29/2018",

    age: "39",
    experience: "9 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 10,
    avatar: "9.jpg",
    patient_name: "Merline Penhalewick",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mpenhalewick9@php.net",
    city: "Kanuma",
    dob: "04/19/2019",

    age: "23",
    experience: "3 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 11,
    avatar: "",
    patient_name: "De Falloon",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "dfalloona@ifeng.com",
    city: "Colima",
    dob: "06/12/2018",

    age: "30",
    experience: "0 Year",
    status: 4
  },
  {
    responsive_id: "",
    id: 12,
    avatar: "",
    patient_name: "Cyrus Gornal",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "cgornalb@fda.gov",
    city: "Boro Utara",
    dob: "12/09/2017",

    age: "22",
    experience: "2 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 13,
    avatar: "",
    patient_name: "Tallou Balf",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "tbalfc@sina.com.cn",
    city: "Siliana",
    dob: "01/21/2016",

    age: "36",
    experience: "6 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 14,
    avatar: "",
    patient_name: "Othilia Extill",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "oextilld@theatlantic.com",
    city: "Brzyska",
    dob: "02/01/2016",

    age: "43",
    experience: "3 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 15,
    avatar: "",
    patient_name: "Wilmar Bourton",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "wbourtone@sakura.ne.jp",
    city: "Bích Động",
    dob: "04/25/2018",

    age: "19",
    experience: "9 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 16,
    avatar: "4.jpg",
    patient_name: "Robinson Brazenor",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rbrazenorf@symantec.com",
    city: "Gendiwu",
    dob: "12/23/2017",

    age: "66",
    experience: "6 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 17,
    avatar: "",
    patient_name: "Nadia Bettenson",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "nbettensong@joomla.org",
    city: "Chabařovice",
    dob: "07/11/2018",

    age: "64",
    experience: "4 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 18,
    avatar: "",
    patient_name: "Titus Hayne",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "thayneh@kickstarter.com",
    city: "Yangon",
    dob: "05/25/2019",

    age: "59",
    experience: "9 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 19,
    avatar: "5.jpg",
    patient_name: "Roxie Huck",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rhucki@ed.gov",
    city: "Polýkastro",
    dob: "04/04/2019",

    age: "41",
    experience: "1 Year",
    status: 4
  },
  {
    responsive_id: "",
    id: 20,
    avatar: "7.jpg",
    patient_name: "Latashia Lewtey",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "llewteyj@sun.com",
    city: "Hougong",
    dob: "08/03/2017",

    age: "35",
    experience: "5 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 21,
    avatar: "",
    patient_name: "Natalina Tyne",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ntynek@merriam-webster.com",
    city: "Yanguan",
    dob: "03/16/2019",

    age: "30",
    experience: "0 Year",
    status: 2
  },
  {
    responsive_id: "",
    id: 22,
    avatar: "",
    patient_name: "Faun Josefsen",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "fjosefsenl@samsung.com",
    city: "Wengyang",
    dob: "07/08/2017",

    age: "40",
    experience: "0 Year",
    status: 3
  },
  {
    responsive_id: "",
    id: 23,
    avatar: "9.jpg",
    patient_name: "Rosmunda Steed",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rsteedm@xing.com",
    city: "Manzanares",
    dob: "12/23/2017",

    age: "21",
    experience: "1 Year",
    status: 5
  },
  {
    responsive_id: "",
    id: 24,
    avatar: "",
    patient_name: "Scott Jiran",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "sjirann@simplemachines.org",
    city: "Pinglin",
    dob: "05/26/2016",

    age: "23",
    experience: "3 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 25,
    avatar: "",
    patient_name: "Carmita Medling",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "cmedlingo@hp.com",
    city: "Bourges",
    dob: "07/31/2019",

    age: "47",
    experience: "7 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 26,
    avatar: "2.jpg",
    patient_name: "Morgen Benes",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mbenesp@ted.com",
    city: "Cà Mau",
    dob: "04/10/2016",

    age: "42",
    experience: "2 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 27,
    avatar: "",
    patient_name: "Onfroi Doughton",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "odoughtonq@aboutads.info",
    city: "Utrecht (stad)",
    dob: "09/29/2018",

    age: "28",
    experience: "8 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 28,
    avatar: "",
    patient_name: "Kliment McGinney",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "kmcginneyr@paginegialle.it",
    city: "Xiaocheng",
    dob: "07/09/2018",

    age: "28",
    experience: "8 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 29,
    avatar: "",
    patient_name: "Devin Bridgland",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "dbridglands@odnoklassniki.ru",
    city: "Baoli",
    dob: "07/17/2016",

    age: "48",
    experience: "8 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 30,
    avatar: "6.jpg",
    patient_name: "Gilbert McFade",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "gmcfadet@irs.gov",
    city: "Deje",
    dob: "08/28/2018",

    age: "20",
    experience: "0 Year",
    status: 2
  },
  {
    responsive_id: "",
    id: 31,
    avatar: "",
    patient_name: "Teressa Bleakman",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "tbleakmanu@phpbb.com",
    city: "Žebrák",
    dob: "09/03/2016",

    age: "37",
    experience: "7 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 32,
    avatar: "",
    patient_name: "Marcelia Alleburton",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "malleburtonv@amazon.com",
    city: "Basail",
    dob: "06/02/2016",

    age: "53",
    experience: "3 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 33,
    avatar: "7.jpg",
    patient_name: "Aili De Coursey",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "adew@etsy.com",
    city: "Łazy",
    dob: "09/30/2016",

    age: "27",
    experience: "7 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 34,
    avatar: "6.jpg",
    patient_name: "Charlton Chatres",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "cchatresx@goo.gl",
    city: "Reguengos de Monsaraz",
    dob: "04/07/2016",

    age: "22",
    experience: "2 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 35,
    avatar: "1.jpg",
    patient_name: "Nat Hugonnet",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "nhugonnety@wufoo.com",
    city: "Pimentel",
    dob: "09/11/2019",

    age: "46",
    experience: "6 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 36,
    avatar: "",
    patient_name: "Lorine Hearsum",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "lhearsumz@google.co.uk",
    city: "Shuiying",
    dob: "03/05/2019",

    age: "47",
    experience: "7 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 37,
    avatar: "8.jpg",
    patient_name: "Sheila-kathryn Haborn",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "shaborn10@about.com",
    city: "Lewolang",
    dob: "11/10/2018",

    age: "51",
    experience: "1 Year",
    status: 3
  },
  {
    responsive_id: "",
    id: 38,
    avatar: "3.jpg",
    patient_name: "Alma Harvatt",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "aharvatt11@addtoany.com",
    city: "Ulundi",
    dob: "11/04/2016",

    age: "41",
    experience: "1 Year",
    status: 1
  },
  {
    responsive_id: "",
    id: 39,
    avatar: "2.jpg",
    patient_name: "Beatrix Longland",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "blongland12@gizmodo.com",
    city: "Damu",
    dob: "07/18/2016",

    age: "62",
    experience: "2 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 40,
    avatar: "4.jpg",
    patient_name: "Hammad Condell",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "hcondell13@tiny.cc",
    city: "Bulung’ur",
    dob: "11/04/2018",

    age: "37",
    experience: "7 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 41,
    avatar: "",
    patient_name: "Parker Bice",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "pbice14@ameblo.jp",
    city: "Shanlian",
    dob: "03/02/2016",

    age: "65",
    experience: "5 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 42,
    avatar: "",
    patient_name: "Lowrance Orsi",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "lorsi15@wp.com",
    city: "Dengteke",
    dob: "12/10/2018",

    age: "64",
    experience: "4 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 43,
    avatar: "10.jpg",
    patient_name: "Ddene Chaplyn",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "dchaplyn16@nymag.com",
    city: "Lattes",
    dob: "01/23/2019",

    age: "38",
    experience: "8 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 44,
    avatar: "",
    patient_name: "Washington Bygraves",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "wbygraves17@howstuffworks.com",
    city: "Zlaté Hory",
    dob: "09/07/2016",

    age: "37",
    experience: "7 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 45,
    avatar: "7.jpg",
    patient_name: "Meghann Bodechon",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mbodechon18@1und1.de",
    city: "Itō",
    dob: "07/23/2018",

    age: "61",
    experience: "1 Year",
    status: 4
  },
  {
    responsive_id: "",
    id: 46,
    avatar: "1.jpg",
    patient_name: "Moshe De Ambrosis",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mde19@purevolume.com",
    city: "San Diego",
    dob: "02/10/2018",

    age: "47",
    experience: "7 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 47,
    avatar: "5.jpg",
    patient_name: "Had Chatelot",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "hchatelot1a@usatoday.com",
    city: "Mercedes",
    dob: "11/23/2016",

    age: "64",
    experience: "4 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 48,
    avatar: "",
    patient_name: "Georgia McCrum",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "gmccrum1b@icio.us",
    city: "Nggalak",
    dob: "04/19/2018",

    age: "63",
    experience: "3 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 49,
    avatar: "8.jpg",
    patient_name: "Krishnah Stilldale",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "kstilldale1c@chronoengine.com",
    city: "Slavs’ke",
    dob: "03/18/2017",

    age: "56",
    experience: "6 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 50,
    avatar: "4.jpg",
    patient_name: "Mario Umbert",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mumbert1d@digg.com",
    city: "Chorotis",
    dob: "05/13/2019",

    age: "43",
    experience: "3 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 51,
    avatar: "",
    patient_name: "Edvard Dixsee",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "edixsee1e@unblog.fr",
    city: "Rancharia",
    dob: "04/23/2019",

    age: "46",
    experience: "6 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 52,
    avatar: "9.jpg",
    patient_name: "Tammie Davydoch",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "tdavydoch1f@examiner.com",
    city: "Mamedkala",
    dob: "04/19/2016",

    age: "47",
    experience: "7 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 53,
    avatar: "",
    patient_name: "Benito Rodolico",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "brodolico1g@sciencedirect.com",
    city: "Wonosobo",
    dob: "10/06/2018",

    age: "21",
    experience: "1 Year",
    status: 5
  },
  {
    responsive_id: "",
    id: 54,
    avatar: "",
    patient_name: "Marco Pennings",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mpennings1h@bizjournals.com",
    city: "Umag",
    dob: "06/15/2017",

    age: "30",
    experience: "0 Year",
    status: 3
  },
  {
    responsive_id: "",
    id: 55,
    avatar: "",
    patient_name: "Tommie O'Corr",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "tocorr1i@nyu.edu",
    city: "Olhos de Água",
    dob: "09/26/2018",

    age: "51",
    experience: "1 Year",
    status: 1
  },
  {
    responsive_id: "",
    id: 56,
    avatar: "1.jpg",
    patient_name: "Cybill Poyle",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "cpoyle1j@amazon.com",
    city: "Hamm",
    dob: "01/03/2016",

    age: "29",
    experience: "9 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 57,
    avatar: "6.jpg",
    patient_name: "Norry Stoller",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "nstoller1k@noaa.gov",
    city: "Ruukki",
    dob: "02/04/2018",

    age: "27",
    experience: "7 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 58,
    avatar: "",
    patient_name: "Wendi Somerlie",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "wsomerlie1l@accuweather.com",
    city: "Meicheng",
    dob: "04/22/2016",

    age: "28",
    experience: "9 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 59,
    avatar: "",
    patient_name: "Ferdie Georgeon",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "fgeorgeon1m@nhs.uk",
    city: "Tanahbeureum",
    dob: "04/08/2019",

    age: "28",
    experience: "1 Year",
    status: 2
  },
  {
    responsive_id: "",
    id: 60,
    avatar: "",
    patient_name: "Jules Auten",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "jauten1n@foxnews.com",
    city: "Mojo",
    dob: "08/13/2019",

    age: "48",
    experience: "5 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 61,
    avatar: "3.jpg",
    patient_name: "Nichole Dacres",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ndacres1o@apache.org",
    city: "Kimanuit",
    dob: "11/06/2017",

    age: "20",
    experience: "0 Year",
    status: 3
  },
  {
    responsive_id: "",
    id: 62,
    avatar: "1.jpg",
    patient_name: "Holly Edgworth",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "hedgworth1p@craigslist.org",
    city: "Pedreira",
    dob: "08/05/2017",

    age: "37",
    experience: "0 Year",
    status: 5
  },
  {
    responsive_id: "",
    id: 63,
    avatar: "9.jpg",
    patient_name: "Henriette Croft",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "hcroft1q@desdev.cn",
    city: "Taizhou",
    dob: "09/12/2019",

    age: "53",
    experience: "1 Year",
    status: 5
  },
  {
    responsive_id: "",
    id: 64,
    avatar: "",
    patient_name: "Annetta Glozman",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "aglozman1r@storify.com",
    city: "Pendawanbaru",
    dob: "08/25/2017",

    age: "27",
    experience: "3 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 65,
    avatar: "",
    patient_name: "Cletis Cervantes",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ccervantes1s@de.vu",
    city: "Solnechnyy",
    dob: "05/24/2018",

    age: "22",
    experience: "7 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 66,
    avatar: "9.jpg",
    patient_name: "Christos Kiley",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ckiley1t@buzzfeed.com",
    city: "El Bolsón",
    dob: "02/27/2019",

    age: "46",
    experience: "2 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 67,
    avatar: "7.jpg",
    patient_name: "Silvain Siebert",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ssiebert1u@domainmarket.com",
    city: "Cadiz",
    dob: "09/23/2017",

    age: "47",
    experience: "8 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 68,
    avatar: "",
    patient_name: "Sharla Ibberson",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "sibberson1v@virginia.edu",
    city: "Lamam",
    dob: "11/01/2016",

    age: "51",
    experience: "8 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 69,
    avatar: "7.jpg",
    patient_name: "Ripley Rentcome",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rrentcome1w@youtu.be",
    city: "Dashkawka",
    dob: "07/15/2018",

    age: "41",
    experience: "8 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 70,
    avatar: "",
    patient_name: "Chrisse Birrane",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "cbirrane1x@google.com.br",
    city: "Las Toscas",
    dob: "05/22/2016",

    age: "62",
    experience: "0 Year",
    status: 5
  },
  {
    responsive_id: "",
    id: 71,
    avatar: "",
    patient_name: "Georges Tesyro",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "gtesyro1y@last.fm",
    city: "Gabao",
    dob: "01/27/2019",

    age: "37",
    experience: "7 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 72,
    avatar: "",
    patient_name: "Bondon Hazard",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "bhazard1z@over-blog.com",
    city: "Llano de Piedra",
    dob: "01/17/2019",

    age: "65",
    experience: "3 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 73,
    avatar: "5.jpg",
    patient_name: "Aliza MacElholm",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "amacelholm20@printfriendly.com",
    city: "Sosnovyy Bor",
    dob: "11/17/2017",

    age: "64",
    experience: "7 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 74,
    avatar: "2.jpg",
    patient_name: "Lucas Witherdon",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "lwitherdon21@storify.com",
    city: "Staré Křečany",
    dob: "09/26/2016",

    age: "38",
    experience: "2 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 75,
    avatar: "",
    patient_name: "Pegeen Peasegod",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ppeasegod22@slideshare.net",
    city: "Keda",
    dob: "05/21/2016",

    age: "59",
    experience: "6 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 76,
    avatar: "",
    patient_name: "Elyn Watkinson",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ewatkinson23@blogspot.com",
    city: "Osan",
    dob: "09/30/2016",

    age: "55",
    experience: "7 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 77,
    avatar: "10.jpg",
    patient_name: "Babb Skirving",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "bskirving24@cbsnews.com",
    city: "Balky",
    dob: "09/27/2016",

    age: "39",
    experience: "1 Year",
    status: 4
  },
  {
    responsive_id: "",
    id: 78,
    avatar: "",
    patient_name: "Shelli Ondracek",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "sondracek25@plala.or.jp",
    city: "Aoluguya Ewenke Minzu",
    dob: "03/28/2016",

    age: "23",
    experience: "1 Year",
    status: 3
  },
  {
    responsive_id: "",
    id: 79,
    avatar: "9.jpg",
    patient_name: "Stanislaw Melloy",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "smelloy26@fastcompany.com",
    city: "Funafuti",
    dob: "04/13/2017",

    age: "30",
    experience: "2 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 80,
    avatar: "",
    patient_name: "Seamus Eisikovitsh",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "seisikovitsh27@usgs.gov",
    city: "Cangkringan",
    dob: "05/28/2018",

    age: "22",
    experience: "7 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 81,
    avatar: "2.jpg",
    patient_name: "Tammie Wattins",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "twattins28@statcounter.com",
    city: "Xilin",
    dob: "08/07/2018",

    age: "36",
    experience: "5 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 82,
    avatar: "8.jpg",
    patient_name: "Aila Quailadis",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "aquail29@prlog.org",
    city: "Shuangchahe",
    dob: "02/11/2018",

    age: "43",
    experience: "4 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 83,
    avatar: "",
    patient_name: "Myrvyn Gilogly",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "mgilogly2a@elpais.com",
    city: "Prince Rupert",
    dob: "05/13/2018",

    age: "19",
    experience: "8 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 84,
    avatar: "5.jpg",
    patient_name: "Hanna Langthorne",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "hlangthorne2b@stumbleupon.com",
    city: "Guaynabo",
    dob: "11/11/2018",
    age: "21",
    experience: "7 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 85,
    avatar: "",
    patient_name: "Ruby Gimblet",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rgimblet2c@1688.com",
    city: "Nanyulinxi",
    dob: "03/28/2016",
    age: "30",
    experience: "1 Year",
    status: 2
  },
  {
    responsive_id: "",
    id: 86,
    avatar: "4.jpg",
    patient_name: "Louis Paszak",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "lpaszak2d@behance.net",
    city: "Chiscas",
    dob: "04/25/2016",

    age: "51",
    experience: "7 Years",
    status: 5
  },
  {
    responsive_id: "",
    id: 87,
    avatar: "",
    patient_name: "Glennie Riolfi",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "griolfi2e@drupal.org",
    city: "Taung",
    dob: "06/18/2018",

    age: "29",
    experience: "4 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 88,
    avatar: "",
    patient_name: "Jemimah Morgan",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "jmorgan2f@nifty.com",
    city: "La Esperanza",
    dob: "01/17/2016",

    age: "27",
    experience: "3 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 89,
    avatar: "10.jpg",
    patient_name: "Talya Brandon",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "tbrandon2g@ucoz.com",
    city: "Zaječar",
    dob: "10/08/2018",

    age: "28",
    experience: "6 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 90,
    avatar: "6.jpg",
    patient_name: "Renate Shay",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rshay2h@tumblr.com",
    city: "Pueblo Viejo",
    dob: "03/15/2017",

    age: "28",
    experience: "3 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 91,
    avatar: "",
    patient_name: "Julianne Bartosik",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "jbartosik2i@state.gov",
    city: "Botlhapatlou",
    dob: "02/06/2017",

    age: "48",
    experience: "6 Years",
    status: 3
  },
  {
    responsive_id: "",
    id: 92,
    avatar: "3.jpg",
    patient_name: "Yvonne Emberton",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "yemberton2j@blog.com",
    city: "Nagcarlan",
    dob: "02/13/2017",

    age: "20",
    experience: "1 Year",
    status: 4
  },
  {
    responsive_id: "",
    id: 93,
    avatar: "8.jpg",
    patient_name: "Danya Faichnie",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "dfaichnie2k@weather.com",
    city: "Taling",
    dob: "07/29/2019",

    age: "37",
    experience: "3 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 94,
    avatar: "",
    patient_name: "Ronica Hasted",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rhasted2l@hexun.com",
    city: "Gangkou",
    dob: "07/04/2019",

    age: "53",
    experience: "7 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 95,
    avatar: "2.jpg",
    patient_name: "Edwina Ebsworth",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "eebsworth2m@sbwire.com",
    city: "Puzi",
    dob: "09/27/2018",

    age: "27",
    experience: "2 Years",
    status: 1
  },
  {
    responsive_id: "",
    id: 96,
    avatar: "",
    patient_name: "Alaric Beslier",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "abeslier2n@zimbio.com",
    city: "Ocucaje",
    dob: "04/16/2017",

    age: "22",
    experience: "8 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 97,
    avatar: "",
    patient_name: "Reina Peckett",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "rpeckett2o@timesonline.co.uk",
    city: "Anyang",
    dob: "05/20/2018",

    age: "46",
    experience: "8 Years",
    status: 4
  },
  {
    responsive_id: "",
    id: 98,
    avatar: "7.jpg",
    patient_name: "Olivette Gudgin",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ogudgin2p@gizmodo.com",
    city: "Fujinomiya",
    dob: "04/09/2019",

    age: "47",
    experience: "8 Years",
    status: 2
  },
  {
    responsive_id: "",
    id: 99,
    avatar: "10.jpg",
    patient_name: "Evangelina Carnock",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ecarnock2q@washington.edu",
    city: "Doushaguan",
    dob: "01/26/2017",

    age: "51",
    experience: "0 Year",
    status: 4
  },
  {
    responsive_id: "",
    id: 100,
    avatar: "",
    patient_name: "Glyn Giacoppo",
    primary_phone: "", primary_provider: "", secondary_provider: "",
    email: "ggiacoppo2r@apache.org",
    city: "Butha-Buthe",
    dob: "04/15/2017",

    age: "41",
    experience: "7 Years",
    status: 2
  }
]


mock.onGet('/api/patients/initial-data').reply(config => {
  return [200, data]
})

mock.onGet('/api/patients/data').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const {q = '', perPage = 10, page = 1} = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.patient_name.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered) ||
      item.age.toLowerCase().includes(queryLowered)
)
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})
