import * as React from 'react';
import {ComboboxItemData,ComboboxItem} from './ComboboxItem';
export interface ComboboxProps {
	className?: string;
	items: ComboboxItemData[];
	onChange: Function;
	label: string;
	hasSearch?:boolean;
	searchPlaceholder?:string;
	labelRenderer?:(selItem:ComboboxItemData)=>React.ReactElement<any>;
	selItem?: ComboboxItemData;

}

export interface ComboboxState {
	selItem?: ComboboxItemData,
	active?: boolean;
	searchValue?:string;
}

export default class Combobox extends React.Component<ComboboxProps, ComboboxState>{
	constructor(props: ComboboxProps) {
		super(props);
		this.onToggleMenu = this.onToggleMenu.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.state = {
			selItem: props.selItem || null,
			searchValue:'',
		};
	}

	onSearchChange(e:React.SyntheticEvent){
		let el = e.target as HTMLInputElement 
		let val = el.value; 
		this.setState({
			searchValue:val
		}); 
	}

	shouldComponentUpdate(props: ComboboxProps, state: ComboboxState){
		return props.selItem !== this.props.selItem ||
			props.items !== this.props.items ||
			state.active !== this.state.active ||
			state.selItem !== state.selItem;
	}

	componentWillReceiveProps(nextProps:ComboboxProps){
		if (this.state.selItem !== nextProps.selItem){
			this.setState({
				selItem: nextProps.selItem
			});
		}
	}

	onChange(e:any){
		this.setState({
			selItem:e,
			active:false
		},()=>{
			this.props.onChange(e);
		});
	}

	onToggleMenu(){
		this.setState({
			active:!this.state.active,
		});
	}

	render(){
		let props = this.props, 
			state = this.state,
			clz = props.className || '',
			labelText = (state.selItem && state.selItem.label) || props.label,
			regex = new RegExp('.*'+state.searchValue+'.*','ig'),
			label = (props.labelRenderer && props.labelRenderer(state.selItem)) || (<div className="label-wrapper">{labelText}</div>),
			items = this.props.items.filter((e)=>{
				return regex.test(e.label);
			}).map((e,i)=>{
				return (
					<ComboboxItem key={e.id||e.key} itemKey={e.id||e.key} label={e.label} 
						index={i} item={e} onClick={this.onChange} />
				);
			});
		return (
			<div className={"react-combobox " + clz} data-active={this.state.active}>
				<div className="react-dropdown-label" onClick={this.onToggleMenu}>
					{label}
				</div>
				<div className="react-dropdown-menu" ref="cboMenu">
					{props.hasSearch?(
						<div className="react-dropdown-search">
							<input type="text" 
								placeholder={props.searchPlaceholder} onChange={this.onSearchChange} 
								value={state.searchValue} />
						</div>
					):null}
					<div className="item-wrapper">
					{items}
					</div>
				</div>
			</div>
		);
	}
}