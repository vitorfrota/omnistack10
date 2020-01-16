import React from 'react';

import './styles.css';

function DevItem({ dev }){
    return (
    <li className="dev-item">
        <header>
            <img src={dev.avatar_url} alt="" />
            <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs}</span>
            </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil</a>
    </li>
    )
}

export default DevItem;