export class Address {
  public name: string;
  public longitude: number;
  public latitude: number;

  constructor(
    items: object
  ) {
    if (items) {
      Object.assign(
        this, JSON.parse(JSON.stringify(items))
      );
    }
  }
}
