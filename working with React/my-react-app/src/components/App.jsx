/* eslint-disable no-unused-vars */
import React from 'react';
import Entry from './Entry.jsx'
import emojipedia from './emojies.js';

function emojiTerm(emojiTerm) {
    return (
        <Entry
            key={emojiTerm.id}
            emoji={emojiTerm.emoji}
            name={emojiTerm.name}
            meaning={emojiTerm.meaning}
        />
    );
}

function App() {
    return (
        <div>
            <h1>
                <span> Emojipedia </span>
            </h1>
            <div className="dictionary">
                {emojipedia.map(emojiTerm)}
            </div>
        </div>
    )
}

export default App;
