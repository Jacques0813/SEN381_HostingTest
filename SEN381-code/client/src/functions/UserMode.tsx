export function GetUserMode() {
  var isMobile = false;

  if (window.innerWidth <= 768) {
    isMobile = true;
  }

  return isMobile;
}
