/**
 * String Helper
 * @author Idam Achmad Faizin
 * @date 2020-11-21 21:40:45
 */

export class StringHelper {
  /**
   * Get domain from full url
   * @param url string url start from http or https
   */
  public static domain(url: string): string {
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
  }
}
