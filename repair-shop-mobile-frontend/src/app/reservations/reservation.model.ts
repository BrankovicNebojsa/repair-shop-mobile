export class Reservation {
  constructor(
    public id: string | null,
    public date: string,
    public license_plate: string,
    public description: string,
    public mechanic_name: string,
    public userId: string
  ) {}
}
