export class StringHelper {
  public static domain(url: string): string {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
  }
}
