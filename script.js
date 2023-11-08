









const library = [];

function Book(title,author,pages,status){
  // The constructor
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = status
}



function addBookToLibrary(){
  // do stuff 

  const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'read')
  const book2 = new Book('The Bit', 'J.R.R', 2441, ' not read')
  library.push(book1)
  library.push(book2)
}

addBookToLibrary()




















// Object constructor 
function Book(title,author,pages,status) {
  this.title = title;
  this.author = author;
  this.pages = pages; 
  this.status = status;
  
  this.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status ? 'read' : 'not read yet'}`;
  }
}


const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295 ,false);

// console.log(player.name)





function Hero (name, level){
  this.name = name;
  this.level = level;
}

let hero1 = new Hero('Bjorn', 1)


Hero.prototype.greet = function(){
  return  `${this.name} says hello` 
}




