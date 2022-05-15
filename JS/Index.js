//#region Initialisers
let CurrentSeason;
//#endregion
//#region Classes
class Season {
  constructor(Name, Cast, Host, Finale, Lipsync, Premiere)
  {
    this.seasonname = Name;
    this.fullCast = Cast;
    this.currentCast  = Cast;
    this.eliminatedCast = [];
    this.episodes = [];
    this.doubleShantay = false;
    this.doubleSashay = false;
    this.enableSaves = true;
    this.host = Host;
    this.finaleformat = Finale;
    this.lipsyncformat = Lipsync;
    this.premiereformat = Premiere;
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

      this.trackrecord = [];

      this.ppe = 0;
      this.episodeson = 0;

      this.wins = 0;
      this.highs = 0;
      this.safes = 0;
      this.lows = 0;
      this.bottoms = 0;

      this.minichallengeswins = 0;

      this.image = "Images/Queens/"+Image+".webp";
      this.promo = "Images/Promos/"+Promo+"Promo.webp";

      this.ogseason = OriginalSeason;
      this.iscustom = IsCustom;
      this.placement = 0;

      this.perfomancescore = 0;
      this.runwayscore = 0;
  }

  GetName()
  {
    return(this.name);
  }

  GetPlacement()
  {
    return(this.placement);
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
      {
        text.setAttribute("style","font-weight: bold; font-size: 16px;");
      }
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
      case "Canada":
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
  createPromoTable(fullCast){
      fullCast.sort((a, b) => a.placement - b.placement);
      let putincenter = document.createElement("center");
      let table = document.createElement("table");
      let thead = document.createElement("thead");

      let tbody = document.createElement("tbody");

      let rows = ~~(fullCast.length/4);
      let rest = fullCast.length%4;

      if(rest!=0)
      {
        rows++;
      }
      for(let i = 0; i < rows; i++)
      {
        let tr = document.createElement("tr");
        console.log(i);
        if(i!=rows-1 || rest==0)
        {
          console.log("First case");
          for(let q = 0; q<4;q++)
          {
            let td = document.createElement("td");
            if(CurrentSeason.eliminatedCast.indexOf(fullCast[q+(i*4)])!=-1)
            {
              td.setAttribute("style", "background: url("+ fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 195px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
            }
            else
            {
            td.setAttribute("style", "background: url("+ fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 195px;");
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
            switch(fullCast[q+(i*4)].GetPlacement())
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
                placement.innerHTML = fullCast[q+(i*4)].GetPlacement()+"th";
            }
            name.innerHTML = fullCast[q+(i*4)].GetName();
            td.append(name);
            td.append(placement);
            tr2.append(td);
          }
          tbody.append(tr2);
        }
        else
        {
          console.log("Second case");
          for(let q = 0; q<rest; q++)
          {
            let td = document.createElement("td");
            if(CurrentSeason.eliminatedCast.indexOf(fullCast[q+(i*4)])!=-1)
            {
              td.setAttribute("style", "background: url("+ fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 195px; -webkit-filter: grayscale(100%);filter: grayscale(100%);")
            }
            else
            {
            td.setAttribute("style", "background: url("+ fullCast[q+(i*4)].promo +"); background-size: 200px 200px; background-position: center; height: 190px; width: 195px;");
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
            switch(fullCast[q+(i*4)].GetPlacement())
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
                placement.innerHTML = fullCast[q+(i*4)].GetPlacement()+"th";
            }
            name.innerHTML = fullCast[q+(i*4)].GetName();
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

let can_1 = [anastarzia,boa,ilona,jimbo,juice,kiara,kyne,lemon,priyanka,rita,scarlettbobo,tynomi];

let brookehost = new Host("Brooke Lynn Hytes", "BrookeIn", "BrookeOut");
//#endregion


//#region Commands
function GetPromoTable()
  {
    document.body.style.backgroundImage = 'url("../Images/Backgrounds/bg.png");';
    Main = new Screen();
    Main.clean();
    Main.createPromoTable(CurrentSeason.getFullCast());
    Main.createButton("Proceed","Intro()");
  }

function LaunchMiniChallenge()
{
  if(CurrentSeason.episodes.length == 0 && CurrentSeason.lipsyncformat == "LIFE")
  {
    Main = new Screen();
    Main.clean();
  }
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
  Video.createVideo("Canada");
  Video.createBigText("Welcome to "+CurrentSeason.seasonname+'!');
  Video.createButton("Proceed","ChallengeAnnouncement()");
}

function ChallengeAnnouncement(){
  if(CurrentSeason.episodes.length==0 && CurrentSeason.premiereformat == "NORMAL")
  {
    Announcement = new Screen();
    Announcement.clean();
    document.body.style.backgroundImage = "url('Images/Backgrounds/RChallenge.png')";
    Announcement.createRupaulAnnouncement("Welcome queens!");
    Announcement.createRupaulAnnouncement("First of all let me give you all a warm welcome.");
    Announcement.createRupaulAnnouncement("You all made it here. You are all the very best.");
    Announcement.createRupaulAnnouncement("Now, let the olympics begin !");
    Announcement.createButton("Proceed","LaunchMiniChallenge()");
  }
  else
  {
    Announcement = new Screen();
    Announcement.clean();
    document.body.style.backgroundImage = "url('Images/Backgrounds/RChallenge.png')";
    Announcement.createRupaulAnnouncement("Hello my queens !");
    Announcement.createRupaulAnnouncement("Snatching is really important for us. We've got to be 24/7!");
    Announcement.createRupaulAnnouncement("So will you be able to snatch our interest, or will you snatch the trophy home ?");
    Announcement.createRupaulAnnouncement("Only fate will decide which.");
    Announcement.createButton("Proceed","LaunchMiniChallenge()");
  }
}

function CreateSeason()
{
  CurrentSeason = new Season("Canada's Drag Season 1", can_1, brookehost, "TOP3", "LIFE", "NORMAL");
  GetPromoTable(CurrentSeason.getFullCast());
}
//#endregion
