
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
    let counterid = "counter".concat(id);
    let imageid = "cat".concat(id);

    let title = '<h3>'+ obj.name +'</h3><p>Meow! ... Click me! <span id="'+
      counterid +'">'+ obj.counter +'</span></p>';

    let image =
      '<img id="' + imageid + '" class="cat-image" src="images/' +
        obj.picture + '" alt="Picture of cat named '+ obj.name + '">';

    $("#cat-container").html(title + image);
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
    //Add the event Listeners
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
  render(){
    view.renderTabs(this.getAllNames());
    this.addTabEvtListener();

  }
}

let model = new Model();
let view = new View();
let controller = new Controller();

controller.render();
