export type NavbarButtonsType = 'home' | 'info' | 'settings' | 'exit';

export interface IAppStore {
    navbarButtons: NavbarButtonsType[];
    setNavbarButtons: (navbarButtons: NavbarButtonsType[]) => void;
}