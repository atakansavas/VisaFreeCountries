import React, { Component } from "react";

class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {

    }

    handleClick(e) {
        e.preventDefault();
        this.props.callbackFromParent(this.props.value);
    }


    render() {
        const value = this.props.value;
        return (
            <li>
                <a onClick={this.handleClick} href="#">
                    <i class="fa fa-globe"></i>
                    <span>
                        {value}
                    </span>
                </a>
            </li>
        );
    }
}

export default SearchResult;