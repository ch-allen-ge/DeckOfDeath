import { ReactNode } from "react";
import './buttonStyles.scss';

interface ButtonProps {
    children: ReactNode,
    onClick?: () => any
}

const Button = ({children, onClick}: ButtonProps) => {
    return (
        <div
            className="dodButton"
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Button;