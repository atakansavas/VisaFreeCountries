import React, { Component } from "react";
import { VisaFreeCountries } from './data/visafreeCountries'
import { SearchResult } from './sidebar/searchResult';
import './sidebar/sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: VisaFreeCountries,
            filtered: [],
            current: []
        };
    }

    componentDidMount() {
        // this.getData();
        // console.log(countryList);
        this.setState({
            current: this.state.list
        })
    }

    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.list;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                const lc = item.toLowerCase();
                // change search term to lowercase
                const filter = e.target.value.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.list;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            current: newList
        });
    }

    render() {
        const countryList = this.state.current.map((number) =>
            // Wrong! The key should have been specified here:
            <SearchResult value={number} />
        );

        return (
            <nav id="sidebar" class="sidebar-wrapper">
                <div class="sidebar-content">
                    <div class="sidebar-brand">
                        <a href="#">VizeFree</a>
                    </div>
                    <div class="sidebar-header">
                        <div class="user-info">
                            <span class="user-name">Atakan
                                <strong>Savas</strong>
                            </span>
                            <span class="user-role">developer</span>
                            <span class="user-status">
                                <i class="fa fa-circle"></i>
                                <span>Online</span>
                            </span>
                        </div>
                    </div>

                    <div class="sidebar-search">
                        <div>
                            <div class="input-group">
                                <input type="text" class="form-control search-menu" onChange={this.handleChange.bind(this)} placeholder="Search..." />
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sidebar-menu">
                        <ul>
                            {countryList}
                        </ul>
                    </div>
                </div>
                {/* <div class="sidebar-footer">
                    <a href="#">
                        <i class="fa fa-bell"></i>
                        <span class="badge badge-pill badge-warning notification">3</span>
                    </a>
                    <a href="#">
                        <i class="fa fa-envelope"></i>
                        <span class="badge badge-pill badge-success notification">7</span>
                    </a>
                    <a href="#">
                        <i class="fa fa-cog"></i>
                        <span class="badge-sonar"></span>
                    </a>
                    <a href="#">
                        <i class="fa fa-power-off"></i>
                    </a>
                </div> */}
            </nav>
        )
    }
}

export default Sidebar;