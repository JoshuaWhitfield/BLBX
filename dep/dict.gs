String={}
String.capitalize=function(string)
  if tp(string) == "list" then string=string.join("")
  if string.len<2 then return string.upper
  string=string[0].upper+string[1:].lower//;print("string: "+string)
  return string
end function
String.strip=function(t,s)
  if not t then return ""
  for b in range(0,t.len-1)
    if s.indexOf(t[b])==null then break
  end for
  if s.indexOf(t[b])>=0 then return ""
  for e in range(-1,-1*t.len)
    if s.indexOf(t[e])==null then break
  end for
  if e==-1 then return t[b:]
  return t[b:e+1]
end function

// pwgen v0.4 author unkown, modifications by Plu70

PasswordGenerator={}
PasswordGenerator.PASSWORDSB="fifteen,abgDw32fhGu58k,sfuzzer,1111,2222,3333,00000,4444,5555,55555555,4fb426abgDw32fHG,6666,thx1138,7777,8888,9999,0000,oicu812,1337,8008,4hpu79htgbr,80085,007007,43110,69696969,t23t49k21af3,evkfdhgbv78ery,6h057,h4ck,h4ckg4m3,g01ng,p0st4l,g01ngp0st4l,81rd,7074g,35sk1m0,pr0n,n00b,nu8,suxor,hazorz,5uxzorz,owned,pwnd,0wnd,p0wn3d,w00t,woo7,woot,w007,10100111001,teh,meh,lol,brb,afk,wyd,gtfo,lmao,lmfao,gitgud,lawl,troll,bawl,epic,54321,987654321,88888888,555555,1234567890,1973,147147,151515,1515,101010,202020,21122112,12341234,74lk,dir7y,53nP4I,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0,le375p34k,420420,11111111,112233,h4f4jf53fk74,123abc,1234qwer,123321,5y4hpu79htgbrub,ncc1701e,7777777,51505150,000000,5150,222222,999999,252525,77777777,98765432,poop,polyamorous,zelda,password,6gtr43,123456,12345678,1234,qwerty,12345,dragon,baseball,football,letmein,monkey,696969,abc123,mustang,michael,shadow,master,jennifer,111111,2000,jordan,superman,harley,1234567,hunter,trustno1,ranger,buster,thomas,tigger,robert,soccer,batman,test,pass,hockey,george,charlie,andrew,michelle,love,sunshine,jessica,6969,pepper,daniel,access,123456789,654321,joshua,maggie,starwars,silver,william,dallas,yankees,123123,ashley,666666,hello,amanda,orange,biteme,freedom,computer,sexy,thunder,nicole,ginger,heather,hammer,summer,corvette,taylor,swift,austin,1111,merlin,matthew,121212,golfer,cheese,princess,martin,chelsea,patrick,richard,diamond,yellow,bigdog,secret,asdfgh,sparky,cowboy,camaro,anthony,matrix,falcon,iloveyou,bailey,guitar,jackson,purple,scooter,phoenix,aaaaaa,morgan,tigers,porsche,mickey,maverick,cookie,nascar,peanut,justin,131313,money,horny,samantha,panties,steelers,joseph,snoopy,boomer,whatever,iceman,smokey,gateway,dakota,cowboys,eagles,chicken,black,zxcvbn,please,pharoa,andrea,ferrari,knight,hardcore,porn,ass,love,sex,hooker,blow,coke,melissa,compaq,coffee,booboo,bitch,johnny,bulldog,xxxxxx,welcome,james,player,ncc1701,wizard,scooby,charles,junior,internet,mike,brandy,tennis,banana,monster,spider,lakers,miller,rabbit,enter,mercedes,brandon,steven,fender,john,yamaha,diablo,chris,boston,tiger,marine,chicago,rangers,gandalf,winter,bigtits,barney,edward,raiders,porn,badboy,blowme,spanky,bigdaddy,johnson,chester,london,midnight,blue,fishing,hannah,slayer,rachel,sexsex,redsox,asdf,marlboro,panther,zxcvbnm,arsenal,oliver,qazwsx,mother,victoria,jasper,angel,david,winner,crystal,golden,butthead,viking,jack,iwantu,shannon,murphy,angels,prince,cameron,girls,madison,wilson,carlos,hooters,willie,startrek,captain,maddog,jasmine,butter,booger,angela,golf,lauren,rocket,tiffany,theman,dennis,liverpoo,flower,forever,green,jackie,muffin,turtle,sophie,danielle,redskins,toyota,jason,sierra,winston,debbie,giants,packers,newyork,jeremy,casper,bubba,dracula,sandra,lovers,mountain,united,cooper,driver,tucker,helpme,pookie,lucky,maxwell,8675309,bear,suckit,gators,shithead,jaguar,monica,fred,happy,hotdog,tits,gemini,lover,xxxxxxxx,777777,canada,nathan,victor,florida,nicholas,rosebud,metallic,doctor,trouble,success,stupid,tomcat,warrior,peaches,apples,fish,qwertyui,magic,buddy,dolphins,rainbow,gunner,987654,freddy,alexis,braves,2112,1212,xavier,dolphin,testing,bond007,member,calvin,voodoo,7777,samson,alex,apollo,fire,tester,chess,walter,beavis,voyager,peter,porno,bonnie,rush2112,beer,apple,scorpio,jonathan,skippy,sydney,scott,red123,power,gordon,travis,beaver,star,flyers,232323,zzzzzz,steve,rebecca,scorpion,doggie,legend,ou812,yankee,blazer,bill,runner,birdie,bitches,parker,topgun,asdfasdf,heaven,viper,animal,bigboy,arthur,baby,private,godzilla,donald,williams,lifehack,phantom,dave,rock,august,sammy,cool,brian,platinum,jake,bronco,paul,mark,frank,heka6w2,copper,billy,cumshot,garfield,willow,cunt,little,carter,slut,albert,kitten,super,jordan23,eagle1,shelby,america,11111,jessie,house,free,chevy,bullshit,white,broncos,horney,surfer,nissan,saturn,airborne,elephant,marvin,shit,action,adidas,qwert,kevin,1313,explorer,walker,police,christin,december,benjamin,wolf,sweet,therock,king,online,brooklyn,teresa,cricket,sharon,dexter,racing,penis,gregory,0000,teens,redwings,dreams,michigan,hentai,magnum,87654321,nothing,donkey,trinity,digital,333333,ramsesii,stella,cartman,guinness,speedy,buffalo,kitty,pimpin,eagle,einstein,kelly,nelson,nirvana,vampire,xxxx,playboy,louise,pumpkin,snowball,test123,girl,sucker,mexico,beatles,fantasy,ford,gibson,celtic,marcus,cherry,cassie,888888,natasha,sniper,chance,genesis,hotrod,reddog,alexande,college,jester,passw0rd,smith,lasvegas,carmen,slipknot,death,kimberly,1q2w3e,eclipse,1q2w3e4r,stanley,samuel,drummer,homer,montana,music,aaaa,spencer,jimmy,carolina,colorado,creative,hello1,rocky,goober,friday,AceofSpades,bollocks,scotty,abcdef,bubbles,hawaii,asakista,fluffy,mine,stephen,horses,thumper,darkness,asdfghjk,pamela,boobies,buddha,vanessa,sandman,naughty,douglas,honda,matt,azerty,6666,shorty,money1,beach,loveme,4321,simple,poohbear,444444,badass,destiny,sarah,denise,vikings,lizard,melanie,assman,sabrina,nintendo,water,good,howard,time,123qwe,november,xxxxx,october,zxcv,shamrock,atlantis,warren,wordpass,julian,mariah,rommel,1010,harris,predator,sylvia,massive,cats,sammy1,mister,stud,marathon,rubber,ding,trunks,desire,montreal,justme,faster,kathleen,irish,1999,bertha,jessica1,alpine,sammie,diamonds,tristan,swinger,shan,stallion,pitbull,letmein2,roberto,ready,april,palmer,ming,shadow1,audrey,chong,clitoris,wang,shirley,jackoff,bluesky,sundance,renegade,hollywoo,bernard,wolfman,soldier,picture,pierre,ling,goddess,manager,nikita,76hj93DB3wsa2,sweety,titans,hang,fang,ficken,niners,bottom,bubble,hello123,ibanez,webster,sweetpea,stocking,freeman,french,mongoose,speed,dddddd,hong,henry,hungry,yang,catdog,cheng,ghost,gogogo,randy,tottenha,curious,butterfl,mission,january,singer,sherman,shark,techno,lancer,lalala,autumn,chichi,orion,trixie,clifford,delta,bobbob,bomber,holden,kang,kiss,1968,spunky,liquid,mary,beagle,granny,network,bond,kkkkkk,millie,biggie,beetle,teacher,susan,toronto,anakin,genius,dream,dang,bush,nyx".split(",")
PasswordGenerator.PASSWORDSA="323232,osint,msfconsole,Bd5gHie89YA,tornado,lindsey,content,bruce,buck,aragorn,griffin,chen,campbell,trojan,christop,newman,wayne,tina,rockstar,father,geronimo,pascal,crimson,brooks,hector,penny,anna,camera,chandler,fatcat,lovelove,cody,cunts,waters,stimpy,finger,cindy,wheels,viper1,latin,robin,greenday,creampie,brendan,hiphop,willy,snapper,funtime,duck,trombone,adult,cotton,cookies,kaiser,mulder,westham,latino,jeep,ravens,aurora,drizzt,madness,hermit,energy,kinky,314159,leather,bastard,young,,extreme,hard,password1,vincent,lacrosse,hotmail,spooky,amateur,alaska,badger,paradise,maryjane,soup,crazy,mozart,video,russell,vagina,spitfire,anderson,norman,otaku,eric,cherokee,cougar,barbara,long,family,horse,enigma,allison,raider,brazil,blonde,jones,55555,dude,drowssap,jeff,school,marshall,lovely,1qaz2wsx,jeffrey,caroline,franklin,booty,molly,snickers,leslie,nipples,courtney,diesel,rocks,eminem,westside,suzuki,daddy,passion,hummer,ladies,Azachary,frankie,elvis,reggie,alpha,suckme,simpson,patricia,pirate,tommy,semperfi,jupiter,redrum,freeuser,wanker,stinky,ducati,paris,natalie,babygirl,bishop,windows,spirit,tiktok,thot,pantera,monday,patches,brutus,houston,smooth,penguin,marley,forest,cream,212121,flash,maximus,nipple,bobby,bradley,vision,pokemon,champion,fireman,indian,softball,picard,system,clinton,cobra,enjoy,lucky1,claire,claudia,boogie,timothy,marines,security,dirty,admin,wildcats,pimp,dancer,hardon,veronica,abcd1234,abcdefg,ironman,wolverin,remember,great,freepass,bigred,squirt,justice,francis,hobbes,kermit,pearljam,mercury,domino,9999,denver,brooke,rascal,hitman,mistress,simon,tony,bbbbbb,friend,peekaboo,naked,budlight,electric,sluts,stargate,saints,bondage,brittany,bigman,zombie,swimming,duke,qwerty1,babes,scotland,disney,rooster,brenda,mookie,swordfis,candy,duncan,olivia,hunting,blink182,alicia,8888,samsung,bubba1,whore,virginia,general,passport,aaaaaaaa,erotic,liberty,arizona,jesus,abcd,newport,skipper,rolltide,balls,happy1,galore,christ,weasel,242424,wombat,digger,classic,bulldogs,poopoo,accord,popcorn,turkey,jenny,amber,bunny,mouse,titanic,liverpool,dreamer,everton,friends,chevelle,carrie,gabriel,psycho,nemesis,burton,pontiac,connor,eatme,lickme,roland,cumming,mitchell,ireland,lincoln,arnold,spiderma,patriots,goblue,devils,eugene,empire,asdfg,cardinal,brown,shaggy,froggy,qwer,kawasaki,kodiak,people,phpbb,light,kramer,chopper,hooker,honey,whynot,lisa,baxter,adam,snake,ncc1701d,qqqqqq,airplane,britney,avalon,sandy,sugar,sublime,stewart,wildcat,raven,scarface,elizabet,123654,trucks,wolfpack,lawrence,raymond,american,alyssa,bambam,movie,woody,shaved,snowman,tiger1,chicks,raptor,1969,stingray,shooter,france,stars,madmax,kristen,sports,jerry,789456,garcia,simpsons,lights,ryan,looking,chronic,alison,hahaha,packard,hendrix,perfect,service,spring,srinivas,spike,katie,oscar,brother,bigmac,suck,single,cannon,georgia,popeye,tattoo,texas,party,bullet,taurus,sailor,wolves,panthers,japan,strike,flowers,pussycat,chris1,loverboy,berlin,sticky,marina,tarheels,fisher,russia,connie,wolfgang,testtest,mature,bass,catch22,juice,michael1,159753,women,alpha1,trooper,hawkeye,head,freaky,dodgers,pakistan,machine,pyramid,vegeta,katana,moose,tinker,coyote,infinity,inside,letmein1,bang,control,hercules,morris,james1,tickle,outlaw,browns,billybob,pickle,test1,michele,antonio,sucks,pavilion,changeme,caesar,prelude,tanner,adrian,darkside,bowling,wutang,sunset,robbie,alabama,danger,zeppelin,juan,rusty,pppppp,nick,2001,ping,darkstar,madonna,qwe123,bigone,casino,cheryl,charlie1,mmmmmm,integra,wrangler,apache,tweety,qwerty12,bobafett,simone,none,business,sterling,trevor,transam,dustin,harvey,england,2323,seattle,ssssss,rose,harry,openup,pandora,trucker,wallace,indigo,storm,malibu,weed,review,babydoll,doggy,dilbert,pegasus,joker,catfish,flipper,valerie,herman,detroit,kenneth,cheyenne,bruins,stacey,smoke,joey,seven,marino,fetish,xfiles,wonder,stinger,pizza,babe,pretty,stealth,manutd,gracie,gundam,cessna,longhorn,presario,mnbvcxz,wicked,mustang1,victory,shelly,awesome,athena,q1w2e3r4,help,holiday,knicks,street,redneck,casey,gizmo,scully,dragon1,devildog,triumph,eddie,bluebird,shotgun,peewee,hubris,ronnie,angel1,daisy,special,metallica,madman,country,impala,lennon,roscoe,omega,access14,enterpri,miranda,search,smitty,blizzard,unicorn,tight,rick,ronald,asdf1234,harrison,trigger,truck,danny,home,winnie,beauty,thailand,cadillac,castle,tyler,bobcat,buddy1,sunny,stones,asian,freddie,chuck,butt,loveyou,norton,hellfire,hotsex,indiana,short,panzer,lonewolf,trumpet,colors,blaster,12121212,fireball,logan,precious,aaron,elaine,jungle,masamune,atlanta,gold,corona,curtis,nikki,polaris,timber,theone,baller,chipper,orlando,island,skyline,dragons,dogs,benson,licker,goldie,engineer,kong,pencil,basketba,open,hornet,world,linda,barbie,chan,farmer,valentin,indians,larry,redman,foobar,travel,morpheus,bernie,target,141414,hotstuff,photos,laura,savage,holly,rocky1,dollar,turbo,design,newton,hottie,moon,blondes,4128,lestat,avatar,future,goforit,random,abgrtyu,jjjjjj,q1w2e3,smiley,goldberg,express,zipper,wrinkle1,stone,andy,babylon,dong,powers,consumer,dudley,Aster,monkey1,serenity,samurai,99999999,skeeter,lindsay,joejoe,master1,aaaaa,chocolat,christia,birthday,stephani,tang,alfred,ball,maria,sexual,maxima,sampson,buckeye,highland,kristin,seminole,reaper,bassman,nugget,lucifer,airforce,nasty,watson,warlock,2121,philip,always,dodge,chrissy,burger,bird,snatch,missy,pink,gang,maddie,holmes,huskers,piglet,photo,joanne,hamilton,dodger,paladin,christy,chubby,buckeyes,hamlet,abcdefgh,bigfoot,sunday,manson,goldfish,garden,deftones,icecream,blondie,spartan,julie,harold,charger,brandi,stormy,sherry,pleasure,juventus,rodney,galaxy,holland,escort,zxcvb,planet,jerome,wesley,blues,song,peace,david1,1966,cavalier,gambit,karen,sidney,ripper,jamie,sister,marie,martha,nylons,aardvark,nadine,minnie,whiskey,bing,plastic,anal,babylon5,chang,savannah,loser,racecar,insane,yankees1,mememe,hansolo,chiefs,fredfred,freak,frog,salmon,concrete,yvonne,sophia,stefan,8a1n80w,slick,rocker,opensesame,onessnap".split(",")
PasswordGenerator.PASSWORDS = PasswordGenerator.PASSWORDSA + PasswordGenerator.PASSWORDSB

