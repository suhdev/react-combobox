"use strict";
const React = require('react');
const ComboboxItem_1 = require('./ComboboxItem');
class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.state = {
            items: props.filter('') || [],
            active: false,
            value: '',
            selItem: props.selItem || null,
        };
    }
    onChange(e) {
        let a = e.target.value;
        this.setState({
            value: a,
            items: this.props.filter(a),
            active: a === "" ? false : true
        }, () => {
            this.props.onChange(a);
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selItem && nextProps.selItem !== this.state.selItem) {
            this.setState({
                selItem: nextProps.selItem,
                value: nextProps.selItem.label
            });
        }
    }
    shouldComponentUpdate(props, state) {
        return state.items !== this.state.items ||
            state.selItem !== this.state.selItem ||
            props.selItem !== this.props.selItem ||
            state.value !== this.state.value ||
            state.active !== this.state.active ||
            props.className !== this.props.className ||
            props.label !== this.props.label;
    }
    onItemClick(e) {
        this.setState({
            selItem: e,
            value: e.label,
            active: false,
        }, () => {
            this.props.onItemSelected(e);
        });
    }
    onInputClick(e) {
        e.stopPropagation();
        this.setState({
            active: !this.state.active
        });
    }
    render() {
        let clz = this.props.className || '';
        let state = this.state, label = this.state.selItem ? this.state.selItem.label : this.props.label, items = this.state.items.map((e, i) => {
            return (React.createElement(ComboboxItem_1.ComboboxItem, {key: e.id || e.key, label: e.label, index: i, itemKey: e.id || e.key, onClick: this.onItemClick}));
        });
        return (React.createElement("div", {className: "cbo-component autocomplete " + clz, "data-active": this.state.active}, React.createElement("div", {className: "cbo-label", onClick: this.onInputClick}, React.createElement("input", {type: "text", className: "cbo-input", value: this.state.value, placeholder: this.props.label, onClick: this.onInputClick, onChange: this.onChange})), React.createElement("div", {className: "cbo-menu", ref: "cboMenu"}, items)));
    }
}
exports.Autocomplete = Autocomplete;
//# sourceMappingURL=Autocomplete.js.map