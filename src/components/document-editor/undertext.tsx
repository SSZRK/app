export default function Undertext({className, children}: { className: string, children: any }) {
    return (
        <div className={`${className} col-auto`}> {children} </div>
    );
}