PasswordGenerator.init=function(samples)
  self.s=[]
  self.c={}
  for string in samples
    string=string.trim.upper
    if string.len>3 then self.s.push(string)
  end for
  for string in self.s
    for ind in range(0,string.len-4)
      k=string[ind:ind+3]
      if self.c.hasIndex(k) then
        if self.c[k].indexOf(string[ind+3])==null then self.c[k].push(string[ind+3])
      else
        self.c[k]=[string[ind+3]]
      end if
    end for
  end for
end function
PasswordGenerator.r=function(length,snip,object)
  suffix=snip[snip.len-3:]
  if self.c.hasIndex(suffix) and snip.len<length then
    for char in self.c[suffix]
      self.r(length,snip+char,object)
    end for
  else
    object[snip]=1
  end if
end function
PasswordGenerator.AllPasswords=function()
  r={}
  for string in self.s
    for i in range(0,string.len-4)
      self.r(string.len,string[i:i+3],r)
    end for
  end for
  sub=[];final=[];final2=[]
  for s in r.indexes
    //if sub.indexes.len == 3 then ;o=o+sub;sub={}; end if
    s=inputClean(s);if s.indexOf(" ")>=0 then;n=s.split(" ");for i in range(0,n.len-1);n[i]=String.capitalize(n[i]);end for;s=n.join(" ");else;s=String.capitalize(s);end if
    if s.len<5 then continue
    a=s[0]
    b=s[1]
    if a.lower==b or "hrl'aeiou".indexOf(b)==null and "AEIOUS".indexOf(a)==null and ["Ch","Mc"].indexOf(a+b)==null then s=String.capitalize(s[1:])
    s=String.strip(s,"'-")

    sub.push(s)
    sub.push(s.lower)
    str_len=str(sub.len)
    if str_len.len > 3 and str_len[-3:].search("000") then ;final.push(sub);final2=final2+sub;sub=[];continue;end if
  end for

  return final
end function

//PasswordGenerator.init(PasswordGenerator.PASSWORDS)

//dict.so