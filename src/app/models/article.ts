export class Article {
  constructor(
    public titre : string ,
    public contenu : string ,
    public photo : string,
    public reference : string,
    public online : boolean,
    public categorie : string,
    public sousTitre : string,
    public date? : Date,
  ) {
  }
}
