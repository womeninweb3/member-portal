// styles/components/header.js
import css from 'styled-jsx/css';

export default css.global`
    nav {
        max-width: 70rem;
        max-height: 5rem;
        margin: 0 auto;
        padding: 1.25rem 1.25rem;
        }
    
    ul {
        display: flex;
        list-style: none;
    }
    li {
        line-height: 38px;
    }
    li:first-child {
        margin-left: auto;   
    }
    
    .header-button {
        background-color: white; 
        color: black;
        padding: 8px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin-left: 20px;
    }
`;
