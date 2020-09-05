  export class Immobilier {


    constructor(

      public type: string,
      public status: string,
      public title: string,
      public description:string ,
      public surface:number ,
      public price : number ,
      public bedroom: number  ,
      public bathroom: number ,
      public living_room : number,
      public kitchen : number ,
      public rooms : number,
      public garage : boolean,
      public terrace : boolean,
      public address : {
        country: string,
        region : string,
        city  : string  ,
        street :  string  ,
        postal_code : string  ,
        longitude : number,
        latitude : number
      },
      public date : Date,
      public selleurName? : string,
      public selleurFirstName? : string,
      public reference? : string,
      public  offres? : [],
      public banniere? : string,
      public photos? : [],
      public _id? : string,
    ) {}
  }
