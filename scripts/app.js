
class Model{
  constructor(){
    this.data = cat_data;
  }
  getName(id){
    return this.data[id].name;
  }
  getAllNames(){
    let list = [];
    for(let i in this.data){
      list.push(this.getName(i));
    }
    return list;
  }
  getCat(id){
    return this.data[id];
  }
  getCounter(id){
    return this.data[id].counter;
  }
  increaseCounter(id){
    this.data[id].counter = this.data[id].counter+ 1;
  }
}

class View{
  constructor(){
    this.catname = $("#catname"); //h3
    this.meow = $("#meow");  //p
    this.clickcount = $("#meow > span"); //span
    this.image = $("#cat-container > img") //img
  }

  renderTabs(namelist){
    var htmlStr = '';

    for(let i in namelist){
      let catname = namelist[i];
        htmlStr += '<button id="' + i + '">' + catname + '</button>';
    }
    $("#tab-container").html(htmlStr);
  }

  updatePicture(obj, id){

    this.catname.html(obj.name); //Title - Cat name
    this.meow.html("Meow! Click me!.... ");

    this.clickcount.attr("id" , "counter".concat(id) );
    this.clickcount.html(obj.counter); //Click Counter

    this.meow.append(this.clickcount.text(obj.counter));

    //img tag
    this.image.attr({
      "id"  : "cat".concat(id),
      "src" : "images/".concat(obj.picture),
      "alt" : "Picture of cat named ".concat(obj.name),
      "class" : "cat-image"
    });
  }
  updateCounter(id, count){
      let spanid = "#counter".concat(id);
      $(spanid).html(count);
  }
}

class Controller{
  constructor(){
  }

  getAllNames(){
    return model.getAllNames();
  }

  addTabEvtListener(){
    //Add the event Listeners to the tab container
    $("#tab-container").click(function(evt){
      let id = evt.target.id;
      //Deactivate all buttons/tabs
      for(let i = 0; i< $("button").length; i++){
        $("button")[i].classList.toggle("active", false);
      }
      //Activate Active button!
      let active = document.getElementById(id);
      active.classList.toggle("active", true);

      //show the corresting cat picure!
      view.updatePicture(model.getCat(id), id);
      controller.addPicEvtListener(id);
    });
  }

  addPicEvtListener(id){
    let imgid = "#cat".concat(id);

    $(imgid).click(function(evt){
        model.increaseCounter(id);
        view.updateCounter(id, model.getCounter(id));
    });
  }
  init(){
    view.renderTabs(this.getAllNames());
    this.addTabEvtListener();

  }
}

let model = new Model();
let view = new View();
let controller = new Controller();

controller.init();
