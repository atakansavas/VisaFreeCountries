import React, { Component } from "react";

class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        this.state = {
            map: this.props.map,
        }
    }

    handleClick(e) {
        e.preventDefault();
        console.log(this.props.value);
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