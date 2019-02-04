
class Model{
  constructor(){
    this.data = cat_data;
    this.currentcat = "";
  }
  setCurrentCat(id){
    let cat = this.getCat(id);
    cat.id = id;
    this.currentcat = cat;
  }
  updateCatInfo(obj){
    this.data[obj.id] = obj;
    this.currentcat = obj;
  }
  getCurrentCat(){
    return this.currentcat;
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
/////////////////////////////
//
// View
//
//////////////////////////////
class View{
  constructor(){
    this.catname = $("#cat-container > h3"); //h3
    this.meow = $("#cat-container > p");  //p
    this.clickcount = $("#cat-container > p > span"); //span
    this.image = $("#cat-container > img") //img
    this.admin = $("#cat-container > button");

    //Admin Information
    this.input_catname = $("#catname");
    this.input_caturl = $("#caturl");
    this.input_catclicks = $("#catclicks");
    this.input_catid = $("#catid");
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
      "src" : obj.picture,
      "alt" : "Picture of cat named ".concat(obj.name),
      "class" : "cat-image"
    });

    this.admin.removeClass("hide");
    this.admin.attr("id" , "admin".concat(id) );

  }

  showAdminInfo(obj){
    this.input_catname.val(obj.name);
    this.input_caturl.val(obj.picture);
    this.input_catclicks.val(obj.counter);
    this.input_catid.val(obj.id);

  }

  updateCounter(id, count){
      let spanid = "#counter".concat(id);
      $(spanid).html(count);
  }
}

///////////////////////////
//Controller
///////////////////////////
class Controller{
  constructor(){
  }

  addTabEvtListener(){
    //Add the event Listeners to the tab container
    $("#tab-container").click(function(evt){
      let id = evt.target.id;
      //set current cat!!!
      model.setCurrentCat(id);

      //Deactivate all buttons/tabs
      for(let i = 0; i< $("button").length; i++){
        $("button")[i].classList.toggle("active", false);
      }
      //Activate Active button!
      let active = document.getElementById(id);
      active.classList.toggle("active", true);

      //Hide form
      $("#form").addClass("hide");

      //show the corresting cat picure!
      view.updatePicture(model.getCurrentCat(), id);
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

  addAdminEvtListeners(){

    $("#cat-container > button").click(function(){
      $("#form").removeClass("hide");
      view.showAdminInfo(model.getCurrentCat());
    });

    $("#form").click(function(event){
      event.preventDefault();

      if(event.target.value === "Submit"){

          let newCatInfo = {};
          newCatInfo.name = $("#catname").val();
          newCatInfo.picture = $("#caturl").val();
          newCatInfo.counter = parseInt($("#catclicks").val());
          newCatInfo.id = $("#catid").val();
          model.updateCatInfo(newCatInfo);
          //rerender
          view.renderTabs(model.getAllNames());
          view.updatePicture(model.getCurrentCat(), newCatInfo.id);
          //Update and then hide form
          $("#form").addClass("hide");
      }else if(event.target.value === "Cancel"){
        $("#form").addClass("hide");
      }

    });
  }


  init(){
    view.renderTabs(model.getAllNames());
    this.addTabEvtListener();
    this.addAdminEvtListeners()
  }
}

let model = new Model();
let view = new View();
let controller = new Controller();

controller.init();
