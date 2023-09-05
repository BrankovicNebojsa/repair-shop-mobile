export class Car {
  constructor(
    public id: string | null,
    public license_plate: string,
    public brand_name: string,
    public model_name: string,
    public year: string,
    public transmission: string,
    public color: string,
    public engine_horse_power: string,
    public engine_capacity: string,
    public userId: string
  ) {}
}
