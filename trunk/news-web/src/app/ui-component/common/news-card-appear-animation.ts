import {animate, state, style, transition, trigger} from "@angular/animations";

export const newsCardAppearAnimation = trigger("readyStateChanged", [
    state('yes', style({opacity: 0, display: 'none'})),
    state('no', style({opacity: 1})),
    transition('no => yes', animate('0.75s'))
])

export interface SupportNewsCardAppearAnimation {

    readyState: string;
}