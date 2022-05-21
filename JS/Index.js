//#region Initialisers
let CurrentSeason;
let CurrentChallenge;

let SlayedChallenge = [];
let GreatChallenge = [];
let GoodChallenge = [];
let BadChallenge = [];
let FloppedChallenge = [];
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
  constructor(Name, Cast, Host, Finale, Lipsync, Premiere, Country)
  {
    this.seasonname = Name;
    this.fullCast = Cast;

    this.currentCast = [];
    if(this.currentCast.length==0)
      for(let i =0; i < this.fullCast.length; i++)
      {
        
        this.currentCast.push(this.fullCast[i]);
      }

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

      this.favoritism = 0;
      this.unfavoritism = 0;

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

      this.image = "Images/Queens/"+Image+".webp";
      this.promo = "Images/Promos/"+Promo+"Promo.webp";

      this.ogseason = OriginalSeason;
      this.iscustom = IsCustom;
      this.placement = 0;

      this.perfomancescore = 0;
      this.runwayscore = 0;
      this.finalscore = 0;
      this.lipsyncscore = 0;
  }

  GetScore(min, max, stat)
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
    this.lipsyncscore = this.GetScore(15,45,this.lipsync);
    this.lipsyncscore = this.lipsyncscore - this.favoritism;
    this.lipsyncscore = this.lipsyncscore + this.unfavoritism;
  }

  GetDesignScore(bonus = 0)
  {
    if(getRandomInt(0,1)==0 && this.miniwinner == true)
    {
      this.perfomancescore = this.GetScore(10,50,this.design+bonus);
      this.finalscore = this.perfomancescore;
    }
    else
    {
      this.perfomancescore = this.GetScore(10,50,this.design);
      this.finalscore = this.perfomancescore;
    }
  }
}

class Host{
  constructor(Name, InDrag, OutOfDrag)
  {
    this.name = Name;
    this.outofdrag = "Images/Queens/"+OutOfDrag+".webp";
    this.indrag = "Images/Queens/"+InDrag+".webp";
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
              case 2:
                placement.innerHTML = "2nd";
              case 3:
                placement.innerHTML = "3rd";
              default:
                placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
            }
            name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
            td.append(name);
            td.append(placement);
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
              case 2:
                placement.innerHTML = "2nd";
              case 3:
                placement.innerHTML = "3rd";
              default:
                placement.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetPlacement()+"th";
            }
            name.innerHTML = CurrentSeason.fullCast[q+(i*4)].GetName();
            td.append(name);
            td.append(placement);
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

