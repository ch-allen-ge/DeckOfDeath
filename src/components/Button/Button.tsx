import { ReactNode } from "react";
import './buttonStyles.scss';

interface ButtonProps {
    children: ReactNode,
    disabled?: boolean,
    onClick: () => void,
    styles?: {}
}

const Button = ({children, onClick, disabled, styles}: ButtonProps) => {
    return (
        <div
            className={`dodButton ${disabled ? 'disabled' : ''}`}
            style={styles}
            onClick={!disabled ? onClick : undefined}
        >
            {children}
        </div>
    )
}

export default Button;