import React from "react";

export function SearchResult(props) {
    const value = props.value;
    return (
        <li>
            <a href="#">
                <i class="fa fa-globe"></i>
                <span>
                    {value}
                </span>
            </a>
        </li>

    );
}