class DesignChallenge{
  constructor()
  {
    this.winner = false;
    this.brief = [
      "The queens will have to make outfits with summer items.",
      "The queens will have to make outfits with boxes from past contestants.",
      "The queens will have to make outfits with random Christmas decorations.",
      "The queens will have to make outfits with backyard items.",
      "The queens will have to make outfits with random items contained in boxes.",
      "The queens will have to make outfits with random items contained in boxes of color."
    ];
    this.chosen = getRandomInt(0,this.brief.length-1);
    this.boxes = [1, 4, 5];
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
      if(CurrentSeason.currentCast[i].perfomancescore<=6)
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
      else if(CurrentSeason.currentCast[i].perfomancescore>26 && CurrentSeason.currentCast[i].perfomancescore<=36)
      {
        BadChallenge.push(CurrentSeason.currentCast[i]);
      }
      else if(CurrentSeason.currentCast[i].perfomancescore>36)
      {
        FloppedChallenge.push(CurrentSeason.currentCast[i]);
      }
    }

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
    Main.createButton("Proceed", "WhoGetsCritiques()");
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
let anastarzia = new Queen("Anastarzia Anaquway", 7, 6, 8, 7, 9, 8, 6, 8, 10, 5, 0, "Anastarzia", "Anastarzia", "CA1", false);
let boa = new Queen("BOA", 7, 9, 9, 7, 6, 5, 5, 9, 12, 3, 0, "BOA", "BOA", "CA1", false);
let ilona = new Queen("Ilona Verley", 6, 7, 9, 7, 9, 8, 11, 8, 8, 2, 4, "Ilona", "Ilona","CA1",false);
let jimbo = new Queen("Jimbo", 12, 10, 14, 4, 8, 7, 3, 9, 12, 2, 4, "Jimbo", "Jimbo", false);
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

let marina = new Queen("Marina", 9, 8, 11, 10, 6, 8, 13, 8, 10, 3, 1, "Marina", "Marina", "ES2", false);
let estrella = new Queen("Estrella Extravanganza", 11, 10, 12, 9, 5, 6, 8, 8, 10, 3, 2, "Estrella", "Estrella", "ES2", false);
let venedita = new Queen("Venedita Von Däsh", 9, 13, 10, 8, 8, 12, 10, 8, 8, 2, 0, "Venedita", "Venedita", "ES2", false);
let juriji = new Queen("Juriji Der Klee", 12, 10, 8, 10, 12, 13, 10, 12, 15, 2, 2, "Juriji", "Juriji", "ES2", false);
let sethlas = new Queen("Drag Sethlas", 8, 9, 7, 8, 12, 10, 8, 12, 10, 3, 2, "Sethlas", "Sethlas", "ES2", false);
let diamante = new Queen("Diamante Merybrown", 7, 6, 6, 10, 6, 8, 9, 8, 9, 2, 0, "Diamante", "Diamante", false);
let onyx = new Queen("Onyx", 8, 8, 7, 6, 12, 14, 8, 12, 10, 2, 0, "Onyx", "Onyx", "ES2", false);
let jota = new Queen("Jota Cajarota", 7, 6, 8, 6, 9, 6, 8, 8, 14, 2, 4, "Jota", "Jota", "ES2", false);
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
  Main.createButton("Proceed", "Placements()");
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
                }
                else
                {
                  Tops[randomtop].trackrecord.push("WIN ");
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
                }
                else if(CurrentChallenge.winner == true && doublewin == true)
                {
                  Main.createImage(Tops[randomtop].image,"#1741ff");
                  Main.createText(Tops[randomtop].GetName()+", CONDRAGULATIONS! You're the other winner of this week main challenge.","Bold");
                  Tops[randomtop].trackrecord.push("WIN ");
                }
                else
                {
                  Main.createImage(Tops[randomtop].image,"#17d4ff");
                  Main.createText(Tops[randomtop].GetName()+", great job this week. You are safe.","");
                  Tops[randomtop].trackrecord.push("HIGH");
                }
              }
              Tops.splice(randomtop,1);
          }
          else
          {
            Main.createImage(Tops[randomtop].image,"#17d4ff");
            Main.createText(Tops[randomtop].GetName()+", great job this week. You are safe.","");
            Tops[randomtop].trackrecord.push("HIGH");
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
      }
      BottomQueens.sort((a, b) => a.lipsyncscore - b.lipsyncscore);
      Main.createImage(BottomQueens[0].image, "#ff8a8a");
      Main.createText(BottomQueens[0].GetName()+", shantay you stay.", 'Bold');
      BottomQueens[0].trackrecord.push("BTM 2");
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
}
function GetPromoTable()
  {
    SlayedChallenge = [];
    GreatChallenge = [];
    GoodChallenge = [];
    BadChallenge = [];
    FloppedChallenge = [];

    TopsQueens = [];
    BottomQueens = [];

    for(let i = 0; i<CurrentSeason.currentCast.length; i++)
    {
      CurrentSeason.currentCast[i].miniwinner = false;
    }

    document.body.style.backgroundImage = 'url("Images/Backgrounds/bg.png")';
    Main = new Screen();
    Main.clean();
    Main.createPromoTable();
    Main.createButton("Proceed","Intro()");
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
  if(CurrentSeason.episodes.length==0 && CurrentSeason.premiereformat == "NORMAL")
  {

    CurrentChallenge = new DesignChallenge();
    CurrentSeason.episodes.push("Design");
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
    CurrentChallenge = new DesignChallenge();
    CurrentSeason.episodes.push("Design");
    CurrentSeason.designchallenges++;
    Announcement = new Screen();
    Announcement.clean();
    Announcement.createRupaulAnnouncement("Hello my queens !");
    Announcement.createRupaulAnnouncement("Snatching is really important for us. We've got to be 24/7!");
    Announcement.createRupaulAnnouncement("So will you be able to snatch our interest, or will you snatch the trophy home ?");
    Announcement.createRupaulAnnouncement("Only fate will decide which.");
    Announcement.createButton("Proceed","LaunchMiniChallenge()");
  }
}

function CreateEntrances()
{

}

function CreateSeason(Name, Cast, Host, Finale, LS, Premiere, Country)
{
  CurrentSeason = new Season(Name, Cast, Host, Finale, LS, Premiere, Country);
  GetPromoTable();
}
//#endregion
