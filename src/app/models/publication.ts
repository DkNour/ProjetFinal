export class Publication{
    id: number;
    titre: string;
    dateapparition: string;
    type:string;
    constructor(id: number, titre: string, dateapparition:string, type: string) {
        this.id=id;
        this.titre = titre;
        this.dateapparition=dateapparition;
        this.type = type;
      }
}