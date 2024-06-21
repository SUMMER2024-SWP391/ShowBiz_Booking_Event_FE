export function handleTimeInDay(time: string): string {
  const timeArray = time.split(':')
  const minutes = timeArray[1].split(' ')
  if (Number(timeArray[0]) > 12) {
    const newHour = Number(timeArray[0]) - 12
    return `${newHour}:${minutes[0]}`
  }
  return `${timeArray[0]}:${minutes[0]}`
}
