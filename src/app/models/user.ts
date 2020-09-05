export class User {

  constructor(
    public _id : string,
    public mail : string,
    public mdp : string,
    public sexe : string,
    public nom : string,
    public prenom : string,
    public pays : string,
    public ville : string,
    public cp : number,
    public rue : string,
    public phone : number,
    public pub1? : boolean,
    public pub2? : boolean,
    public isAdmin? : boolean
  ) {
  }

}

