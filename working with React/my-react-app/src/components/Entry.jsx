/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function Entry(props) {

    return(
        <div className="term">
            <dt>
                <span className="emoji" role="img" aria-label="Tense Biceps">
                    {props.emoji}
                </span>
                <span>{props.name}</span>
            </dt>
            <dd>
                {props.meaning}
            </dd>
        </div>
    );
}

Entry.propTypes = {
    emoji: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    meaning: PropTypes.string.isRequired
};

export default Entry;