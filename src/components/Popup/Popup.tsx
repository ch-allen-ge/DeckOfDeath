import './popupStyles.scss';

interface PopupProps {
    open: boolean,
    children: React.ReactNode
}

const Popup = ({children, open} : PopupProps) => {
    return (
        <div className={`${open ? 'show' : 'hide'} popupContainer`}>
            {children}
        </div>
    );
}

export default Popup;