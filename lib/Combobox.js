"use strict";
const React = require('react');
const ComboboxItem_1 = require('./ComboboxItem');
class Combobox extends React.Component {
    constructor(props) {
        super(props);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.state = {
            selItem: props.selItem || null,
            searchValue: '',
        };
    }
    onSearchChange(e) {
        let el = e.target;
        let val = el.value;
        this.setState({
            searchValue: val
        });
    }
    shouldComponentUpdate(props, state) {
        return props.selItem !== this.props.selItem ||
            props.items !== this.props.items ||
            state.active !== this.state.active ||
            state.selItem !== state.selItem;
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.selItem !== nextProps.selItem) {
            this.setState({
                selItem: nextProps.selItem
            });
        }
    }
    onChange(e) {
        this.setState({
            selItem: e,
            active: false
        }, () => {
            this.props.onChange(e);
        });
    }
    onToggleMenu() {
        this.setState({
            active: !this.state.active,
        });
    }
    render() {
        let props = this.props, state = this.state, clz = props.className || '', labelText = (state.selItem && state.selItem.label) || props.label, regex = new RegExp('.*' + state.searchValue + '.*', 'ig'), label = (props.labelRenderer && props.labelRenderer(state.selItem)) || (React.createElement("div", {className: "label-wrapper"}, labelText)), items = this.props.items.filter((e) => {
            return regex.test(e.label);
        }).map((e, i) => {
            return (React.createElement(ComboboxItem_1.ComboboxItem, {key: e.id || e.key, itemKey: e.id || e.key, label: e.label, index: i, onClick: this.onChange}));
        });
        return (React.createElement("div", {className: "react-combobox " + clz, "data-active": this.state.active}, React.createElement("div", {className: "cbo-label", onClick: this.onToggleMenu}, label), React.createElement("div", {className: "cbo-menu", ref: "cboMenu"}, props.hasSearch ? (React.createElement("input", {type: "text", placeholder: props.searchPlaceholder, onChange: this.onSearchChange, value: state.searchValue})) : null, items)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Combobox;
//# sourceMappingURL=Combobox.js.map