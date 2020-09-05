export class Agence {
  constructor(
    public nomAgence : string ,
    public photos : [string] ,
    public fixe1 : number,
    public fixe2 : number,
    public portable : number,
    public mail1 : string,
    public mail2 : string,
    public horraires : string,
    public jours : string,
    public presentation : string,
    public address : {
      country: string,
      region : string,
      city  : string  ,
      street :  string  ,
      postal_code : string  ,
      longitude : number,
      latitude : number
    },
    public gerant : {
      nom : string,
      prenom : string,
      photo : string,
    }

  ) {}


}
