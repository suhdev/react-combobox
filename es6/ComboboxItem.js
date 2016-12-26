import * as React from 'react';
export class ComboboxItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            active: false,
        };
    }
    onClick(e) {
        let props = this.props;
        props.onClick(props.index, props.itemKey);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.label !== this.props.label ||
            nextProps.index !== this.props.index;
    }
    render() {
        let props = this.props;
        return (React.createElement("div", {className: "cbo-item", "data-index": props.index, onClick: this.onClick}, this.props.label));
    }
}
//# sourceMappingURL=ComboboxItem.js.map