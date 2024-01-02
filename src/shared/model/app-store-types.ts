export type NavbarButtonsType = 'home' | 'fullscreen' | 'settings' | 'exit';

export interface IAppStore {
    navbarButtons: NavbarButtonsType[];
    setNavbarButtons: (navbarButtons: NavbarButtonsType[]) => void;
}