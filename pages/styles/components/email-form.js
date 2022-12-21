// styles/components/email-form.js
import css from 'styled-jsx/css';

export default css.global`
    form,
    label {
        display: flex;
        flex-flow: column;
        text-align: center;
    }
    .form-header {
        font-size: 22px;
        margin: 25px 0;
    }
    .input-wrapper {
        width: 80%;
        margin: 0 auto 20px;
    }
`;
