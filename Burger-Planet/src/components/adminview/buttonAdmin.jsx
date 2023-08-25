// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'tailwindcss/tailwind.css'

function AdminButtons() {
    return (
        <>
            <div className="flex flex-col pt-20">
                <button type="submit" className="text-4xl justify-center flex mx-auto bg-GreenLight border-4 text-Black rounded-3xl py-2 px-4 shadow-lg w-2/5 h-20 stroke-15 stroke-GreenLight blur-12.5">
                    Trabajadores
                </button>
            </div>

            <div className="flex flex-col pt-12">
                <button type="submit" className="text-4xl justify-center flex mx-auto bg-GreenLight border-4 text-Black rounded-3xl py-2 px-4 shadow-lg w-2/5 h-20 stroke-15 stroke-GreenLight blur-12.5">
                    Productos
                </button>
            </div>
        </>
    );
}

export default AdminButtons;