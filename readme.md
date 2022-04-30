Dokumendi struktuur:
1. Ülevaade
2. Kasjutajajuhis
3. Kasutatud npm paketid
4. Märkused tehniliste lahenduste kohta
5. Piirangud ja puudujäägid
6. Tööprotsess

--

1. Ülevaade  
Antud rakendus võimaldab kasutajal leida öö pikkuse teatud asukoha ja kuupäeva jaoks. Lisaks, sisaldab rakendus interaktiivset kaarti, mille peal on
näidatud hetke öine ala. Kasutajal on võimalik sisestada koordinaadid käsitsi või kaardi abil.

2. Kasjutajajuhis  
Rakenduse saab käivitada käsuga npm start. Siis on rakendus võimalik leida aadressilt localhost:3000.
Koordinaate saab valida kaardi peale vajutades.
Öö pikkuse arvutamiseks vajutada nuppu Leia.
Öö on antud juhul defineeritud kui aeg sisestatud kuupäeval päikese loojangu ja järgmise kuupäeva päikese tõusu vahel.
Väljastatakse ka loojangu ja tõusu ajad kasutaja ajatsooni järgi.

3. Kasutatud npm paketid  
ol : OpenLayers. Kaardi jaoks.  
ol-ext : OpenLayers'i lisafunktsioonide jaoks. Nimelt, DayNight, kaardil öise ala näitamiseks.  
sunrise-sunset-api : https://sunrise-sunset.org/api suhtlemise jaoks. Loojangu ja tõusu leidmiseks.  
date-diff : Öö pikkuse arvutamiseks.  
any-date-parser ja geo-coordinates-parser : Kasutaja sisendi lugemiseks ja kirjutamiseks.  

4. Märkused tehniliste lahenduste kohta  
get_data(kuupäev) failis length.js : Funktsioonis on mõlemale koordinaadile liidetud 0.00000001, kuna vastasel juhul tekkisid vead näiteks koordinaatidega
0 0. Kuna liidetud väärtus on piisavalt väike ei mõjuta see tulemust.  
'find' eventListener failis map.js : Kasutatud on setTimeout funktsiooni selleks, et aeglustada kuulaja reageerimist 5ms võrra. See on selleks, et find()
jõuaks ära töödelda kasutaja sisestatud koordinaadid. Seda oleks saanud ka tehniliselt 'korralikumalt' lahendada kasutades funktsiooni, mis tagastab Promise'i vms. aga antud juhul ei tundunud see mulle õigustatud, kuna oleks funktsioonide struktuuri palju keerulisemaks muutnud ja 5ms on kasutajale märkamatu aeg.  
Ma usun, et 5ms on alati piisav, mul töötas alati ka 1ms'iga. Valisin 5, et oleks turvalisem.

5. Piirangud ja puudujäägid  
Astronoomiline loojang ja koidik on puudu : Mõlemad väärtused on kättesaadavad kasutatavast API'st, aga tulevikus olevatel kuupäevadel pole neid mingil põhjusel lisatud.  
Võimalikud lahendused oleksid:  
a) Piirata sisestatavate kuupäevade väärtusi nii, et andmed on alati olemas : Minu arvates ei ole see hea lahendus, kuna ma usun, et suur hulk kasutajaid tahaks
näha just tänase päeva kohta andmeid, mis oleksid siis kättesaamatud.  
b) Kasutada teist API'd / arvutada andmed ise : Töötaks, aga tundub suhteliselt töömahukas. Ma ei leidnud teist (tasuta, piiramata) API'd ja ise arvutamisega tegeleda ei jõudnud.  
Välimuse probleemid : Neid on palju. Lehekülg näeb välja väga igav, on palju tühja ruumi, ei tööta erinevate ekraani suurustega eriti hästi.  
Võimalik lahendus: Lihtsalt rohkem selle kallal töötada. Ma ei ole UI/UX'i ekspert nii, et ma eriti ei jõudnud/osanud.  
Kaart ei uuene automaatselt : Ööjooned kaardil ei uuene kui lehte mitte refreshida. Ei ole minu arvates suur probleem, kuna ma ei usu, et kasutaja vaataks lehekülge
väga kaua järjest.  
Võimalik lahendus: Uuendada ööjooni aeg-ajalt. Tundus mulle ebavajalik. 

6. Tööprotsess  
Üldiselt läks töö sujuvalt. Kõige ajakulukam osa oli kaardiga töötamine, kuna ma polnud seda kunagi varem teinud. Õnneks ei jäänud ma ka sellega kunagi kauaks
jänni, kuna OpenLayers'i dokumentatsioon on väga hea. Mõned väiksemad probleemid tekkisad vahepeal ka muude asjadega, aga kõik sain kiiresti mõne Google'i otsinguga
parandatud.
