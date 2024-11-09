export default function Undertext({className, children}) {
    return (
        <div className={`${className} col-auto`}> {children} </div>
    );
}