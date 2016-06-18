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
	constructor(props:ComboboxItemProps){
		super(props);
        this.onClick = this.onClick.bind(this);
		this.state = {
			active:false,
		};
	}

    onClick(e:any){
        let props = this.props; 
        props.onClick(props.index,props.itemKey);
    }

	shouldComponentUpdate(nextProps:ComboboxItemProps,nextState:ComboboxItemState){
		return nextProps.label !== this.props.label ||
            nextProps.index !== this.props.index;
	}

	render(){
        let props = this.props;
		return (
			<div className="cbo-item" data-index={props.index} onClick={this.onClick}>{this.props.label}</div>
		);
	}
}