export class Menu {

  id: number;
  parentId: number;

  name: string;
  navigate: string;

  constructor(id: number, parentId: number, name: string, navigate: string) {

    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.navigate = navigate;
  }
}
