import * as React from 'react';
import {ComboboxItemData,ComboboxItem} from './ComboboxItem';
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
	constructor(props: ComboboxProps) {
		super(props);
		this.onToggleMenu = this.onToggleMenu.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			selItem: props.selItem || null,
		};
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
			label = (props.labelRenderer && props.labelRenderer(state.selItem)) || (<div className="label-wrapper">{labelText}</div>),
			items = this.props.items.map((e,i)=>{
				return (
					<ComboboxItem key={e.id||e.key} itemKey={e.id||e.key} label={e.label} index={i} onClick={this.onChange} />
				);
			});
		return (
			<div className={"react-combobox " + clz} data-active={this.state.active}>
				<div className="cbo-label" onClick={this.onToggleMenu}>
					{label}
				</div>
				<div className="cbo-menu" ref="cboMenu">
				{items}
				</div>
			</div>
		);
	}
}