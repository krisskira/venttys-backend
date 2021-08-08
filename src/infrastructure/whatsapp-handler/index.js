class myClass {
  counter = 0;
  handler = 0;

  start = async () => {
    return new Promise((resolve, reject) => {
      this.handler = setInterval(() => {
        this.counter+=1;
        reject("Rechazada....");
        if (this.counter >= 10) {
          clearInterval(this.handler);
          return resolve("Resolver");
          console.log("mas codigo");
          console.log("Otro poco de codigo");
        }
      }, 500);
    });
  }
}

const myclass = new myClass()

p = myclass.start().then( e => console.log('**->', e) ).catch( p => console.error('*->', p) )