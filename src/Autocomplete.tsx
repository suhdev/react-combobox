import * as React from 'react';
import * as ReactDOM from 'react-dom'; 
import {ComboboxItem,ComboboxItemData} from './ComboboxItem';

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
	constructor(props:AutocompleteProps){
		super(props);
        this.onChange = this.onChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
		this.state = {
            items:props.filter('') || [],
			active:false,
			value:'',
			selItem:props.selItem || null,
		};
	}

	onChange(e:any){
		let a = e.target.value; 
		this.setState({
			value:a,
            items:this.props.filter(a),
			active:a === ""?false:true
		},()=>{
			this.props.onChange(a);
		});
	}

	componentWillReceiveProps(nextProps:AutocompleteProps){
		if (nextProps.selItem && nextProps.selItem !== this.state.selItem ){
			this.setState({
				selItem:nextProps.selItem,
				value:nextProps.selItem.label
			});
		}
	}

	shouldComponentUpdate(props:AutocompleteProps,state:AutocompleteState){
		return state.items !== this.state.items ||
			state.selItem !== this.state.selItem ||
			props.selItem !== this.props.selItem ||
			state.value !== this.state.value ||
			state.active !== this.state.active ||
			props.className !== this.props.className ||
			props.label !== this.props.label;
	}

	onItemClick(e:any){
		this.setState({
			selItem:e,
			value:e.label,
			active:false,
		},()=>{
			this.props.onItemSelected(e);
		});
	}

	onInputClick(e:any){
		e.stopPropagation();
		this.setState({
			active:!this.state.active
		});
	}

	render(){
		let clz = this.props.className || '';
		let state = this.state,
			label = this.state.selItem ? this.state.selItem.label : this.props.label,
			items = this.state.items.map((e,i) => {
				return (
					<ComboboxItem 
                        key={e.id||e.key} 
                        label={e.label} 
                        index={i}
                        itemKey={e.id||e.key}
                        onClick={this.onItemClick} />
				);
			});
		return (
			<div className={"cbo-component autocomplete " + clz} 
                data-active={this.state.active}>
				<div className="cbo-label" onClick={this.onInputClick}>
					<input type="text" 
                        className="cbo-input"
                        value={this.state.value} 
                        placeholder={this.props.label} 
                        onClick={this.onInputClick}
                        onChange={this.onChange} />
				</div>
				<div className="cbo-menu" ref="cboMenu">
					{items}
				</div>
			</div>
		);
	}
}