import React, { Component } from "react";
import { VisaFreeCountries } from './data/visafreeCountries'
import SearchResult from './sidebar/searchResult';
import './sidebar/sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: VisaFreeCountries,
            filtered: [],
            current: [],
            isSidebarOpen: true
        };
    }

    componentDidMount() {
        this.setState({
            current: this.state.list
        })
    }

    changeCountryName(countryName) {
        this.props.callbackFromApp(countryName);
    }

    toggleSidebar() {
        var current = this.state.isSidebarOpen;
        if (current) {
            this.setState({ isSidebarOpen: false });
        }
        else {
            this.setState({ isSidebarOpen: true });
        }

        this.props.changeSidebarStatus(this.state.isSidebarOpen);
    }


    handleChange(e) {
        let currentList = [];
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            // Assign the original list to currentList
            currentList = this.state.list;

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

        this.setState({
            current: newList
        });
    }

    render() {
        const countryList = this.state.current.map((number) =>
            // Wrong! The key should have been specified here:
            <SearchResult callbackFromParent={this.changeCountryName.bind(this)} value={number} />
        );

        return (
            <React.Fragment>
                <a id="show-sidebar" onClick={this.toggleSidebar.bind(this)} class="btn btn-sm btn-dark" href="#">
                    <i class="fas fa-bars"></i>
                </a>
                <nav id="sidebar" class="sidebar-wrapper">
                    <div class="sidebar-content">
                        <div class="sidebar-brand">
                            <a href="#">VizeFree</a>
                            <div onClick={this.toggleSidebar.bind(this)} id="close-sidebar">
                                <i class="fas fa-times"></i>
                            </div>
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
                                    <input type="text" class="form-control search-menu"
                                        onChange={this.handleChange.bind(this)} placeholder="Search..." />
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
                </nav>
            </React.Fragment>
        )
    }
}

export default Sidebar;