/// <reference path="./typings/react/react.d.ts" />

declare module 'react-combobox' {
    import * as React from 'react';  

    export interface ComboboxItemData {
        key?: string|number;
        id?:string|number;
        label: string;
    }

    export interface ComboboxItemProps {
        label: string;
        itemKey:string|number;
        index:number;
        onClick: Function;
    }

    export interface ComboboxItemState { 
        
    }

    export class ComboboxItem extends React.Component<ComboboxItemProps,ComboboxItemState>{
        onClick(e:any):void;
    }

    export interface ComboboxProps {
        className?: string;
        items: ComboboxItemData[];
        onChange: Function;
        label: string;
        labelRenderer?:(selItem:ComboboxItemData)=>React.ReactElement<any>;
        selItem?: ComboboxItemData;
    }

    export interface ComboboxState {
        selItem?: ComboboxItemData,
        active?: boolean;
    }

    export class Combobox extends React.Component<ComboboxProps, ComboboxState>{
        onChange(e:any);
        onToggleMenu();
    }


    export interface AutocompleteProps {
        className?: string;
        label: string;
        onChange: Function;
        selItem?:ComboboxItemData;
        onItemSelected: Function;
        filter:(e:string)=>ComboboxItemData[];
    }

    export interface AutocompleteState {
        items?: ComboboxItemData[];
        selItem?: any;
        value?: string;
        active?: boolean;
    }

    export class Autocomplete extends React.Component<AutocompleteProps,AutocompleteState>{
        onChange(e:any):void;
        onItemClick(e:any):void;
        onInputClick(e:any):void;
    }

}