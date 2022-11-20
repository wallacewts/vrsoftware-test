export function GetAction(routingKey: string): string {
  return routingKey.split('.')[2];
}
