/*

우리가 이전에 설치해 놓은 파일을 override(덮어쓰기) 할 파일

*/

// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    btnColor: string;
  }
}
