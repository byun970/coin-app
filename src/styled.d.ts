import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    downColor: string;
    upColor: string;
    priceMenuColor: string;
    menuColor: string;
    btnColor: string;
  }
}
