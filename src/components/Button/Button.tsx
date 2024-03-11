import { ReactNode } from "react";
import './buttonStyles.scss';

interface ButtonProps {
    children: ReactNode,
    disabled?: boolean,
    onClick: () => void
}

const Button = ({children, onClick, disabled}: ButtonProps) => {
    return (
        <div
            className={`dodButton ${disabled ? 'disabled' : ''}`}
            onClick={!disabled ? onClick : undefined}
        >
            {children}
        </div>
    )
}

export default Button;