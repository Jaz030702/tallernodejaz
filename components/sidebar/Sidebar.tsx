"use client";

interface SidebarProps {
    onFilterChange: (filterId: number) => void;
    onClearNotes: () => void;
    isClearing: boolean;
}

const Sidebar = ({ onFilterChange, onClearNotes, isClearing }: SidebarProps) => {
    const categories = [
        { id: 0, label: "Mostrar todo", color: "bg-blue-500" }, // Azul intermedio
        { id: 1, label: "Ideas", color: "bg-blue-400" }, // Azul claro
        { id: 2, label: "Por hacer", color: "bg-blue-600" }, // Azul oscuro
        { id: 3, label: "Terminado", color: "bg-blue-700" }, // Azul más oscuro
    ];

    const handleFilterClick = (filterId: number) => {
        onFilterChange(filterId);
    };

    return (
        <div className="flex flex-col space-y-4 p-6 text-base text-gray-700 bg-blue-100 rounded-lg shadow-md">
            <div className="flex flex-row items-center space-x-3">
                <svg
                    className="w-8 h-8 text-blue-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                    />
                </svg>
                <p className="font-bold text-blue-700">Notas</p>
            </div>
            <div className="flex flex-col min-w-48 space-y-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => handleFilterClick(category.id)}
                        className="text-left font-semibold flex flex-row items-center space-x-3 hover:bg-blue-200 p-2 rounded-lg"
                    >
                        <div className={`${category.color} rounded-full w-4 h-4`}></div>
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>
            <button
                onClick={onClearNotes}
                className="text-red-600 font-semibold mt-4 hover:bg-red-200 p-2 rounded-lg"
                disabled={isClearing}
            >
                {isClearing ? "Limpiando..." : "Borrar todas las notas filtradas"}
            </button>
        </div>
    );
};

export default Sidebar;
