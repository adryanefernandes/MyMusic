export function currentDate(): string{
  const date: Date = new Date();
  const year: number = date.getFullYear()
  const month: number = date.getMonth() + 1
  const day: number = date.getDate()

  const fullDate: string = `${year}-${month}-${day}`;

  return fullDate
}