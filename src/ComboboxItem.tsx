import * as React from 'react';  

export interface ComboboxItemData {
	key?: string|number;
    id?:string|number;
	label: string;
}
export interface ComboboxItemProps {
	item:any;
	label: string;
    itemKey:string|number;
    index:number;
	onClick: Function;
}

export interface ComboboxItemState { 
	
}

export class ComboboxItem extends React.Component<ComboboxItemProps,ComboboxItemState>{
	constructor(props:ComboboxItemProps){
		super(props);
        this.onClick = this.onClick.bind(this);
		this.state = {
			active:false,
		};
	}

    onClick(e:any){
        let props = this.props; 
        props.onClick(props.item,props.itemKey);
    }

	render(){
        let props = this.props;
		return (
			<div className="react-dropdown-item" data-index={props.index} onClick={this.onClick}>{this.props.label}</div>
		);
	}
}