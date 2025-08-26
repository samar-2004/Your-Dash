
export default function MetricCard({ title, value, icon: Icon, bgColor }) {
    return (
        <div className={`${bgColor} text-white relative rounded-lg p-4 flex items-center justify-between`}>
            <div>
                <span className="text-sm font-medium opacity-90">{title}</span>
                <div className="text-xl pt-3 font-bold">{value}</div>
            </div>
            {Icon && <Icon className="text-4xl absolute right-4 bottom-3" />}
        </div>
    );
}
