//#region Initialisers
let CurrentSeason;
let CurrentChallenge;
let CurrentEpisode;

let done = false;

let SlayedChallenge = [];
let GreatChallenge = [];
let GoodChallenge = [];
let BadChallenge = [];
let FloppedChallenge = [];

let SlayedRunway = [];
let GreatRunway = [];
let GoodRunway = [];
let BadRunway = [];
let FloppedRunway = [];

let Tops = [];
let Bottoms = [];
let Safes = [];
let Critiqued = [];
let Steps = 0;
let CritiquesChoice = 0;
let BottomQueens = [];
let TopsQueens = [];
let randomtop;
let randombtm;

let lipsyncssongs = [];

//#endregion
//#region Classes
class Season {
  constructor(Name, Cast, Host, Finale, LC, Lipsync, Premiere, Country)
  {
    this.seasonname = Name;
    this.fullCast = Cast;

    this.currentCast = [];
    if(this.currentCast.length==0)
      for(let i =0; i < this.fullCast.length; i++)
      {
        
        this.currentCast.push(this.fullCast[i]);
      }

    this.lastchallenge = LC;
    this.eliminatedCast = [];
    this.episodes = [];
    this.doubleShantay = false;
    this.doubleSashay = false;
    this.enableSaves = true;
    this.host = Host;
    this.finaleformat = Finale;
    this.lipsyncformat = Lipsync;
    this.premiereformat = Premiere;
    this.country = Country;

    this.miniwinners = [];

    this.events = [];
    
    this.actingchallenges = 0;
    this.balls = 0;
    this.choreochallenges = 0;
    this.commercialchallenges = 0;
    this.designchallenges = 0;
    this.improvchallenges = 0;
    this.makeoverchallenges = 0;
    this.rusicals = 0;
    this.standupchallenges = 0;
    this.snatchgame = 0;
  }

  getFullCast()
  {
    return(this.fullCast);
  }
}

class Episode{
  constructor(Name, Type)
  {
    this.name = Name;
    this.type = Type;
  }
}
class Queen {

  constructor(Name, Acting, Improv, Comedy, Dance, Design, Runway, Lipsync, Branding, Charisma, Kindness, Shadyness, Image = "noimage", Promo = "nopromo", OriginalSeason = "noseason", IsCustom = false)
  {
      this.name = Name;
      this.acting = Acting;
      this.improv = Improv;
      this.comedy = Comedy;
      this.dance = Dance;
      this.design = Design;
      this.runway = Runway;
      this.lipsync = Lipsync;
      this.branding = Branding;
      this.charisma = Charisma;
      this.kindness = Kindness;
      this.shadyness = Shadyness;

      this.ballfirlook = 0;
      this.ballseclook = 0;
      this.ballthilook = 0;
      this.ballperformance = 0;

      this.favoritism = 0;

      this.premieregroup = "NONE";

      this.miniwinner = false;

      this.trackrecord = [];

      this.ppe = 0;
      this.episodeson = 0;

      this.wins = 0;
      this.highs = 0;
      this.safes = 0;
      this.lows = 0;
      this.bottoms = 0;

      this.lipsyncscore = 0;

      this.minichallengeswins = 0;

      this.ogseason = OriginalSeason;
      this.iscustom = IsCustom;
      this.placement = 0;

      this.image = "Images/Queens/"+this.ogseason+"/"+Image+".webp";
      this.promo = "Images/Promos/"+this.ogseason+"/"+Promo+".webp";

      this.perfomancescore = 0;
      this.runwayscore = 0;
      this.finalscore = 0;
      this.finalescore = 0;
      this.lipsyncscore = 0;
  }

  GetScore(min, max, stat = 0)
  {
    return((getRandomInt(min,max))-stat);
  }

  GetName()
  {
    return(this.name);
  }

  GetPlacement()
  {
    return(this.placement);
  }

  GetLipsync()
  {
    this.lipsyncscore = this.GetScore(0,this.lipsync,0);
    this.lipsyncscore = this.lipsyncscore + this.favoritism;
  }

  GetMakeover()
  {
    this.perfomancescore = this.GetScore(25,45,this.branding+this.runway);
  }

  GetBall()
  {
    this.ballfirlook = this.GetScore(10,40,this.runway);
    this.ballseclook = this.GetScore(10,40,this.runway);
    this.ballthilook = this.GetScore(15,40,this.design);

    this.ballperformance = this.ballfirlook+this.ballseclook+this.ballthilook;
  }

  GetCommercial()
  {
    this.perfomancescore = this.GetScore(45,75,this.branding+this.charisma+this.acting+this.improv);
  }

  GetImprov()
  {
    this.perfomancescore = this.GetScore(15,35,this.improv);
  }

  GetStandUp()
  {
    this.perfomancescore = this.GetScore(25,45,this.comedy+this.charisma);
  }

  GetActing()
  {
    this.perfomancescore = this.GetScore(15,35,this.acting);
  }

  GetDancing()
  {
    this.perfomancescore = this.GetScore(15,35,this.dance);
  }

  GetSnatchGame()
  {
    this.perfomancescore = this.GetScore(25,45,this.comedy+this.acting);
  }

  GetRusical()
  {
    this.perfomancescore = this.GetScore(35,65,this.dance+this.charisma+this.acting);
  }

  GetRumix()
  {
    this.perfomancescore = this.GetScore(35,55,this.charisma+this.dance+this.branding);
  }

  GetMusicV()
  {
    this.perfomancescore = this.GetScore(15,35,this.dance);
  }

  getFinalScore()
  {
    this.finalescore = this.GetScore(0,this.lipsync,0);
    this.finalescore = this.finalescore + this.favoritism;
  }

  getRunway() {
    this.runwayscore = this.GetScore(10, 40, this.runway);
  }

  GetDesignScore(bonus = 0)
  {
    if(getRandomInt(0,1)==0 && this.miniwinner == true)
    {
      this.perfomancescore = this.GetScore(15,35,this.design+bonus);
      this.finalscore = this.perfomancescore;
    }
    else
    {
      this.perfomancescore = this.GetScore(15,35,this.design);
      this.finalscore = this.perfomancescore;
    }
  }
}

class Host{
  constructor(Name, InDrag, OutOfDrag)
  {
    this.name = Name;
    this.outofdrag = "Images/Queens/HOSTS/"+OutOfDrag+".webp";
    this.indrag = "Images/Queens/HOSTS/"+InDrag+".webp";
  }

  getName()
  {
    return(this.name);
  }
}

class Screen {
  constructor() {
      this.MainScreen = document.querySelector("div.MainArea");
  }

  clean() {
      this.MainScreen.innerHTML = '';
  }

  createText(Text, Option) {
    let text = document.createElement("p");
    switch(Option)
    {
      case"Bold":
        text.setAttribute("style","font-weight: bold; font-size: 16px;");
        break;

      default:
        text.setAttribute("style","font-size: 16px;");
        break;
        
    }
    
    text.innerHTML = Text;
    this.MainScreen.append(text);
  }

  createBigText(Text) {
    let MainTitle = document.querySelector("div.MainTitle");
    MainTitle.innerHTML = '<h1>'+Text+'</h1>';
  }

  createRupaulAnnouncement(Text) {
    let text = document.createElement("h2");
    text.innerHTML = Text;
    this.MainScreen.append(text);
  }

  createLine() {
    let hr = document.createElement("hr");
    this.MainScreen.append(hr);
  }

  createImage(Source, Color)
  {
  let image = document.createElement("img");
  image.src = Source;
  image.setAttribute("style", 'margin: 7px; width: 105px; height: 105px; border-radius: 20px; border: 3px solid; border-color: '+Color+';');
  this.MainScreen.appendChild(image); 
  }

  createImageBW(Source, Color)
  {
  let image = document.createElement("img");
  image.src = Source;
  image.setAttribute("style", 'margin: 7px; width: 105px; height: 105px; border-radius: 20px;  border: 3px solid; -webkit-filter: grayscale(100%);filter: grayscale(100%); border-color: '+Color+';');
  this.MainScreen.appendChild(image); 
  }

  createVideo(Country)
  {
    let video = document.createElement("video");
    let source = document.createElement("source")
    switch(Country)
    {
      case "CANADA":
        source.setAttribute("src","Videos/CDR.mp4");
        source.setAttribute("type","video/mp4");
        break;
    }
    video.autoplay = true;
    video.controls = true;
    video.append(source);
    this.MainScreen.append(video);
    let br = document.createElement("br");
    this.MainScreen.append(br);
    this.MainScreen.append(br);
    this.MainScreen.append(br);
  }

  createButton(Text,Onclick) {
    let btn = document.createElement("button");
    btn.innerHTML = Text;
    btn.setAttribute("onclick",Onclick);
    btn.setAttribute("class","button MainButton");
    this.MainScreen.append(btn);
  }

  createTrackRecords(){
    let putincenter = document.createElement("center");
    let table = document.createElement("table");
    let thead = document.createElement("thead");

    table.setAttribute("class","tr");
  
    let tbody = document.createElement("tbody");
  
    let treps = document.createElement("tr");
  
    let thq = document.createElement("th");
    thq.innerHTML = "Queens";
    
    thq.setAttribute("class","tr");
    treps.append(thq);
  
    for(let i = 0; i < CurrentSeason.episodes.length; i++)
    {
      let thep = document.createElement("th");
      thep.innerHTML = "<p style='font-size:17px;'>"+CurrentSeason.episodes[i].name+"</p><p style='font-size:12px;'>("+CurrentSeason.episodes[i].type+")</p>";
      thep.setAttribute("class","tr");
      treps.append(thep);
    }

    for(let q = 0; q < CurrentSeason.currentCast.length; q++)
    {
      console.log(q);
      let track = document.createElement("tr");

      let qname = document.createElement("td");

      qname.innerHTML = CurrentSeason.currentCast[q].GetName();

      qname.setAttribute("class","trq");

      track.append(qname);

      for(let t = 0; t < CurrentSeason.currentCast[q].trackrecord.length; t++)
      {
        let trtr = document.createElement("td");

        trtr.innerHTML = CurrentSeason.currentCast[q].trackrecord[t];

        switch(CurrentSeason.currentCast[q].trackrecord[t])
        {
          case "GUEST":
            trtr.setAttribute("style","background: #DCDCDC; font-weight: bold;");
            break;

          case "WINNER":
            trtr.setAttribute("style","background: #ffda54; font-weight: bold;");
            break;
            
          case "RUNNER UP":
            trtr.setAttribute("style","background: ##fffff; font-weight: bold;");
            break;

          case "TOP 2":
            trtr.setAttribute("style","background: #ffedb5; font-weight: bold;");
            break;

          case "TOP 3":
            trtr.setAttribute("style","background: #ffedb5; font-weight: bold;");
            break;

          case "WIN":
            trtr.setAttribute("style","background: #9F60CE; font-weight: bold;");
            break;
          
          case "HIGH":
            trtr.setAttribute("style","background: #E183C8");
            break;
          
          case "SAFE":
            trtr.setAttribute("style","background: #F6C2EB");
            break;

          case "LOW":
            trtr.setAttribute("style","background: #F5A9B4");
            break;

          case "BOTTOM":
            trtr.setAttribute("style","background: #EF7183");
            break;

          case "ELIMINATED":
            trtr.setAttribute("style","background: #E41A37; font-weight: bold;");
            break;

          default:
            trtr.setAttribute("style","background: #A9A9A9");
            break;
        }

        trtr.setAttribute("class","tr");

        track.append(trtr);
      }

      tbody.append(track);
    }

    for(let q = 0; q < CurrentSeason.eliminatedCast.length; q++)
    {
      console.log(q);
      let track = document.createElement("tr");

      let qname = document.createElement("td");

      qname.innerHTML = CurrentSeason.eliminatedCast[q].GetName();

      qname.setAttribute("class","trq");

      track.append(qname);

      while(CurrentSeason.eliminatedCast[q].trackrecord.length<CurrentSeason.episodes.length)
      {
        CurrentSeason.eliminatedCast[q].trackrecord.push('');
      }

      for(let t = 0; t < CurrentSeason.eliminatedCast[q].trackrecord.length; t++)
      {
        let trtr = document.createElement("td");

        trtr.innerHTML = CurrentSeason.eliminatedCast[q].trackrecord[t];

        switch(CurrentSeason.eliminatedCast[q].trackrecord[t])
        {
          case "GUEST":
            trtr.setAttribute("style","background: #DCDCDC; font-weight: bold;");
            break;

          case "WINNER":
            trtr.setAttribute("style","background: #ffda54; font-weight: bold;");
            break;
            
          case "RUNNER UP":
            trtr.setAttribute("style","background: ##fffff; font-weight: bold;");
            break;

          case "TOP 2":
            trtr.setAttribute("style","background: #ffedb5; font-weight: bold;");
            break;

          case "TOP 3":
            trtr.setAttribute("style","background: #ffedb5; font-weight: bold;");
            break;

          case "WIN":
            trtr.setAttribute("style","background: #9F60CE; font-weight: bold;");
            break;
          
          case "HIGH":
            trtr.setAttribute("style","background: #E183C8");
            break;
          
          case "SAFE":
            trtr.setAttribute("style","background: #F6C2EB");
            break;

          case "LOW":
            trtr.setAttribute("style","background: #F5A9B4");
            break;

          case "BOTTOM":
            trtr.setAttribute("style","background: #EF7183");
            break;

          case "ELIMINATED":
            trtr.setAttribute("style","background: #E41A37; font-weight: bold;");
            break;

          default:
            trtr.setAttribute("style","background: #A9A9A9");
            break;
        }

        trtr.setAttribute("class","tr");

        track.append(trtr);
      }

      tbody.append(track);
    }

    thead.append(treps);
    table.append(thead);
    table.append(tbody);

    let br = document.createElement("br");
    putincenter.append(table);

    this.MainScreen.append(putincenter);
    this.MainScreen.append(br);
  }

  createPromoTable(){
      CurrentSeason.fullCast.sort((a, b) => a.placement - b.placement);

      let putincenter = document.createElement("center");
      let table = document.createElement("table");
      let thead = document.createElement("thead");

      let tbody = document.createElement("tbody");

      let rows = ~~(CurrentSeason.fullCast.length/4);
      let rest = CurrentSeason.fullCast.length%4;

      if(rest!=0)
      {
        rows++;
      }
      for(let i = 0; i < rows; i++)
      {
        let tr = document.createElement("tr");
        if(i!=rows-1 || rest==0)
        {
          for(let q = 0; q<4;q++)
          {
            let td = document.createElement("td");
            if(CurrentSeason.eliminatedCast.indexOf(CurrentSeason.fullCast[q+(i*4)])!=-1)
            {
              td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 195px; width: 195px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
            }
            else
            {
            td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 195px; width: 195px;");
            }
            td.setAttribute("class","promos");
            tr.append(td);
          }
          tbody.append(tr);
          let tr2 = document.createElement("tr");
          for(let q = 0; q<4;q++)
          {
            let td = document.createElement("td");
            let name = document.createElement("p");
            name.setAttribute("style","font-weight: bold; font-size: 15px;");
            let placement = document.createElement("p");
            switch(CurrentSeason.fullCast[q+(i*4)].GetPlacement())
            {
              case 0:
                placement.innerHTML = "TBA";
                break;
              case 1:
                placement.innerHTML = "1st";
                break;
              case 2:
                placement.innerHTML = "2nd";
                break;
              case 3:
                placement.innerHTML = "3rd";
                break;
              default:
                placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
                break;
            }
            name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
            td.append(name);
            td.append(placement);
            td.setAttribute("class","promos");
            tr2.append(td);
          }
          tbody.append(tr2);
        }
        else
        {
          for(let q = 0; q<rest; q++)
          {
            let td = document.createElement("td");
            if(CurrentSeason.eliminatedCast.indexOf(CurrentSeason.fullCast[q+(i*4)])!=-1)
            {
              td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 195px; width: 195px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
            }
            else
            {
            td.setAttribute("style", "background: url("+ CurrentSeason.fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 195px; width: 195px;");
            }
            td.setAttribute("class","promos");
            tr.append(td);
          }
          let tr2 = document.createElement("tr");
          tbody.append(tr);
          for(let q = 0; q<rest;q++)
          {
            let td = document.createElement("td");
            let name = document.createElement("p");
            name.setAttribute("style","font-weight: bold; font-size: 15px;");
            let placement = document.createElement("p");
            switch(CurrentSeason.fullCast[q+(i*4)].GetPlacement())
            {
              case 0:
                placement.innerHTML = "TBA";
                break;
              case 1:
                placement.innerHTML = "1st";
                break;
              case 2:
                placement.innerHTML = "2nd";
                break;
              case 3:
                placement.innerHTML = "3rd";
                break;
              default:
                placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
                break;
            }
            name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
            td.append(name);
            td.append(placement);
            td.setAttribute("class","promos");
            tr2.append(td);
          }
          tbody.append(tr2);
          
        }
        
      }
      table.append(thead);
      table.append(tbody);
      let br = document.createElement("br");
      putincenter.append(table);
      this.MainScreen.append(putincenter);
      this.MainScreen.append(br);
  }
}

class MiniChallenge{
  constructor()
  {

  }

}
class SnatchGame{

}


class ActingChallenge{

  constructor(){
    this.hasrunway = true;
    this.winner = false;
    this.plays = [
      "Country Queens",
      "Queens In Spaces",
      "Queens Behind Bars",
      "Lip Sync Eleganza Extravaganza",
      "Drama Queens",
      "Scream Queens",
      "ShakesQueer",
      "Ru Hollywood Stories",
      "RuCo's Empire",
      "9021-HO",
      "Breastworld",
      "Good Girl, Get Out",
      "Gay's Anatomy",
      "RuPaulmark Channel",
      "Henny, I Shrunk The Drag Queens!",
      "She's A Super Tease",
      "The Daytona Winds",
      "Drag Movie Shequels",
      "My Best Squirrelfriend's Dragsmaids Wedding Trip",
      "Sex and the Kitty, Girl 3",
      "RuMerican Horror Story: Coven Girls",
      "Downton Draggy",
      "BeastEnders",
      "Bra Wars",
      "Her-Itage Moments",
      "Screech"
    ];

    this.chosen = getRandomInt(0,this.plays.length-1);
  }

  createMessage()
  {
    switch(getRandomInt(0,1))
    {
      case 0:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("I'm sorry to say but you have all been eliminated...");
        Announcement.createRupaulAnnouncement("HA! Got you all!");
        Announcement.createRupaulAnnouncement("Will you be able to do it like me ? Or you will fail ?");
        Announcement.createRupaulAnnouncement("Play the game to find out...");
        break;
      case 1:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Tonight, you will have to use your actings chops.");
        Announcement.createRupaulAnnouncement("Do you have what it takes ?");
        break;
    }
  }

  createBrief()
  {
    Main.createText("This week, the queens will have to act in : "+this.plays[this.chosen]+".");
  }

  TopPlacement()
  {
    
    let Top = [
    "Tonight, you knew how to work it OUT!",
    "Tonight, you shined all over this runway.",
    "You ruled over this runway.",
    "You made gold out of randomness.",
    "Your haute couture, made you rise to the top.",
    "You have creativity beyond limits.",
    "Tonight, you have made yourself stunning.",
    "Your couture made us gag.",
    "The cream always rises to the top.",
    "You have a great perception of design.",
    "Your outfit kept us begging for more."
    ];
    return(Top[getRandomInt(0,Top.length-1)]);
  }

  BtmPlacement()
  {
    
    let Btm = [
    ", you came here to slay, but tonight your outfit slayed you.",
    ", on the runway, you ran out of gas.",
    ", tonight the judges did not say yes to the dress.",
    ", your outfit had a story. A very confusing one.",
    ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
    ", your outfit made our heads turn, and made us dizzy.",
    ", you need to focus. Or else it's going to cost you.",
    ];
    return(Btm[getRandomInt(0,Btm.length-1)]);
  }

  rankPerfomances()
  {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].GetActing();
      }

      CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].perfomancescore<=8)
        {
          SlayedChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
        {
          GreatChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
        {
          GoodChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
        {
          BadChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>32)
        {
          FloppedChallenge.push(CurrentSeason.currentCast[i]);
        }
      }

  }

    createPerformances()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedChallenge.length!=0)
      {
        for(let i = 0; i < SlayedChallenge.length; i++)
        {
          Main.createImage(SlayedChallenge[i].image,"#6eadff");
          if(i!=SlayedChallenge.length-1)
          {
            slayedtext += SlayedChallenge[i].GetName()+", ";
          }
          else
          {
            if(SlayedChallenge.length!=1)
            {
              slayedtext += " and "+SlayedChallenge[i].GetName();
            }
            else
            {
              slayedtext += SlayedChallenge[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the challenge.", "Bold");
      }
  
      if(GreatChallenge.length!=0)
      {
        for(let i = 0; i < GreatChallenge.length; i++)
        {
          Main.createImage(GreatChallenge[i].image,"#6effe4");
          if(i!=GreatChallenge.length-1)
          {
            greattext += GreatChallenge[i].GetName()+", ";
          }
          else
          {
            if(GreatChallenge.length!=1)
            {
              greattext += " and "+GreatChallenge[i].GetName();
            }
            else
            {
              greattext += GreatChallenge[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great performance.", "Bold");
      }
  
      if(GoodChallenge.length!=0)
      {
        for(let i = 0; i < GoodChallenge.length; i++)
        {
          Main.createImage(GoodChallenge[i].image,"#6eff72");
          if(i!=GoodChallenge.length-1)
          {
            goodtext += GoodChallenge[i].GetName()+", ";
          }
          else
          {
            if(GoodChallenge.length!=1)
            {
              goodtext += " and "+GoodChallenge[i].GetName();
            }
            else
            {
              goodtext += GoodChallenge[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good performance.", "Bold");
      }
  
      if(BadChallenge.length!=0)
      {
        for(let i = 0; i < BadChallenge.length; i++)
        {
          Main.createImage(BadChallenge[i].image,"#ffe96e");
          if(i!=BadChallenge.length-1)
          {
            badtext += BadChallenge[i].GetName()+", ";
          }
          else
          {
            if(BadChallenge.length!=1)
            {
              badtext += " and "+BadChallenge[i].GetName();
            }
            else
            {
              badtext += BadChallenge[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad performance.", "Bold");
      }
  
      if(FloppedChallenge.length!=0)
      {
        for(let i = 0; i < FloppedChallenge.length; i++)
        {
          Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
          if(i!=FloppedChallenge.length-1)
          {
            floptext += FloppedChallenge[i].GetName()+", ";
          }
          else
          {
            if(FloppedChallenge.length!=1)
            {
              floptext += " and "+FloppedChallenge[i].GetName();
            }
            else
            {
              floptext += FloppedChallenge[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the challenge.", "Bold");
      }
    }

    rankRunways()
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].getRunway();
        CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
      }

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].runwayscore<=8)
        {
          SlayedRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
        {
          GreatRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
        {
          GoodRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
        {
          BadRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>32)
        {
          FloppedRunway.push(CurrentSeason.currentCast[i]);
        }
      }
    }

    createRunways()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedRunway.length!=0)
      {
        for(let i = 0; i < SlayedRunway.length; i++)
        {
          Main.createImage(SlayedRunway[i].image,"#6eadff");
          if(i!=SlayedRunway.length-1)
          {
            slayedtext += SlayedRunway[i].GetName()+", ";
          }
          else
          {
            if(SlayedRunway.length!=1)
            {
              slayedtext += " and "+SlayedRunway[i].GetName();
            }
            else
            {
              slayedtext += SlayedRunway[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the runway.", "Bold");
      }
  
      if(GreatRunway.length!=0)
      {
        for(let i = 0; i < GreatRunway.length; i++)
        {
          Main.createImage(GreatRunway[i].image,"#6effe4");
          if(i!=GreatRunway.length-1)
          {
            greattext += GreatRunway[i].GetName()+", ";
          }
          else
          {
            if(GreatRunway.length!=1)
            {
              greattext += " and "+GreatRunway[i].GetName();
            }
            else
            {
              greattext += GreatRunway[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great runway.", "Bold");
      }
  
      if(GoodRunway.length!=0)
      {
        for(let i = 0; i < GoodRunway.length; i++)
        {
          Main.createImage(GoodRunway[i].image,"#6eff72");
          if(i!=GoodRunway.length-1)
          {
            goodtext += GoodRunway[i].GetName()+", ";
          }
          else
          {
            if(GoodRunway.length!=1)
            {
              goodtext += " and "+GoodRunway[i].GetName();
            }
            else
            {
              goodtext += GoodRunway[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good runway.", "Bold");
      }
  
      if(BadRunway.length!=0)
      {
        for(let i = 0; i < BadRunway.length; i++)
        {
          Main.createImage(BadRunway[i].image,"#ffe96e");
          if(i!=BadRunway.length-1)
          {
            badtext += BadRunway[i].GetName()+", ";
          }
          else
          {
            if(BadRunway.length!=1)
            {
              badtext += " and "+BadRunway[i].GetName();
            }
            else
            {
              badtext += BadRunway[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad runway.", "Bold");
      }
  
      if(FloppedRunway.length!=0)
      {
        for(let i = 0; i < FloppedRunway.length; i++)
        {
          Main.createImage(FloppedRunway[i].image,"#ff6e6e");
          if(i!=FloppedRunway.length-1)
          {
            floptext += FloppedRunway[i].GetName()+", ";
          }
          else
          {
            if(FloppedRunway.length!=1)
            {
              floptext += " and "+FloppedRunway[i].GetName();
            }
            else
            {
              floptext += FloppedRunway[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the runway.", "Bold");
      }
    }
  }

class ImprovChallenge{

  constructor(){
    this.hasrunway = true;
    this.winner = false;
    this.improv = [
      " in an interview with a celebrity.",
      " in a news program named : \"QNN News\".",
      " in a news program named : \"Morning Glory\".",
      " in a news program named : \"Good Morning Bitches\".",
      " in a political debate.",
      " in a talk show named : \"Pink Table Talk\".",
      " in a talk show talking about celebrities.",
      " in drag cons panels!",
      " in a brand new kids TV show.",
      " in a brand new program : \"World's Worst\".",
      " in a brand new program : \"The Bossy Rossy Show\".",
      " in a brand new program : \"The Bitchelor\".",
      " in a brand new program : \"Los Angeles Drag Patrol\".",
      " in a brand new report : \"SheMZ\".",
      " in a brand new program : \"Jersey Justice\".",
    ];

    this.interviews = [
      "Queens Of All Medias",
      "Drag Queen Of Talk"
    ];

    this.debate = [
      "Choices 2020",
      "Frock The Votel"
    ];

    this.chosen = getRandomInt(0,this.improv.length-1);
    this.episodename = "";
    switch(this.chosen)
    {
      case 0:
        this.episodename = this.interviews[getRandomInt(0,this.interviews.length-1)];
        break;
      case 1:
        this.episodename = "QQN News";
        break;
      case 2:
        this.episodename = "Morning Glory";
        break;
      case 3:
        this.episodename = "Good Morning Bitches";
        break;
      case 4:
        this.episodename = this.debate[getRandomInt(0,this.debate.length-1)];
        break;
      case 5:
        this.episodename = "Pink Table Talk";
        break;
      case 6:
        this.episodename = "Diva Worships";
        break;
      case 7:
        this.episodename = "Menzeses";
        break;
      case 8:
        this.episodename = "Draggle Rock";
        break;
      case 9:
        this.episodename = "World's Worst";
        break;
      case 10:
        this.episodename = "The Bossy Rossy Show";
        break;
      case 11:
        this.episodename = "The Bitchelor";
        break;
      case 12:
        this.episodename = "L.A.D.P.";
        break;
      case 13:
        this.episodename = "SheMZ";
        break;
      case 14:
        this.episodename = "Jersey Justice";
        break;
    }
  }

  createMessage()
  {
    switch(getRandomInt(0,1))
    {
      case 0:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Do you know how to lie on the spot ?");
        Announcement.createRupaulAnnouncement("Well if you do you're gonna need it!");
        break;
      case 1:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Tonight, I have a favor to ask of you all.");
        Announcement.createRupaulAnnouncement("Prepare yourself for what's gonna come, because you're going to need a lot of preparings to do well!");
        break;
    }
  }

  createBrief()
  {
    Main.createText("This week, the queens will have to improvise "+this.improv[this.chosen]);
  }

  TopPlacement()
  {
    
    let Top = [
    "Tonight, you knew how to work it OUT!",
    "Tonight, you shined all over this runway.",
    "You ruled over this runway.",
    "You made gold out of randomness.",
    "Your haute couture, made you rise to the top.",
    "You have creativity beyond limits.",
    "Tonight, you have made yourself stunning.",
    "Your couture made us gag.",
    "The cream always rises to the top.",
    "You have a great perception of design.",
    "Your outfit kept us begging for more."
    ];
    return(Top[getRandomInt(0,Top.length-1)]);
  }

  BtmPlacement()
  {
    
    let Btm = [
    ", you came here to slay, but tonight your outfit slayed you.",
    ", on the runway, you ran out of gas.",
    ", tonight the judges did not say yes to the dress.",
    ", your outfit had a story. A very confusing one.",
    ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
    ", your outfit made our heads turn, and made us dizzy.",
    ", you need to focus. Or else it's going to cost you.",
    ];
    return(Btm[getRandomInt(0,Btm.length-1)]);
  }

  rankPerfomances()
  {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].GetImprov();
      }

      CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].perfomancescore<=8)
        {
          SlayedChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
        {
          GreatChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
        {
          GoodChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
        {
          BadChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>32)
        {
          FloppedChallenge.push(CurrentSeason.currentCast[i]);
        }
      }

  }

    createPerformances()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedChallenge.length!=0)
      {
        for(let i = 0; i < SlayedChallenge.length; i++)
        {
          Main.createImage(SlayedChallenge[i].image,"#6eadff");
          if(i!=SlayedChallenge.length-1)
          {
            slayedtext += SlayedChallenge[i].GetName()+", ";
          }
          else
          {
            if(SlayedChallenge.length!=1)
            {
              slayedtext += " and "+SlayedChallenge[i].GetName();
            }
            else
            {
              slayedtext += SlayedChallenge[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the challenge.", "Bold");
      }
  
      if(GreatChallenge.length!=0)
      {
        for(let i = 0; i < GreatChallenge.length; i++)
        {
          Main.createImage(GreatChallenge[i].image,"#6effe4");
          if(i!=GreatChallenge.length-1)
          {
            greattext += GreatChallenge[i].GetName()+", ";
          }
          else
          {
            if(GreatChallenge.length!=1)
            {
              greattext += " and "+GreatChallenge[i].GetName();
            }
            else
            {
              greattext += GreatChallenge[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great performance.", "Bold");
      }
  
      if(GoodChallenge.length!=0)
      {
        for(let i = 0; i < GoodChallenge.length; i++)
        {
          Main.createImage(GoodChallenge[i].image,"#6eff72");
          if(i!=GoodChallenge.length-1)
          {
            goodtext += GoodChallenge[i].GetName()+", ";
          }
          else
          {
            if(GoodChallenge.length!=1)
            {
              goodtext += " and "+GoodChallenge[i].GetName();
            }
            else
            {
              goodtext += GoodChallenge[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good performance.", "Bold");
      }
  
      if(BadChallenge.length!=0)
      {
        for(let i = 0; i < BadChallenge.length; i++)
        {
          Main.createImage(BadChallenge[i].image,"#ffe96e");
          if(i!=BadChallenge.length-1)
          {
            badtext += BadChallenge[i].GetName()+", ";
          }
          else
          {
            if(BadChallenge.length!=1)
            {
              badtext += " and "+BadChallenge[i].GetName();
            }
            else
            {
              badtext += BadChallenge[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad performance.", "Bold");
      }
  
      if(FloppedChallenge.length!=0)
      {
        for(let i = 0; i < FloppedChallenge.length; i++)
        {
          Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
          if(i!=FloppedChallenge.length-1)
          {
            floptext += FloppedChallenge[i].GetName()+", ";
          }
          else
          {
            if(FloppedChallenge.length!=1)
            {
              floptext += " and "+FloppedChallenge[i].GetName();
            }
            else
            {
              floptext += FloppedChallenge[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the challenge.", "Bold");
      }
    }

    rankRunways()
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].getRunway();
        CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
      }

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].runwayscore<=8)
        {
          SlayedRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
        {
          GreatRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
        {
          GoodRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
        {
          BadRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>32)
        {
          FloppedRunway.push(CurrentSeason.currentCast[i]);
        }
      }
    }

    createRunways()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedRunway.length!=0)
      {
        for(let i = 0; i < SlayedRunway.length; i++)
        {
          Main.createImage(SlayedRunway[i].image,"#6eadff");
          if(i!=SlayedRunway.length-1)
          {
            slayedtext += SlayedRunway[i].GetName()+", ";
          }
          else
          {
            if(SlayedRunway.length!=1)
            {
              slayedtext += " and "+SlayedRunway[i].GetName();
            }
            else
            {
              slayedtext += SlayedRunway[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the runway.", "Bold");
      }
  
      if(GreatRunway.length!=0)
      {
        for(let i = 0; i < GreatRunway.length; i++)
        {
          Main.createImage(GreatRunway[i].image,"#6effe4");
          if(i!=GreatRunway.length-1)
          {
            greattext += GreatRunway[i].GetName()+", ";
          }
          else
          {
            if(GreatRunway.length!=1)
            {
              greattext += " and "+GreatRunway[i].GetName();
            }
            else
            {
              greattext += GreatRunway[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great runway.", "Bold");
      }
  
      if(GoodRunway.length!=0)
      {
        for(let i = 0; i < GoodRunway.length; i++)
        {
          Main.createImage(GoodRunway[i].image,"#6eff72");
          if(i!=GoodRunway.length-1)
          {
            goodtext += GoodRunway[i].GetName()+", ";
          }
          else
          {
            if(GoodRunway.length!=1)
            {
              goodtext += " and "+GoodRunway[i].GetName();
            }
            else
            {
              goodtext += GoodRunway[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good runway.", "Bold");
      }
  
      if(BadRunway.length!=0)
      {
        for(let i = 0; i < BadRunway.length; i++)
        {
          Main.createImage(BadRunway[i].image,"#ffe96e");
          if(i!=BadRunway.length-1)
          {
            badtext += BadRunway[i].GetName()+", ";
          }
          else
          {
            if(BadRunway.length!=1)
            {
              badtext += " and "+BadRunway[i].GetName();
            }
            else
            {
              badtext += BadRunway[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad runway.", "Bold");
      }
  
      if(FloppedRunway.length!=0)
      {
        for(let i = 0; i < FloppedRunway.length; i++)
        {
          Main.createImage(FloppedRunway[i].image,"#ff6e6e");
          if(i!=FloppedRunway.length-1)
          {
            floptext += FloppedRunway[i].GetName()+", ";
          }
          else
          {
            if(FloppedRunway.length!=1)
            {
              floptext += " and "+FloppedRunway[i].GetName();
            }
            else
            {
              floptext += FloppedRunway[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the runway.", "Bold");
      }
    }
  }

  class ChoreographyChallenge{

  constructor(){
    this.hasrunway = true;
    this.winner = false;
    this.choreo = [
      "WTF!: Wrestling's Trashiest Fighters",
      "Black Swan: Why It Gotta Be Black?",
      "Prancing Queens",
      "She Done Already Done Brought It On",
      "The Draglympics",
      "Disco-Mentary",
      "Dragoton"
    ];

    this.chosen = getRandomInt(0,this.choreo.length-1);

    this.episodename = "";
    switch(this.chosen)
    {
      case 0:
        this.episodename = "WTF!";
        break;
      case 1:
        this.episodename = "Black Swan";
        break;
      case 2:
        this.episodename = "Prancing Queens";
        break;
      case 3:
        this.episodename = "She Done Already Done Brought It On";
        break;
      case 4:
        this.episodename = "The Draglympics";
        break;
      case 5:
        this.episodename = "Disco-Mentary";
        break;
      case 6:
        this.episodename = "Dragoton";
        break;
    }
  }

  createMessage()
  {
    switch(getRandomInt(0,1))
    {
      case 0:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Does dancing ring a bell ?");
        Announcement.createRupaulAnnouncement("Because, tonight, you'll have to choreograph your way to the top!");
        break;
      case 1:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Are you prepared ?");
        Announcement.createRupaulAnnouncement("Tonight it's dancing time!");
        break;
    }
  }

  createBrief()
  {
    Main.createText("This week, the queens will have to choreograph themselves in : \""+this.choreo[this.chosen]+"\".");
  }

  TopPlacement()
  {
    
    let Top = [
    "Tonight, your choreography blew us away.",
    "Tonight, we saw how bright you shine.",
    "You have dancing running throught your veins.",
    "Tonight, you showed up and showed out.",
    "You truly showed us what you are capable of.",
    "Tonight, you proved yourself.",
    ];
    return(Top[getRandomInt(0,Top.length-1)]);
  }

  BtmPlacement()
  {
    
    let Btm = [
    ", your comedy could have used a few laugh.",
    ", on the runway, you ran out of gas.",
    ", tonight the judges did not say yes to the dress.",
    ", your outfit had a story. A very confusing one.",
    ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
    ", your outfit made our heads turn, and made us dizzy.",
    ", you need to focus. Or else it's going to cost you.",
    ];
    return(Btm[getRandomInt(0,Btm.length-1)]);
  }

  rankPerfomances()
  {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].GetDancing();
      }

      CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].perfomancescore<=8)
        {
          SlayedChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
        {
          GreatChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
        {
          GoodChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
        {
          BadChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>32)
        {
          FloppedChallenge.push(CurrentSeason.currentCast[i]);
        }
      }

  }

    createPerformances()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedChallenge.length!=0)
      {
        for(let i = 0; i < SlayedChallenge.length; i++)
        {
          Main.createImage(SlayedChallenge[i].image,"#6eadff");
          if(i!=SlayedChallenge.length-1)
          {
            slayedtext += SlayedChallenge[i].GetName()+", ";
          }
          else
          {
            if(SlayedChallenge.length!=1)
            {
              slayedtext += " and "+SlayedChallenge[i].GetName();
            }
            else
            {
              slayedtext += SlayedChallenge[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the challenge.", "Bold");
      }
  
      if(GreatChallenge.length!=0)
      {
        for(let i = 0; i < GreatChallenge.length; i++)
        {
          Main.createImage(GreatChallenge[i].image,"#6effe4");
          if(i!=GreatChallenge.length-1)
          {
            greattext += GreatChallenge[i].GetName()+", ";
          }
          else
          {
            if(GreatChallenge.length!=1)
            {
              greattext += " and "+GreatChallenge[i].GetName();
            }
            else
            {
              greattext += GreatChallenge[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great performance.", "Bold");
      }
  
      if(GoodChallenge.length!=0)
      {
        for(let i = 0; i < GoodChallenge.length; i++)
        {
          Main.createImage(GoodChallenge[i].image,"#6eff72");
          if(i!=GoodChallenge.length-1)
          {
            goodtext += GoodChallenge[i].GetName()+", ";
          }
          else
          {
            if(GoodChallenge.length!=1)
            {
              goodtext += " and "+GoodChallenge[i].GetName();
            }
            else
            {
              goodtext += GoodChallenge[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good performance.", "Bold");
      }
  
      if(BadChallenge.length!=0)
      {
        for(let i = 0; i < BadChallenge.length; i++)
        {
          Main.createImage(BadChallenge[i].image,"#ffe96e");
          if(i!=BadChallenge.length-1)
          {
            badtext += BadChallenge[i].GetName()+", ";
          }
          else
          {
            if(BadChallenge.length!=1)
            {
              badtext += " and "+BadChallenge[i].GetName();
            }
            else
            {
              badtext += BadChallenge[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad performance.", "Bold");
      }
  
      if(FloppedChallenge.length!=0)
      {
        for(let i = 0; i < FloppedChallenge.length; i++)
        {
          Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
          if(i!=FloppedChallenge.length-1)
          {
            floptext += FloppedChallenge[i].GetName()+", ";
          }
          else
          {
            if(FloppedChallenge.length!=1)
            {
              floptext += " and "+FloppedChallenge[i].GetName();
            }
            else
            {
              floptext += FloppedChallenge[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the challenge.", "Bold");
      }
    }

    rankRunways()
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].getRunway();
        CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
      }

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].runwayscore<=8)
        {
          SlayedRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
        {
          GreatRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
        {
          GoodRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
        {
          BadRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>32)
        {
          FloppedRunway.push(CurrentSeason.currentCast[i]);
        }
      }
    }

    createRunways()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedRunway.length!=0)
      {
        for(let i = 0; i < SlayedRunway.length; i++)
        {
          Main.createImage(SlayedRunway[i].image,"#6eadff");
          if(i!=SlayedRunway.length-1)
          {
            slayedtext += SlayedRunway[i].GetName()+", ";
          }
          else
          {
            if(SlayedRunway.length!=1)
            {
              slayedtext += " and "+SlayedRunway[i].GetName();
            }
            else
            {
              slayedtext += SlayedRunway[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the runway.", "Bold");
      }
  
      if(GreatRunway.length!=0)
      {
        for(let i = 0; i < GreatRunway.length; i++)
        {
          Main.createImage(GreatRunway[i].image,"#6effe4");
          if(i!=GreatRunway.length-1)
          {
            greattext += GreatRunway[i].GetName()+", ";
          }
          else
          {
            if(GreatRunway.length!=1)
            {
              greattext += " and "+GreatRunway[i].GetName();
            }
            else
            {
              greattext += GreatRunway[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great runway.", "Bold");
      }
  
      if(GoodRunway.length!=0)
      {
        for(let i = 0; i < GoodRunway.length; i++)
        {
          Main.createImage(GoodRunway[i].image,"#6eff72");
          if(i!=GoodRunway.length-1)
          {
            goodtext += GoodRunway[i].GetName()+", ";
          }
          else
          {
            if(GoodRunway.length!=1)
            {
              goodtext += " and "+GoodRunway[i].GetName();
            }
            else
            {
              goodtext += GoodRunway[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good runway.", "Bold");
      }
  
      if(BadRunway.length!=0)
      {
        for(let i = 0; i < BadRunway.length; i++)
        {
          Main.createImage(BadRunway[i].image,"#ffe96e");
          if(i!=BadRunway.length-1)
          {
            badtext += BadRunway[i].GetName()+", ";
          }
          else
          {
            if(BadRunway.length!=1)
            {
              badtext += " and "+BadRunway[i].GetName();
            }
            else
            {
              badtext += BadRunway[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad runway.", "Bold");
      }
  
      if(FloppedRunway.length!=0)
      {
        for(let i = 0; i < FloppedRunway.length; i++)
        {
          Main.createImage(FloppedRunway[i].image,"#ff6e6e");
          if(i!=FloppedRunway.length-1)
          {
            floptext += FloppedRunway[i].GetName()+", ";
          }
          else
          {
            if(FloppedRunway.length!=1)
            {
              floptext += " and "+FloppedRunway[i].GetName();
            }
            else
            {
              floptext += FloppedRunway[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the runway.", "Bold");
      }
    }
  }

  
  class CommercialChallenge{

    constructor(){
      this.hasrunway = true;
      this.winner = false;
      this.commercial = [
        "need to create a commercial that ressembles a sport routine.",
        "need to create a commercial about MAC Viva Glam.",
        "need to create patriotic video messages to the troops.",
        "need to create commercials for RuPaul's albums Glamazon & Champion.",
        "need to create commercials for RuPaul's new makeup line.",
        "need to create commercials for a new dating app.",
        "need to create commercial about forgotten firsts outs queens."
      ];
  
      this.chosen = getRandomInt(0,this.commercial.length-1);
  
      this.episodename = "";
      switch(this.chosen)
      {
        case 0:
          this.episodename = "Totally Leotarded";
          break;
        case 1:
          this.episodename = "MAC Viva Glam";
          break;
        case 2:
          this.episodename = "Life, Liberty & the Pursuit of Style";
          break;
        case 3:
          this.episodename = "Glamazons vs Champions";
          break;
        case 4:
          this.episodename = "Glamazon by Colorevolution";
          break;
        case 5:
          this.episodename = "Tap That App";
          break;
        case 6:
          this.episodename = "Save A Queen";
          break;
      }
    }
  
    createMessage()
    {
      switch(getRandomInt(0,1))
      {
        case 0:
          Announcement.createRupaulAnnouncement("Hello queens!");
          Announcement.createRupaulAnnouncement("Do you have a storyboard ?");
          Announcement.createRupaulAnnouncement("Or will your story ends ?");
          Announcement.createRupaulAnnouncement("Time to find out!");
          break;
        case 1:
          Announcement.createRupaulAnnouncement("Hello queens!");
          Announcement.createRupaulAnnouncement("Are you ready for tonight!");
          Announcement.createRupaulAnnouncement("You'll have to give it your all.");
          Announcement.createRupaulAnnouncement("Good luck!");
          break;
      }
    }
  
    createBrief()
    {
      Main.createText("This week, the queens will "+this.commercial[this.chosen]);
    }
  
    TopPlacement()
    {
      
      let Top = [
      "Tonight, your choreography blew us away.",
      "Tonight, we saw how bright you shine.",
      "You have dancing running throught your veins.",
      "Tonight, you showed up and showed out.",
      "You truly showed us what you are capable of.",
      "Tonight, you proved yourself.",
      ];
      return(Top[getRandomInt(0,Top.length-1)]);
    }
  
    BtmPlacement()
    {
      
      let Btm = [
      ", your comedy could have used a few laugh.",
      ", on the runway, you ran out of gas.",
      ", tonight the judges did not say yes to the dress.",
      ", your outfit had a story. A very confusing one.",
      ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
      ", your outfit made our heads turn, and made us dizzy.",
      ", you need to focus. Or else it's going to cost you.",
      ];
      return(Btm[getRandomInt(0,Btm.length-1)]);
    }
  
    rankPerfomances()
    {
        for(let i = 0; i < CurrentSeason.currentCast.length;i++)
        {
          CurrentSeason.currentCast[i].GetCommercial();
        }
  
        CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);
  
        for(let i = 0; i<CurrentSeason.currentCast.length; i++)
        {
          if(CurrentSeason.currentCast[i].perfomancescore<=8)
          {
            SlayedChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
          {
            GreatChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
          {
            GoodChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
          {
            BadChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>32)
          {
            FloppedChallenge.push(CurrentSeason.currentCast[i]);
          }
        }
  
    }
  
      createPerformances()
      {
        let slayedtext = "";
        let greattext = "";
        let goodtext = "";
        let badtext = "";
        let floptext = "";
        
    
        if(SlayedChallenge.length!=0)
        {
          for(let i = 0; i < SlayedChallenge.length; i++)
          {
            Main.createImage(SlayedChallenge[i].image,"#6eadff");
            if(i!=SlayedChallenge.length-1)
            {
              slayedtext += SlayedChallenge[i].GetName()+", ";
            }
            else
            {
              if(SlayedChallenge.length!=1)
              {
                slayedtext += " and "+SlayedChallenge[i].GetName();
              }
              else
              {
                slayedtext += SlayedChallenge[i].GetName();
              }
            }
          }
          Main.createText(slayedtext+" slayed the challenge.", "Bold");
        }
    
        if(GreatChallenge.length!=0)
        {
          for(let i = 0; i < GreatChallenge.length; i++)
          {
            Main.createImage(GreatChallenge[i].image,"#6effe4");
            if(i!=GreatChallenge.length-1)
            {
              greattext += GreatChallenge[i].GetName()+", ";
            }
            else
            {
              if(GreatChallenge.length!=1)
              {
                greattext += " and "+GreatChallenge[i].GetName();
              }
              else
              {
                greattext += GreatChallenge[i].GetName();
              }
            }
          }
          Main.createText(greattext+" had a great performance.", "Bold");
        }
    
        if(GoodChallenge.length!=0)
        {
          for(let i = 0; i < GoodChallenge.length; i++)
          {
            Main.createImage(GoodChallenge[i].image,"#6eff72");
            if(i!=GoodChallenge.length-1)
            {
              goodtext += GoodChallenge[i].GetName()+", ";
            }
            else
            {
              if(GoodChallenge.length!=1)
              {
                goodtext += " and "+GoodChallenge[i].GetName();
              }
              else
              {
                goodtext += GoodChallenge[i].GetName();
              }
            }
          }
          Main.createText(goodtext+" had a good performance.", "Bold");
        }
    
        if(BadChallenge.length!=0)
        {
          for(let i = 0; i < BadChallenge.length; i++)
          {
            Main.createImage(BadChallenge[i].image,"#ffe96e");
            if(i!=BadChallenge.length-1)
            {
              badtext += BadChallenge[i].GetName()+", ";
            }
            else
            {
              if(BadChallenge.length!=1)
              {
                badtext += " and "+BadChallenge[i].GetName();
              }
              else
              {
                badtext += BadChallenge[i].GetName();
              }
            }
          }
          Main.createText(badtext+" had a bad performance.", "Bold");
        }
    
        if(FloppedChallenge.length!=0)
        {
          for(let i = 0; i < FloppedChallenge.length; i++)
          {
            Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
            if(i!=FloppedChallenge.length-1)
            {
              floptext += FloppedChallenge[i].GetName()+", ";
            }
            else
            {
              if(FloppedChallenge.length!=1)
              {
                floptext += " and "+FloppedChallenge[i].GetName();
              }
              else
              {
                floptext += FloppedChallenge[i].GetName();
              }
            }
          }
          Main.createText(floptext+" flopped the challenge.", "Bold");
        }
      }
  
      rankRunways()
      {
        for(let i = 0; i < CurrentSeason.currentCast.length;i++)
        {
          CurrentSeason.currentCast[i].getRunway();
          CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
        }
  
        for(let i = 0; i<CurrentSeason.currentCast.length; i++)
        {
          if(CurrentSeason.currentCast[i].runwayscore<=8)
          {
            SlayedRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
          {
            GreatRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
          {
            GoodRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
          {
            BadRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>32)
          {
            FloppedRunway.push(CurrentSeason.currentCast[i]);
          }
        }
      }
  
      createRunways()
      {
        let slayedtext = "";
        let greattext = "";
        let goodtext = "";
        let badtext = "";
        let floptext = "";
        
    
        if(SlayedRunway.length!=0)
        {
          for(let i = 0; i < SlayedRunway.length; i++)
          {
            Main.createImage(SlayedRunway[i].image,"#6eadff");
            if(i!=SlayedRunway.length-1)
            {
              slayedtext += SlayedRunway[i].GetName()+", ";
            }
            else
            {
              if(SlayedRunway.length!=1)
              {
                slayedtext += " and "+SlayedRunway[i].GetName();
              }
              else
              {
                slayedtext += SlayedRunway[i].GetName();
              }
            }
          }
          Main.createText(slayedtext+" slayed the runway.", "Bold");
        }
    
        if(GreatRunway.length!=0)
        {
          for(let i = 0; i < GreatRunway.length; i++)
          {
            Main.createImage(GreatRunway[i].image,"#6effe4");
            if(i!=GreatRunway.length-1)
            {
              greattext += GreatRunway[i].GetName()+", ";
            }
            else
            {
              if(GreatRunway.length!=1)
              {
                greattext += " and "+GreatRunway[i].GetName();
              }
              else
              {
                greattext += GreatRunway[i].GetName();
              }
            }
          }
          Main.createText(greattext+" had a great runway.", "Bold");
        }
    
        if(GoodRunway.length!=0)
        {
          for(let i = 0; i < GoodRunway.length; i++)
          {
            Main.createImage(GoodRunway[i].image,"#6eff72");
            if(i!=GoodRunway.length-1)
            {
              goodtext += GoodRunway[i].GetName()+", ";
            }
            else
            {
              if(GoodRunway.length!=1)
              {
                goodtext += " and "+GoodRunway[i].GetName();
              }
              else
              {
                goodtext += GoodRunway[i].GetName();
              }
            }
          }
          Main.createText(goodtext+" had a good runway.", "Bold");
        }
    
        if(BadRunway.length!=0)
        {
          for(let i = 0; i < BadRunway.length; i++)
          {
            Main.createImage(BadRunway[i].image,"#ffe96e");
            if(i!=BadRunway.length-1)
            {
              badtext += BadRunway[i].GetName()+", ";
            }
            else
            {
              if(BadRunway.length!=1)
              {
                badtext += " and "+BadRunway[i].GetName();
              }
              else
              {
                badtext += BadRunway[i].GetName();
              }
            }
          }
          Main.createText(badtext+" had a bad runway.", "Bold");
        }
    
        if(FloppedRunway.length!=0)
        {
          for(let i = 0; i < FloppedRunway.length; i++)
          {
            Main.createImage(FloppedRunway[i].image,"#ff6e6e");
            if(i!=FloppedRunway.length-1)
            {
              floptext += FloppedRunway[i].GetName()+", ";
            }
            else
            {
              if(FloppedRunway.length!=1)
              {
                floptext += " and "+FloppedRunway[i].GetName();
              }
              else
              {
                floptext += FloppedRunway[i].GetName();
              }
            }
          }
          Main.createText(floptext+" flopped the runway.", "Bold");
        }
      }
    }

  class BrandingChallenge{

    constructor(){
      this.hasrunway = true;
      this.winner = false;
      this.commercial = [
        "need to create a commercial about their own book.",
        "need to create a commercial about their own magazine.",
        "need to create a commercial about their own perfume.",
        "need to create a commercial about them becoming drag president.",
        "need to create a commercial about their own tv pilot.",
        "need to create a commercial about their own product.",
        "need to create a commercial about their own drink.",
        "need to create a commercial about their yeast spread.",
      ];
  
      this.chosen = getRandomInt(0,this.commercial.length-1);
  
      this.episodename = "";
      switch(this.chosen)
      {
        case 0:
          this.episodename = "Once Upon a Queen";
          break;
        case 1:
          this.episodename = "Dragazines";
          break;
        case 2:
          this.episodename = "Scent of a Drag Queen";
          break;
        case 3:
          this.episodename = "Shady Politics";
          break;
        case 4:
          this.episodename = "Your Pilot's On Fire";
          break;
        case 5:
          this.episodename = "Droop";
          break;
        case 6:
          this.episodename = "Pop! Goes the Queens";
          break;
        case 7:
          this.episodename = "Marketing Hats";
          break;
      }
    }
  
    createMessage()
    {
      switch(getRandomInt(0,1))
      {
        case 0:
          Announcement.createRupaulAnnouncement("Hello queens!");
          Announcement.createRupaulAnnouncement("Do you have a storyboard ?");
          Announcement.createRupaulAnnouncement("Or will your story ends ?");
          Announcement.createRupaulAnnouncement("Time to find out!");
          break;
        case 1:
          Announcement.createRupaulAnnouncement("Hello queens!");
          Announcement.createRupaulAnnouncement("Are you ready for tonight!");
          Announcement.createRupaulAnnouncement("You'll have to give it your all.");
          Announcement.createRupaulAnnouncement("Good luck!");
          break;
      }
    }
  
    createBrief()
    {
      Main.createText("This week, the queens will "+this.commercial[this.chosen]);
    }
  
    TopPlacement()
    {
      
      let Top = [
      "Tonight, your choreography blew us away.",
      "Tonight, we saw how bright you shine.",
      "You have dancing running throught your veins.",
      "Tonight, you showed up and showed out.",
      "You truly showed us what you are capable of.",
      "Tonight, you proved yourself.",
      ];
      return(Top[getRandomInt(0,Top.length-1)]);
    }
  
    BtmPlacement()
    {
      
      let Btm = [
      ", your comedy could have used a few laugh.",
      ", on the runway, you ran out of gas.",
      ", tonight the judges did not say yes to the dress.",
      ", your outfit had a story. A very confusing one.",
      ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
      ", your outfit made our heads turn, and made us dizzy.",
      ", you need to focus. Or else it's going to cost you.",
      ];
      return(Btm[getRandomInt(0,Btm.length-1)]);
    }
  
    rankPerfomances()
    {
        for(let i = 0; i < CurrentSeason.currentCast.length;i++)
        {
          CurrentSeason.currentCast[i].GetCommercial();
        }
  
        CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);
  
        for(let i = 0; i<CurrentSeason.currentCast.length; i++)
        {
          if(CurrentSeason.currentCast[i].perfomancescore<=8)
          {
            SlayedChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
          {
            GreatChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
          {
            GoodChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
          {
            BadChallenge.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].perfomancescore>32)
          {
            FloppedChallenge.push(CurrentSeason.currentCast[i]);
          }
        }
  
    }
  
      createPerformances()
      {
        let slayedtext = "";
        let greattext = "";
        let goodtext = "";
        let badtext = "";
        let floptext = "";
        
    
        if(SlayedChallenge.length!=0)
        {
          for(let i = 0; i < SlayedChallenge.length; i++)
          {
            Main.createImage(SlayedChallenge[i].image,"#6eadff");
            if(i!=SlayedChallenge.length-1)
            {
              slayedtext += SlayedChallenge[i].GetName()+", ";
            }
            else
            {
              if(SlayedChallenge.length!=1)
              {
                slayedtext += " and "+SlayedChallenge[i].GetName();
              }
              else
              {
                slayedtext += SlayedChallenge[i].GetName();
              }
            }
          }
          Main.createText(slayedtext+" slayed the challenge.", "Bold");
        }
    
        if(GreatChallenge.length!=0)
        {
          for(let i = 0; i < GreatChallenge.length; i++)
          {
            Main.createImage(GreatChallenge[i].image,"#6effe4");
            if(i!=GreatChallenge.length-1)
            {
              greattext += GreatChallenge[i].GetName()+", ";
            }
            else
            {
              if(GreatChallenge.length!=1)
              {
                greattext += " and "+GreatChallenge[i].GetName();
              }
              else
              {
                greattext += GreatChallenge[i].GetName();
              }
            }
          }
          Main.createText(greattext+" had a great performance.", "Bold");
        }
    
        if(GoodChallenge.length!=0)
        {
          for(let i = 0; i < GoodChallenge.length; i++)
          {
            Main.createImage(GoodChallenge[i].image,"#6eff72");
            if(i!=GoodChallenge.length-1)
            {
              goodtext += GoodChallenge[i].GetName()+", ";
            }
            else
            {
              if(GoodChallenge.length!=1)
              {
                goodtext += " and "+GoodChallenge[i].GetName();
              }
              else
              {
                goodtext += GoodChallenge[i].GetName();
              }
            }
          }
          Main.createText(goodtext+" had a good performance.", "Bold");
        }
    
        if(BadChallenge.length!=0)
        {
          for(let i = 0; i < BadChallenge.length; i++)
          {
            Main.createImage(BadChallenge[i].image,"#ffe96e");
            if(i!=BadChallenge.length-1)
            {
              badtext += BadChallenge[i].GetName()+", ";
            }
            else
            {
              if(BadChallenge.length!=1)
              {
                badtext += " and "+BadChallenge[i].GetName();
              }
              else
              {
                badtext += BadChallenge[i].GetName();
              }
            }
          }
          Main.createText(badtext+" had a bad performance.", "Bold");
        }
    
        if(FloppedChallenge.length!=0)
        {
          for(let i = 0; i < FloppedChallenge.length; i++)
          {
            Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
            if(i!=FloppedChallenge.length-1)
            {
              floptext += FloppedChallenge[i].GetName()+", ";
            }
            else
            {
              if(FloppedChallenge.length!=1)
              {
                floptext += " and "+FloppedChallenge[i].GetName();
              }
              else
              {
                floptext += FloppedChallenge[i].GetName();
              }
            }
          }
          Main.createText(floptext+" flopped the challenge.", "Bold");
        }
      }
  
      rankRunways()
      {
        for(let i = 0; i < CurrentSeason.currentCast.length;i++)
        {
          CurrentSeason.currentCast[i].getRunway();
          CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
        }
  
        for(let i = 0; i<CurrentSeason.currentCast.length; i++)
        {
          if(CurrentSeason.currentCast[i].runwayscore<=8)
          {
            SlayedRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
          {
            GreatRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
          {
            GoodRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
          {
            BadRunway.push(CurrentSeason.currentCast[i]);
          }
          else if(CurrentSeason.currentCast[i].runwayscore>32)
          {
            FloppedRunway.push(CurrentSeason.currentCast[i]);
          }
        }
      }
  
      createRunways()
      {
        let slayedtext = "";
        let greattext = "";
        let goodtext = "";
        let badtext = "";
        let floptext = "";
        
    
        if(SlayedRunway.length!=0)
        {
          for(let i = 0; i < SlayedRunway.length; i++)
          {
            Main.createImage(SlayedRunway[i].image,"#6eadff");
            if(i!=SlayedRunway.length-1)
            {
              slayedtext += SlayedRunway[i].GetName()+", ";
            }
            else
            {
              if(SlayedRunway.length!=1)
              {
                slayedtext += " and "+SlayedRunway[i].GetName();
              }
              else
              {
                slayedtext += SlayedRunway[i].GetName();
              }
            }
          }
          Main.createText(slayedtext+" slayed the runway.", "Bold");
        }
    
        if(GreatRunway.length!=0)
        {
          for(let i = 0; i < GreatRunway.length; i++)
          {
            Main.createImage(GreatRunway[i].image,"#6effe4");
            if(i!=GreatRunway.length-1)
            {
              greattext += GreatRunway[i].GetName()+", ";
            }
            else
            {
              if(GreatRunway.length!=1)
              {
                greattext += " and "+GreatRunway[i].GetName();
              }
              else
              {
                greattext += GreatRunway[i].GetName();
              }
            }
          }
          Main.createText(greattext+" had a great runway.", "Bold");
        }
    
        if(GoodRunway.length!=0)
        {
          for(let i = 0; i < GoodRunway.length; i++)
          {
            Main.createImage(GoodRunway[i].image,"#6eff72");
            if(i!=GoodRunway.length-1)
            {
              goodtext += GoodRunway[i].GetName()+", ";
            }
            else
            {
              if(GoodRunway.length!=1)
              {
                goodtext += " and "+GoodRunway[i].GetName();
              }
              else
              {
                goodtext += GoodRunway[i].GetName();
              }
            }
          }
          Main.createText(goodtext+" had a good runway.", "Bold");
        }
    
        if(BadRunway.length!=0)
        {
          for(let i = 0; i < BadRunway.length; i++)
          {
            Main.createImage(BadRunway[i].image,"#ffe96e");
            if(i!=BadRunway.length-1)
            {
              badtext += BadRunway[i].GetName()+", ";
            }
            else
            {
              if(BadRunway.length!=1)
              {
                badtext += " and "+BadRunway[i].GetName();
              }
              else
              {
                badtext += BadRunway[i].GetName();
              }
            }
          }
          Main.createText(badtext+" had a bad runway.", "Bold");
        }
    
        if(FloppedRunway.length!=0)
        {
          for(let i = 0; i < FloppedRunway.length; i++)
          {
            Main.createImage(FloppedRunway[i].image,"#ff6e6e");
            if(i!=FloppedRunway.length-1)
            {
              floptext += FloppedRunway[i].GetName()+", ";
            }
            else
            {
              if(FloppedRunway.length!=1)
              {
                floptext += " and "+FloppedRunway[i].GetName();
              }
              else
              {
                floptext += FloppedRunway[i].GetName();
              }
            }
          }
          Main.createText(floptext+" flopped the runway.", "Bold");
        }
      }
    }

  class ComedyChallenge{

  constructor(){
    this.hasrunway = true;
    this.winner = false;
    this.plays = [
      " will have to participate in the roast of : "+CurrentSeason.host.name,
      " will have to participate in the roast of previous miss congenialities.",
      " will have to prepare a comedy skit",
      " will have to prepare a stand-up routine, to star into the Rupaul's Shady Shack",
      " will have to participate in the DESPY Awards",
      " will have to prepare a one woman-show",
      " will have to prepare a comedy skit about an embarassing experience",
      " will have to prepare a comedic magic show",
    ];

    this.chosen = getRandomInt(0,this.plays.length-1);

    this.episodename = "";
    switch(this.chosen)
    {
      case 0:
        this.episodename = "The Roast Of "+CurrentSeason.host.name;
        break;
      case 1:
        this.episodename = "The Nice Girls Roast";
        break;
      case 2:
        this.episodename = "Drags Queens Of Comedy";
        break;
      case 3:
        this.episodename = "Stand-Up Smackdown";
        break;
      case 4:
        this.episodename = "The DESPY Awards";
        break;
      case 5:
        this.episodename = "One-Queen Show";
        break;
      case 6:
        this.episodename = "The Charisma, Uniqueness, Nerve and Talent Monologues";
        break;
      case 7:
        this.episodename = "Dragacadabra";
        break;
    }
  }

  createMessage()
  {
    switch(getRandomInt(0,1))
    {
      case 0:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Do y'all like a good joke ?");
        Announcement.createRupaulAnnouncement("Because you are going to need what it is.");
        Announcement.createRupaulAnnouncement("Tonight, Comedy will be the main focus!");
        break;
      case 1:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Do y'all smell that ?");
        Announcement.createRupaulAnnouncement("It smells funny in the air...");
        break;
    }
  }

  createBrief()
  {
    Main.createText("This week, the queens "+this.plays[this.chosen]+".");
  }

  TopPlacement()
  {
    
    let Top = [
    "Tonight, you knew how to get the laugh out of us.",
    "Tonight, we saw how bright you shine.",
    "You have comedy running throught your veins.",
    "Tonight, you showed up and showed out.",
    "Comedy is your thing.",
    "You made us laugh really good.",
    "Tonight, you proved yourself.",
    ];
    return(Top[getRandomInt(0,Top.length-1)]);
  }

  BtmPlacement()
  {
    
    let Btm = [
    ", your comedy could have used a few laugh.",
    ", on the runway, you ran out of gas.",
    ", tonight the judges did not say yes to the dress.",
    ", your outfit had a story. A very confusing one.",
    ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
    ", your outfit made our heads turn, and made us dizzy.",
    ", you need to focus. Or else it's going to cost you.",
    ];
    return(Btm[getRandomInt(0,Btm.length-1)]);
  }

  rankPerfomances()
  {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].GetStandUp();
      }

      CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].perfomancescore<=8)
        {
          SlayedChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
        {
          GreatChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
        {
          GoodChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
        {
          BadChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>32)
        {
          FloppedChallenge.push(CurrentSeason.currentCast[i]);
        }
      }

  }

    createPerformances()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedChallenge.length!=0)
      {
        for(let i = 0; i < SlayedChallenge.length; i++)
        {
          Main.createImage(SlayedChallenge[i].image,"#6eadff");
          if(i!=SlayedChallenge.length-1)
          {
            slayedtext += SlayedChallenge[i].GetName()+", ";
          }
          else
          {
            if(SlayedChallenge.length!=1)
            {
              slayedtext += " and "+SlayedChallenge[i].GetName();
            }
            else
            {
              slayedtext += SlayedChallenge[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the challenge.", "Bold");
      }
  
      if(GreatChallenge.length!=0)
      {
        for(let i = 0; i < GreatChallenge.length; i++)
        {
          Main.createImage(GreatChallenge[i].image,"#6effe4");
          if(i!=GreatChallenge.length-1)
          {
            greattext += GreatChallenge[i].GetName()+", ";
          }
          else
          {
            if(GreatChallenge.length!=1)
            {
              greattext += " and "+GreatChallenge[i].GetName();
            }
            else
            {
              greattext += GreatChallenge[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great performance.", "Bold");
      }
  
      if(GoodChallenge.length!=0)
      {
        for(let i = 0; i < GoodChallenge.length; i++)
        {
          Main.createImage(GoodChallenge[i].image,"#6eff72");
          if(i!=GoodChallenge.length-1)
          {
            goodtext += GoodChallenge[i].GetName()+", ";
          }
          else
          {
            if(GoodChallenge.length!=1)
            {
              goodtext += " and "+GoodChallenge[i].GetName();
            }
            else
            {
              goodtext += GoodChallenge[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good performance.", "Bold");
      }
  
      if(BadChallenge.length!=0)
      {
        for(let i = 0; i < BadChallenge.length; i++)
        {
          Main.createImage(BadChallenge[i].image,"#ffe96e");
          if(i!=BadChallenge.length-1)
          {
            badtext += BadChallenge[i].GetName()+", ";
          }
          else
          {
            if(BadChallenge.length!=1)
            {
              badtext += " and "+BadChallenge[i].GetName();
            }
            else
            {
              badtext += BadChallenge[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad performance.", "Bold");
      }
  
      if(FloppedChallenge.length!=0)
      {
        for(let i = 0; i < FloppedChallenge.length; i++)
        {
          Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
          if(i!=FloppedChallenge.length-1)
          {
            floptext += FloppedChallenge[i].GetName()+", ";
          }
          else
          {
            if(FloppedChallenge.length!=1)
            {
              floptext += " and "+FloppedChallenge[i].GetName();
            }
            else
            {
              floptext += FloppedChallenge[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the challenge.", "Bold");
      }
    }

    rankRunways()
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].getRunway();
        CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
      }

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].runwayscore<=8)
        {
          SlayedRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
        {
          GreatRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
        {
          GoodRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
        {
          BadRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>32)
        {
          FloppedRunway.push(CurrentSeason.currentCast[i]);
        }
      }
    }

    createRunways()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedRunway.length!=0)
      {
        for(let i = 0; i < SlayedRunway.length; i++)
        {
          Main.createImage(SlayedRunway[i].image,"#6eadff");
          if(i!=SlayedRunway.length-1)
          {
            slayedtext += SlayedRunway[i].GetName()+", ";
          }
          else
          {
            if(SlayedRunway.length!=1)
            {
              slayedtext += " and "+SlayedRunway[i].GetName();
            }
            else
            {
              slayedtext += SlayedRunway[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the runway.", "Bold");
      }
  
      if(GreatRunway.length!=0)
      {
        for(let i = 0; i < GreatRunway.length; i++)
        {
          Main.createImage(GreatRunway[i].image,"#6effe4");
          if(i!=GreatRunway.length-1)
          {
            greattext += GreatRunway[i].GetName()+", ";
          }
          else
          {
            if(GreatRunway.length!=1)
            {
              greattext += " and "+GreatRunway[i].GetName();
            }
            else
            {
              greattext += GreatRunway[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great runway.", "Bold");
      }
  
      if(GoodRunway.length!=0)
      {
        for(let i = 0; i < GoodRunway.length; i++)
        {
          Main.createImage(GoodRunway[i].image,"#6eff72");
          if(i!=GoodRunway.length-1)
          {
            goodtext += GoodRunway[i].GetName()+", ";
          }
          else
          {
            if(GoodRunway.length!=1)
            {
              goodtext += " and "+GoodRunway[i].GetName();
            }
            else
            {
              goodtext += GoodRunway[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good runway.", "Bold");
      }
  
      if(BadRunway.length!=0)
      {
        for(let i = 0; i < BadRunway.length; i++)
        {
          Main.createImage(BadRunway[i].image,"#ffe96e");
          if(i!=BadRunway.length-1)
          {
            badtext += BadRunway[i].GetName()+", ";
          }
          else
          {
            if(BadRunway.length!=1)
            {
              badtext += " and "+BadRunway[i].GetName();
            }
            else
            {
              badtext += BadRunway[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad runway.", "Bold");
      }
  
      if(FloppedRunway.length!=0)
      {
        for(let i = 0; i < FloppedRunway.length; i++)
        {
          Main.createImage(FloppedRunway[i].image,"#ff6e6e");
          if(i!=FloppedRunway.length-1)
          {
            floptext += FloppedRunway[i].GetName()+", ";
          }
          else
          {
            if(FloppedRunway.length!=1)
            {
              floptext += " and "+FloppedRunway[i].GetName();
            }
            else
            {
              floptext += FloppedRunway[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the runway.", "Bold");
      }
    }
  }


class FinalChallenge{

  constructor(){
    this.type = CurrentSeason.lastchallenge;
    this.finalecount = CurrentSeason.finaleformat;
    this.hasrunway = true;
    this.T3songsRumix = [
      "To The Moon",
      "Clapback",
      "U Wear It Well",
      "Vieren",
      "Hey Sis, It's Christmas",
      "Queen Of The North",
    ];

    this.T4songsRumix = [
      "Read U Wrote U",
      "Category Is",
      "Kitty Girl",
      "American",
      "Super Queen",
      "A Little Bit Of Love",
      "Lucky",
      "I'm a Winner, Baby",
      "This Is Our Country"
    ];

    this.T5songsRumix = [
      "Catwalk",
      "Living My Life in London",
      "I Made It",
      "Mirror Song",
      "Losing is the New Winning",
      "Queens Everywhere",
      "Top 5 Medley"
    ];

    this.MusicVideo = [
      "Cover Girl",
      "Jealous Of My Boogie",
      "Champion",
      "Glamazon",
      "The Begginning",
      "Sissy That Walk",
      "Born Naked",
      "The Realness",
      "U Wear It Well"
    ];

    this.chosen;

    if( (this.finalecount=="TOP3" || this.finalecount=="TOP3NE") && this.type=="RUMIX")
    {
      this.chosen = this.T3songsRumix[getRandomInt(0,this.T3songsRumix.length-1)];
    }
    else if(this.finalecount=="TOP4" && this.type=="RUMIX")
    {
      this.chosen = this.T4songsRumix[getRandomInt(0,this.T4songsRumix.length-1)];
    }
    else if(this.finalecount=="TOP5" && this.type=="RUMIX")
    {
      this.chosen = this.T5songsRumix[getRandomInt(0,this.T5songsRumix.length-1)];
    }
    else
    {
      this.chosen = this.MusicVideo[getRandomInt(0,this.MusicVideo.length-1)];
    }
  }

  createBrief()
  {
    if(this.type=="RUMIX")
    {
      Main.createText("The queens will have to write their own original verse to the song : "+this.chosen);
    }
    else
    {
      Main.createText("The queens will participate in the music video of \""+this.chosen+"\".");
    }
  }

  rankPerfomances()
  {
    if(this.type=="RUMIX")
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].GetRumix();
      }

      CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].perfomancescore<=8)
        {
          SlayedChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
        {
          GreatChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
        {
          GoodChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
        {
          BadChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>32)
        {
          FloppedChallenge.push(CurrentSeason.currentCast[i]);
        }
      }
    }
    else
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].GetMusicV();
      }

      CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].perfomancescore<=8)
        {
          SlayedChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>6 && CurrentSeason.currentCast[i].perfomancescore<=16)
        {
          GreatChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
        {
          GoodChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
        {
          BadChallenge.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].perfomancescore>32)
        {
          FloppedChallenge.push(CurrentSeason.currentCast[i]);
        }
      }
    }
  }

    createPerformances()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedChallenge.length!=0)
      {
        for(let i = 0; i < SlayedChallenge.length; i++)
        {
          Main.createImage(SlayedChallenge[i].image,"#6eadff");
          if(i!=SlayedChallenge.length-1)
          {
            slayedtext += SlayedChallenge[i].GetName()+", ";
          }
          else
          {
            if(SlayedChallenge.length!=1)
            {
              slayedtext += " and "+SlayedChallenge[i].GetName();
            }
            else
            {
              slayedtext += SlayedChallenge[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the challenge.", "Bold");
      }
  
      if(GreatChallenge.length!=0)
      {
        for(let i = 0; i < GreatChallenge.length; i++)
        {
          Main.createImage(GreatChallenge[i].image,"#6effe4");
          if(i!=GreatChallenge.length-1)
          {
            greattext += GreatChallenge[i].GetName()+", ";
          }
          else
          {
            if(GreatChallenge.length!=1)
            {
              greattext += " and "+GreatChallenge[i].GetName();
            }
            else
            {
              greattext += GreatChallenge[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great performance.", "Bold");
      }
  
      if(GoodChallenge.length!=0)
      {
        for(let i = 0; i < GoodChallenge.length; i++)
        {
          Main.createImage(GoodChallenge[i].image,"#6eff72");
          if(i!=GoodChallenge.length-1)
          {
            goodtext += GoodChallenge[i].GetName()+", ";
          }
          else
          {
            if(GoodChallenge.length!=1)
            {
              goodtext += " and "+GoodChallenge[i].GetName();
            }
            else
            {
              goodtext += GoodChallenge[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good performance.", "Bold");
      }
  
      if(BadChallenge.length!=0)
      {
        for(let i = 0; i < BadChallenge.length; i++)
        {
          Main.createImage(BadChallenge[i].image,"#ffe96e");
          if(i!=BadChallenge.length-1)
          {
            badtext += BadChallenge[i].GetName()+", ";
          }
          else
          {
            if(BadChallenge.length!=1)
            {
              badtext += " and "+BadChallenge[i].GetName();
            }
            else
            {
              badtext += BadChallenge[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad performance.", "Bold");
      }
  
      if(FloppedChallenge.length!=0)
      {
        for(let i = 0; i < FloppedChallenge.length; i++)
        {
          Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
          if(i!=FloppedChallenge.length-1)
          {
            floptext += FloppedChallenge[i].GetName()+", ";
          }
          else
          {
            if(FloppedChallenge.length!=1)
            {
              floptext += " and "+FloppedChallenge[i].GetName();
            }
            else
            {
              floptext += FloppedChallenge[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the challenge.", "Bold");
      }
    }

    rankRunways()
    {
      for(let i = 0; i < CurrentSeason.currentCast.length;i++)
      {
        CurrentSeason.currentCast[i].getRunway();
        CurrentSeason.currentCast[i].finalscore = CurrentSeason.currentCast[i].perfomancescore - CurrentSeason.currentCast[i].runway;
      }

      for(let i = 0; i<CurrentSeason.currentCast.length; i++)
      {
        if(CurrentSeason.currentCast[i].runwayscore<=8)
        {
          SlayedRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>6 && CurrentSeason.currentCast[i].runwayscore<=16)
        {
          GreatRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>16 && CurrentSeason.currentCast[i].runwayscore<=26)
        {
          GoodRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>26 && CurrentSeason.currentCast[i].runwayscore<=32)
        {
          BadRunway.push(CurrentSeason.currentCast[i]);
        }
        else if(CurrentSeason.currentCast[i].runwayscore>32)
        {
          FloppedRunway.push(CurrentSeason.currentCast[i]);
        }
      }
    }

    createRunways()
    {
      let slayedtext = "";
      let greattext = "";
      let goodtext = "";
      let badtext = "";
      let floptext = "";
      
  
      if(SlayedRunway.length!=0)
      {
        for(let i = 0; i < SlayedRunway.length; i++)
        {
          Main.createImage(SlayedRunway[i].image,"#6eadff");
          if(i!=SlayedRunway.length-1)
          {
            slayedtext += SlayedRunway[i].GetName()+", ";
          }
          else
          {
            if(SlayedRunway.length!=1)
            {
              slayedtext += " and "+SlayedRunway[i].GetName();
            }
            else
            {
              slayedtext += SlayedRunway[i].GetName();
            }
          }
        }
        Main.createText(slayedtext+" slayed the runway.", "Bold");
      }
  
      if(GreatRunway.length!=0)
      {
        for(let i = 0; i < GreatRunway.length; i++)
        {
          Main.createImage(GreatRunway[i].image,"#6effe4");
          if(i!=GreatRunway.length-1)
          {
            greattext += GreatRunway[i].GetName()+", ";
          }
          else
          {
            if(GreatRunway.length!=1)
            {
              greattext += " and "+GreatRunway[i].GetName();
            }
            else
            {
              greattext += GreatRunway[i].GetName();
            }
          }
        }
        Main.createText(greattext+" had a great runway.", "Bold");
      }
  
      if(GoodRunway.length!=0)
      {
        for(let i = 0; i < GoodRunway.length; i++)
        {
          Main.createImage(GoodRunway[i].image,"#6eff72");
          if(i!=GoodRunway.length-1)
          {
            goodtext += GoodRunway[i].GetName()+", ";
          }
          else
          {
            if(GoodRunway.length!=1)
            {
              goodtext += " and "+GoodRunway[i].GetName();
            }
            else
            {
              goodtext += GoodRunway[i].GetName();
            }
          }
        }
        Main.createText(goodtext+" had a good runway.", "Bold");
      }
  
      if(BadRunway.length!=0)
      {
        for(let i = 0; i < BadRunway.length; i++)
        {
          Main.createImage(BadRunway[i].image,"#ffe96e");
          if(i!=BadRunway.length-1)
          {
            badtext += BadRunway[i].GetName()+", ";
          }
          else
          {
            if(BadRunway.length!=1)
            {
              badtext += " and "+BadRunway[i].GetName();
            }
            else
            {
              badtext += BadRunway[i].GetName();
            }
          }
        }
        Main.createText(badtext+" had a bad runway.", "Bold");
      }
  
      if(FloppedRunway.length!=0)
      {
        for(let i = 0; i < FloppedRunway.length; i++)
        {
          Main.createImage(FloppedRunway[i].image,"#ff6e6e");
          if(i!=FloppedRunway.length-1)
          {
            floptext += FloppedRunway[i].GetName()+", ";
          }
          else
          {
            if(FloppedRunway.length!=1)
            {
              floptext += " and "+FloppedRunway[i].GetName();
            }
            else
            {
              floptext += FloppedRunway[i].GetName();
            }
          }
        }
        Main.createText(floptext+" flopped the runway.", "Bold");
      }
    }
  }

class DesignChallenge{
  constructor()
  {
    this.hasrunway = false;
    this.winner = false;

    this.brief = [
      "The queens will have to make outfits with summer items.",
      "The queens will have to make outfits with boxes from past contestants.",
      "The queens will have to make outfits with random Christmas decorations.",
      "The queens will have to make outfits with backyard items.",
      "The queens will have to make outfits with random items contained in boxes.",
      "The queens will have to make outfits with random items contained in boxes of color."
    ];

    this.episodename = [
      "Queens of summers",
      "An Impression Of Déjà-Vu",
      "Christmas Queens",
      "Chilling In The Backyards",
      "Glamazonian Prime",
      "Taste The Rainbow"
    ];

    this.chosen = getRandomInt(0,this.brief.length-1);
    this.boxes = [1, 4, 5];
  }
  createMessage()
  {
    switch(getRandomInt(0,1))
    {
      case 0:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Have you ever used a sewing a machine ?");
        Announcement.createRupaulAnnouncement("Well if you didn't, now is the time to learn!");
        Announcement.createRupaulAnnouncement("Will you learn fast enough, to not get distanced by the other queens ? Let's find out!");
        break;
      case 1:
        Announcement.createRupaulAnnouncement("Hello queens!");
        Announcement.createRupaulAnnouncement("Design is a very important part of drag!");
        Announcement.createRupaulAnnouncement("Because it's what makes us, well, us!");
        Announcement.createRupaulAnnouncement("Will you design your win, or craft your exit. Whatever may be, remember to have fun!");
        break;
    }
  }

  TopPlacement()
  {
    
    let Top = [
    "Tonight, you knew how to work it OUT!",
    "Tonight, you shined all over this runway.",
    "You ruled over this runway.",
    "You made gold out of randomness.",
    "Your haute couture, made you rise to the top.",
    "You have creativity beyond limits.",
    "Tonight, you have made yourself stunning.",
    "Your couture made us gag.",
    "The cream always rises to the top.",
    "You have a great perception of design.",
    "Your outfit kept us begging for more."
    ];
    return(Top[getRandomInt(0,Top.length-1)]);
  }

  BtmPlacement()
  {
    
    let Btm = [
    ", you came here to slay, but tonight your outfit slayed you.",
    ", on the runway, you ran out of gas.",
    ", tonight the judges did not say yes to the dress.",
    ", your outfit had a story. A very confusing one.",
    ", simplicity is sometimes the way to go. Unfortunately, not tonight.",
    ", your outfit made our heads turn, and made us dizzy.",
    ", you need to focus. Or else it's going to cost you.",
    ];
    return(Btm[getRandomInt(0,Btm.length-1)]);
  }

  rankPerfomances()
  {
    for(let i = 0; i < CurrentSeason.currentCast.length;i++)
    {
      if(CurrentSeason.currentCast[i].miniwinner == true && this.boxes.indexOf(this.chosen) == -1)
      {
        CurrentSeason.currentCast[i].GetDesignScore(5);
      }
      else
      {
        CurrentSeason.currentCast[i].GetDesignScore();
      }
    }

    CurrentSeason.currentCast.sort((a, b) => a.perfomancescore - b.perfomancescore);

    for(let i = 0; i<CurrentSeason.currentCast.length; i++)
    {
      if(CurrentSeason.currentCast[i].perfomancescore<=8)
      {
        SlayedChallenge.push(CurrentSeason.currentCast[i]);
      }
      else if(CurrentSeason.currentCast[i].perfomancescore>8 && CurrentSeason.currentCast[i].perfomancescore<=16)
      {
        GreatChallenge.push(CurrentSeason.currentCast[i]);
      }
      else if(CurrentSeason.currentCast[i].perfomancescore>16 && CurrentSeason.currentCast[i].perfomancescore<=26)
      {
        GoodChallenge.push(CurrentSeason.currentCast[i]);
      }
      else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=32)
      {
        BadChallenge.push(CurrentSeason.currentCast[i]);
      }
      else if(CurrentSeason.currentCast[i].perfomancescore>32)
      {
        FloppedChallenge.push(CurrentSeason.currentCast[i]);
      }
    }
  }

  createBrief()
  {
    Main.createText(this.brief[this.chosen]);
  }

  createPerformances()
  {
    let slayedtext = "";
    let greattext = "";
    let goodtext = "";
    let badtext = "";
    let floptext = "";
    

    if(SlayedChallenge.length!=0)
    {
      for(let i = 0; i < SlayedChallenge.length; i++)
      {
        Main.createImage(SlayedChallenge[i].image,"#6eadff");
        if(i!=SlayedChallenge.length-1)
        {
          slayedtext += SlayedChallenge[i].GetName()+", ";
        }
        else
        {
          if(SlayedChallenge.length!=1)
          {
            slayedtext += " and "+SlayedChallenge[i].GetName();
          }
          else
          {
            slayedtext += SlayedChallenge[i].GetName();
          }
        }
      }
      Main.createText(slayedtext+" slayed the challenge.", "Bold");
    }

    if(GreatChallenge.length!=0)
    {
      for(let i = 0; i < GreatChallenge.length; i++)
      {
        Main.createImage(GreatChallenge[i].image,"#6effe4");
        if(i!=GreatChallenge.length-1)
        {
          greattext += GreatChallenge[i].GetName()+", ";
        }
        else
        {
          if(GreatChallenge.length!=1)
          {
            greattext += " and "+GreatChallenge[i].GetName();
          }
          else
          {
            greattext += GreatChallenge[i].GetName();
          }
        }
      }
      Main.createText(greattext+" had a great performance.", "Bold");
    }

    if(GoodChallenge.length!=0)
    {
      for(let i = 0; i < GoodChallenge.length; i++)
      {
        Main.createImage(GoodChallenge[i].image,"#6eff72");
        if(i!=GoodChallenge.length-1)
        {
          goodtext += GoodChallenge[i].GetName()+", ";
        }
        else
        {
          if(GoodChallenge.length!=1)
          {
            goodtext += " and "+GoodChallenge[i].GetName();
          }
          else
          {
            goodtext += GoodChallenge[i].GetName();
          }
        }
      }
      Main.createText(goodtext+" had a good performance.", "Bold");
    }

    if(BadChallenge.length!=0)
    {
      for(let i = 0; i < BadChallenge.length; i++)
      {
        Main.createImage(BadChallenge[i].image,"#ffe96e");
        if(i!=BadChallenge.length-1)
        {
          badtext += BadChallenge[i].GetName()+", ";
        }
        else
        {
          if(BadChallenge.length!=1)
          {
            badtext += " and "+BadChallenge[i].GetName();
          }
          else
          {
            badtext += BadChallenge[i].GetName();
          }
        }
      }
      Main.createText(badtext+" had a bad performance.", "Bold");
    }

    if(FloppedChallenge.length!=0)
    {
      for(let i = 0; i < FloppedChallenge.length; i++)
      {
        Main.createImage(FloppedChallenge[i].image,"#ff6e6e");
        if(i!=FloppedChallenge.length-1)
        {
          floptext += FloppedChallenge[i].GetName()+", ";
        }
        else
        {
          if(FloppedChallenge.length!=1)
          {
            floptext += " and "+FloppedChallenge[i].GetName();
          }
          else
          {
            floptext += FloppedChallenge[i].GetName();
          }
        }
      }
      Main.createText(floptext+" flopped the challenge.", "Bold");
    }
  }
}

class SnatchGameCharacter
{
  constructor(Name, PlayedBy, Quality, Factors, Difficulty)
  {
    this.name = Name;
    this.playedby = undefined;
    this.quality = Quality;
    this.Factors = Factors;
    this.difficulty = Difficulty;
  }
}
//#endregion

//#region Queens
let akashia = new Queen("Akashia", 6, 6, 7, 7, 5, 10, 15, 8, 10, 4, 1, "Akashia", "Akashia", "US1", false);
let bebes1 = new Queen("BeBe Zahara Benet", 7, 12, 11, 12, 7, 12, 11, 8, 8, 3, 1, "Bebe", "Bebe", "US1", false);
let jades = new Queen("Jade Sotomayor", 7, 8, 7, 10, 9, 8, 13, 8, 12, 2, 2, "Jade", "Jade", "US1", false);
let ninas1 = new Queen("Nina Flowers", 8, 10, 11, 7, 12, 14, 8, 15, 10, 4, 1, "Nina", "Nina", "US1", false);
let onginas1 = new Queen("Ongina", 12, 10, 11, 10, 12, 8, 6, 15, 13, 5, 0, "Ongina", "Ongina", "US1", false);
let rebecca = new Queen("Rebecca Glasscock", 8, 12, 9, 11, 5, 8, 8, 7, 10, 2, 3, "Rebecca", "Rebecca", "US1", false);
let shannels1 = new Queen("Shannel", 8, 9, 7, 11, 10, 12, 8, 10, 15, 2, 2, "Shannel", "Shannel", "US1", false);
let tammies1 = new Queen("Tammie Brown", 8, 9, 14, 5, 6, 8, 6, 14, 15, 4, 0, "TammieBrown", "Tammie", "US1", false);
let victoriap = new Queen("Victoria Porkchop Parker", 8, 9, 10, 7, 4, 8, 6, 10, 12, 4, 1, "Victoria", "Victoria", "US1", false);

let US1 = [akashia, bebes1, jades, ninas1, onginas1, rebecca, shannels1, tammies1, victoriap];

let jessicaw = new Queen("Jessica Wild", 10, 11, 7, 12, 9, 10, 5, 6, 12, 5, 0, "Jessica", "Jessica", "US2", false);
let jujus2 = new Queen("Jujubee", 8, 9, 12, 8, 7, 6, 15, 10, 13, 3, 1, "Jujubee", "Jujubee", "US2", false);
let morganmcs2 = new Queen("Morgan McMicheals", 8, 7, 6, 10, 13, 10, 11, 8, 14, 2, 4, "Morgan","Morgan","US2",false);
let mystique = new Queen("Mystique Summers Madison", 6, 8, 9, 11, 7, 5, 10, 8, 14, 2, 2, "Mystique", "Mystique", "US2", false);
let npb = new Queen("Nicole Paige Brooks", 7, 6, 8, 4, 8, 10, 7, 5, 5, 4, 0, "Nicole", "Nicole", "US2", false);
let pandoras2 = new Queen("Pandora Boxx", 8, 9 ,12, 7, 5, 5, 6, 7, 10, 4, 1, "Pandora", "Pandora", "US2",false);
let sahara = new Queen("Sahara Davenport", 8, 6, 8, 14, 5, 8, 14, 10, 9, 5, 0, "Sahara", "Sahara", "US2", false);
let shangela = new Queen("Shangela", 8, 6, 8, 7, 2, 5, 5, 10, 12, 2, 2, "Shangela", "Shangela", "US2", false);
let kylies2 = new Queen("Sonique", 8, 7, 5, 8, 10, 10, 13, 8, 10, 4, 0, "Sonique", "Sonique", "US2", false);
let tatis2 = new Queen("Tatianna", 8, 10, 12, 8, 5, 8, 9, 5, 14, 3, 3, "Tatianna", "Tatianna", "US2", false);
let james = new Queen("James Ross", 14, 10, 12, 6, 12, 10, 14, 12, 8, 1, 4, "James", "James", "US2", false);

let US2 = [jessicaw, jujus2, morganmcs2, mystique, npb, pandoras2, sahara, shangela, kylies2, tatis2, james];

let anastarzia = new Queen("Anastarzia Anaquway", 7, 6, 8, 7, 9, 8, 6, 8, 10, 5, 0, "Anastarzia", "Anastarzia", "CA1", false);
let boa = new Queen("BOA", 7, 9, 9, 7, 6, 5, 5, 9, 12, 3, 0, "BOA", "Boa", "CA1", false);
let ilona = new Queen("Ilona Verley", 6, 7, 9, 7, 9, 8, 11, 8, 8, 2, 4, "Ilona", "Ilona","CA1",false);
let jimbo = new Queen("Jimbo", 12, 10, 14, 4, 8, 7, 3, 9, 12, 2, 4, "Jimbo", "Jimbo", "CA1", false);
let juice = new Queen("Juice Boxx", 7, 6, 7, 6, 5, 9, 6, 7, 10, 4, 1, "Juice", "Juice", "CA1", false);
let kiara = new Queen("Kiara",8, 9, 6, 7, 10, 8, 7, 5, 6, 3, 0, "Kiara", "Kiara", "CA1", false);
let kyne = new Queen("Kyne", 7, 8, 6, 8, 7, 6, 6, 10, 12, 2, 5, "Kyne", "Kyne", "CA1", false);
let lemon = new Queen("Lemon", 11, 9, 8, 10, 6, 13, 12, 8, 10, 3, 3, "Lemon","Lemon","CA1",false);
let priyanka = new Queen("Priyanka", 8, 12, 13, 10, 6, 8, 15, 13, 12, 4, 2, "Priyanka", "Priyanka", "CA1", false);
let rita = new Queen("Rita Baga", 8, 10, 12, 6, 10, 8, 12, 8, 10, 4, 1, "Rita", "Rita", "CA1", false);
let scarlettbobo = new Queen("Scarlett BoBo", 12, 10, 8, 8, 10, 11, 13, 12, 10, 4, 1, "ScarlettBoBo", "ScarlettBoBo", "CA1", false);
let tynomi = new Queen("Tynomi Banks", 6, 7, 9, 12, 8, 8, 13, 12, 10, 4, 2, "Tynomi", "Tynomi", "CA1", false);

let CA1 = [anastarzia,boa,ilona,jimbo,juice,kiara,kyne,lemon,priyanka,rita,scarlettbobo,tynomi];

let brookehost = new Host("Brooke Lynn Hytes", "BrookeIn", "BrookeOut");

let marina = new Queen("Marina", 9, 8, 11, 10, 6, 8, 15, 8, 10, 3, 1, "Marina", "Marina", "ES2", false);
let estrella = new Queen("Estrella Extravanganza", 11, 10, 12, 9, 5, 6, 8, 8, 10, 3, 2, "Estrella", "Estrella", "ES2", false);
let venedita = new Queen("Venedita Von Däsh", 9, 13, 10, 8, 8, 12, 10, 8, 8, 2, 0, "Venedita", "Venedita", "ES2", false);
let juriji = new Queen("Juriji Der Klee", 12, 7, 7, 9, 10, 10, 9, 12, 15, 2, 2, "Juriji", "Juriji", "ES2", false);
let sethlas = new Queen("Drag Sethlas", 8, 9, 7, 8, 12, 10, 8, 12, 10, 3, 2, "Sethlas", "Sethlas", "ES2", false);
let diamante = new Queen("Diamante Merybrown", 7, 6, 6, 10, 6, 8, 9, 8, 9, 2, 0, "Diamante", "Diamante", "ES2",false);
let onyx = new Queen("Onyx", 8, 8, 7, 6, 12, 14, 8, 12, 10, 2, 0, "Onyx", "Onyx", "ES2", false);
let jota = new Queen("Jota Carajota", 7, 6, 8, 6, 9, 6, 8, 8, 14, 2, 4, "Jota", "Jota", "ES2", false);
let samantha = new Queen("Samantha Ballentines", 6, 7, 6, 7, 7, 5, 12, 10, 8, 3, 0, "Samantha", "Samantha", "ES2", false);
let arielr = new Queen("Ariel Rec", 7, 9, 7, 6, 8, 10, 7, 10, 8, 2, 0, "ArielR", "ArielR", "ES2", false);
let marisa = new Queen("Marisa Prisa", 7, 8, 6, 7, 7, 5, 7, 6, 5, 3, 1, "Marisa", "Marisa", "ES2", false);

let supremmehost = new Host("Supremme De Luxe","SupremmeIn","SupremmeOut");

let ES2 = [marina, estrella, venedita, juriji, sethlas, diamante, onyx, jota, samantha, arielr, marisa];
//#endregion


//#region Commands

function WhoGetsCritiques()
{
  let Main = new Screen();
  Main.clean();
  let firstnames = "";
  let critiquedtext = "";
  if(Safes.length!=0)
  {
    if(Steps == 0)
    {
      Main.createBigText("On the main stage...");
      Main.createText("If I call your names, please step forward.","Bold");
      CritiquesChoice = getRandomInt(0,1);
      if(CritiquesChoice == 0)
      {
        for(let i = 0; i < Safes.length; i++)
        {
          Main.createImage(Safes[i].image, "#7971c7");
          if(i!=Safes.length-1)
            {
              firstnames += Safes[i].GetName()+", ";
            }
            else
            {
              if(Safes.length!=1)
              {
                firstnames += " and "+Safes[i].GetName();
              }
              else
              {
                firstnames += Safes[i].GetName();
              }
            }
        }
        Main.createText(firstnames+".","Bold");
      }
      else
      {
        for(let i = 0; i < Critiqued.length; i++)
        {
          Main.createImage(Critiqued[i].image, "#7971c7");
          if(i!=Critiqued.length-1)
            {
              critiquedtext += Critiqued[i].GetName()+", ";
            }
            else
            {
              if(Critiqued.length!=1)
              {
                critiquedtext += " and "+Critiqued[i].GetName();
              }
              else
              {
                critiquedtext += Critiqued[i].GetName();
              }
            }
        }
        Main.createText(critiquedtext+".","Bold");

      }
      Main.createButton("Proceed", "WhoGetsCritiques()");
    }
    if(Steps == 1)
    {
      Main.clean();
      Main.createBigText("On the main stage...");
      Main.createText("If I call your names, please step forward.","Bold");
      firstnames = "";
      critiquedtext = "";
      if(CritiquesChoice == 0)
      {
        for(let i = 0; i < Safes.length; i++)
        {
          Main.createImage(Safes[i].image, "#7971c7");
          if(i!=Safes.length-1)
            {
              firstnames += Safes[i].GetName()+", ";
            }
            else
            {
              if(Safes.length!=1)
              {
                firstnames += " and "+Safes[i].GetName();
              }
              else
              {
                firstnames += Safes[i].GetName();
              }
            }
        }
        Main.createText(firstnames+" you are all safe. You may go untuck backstage.","Bold");

        Main.createLine();
        for(let i = 0; i < Critiqued.length; i++)
        {
          Main.createImage(Critiqued[i].image, "#83ebe5");
          if(i!=Critiqued.length-1)
            {
              critiquedtext += Critiqued[i].GetName()+", ";
            }
            else
            {
              if(Critiqued.length!=1)
              {
                critiquedtext += " and "+Critiqued[i].GetName();
              }
              else
              {
                critiquedtext += Critiqued[i].GetName();
              }
            }
        }
        Main.createText(critiquedtext+", you are the tops and bottoms of the week.","Bold");
      }
      else
      {
        for(let i = 0; i < Critiqued.length; i++)
        {
          Main.createImage(Critiqued[i].image, "#83ebe5");
          if(i!=Critiqued.length-1)
            {
              critiquedtext += Critiqued[i].GetName()+", ";
            }
            else
            {
              if(Critiqued.length!=1)
              {
                critiquedtext += " and "+Critiqued[i].GetName();
              }
              else
              {
                critiquedtext += Critiqued[i].GetName();
              }
            }
        }
        Main.createText(critiquedtext+", you are the tops and bottoms of the week.","Bold");
        Main.createLine();
        for(let i = 0; i < Safes.length; i++)
        {
          Main.createImage(Safes[i].image, "#7971c7");
          if(i!=Safes.length-1)
            {
              firstnames += Safes[i].GetName()+", ";
            }
            else
            {
              if(Safes.length!=1)
              {
                firstnames += " and "+Safes[i].GetName();
              }
              else
              {
                firstnames += Safes[i].GetName();
              }
            }
        }
        Main.createText(firstnames+" you are all safe. You may go untuck backstage.","Bold");
      }
      Main.createButton("Proceed", "UntuckedPart1()");
    }
    if(Steps == 0)
    {
      Steps++;
    }
    else
    {
      Steps = 0;
    }
  }
  else
  {
    for(let i = 0; i < Critiqued.length; i++)
        {
          Main.createImage(Critiqued[i].image, "#83ebe5");
          if(i!=Critiqued.length-1)
            {
              critiquedtext += Critiqued[i].GetName()+", ";
            }
            else
            {
              if(Critiqued.length!=1)
              {
                critiquedtext += " and "+Critiqued[i].GetName();
              }
              else
              {
                critiquedtext += Critiqued[i].GetName();
              }
            }
        }
        Main.createText(critiquedtext+", it is time for your critiques.","Bold");
        Main.createButton("Proceed", "UntuckedPart1()");
  }
}

function UntuckedPart1() {
  Main = new Screen();
  Main.clean();
  Main.createButton("Proceed", "Critiques()");
}

function Critiques() {
  Main = new Screen();
  Main.clean();
  Main.createButton("Proceed", "UntuckedPart2()");
}

function UntuckedPart2() {
  Main = new Screen();
  Main.clean();
  if(CurrentSeason.currentCast.length == 3 && (CurrentSeason.finaleformat == "TOP3" || CurrentSeason.finaleformat == "TOP3NE"))
  {
    CurrentSeason.currentCast[0].favoritism += 5;
    CurrentSeason.currentCast[2].favoritism += -5;
    Main.createButton("Proceed", "Finale()");
  }
  else
  {
    Main.createButton("Proceed", "Placements()");
  }
}

function Finale()
{
  Main = new Screen();
  Main.clean();
  if(CurrentSeason.finaleformat=="TOP3" || CurrentSeason.finaleformat=="TOP3NE")
  {
    switch(Steps){
      case 0:
        for (let q = 0; q < CurrentSeason.eliminatedCast.length; q++) {
          CurrentSeason.eliminatedCast[q].trackrecord.push('');
        }
        Main.createBigText("Welcome to the finale!");
          for (let i = 0; i < CurrentSeason.currentCast.length; i++) {
            Main.createImage(CurrentSeason.currentCast[i].image,"#f0bb86");
          }
          Main.createText(CurrentSeason.currentCast[0].GetName() + ", "+CurrentSeason.currentCast[1].GetName()+ " and "+CurrentSeason.currentCast[0].GetName()+".", "Bold");
          Main.createText("You are all have made it here, by proving your charisma, uniqueness, nerve and talent.");
          Main.createText("Unfornately, for one of you the roads ends here.");
          CurrentSeason.currentCast.sort((a, b) => a.favoritism - b.favoritism);
          Steps++;
          break;

      case 1:
          Main.createImage(CurrentSeason.currentCast[0].image,"#f0bb86");
          Main.createText(CurrentSeason.currentCast[0].GetName()+", I am sorry my dear, but you will...");
          Steps++;
          break;

        case 2:
          

          if(CurrentSeason.currentCast[0].favoritism>=10)
          {
            Main.createBigText("I'm NOT sorry!");
            Main.createImage(CurrentSeason.currentCast[0].image,"##e0e0e0");
            Main.createText(CurrentSeason.currentCast[0].GetName()+", I am sorry my dear, but you will be able to lipsync for the crown as well!");
            CurrentSeason.currentCast[0].trackrecord.push("TOP 3");
            CurrentSeason.currentCast[1].trackrecord.push("TOP 3");
            CurrentSeason.currentCast[2].trackrecord.push("TOP 3");
          }
          else
          {
            Main.createBigText("I'm sorry...");
            Main.createImage(CurrentSeason.currentCast[0].image,"#fa2525");
            Main.createText(CurrentSeason.currentCast[0].GetName()+", I am sorry my dear, but you will not be able to lipsync for the crown.");
            Main.createText(CurrentSeason.currentCast[0].GetName()+", now sashay away.");
            CurrentSeason.currentCast[0].trackrecord.push("ELIMINATED");
            CurrentSeason.currentCast[0].placement = 3;
            CurrentSeason.eliminatedCast.unshift(CurrentSeason.currentCast[0]);
            CurrentSeason.currentCast.splice(0,1);

            CurrentSeason.currentCast[0].trackrecord.push("TOP 2");
            CurrentSeason.currentCast[1].trackrecord.push("TOP 2");
          }
          Steps++;
          break;
          
        case 3:
          for (let q = 0; q < CurrentSeason.eliminatedCast.length; q++) {
            CurrentSeason.eliminatedCast[q].trackrecord.push('GUEST');
          }
          Main.createBigText("Good luck ladies!");
          for (let i = 0; i < CurrentSeason.currentCast.length; i++) {
            Main.createImage(CurrentSeason.currentCast[i].image,"#f0bb86");
          }
          if(CurrentSeason.currentCast.length==3)
          {
            Main.createText(CurrentSeason.currentCast[0].GetName() + ", "+CurrentSeason.currentCast[1].GetName()+ " and "+CurrentSeason.currentCast[0].GetName()+".", "Bold");
            Main.createText("The time has come for you to lipsync FOR THE CROWN!", "Bold");
            Main.createText("You will have to show me, that you are worthy of the crown, by lipsyncing to the song : Random Song lmao <3.", "Bold");
            Main.createText("Good luck and do not FUCK IT UP!", "Bold");
          }
          else
          {
            Main.createText(CurrentSeason.currentCast[0].GetName() + "and "+CurrentSeason.currentCast[1].GetName()+".", "Bold");
            Main.createText("The time has come for you to lipsync FOR THE CROWN!", "Bold");
            Main.createText("You will have to show me, that you are worthy of the crown, by lipsyncing to the song : Random Song lmao <3.", "Bold");
            Main.createText("Good luck and do not FUCK IT UP!", "Bold");
          }
          Steps++;
          break;
        case 4:
          Main.createBigText("Good luck ladies!");
          for (let i = 0; i < CurrentSeason.currentCast.length; i++) {
            CurrentSeason.currentCast[i].getFinalScore();
            Main.createImage(CurrentSeason.currentCast[i].image,"#f0bb86");
          }

          CurrentSeason.currentCast.sort((a, b) => b.finalescore - a.finalescore);
          if(CurrentSeason.currentCast.length==3)
          {
            Main.createText(CurrentSeason.currentCast[0].GetName() + ", "+CurrentSeason.currentCast[1].GetName()+ " and "+CurrentSeason.currentCast[0].GetName()+".", "Bold");
            Main.createText("Thanks for your performances.", "Bold");
            Main.createText("The winner of "+CurrentSeason.seasonname+", will receive 100 000$. Now with that said.", "Bold");
            Main.createText("The winner of "+CurrentSeason.seasonname+" is ...", "Bold");
          }
          else
          {
            Main.createText(CurrentSeason.currentCast[0].GetName() + " and "+CurrentSeason.currentCast[1].GetName()+".", "Bold");
            Main.createText("Thanks for your performances.", "Bold");
            Main.createText("The winner of "+CurrentSeason.seasonname+", will receive 100 000$. Now with that said.", "Bold");
            Main.createText("The winner of "+CurrentSeason.seasonname+" is ...", "Bold");
          }
          Steps++;
          break;
        case 5:
          CurrentEpisode = new Episode("The Grand Finale", "Finale");
          CurrentSeason.episodes.push(CurrentEpisode);
          done = true;
          
          if(CurrentSeason.currentCast[0].finalescore > 30 && CurrentSeason.currentCast[1].finalescore > 30)
          {
            Main.createImage(CurrentSeason.currentCast[0].image,"#ffb300");
            Main.createImage(CurrentSeason.currentCast[1].image,"#ffb300");
            Main.createText(CurrentSeason.currentCast[0].GetName() + " and "+CurrentSeason.currentCast[1].GetName()+", CONDRAGULATIONS!", "Bold");
            Main.createText("You are both winners!","Bold");
            CurrentSeason.currentCast[0].trackrecord.push("WINNER");
            CurrentSeason.currentCast[0].placement = 1;
            CurrentSeason.currentCast[1].trackrecord.push("WINNER");
            CurrentSeason.currentCast[1].placement = 1;
            if(CurrentSeason.currentCast.length==3)
            {
              CurrentSeason.currentCast[2].placement = 3;
              CurrentSeason.currentCast[2].trackrecord.push('RUNNER UP');
              CurrentSeason.currentCast.splice(2,1);
            }
          }
          else
          {
            Main.createImage(CurrentSeason.currentCast[0].image,"#ffb300");
            Main.createText(CurrentSeason.currentCast[0].GetName()+", CONDRAGULATIONS!","Bold");
            Main.createText("You are the winner of "+CurrentSeason.seasonname+"!","Bold");
            CurrentSeason.currentCast[0].trackrecord.push("WINNER");
            CurrentSeason.currentCast[0].placement = 1;
            CurrentSeason.currentCast[1].placement = 2;
            CurrentSeason.currentCast[1].trackrecord.push('RUNNER UP');
            CurrentSeason.eliminatedCast.unshift(CurrentSeason.currentCast[1]);
            CurrentSeason.currentCast.splice(1,1);
            if(CurrentSeason.currentCast.length==3)
            {
              CurrentSeason.eliminatedCast.unshift(CurrentSeason.currentCast[2]);
              CurrentSeason.currentCast[2].placement = 2;
              CurrentSeason.currentCast[2].trackrecord.push('RUNNER UP');
              CurrentSeason.currentCast.splice(1,1);
            }
          }
          Steps++;
          break;
      }
  }
  if(Steps==6)
  {
    Main.createButton("Proceed", "GetPromoTable()");
    Steps = 0;
  }
  else
  {
    Main.createButton("Proceed", "Finale()");
  }
}

function Placements() {

  Tops.sort((a, b) => a.finalscore - b.finalscore);
  Bottoms.sort((a, b) => b.finalscore - a.finalscore);

  Main = new Screen();
  Main.clean();
  let hightext = "";

  let doublewin = false;
  let firstwinner = false;

  let threewayls = false;
  if( (Bottoms[0] != undefined && Bottoms[1] != undefined && Bottoms[2] != undefined ) && Bottoms[0].perfomancescore > 40 && Bottoms[1].perfomancescore > 40  && Bottoms[2].perfomancescore > 40 && CurrentSeason.currentCast.length >=6)
  {
    threewayls = true;
  }

  if(TopsQueens.length==0)
  {
    TopsQueens.push(Tops[0]);
    TopsQueens.push(Tops[1]);
  }

  if(BottomQueens.length==0)
  {
    if(threewayls==false)
    {
      BottomQueens.push(Bottoms[0]);
      BottomQueens.push(Bottoms[1]);
    }
    else
    {
      BottomQueens.push(Bottoms[0]);
      BottomQueens.push(Bottoms[1]);
      BottomQueens.push(Bottoms[2]);
    }
  }

  if(Tops.length!=0 || Bottoms.length!=0)
  {
    if(Tops.length!=0)
    {
      if(TopsQueens[0].perfomancescore < 7 && TopsQueens[1].perfomancescore < 7)
      {
        doublewin = true;
      }
      if(Steps == 0)
      {
        randomtop = getRandomInt(0,Tops.length-1);
        Main.createImage(Tops[randomtop].image,"#17d4ff");
        Main.createText(Tops[randomtop].GetName()+". "+CurrentChallenge.TopPlacement());
      }
      else
      {
          if(TopsQueens.indexOf(Tops[randomtop]) != -1)
          {
              if(Tops[randomtop].GetName() == TopsQueens[0].GetName() && CurrentChallenge.winner == false)
              {
                Main.createImage(Tops[randomtop].image,"#1741ff");
                Main.createText(Tops[randomtop].GetName()+", CONDRAGULATIONS! You're the winner of this week main challenge.","Bold");
                if(doublewin==false)
                {
                  Tops[randomtop].trackrecord.push("WIN");
                  Tops[randomtop].favoritism += 5;
                }
                else
                {
                  Tops[randomtop].trackrecord.push("WIN");
                  Tops[randomtop].favoritism += 5;
                }
                CurrentChallenge.winner = true;
              }
              else
              {
                if(CurrentChallenge.winner == true && doublewin == false)
                {
                  Main.createImage(Tops[randomtop].image,"#17d4ff");
                  Main.createText(Tops[randomtop].GetName()+", great job this week. You are safe.","");
                  Tops[randomtop].trackrecord.push("HIGH");
                  Tops[randomtop].favoritism += 1;
                }
                else if(CurrentChallenge.winner == true && doublewin == true)
                {
                  Main.createImage(Tops[randomtop].image,"#1741ff");
                  Main.createText(Tops[randomtop].GetName()+", CONDRAGULATIONS! You're the other winner of this week main challenge.","Bold");
                  Tops[randomtop].trackrecord.push("WIN");
                  Tops[randomtop].favoritism += 5;
                }
                else
                {
                  Main.createImage(Tops[randomtop].image,"#17d4ff");
                  Main.createText(Tops[randomtop].GetName()+", great job this week. You are safe.","");
                  Tops[randomtop].trackrecord.push("HIGH");
                  Tops[randomtop].favoritism += 1;
                }
              }
              Tops.splice(randomtop,1);
          }
          else
          {
            Main.createImage(Tops[randomtop].image,"#17d4ff");
            Main.createText(Tops[randomtop].GetName()+", great job this week. You are safe.","");
            Tops[randomtop].trackrecord.push("HIGH");
            Tops[randomtop].favoritism += 1;
            Tops.splice(randomtop,1);
          }
        }
      }
      else
      {
        if(Steps == 0)
        {
          randombtm = getRandomInt(0,Bottoms.length-1);
          Main.createImage(Bottoms[randombtm].image,"#ff8a8a");
          Main.createText(Bottoms[randombtm].GetName()+CurrentChallenge.BtmPlacement());
        }
        else
        {
          if(BottomQueens.indexOf(Bottoms[randombtm]) != -1)
          {
            Main.createImage(Bottoms[randombtm].image,"#fa2525");
            Main.createText(Bottoms[randombtm].GetName()+", I'm sorry my dear but you are up for elimination.","Bold");
            Bottoms.splice(randombtm,1);
          }
          else
          {
            Main.createImage(Bottoms[randombtm].image,"#ff8a8a");
            Main.createText(Bottoms[randombtm].GetName()+", you are safe.");
            Bottoms[randombtm].trackrecord.push("LOW");
            Bottoms[randombtm].favoritism += -1;
            Bottoms.splice(randombtm,1);
          }
        }
      }

      if(Steps == 0)
      {
        Steps++;
      }
      else
      {
        Steps = 0;
      }
    }
    
  if(Tops.length == 0 && Bottoms.length == 0)
  {
    Main.createButton("Proceed", "Lipsync()");
  }
  else
  {
    Main.createButton("Proceed", "Placements()");
  }

}
  

function Lipsync() {
  Main = new Screen();
  Main.clean();
    

  switch(Steps){
    case 0:
      Main.createBigText("The time has come...");
      for(let i = 0; i < BottomQueens.length; i++)
      {
        Main.createImage(BottomQueens[i].image,"#fa2525");
      }
      if(BottomQueens.length==2)
      {
        Main.createText("Two queens stand before me.", 'Bold');
        Main.createText(BottomQueens[0].GetName()+" and "+BottomQueens[1].GetName()+", this is your last to impress me, and save yourself from elimination." , 'Bold');
      }
      else
      {
        Main.createText("Three queens stand before me." , 'Bold');
        Main.createText(BottomQueens[0].GetName()+", "+BottomQueens[1].GetName()+" and "+BottomQueens[2].GetName()+", this is your last to impress me, and save yourself from elimination." , 'Bold');
      }
      break;
    case 1:
      Main.createBigText("The time has come...");
      for(let i = 0; i < BottomQueens.length; i++)
      {
        Main.createImage(BottomQueens[i].image,"#fa2525");
      }
      Main.createText("The time has come...", 'Bold');
      break;
    case 2:
      Main.createBigText("The time has come...");
      for(let i = 0; i < BottomQueens.length; i++)
      {
        Main.createImage(BottomQueens[i].image,"#fa2525");
      }
      Main.createText("The time has come for you to lipsync...", 'Bold');
      break;
    case 3:
      Main.createBigText("The time has come...");
      for(let i = 0; i < BottomQueens.length; i++)
      {
        Main.createImage(BottomQueens[i].image,"#fa2525");
      }
      Main.createText("The time has come for you to lipsync for your LIFE!", 'Bold');
      break;
    case 4:
      Main.createBigText("The time has come...");
      Main.createText("The lipsync song is Fuego by Eleni Foureira.", 'Bold');
      for(let i = 0; i < BottomQueens.length; i++)
      {
        Main.createImage(BottomQueens[i].image,"#fa2525");
      }
      Main.createText("Good luck and don't FUCK IT UP!", 'Bold');
      break;
    case 5:
      Main.createBigText("The time has come...");
      for(let i = 0; i < BottomQueens.length; i++)
      {
        Main.createImage(BottomQueens[i].image,"#fa2525");
      }
      Main.createText("Thank you for perfomances.", 'Bold');
      Main.createText("I have made my decisions.", 'Bold');
      break;
    case 6:
      Main.createBigText("Shantay you stay...");
      for(let i = 0; i < BottomQueens.length; i++)
      {
        BottomQueens[i].GetLipsync();
        BottomQueens[i].favoritism += -5;
      }
      BottomQueens.sort((a, b) => b.lipsyncscore - a.lipsyncscore);
      Main.createImage(BottomQueens[0].image, "#ff8a8a");
      Main.createText(BottomQueens[0].GetName()+", shantay you stay.", 'Bold');
      BottomQueens[0].trackrecord.push("BOTTOM");
      break;
    case 7:
      Main.createBigText("Sashay away...");
      Main.createImageBW(BottomQueens[1].image, "#fa2525");
      Main.createText(BottomQueens[1].GetName()+", my dear queen.", 'Bold');
      Main.createText("I cannot wait for the world to fall in love with you, now. Sashay away...", 'Bold');
      BottomQueens[1].trackrecord.push("ELIMINATED");
      if(CurrentSeason.eliminatedCast.length==0)
      {
        BottomQueens[1].placement= CurrentSeason.fullCast.length-CurrentSeason.eliminatedCast.length;
      }
      else
      {
        BottomQueens[1].placement= CurrentSeason.fullCast.length-CurrentSeason.eliminatedCast.length;
      }
      

      CurrentSeason.currentCast.splice(CurrentSeason.currentCast.indexOf(BottomQueens[1]),1);
      CurrentSeason.eliminatedCast.unshift(BottomQueens[1]);
      break;
  }
  Steps++;
  if(Steps<8)
    Main.createButton("Proceed", "Lipsync()");
  else
  {
    Main.createButton("Proceed", "GetPromoTable()");
    Steps = 0;
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function GenerateChallenge()
{
  document.body.style.backgroundImage = 'url("Images/Backgrounds/MS.png")';
  Main = new Screen();
  Main.clean();
  CurrentChallenge.createBrief();
  if(CurrentSeason.episodes[CurrentSeason.episodes.length-1]=="Design")
  {
    for(let i = 0; i < CurrentSeason.currentCast.length; i++)
    {
      if(CurrentSeason.currentCast[i].miniwinner == true && CurrentChallenge.boxes.indexOf(CurrentChallenge.chosen) == -1)
      {
        
        Main.createImage(CurrentSeason.currentCast[i].image,'blue');
        Main.createText(CurrentSeason.currentCast[i].GetName()+" as the winner of this week mini-challenge! You get 15 seconds of advance on the other queens.");
        Main.createLine();
      }
      else if(CurrentSeason.currentCast[i].miniwinner == true)
      {
        Main.createImage(CurrentSeason.currentCast[i].image,'blue');
        Main.createText(CurrentSeason.currentCast[i].GetName()+" as the winner of this week mini-challenge! You get to assign boxes to the other queens.");
        Main.createLine();
      }
    }
  }
  else
  {
    Main.createLine();
  }
  CurrentChallenge.rankPerfomances();
  CurrentChallenge.createPerformances();

  if(CurrentChallenge.hasrunway==true)
  {
    Main.createLine();
    CurrentChallenge.rankRunways();
    if((CurrentChallenge.finaleformat=="TOP3" || CurrentChallenge.finaleformat=="TOP3NE") && CurrentSeason.currentCast.length==3)
    {
      Main.createText("The runway theme, this week is : Best Drag.");
    }
    else if(CurrentSeason.finaleformat == "TOP3" && CurrentSeason.currentCast.length==3)
    {
      Main.createText("The runway theme, this week is : Best Drag.");
    }
    else if(CurrentSeason.finaleformat == "TOP3" && CurrentSeason.currentCast.length==3)
    {
      Main.createText("The runway theme, this week is : Best Drag.");
    }
    else
    {
      Main.createText("The runway theme, this week is : Random.");
    }
    CurrentChallenge.createRunways();
  }
  RankQueens();
  Main.createButton("Proceed", "WhoGetsCritiques()");
}

function GetPromoTable()
  {
    
    SlayedChallenge = [];
    GreatChallenge = [];
    GoodChallenge = [];
    BadChallenge = [];
    FloppedChallenge = [];

    SlayedRunway = [];
    GreatRunway = [];
    GoodRunway = [];
    BadRunway = [];
    FloppedRunway = [];

    TopsQueens = [];
    BottomQueens = [];

    for(let i = 0; i<CurrentSeason.currentCast.length; i++)
    {
      CurrentSeason.currentCast[i].miniwinner = false;
      CurrentSeason.currentCast[i].episodeson++;
    }

    document.body.style.backgroundImage = 'url("Images/Backgrounds/bg.png")';
    Main = new Screen();
    Main.createBigText("Placements");
    Main.clean();
    Main.createPromoTable();
    
    if(CurrentSeason.episodes.length == 0)
    {
      Main.createButton("Proceed","Intro()");
    }
    else
    {
      Main.createButton("Proceed","TrackRecords()");
    }
  }

function LaunchMiniChallenge()
{ 
  Main = new Screen();
  Main.createBigText("In the workroom...");
  document.body.style.backgroundImage = 'url("Images/Backgrounds/Workroom.png")';
  if(CurrentSeason.episodes.length == 1 && CurrentSeason.lipsyncformat == "LIFE")
  {
    Main.clean();
    Main.createImage(CurrentSeason.host.outofdrag,'blue');
    Main.createText("Welcome queens!");
    for(let i = 0; i < CurrentSeason.currentCast.length; i++)
    {
      Main.createImage(CurrentSeason.currentCast[i].image);

    }
    Main.createText("You all have made it here.");
    Main.createText("Because you all are the very best of the drag world.");
    Main.createText("To get to know you all a little better, for your first mini-challenge...");
    Main.createText("You will have to do a photoshoot!","Bold");
    Main.createButton("Proceed","PhotoshootMini()");
  }
  else
  {
    Main.clean();
    Main.createButton("Proceed","PhotoshootMini()");
  }
}

function PhotoshootMini()
{
  Main = new Screen();
  Main.createBigText("In the workroom...");
  Main.clean();
  Main.createImage(CurrentSeason.host.outofdrag,'blue');
  Main.createText("Well congratulations to you all! Thoses photos are looking great.");
  Main.createText("But one of you snatched our attention.");
  let challengewinner = getRandomInt(0,CurrentSeason.currentCast.length-1);
  Main.createImage(CurrentSeason.currentCast[challengewinner].image,'blue');
  Main.createText(CurrentSeason.currentCast[challengewinner].GetName()+", you are the winner of this week mini-challenge!",'Bold');
  CurrentSeason.currentCast[challengewinner].miniwinner = true;
  CurrentSeason.currentCast[challengewinner].minichallengeswins += 1;
  Main.createButton("Proceed","GenerateChallenge()");
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function Intro()
{
  Video = new Screen();
  Video.clean();
  Video.createVideo(CurrentSeason.country);
  Video.createBigText("Welcome to "+CurrentSeason.seasonname+'!');
  Video.createButton("Proceed","ChallengeAnnouncement()");
}

function ChallengeAnnouncement(){
  Main.createBigText("She had already done had herses!");
  document.body.style.backgroundImage = "url('Images/Backgrounds/RChallenge.png')";
  Announcement = new Screen();
      Announcement.clean();
  if(CurrentSeason.episodes.length==0 && CurrentSeason.premiereformat == "NORMAL")
  {

    CurrentChallenge = new DesignChallenge();
    CurrentEpisode = new Episode(CurrentChallenge.episodename[CurrentChallenge.chosen], "Design");
    CurrentSeason.episodes.push(CurrentEpisode);
    CurrentSeason.designchallenges++;

    Announcement = new Screen();
    Announcement.clean();
    
    Announcement.createRupaulAnnouncement("Welcome queens!");
    Announcement.createRupaulAnnouncement("First of all let me give you all a warm welcome.");
    Announcement.createRupaulAnnouncement("You all made it here. You are all the very best.");
    Announcement.createRupaulAnnouncement("Now, let the olympics begin !");
    Announcement.createButton("Proceed","LaunchMiniChallenge()");
  }
  else
  {
    if( (CurrentSeason.finaleformat == "TOP3" || CurrentSeason.finaleformat == "TOP3NE")  && CurrentSeason.currentCast.length==3)
    {
      CurrentChallenge = new FinalChallenge();
      if(CurrentSeason.lastchallenge == "RUMIX")
      {
        CurrentEpisode = new Episode(CurrentChallenge.chosen, "Rumix");
        CurrentSeason.episodes.push(CurrentEpisode);
      }
      else
      {
        CurrentEpisode = new Episode(CurrentChallenge.chosen, "Music Video");
        CurrentSeason.episodes.push(CurrentEpisode);
      }
      Announcement.createButton("Proceed","LaunchMiniChallenge()");
    }
    else if(CurrentSeason.finaleformat == "TOP4" && CurrentSeason.currentCast.length==4)
    {
      CurrentChallenge = new FinalChallenge();
      if(CurrentSeason.lastchallenge == "RUMIX")
      {
        CurrentEpisode = new Episode(CurrentChallenge.chosen, "Rumix");
        CurrentSeason.episodes.push(CurrentEpisode);
      }
      else
      {
        CurrentEpisode = new Episode(CurrentChallenge.chosen, "Music Video");
        CurrentSeason.episodes.push(CurrentEpisode);
      }
      Announcement.createButton("Proceed","LaunchMiniChallenge()");
    }
    else if(CurrentSeason.finaleformat == "TOP5" && CurrentSeason.currentCast.length==5)
    {
      CurrentChallenge = new FinalChallenge();
      if(CurrentSeason.lastchallenge == "RUMIX")
      {
        CurrentEpisode = new Episode(CurrentChallenge.chosen, "Rumix");
        CurrentSeason.episodes.push(CurrentEpisode);
      }
      else
      {
        CurrentEpisode = new Episode(CurrentChallenge.chosen, "Music Video");
        CurrentSeason.episodes.push(CurrentEpisode);
      }
      Announcement.createButton("Proceed","LaunchMiniChallenge()");
    }
    else
    {

      switch(getRandomInt(0,6))
      {
        case 0:
          CurrentChallenge = new DesignChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.episodename[CurrentChallenge.chosen], "Design");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.designchallenges++;
          break;

        case 1:
          CurrentChallenge = new ActingChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.plays[CurrentChallenge.chosen], "Acting");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.actingchallenges++;
          break;
        case 2:
          CurrentChallenge = new ImprovChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.episodename, "Improvisation");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.improvchallenges++;
          break;
         case 3:
          CurrentChallenge = new ComedyChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.episodename, "Comedy");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.standupchallenges++;
          break;
        case 4:
          CurrentChallenge = new ChoreographyChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.episodename, "Choreography");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.choreochallenges++;
          break;
        case 5:
          CurrentChallenge = new CommercialChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.episodename, "Commercial");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.commercialchallenges++;
          break;
        case 6:
          CurrentChallenge = new BrandingChallenge();
          CurrentEpisode = new Episode(CurrentChallenge.episodename, "Branding");
          CurrentSeason.episodes.push(CurrentEpisode);
          CurrentSeason.commercialchallenges++;
          break;
      }
      CurrentChallenge.createMessage();
      Announcement.createButton("Proceed","LaunchMiniChallenge()");
    }
  }
}

function RankQueens(){
    Tops = [];
    Bottoms = [];
    Critiqued = [];
    Safes = [];

    if(CurrentSeason.currentCast.length>=12)
    {
      for(let i = 0; i<4; i++)
      {
        Tops.push(CurrentSeason.currentCast[i]);
        Bottoms.push(CurrentSeason.currentCast[CurrentSeason.currentCast.length-1-i]);

        Critiqued.push(CurrentSeason.currentCast[i]);
        Critiqued.push(CurrentSeason.currentCast[CurrentSeason.currentCast.length-1-i]);
      }
    }
    else
    {
      if(CurrentSeason.currentCast.length==5)
      {
          Tops.push(CurrentSeason.currentCast[0]);
          Tops.push(CurrentSeason.currentCast[1]);
          Tops.push(CurrentSeason.currentCast[2]);
          Bottoms.push(CurrentSeason.currentCast[3]);
          Bottoms.push(CurrentSeason.currentCast[4]);
        for(let i = 0; i<5; i++)
        {
          Critiqued.push(CurrentSeason.currentCast[i]);
        }

      }
      else if(CurrentSeason.currentCast.length==4)
      {
        Tops.push(CurrentSeason.currentCast[0]);
        Tops.push(CurrentSeason.currentCast[1]);
        Bottoms.push(CurrentSeason.currentCast[2]);
        Bottoms.push(CurrentSeason.currentCast[3]);
      for(let i = 0; i<4; i++)
      {
        Critiqued.push(CurrentSeason.currentCast[i]);
      }
      }
      else if(CurrentSeason.currentCast.length==3)
      {
        Tops.push(CurrentSeason.currentCast[0]);
        Tops.push(CurrentSeason.currentCast[1]);
        Tops.push(CurrentSeason.currentCast[2]);
      for(let i = 0; i<3; i++)
      {
        Critiqued.push(CurrentSeason.currentCast[i]);
      }
      }
      else
      {
        for(let i = 0; i<3; i++)
        {
          Tops.push(CurrentSeason.currentCast[i]);
          Bottoms.push(CurrentSeason.currentCast[CurrentSeason.currentCast.length-1-i]);

          Critiqued.push(CurrentSeason.currentCast[i]);
          Critiqued.push(CurrentSeason.currentCast[CurrentSeason.currentCast.length-1-i]);
        }
      }
    }

    for(let i = 0; i<CurrentSeason.currentCast.length; i++)
    {
      if(Tops.indexOf(CurrentSeason.currentCast[i],0) == -1 && Bottoms.indexOf(CurrentSeason.currentCast[i],0) == -1)
      {
        CurrentSeason.currentCast[i].trackrecord.push("SAFE");
        CurrentSeason.currentCast[i].ppe += 3;
        Safes.push(CurrentSeason.currentCast[i]);
      }
    }

    shuffle(SlayedChallenge);
    shuffle(GreatChallenge);
    shuffle(GoodChallenge);
    shuffle(BadChallenge);
    shuffle(FloppedChallenge);
}

function TrackRecords()
{
  Main.createBigText("Track Records");
  MainScreen = new Screen();
  MainScreen.clean();

  MainScreen.createTrackRecords();

  if(done==false)
  {
    MainScreen.createButton("Proceed","ChallengeAnnouncement()");
  }
}

function CreateEntrances()
{

}

function CreateSeason(Name, Cast, Host, Finale, LC, LS, Premiere, Country)
{
  CurrentSeason = new Season(Name, Cast, Host, Finale, LC, LS, Premiere, Country);
  GetPromoTable();
}
//#endregion
